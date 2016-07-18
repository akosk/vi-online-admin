import * as types from './actionTypes';
import filterApi from '../api/filterApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';



export function deleteFilter(id) {
  console.log('deleteFilter ',id);
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return filterApi.deleteFilter(id).then(() => {
      dispatch(deleteFilterSuccess(id));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };

}

export function saveFilter(filter) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return filterApi.saveFilter(filter).then(filter => {
      dispatch(updateFilterSuccess(filter.data));
      return filter.data;
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}


function deleteFilterSuccess(id){
  return {type: types.DELETE_FILTER_SUCCESS, id};
}

function updateFilterSuccess(filter){
  return {type: types.UPDATE_FILTER_SUCCESS, filter};
}

export function loadFiltersSuccess(filters) {
  return { type: types.LOAD_FILTERS_SUCCESS, filters};
}



export function loadFilters() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return filterApi.getAllFilters().then(filters => {
      dispatch(loadFiltersSuccess(filters.data));
    }).catch(error => {
      throw(error);
    });
  };
}

//export function selectFilter(filter, isSelected) {
//  return {
//    type: types.SELECT_FILTER,
//    filter,
//    isSelected
//  };
//}

//export function selectAllFilters(isSelected) {
//  return {
//    type: types.SELECT_ALL_FILTER,
//    isSelected
//  };
//}


