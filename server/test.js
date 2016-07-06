import rdb from 'rethinkdb';
import pool from './lib/RethinkDbConnectionPool';


const p=function() {
  return new Promise((resolve,reject)=>{
    resolve(22);
  });
};

const t1 = function (time) {
  console.log('t1 - before getConnection');
  const connection=  /* await */  pool.getConnection();
  console.log('t1 - after getConnection');
  let userturnsCursor =  /* await */  rdb.table('userturns')
                                 .run(connection);
  console.log('t1 - after rdb');
  const masik= /* await */  t2(888);
  console.log('t1 - promise');
  const e= p();
  console.log(e);

  const userturns =  /* await */  userturnsCursor.toArray();
  pool.closeConnection(connection);
  pool.closeAll();
  return userturns.length;
};

const t2 = function (time) {
  console.log('t1 - before getConnection');
  const connection=  /* await */  pool.getConnection();
  console.log('t1 - after getConnection');
  let userturnsCursor =  /* await */  rdb.table('userturns')
                                 .run(connection);
  console.log('t1 - after rdb');
  const userturns =  /* await */  userturnsCursor.toArray();
  pool.closeConnection(connection);

  return userturns.length;
};


const parent = function () {
  console.log('parent');
  const a =  /* await */  t1(200);
  console.log('a', a);
  const b =  /* await */  t1(500);
  console.log('b', b);

  console.log('parent end.');
};

console.log('Test...');
//parent();
const r=t1(200);

//  .then((t)=>{
//  console.log(t);
//  pool.closeAll();
//});

console.log('Test end.');
