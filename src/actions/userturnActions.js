import * as types from './actionTypes';
import userturnApi from '../api/userturnApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function signUpToTurn(user,turn) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userturnApi.signUpToTurn(user, turn).then(() => {
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
      console.log(turn);
        dispatch(getCurrentTurnSuccess(turn.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function getUserTurn(user_id,turn_id) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return userturnApi.getUserTurn(user_id,turn_id).then(userturn => {
      console.log(userturn);
        dispatch(getUserTurnSuccess(userturn.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function getSignupStatement(user_id, test_id) {
  return function (dispatch, getState) {
    console.log('Actions getSignupStatement', user_id, test_id);
    dispatch(beginAjaxCall());
    return userturnApi.getSignupStatement(user_id, test_id).then(result => {
      dispatch(getSignupStatementSuccess(result.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function finalizeSignup(user_id,turn_id) {
  return function (dispatch, getState) {
    console.log('Actions finalizeSignup', user_id, turn_id);
    dispatch(beginAjaxCall());
    return userturnApi.finalizeSignup(user_id, turn_id).then(result => {
      dispatch(finalizeSignupSuccess(result.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


function getUserTurnSuccess(userturn) {
  return { type: types.GET_USER_TURN_SUCCESS, userturn};
}
function finalizeSignupSuccess(userturn) {
  return { type: types.FINALIZE_SIGNUP_SUCCESS, userturn};
}

function getSignupStatementSuccess(userturn) {
  return { type: types.GET_SIGNUP_STATEMENT_SUCCESS, userturn};
}

function signUpToTurnSuccess(turn) {
  return { type: types.SIGN_UP_TO_TURN_SUCCESS, turn};
}

function getCurrentTurnSuccess(turn) {
  return { type: types.GET_CURRENT_TURN_SUCCESS, turn};
}



