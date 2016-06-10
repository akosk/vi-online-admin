import _ from 'lodash';
import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function userturns(state = initialState.userturns, action) {
  switch (action.type) {

    case types.SIGN_UP_TO_TURN_SUCCESS:
    case types.GET_CURRENT_TURN_SUCCESS:
      return {
        ...state,
        currentTurn:_.cloneDeep(action.turn)
      };


    default:
      return state;
  }
}
