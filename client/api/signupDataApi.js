import axios from 'axios';
import log from '../utils/logger';

class SignupDataApi {

  static getSignupDataByUserId(user_id) {
    return axios.get(`/get-signup-data/${user_id}`,
      { headers: { 'x-api-token': localStorage.getItem('token') } }
    );
  }

  static saveSignupData(signupData) {
    log('Saving SignupData...', signupData);
    if (signupData.id) {
      return axios.post(`/signup-datas/${signupData.id}`, { ...signupData },
        { headers: { 'x-api-token': localStorage.getItem('token') } }
      );
    } else {
      return axios.post(`/signup-datas`, { ...signupData },
        { headers: { 'x-api-token': localStorage.getItem('token') } });
    }

  }

  static uploadSignupStatement(data) {
    const config = {
      headers: { 'x-api-token': localStorage.getItem('token') }
    };

    return axios.post('/upload', data, config);
  }

}

export default SignupDataApi;
