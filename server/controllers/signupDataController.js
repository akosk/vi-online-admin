import rdb from 'rethinkdb';
import config from '../config';

import * as model from '../models/signupDataModel';


class SignupDataController {

  static getSignupDataByUserId(req, res) {

    const {user_id}=req.params;

    console.log(`getSignupDataByUserId for ${user_id}`);

    model.getSignupDataByUserId(user_id)
         .then((signupData)=> {
           console.log('getSignupDataByUserId :', signupData);
           res.send(signupData)
         })
         .catch((err)=> {
           console.log(err);
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
    console.log("SignupData", signupData);

    let promise = null;
    if (signupData.id) {
      promise = model.updateSignupData(signupData);
    } else {
      signupData.user_id = req.token.user.id;
      promise = model.insertSignupData(signupData);
    }
    promise.then((signupData)=> {
             console.log('saveSignupData :', signupData);
             res.send(signupData);
           })
           .catch((err)=> {
             console.log(err);
             res.status(500);
             return res.send(err);
           });

  }


}


export default SignupDataController;
