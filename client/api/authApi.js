import axios from 'axios';

class AuthApi {

  static login({email,password}) {

    return axios.post(`/login`, { email, password },
      { headers: { 'x-api-token': localStorage.getItem('token') } });
  }

  static changePassword(data) {

    return axios.post(`/change-password`, data,
      { headers: { 'x-api-token': localStorage.getItem('token') } });
  }

  static sendPasswordResetEmail(email) {

    return axios.post(`/send-password-reset-email`,  {email} ,
      { headers: { 'x-api-token': localStorage.getItem('token') } });
  }

  static loginWithToken(token) {
    return axios.post(`/loginWithToken`, { token });

  }
}

export default AuthApi;
