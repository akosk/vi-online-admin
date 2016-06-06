import React from 'react';
import { Route, IndexRoute } from 'react-router';
import _ from 'lodash';

import LayoutContainer from './components/LayoutContainer';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';

const createRoutes = (store)=> {

  const requireAuthentication = (nextState, replace)=> {
    const state = store.getState();
    const isAuthenticated = _.has(state, 'auth.user.uid');
    if (!isAuthenticated) {
      replace('/');
    }
  };

  return (
    <Route path="/" component={LayoutContainer}>
      <IndexRoute component={HomePage}/>
      <Route path="login" component={LoginPage} />
    </Route>
  );
};

export default createRoutes;

//<Route path="login" component={LoginPage} onEnter={requireAuthentication}/>
