import {browserHistory} from 'react-router';
import * as types from './actionTypes';
import authApi from '../api/authApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function login(loginData) {

  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return authApi.login(loginData).then(authData => {
      if (authData.data.error) {
        throw new Error(authData.data.error);
      }
      localStorage.setItem('token', authData.data.token);
      dispatch(loginSuccess(authData.data));
      return authData.data.user;
    }).catch(error => {
      throw(error.message);
    });
  };

}



export function loginSuccess(authData) {
  return { type: types.LOGIN_SUCCESS, authData };
}


export function logout() {
  return (dispatch, getState) => {
    localStorage.removeItem('token');

    dispatch({
      type: 'LOGOUT_SUCCESS'
    });
  };
}
