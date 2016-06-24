import rdb from 'rethinkdb';
import config from '../config';

import {hash_password} from '../lib/auth';

class UsertestsController {

  static async getUserTest(req, res) {

    const {user_id,test_id}=req.params;

    console.log(`getUserTest for ${user_id} ${test_id}`);

    try {
      const connection = await rdb.connect(config.db);
      let cursor = await rdb.table('usertests')
                            .filter({ user_id, test_id })
                            .run(connection);

      let usertest = await cursor.toArray();

      if (usertest.length == 0) {
        usertest = await rdb.table('tests')
                            .get(test_id)
                            .run(connection);
        usertest.test_id = test_id;
        usertest.user_id = user_id;
        delete(usertest.id);
        usertest.questions.forEach(item=> item.value = '');

        const result = await rdb.table('usertests')
                                .insert(usertest)
                                .run(connection);
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
      const connection = await rdb.connect(config.db);
      let result = await rdb.table('usertests')
                            .get(usertest_id)
                            .update(test)
                            .run(connection);
      return res.send(test);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);

    }

  }

}


export default UsertestsController;
