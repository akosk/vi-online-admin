import rdb from 'rethinkdb';
import config from '../config';

import {hash_password} from '../lib/auth';

class UsersController {

  static async saveUser(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {id,name,email,password}=req.body;
    if (id === undefined) {
      try {
        const hash = await hash_password(password);
        const connection = await rdb.connect(config.db);
        const result = await rdb.table('users')
                                .insert({ name, email, password: hash, role: 'user' })
                                .run(connection);
        return res.send(result.generated_keys);

      } catch (err) {
        console.log(err);
        res.status(500);
        return res.send(err);
      }

    } else {
      console.log('Módosítás');
    }

  }
}

export default UsersController;
