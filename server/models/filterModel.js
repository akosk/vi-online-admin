import rdb from 'rethinkdb';
import config from '../config';
import pool from '../lib/RethinkDbConnectionPool';
import log from '../lib/nodelogger';


export function updateFilter(filter) {
  log.debug(`updateFilter`, filter);


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
              log.debug('filter update return:', filter.id);
              return filter;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function insertFilter(filter) {
  log.debug(`insertFilter`, filter);

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
              log.debug('filter insert return:', filter.id);
              return filter;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function deleteFilter(filter_id) {
  log.debug(`deleteFilter`);

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
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function getAllFilters() {
  log.debug(`filterModel/getAllFilters`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('filters')
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

export function getFilter(filter_id) {
  log.debug(`getFilter ${filter_id}`);


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
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}



