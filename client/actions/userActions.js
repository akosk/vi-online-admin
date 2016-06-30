import * as types from './actionTypes';
import userApi from '../api/userApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function saveRegistration(user) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.saveUser(user).then(response => {
      console.log(response);
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

export function deleteSelectedUsers(ids) {
  console.log('deleteSelectedUsers ',ids);
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userApi.deleteUsers(ids).then(() => {
      dispatch(deleteUsersSuccess(ids));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };

}

function deleteUsersSuccess(ids){
  return {type: types.DELETE_USERS_SUCCESS, ids};
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



export function loadUsers() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return userApi.getAllUsers().then(result => {
      dispatch(loadUsersSuccess(result.data));
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


