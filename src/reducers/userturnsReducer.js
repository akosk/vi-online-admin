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

    case types.UPDATE_SIGNUP_DATA_SUCCESS:
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

    case types.UPLOAD_SIGNUP_STATEMENT_SUCCESS:
      return {
        ...state,
        userturn: {
          ...state.userturn,
          signupStatementFileName: action.filename
        }
      };
    case types.GET_SIGNUP_STATEMENT_SUCCESS:
      return {
        ...state,
        userturn: {
          ...state.userturn,
          signupStatementFileName: action.userturn.signup_statement_file
        }
      };

    case types.FINALIZE_SIGNUP_SUCCESS:
    case types.GET_USER_TURN_SUCCESS:
      return {
        ...state,
        userturn: {
          ...action.userturn
        }
      };
    default:
      return state;
  }
}
