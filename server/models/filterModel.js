import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';


export function updateFilter(filter) {
  console.log(`updateFilter`, filter);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('filters')
                        .get(filter.id)
                        .update(filter, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length>0) {
                filter = {...filter,...result.changes[0].new_val};
              }
              console.log('filter update return:', filter.id);
              return filter;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function insertFilter(filter) {
  console.log(`insertFilter`, filter);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('filters')
                        .insert(filter, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              const filter = result.changes[0].new_val;
              console.log('filter insert return:', filter.id);
              return filter;
            })
            .error(function (err) {
              console.log(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function deleteFilter(filter_id) {
  console.log(`deleteFilter`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('filters')
                        .get(filter_id)
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

export function getAllFilters() {
  console.log(`filterModel/getAllFilters`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('filters')
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

export function getFilter(filter_id) {
  console.log(`getFilter ${filter_id}`);


  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('filters')
                        .get(filter_id)
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



