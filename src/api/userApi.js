import axios from 'axios';

class UserApi {

  static saveUser(user) {
    return axios.post(`/users`, { user });
  }

  static getAllUsers() {
    return axios.get('/users',
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static deleteUsers(ids) {
    return axios.post('/delete-users',
      {ids},
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }
}

export default UserApi;
