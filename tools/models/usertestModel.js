import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export function getUserTest(user_id, test_id) {
  console.log('usertestModel/getUserTest', user_id,test_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('usertests')
                        .filter({ user_id, test_id })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((usertests)=> {
              console.log('usertestModel/getUserTest', usertests.id);
              return usertests.length > 0 ? usertests[0] : {};
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function insertUserTest(usertest) {

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('usertests')
                        .insert(usertest, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
							const usertest = result.changes[0].new_val;
              console.log('Insert return:', usertest.id);
              return usertest;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function updateUserTest(usertest) {

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('usertests')
                        .get(usertest.id)
                        .update(usertest, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length>0) {
                usertest = {...usertest,...result.changes[0].new_val};
              }
              console.log(usertest);
              return usertest;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

