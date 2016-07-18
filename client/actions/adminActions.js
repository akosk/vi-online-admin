import * as types from './actionTypes';
import userturnApi from '../api/userturnApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';


export function adminSelectTurn(turn) {
  return { type: types.ADMIN_SELECT_TURN, turn };
}


export function loadTurnMembers(turn_id, filter) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return userturnApi.getTurnMembers(turn_id, filter)
                  .then(result => {
                    dispatch(loadTurnMembersSuccess(result.data));
                  })
                  .catch(error => {
                    throw(error);
                  });
  };
}

export function loadTurnMembersSuccess(users) {
  return { type: types.LOAD_TURN_MEMBERS_SUCCESS, users};
}
