import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './authReducer';
import users from './usersReducer';
import turns from './turnsReducer';
import userturns from './userturnsReducer';
import tests from './testsReducer';



const rootReducer = combineReducers({
  auth,
  users,
  turns,
  tests,
  userturns,
  routing: routerReducer,
});

export default rootReducer;
