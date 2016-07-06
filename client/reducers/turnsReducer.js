import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function turns(state = initialState.turns, action) {
  switch (action.type) {


    case types.UPDATE_TURN_SUCCESS:
      return [
        ...state.filter(turn => turn.id !== action.turn.id),
        action.turn
      ];

    case types.LOAD_TURNS_SUCCESS:
      return [
        ...action.turns
      ];

    case types.SELECT_TURN:
      return state.map((turn, index) => ({
        ...turn,
        selected: action.turn.id === turn.id ? action.isSelected : turn.selected,
      }));

    case types.SELECT_ALL_TURN:
      return state.map((turn, index) => ({
        ...turn,
        selected: action.isSelected,
      }));

    case types.DELETE_TURNS_SUCCESS:
      return state.filter((turn, index) => {
        return action.ids.indexOf(turn.id)===-1;
      });


    default:
      return state;
  }
}
