import rdb from 'rethinkdb';
import config from '../config';

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


export default SignupDataController;
