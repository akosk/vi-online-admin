import * as types from './actionTypes';
import signupDataApi from '../api/mockSignupDataApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function saveSignupData(signupData) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return signupDataApi.saveSignupData(signupData).then(signupData => {
      dispatch(updateSignupDataSuccess(signupData));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function getSignupDataByUserId(user_id) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return signupDataApi.getSignupDataByUserId(user_id).then(signupData => {
      dispatch(loadSignupDatasSuccess(signupData));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}



function updateSignupDataSuccess(signupData){
  return {type: types.UPDATE_SIGNUP_DATA_SUCCESS, signupData};
}

export function loadSignupDatasSuccess(signupData) {
  return { type: types.LOAD_SIGNUP_DATAS_SUCCESS, signupData};
}





