import React from 'react';
import { Route, IndexRoute } from 'react-router';
import _ from 'lodash';

import LayoutContainer from './components/LayoutContainer';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import DashboardPage from './components/dashboard/DashboardPage';
import UsersPage from './components/users/UsersPage';
import UsersListPage from './components/users/UsersListPage';
import ManageUserPage from './components/users/ManageUserPage';

const createRoutes = (store)=> {

  const requireAuthentication = (nextState, replace)=> {
    const state = store.getState();
    const isAuthenticated = _.has(state, 'auth.user.uid');
    if (!isAuthenticated) {
      replace('/login');
    }
  };

  return (
    <Route path="/" component={LayoutContainer}>
      <IndexRoute component={HomePage}/>
      <Route path="login" component={LoginPage}/>
      <Route path="registration" component={RegistrationPage}/>
      <Route path="dashboard" component={DashboardPage} onEnter={requireAuthentication}/>
      <Route path="users" component={UsersPage} onEnter={requireAuthentication}>
        <IndexRoute component={UsersListPage}/>
        <Route path=":id" component={ManageUserPage} />
      </Route>
    </Route>
  );
};

export default createRoutes;

