import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export async function updateTurn(turn) {
  console.log(`saveTurn`,turn);
  const connection = await pool.getConnection();
  const result = await rdb.table('turns')
                          .get(turn.id)
                          .update(turn)
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}

export async function insertTurn(turn) {
  console.log(`saveTurn`,turn);
  const connection = await pool.getConnection();
  const result = await rdb.table('turns')
                          .insert(turn)
                          .run(connection);
  console.log(result);
  pool.closeConnection(connection);
  return result;
}

export async function deleteTurn(turn_id) {
  console.log(`deleteTurn`);
  const connection = await pool.getConnection();
  const result = await rdb.table('turns')
                          .get(turn_id)
                          .delete()
                          .run(connection);
  pool.closeConnection(connection);
  return result;
}

export async function getAllTurns() {
  console.log(`getAllTurns`);
  const connection = await pool.getConnection();
  const result = await rdb.table('turns')
                          .run(connection);

  const turns= await result.toArray();
  pool.closeConnection(connection);
  return turns;
}



