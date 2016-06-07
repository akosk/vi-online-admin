import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function users(state = initialState.users, action) {
  switch (action.type) {

    case types.REGISTRATION_SUCCESS:
      return [
        ...state,
        action.user
      ];

    case types.UPDATE_USER_SUCCESS:
      return [
        ...state.filter(user => user.id !== action.user.id),
        action.user
      ];

    case types.LOAD_USERS_SUCCESS:
      return [
        ...action.users
      ];

    case types.SELECT_USER:
      return state.map((user, index) => ({
        ...user,
        selected: action.user.id === user.id ? action.isSelected : user.selected,
      }));

    case types.SELECT_ALL_USER:
      return state.map((user, index) => ({
        ...user,
        selected: action.isSelected,
      }));

    default:
      return state;
  }
}
