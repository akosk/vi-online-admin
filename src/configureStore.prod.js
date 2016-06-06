import { createStore, compose, applyMiddleware } from 'redux';
import initialState from './initialState';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}
