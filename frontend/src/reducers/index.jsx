import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import * as ActionTypes from '../actions';
import { line2key } from '../utils';
import { chartSizeOptions, pollingOptions } from '../constants';


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
      return state;
    case ActionTypes.RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        return {
          ...state,
          results: {
            ...state.results,
            [result.id]: result
          }
        };
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      if (action.response && action.response.result) {
        const resultId = action.response.result.id;
        const newResults = { ...state.results };
        delete newResults[resultId];
        return {
          ...state,
          results: newResults
        };
      }
      return state;
    default:
      return state;
  }
};

const fetchState = (state = { results: '' }, action) => {
  switch (action.type) {
    case ActionTypes.RESULTS_REQUEST:
    case ActionTypes.RESULTS_SUCCESS:
    case ActionTypes.RESULTS_FAILUE:
      return {
        ...state,
        results: action.type
      };
    case ActionTypes.COMMAND_CREATE_REQUEST:
    case ActionTypes.COMMAND_CREATE_SUCCESS:
    case ActionTypes.COMMAND_CREATE_FAILUE:
      return {
        ...state,
        commandCreate: action.type
      };
    case ActionTypes.GLOBAL_CONFIG_POLLING_RATE_UPDATE:
      if (action.pollingRate === 0) {
        return {
          ...state,
          results: ''
        };
      }
      return state;
    default:
      return state;
  }
};


const axesStateWithoutResult = (state, resultId) => {
  if (!Number.isInteger(resultId)) {
    return state;
  }
  const newState = {};
  Object.keys(state).forEach((axisName) => {
    const axisConfig = state[axisName];
    const { lines = [] } = axisConfig;
    newState[axisName] = {
      ...axisConfig,
      lines: lines.filter((line = {}) => (
        line.resultId != null && line.resultId !== resultId
      ))
    };
  });
  return newState;
};

const axes = (state = {}, action) => {
  const {
    axisName,
    line,
    lineKey,
    scale = 'linear',
    xAxisKey,
    rangeType = 'auto',
    isMin, rangeNumber
  } = action;
  const axisConfig = state[axisName] || { axisName };
  const { lines = [], scaleRange = {} } = axisConfig;
  const idx = isMin ? 0 : 1;
  const rangeConfig = scaleRange[scale] || {};
  const { rangeTypes = [], range = [] } = rangeConfig;

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
    case ActionTypes.AXIS_CONFIG_LINE_UPDATE:
      for (let i = 0; i < lines.length; i += 1) {
        if (line2key(lines[i]) === lineKey) {
          return {
            ...state,
            [axisName]: {
              ...axisConfig,
              lines: Object.assign([], lines, { [i]: line })
            }
          };
        }
      }
      return state;
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
    case ActionTypes.AXIS_CONFIG_X_KEY_UPDATE:
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          xAxisKey
        }
      };
    case ActionTypes.AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE:
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          scaleRange: {
            ...scaleRange,
            [scale]: {
              rangeTypes: Object.assign([], rangeTypes, { [idx]: rangeType }),
              range
            }
          }
        }
      };
    case ActionTypes.AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE:
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          scaleRange: {
            ...scaleRange,
            [scale]: {
              rangeTypes,
              range: Object.assign([], range, { [idx]: rangeNumber })
            }
          }
        }
      };
    case ActionTypes.RESULT_DELETE_SUCCESS:
      if (action.response && action.response.result) {
        const resultId = action.response.result.id;
        return axesStateWithoutResult(state, resultId);
      }
      return state;
    default:
      return state;
  }
};

const defaultGlobaState = {
  pollingRate: pollingOptions[1].value,
  chartSize: chartSizeOptions[0]
};

const global = (state = defaultGlobaState, action) => {
  const { pollingRate, chartSize } = action;
  switch (action.type) {
    case ActionTypes.GLOBAL_CONFIG_POLLING_RATE_UPDATE:
      return {
        ...state,
        pollingRate
      };

    case ActionTypes.GLOBAL_CONFIG_CHART_SIZE_UPDATE:
      return {
        ...state,
        chartSize
      };
    default:
      return state;
  }
};

const configReducers = combineReducers({
  axes,
  global
});

const config = (state, action) => {
  switch (action.type) {
    case ActionTypes.CONFIG_RESET:
      return configReducers(undefined, action);
    default:
      return configReducers(state, action);
  }
};

const rootReducer = combineReducers({
  entities,
  fetchState,
  config: persistReducer({ key: 'config', storage }, config),
  routing: routerReducer
});

export default rootReducer;

