import delay from './delay';
import _ from 'lodash';

import tests from './mockTests';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.


class TestApi {

  static getTestById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const test = _.find(tests, t=>t.id == id);
        resolve(Object.assign({}, test));
      }, delay);
    });
  }

  static getAllTests() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tests));
      }, delay);
    });
  }

  static saveTest(test) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTestLength = 5;
        if (test.name.length < minTestLength) {
          reject(`A névnek legalább ${minTestLength} karakternek kell lennie.`);
          return;
        }

        if (test.id) {
          const existingTestIndex = tests.findIndex(a => a.id == test.id);
          tests.splice(existingTestIndex, 1, test);
        } else {
          const emailAlreadyExist = _.find(tests, (o)=> o.email == test.email) !== undefined;
          if (emailAlreadyExist) {
            console.log('Reject..');
            reject(`A <strong>${test.email}</strong> email címen már korábban regisztrált valaki.`);
            return;
          }
          test.id = test.name;
          tests.push(test);
        }
        resolve(Object.assign({}, test));
      }, delay);
    });
  }

  static deleteTest(test) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //const indexOfCourseToDelete = tests.findIndex(course => {
        //  course.courseId == courseId;
        //});
        //tests.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TestApi;
