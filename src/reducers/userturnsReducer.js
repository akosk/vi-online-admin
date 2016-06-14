import _ from 'lodash';
import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function userturns(state = initialState.userturns, action) {
  switch (action.type) {

    case types.SIGN_UP_TO_TURN_SUCCESS:
    case types.GET_CURRENT_TURN_SUCCESS:
      return {
        ...state,
        currentTurn: _.cloneDeep(action.turn)
      };
    case types.LOAD_SIGNUP_DATAS_SUCCESS:
      return {
        ...state,
        signupData: _.cloneDeep(action.signupData)
      };

    case types.LOAD_USER_SIGNUP_TEST_SUCCESS:
      return {
        ...state,
        signupTest: _.cloneDeep(action.test)
      };

    case types.UPDATE_USER_TEST_SUCCESS:
      return {
        ...state,
        signupTest: action.test
      };

    default:
      return state;
  }
}
