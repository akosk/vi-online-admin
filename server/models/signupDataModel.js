import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export function updateSignupData(signupData) {
  console.log('updateSignupData', signupData);
  delete(signupData.created_at);
  delete(signupData.user_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('signup_datas')
                        .get(signupData.id)
                        .update({ ...signupData, updated_at: rdb.now() })
                        .run(conn);
            })
            .then((result)=> {
              return getSignupData(signupData.id)
                .then((sd)=> {
                  console.log('get updated SignupData', sd);
                  return sd;
                });
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function insertSignupData(signupData) {
  console.log('insertSignupData', signupData);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('signup_datas')
                        .insert({ ...signupData, created_at: rdb.now() })
                        .run(conn);
            })
            .then((result)=> {
              return getSignupData(result.generated_keys[0])
                .then((sd)=> {
                  console.log('get inserted SignupData', sd);
                  return sd;
                });
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getSignupData(id) {
  console.log('getSignupData', id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('signup_datas')
                        .get(id)
                        .coerceTo('object')
                        .run(conn);
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function getSignupDataByUserId(user_id) {
  console.log('getSignupDataByUserId', user_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('signup_datas')
                        .filter({ user_id })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((signupDatas)=> {
              return signupDatas.length > 0 ? signupDatas[0] : {};
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}
