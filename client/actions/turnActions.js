import * as types from './actionTypes';
import turnApi from '../api/turnApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import log from '../utils/logger';


export function deleteSelectedTurns(ids) {
  log('deleteSelectedTurns ',ids);
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return turnApi.deleteTurns(ids).then(() => {
      dispatch(deleteTurnsSuccess(ids));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };

}

export function saveTurn(turn) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return turnApi.saveTurn(turn).then(turn => {
      dispatch(updateTurnSuccess(turn));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


function deleteTurnsSuccess(ids){
  return {type: types.DELETE_TURNS_SUCCESS, ids};
}

function updateTurnSuccess(turn){
  return {type: types.UPDATE_TURN_SUCCESS, turn};
}

export function loadTurnsSuccess(turns) {
  return { type: types.LOAD_TURNS_SUCCESS, turns};
}



export function loadTurns() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return turnApi.getAllTurns().then(turns => {
      dispatch(loadTurnsSuccess(turns.data));
    }).catch(error => {
      throw(error);
    });
  };
}

export function selectTurn(turn, isSelected) {
  return {
    type: types.SELECT_TURN,
    turn,
    isSelected
  };
}

export function selectAllTurns(isSelected) {
  return {
    type: types.SELECT_ALL_TURN,
    isSelected
  };
}


