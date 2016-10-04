/*eslint-disable import/default */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-85204925-1');

import moment from 'moment';
moment.locale('hu');

import createRoutes from './routes';
import initialState from './initialState';
import configureStore from './store';
import authApi from './api/authApi';
import {loginSuccess} from './actions/authActions';

import '../node_modules/toastr/build/toastr.min.css';
import './style/site.css';

let outdatedBrowserFork = require("outdated-browser-rework");
import "outdated-browser-rework/outdated-browser-rework.scss";
import log from './utils/logger';


outdatedBrowserFork({
  browserSupport: {
    'Chrome': 37, // Includes Chrome for mobile devices
    'IE': 11,
    'Safari': 7,
    'Mobile Safari': 7,
    'Firefox': 32
  }
});


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
           log(err);
           render();
         });

} else render();

function render() {

  const logPageView = ()=> {
    window.scrollTo(0, 0);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router onUpdate={logPageView } history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
  );
}
