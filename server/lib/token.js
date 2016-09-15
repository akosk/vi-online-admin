import config from '../config';
import moment from 'moment';
import jwt from 'jwt-simple';
import log from '../lib/nodelogger';

const secret = config.token_secret;


export function generate(user) {
  const expires = moment().add(7, 'days').valueOf();
  return jwt.encode({ user: { id: user.id, email: user.email, role: user.role }, exp: expires }, secret);
}


export function verify(token, next) {
  if (!token) {
    const notFoundError = new Error('Token not found');
    notFoundError.status = 404;
    return next(notFoundError);
  }

  let decoded;
  try {
    decoded = jwt.decode(token, secret);
  } catch (e) {
    const error = new Error('Bad token');
    error.status = 401;
    return next(error);
  }

  if (decoded.exp <= moment().format('x')) {
    const expiredError = new Error('Token has expired');
    expiredError.status = 401;
    return next(expiredError);
  }

  return decoded;
}
