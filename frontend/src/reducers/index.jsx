import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import * as ActionTypes from '../actions';
import Utils from '../utils';


const entities = (state = { results: {} }, action) => {
  switch (action.type) {
    case ActionTypes.RESULTS_SUCCESS:
      if (action.response && action.response.results) {
        const resultsList = action.response.results;
        const results = {};
        resultsList.forEach((result) => {
          results[result.id] = result;
        });
        return { ...state, results };
      }
      break;
    default:
      break;
  }
  return state;
};

const axes = (state = {}, action) => {
  const { line2key } = Utils;
  const { axisName, line, lineKey, scale } = action;
  if (axisName == null) {
    return state;
  }
  const axisConfig = state[axisName] || { axisName };
  const { lines = [] } = axisConfig;

  switch (action.type) {
    case ActionTypes.AXIS_CONFIG_LINE_ADD:
      if (line == null) {
        return state;
      }
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          lines: [...lines, line]
        }
      };
    case ActionTypes.AXIS_CONFIG_LINE_REMOVE:
      if (lineKey == null) {
        return state;
      }
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          lines: [...lines.filter((l) => line2key(l) !== lineKey)]
        }
      };
    case ActionTypes.AXIS_CONFIG_SCALE_UPDATE:
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          scale
        }
      };
    default:
      return state;
  }
};

const config = combineReducers({
  axes
});

const rootReducer = combineReducers({
  entities,
  config: persistReducer({ key: 'config', storage }, config)
});

export default rootReducer;

