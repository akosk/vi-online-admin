import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function filters(state = initialState.filters, action) {
  switch (action.type) {


    case types.UPDATE_FILTER_SUCCESS:
      return [
        ...state.filter(filter => filter.id !== action.filter.id),
        action.filter
      ];

    case types.LOAD_FILTERS_SUCCESS:
      return [
        ...action.filters
      ];

    //case types.SELECT_FILTER:
    //  return state.map((filter, index) => ({
    //    ...filter,
    //    selected: action.filter.id === filter.id ? action.isSelected : filter.selected,
    //  }));
		//
    //case types.SELECT_ALL_FILTER:
    //  return state.map((filter, index) => ({
    //    ...filter,
    //    selected: action.isSelected,
    //  }));
		//
    case types.DELETE_FILTER_SUCCESS:
      return state.filter((filter, index) => {
        return action.id!=filter.id;
      });


    default:
      return state;
  }
}
