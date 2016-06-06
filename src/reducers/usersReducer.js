import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function users(state = initialState.users, action) {
  switch (action.type) {

    case types.REGISTRATION_SUCCESS:
      return [
        ...state,
        action.user
      ];

    case types.LOAD_USERS_SUCCESS:
      return [
        ...action.users
      ];


    default:
      return state;
  }
}
