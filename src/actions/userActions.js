import * as types from './actionTypes';
import userApi from '../api/mockUserApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function saveRegistration(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.saveUser(user).then(user => {
      dispatch(registrationSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

function registrationSuccess(user){
  return {type: types.REGISTRATION_SUCCESS, user};
}

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users};
}


export function logout() {
  return (dispatch, getState) => {
    dispatch({
      type: 'LOGOUT_SUCCEED'
    });
  };
}

export function loadUsers() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return userApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(error => {
      throw(error);
    });
  };
}
