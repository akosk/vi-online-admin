import {authenticate,hash_password} from '../lib/auth';
import {generate,verify} from '../lib/token';
import config from '../config';
import _ from "lodash";
import * as model from '../models/userModel';
import log from '../lib/nodelogger';
import uuid from 'uuid';
import rdb from 'rethinkdb';
import nodemailer from 'nodemailer';


class AuthController {

  static changePassword(req, res) {
    log.debug('changePassword');

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    try {
      const {id,old_password,password,password2}=req.body;
      log.debug('pass:', password);
      let user = null;

      if (!id) {
        res.status(400);
        return res.send({ error: 'A jelszó változtatására való kódja lejárt. Kérjen új email-t.' });

      }

      if (password !== password2) {
        res.status(400);
        return res.send({ error: 'A két jelszó nem egyezik.' });
      }

      model.getUserByPasswordResetId(id)
               .then((u)=> {
                 user = u;
                 return hash_password(password);
               })
               .then((hash)=> {
                 log.debug("getUserByPasswordResetId>", user, hash);
                 if (user) {
                   user.password_reset = {};
                   user.password = hash;

                   //módosítjuk a jelszót
                   return model.replaceUser(user);

                 }
                 return null;
               })
               .then((user)=> {
                 res.send('OK');
               })
               .catch((err)=> {
                 res.status(400);
                 return res.send({ error: 'A jelszó módosítása sikertelen.' });
               });


    } catch (err) {
      log.debug(err.message);
      res.status(500);
      return res.send({ error: err.message });
    }
  }


  static sendPasswordResetEmail(req, res) {
    log.debug('sendPasswordReset');

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    try {
      const {email}=req.body;

      const id = uuid.v1();
      const url = `${config.rootUrl}change-password/${id}`;
      const link = `<a href='${url}'>${url}</a>`;


      // beírás a db-be a user profiljához
      model.getUserByEmail(email)
               .then((user)=> {
                 if (user) {
                   user.password_reset = {
                     id,
                     created_at: rdb.now()
                   };

                   return model.updateUser(user);

                 }
                 return null;
               })
               .then((user)=> {
                 if (user) {
                   const transporter = nodemailer.createTransport(config.smtp);
                   transporter.sendMail({
                     from: 'admin@vallalkozzitthon.hu',
                     to: email,
                     subject: 'Új jelszó beállítása - Vállalkozz Itthon',
                     html: `
                     Tisztelt Vállalkozó!<br/>
                     <br/>
                     Kattintson az alábbi linkre az új jelszó beállításához: ${link} <br/>
                     <br/>
                     <br/>
                     Üdvözlettel:<br/>
                     Vállalkozz Itthon

                     `
                   }, (err, info)=> {
                     log.debug('Email sent.', info);
                   });

                 }
                 res.send('OK');
               });


    } catch (err) {
      log.debug(err.message);
      return res.send({ error: err.message });
    }
  }

  static loginWithToken(req, res) {
    log.debug('loginWithToken');


    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
      const {token}=req.body;

      const data = verify(token, (err)=> {
        throw err;
      });

      let user = null;
      model.getUserByEmail(data.user.email)
           .then((u)=> {
             user = u;
             return model.updateUserLoginInfo(user, { ip });
           })
           .then(()=> {
             if (user.blocked) {
               throw new Error('A felhasználó tiltva van.');
             }
             res.send({ user, token });
           })
           .catch((err)=> {
             log.debug(err.message);
             return res.send({ error: err.message });
           });

    } catch (err) {
      log.debug(err.message);
      return res.send({ error: err.message });
    }

  }

  static login(req, res) {
    log.debug('login');
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {email,password}=req.body;
    try {
      if (!(email || password) || email.length < 3) {
        throw new Error('Az email cím és jelszó megadása kötelező');
      }

      let user = null;
      let authenticated = false;
      model.getUserByEmail(email)
           .then((u)=> {
             user = u;
             if (!user) {
               throw new Error('Az email cím vagy jelszó nem megfelelő');
             }

             if (user.blocked) {
               throw new Error('A fiókja jelenleg le van tiltva.');
             }
             return user;
           })
           .then((user)=> {
             return authenticate(password, user.password)
               .then((a)=> {
                 authenticated = a;
                 if (authenticated) {
                   return model.updateUserLoginInfo(user, { ip });
                 }
               })
               .then(()=> {
                 if (authenticated) {
                   return res.send({
                     user,
                     token: generate(user),
                   });
                 } else {
                   throw new Error('Az email cím vagy jelszó nem megfelelő');
                 }
               });
           })

           .catch((err)=> {
             log.debug('Login error.');
             return res.send({ error: err.message });
           });
    } catch (err) {
      return res.send({ error: err.message });
    }
  }
}

export default AuthController;
