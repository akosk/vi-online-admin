import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';



export function getTest(test_id) {
  console.log(`getTest`,test_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('tests')
                        .get(test_id)
                        .run(conn);
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getAllTests() {
  console.log(`getAllTests`);
  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('tests')
                        .coerceTo('array')
                        .run(conn);
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

