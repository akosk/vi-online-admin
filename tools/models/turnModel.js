import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export function updateTurn(turn) {
  console.log(`updateTurn`, turn);


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
              console.log('turn update return:', turn.id);
              return turn;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function insertTurn(turn) {
  console.log(`insertTurn`, turn);

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
              console.log('turn insert return:', turn.id);
              return turn;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function deleteTurn(turn_id) {
  console.log(`deleteTurn`);

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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function getAllTurns() {
  console.log(`turnModel/getAllTurns`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('turns')
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

export function getTurn(turn_id) {
  console.log(`getTurn ${turn_id}`);


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
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}



