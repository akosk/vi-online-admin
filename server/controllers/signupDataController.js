import rdb from 'rethinkdb';
import config from '../config';

import * as model from '../models/signupDataModel';
import * as userturnModel from '../models/userturnModel';
import * as progressTypes from '../../common/progressTypes';
import _ from 'lodash';
import {isSignup1HasErrors, isSignup2HasErrors, isSignup3HasErrors} from '../../common/validation';
import log from '../lib/nodelogger';


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
    log.debug("SignupData", signupData);

    let promise = null;
    if (signupData.id) {
      promise = model.updateSignupData(signupData);
    } else {
      signupData.user_id = req.token.user.id;
      promise = model.insertSignupData(signupData);
    }
    promise
      .then((signupData)=> {
        if (signupData.honnan_ertesult!==undefined) {
        return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA1_SAVED)
                            .then(()=> {
                              return signupData;
                            });
        } else {
          return signupData;
        }
      })
      .then((signupData)=> {
        if (signupData.name!==undefined) {
        return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA2_SAVED)
                            .then(()=> {
                              return signupData;
                            });
        } else {
          return signupData;
        }
      })
      .then((signupData)=> {
        if (signupData.miert_szeretne_vallalkozast_inditani!==undefined) {
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
