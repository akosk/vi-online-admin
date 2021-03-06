import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';
import log from '../lib/nodelogger';
import _ from "lodash";

export function getUserByPasswordResetId(id) {
  log.debug(`getUserByPasswordResetId ${id}`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .filter({ 'password_reset': { id } })
                        .filter(rdb.now().sub(rdb.row('password_reset')('created_at')).lt(60 * 60 * 24))
                        .coerceTo('array')
                        .run(conn);
            })
            .then((userArray)=> {
              return userArray.length > 0 ? userArray[0] : null;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}
export function updateSignupStatementFile(user_id, turn_id, filename) {
  log.debug(`updateSignupStatementFile ${user_id} ${turn_id} ${filename}`);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .update({ signup_statement_file: filename })
                        .run(conn);
            })
            .then((result)=> {
              return result;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getUserByEmail(email) {
  log.debug(`userModel/getUserByEmail ${email}`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .filter({ email })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((userArray)=> {
              return userArray.length > 0 ? userArray[0] : null;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function getAllUsers() {
  log.debug(`getAllUsers`);
  const start = new Date().getTime();
  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .coerceTo('array')
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
              const end = new Date().getTime();
              const time = end - start;
              log.debug('Execution time: ' + time);
            });
}

export function getUser(user_id) {
  log.debug(`getUser`, user_id);
  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .get(user_id)
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

export function deleteUser(user_id) {
  log.debug(`deleteUser`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .get(user_id)
                        .delete()
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}


export function updateUser(user) {
  log.debug(`updateUser`, user);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .get(user.id)
                        .update(user, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length > 0) {
                user = { ...user, ...result.changes[0].new_val };
              }
              log.debug('user update return:', user.id);
              return user;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function replaceUser(user) {
  log.debug(`replaceUser`, user);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .get(user.id)
                        .replace(user, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length > 0) {
                user = { ...user, ...result.changes[0].new_val };
              }
              log.debug('user replace return:', user.id);
              return user;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}


export function insertUser(user) {
  log.debug(`insertUser`, user);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('users')
                        .insert(user, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              const user = result.changes[0].new_val;
              log.debug('user insert return:', user.id);
              return user;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function updateUserLoginInfo(user, data) {

  if (!user.login) {
    user.login = [];
  }

  let entry = _.find(user.login, (i)=> {
    return i.ip == data.ip;
  });


  if (!entry) {
    entry = {
      ip:data.ip,
      first_access: rdb.now(),
      access_count: 0
    };
    user.login.push(entry);
  }

  entry.last_access = rdb.now();
  entry.access_count = entry.access_count + 1;


  return replaceUser(user);

}


