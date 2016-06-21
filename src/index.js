/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';

import moment from 'moment';
moment.locale('hu');

import createRoutes from './routes';
import initialState from './initialState';
import configureStore from './store';
import authApi from './api/authApi';
import {loginSuccess} from './actions/authActions';

import '../node_modules/toastr/build/toastr.min.css';
import './style/site.css';

const store = configureStore(initialState);
const routes = createRoutes(store);

const token = localStorage.getItem('token');

if (token) {
  authApi.loginWithToken(token)
         .then((authData)=> {
           if (authData.error) {
             throw new Error(authData.error);
           }
           store.dispatch(loginSuccess(authData.data));
           render();
         })
         .catch((err)=> {
           console.log(err);
           render();
         });

} else render();


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
  );
}
