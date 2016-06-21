import bcrypt from 'bcrypt';
import {verify} from './token';

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
