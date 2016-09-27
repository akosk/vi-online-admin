import React from 'react';
import { Route, IndexRoute } from 'react-router';
import _ from 'lodash';

import LayoutSelector from './components/LayoutSelector';
import HomePage from './components/home/HomePage';
import LoginPage from './components/auth/LoginPage';
import ChangePasswordPage from './components/auth/ChangePasswordPage';
import RegistrationPage from './components/auth/RegistrationPage';
import AdminHomePage from './components/home/AdminHomePage';
import UsersPage from './components/users/UsersPage';
import UsersListPage from './components/users/UsersListPage';
import ManageUserPage from './components/users/ManageUserPage';
import TurnsPage from './components/turns/TurnsPage';
import GitHubIssuesPage from './components/github/GitHubIssuesPage';
import TurnsListPage from './components/turns/TurnsListPage';
import ManageTurnPage from './components/turns/ManageTurnPage';
import NotFoundRoutePage from './components/NotFoundRoutePage';
import SelectTurnPage from './components/userturn/SelectTurnPage';
import UserTurnContainer from './components/userturn/UserTurnContainer';
import SignupData1Page from './components/userturn/signup/SignupData1Page';
import SignupData2Page from './components/userturn/signup/SignupData2Page';
import SignupData3Page from './components/userturn/signup/SignupData3Page';
import SignupTestPage from './components/userturn/signup/SignupTestPage';
import SignupStatementPage from './components/userturn/signup/SignupStatementPage';
import SignupAgreementsPage from './components/userturn/signup/SignupAgreementsPage';
import SignupFinalizePage from './components/userturn/signup/SignupFinalizePage';
import TurnMembersPage from './components/turnmembers/TurnMembersPage';
import TurnMemberView from './components/turnmembers/TurnMemberView';
import SignupDataView from './components/turnmembers/SignupDataView';
import SignupTestView from './components/turnmembers/SignupTestView';
import SignupStatementView from './components/turnmembers/SignupStatementView';
import SignupAgreementsView from './components/turnmembers/SignupAgreementsView';
import SignupFinalizeView from './components/turnmembers/SignupFinalizeView';
import UserTurnHomePage from './components/userturn/UserTurnHomePage';
import SettingsPage from './components/portal/SettingsPage';

import * as actions from './actions/';

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

  const requireGuest = (nextState, replace) => {
    const state = store.getState();
    const role = _.get(state, 'auth.user.role', null);
    if (role === 'admin') {
      replace('/admin');
    }
    if (role === 'user') {
      var slug = _.get(state, 'userturns.currentTurn.slug', null);
      if (slug) {
        replace(`/user/${slug}/dashboard`);
      } else {
        replace('/user/select-turn');
      }
    }

  };

  const initUserTurns = (nextState, replace)=> {
    const state = store.getState();
    store.dispatch(actions.getCurrentTurn(state.auth.user.id)).then((x)=> {
      let turn_id = store.getState().userturns.currentTurn.id;
      store.dispatch(actions.getUserTurn(state.auth.user.id, turn_id));
    });
  };


  return (
    <Route path="/" component={LayoutSelector}>
      <IndexRoute component={HomePage} onEnter={requireGuest}/>
      <Route path="login" component={LoginPage}/>
      <Route path="change-password/:id" component={ChangePasswordPage}/>
      <Route path="registration" component={RegistrationPage}/>
      <Route path="user" onEnter={(n,r)=>requireRole(n,r,'user')}>
        <Route path="select-turn" component={SelectTurnPage}/>
        <Route path=":slug" onEnter={initUserTurns}>
          <Route path="dashboard" component={UserTurnHomePage}/>
          <Route path="signup-finalize" component={SignupFinalizePage}/>
          <Route path="signup-data-1" component={SignupData1Page}/>
          <Route path="signup-data-2" component={SignupData2Page}/>
          <Route path="signup-data-3" component={SignupData3Page}/>
          <Route path="signup-test" component={SignupTestPage}/>
          <Route path="signup-statement" component={SignupStatementPage}/>
          <Route path="signup-agreements" component={SignupAgreementsPage}/>
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
          <Route path="new" component={ManageTurnPage}/>
          <Route path=":id" component={ManageTurnPage}/>
        </Route>
        <Route path="turnmembers" component={TurnMembersPage}/>
        <Route path="turnmembers/:user_id" component={TurnMemberView}>
          <Route path="signup-data" component={SignupDataView}/>
          <Route path="signup-test" component={SignupTestView}/>
          <Route path="signup-statement" component={SignupStatementView}/>
          <Route path="signup-agreements" component={SignupAgreementsView}/>
          <Route path="signup-finalize" component={SignupFinalizeView}/>
        </Route>
        <Route path="settings" component={SettingsPage}/>

        <Route path="github" component={GitHubIssuesPage}/>
      </Route>
      <Route path="*" component={NotFoundRoutePage} params={{layout:'none'}}/>
    </Route>
  );
};
//<Route path=":id" component={TurnMemberLayout}>
//
//</Route>
export default createRoutes;

