import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import * as ActionTypes from '../actions';
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
        const newResults = { ...state.results };
        if (result.isUnregistered) {
          delete newResults[result.id];
        } else {
          newResults[result.id] = result;
        }
        return {
          ...state,
          results: newResults
        };
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        const newResults = { ...state.results };
        delete newResults[result.id];
        return {
          ...state,
          results: newResults
        };
      }
      return state;
    case ActionTypes.COMMAND_CREATE_SUCCESS:
      if (action.response && action.response.commands) {
        const newResults = { ...state.results };
        newResults[action.body.resultId].commands = action.response.commands;

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


const defaultAxisState = {
  yLeftAxis: {
    axisName: 'yLeftAxis',
    logKeysConfig: {
      'main/loss': {
        selected: true
      }
    }
  }
};

const axes = (state = defaultAxisState, action) => {
  const {
    axisName,
    logKey,
    scale = 'linear',
    xAxisKey,
    rangeType = 'auto',
    isMin, rangeNumber
  } = action;
  const axisConfig = state[axisName] || { axisName };
  const { logKeysConfig = {}, scaleRange = {} } = axisConfig;
  const idx = isMin ? 0 : 1;
  const rangeConfig = scaleRange[scale] || {};
  const { rangeTypes = [], range = [] } = rangeConfig;

  switch (action.type) {
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
    case ActionTypes.AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE: {
      const logKeyConfig = logKeysConfig[logKey] || {};
      return {
        ...state,
        [axisName]: {
          ...axisConfig,
          logKeysConfig: {
            ...logKeysConfig,
            [logKey]: {
              ...logKeyConfig,
              selected: !logKeyConfig.selected
            }
          }

        }
      };
    }
    default:
      return state;
  }
};


const resultsConfigWithoutResult = (state, resultId) => {
  if (!Number.isInteger(resultId)) {
    return state;
  }
  const newState = {};
  Object.keys(state).forEach((id) => {
    if (Number(id) === resultId) {
      return;
    }
    newState[id] = state[id];
  });
  return newState;
};

const resultsConfig = (state = {}, action) => {
  const { resultId } = action;
  const resultConfig = state[resultId] || {};
  switch (action.type) {
    case ActionTypes.RESULTS_CONFIG_SELECT_TOGGLE:
      if (resultId == null) {
        return state;
      }
      return {
        ...state,
        [Number(resultId)]: {
          ...resultConfig,
          hidden: !resultConfig.hidden
        }
      };
    case ActionTypes.RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        if (result.isUnregistered) {
          return resultsConfigWithoutResult(state, result.id);
        }
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      return resultsConfigWithoutResult(state, resultId);
    default:
      return state;
  }
};


const lines = (state = {}, action) => {
  const { line, lineKey } = action;
  switch (action.type) {
    case ActionTypes.LINES_CONFIG_LINE_UPDATE:
      if (lineKey == null) {
        return state;
      }
      return {
        ...state,
        [lineKey]: { ...state[lineKey], ...line }
      };
    default:
      return state;
  }
};


const projectsConfig = (state = {}, action) => {
  const { projectId } = action;

  if (projectId) {
    let projectConfig;
    switch (action.type) {
      case ActionTypes.PROJECT_CONFIG_RESET:
        projectConfig = {};
        break;
      default:
        projectConfig = state[projectId] || {};
    }

    return {
      ...state,
      [projectId]: {
        axes: axes(projectConfig.axes, action),
        resultsConfig: resultsConfig(projectConfig.resultsConfig, action),
        lines: lines(projectConfig.lines, action)
      }
    };
  }

  return state;
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


const config = combineReducers({
  projectsConfig,
  global
});


const currentStoreVersion = 20170920.0;

const persistConfig = {
  key: 'config',
  version: currentStoreVersion,
  storage,
  migrate: (restoredState) => {
    // eslint-disable-next-line no-underscore-dangle
    const persist = restoredState ? restoredState._persist : {};
    const restoredVersion = (persist.version === undefined) ? -1 : persist.version;
    if (restoredVersion < currentStoreVersion) {
      // ignore any restored state whoes version is older than currentStoreVersion
      return Promise.resolve(undefined);
    }
    return Promise.resolve(restoredState);
  }
};

const rootReducer = combineReducers({
  entities,
  fetchState,
  config: persistReducer(persistConfig, config),
  routing: routerReducer
});

export default rootReducer;

