import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import auth from './authReducer';
import users from './usersReducer';

const rootReducer = combineReducers({
  auth,
  users,
  routing: routerReducer,
});

export default rootReducer;
