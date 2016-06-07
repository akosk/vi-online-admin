import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function auth(state = initialState.auth, action) {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      return {
        user:action.authData.user
      };

    case types.LOGOUT_SUCCESS:
      return {
        ...initialState.auth,
      };


    default:
      return state;
  }
}
