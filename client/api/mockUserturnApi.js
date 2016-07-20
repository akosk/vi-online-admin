import delay from './delay';
import _ from 'lodash';
import turnApi from './mockTurnApi';
import log from '../utils/logger';

const userturns = [
  {
    user_id:'123',
    turn_id:'1'
  }
];

class UserturnApi {

  static getUsersActiveTurnId(user_id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userturn = _.find(userturns, (item)=> {
          return item.user_id === user_id;
        });

        const turn_id = userturn ? userturn.turn_id : undefined;
        log('getUsersActiveTurnId', turn_id);
        resolve(turn_id);
      }, delay);
    });
  }



  static signUpToTurn(user, turn) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation

        const filtered = userturns.filter((item)=> {
          return item.user_id === user.id && item.turn_id === turn.id;
        });
        const alreadySignedUp = filtered.length > 0;
        if (alreadySignedUp) {
          reject(`Már korábban jelentkezett erre a képzésre.`);
          return;
        }

        userturns.push({
          user_id: user.id,
          turn_id: turn.id,
          created_at: Date.now()
        });
        resolve(Object.assign({}, turn));
      }, delay);
    });
  }

  static getCurrentTurn(user_id) {
    return this.getUsersActiveTurnId(user_id)
      .then(turnApi.getTurnById);
  }

}

export default UserturnApi;
