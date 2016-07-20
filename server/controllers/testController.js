import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/testModel';
import log from '../lib/nodelogger';

class TestController {

  static getAllTests(req, res) {

    model.getAllTests()
         .then((tests)=> {
           return res.send(tests);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });



  }


}

export default TestController;
