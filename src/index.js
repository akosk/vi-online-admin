/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import Firebase from 'firebase';

import createRoutes from './routes';
import config from './config';
import initialState from './initialState';
import configureStore from './store';

import '../node_modules/toastr/build/toastr.min.css';
import './style/site.css';

const store = configureStore(initialState);
const routes=createRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
