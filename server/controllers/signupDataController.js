import rdb from 'rethinkdb';
import config from '../config';
import path from 'path';

import moment from "moment";
import xl from 'excel4node';
import * as model from '../models/signupDataModel';
import * as userturnModel from '../models/userturnModel';
import * as progressTypes from '../../common/progressTypes';
import * as types from '../../common/fieldTypes';
import _ from 'lodash';
import {isSignup1HasErrors, isSignup2HasErrors, isSignup3HasErrors} from '../../common/validation';
import log from '../lib/nodelogger';
import {schema, findTable, RATING_TYPE_AUTO, RATING_TYPE_MANUAL} from '../../common/filterSchema';


export const getScore = (field, signupData)=> {
  let score = 0;

  if (field.rating == RATING_TYPE_MANUAL) {
    score = _.get(signupData, `ratings.${field.rname}`, 0);
  } else if (field.rating == RATING_TYPE_AUTO) {
    let optionValue;
    switch (field.type) {
      case types.SELECT:
      {
        optionValue = _.get(signupData, `${field.rname}`);
        break;
      }
      case types.RADIOGROUP:
      {
        optionValue = _.get(signupData, `${field.rname}.value`);
        break;
      }
    }
    if (optionValue) {
      score = field.ratings[optionValue];
    }
  }
  return score;
};


export const calculateScore = (signupData)=> {
  signupData = _.cloneDeep(signupData);
  let rating = 0;
  [3, 4, 5].forEach((id)=> {
    const signupDataSchema = findTable(id);
    signupDataSchema.fields.forEach((field)=> {
      if (field.rating) {
        const score = getScore(field, signupData);
        rating += score;
        _.set(signupData, `ratings.${field.rname}`, score);
      }
    });
  });
  signupData.rating = rating;
  return signupData;
};

const validatorPromise = (signupData, validator, status)=> {
  if (_.keys(validator(signupData)).length === 0) {
    return userturnModel.setProgress(signupData.user_id, signupData.turn_id, status)
                        .then(()=> {
                          return signupData;
                        });

  } else {
    return userturnModel.removeProgress(signupData.user_id, signupData.turn_id, status)
                        .then(()=> {
                          return signupData;
                        });
  }
};

class SignupDataController {


  static exportSignupData(req, res) {


    const {turn_id}=req.params;

    const wb = new xl.Workbook();

    var ws = wb.addWorksheet('Jelentkezők');

    var style = wb.createStyle({
      font: {
        color: '#000000',
        size: 12
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

    // A fejlécet beírjuk az első sorba
    let col = 0;
    let row = 1;
    [3, 4, 5].forEach((id)=> {
      const signupDataSchema = findTable(id);
      signupDataSchema.fields.forEach((field)=> {
        col++;
        ws.cell(row, col).string(field.name).style(style);
      });
    });


    model.findAllSignupDatas(turn_id)
         .then((signupDatas)=> {
           signupDatas.forEach((data)=> {
             row++;
             col = 0;
             [3, 4, 5].forEach((id)=> {
               const signupDataSchema = findTable(id);
               signupDataSchema.fields.forEach((field)=> {
                 col++;
                 let val = getStringValue(field, data[field.rname]) || '';
                 ws.cell(row, col).string(val).style(style);
               });
             });

           });

           const filename = `jelentkezok_${moment().format("YYMMDD_x")}.xlsx`;
           wb.write(path.join(__dirname, '../../client/files/export/') + filename);
           res.send(filename);
         })
         .catch((err)=> {
           res.status(500);
           res.send(err);
         });

    //ws.cell(1, 1).number(100).style(style);
    //ws.cell(1, 2).number(200).style(style);
    //ws.cell(1, 3).formula('A1 + B1').style(style);
    //ws.cell(2, 1).string('string').style(style);
    //ws.cell(3, 1).bool(true).style(style).style({ font: { size: 14 } });


  }

  static getSignupDataByUserId(req, res) {

    const {user_id}=req.params;

    log.debug(`getSignupDataByUserId for ${user_id}`);

    model.getSignupDataByUserId(user_id)
         .then((signupData)=> {
           log.debug('getSignupDataByUserId :', signupData);
           res.send(signupData);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }

  static saveSignupData(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    let signupData = req.body;
    log.debug("saveSignupData");

    signupData = calculateScore(signupData);
    let promise = null;
    if (signupData.id) {
      promise = model.updateSignupData(signupData);
    } else {
      signupData.user_id = req.token.user.id;
      promise = model.insertSignupData(signupData);
    }
    promise
      .then((signupData)=> {
        if (signupData.honnan_ertesult !== undefined) {
          return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA1_SAVED)
                              .then(()=> {
                                return signupData;
                              });
        } else {
          return signupData;
        }
      })
      .then((signupData)=> {
        if (signupData.name !== undefined) {
          return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA2_SAVED)
                              .then(()=> {
                                return signupData;
                              });
        } else {
          return signupData;
        }
      })
      .then((signupData)=> {
        if (signupData.miert_szeretne_vallalkozast_inditani !== undefined) {
          return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA3_SAVED)
                              .then(()=> {
                                return signupData;
                              });
        } else {
          return signupData;
        }
      })
      .then((signupData)=> {
        return validatorPromise(signupData, isSignup1HasErrors, progressTypes.SIGNUP_DATA1_VALID);
      })
      .then((signupData)=> {
        return validatorPromise(signupData, isSignup2HasErrors, progressTypes.SIGNUP_DATA2_VALID);
      })
      .then((signupData)=> {
        return validatorPromise(signupData, isSignup3HasErrors, progressTypes.SIGNUP_DATA3_VALID);
      })
      .then((signupData)=> {
        res.send(signupData);
      })
      .catch((err)=> {
        log.debug(err);
        res.status(500);
        return res.send(err);
      });

  }


}

const getStringValue = (field, value)=> {
  let valueView;
  switch (field.type) {
    case  types.STRING:
    {
      valueView = value;
      break;
    }
    case  types.DATETIME:
    case  types.DATE:
    {
      valueView = moment(value).format('YYYY-MM-DD');
      break;
    }
    case  types.SELECT:
    {
      let op = _.find(field.options, (i)=> {
          return i.value == value
        }
      );
      valueView = op && op.text;
      break;
    }
    case  types.RADIOGROUP:
    {
      let v = value && value.value;
      const op = _.find(field.options, (i)=> {
          return i.value == v
        }
      );

      valueView = op && op.text;
      break;
    }
    case  types.MULTICHECKBOX:
    {
      valueView = _.keys(value).map((k)=> {
        if (value[k].checked) {
          const op = _.find(field.options, (i)=> {
              return i.value == k
            }
          );
          return op && op.text;
        }
      });
      valueView = valueView.join(',');
      break;
    }


  }
  return valueView;
};


export default SignupDataController;
