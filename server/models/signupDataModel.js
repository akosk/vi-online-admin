import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';
import log from '../lib/nodelogger';


export function updateSignupData(signupData) {
  log.debug('updateSignupData', signupData);
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
                  return sd;
                });
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function insertSignupData(signupData) {
  log.debug('insertSignupData', signupData);

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
                  return sd;
                });
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getSignupData(id) {
  log.debug('getSignupData', id);

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
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function findAllSignupDatas(filter) {
  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('signup_datas')
                        .coerceTo('array')
                        .run(conn);
            })
            .then((signupDatas)=> {
              return signupDatas;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function findTurnSignupDatas(turn_id, filter) {
  let conn = null;

  //r.db('vi_del_dunantul').table('users')
  // .eqJoin('id',r.db('vi_del_dunantul').table('userturns'),{index:'user_id'})
  // .zip()
  // .filter({'turn_id':'4f01f5ed-6ff8-4772-8ff2-a54902ea5540'})
  // .eqJoin('user_id',r.db('vi_del_dunantul').table('signup_datas'),{index:'user_id'})
  // .zip()
  // .filter({'turn_id':'4f01f5ed-6ff8-4772-8ff2-a54902ea5540'})


  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .eqJoin('id',rdb.table('userturns'),{index:'user_id'})
                        .zip()
                        .filter({turn_id})
                        .eqJoin('user_id',rdb.table('signup_datas'),{index:'user_id'})
                        .zip()
                        .filter({turn_id})
                        .coerceTo('array')
                        .run(conn);
            })
            .then((signupDatas)=> {
              return signupDatas;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getSignupDataByUserId(user_id) {
  log.debug('getSignupDataByUserId', user_id);

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
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}
