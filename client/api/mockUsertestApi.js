import delay from './delay';
import _ from 'lodash';
import log from '../utils/logger';

const usertests = [];

class UsertestApi {


  static getUserTestByIds(user_id, test_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usertest = _.find(usertests, (item)=> {
          return item.user_id === user_id &&
            item.test_id === test_id;
        });

        const test_id = usertest ? usertest.test_id : undefined;
        log('getUsersActiveTestId', test_id);
        resolve(test_id);
      }, delay);
    });
  }

  static saveUserTest(test) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {


        const existingIndex = usertests.findIndex(
          a => a.user_id == test.user_id && a.test_id == test.test_id);
        usertests.splice(existingIndex, 1, test);

        resolve(_.cloneDeep(test));
      }, delay);
    });
  }


}

export default UsertestApi;
