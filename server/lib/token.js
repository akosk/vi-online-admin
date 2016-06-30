import config from '../config';
import moment from 'moment';
import jwt from 'jwt-simple';
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

  const decoded = jwt.decode(token, secret);
  if (decoded.exp <= moment().format('x')) {
    var expiredError = new Error('Token has expired');
    expiredError.status = 401;
    return next(expiredError);
  }

  return decoded;
}
