import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';
import log from '../lib/nodelogger';


export function getTest(test_id) {
  log.debug(`getTest`,test_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('tests')
                        .get(test_id)
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getAllTests() {
  log.debug(`getAllTests`);
  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('tests')
                        .coerceTo('array')
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

