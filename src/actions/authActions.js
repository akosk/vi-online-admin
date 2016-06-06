import * as types from './actionTypes';
import authApi from '../api/mockAuthApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function login(loginData) {

  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return authApi.login(loginData).then(authData => {
      dispatch(loginSuccess(authData));
    }).catch(error => {
      throw(error);
    });
  };

}


export function loginSuccess(authData) {
  return { type: types.LOGIN_SUCCESS, authData };
}


export function logout() {
  return { type: types.LOGOUT_SUCCESS, users };
}

