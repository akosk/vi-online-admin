import rdb from 'rethinkdb';
import config from '../config';


export async function updateSignupData(signupData) {
  delete(signupData.created_at);
  delete(signupData.user_id);

  const connection = await rdb.connect(config.db);
  const result = await rdb.table('signup_datas')
                          .get(signupData.id)
                          .update({ ...signupData, updated_at: rdb.now() })
                          .run(connection);
  connection.close();
  return result;
}

export async function insertSignupData(signupData) {
  delete(signupData.created_at);
  delete(signupData.user_id);

  const connection = await rdb.connect(config.db);
  const result = await rdb.table('signup_datas')
                          .get(signupData.id)
                          .update({ ...signupData, updated_at: rdb.now() })
                          .run(connection);
  connection.close();
  return result;
}
