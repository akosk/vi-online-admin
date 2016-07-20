import delay from './delay';
import _ from 'lodash';

import signupDatas from './mockSignupDatas';

class SignupDataApi {

  static getSignupDataByUserId(user_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const signupData = _.find(signupDatas, (item)=>item.user_id === user_id);
        resolve(signupData);
      }, delay);
    });

  }

  //static getAllTurns() {
  //  log('TurnAPI', 'getAllTurns');
  //  return new Promise((resolve, reject) => {
  //    setTimeout(() => {
  //      resolve(Object.assign([], turns));
  //    }, delay);
  //  });
  //}

  static saveSignupData(signupData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (signupData.id) {
          const existingSignupDataIndex = signupDatas.findIndex(a => a.id == signupData.id);
          signupDatas.splice(existingSignupDataIndex, 1, signupData);
        } else {
          signupData.id = signupData.name;
          signupDatas.push(signupData);
        }
        resolve(Object.assign({}, signupData));
      }, delay);
    });
  }

  //static deleteTurn(turn) {
  //  return new Promise((resolve, reject) => {
  //    setTimeout(() => {
  //      //const indexOfCourseToDelete = turns.findIndex(course => {
  //      //  course.courseId == courseId;
  //      //});
  //      //turns.splice(indexOfCourseToDelete, 1);
  //      resolve();
  //    }, delay);
  //  });
  //}
}

export default SignupDataApi;
