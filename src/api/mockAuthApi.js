import delay from './delay';

import  * as types from '../actions/actionTypes';
import users from './mockUsers';

class AuthApi {

  static login(loginData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          type: types.LOGIN_SUCCESS,
          user: {
            id:'123',
            name: 'Budapesti Boglárka',
            email: loginData.email,
            role: 'user',
            token: '123456789ABCD'
          }
        });
      }, delay);
    });
  }

}

export default AuthApi;
