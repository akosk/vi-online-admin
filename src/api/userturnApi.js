import axios from 'axios';
import turnApi from './turnApi';

class UserturnApi {


  static getSignupStatement(user_id,test_id) {
    return axios.get(`/userturns/${user_id}/${test_id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static async getCurrentTurn(user_id) {
    return axios.get(`/get-current-turn/${user_id}`,
        {
          headers: { 'x-api-token': localStorage.getItem('token') }
        }
      );
  }
  static async getUserTurn(user_id,turn_id) {
    return axios.get(`/userturns/${user_id}/${turn_id}`,
        {
          headers: { 'x-api-token': localStorage.getItem('token') }
        }
      );
  }

  static async finalizeSignup(user_id,turn_id) {
    return axios.post(`/finalize-signup`,
      {user_id,turn_id},
        {
          headers: { 'x-api-token': localStorage.getItem('token') }
        }
      );
  }

  static signUpToTurn(user, turn) {
    return axios.put(`/userturns`, { user_id: user.id, turn_id: turn.id });
  }

  static saveUser({id, name,email,password}) {
    return axios.post(`/users`, { id, name, email, password });
  }
}

export default UserturnApi;
