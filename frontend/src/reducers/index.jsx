import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import { requestsReducer } from 'redux-requests';
import storage from 'redux-persist/es/storage';
import * as ActionTypes from '../actions';
import {
  chartSizeOptions, pollingOptions, logsLimitOptions, defaultAxisConfig, CHART_DOWNLOAD_STATUS, keyOptions,
} from '../constants';


const updatePartialState = (state, action, keyId, fn) => {
  const partialState = fn(state[keyId], action);
  if (state[keyId] !== partialState) {
    return {
      ...state,
      [keyId]: partialState,
    };
  }
  return state;
};

const removePartialState = (state, keyId) => {
  if (keyId in state) {
    const newState = { ...state };
    delete newState[keyId];
    return state;
  }
  return state;
};

const projectsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.PROJECT_LIST_SUCCESS:
      if (action.response && action.response.projects) {
        const projectList = action.response.projects;
        const projects = {};
        projectList.forEach((project) => {
          projects[project.id] = project;
        });
        return projects;
      }
      return state;
    case ActionTypes.PROJECT_SUCCESS:
    case ActionTypes.PROJECT_UPDATE_SUCCESS:
      if (action.response && action.response.project) {
        const { project } = action.response;
        return {
          ...state,
          [project.id]: project,
        };
      }
      return state;
    case ActionTypes.PROJECT_DELETE_SUCCESS:
      if (action.response && action.response.project) {
        const { project } = action.response;
        return removePartialState(state, project.id);
      }
      return state;
    default:
      return state;
  }
};

const mergeResult = (result, oldResult) => {
  const newResult = { ...result };
  ['args', 'commands', 'snapshots'].forEach((k) => {
    const data = oldResult[k];
    if (data && data.length === newResult[k].length) {
      newResult[k] = data; // eslint-disable-line no-param-reassign
    }
  });
  if (oldResult.logs && oldResult.logs.length === newResult.logs.length) {
    if (oldResult.logModifiedAt === newResult.logModifiedAt) {
      newResult.logs = oldResult.logs; // eslint-disable-line no-param-reassign
    }
  }
  const modified = Object.keys(newResult).some((k) => newResult[k] !== oldResult[k]);
  return modified ? newResult : oldResult;
};

const resultsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RESULT_LIST_SUCCESS:
      if (action.response && action.response.results) {
        const resultList = action.response.results;
        const resultIds = resultList.map((result) => result.id);
        let modified = Object.keys(state).length !== resultIds.length;
        const results = {};
        resultList.forEach((result) => {
          const oldResult = state[result.id] || {};
          const newResult = mergeResult(result, oldResult);
          const resultModified = oldResult !== newResult;
          results[result.id] = newResult;
          modified = modified || resultModified;
        });
        return modified ? results : state;
      }
      return state;
    case ActionTypes.RESULT_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        return {
          ...state,
          [result.id]: result,
        };
      }
      return state;
    case ActionTypes.RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        if (result.isUnregistered) {
          return removePartialState(state, result.id);
        }
        return {
          ...state,
          [result.id]: result,
        };
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        return removePartialState(state, result.id);
      }
      return state;
    case ActionTypes.COMMAND_CREATE_SUCCESS:
      if (action.response && action.response.commands) {
        const result = state[action.body.resultId];
        return {
          ...state,
          [action.body.resultId]: {
            ...result,
            commands: action.response.commands,
          },
        };
      }
      return state;
    case ActionTypes.RESULT_LIST_CLEAR:
      return {};
    default:
      return state;
  }
};


const assetsReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.RESULT_ASSET_SUCCESS:
      if (action.response && action.response.assets) {
        const assetList = action.response.assets;
        return assetList;
      }
      return state;
    default:
      return state;
  }
};


const entitiesReducer = combineReducers({
  projects: projectsReducer,
  results: resultsReducer,
  assets: assetsReducer,
});


const fetchStateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RESULT_LIST_REQUEST:
    case ActionTypes.RESULT_LIST_SUCCESS:
    case ActionTypes.RESULT_LIST_FAILURE:
      return {
        ...state,
        resultList: action.type,
      };
    case ActionTypes.RESULT_REQUEST:
    case ActionTypes.RESULT_SUCCESS:
    case ActionTypes.RESULT_FAILURE:
      return {
        ...state,
        result: action.type,
      };
    case ActionTypes.GLOBAL_CONFIG_POLLING_RATE_UPDATE:
    case LOCATION_CHANGE:
      if (action.pollingRate === 0) {
        return {};
      }
      return state;
    default:
      return state;
  }
};


const chartDownloadStatusReducer = (state = CHART_DOWNLOAD_STATUS.NONE, action) => {
  switch (action.type) {
    case ActionTypes.CHART_DOWNLOAD_STATUS_UPDATE:
      return action.chartDownloadStatus;
    default:
      return state;
  }
};

const resultSelectedReducer = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.RESULT_SELECT_UPDATE:
      return action.selected;
    default:
      return state;
  }
};

const resultStatusReducer = combineReducers({
  selected: resultSelectedReducer,
});

const resultsStatusReducer = (state = {}, action) => {
  const { resultId } = action;
  if (resultId) {
    return updatePartialState(state, action, resultId, resultStatusReducer);
  }

  return state;
};

const projectStatusReducer = combineReducers({
  chartDownloadStatus: chartDownloadStatusReducer,
  resultsStatus: resultsStatusReducer,
});

const projectsStatusReducer = (state = {}, action) => {
  const { projectId } = action;
  if (projectId) {
    return updatePartialState(state, action, projectId, projectStatusReducer);
  }

  return state;
};

const statsReducer = (state = { argKeys: [], logKeys: [], xAxisKeys: [] }, action) => {
  switch (action.type) {
    case ActionTypes.RESULT_LIST_SUCCESS:
      if (action.response && action.response.results) {
        const resultsList = action.response.results;
        const argKeySet = {};
        const logKeySet = {};
        resultsList.forEach((result) => {
          result.args.forEach((arg) => { argKeySet[arg.key] = true; });
          result.logs.forEach((log) => {
            log.logItems.forEach((logItem) => {
              logKeySet[logItem.key] = true;
            });
          });
        });
        const newStats = {
          argKeys: Object.keys(argKeySet),
          logKeys: Object.keys(logKeySet).sort(),
          xAxisKeys: keyOptions.filter((key) => key in logKeySet),
        };
        Object.keys(newStats).forEach((key) => {
          if (`${newStats[key]}` === `${state[key]}`) {
            newStats[key] = state[key];
          }
        });
        if (Object.keys(newStats).some((k) => newStats[k] !== state[k])) {
          return newStats;
        }
        return state;
      }
      return state;
    default:
      return state;
  }
};

const statusReducer = combineReducers({
  projectsStatus: projectsStatusReducer,
  stats: statsReducer,
});


const axisConfigReducer = (state = {}, action) => {
  const {
    logKey,
    scale = 'linear',
    xAxisKey,
    rangeType = 'auto',
    isMin, rangeNumber,
  } = action;
  const { logKeysConfig = {}, scaleRange = {} } = state;
  const idx = isMin ? 0 : 1;
  const rangeConfig = scaleRange[scale] || {};
  const { rangeTypes = [], range = [] } = rangeConfig;

  switch (action.type) {
    case ActionTypes.AXIS_CONFIG_SCALE_UPDATE:
      return {
        ...state,
        scale,
      };
    case ActionTypes.AXIS_CONFIG_X_KEY_UPDATE:
      return {
        ...state,
        xAxisKey,
      };
    case ActionTypes.AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE:
      return {
        ...state,
        scaleRange: {
          ...scaleRange,
          [scale]: {
            rangeTypes: Object.assign([], rangeTypes, { [idx]: rangeType }),
            range,
          },
        },
      };
    case ActionTypes.AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE:
      return {
        ...state,
        scaleRange: {
          ...scaleRange,
          [scale]: {
            rangeTypes,
            range: Object.assign([], range, { [idx]: rangeNumber }),
          },
        },
      };
    case ActionTypes.AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE: {
      const logKeyConfig = logKeysConfig[logKey] || {};
      return {
        ...state,
        logKeysConfig: {
          ...logKeysConfig,
          [logKey]: {
            ...logKeyConfig,
            selected: !logKeyConfig.selected,
          },
        },
      };
    }
    default:
      return state;
  }
};

const axesConfigReducer = (state = defaultAxisConfig, action) => {
  const { axisName } = action;
  if (axisName) {
    return updatePartialState(state, action, axisName, axisConfigReducer);
  }

  return state;
};


const resultsConfigReducer = (state = {}, action) => {
  const { resultId } = action;
  switch (action.type) {
    case ActionTypes.RESULTS_CONFIG_SELECT_UPDATE:
      if (resultId) {
        const resultConfig = state[resultId] || {};
        return {
          ...state,
          [resultId]: {
            ...resultConfig,
            hidden: action.hidden,
          },
        };
      }
      return state;
    case ActionTypes.RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        if (result.isUnregistered) {
          return removePartialState(state, result.id);
        }
      }
      return state;
    case ActionTypes.ASSETS_TABLE_STATE_COLUMNS_VISIBILITY_UPDATE:
      if (resultId) {
        const {
          knownTrainInfoKeysConfig = {},
          knownContentKeysConfig = {},
        } = action;
        const resultConfig = state[resultId] || { hidden: false };
        const { assetsTableState = {} } = resultConfig;
        return {
          ...state,
          [resultId]: {
            ...resultConfig,
            assetsTableState: {
              ...assetsTableState,
              knownTrainInfoKeysConfig,
              knownContentKeysConfig,
            },
          },
        };
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      return removePartialState(state, resultId);
    default:
      return state;
  }
};


const linesConfigReducer = (state = {}, action) => {
  const { line, lineKey } = action;
  switch (action.type) {
    case ActionTypes.LINES_CONFIG_LINE_UPDATE:
      if (lineKey == null) {
        return state;
      }
      return {
        ...state,
        [lineKey]: { ...state[lineKey], ...line },
      };
    default:
      return state;
  }
};

const tableStateReducer = (state = {}, action) => {
  const {
    expanded = {},
    knownLogKeysConfig = {},
    knownArgKeysConfig = {},
    isGrouped = false,
  } = action;
  switch (action.type) {
    case ActionTypes.TABLE_STATE_EXPANDED_UPDATE:
      return {
        ...state,
        expanded,
      };
    case ActionTypes.TABLE_STATE_COLUMNS_VISIBILITY_UPDATE:
      return {
        ...state,
        knownLogKeysConfig,
        knownArgKeysConfig,
        isGrouped,
      };
    default:
      return state;
  }
};

const projectConfigReducer = combineReducers({
  axes: axesConfigReducer,
  resultsConfig: resultsConfigReducer,
  lines: linesConfigReducer,
  tableState: tableStateReducer,
});

const projectsConfigReducer = (state = {}, action) => {
  const { projectId } = action;
  if (projectId) {
    switch (action.type) {
      case ActionTypes.PROJECT_CONFIG_RESET:
        return updatePartialState(state, action, projectId, () => projectConfigReducer(undefined, action));
      default:
        return updatePartialState(state, action, projectId, projectConfigReducer);
    }
  }

  return state;
};


const defaultGlobalState = {
  pollingRate: pollingOptions[1].value,
  chartSize: chartSizeOptions[0],
  logsLimit: logsLimitOptions[0].value,
  isResultNameAlignRight: false,
  highlightTableAndChart: true,
};

const globalConfigReducer = (state = defaultGlobalState, action) => {
  const {
    pollingRate, chartSize, logsLimit, isResultNameAlignRight, highlightTableAndChart,
  } = action;
  switch (action.type) {
    case ActionTypes.GLOBAL_CONFIG_POLLING_RATE_UPDATE:
      return {
        ...state,
        pollingRate,
      };
    case ActionTypes.GLOBAL_CONFIG_CHART_SIZE_UPDATE:
      return {
        ...state,
        chartSize,
      };
    case ActionTypes.GLOBAL_CONFIG_LOGS_LIMIT_UPDATE:
      return {
        ...state,
        logsLimit,
      };
    case ActionTypes.GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE:
      return {
        ...state,
        isResultNameAlignRight,
      };
    case ActionTypes.GLOBAL_CONFIG_HIGHLIGHT_TABLE_AND_CHART:
      return {
        ...state,
        highlightTableAndChart,
      };
    default:
      return state;
  }
};


const configReducer = combineReducers({
  projectsConfig: projectsConfigReducer,
  global: globalConfigReducer,
});


const currentStoreVersion = 20190516.0;

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
  },
};

const rootReducer = combineReducers({
  entities: entitiesReducer,
  requests: requestsReducer,
  fetchState: fetchStateReducer,
  status: statusReducer,
  config: persistReducer(persistConfig, configReducer),
  routing: routerReducer,
});

export default rootReducer;
