import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './authReducer';
import users from './usersReducer';
import turns from './turnsReducer';

const rootReducer = combineReducers({
  auth,
  users,
  turns,
  routing: routerReducer,
});

export default rootReducer;
