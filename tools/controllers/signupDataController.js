import rdb from 'rethinkdb';
import config from '../config';

import * as model from '../models/signupDataModel';


class SignupDataController {

  static async getSignupDataByUserId(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id}=req.params;

    console.log(`getSignupDataByUserId for ${user_id}`);

    try {
      const signupData = await model.getSignupDataByUserId(user_id);
      return res.send(signupData);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }


  }

  static async saveSignupData(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    let signupData = req.body;
console.log("SignupData",signupData);

    try {
      if (signupData.id) {
        const result = await model.updateSignupData(signupData);
      } else {
        signupData.user_id = req.token.user.id;
        signupData = await model.insertSignupData(signupData);
      }
      return res.send(signupData);

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }
  }


}


export default SignupDataController;
