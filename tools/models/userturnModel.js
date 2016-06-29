import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export function getUserCurrentTurn(user_id) {

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .filter({ user_id })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((userturns)=> {
              if (userturns.length == 0) {
                return null;
              }
              return userturns[0];
            })
            .then((userturn)=> {
              if (!userturn) return null;
              return rdb.table('turns')
                        .get(userturn.turn_id)
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

//export function getUserTurn(user_id, turn_id) {
//  console.log('hihi');
//  const connection =  /* await */  pool.getConnection();
//  console.log('haha');
//  rdb.table('userturns')
//     .filter({ user_id, turn_id })
//     .run(connection)
//     .then(
//       (data)=>{
//         console.log(data);
//         console.log('huhu');
//         data.toArray().then(
//           (userturns)=>{
//             console.log(userturns);
//             if (userturns.length == 0) {
//               return null;
//             }
//             const userturn = userturns[0];
//             pool.closeConnection(connection);
//             return userturn;
//
//           }
//         );
//
//       }
//     );
//
//}
export function getUserTurn(user_id, turn_id) {
  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .coerceTo('array')
                        .run(conn)
            })
            .then((userturns)=> {
              if (userturns.length == 0) {
                return null;
              }
              const userturn = userturns[0];
              return userturn;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function setProgress(user_id, turn_id, progressName) {

  const progress = {};
  progress[progressName] = {
    created_at: rdb.now()
  };

  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .update({
                            progress
                          },
                          { return_changes: true }
                        )
                        .run(conn)
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .coerceTo('array')
                        .run(conn)
            })
            .then((userturns)=>{
              if (userturns.length>0) return userturns[0];
              return {};
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}


export function insertUserturn(user_id, turn_id) {
  console.log(`insertUserturn`, user_id, turn_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .insert({ user_id, turn_id, created_at: rdb.now() })
                        .run(conn);
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}
