import React from 'react';
import { Route, IndexRoute } from 'react-router';
import _ from 'lodash';

import LayoutContainer from './components/LayoutContainer';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import AdminHomePage from './components/home/AdminHomePage';
import UsersPage from './components/users/UsersPage';
import UsersListPage from './components/users/UsersListPage';
import ManageUserPage from './components/users/ManageUserPage';
import TurnsPage from './components/turns/TurnsPage';
import TurnsListPage from './components/turns/TurnsListPage';
import ManageTurnPage from './components/turns/ManageTurnPage';
import NotFoundRoutePage from './components/NotFoundRoutePage';
import SelectTurnPage from './components/userturn/SelectTurnPage';
import UserTurnContainer from './components/userturn/UserTurnContainer';
import SignupDataPage from './components/userturn/signup/SignupDataPage';

import toastr from 'toastr';

const createRoutes = (store)=> {

  const requireAuthentication = (nextState, replace)=> {
    const state = store.getState();
    const isAuthenticated = _.has(state, 'auth.user.id');
    if (!isAuthenticated) {
      replace('/login');
    }
  };

  const requireRole = (nextState, replace, role) => {
    const state = store.getState();
    const isAuthorized = _.get(state, 'auth.user.role') === role;
    if (!isAuthorized) {
      toastr.error('Nincs jogosultsága az oldal eléréséhez');
      replace('/');
    }

  };


  return (
    <Route path="/" component={LayoutContainer}>
      <IndexRoute component={HomePage}/>
      <Route path="login" component={LoginPage}/>
      <Route path="registration" component={RegistrationPage}/>
      <Route path="user" onEnter={(n,r)=>requireRole(n,r,'user')}>
        <Route path="select-turn" component={SelectTurnPage}/>
        <Route path=":slug" component={UserTurnContainer}>
          <Route path="signup-data" component={SignupDataPage}/>
        </Route>
      </Route>
      <Route path="admin" onEnter={(n,r)=>requireRole(n,r,'admin')}>
        <IndexRoute component={AdminHomePage}/>
        <Route path="users" component={UsersPage}>
          <IndexRoute component={UsersListPage}/>
          <Route path=":id" component={ManageUserPage}/>
        </Route>
        <Route path="turns" component={TurnsPage}>
          <IndexRoute component={TurnsListPage}/>
          <Route path=":id" component={ManageTurnPage}/>
        </Route>
      </Route>
      <Route path="*" component={NotFoundRoutePage}/>
    </Route>
  );
};

export default createRoutes;

