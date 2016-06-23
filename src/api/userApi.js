import axios from 'axios';

class UserApi {

  static saveUser({id, name,email,password}) {
    return axios.post(`/users`, { id, name, email, password });
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
