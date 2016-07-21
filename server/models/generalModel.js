import rdb from 'rethinkdb';
import config from '../config';
import log from '../lib/nodelogger';


export function update(tableName, doc) {
  log.debug(`general update`, tableName, doc);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table(tableName)
                        .get(doc.id)
                        .update(doc, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length > 0) {
                doc = { ...doc, ...result.changes[0].new_val };
              }
              return doc;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function insert(tableName, doc) {
  log.debug(`general insert`, tableName, doc);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table(tableName)
                        .insert(doc, { return_changes: true })
                        .run(conn);
            })
            .then((result)=> {
              if (result.changes.length>0) {
                doc = {...doc,...result.changes[0].new_val};
              }
              return doc;

            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function remove(tableName, id) {
  log.debug(`general delete`, tableName, id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table(tableName)
                        .get(id)
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

export function findAll(tableName, filter = {}) {
  log.debug('general getAll', tableName, filter);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table(tableName)
                        .filter(filter)
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

export function find(tableName, id) {
  log.debug(`general find `, tableName, id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table(tableName)
                        .get(id)
                        .default({})
                        .coerceTo('object')
                        .run(conn)
            })
            .error((err) => {
              log.debug('ERROR', err);
            })
            .finally(()=> {
              if (conn) conn.close();
            });

}

