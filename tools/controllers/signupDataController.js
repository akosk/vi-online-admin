import rdb from 'rethinkdb';
import config from '../config';

import {updateSignupData, insertSignupData} from '../models/signupDataModel';


class SignupDataController {

  static async getSignupDataByUserId(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user_id}=req.params;

    console.log(`getSignupDataByUserId for ${user_id}`);

    try {
      const connection = await rdb.connect(config.db);
      let cursor = await rdb.table('signup_datas')
                            .filter({ user_id })
                            .run(connection);

      const signupData = await cursor.toArray();

      return res.send(signupData.length == 0 ? {} : signupData[0]);

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

    const signupData = req.body;


    try {
      const connection = await rdb.connect(config.db);
      if (signupData.id) {
        const result = await updateSignupData(signupData);
      } else {
        signupData.user_id = req.token.user.id;
        const signupData = await insertSignupData(signupData);
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
