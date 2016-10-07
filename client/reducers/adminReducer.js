import initialState from '../initialState';
import * as types from '../actions/actionTypes';
import _ from 'lodash';

export default function admin(state = initialState.admin, action) {
  switch (action.type) {

    case types.ADMIN_SELECT_TURN:
      return { ...state, turn: action.turn };

    case types.LOAD_TURN_MEMBERS_SUCCESS:{
      // Default order: finalizing date
      const sorted=_.reverse(
        _.sortBy(action.users, [function(o) { return _.get(o,`progress.SIGNUP_FINALIZED.created_at`,''); }])
      );
      return {
        ...state,
        turnMembers: [
          ...sorted
        ]
      };
    }

    case types.LOAD_PORTAL_SETTINGS_SUCCESS:
      return {
        ...state,
        portal: portal(state.portal, action)
      };


    default:
      return state;
  }
}

const portal = (state = initialState.admin.portal.settings, action)=> {
  switch (action.type) {


    case types.LOAD_PORTAL_SETTINGS_SUCCESS:
      return action.settings ? {
        ...state,
        settings: action.settings
      }
        : state;

    default:
      return state;
  }

};
