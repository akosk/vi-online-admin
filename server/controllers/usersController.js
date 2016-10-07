import rdb from 'rethinkdb';
import config from '../config';
import * as model from '../models/userModel';

import {hash_password} from '../lib/auth';
import log from '../lib/nodelogger';

class UsersController {

  static saveUser(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const {user}=req.body;

    let promise = null;

    if (user.id === undefined) {
      promise =

        model.getUserByEmail(user.email)
             .then((user)=> {
               if (user) {
                 return Promise.reject('Már van ilyen email című felhasználó!');
               }
             })
             .then(()=> {
               return hash_password(user.password);
             })
             .then((hash)=> {
               log.debug('new hash:', hash);
               return model.insertUser({ ...user, password: hash, role: 'user' });
             });

    } else {
      log.debug('Módosítás');
      promise = model.updateUser(user);
      return res.send({ user });
    }

    promise.then((user)=> {
             log.debug('saveUser', user);
             res.send({ user });
           })
           .catch((err)=> {
             log.debug(err);
             res.status(500);
             return res.send(err);
           });

  }

  static getAllUsers(req, res) {
    model.getAllUsers()
         .then((users)=> {
           return res.send(users);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });

  }

  static getUser(req, res) {
    const {user_id}=req.params;
    model.getUser(user_id)
         .then((user)=> {
           return res.send(user);
         })
         .catch((err)=> {
           log.debug(err);
           res.status(500);
           return res.send(err);
         });

  }

  static deleteUsers(req, res) {
    if (!req.body) {
      return res.send('Bad request.');
    }

    log.debug(req.body);
    const {ids}=req.body;

    const promises = [];
    for (let i = 0; i < ids.length; i++) {
      promises.push(model.deleteUser(ids[i]));
    }

    Promise.all(promises)
           .then((values)=> {
             res.send('OK');
           })
           .catch((err)=> {
             log.debug(err);
             res.status(500);
             return res.send(err);
           });


  }

}

export default UsersController;
