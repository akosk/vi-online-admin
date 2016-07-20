import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/usertestModel';
import * as testmodel from '../models/testModel';

import {hash_password} from '../lib/auth';
import log from '../lib/nodelogger';

class UsertestsController {

  static getUserTest(req, res) {

    const {user_id,test_id,turn_id}=req.params;

    log.debug(`getUserTest for ${user_id} ${test_id} ${turn_id}`);


    model.getUserTest(user_id, test_id, turn_id)
         .then((usertest)=> {
           log.debug('UsertestsController/getUserModel usertests', usertest.id);
           if (usertest.id === undefined) {
             log.debug('usertest not found');
             return testmodel.getTest(test_id)
                             .then((usertest)=> {
                               usertest.test_id = test_id;
                               usertest.user_id = user_id;
                               usertest.turn_id = turn_id;
                               delete(usertest.id);
                               usertest.questions.forEach(item=> item.value = '');

                               return model.insertUserTest(usertest);

                             });
             //.then((usertest)=> {
             //  log.debug('-----', usertest.id);
             //  return usertest.id;
             //});

           } else {
             log.debug('usertest found', usertest);
             return usertest;
           }

         })
         .then((usertest)=> {
           /// az insert is ezt adja vissza
           log.debug('usertest then 2,', usertest.id);
           res.send(usertest);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });


  }

  static saveUserTest(req, res) {

    const {user_id,usertest_id}=req.params;
    const {test}=req.body;
    log.debug(`saveUserTest for ${user_id} ${usertest_id}`);
    log.debug(`saveUserTest body ${test} `);

    model.updateUserTest(test)
         .then((usertest)=> {
           log.debug('saveUserTest>>>>', usertest);
           res.send(usertest);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });

  }

}


export default UsertestsController;
