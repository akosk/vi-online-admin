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

export function saveUser(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.saveUser(user).then(user => {
      dispatch(updateUserSuccess(user));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

function registrationSuccess(user){
  return {type: types.REGISTRATION_SUCCESS, user};
}

function updateUserSuccess(user){
  return {type: types.UPDATE_USER_SUCCESS, user};
}

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USERS_SUCCESS, users};
}


export function logout() {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOGOUT_SUCCESS
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

export function selectUser(user, isSelected) {
  return {
    type: types.SELECT_USER,
    user,
    isSelected
  };
}

export function selectAllUsers(isSelected) {
  return {
    type: types.SELECT_ALL_USER,
    isSelected
  };
}


