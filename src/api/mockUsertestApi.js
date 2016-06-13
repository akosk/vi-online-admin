import delay from './delay';
import _ from 'lodash';

const usertests = [
];

class UsertestApi {


  static getUserTestByIds(user_id, test_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usertest = _.find(usertests, (item)=> {
          return item.user_id === user_id &&
            item.test_id === test_id;
        });

        const test_id = usertest ? usertest.test_id : undefined;
        console.log('getUsersActiveTestId', test_id);
        resolve(test_id);
      }, delay);
    })
  }


}

export default UsertestApi;
