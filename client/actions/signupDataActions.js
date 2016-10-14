import * as types from './actionTypes';
import signupDataApi from '../api/signupDataApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import _ from 'lodash';

export function saveSignupData(signupData) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return signupDataApi.saveSignupData(signupData).then(response => {
      dispatch(updateSignupDataSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function setSignupDataScore(key, score) {
  return function (dispatch, getState) {
    dispatch({ type: types.SET_SIGNUPDATA_SCORE, key, score });
    const signupData = _.get(getState(), 'userturns.signupData');
    return signupDataApi.saveSignupData(signupData).then(response => {
      dispatch(updateSignupDataSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  }


}

export function getSignupDataByUserId(user_id) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return signupDataApi.getSignupDataByUserId(user_id).then(response => {
      dispatch(loadSignupDatasSuccess(response.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function uploadSignupStatement(data) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return signupDataApi.uploadSignupStatement(data).then(response => {
      dispatch(uploadSignupStatementSuccess(response.data.filename));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };

}


function uploadSignupStatementSuccess(filename) {
  return { type: types.UPLOAD_SIGNUP_STATEMENT_SUCCESS, filename };
}

function updateSignupDataSuccess(signupData) {
  return { type: types.UPDATE_SIGNUP_DATA_SUCCESS, signupData };
}

export function loadSignupDatasSuccess(signupData) {
  return { type: types.LOAD_SIGNUP_DATAS_SUCCESS, signupData };
}





