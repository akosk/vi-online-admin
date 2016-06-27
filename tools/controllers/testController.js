import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/testModel';

class TestController {

  static async getAllTests(req, res) {

    try {
      const tests=await model.getAllTests();
      console.log(tests);
      return res.send(tests);

    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }

  }


}

export default TestController;
