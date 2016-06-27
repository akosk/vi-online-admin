import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export async function getUserCurrentTurn(user_id) {

  const connection = await pool.getConnection();
  let userturnsCursor = await rdb.table('userturns')
                                 .filter({ user_id })
                                 .run(connection);

  const userturns = await userturnsCursor.toArray();


  if (userturns.length == 0) {
    return null;
  }
  const userturn = userturns[0];

  const turnsCursor = await rdb.table('turns')
                               .filter({ id: userturn.turn_id })
                               .run(connection);
  const turns = await turnsCursor.toArray();

  pool.closeConnection(connection);
  return turns.length > 0 ? turns[0] : null;
}

export async function getUserTurn(user_id, turn_id) {

  const connection = await pool.getConnection();
  let userturnsCursor = await rdb.table('userturns')
                                 .filter({ user_id, turn_id })
                                 .run(connection);

  const userturns = await userturnsCursor.toArray();


  if (userturns.length == 0) {
    return null;
  }
  const userturn = userturns[0];
  pool.closeConnection(connection);

  return userturn;
}

export async function setProgress(user_id, turn_id, progressName) {
  const connection = await pool.getConnection();

  const progress = {};
  progress[progressName] = {
    created_at: rdb.now()
  };

  let updateResult = await rdb.table('userturns')
                                 .filter({ user_id, turn_id })
                                 .update({
                                   progress
                                 })
                                 .run(connection);

  let userturnsCursor = await rdb.table('userturns')
                                 .filter({ user_id, turn_id })
                                 .run(connection);

  const userturns = await userturnsCursor.toArray();


  if (userturns.length == 0) {
    return null;
  }
  const userturn = userturns[0];

  pool.closeConnection(connection);
  return userturn;
}



export async function insertUserturn(user_id, turn_id) {
  console.log(`insertUserturn`,user_id, turn_id);
  const connection = await pool.getConnection();
  const result = await rdb.table('userturns')
                          .insert({ user_id, turn_id, created_at: rdb.now() })
                          .run(connection);

  console.log(result);
  pool.closeConnection(connection);
  return result;
}
