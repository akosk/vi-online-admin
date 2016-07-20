import rdb from 'rethinkdb';
import config from '../config';
import log from '../lib/nodelogger';

class RethinkDbConnectionPool {
  constructor() {
    this.pool=[];
    this.connections=0;
  }

  getConnection() {
    const {pool}=this;
    this.connections++;
    log.debug(`getConnection ${pool.length} in pool. ${this.connections} in use.`);
    if (pool.length===0) {
      log.debug(`creating new connection`);
      const connection =  /* await */  rdb.connect(config.db);
      return connection;
    } else {
      log.debug(`There is a connection in pool, new pool length: ${pool.length-1}`);
      return pool.pop();
    }
  }

  closeConnection(connection) {
    this.connections--;
    this.pool.push(connection);
    log.debug(`closeConnection new pool length: ${this.pool.length}.  ${this.connections} in use.`);
  }

  closeAll() {
    this.pool.forEach((conn)=>{
      conn.close();
    });
  }
}

let pool=new RethinkDbConnectionPool();

export default pool;
