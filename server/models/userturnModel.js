import rdb from 'rethinkdb';
import config from '../config';
import * as filter from '../../common/filterSchema';
import * as fieldTypes from '../../common/fieldTypes';
import _ from 'lodash';
import log from '../lib/nodelogger';


const addOrFilter = (filterContent, filter) => {
  if (filterContent) {
    return filterContent.or(filter);
  } else {
    return filter;
  }
};

const appendFilter = (query, c, field) => {

  switch (field.type) {
    case fieldTypes.ENTRY:
      query = query.hasFields(c.value);
      break;
    case fieldTypes.RADIOGROUP:
      query = query("value").eq(`${c.value}`);
      break;
    case fieldTypes.MULTICHECKBOX:
      query = query(c.value)('checked').eq(true);
      break;
    case fieldTypes.SELECT:
      query = query.eq(`${c.value}`);
      break;
    case fieldTypes.TEXT:
    case fieldTypes.STRING:
      switch (c.rel) {
        case 'LIKE':
          query = query.match(`${c.value}`);
          break;
        case 'NOT LIKE':
          query = query.match(`${c.value}`).not();
          break;
        case '=':
        case '<>':
          query = query.eq(`${c.value}`);
          break;
        case '!=':
          query = query.ne(`${c.value}`);
          break;
        case '>':
          query = query.gt(`${c.value}`);
          break;
        case '<':
          query = query.lt(`${c.value}`);
          break;
        case '<=':
          query = query.le(`${c.value}`);
          break;
        case '>=':
          query = query.ge(`${c.value}`);
          break;
      }
      break;
    case fieldTypes.DATETIME:
    case fieldTypes.DATE:
      switch (c.rel) {
        case '=':
        case '<>':
          query = query.eq(c.value);
          break;
        case '!=':
          query = query.ne(c.value);
          break;
        case '>':
          query = query.gt(c.value);
          break;
        case '<':
          query = query.lt(c.value);
          break;
        case '<=':
          query = query.le(c.value);
          break;
        case '>=':
          query = query.ge(c.value);
          break;
      }
      break;
  }

  if (c.rel=="<>"){
    query=query.not();
  }
  return query;
};

const addFilter = (table, f) => {
  if (!_.has(f, 'conditions')) return table;

  const conditionsByTable = _.groupBy(f.conditions, (i)=> {

    return Array.isArray(i) ? i[0].table : i.table;
  });

  // Végigmegyünk az összes táblán
  _.keys(conditionsByTable).forEach((t) => {

    //Index meghatázozása, ha ez a users tábla, akkor nem kell külön index.
    const index = t === 'users' ? {} : { index: 'user_id' };

    // Felhasználó tábla joinolása
    table = table.eqJoin("user_id", rdb.table(t), index);

    // Végigmegyünk a tábla összes feltételén
    conditionsByTable[t].forEach((condition)=> {
      let filterContent;
      let funfilterContent;
      if (!Array.isArray(condition)) {
        condition = [condition];
      }
      condition.forEach((c)=> {

        const field = filter.findField(c.tableId, c.field);

        let query;

        // mi az a : ?
        let path = field.rname.split(":");



        if (path.length > 1) {

          query = rdb.row('right')(path[0]).contains(
            function (q) {
              return q("id").eq(path[1]).and(appendFilter(q("value"), c, field));
            }
          );

        } else {
          path = field.rname.split(".");
          if (path.length > 1) {
            //TODO: nested field filter
          } else {
            query = appendFilter(rdb.row('right')(c.field), c, field);
          }
        }


        filterContent = addOrFilter(filterContent, query);
      });


      if (filterContent) {
        table = table.filter(filterContent);
      }

    });


    table = table.without('right').zip();
  });

  return table;
};


export function getTurnMembers(turn_id, filter) {
  log.debug(`getTurnMembers`);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              let table = rdb.table('userturns')
                             .filter({ turn_id });
              table = addFilter(table, filter);
              return table
                .eqJoin("user_id", rdb.table("users"))
                //.map(rdb.row("right"))
                .zip()
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
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function getUserTurn(user_id, turn_id) {
  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((userturns)=> {
              if (userturns.length == 0) {
                return null;
              }
              const userturn = userturns[0];
              return userturn;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}

export function getUserTurnById(userturn_id) {
  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .get(userturn_id)
                        .coerceTo('array')
                        .run(conn);
            })
            .then((userturns)=> {
              if (userturns.length == 0) {
                return null;
              }
              const userturn = userturns[0];
              return userturn;
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });

}

export function setProgress(user_id, turn_id, progressName) {

  log.debug('setProgress', user_id, turn_id, progressName);
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
                        .run(conn);
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((userturns)=> {
              if (userturns.length > 0) return userturns[0];
              return {};
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}

export function setProgressById(userturn_id, progressName) {

  const progress = {};
  progress[progressName] = {
    created_at: rdb.now()
  };

  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .get(userturn_id)
                        .update({
                            progress
                          },
                          { return_changes: true }
                        )
                        .run(conn);
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .get(userturn_id)
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

export function setAgreementNoteById(userturn_id, note) {

  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .get(userturn_id)
                        .update({
                            agreement_note: note
                          },
                          { return_changes: true }
                        )
                        .run(conn);
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .get(userturn_id)
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

export function removeProgressById(userturn_id, progressName) {

  const progress = {};
  progress[progressName] = {
    created_at: rdb.now()
  };


  const without = {
    progress: {}
  };
  without.progress[progressName] = true;

  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .get(userturn_id)
                        .replace(
                          rdb.row.without(without)
                          ,
                          { return_changes: true }
                        )
                        .run(conn);
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .get(userturn_id)
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

export function sendMessage(userturn_id, data) {

  const newMessage = {
    ...data,
    created_at: rdb.now()
  };

  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .get(userturn_id)
                        .update(
                          (ut)=>{
                            return {
                              messages:ut('messages')
                                .default([])
                                .append(newMessage)
                            }
                          }
                        )
                        .run(conn);
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .get(userturn_id)
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


export function removeProgress(user_id, turn_id, progressName) {

  const progress = {};
  progress[progressName] = {
    created_at: rdb.now()
  };


  const without = {
    progress: {}
  };
  without.progress[progressName] = true;

  let conn;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .replace(
                          rdb.row.without(without)
                          ,
                          { return_changes: true }
                        )
                        .run(conn);
            })
            .then((result)=> {
              return rdb.table('userturns')
                        .filter({ user_id, turn_id })
                        .coerceTo('array')
                        .run(conn);
            })
            .then((result)=> {
              return result.length > 0 ? result[0] : {};
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });
}


export function insertUserturn(user_id, turn_id) {
  log.debug(`insertUserturn`, user_id, turn_id);

  let conn = null;
  return rdb.connect(config.db)
            .then((c)=> {
              conn = c;
              return rdb.table('userturns')
                        .insert({ user_id, turn_id, created_at: rdb.now() })
                        .run(conn);
            })
            .error(function (err) {
              log.debug(err);
            })
            .finally(function () {
              if (conn) conn.close();
            });


}
