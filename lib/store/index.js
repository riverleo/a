/* global window */

import Router from 'next/router';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { parse } from '../url';
import { rootEpic, rootReducer } from './reducers';
import { CHANGE_COMPLETE } from '../../components/core/redux/route';

let reduxStore = null;
let devtools = __ => __;

const dev = process.env.NODE_ENV !== 'production';

if (process.browser && dev && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line no-undef
  devtools = window.__REDUX_DEVTOOLS_EXTENSION__(); // eslint-disable-line no-undef
}

const create = (initialState = {}) => {
  const epicMiddleware = createEpicMiddleware(rootEpic);

  return createStore(
    combineReducers({
      ...rootReducer,
    }),
    initialState,
    compose(
      applyMiddleware(epicMiddleware),
      devtools,
    ),
  );
};

export default (initialState) => {
  if (!process.browser) {
    return create(initialState);
  }

  if (!reduxStore) {
    reduxStore = create(initialState);

    Router.onRouteChangeComplete = url => reduxStore.dispatch({
      type: CHANGE_COMPLETE,
      payload: parse(url),
    });
  }

  return reduxStore;
};

export { default as connect } from './connect';
