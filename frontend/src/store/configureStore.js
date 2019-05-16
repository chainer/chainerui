import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createRequestMiddleware } from 'redux-requests';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import logTransformMiddleware from '../middleware/logTransformMiddleware';
import rootReducer from '../reducers';


const configureStore = (preloadedState) => {
  const middleware = [thunk, api, createRequestMiddleware(), logTransformMiddleware, createLogger()];

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  return store;
};

export default configureStore;
