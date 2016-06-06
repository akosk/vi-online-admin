import delay from './delay';
import _ from 'lodash';

import users from './mockUsers';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (user) => {
  return replaceAll(user.email, ' ', '-');
};

class UserApi {
  static getAllUsers() {
    console.log('UserAPI', 'getAllUsers');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], users));
      }, delay);
    });
  }

  static saveUser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minUserLength = 5;
        if (user.name.length < minUserLength) {
          reject(`A névnek legalább ${minUserLength} karakternek kell lennie.`);
          return;
        }

        const emailAlreadyExist=_.find(users, (o)=> o.email==user.email)!==undefined;
        if (emailAlreadyExist) {
          console.log('Reject..');
          reject(`A <strong>${user.email}</strong> email címen már korábban regisztrált valaki.`);
          return;
        }

        user.id = generateId(user);
        users.push(user);

        resolve(Object.assign({}, user));
      }, delay);
    });
  }

  static deleteUser(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //const indexOfCourseToDelete = users.findIndex(course => {
        //  course.courseId == courseId;
        //});
        //users.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default UserApi;
