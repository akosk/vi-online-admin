import axios from 'axios';

class UserApi {

  static saveUser({id, name,email,password}) {
    return axios.post(`/users`, { id, name, email, password });

    //.then(response => {
    //
    //  localStorage.setItem('token', response.data.token);
    //
    //})
    //.catch(response => dispatch(authError(response.data.error)));
  }
}

export default UserApi;
