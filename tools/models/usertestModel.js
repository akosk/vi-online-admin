import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export async function getUserTest(user_id, test_id) {

  const connection = await pool.getConnection();
  let cursor = await rdb.table('usertests')
                        .filter({ user_id, test_id })
                        .run(connection);

  let usertest = await cursor.toArray();

  pool.closeConnection(connection);
  return usertest;
}

export async function insertUserTest(usertest) {
  const connection = await pool.getConnection();

  const result = await rdb.table('usertests')
                          .insert(usertest)
                          .run(connection);

  pool.closeConnection(connection);
  return result;

}

export async function saveUserTest(usertest) {
  const connection = await pool.getConnection();

  let result = await rdb.table('usertests')
                        .get(usertest.id)
                        .update(usertest)
                        .run(connection);

  pool.closeConnection(connection);
  return result;

}

