import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';
import log from '../lib/nodelogger';


export function updateTurn(turn) {
  log.debug(`updateTurn`, turn);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('turns')
                        .get(turn.id)
                        .update(turn, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length>0) {
                turn = {...turn,...result.changes[0].new_val};
              }
              log.debug('turn update return:', turn.id);
              return turn;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function insertTurn(turn) {
  log.debug(`insertTurn`, turn);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('turns')
                        .insert(turn, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              const turn = result.changes[0].new_val;
              log.debug('turn insert return:', turn.id);
              return turn;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function deleteTurn(turn_id) {
  log.debug(`deleteTurn`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('turns')
                        .get(turn_id)
                        .delete()
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function getAllTurns() {
  log.debug(`turnModel/getAllTurns`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('turns')
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

export function getTurn(turn_id) {
  log.debug(`getTurn ${turn_id}`);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('turns')
                        .get(turn_id)
                        .coerceTo('object')
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}



