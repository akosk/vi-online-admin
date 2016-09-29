import axios from 'axios';
import turnApi from './turnApi';

class UserturnApi {


  static loadUser(user_id) {
    return axios.get(`/users/${user_id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }
  static getTurnMembers(turn_id, filter) {
    return axios.post(`/get-turn-members/${turn_id}`,
      {filter},
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }



  static setProgress(userturn_id, progress) {
    return axios.post(`/set-progress/${userturn_id}`,
      { progress },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static setAgreementNote(userturn_id, note) {
    return axios.post(`/set-agreement-note/${userturn_id}`,
      { note },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static removeProgress(userturn_id, progress) {
    return axios.post(`/remove-progress/${userturn_id}`,
      { progress },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static  getCurrentTurn(user_id) {
    return axios.get(`/get-current-turn/${user_id}`,
      {
        headers: { 'x-api-token': localStorage.getItem('token') }
      }
    );
  }

  static  getUserTurn(user_id, turn_id) {
    return axios.get(`/userturns/${user_id}/${turn_id}`,
      {
        headers: { 'x-api-token': localStorage.getItem('token') }
      }
    );
  }

  static  finalizeSignup(user_id, turn_id) {
    return axios.post(`/finalize-signup`,
      { user_id, turn_id },
      {
        headers: { 'x-api-token': localStorage.getItem('token') }
      }
    );
  }

  static signUpToTurn(user, turn) {
    return axios.put(`/userturns`,
      { user_id: user.id, turn_id: turn.id },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static saveUser({id, name,email,password}) {
    return axios.post(`/users`, { id, name, email, password });
  }
}

export default UserturnApi;
