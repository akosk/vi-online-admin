import rdb from 'rethinkdb';
import config from '../config';


export async function updateSignupStatementFile(user_id, turn_id, filename) {
  console.log(`updateSignupStatementFile ${user_id} ${turn_id} ${filename}`);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('userturns')
                          .filter({user_id,turn_id})
                          .update({ signup_statement_file: filename })
                          .run(connection);
  connection.close();
  return result;
}

export async function getUserByEmail(email) {
  console.log(`getUserByEmail ${email}`);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('users')
                          .filter({ email: email })
                          .run(connection);
  const userArray=await result.toArray();
  connection.close();
  return userArray.length>0?userArray[0]:null;
}

export async function getAllUsers() {
  console.log(`getAllUsers`);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('users')
                          .run(connection);
  const usersArray=await result.toArray();
  connection.close();
  return usersArray;
}

export async function deleteUser(user_id) {
  console.log(`deleteUser`);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('users')
                          .get(user_id)
                          .delete()
                          .run(connection);
  connection.close();
  return result;
}


export async function updateUser(user) {
  console.log(`updateUser`,user);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('users')
                          .get(user.id)
                          .update(user)
                          .run(connection);
  connection.close();
  return result;
}


