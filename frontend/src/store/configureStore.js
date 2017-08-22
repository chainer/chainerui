import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { createLogger } from 'redux-logger';
import api from '../middleware/api';
import rootReducer from '../reducers';

const configureStore = (preloadedState) => {
  const middleware = [thunk, api, createLogger()];

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );

  persistStore(store);

  return store;
};

export default configureStore;

