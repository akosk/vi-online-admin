import * as types from './actionTypes';
import testApi from '../api/mockTestApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function saveTest(test) {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall());
    return testApi.saveTest(test).then(test => {
      dispatch(updateTestSuccess(test));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


function updateTestSuccess(test) {
  return { type: types.UPDATE_TEST_SUCCESS, test };
}

export function loadTestsSuccess(tests) {
  return { type: types.LOAD_TESTS_SUCCESS, tests };
}


export function loadTests() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return testApi.getAllTests().then(tests => {
      dispatch(loadTestsSuccess(tests));
    }).catch(error => {
      throw(error);
    });
  };
}

export function selectTest(test, isSelected) {
  return {
    type: types.SELECT_TEST,
    test,
    isSelected
  };
}

export function selectAllTests(isSelected) {
  return {
    type: types.SELECT_ALL_TEST,
    isSelected
  };
}


