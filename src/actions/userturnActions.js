import * as types from './actionTypes';
import userturnApi from '../api/mockUserturnApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function signUpToTurn(user,turn) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userturnApi.signUpToTurn(user, turn).then(turn => {
      dispatch(signUpToTurnSuccess(turn));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function getCurrentTurn(user_id) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userturnApi.getCurrentTurn(user_id).then(turn => {
        dispatch(getCurrentTurnSuccess(turn));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

function signUpToTurnSuccess(turn) {
  return { type: types.SIGN_UP_TO_TURN_SUCCESS, turn};
}

function getCurrentTurnSuccess(turn) {
  return { type: types.GET_CURRENT_TURN_SUCCESS, turn};
}



