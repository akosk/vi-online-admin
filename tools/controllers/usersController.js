import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/userModel';

import {hash_password} from '../lib/auth';

class UsersController {

  static async saveUser(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user}=req.body;

    if (user.id === undefined) {
      try {
        const hash = await hash_password(user.password);
        const result=model.insertUser({ ...user, password: hash, role: 'user' });
        return res.send(result.generated_keys);
      } catch (err) {
        console.log(err);
        res.status(500);
        return res.send(err);
      }

    } else {
      console.log('Módosítás');
      const result=await model.updateUser(user);
      return res.send({user});
    }

  }

  static async getAllUsers(req, res) {
    try {
      const users = await model.getAllUsers();
      return res.send(users);
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }
  }

  static async deleteUsers(req, res) {
    try {
      if (!req.body) {
        return res.send('Bad request.');
      }

      console.log(req.body)
      const {ids}=req.body;

      for (var i = 0; i < ids.length; i++) {
        let result = await model.deleteUser(ids[i]);
      }
      return res.send('Ok');
    } catch (err) {
      console.log(err);
      res.status(500);
      return res.send(err);
    }
  }

}

export default UsersController;
