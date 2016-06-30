import axios from 'axios';

class UsertestApi {

  static getUserTest(user_id,test_id) {
    return axios.get(`/usertests/${user_id}/${test_id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static saveUserTest(test) {
    return axios.post(`/usertests/${test.user_id}/${test.id}`,
      {test},
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

}

export default UsertestApi;
