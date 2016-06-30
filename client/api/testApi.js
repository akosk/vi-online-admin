import axios from 'axios';

class TestApi {

  static getAllTests() {
    return axios.get(`/tests`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

}

export default TestApi;
