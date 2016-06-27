import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export async function updateSignupData(signupData) {
  console.log('updateSignupData',signupData)
  delete(signupData.created_at);
  delete(signupData.user_id);

  const connection = await pool.getConnection();
  const result = await rdb.table('signup_datas')
                          .get(signupData.id)
                          .update({ ...signupData, updated_at: rdb.now() })
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}

export async function insertSignupData(signupData) {
  console.log('insertSignupData',signupData)

  const connection = await pool.getConnection();
  const result = await rdb.table('signup_datas')
                          .insert({ ...signupData, created_at: rdb.now() })
                          .run(connection);
  console.log(result);
  const newSignupData=await getSignupData(result.generated_keys);
  pool.closeConnection(connection);

  return newSignupData;
}

export async function getSignupData(id) {
  console.log('getSignupData',id)


  const connection = await pool.getConnection();
  const result = await rdb.table('signup_datas')
                          .get(id)
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}

export async function getSignupDataByUserId(user_id) {

}
