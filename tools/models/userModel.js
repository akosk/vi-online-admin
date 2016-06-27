import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export async function updateSignupStatementFile(user_id, turn_id, filename) {
  console.log(`updateSignupStatementFile ${user_id} ${turn_id} ${filename}`);
  const connection = await pool.getConnection();
  const result = await rdb.table('userturns')
                          .filter({user_id,turn_id})
                          .update({ signup_statement_file: filename })
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}

export async function getUserByEmail(email) {
  console.log(`userModel/getUserByEmail ${email}`);
  const connection = await pool.getConnection();

  const result = await rdb.table('users')
                          .filter({ email })
                          .run(connection);
  const userArray=await result.toArray();
  pool.closeConnection(connection);

  return userArray.length>0?userArray[0]:null;
}

export async function getAllUsers() {
  console.log(`getAllUsers`);
  const connection = await pool.getConnection();
  const result = await rdb.table('users')
                          .run(connection);
  const usersArray=await result.toArray();
  pool.closeConnection(connection);
  return usersArray;
}

export async function deleteUser(user_id) {
  console.log(`deleteUser`);
  const connection = await pool.getConnection();
  const result = await rdb.table('users')
                          .get(user_id)
                          .delete()
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}


export async function updateUser(user) {
  console.log(`updateUser`,user);
  const connection = await pool.getConnection();
  const result = await rdb.table('users')
                          .get(user.id)
                          .update(user)
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}

export async function insertUser(user) {
  console.log(`insertUser`,user);
  const connection = await pool.getConnection();
  const result = await rdb.table('users')
                          .get(user.id)
                          .insert(user)
                          .run(connection);
  pool.closeConnection(connection);
  return result.generated_keys;
}


