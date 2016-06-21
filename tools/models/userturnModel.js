import rdb from 'rethinkdb';
import config from '../config';


export async function getUserCurrentTurn(user_id) {

  const connection = await rdb.connect(config.db);
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

  connection.close();
  return turns.length > 0 ? turns[0] : null;
}

export async function getUserTurn(user_id, turn_id) {

  const connection = await rdb.connect(config.db);
  let userturnsCursor = await rdb.table('userturns')
                                 .filter({ user_id, turn_id })
                                 .run(connection);

  const userturns = await userturnsCursor.toArray();


  if (userturns.length == 0) {
    return null;
  }
  const userturn = userturns[0];
  connection.close();

  return userturn;
}

export async function setProgress(user_id, turn_id, progressName) {
  const connection = await rdb.connect(config.db);

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

  connection.close();
  return userturn;
}

