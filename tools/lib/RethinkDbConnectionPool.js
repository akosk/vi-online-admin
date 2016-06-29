import rdb from 'rethinkdb';
import config from '../config';

class RethinkDbConnectionPool {
  constructor() {
    this.pool=[];
    this.connections=0;
  }

  getConnection() {
    const {pool}=this;
    this.connections++;
    console.log(`getConnection ${pool.length} in pool. ${this.connections} in use.`);
    if (pool.length===0) {
      console.log(`creating new connection`);
      const connection =  /* await */  rdb.connect(config.db);
      return connection;
    } else {
      console.log(`There is a connection in pool, new pool length: ${pool.length-1}`);
      return pool.pop();
    }
  }

  closeConnection(connection) {
    this.connections--;
    this.pool.push(connection);
    console.log(`closeConnection new pool length: ${this.pool.length}.  ${this.connections} in use.`);
  }

  closeAll() {
    this.pool.forEach((conn)=>{
      conn.close();
    })
  }
}

let pool=new RethinkDbConnectionPool();

export default pool;
