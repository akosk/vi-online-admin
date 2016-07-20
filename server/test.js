import rdb from 'rethinkdb';
import pool from './lib/RethinkDbConnectionPool';
import log from './lib/nodelogger';

const p=function() {
  return new Promise((resolve,reject)=>{
    resolve(22);
  });
};

const t1 = function (time) {
  log.debug('t1 - before getConnection');
  const connection=  /* await */  pool.getConnection();
  log.debug('t1 - after getConnection');
  let userturnsCursor =  /* await */  rdb.table('userturns')
                                 .run(connection);
  log.debug('t1 - after rdb');
  const masik= /* await */  t2(888);
  log.debug('t1 - promise');
  const e= p();
  log.debug(e);

  const userturns =  /* await */  userturnsCursor.toArray();
  pool.closeConnection(connection);
  pool.closeAll();
  return userturns.length;
};

const t2 = function (time) {
  log.debug('t1 - before getConnection');
  const connection=  /* await */  pool.getConnection();
  log.debug('t1 - after getConnection');
  let userturnsCursor =  /* await */  rdb.table('userturns')
                                 .run(connection);
  log.debug('t1 - after rdb');
  const userturns =  /* await */  userturnsCursor.toArray();
  pool.closeConnection(connection);

  return userturns.length;
};


const parent = function () {
  log.debug('parent');
  const a =  /* await */  t1(200);
  log.debug('a', a);
  const b =  /* await */  t1(500);
  log.debug('b', b);

  log.debug('parent end.');
};

log.debug('Test...');
//parent();
const r=t1(200);

//  .then((t)=>{
//  log.debug(t);
//  pool.closeAll();
//});

log.debug('Test end.');
