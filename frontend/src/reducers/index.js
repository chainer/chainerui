import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import entitiesReducer from './entitiesReducer';
import requestsReducer from './requestsReducer';
import fetchStateReducer from './fetchStateReducer';
import statusReducer from './statusReducer';
import configReducer from './configReducer';

const currentStoreVersion = 20190802.0;

const persistConfig = {
  key: 'config',
  version: currentStoreVersion,
  storage,
  migrate: (restoredState) => {
    // eslint-disable-next-line no-underscore-dangle
    const persist = restoredState ? restoredState._persist : {};
    const restoredVersion = persist.version === undefined ? -1 : persist.version;
    if (restoredVersion < currentStoreVersion) {
      // ignore any restored state whoes version is older than currentStoreVersion
      return Promise.resolve(undefined);
    }
    return Promise.resolve(restoredState);
  },
};

const rootReducer = combineReducers({
  entities: entitiesReducer,
  requests: requestsReducer,
  fetchState: fetchStateReducer,
  status: statusReducer,
  config: persistReducer(persistConfig, configReducer),
});

export default rootReducer;
