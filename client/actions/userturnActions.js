import * as types from './actionTypes';
import userturnApi from '../api/userturnApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import * as progressTypes from '../../common/progressTypes';
import log from '../utils/logger';

export function signUpToTurn(user, turn) {
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
      dispatch(getCurrentTurnSuccess(turn.data));
      return(turn.data);
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
export function getUserTurn(user_id, turn_id) {
  return function (dispatch, getState) {
    log('Actions / getUserTurn', user_id, turn_id);
    dispatch(beginAjaxCall());
    return userturnApi.getUserTurn(user_id, turn_id).then(userturn => {
      log(userturn);
      dispatch(getUserTurnSuccess(userturn.data));
      return userturn.data;
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function getSignupStatement(user_id, turn_id) {
  return function (dispatch, getState) {
    log('Actions getSignupStatement', user_id, turn_id);
    dispatch(beginAjaxCall());
    return userturnApi.getUserTurn(user_id, turn_id).then(result => {
      dispatch(getSignupStatementSuccess(result.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function acceptSignupStatements(userturn_id, progress) {
  return function (dispatch, getState) {
    log('Action acceptSignupStatements', userturn_id,progress);
    dispatch(beginAjaxCall());
    return userturnApi.setProgress(userturn_id, progress).then(result => {
      dispatch(acceptSignupStatementsSuccess(result.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function setProgress(userturn_id, progress) {
  return function (dispatch, getState) {
    log('Actions setProgress', userturn_id,progress);
    dispatch(beginAjaxCall());
    return userturnApi.setProgress(userturn_id, progress).then(result => {
      dispatch(setProgressSuccess(result.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function setAgreementNote(userturn_id, note) {
  return function (dispatch, getState) {
    log('Action setAgreementNote', userturn_id,note);
    dispatch(beginAjaxCall());
    return userturnApi.setAgreementNote(userturn_id, note).then(result => {
      dispatch(setAgreementNoteSuccess(note));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function acceptSignupStatement(userturn_id) {
  return function (dispatch, getState) {
    log('Actions acceptSignupStatement', userturn_id);
    dispatch(beginAjaxCall());
    return userturnApi.setProgress(userturn_id, progressTypes.SIGNUP_STATEMENT_VALID).then(result => {
      dispatch(acceptSignupStatementSuccess(result.data));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function removeProgress(userturn_id,progress) {
  return function (dispatch, getState) {
    log('Actions removeProgress', userturn_id,progress);
    dispatch(beginAjaxCall());
    return userturnApi.removeProgress(userturn_id, progress).then(result => {
      dispatch(removeProgressSuccess(progress));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function finalizeSignup(user_id, turn_id) {
  return function (dispatch, getState) {
    log('Actions finalizeSignup', user_id, turn_id);
    dispatch(beginAjaxCall());
    return userturnApi.finalizeSignup(user_id, turn_id).then(result => {
      if (result.data.errors) {
        return Promise.resolve(result.data.errors);
      } else {
        dispatch(finalizeSignupSuccess(result.data));
      }

    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadUser(user_id) {
  return (dispatch, getState)=> {
    dispatch(beginAjaxCall());
    return userturnApi.loadUser(user_id)
                      .then(result => dispatch(loadUserSuccess(result.data)))
                      .catch(error => {
                        dispatch(ajaxCallError(error));
                        throw(error);
                      });
  };
}


function setProgressSuccess(data) {
  return { type: types.SET_PROGRESS_SUCCESS, data };
}

function setAgreementNoteSuccess(note) {
  return { type: types.SET_AGREEMENT_NOTE_SUCCESS, note };
}

function loadUserSuccess(user) {
  return { type: types.LOAD_USER_SUCCESS, user };
}

function removeProgressSuccess(progress) {
  return { type: types.REMOVE_PROGRESS_SUCCESS, progress };
}

function getUserTurnSuccess(userturn) {
  return { type: types.GET_USER_TURN_SUCCESS, userturn };
}

function acceptSignupStatementsSuccess(userturn) {
  return { type: types.ACCEPT_SIGNUP_STATEMENTS_SUCCESS, userturn };
}
function acceptSignupStatementSuccess(userturn) {
  return { type: types.ACCEPT_SIGNUP_STATEMENT_SUCCESS, userturn };
}

function finalizeSignupSuccess(userturn) {
  return { type: types.FINALIZE_SIGNUP_SUCCESS, userturn };
}
function finalizeSignupFailed(errors) {
  return { type: types.FINALIZE_SIGNUP_SUCCESS, errors };
}

function getSignupStatementSuccess(userturn) {
  return { type: types.GET_SIGNUP_STATEMENT_SUCCESS, userturn };
}

function signUpToTurnSuccess(turn) {
  return { type: types.SIGN_UP_TO_TURN_SUCCESS, turn };
}

function getCurrentTurnSuccess(turn) {
  return { type: types.GET_CURRENT_TURN_SUCCESS, turn };
}



