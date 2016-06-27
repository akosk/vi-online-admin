import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';



export async function getTest(test_id) {
  console.log(`getTest`);
  const connection = await pool.getConnection();

  const test = await rdb.table('tests')
                      .get(test_id)
                      .run(connection);

  pool.closeConnection(connection);
  return test;
}



