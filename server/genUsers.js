import log from './lib/nodelogger';
import r from "rethinkdb";
import async from "async" ;
import c from './config';
import faker from 'faker';
const config = c.db;


const data = {
  users: []
};

for (let i = 0; i <= 2000; i++) {
  data.users.push({
      "email": faker.internet.email(),
      "name": faker.name.findName(),
      "password": "$2a$10$n1ibxVDRwPpHsao7suMmEO1dmxaLnjTohr0XxcCMwWvT61ZKfP9Ei",
      "role": "user"
    }
  );
}

const loadData = (name, next) => {
  log.debug(`loadData ${name}`);
  r.connect(config, (err, conn) => {
    r.table(name).insert(data[name]).run(conn, (err, res) => {
      conn.close();
      next(err, res);
    });

  });
};


const createData = (next) => {
  async.map(["users"], loadData, next);
};

async.series({
  data: createData
}, function (err, res) {
  log.debug(res);
});


