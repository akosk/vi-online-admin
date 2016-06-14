import * as types from './actionTypes';
import usertestApi from '../api/mockUsertestApi';
import testApi from '../api/mockTestApi';
import _ from 'lodash';

import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function getUserTestByIds(user_id, test_id) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return usertestApi.getUserTestByIds(user_id, test_id).then(test => {
      dispatch(getUserTestSuccess(test));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadUserSignupTest(user_id, test_id) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return usertestApi.getUserTestByIds(user_id, test_id).then(test => {
      if (test) {
        dispatch(loadUserSignupTestSuccess(test));
      } else {
        testApi.getTestById(test_id)
               .then((test)=> {
                 test.test_id = test.id;
                 test.user_id = user_id;
                 delete(test.id);
                 test.questions.forEach(
                   (item)=> item.value='d'
                 );

                 dispatch(loadUserSignupTestSuccess(test));
               })
      }

    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };

}

export function saveUserTest(test) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return usertestApi.saveUserTest(test).then(test => {
      dispatch(updateUserTestSuccess(test));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };

}

function getUserTestSuccess(test) {
  return { type: types.GET_USER_TEST_SUCCESS, test };
}
function updateUserTestSuccess(test) {
  return { type: types.UPDATE_USER_TEST_SUCCESS, test };
}
function loadUserSignupTestSuccess(test) {
  return { type: types.LOAD_USER_SIGNUP_TEST_SUCCESS, test };
}



