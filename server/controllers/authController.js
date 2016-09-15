import {authenticate} from '../lib/auth';
import {generate,verify} from '../lib/token';
import config from '../config';
import * as model from '../models/userModel';
import log from '../lib/nodelogger';
import uuid from 'uuid';
import * as userModel from '../models/userModel';
import rdb from 'rethinkdb';
import nodemailer from 'nodemailer'
import {hash_password} from '../lib/auth';


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

      if (password!==password2) {
        res.status(400);
        return res.send({ error: 'A két jelszó nem egyezik.' });
      }


      userModel.getUserByPasswordResetId(id)
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
                   return userModel.replaceUser(user);

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
      const url = `${config.rootUrl}/change-password/${id}`;
      const link = `<a href='${url}'>${url}</a>`;


      // beírás a db-be a user profiljához
      userModel.getUserByEmail(email)
               .then((user)=> {
                 if (user) {
                   user.password_reset = {
                     id,
                     created_at: rdb.now()
                   };

                   return userModel.updateUser(user);

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
                   })

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

    try {
      const {token}=req.body;

      const data = verify(token, (err)=> {
        throw err;
      });

      model.getUserByEmail(data.user.email)
           .then((user)=> {
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

    const {email,password}=req.body;
    try {
      if (!(email || password) || email.length < 3) {
        throw new Error('Az email cím és jelszó megadása kötelező');
      }

      model.getUserByEmail(email)
           .then((user)=> {
             log.debug('login/1', user);
             if (!user) {
               throw new Error('Az email cím vagy jelszó nem megfelelő');
             }

             if (user.blocked) {
               throw new Error('A fiókja jelenleg le van tiltva.');
             }
             return user;
           })
           .then((user)=> {
             log.debug('login/2', user);
             return authenticate(password, user.password)
               .then((authenticated)=> {
                 log.debug('login/3', authenticated);
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
             log.debug('login/err');
             return res.send({ error: err.message });
           });
    } catch (err) {
      return res.send({ error: err.message });
    }
  }
}

export default AuthController;
