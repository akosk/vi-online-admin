import bcrypt from 'bcrypt';
import {verify} from './token';

import * as model from '../models/userModel'

export function hash_password(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) return reject(error);

      bcrypt.hash(password, salt, function (error, hash) {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  });
}

export function authenticate(password, hash) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hash, function (error, response) {
      if (error) return reject(error);
      return resolve(response);
    });
  });
}


export function authorize (request, response, next) {
  const apiToken = request.headers['x-api-token'];
  const data=verify(apiToken, next);
  request.token=data;
  next();
}

export function blocked(request, response, next) {
  const {email}=request.token.user;
  model.getUserByEmail(email).then((user)=>{
    if (user.blocked) {
      var expiredError = new Error('A fiókja jelenleg le van tiltva');
      expiredError.status = 401;
      return next(expiredError);
    }
    next();
  });

}
