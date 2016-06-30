import initialState from '../initialState';
import * as types from '../actions/actionTypes';

export default function tests(state = initialState.tests, action) {
  switch (action.type) {


    case types.UPDATE_TEST_SUCCESS:
      return [
        ...state.filter(test => test.id !== action.test.id),
        action.test
      ];

    case types.LOAD_TESTS_SUCCESS:
      return [
        ...action.tests
      ];

    case types.SELECT_TEST:
      return state.map((test, index) => ({
        ...test,
        selected: action.test.id === test.id ? action.isSelected : test.selected,
      }));

    case types.SELECT_ALL_TEST:
      return state.map((test, index) => ({
        ...test,
        selected: action.isSelected,
      }));

    default:
      return state;
  }
}
