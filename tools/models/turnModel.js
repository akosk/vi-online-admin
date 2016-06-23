import rdb from 'rethinkdb';
import config from '../config';



export async function updateTurn(turn) {
  console.log(`saveTurn`,turn);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('turns')
                          .get(turn.id)
                          .update(turn)
                          .run(connection);
  connection.close();
  return result;
}

export async function insertTurn(turn) {
  console.log(`saveTurn`,turn);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('turns')
                          .insert(turn)
                          .run(connection);
  console.log(result);
  connection.close();
  return result;
}

export async function deleteTurn(turn_id) {
  console.log(`deleteTurn`);
  const connection = await rdb.connect(config.db);
  const result = await rdb.table('turns')
                          .get(turn_id)
                          .delete()
                          .run(connection);
  connection.close();
  return result;
}



