import rdb from 'rethinkdb';
import config from '../config';

import * as model from '../models/signupDataModel';
import * as userturnModel from '../models/userturnModel';
import * as progressTypes from '../../common/progressTypes';
import _ from 'lodash';
import {isSignup1HasErrors} from '../../common/validation';
import log from '../lib/nodelogger';

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
    promise.then((signupData)=> {
             return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA1_SAVED)
                                 .then(()=> {
                                   return signupData;
                                 });
           })
           .then((signupData)=> {
             if (_.keys(isSignup1HasErrors(signupData)).length===0) {
               log.debug('valid');
               return userturnModel.setProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA1_VALID)
                                   .then(()=> {
                                     return signupData;
                                   });

             } else {
               log.debug('not valid');
               return userturnModel.removeProgress(signupData.user_id, signupData.turn_id, progressTypes.SIGNUP_DATA1_VALID)
                                   .then(()=> {
                                     return signupData;
                                   });

             }
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
