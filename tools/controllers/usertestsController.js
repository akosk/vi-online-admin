import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/usertestModel';
import * as testmodel from '../models/testModel';

import {hash_password} from '../lib/auth';

class UsertestsController {

  static getUserTest(req, res) {

    const {user_id,test_id}=req.params;

    console.log(`getUserTest for ${user_id} ${test_id}`);


    model.getUserTest(user_id, test_id)
         .then((usertest)=> {
           console.log('UsertestsController/getUserModel usertests', usertest.id);
           if (usertest.id === undefined) {
             console.log('usertest not found');
             return testmodel.getTest(test_id)
                             .then((usertest)=> {
                               usertest.test_id = test_id;
                               usertest.user_id = user_id;
                               delete(usertest.id);
                               usertest.questions.forEach(item=> item.value = '');

                               return model.insertUserTest(usertest);

                             })
             //.then((usertest)=> {
             //  console.log('-----', usertest.id);
             //  return usertest.id;
             //});

           } else {
             console.log('usertest found', usertest);
             return usertest;
           }

         })
         .then((usertest)=> {
           /// az insert is ezt adja vissza
           console.log('usertest then 2,', usertest.id);
           res.send(usertest);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });


  }

  static saveUserTest(req, res) {

    const {user_id,usertest_id}=req.params;
    const {test}=req.body;
    console.log(`saveUserTest for ${user_id} ${usertest_id}`);
    console.log(`saveUserTest body ${test} `);

    model.updateUserTest(test)
         .then((usertest)=> {
           res.send(usertest);
         })
         .catch((err)=> {
           console.log(err);
           res.status(500);
           return res.send(err);
         });

  }

}


export default UsertestsController;
