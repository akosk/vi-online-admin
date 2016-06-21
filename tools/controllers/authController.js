import rdb from 'rethinkdb';
import config from '../config';
import {authenticate} from '../lib/auth';
import {generate} from '../lib/token';
import * as model from '../models/userModel';
import {verify} from '../lib/token'

class AuthController {

  static async loginWithToken(req, res) {
    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }

    try {
      const {token}=req.body;

      const data = verify(token, (err)=> {
        throw err;
      });
      console.log(data);

      const user = await model.getUserByEmail(data.user.email);

      res.send({ user, token });
    } catch (err) {
      return res.send({ error: err.message });
    }

  }

  static async login(req, res) {

    if (!req.body) {
      res.status(400);
      return res.send('Bad request.');
    }
    try {
      const {email,password}=req.body;

      if (!(email || password) || email.length < 3) {
        throw new Error('Az email cím és jelszó megadása kötelező');
      }

      const user = await model.getUserByEmail(email);

      if (!user) {
        throw new Error('Az email cím vagy jelszó nem megfelelő');
      }

      const authenticated = await authenticate(password, user.password);

      if (authenticated) {
        return res.send({
          user,
          token: generate(user),
        });
      } else {
        throw new Error('Az email cím vagy jelszó nem megfelelő');
      }
    } catch (err) {
      return res.send({ error: err.message });
    }
  }
}

export default AuthController;
