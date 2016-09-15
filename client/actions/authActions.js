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

export function sendPasswordResetEmail(email){
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return authApi.sendPasswordResetEmail(email).then(() => {
      return true;
    }).catch(error => {
      throw('Az új jelszó kérése során hiba lépett fel.');
    });
  };
}

export function changePassword(data){
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return authApi.changePassword(data).then(() => {
      return true;
    }).catch(resp => {
      throw(resp.data.error);
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
