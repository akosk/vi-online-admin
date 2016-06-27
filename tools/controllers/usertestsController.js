import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/usertestModel';
import * as testmodel from '../models/testModel';

import {hash_password} from '../lib/auth';

class UsertestsController {

  static async getUserTest(req, res) {

    const {user_id,test_id}=req.params;

    console.log(`getUserTest for ${user_id} ${test_id}`);

    try {

      let usertest = await model.getUserTest(user_id, test_id);

      if (usertest.length == 0) {
        usertest = await testmodel.getTest(test_id);
        usertest.test_id = test_id;
        usertest.user_id = user_id;
        delete(usertest.id);
        usertest.questions.forEach(item=> item.value = '');

        const result = model.insertUserTest(usertest);

      } else {
        usertest = usertest[0];
      }


      return res.send(usertest);

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }


  }

  static async saveUserTest(req, res) {


    const {user_id,usertest_id}=req.params;
    const {test}=req.body;
    console.log(`saveUserTest for ${user_id} ${usertest_id}`);
    console.log(`saveUserTest body ${test} `);

    try {
      let result = await model.saveUserTest(test);
      return res.send(test);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);

    }

  }

}


export default UsertestsController;
