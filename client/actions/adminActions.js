import * as types from './actionTypes';
import userturnApi from '../api/userturnApi';
import axios from 'axios';
import log from '../utils/logger';
import generalApi from '../api/generalApi';
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
  return { type: types.LOAD_TURN_MEMBERS_SUCCESS, users };
}

export function loadPortalSettings() {
  return function (dispatch) {
    dispatch(beginAjaxCall());

    return generalApi.find('site', 1)
                     .then(result => {
                       dispatch(loadPortalSettingsSuccess(result.data));
                     })
                     .catch(error => {
                       throw(error);
                     });

  };
}

export function savePortalSettings(settings) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    let promise;
    if (settings.id) {
      promise = generalApi.update('site', settings);
    } else {

      promise = generalApi.insert('site', { ...settings, id: '1' });
    }

    return promise
      .then(result => {
        dispatch(savePortalSettingsSuccess(result.data));
      })
      .catch(error => {
        throw(error);
      });

  };
}

export function loadPortalSettingsSuccess(settings) {
  return { type: types.LOAD_PORTAL_SETTINGS_SUCCESS, settings };
}
export function savePortalSettingsSuccess(settings) {
  return { type: types.SAVE_PORTAL_SETTINGS_SUCCESS, settings };
}

export const mailChimpExport = (users,filter_name)=> {
  return (dispatch) => {
    dispatch(beginAjaxCall());

    const promise = axios.post('/mailchimp/export',
      { users, filter_name },
      { headers: { 'x-api-token': localStorage.getItem('token') } });

    return promise
      .then(result => {
        dispatch(mailChimpExportSuccess());
      })
      .catch(error => {
        throw(error);
      });

  };
};

export function mailChimpExportSuccess() {
  return { type: types.MAILCHIMP_EXPORT_SUCCESS };
}
