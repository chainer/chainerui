import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import rootReducer from '../reducers';

/**
 * Creates a Redux middleware function when called.
 * @param  {Function} selectorFunc A function to select the location in the store's state tree where
 *                                   the requests reducer keeps it's state.
 * @return {Function}              A middleware function that will only dispatch the action if the
 *                                   action.meta.httpRequest.done property is false, and the
 *                                   meta.httpRequest.url is not already in flight.
 */
const createRequestMiddleware = (selectorFunc = (state) => state.requests) => {
  return (store) => (next) => (action) => {
    // Cancel HTTP request if there is already one pending for this URL
    if (action.meta && action.meta.httpRequest && !action.meta.httpRequest.done) {
      const requests = selectorFunc(store.getState());
      if (requests[action.meta.httpRequest.url]) {
        // There is a request for this URL in flight already!
        // (Ignore the action)
        return undefined;
      }
    }
    return next(action);
  };
};

const configureStore = (preloadedState) => {
  const middleware = [thunk, api, createRequestMiddleware(), createLogger()];

  const store = createStore(rootReducer, preloadedState, applyMiddleware(...middleware));

  return store;
};

export default configureStore;
