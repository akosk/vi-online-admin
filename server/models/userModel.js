import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export function updateSignupStatementFile(user_id, turn_id, filename) {
  console.log(`updateSignupStatementFile ${user_id} ${turn_id} ${filename}`);


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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getUserByEmail(email) {
  console.log(`userModel/getUserByEmail ${email}`);

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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function getAllUsers() {
  console.log(`getAllUsers`);
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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
              const end = new Date().getTime();
              const time = end - start;
              console.log('Execution time: ' + time);
            });
}

export function getUser(user_id) {
  console.log(`getUser`,user_id);
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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function deleteUser(user_id) {
  console.log(`deleteUser`);

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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}


export function updateUser(user) {
  console.log(`updateUser`, user);


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
              console.log('user update return:', user.id);
              return user;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function insertUser(user) {
  console.log(`insertUser`, user);

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
              console.log('user insert return:', user.id);
              return user;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}


