import delay from './delay';
import _ from 'lodash';
import log from '../utils/logger';

import turns from './mockTurns';


function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (turn) => {
  return replaceAll(turn.email, ' ', '-');
};

class TurnApi {

  static getTurnById(turn_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const turn=_.find(turns, (item)=>item.id===turn_id);
        resolve(turn);
      }, delay);
    });

  }

  static getAllTurns() {
    log('TurnAPI', 'getAllTurns');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], turns));
      }, delay);
    });
  }

  static saveTurn(turn) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTurnLength = 5;
        if (turn.name.length < minTurnLength) {
          reject(`A névnek legalább ${minTurnLength} karakternek kell lennie.`);
          return;
        }

        if (turn.id) {
          const existingTurnIndex = turns.findIndex(a => a.id == turn.id);
          turns.splice(existingTurnIndex, 1, turn);
        } else {
          const emailAlreadyExist = _.find(turns, (o)=> o.email == turn.email) !== undefined;
          if (emailAlreadyExist) {
            log('Reject..');
            reject(`A <strong>${turn.email}</strong> email címen már korábban regisztrált valaki.`);
            return;
          }
          turn.id = generateId(turn);
          turns.push(turn);
        }
        resolve(Object.assign({}, turn));
      }, delay);
    });
  }

  static deleteTurn(turn) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //const indexOfCourseToDelete = turns.findIndex(course => {
        //  course.courseId == courseId;
        //});
        //turns.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TurnApi;
