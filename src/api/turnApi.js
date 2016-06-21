import axios from 'axios';

class TurnApi {

  static getTurnById(turn_id) {
    return axios.post(`/get-turn`,
      { turn_id },
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static getAllTurns() {
    return axios.get(`/turns`,
      {},
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }


}

export default TurnApi;
