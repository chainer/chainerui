import { combineReducers } from 'redux';
import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import { requestsReducer } from 'redux-requests';
import storage from 'redux-persist/es/storage';
import * as ActionTypes from '../actions';
import { chartSizeOptions, pollingOptions, logsLimitOptions, defaultAxisConfig, defaultProjectStatus, keyOptions } from '../constants';


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
          [project.id]: project
        };
      }
      return state;
    case ActionTypes.PROJECT_DELETE_SUCCESS:
      if (action.response && action.response.project) {
        const { project } = action.response;
        const newProjects = { ...state };
        delete newProjects[project.id];
        return newProjects;
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
          [result.id]: result
        };
      }
      return state;
    case ActionTypes.RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        const newResults = { ...state };
        if (result.isUnregistered) {
          delete newResults[result.id];
        } else {
          newResults[result.id] = result;
        }
        return newResults;
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        const newResults = { ...state };
        delete newResults[result.id];
        return newResults;
      }
      return state;
    case ActionTypes.COMMAND_CREATE_SUCCESS:
      if (action.response && action.response.commands) {
        const result = state[action.body.resultId];

        return {
          ...state,
          [action.body.resultId]: {
            ...result,
            commands: action.response.commands
          }
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
  assets: assetsReducer
});


const fetchStateReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RESULT_LIST_REQUEST:
    case ActionTypes.RESULT_LIST_SUCCESS:
    case ActionTypes.RESULT_LIST_FAILURE:
      return {
        ...state,
        resultList: action.type
      };
    case ActionTypes.RESULT_REQUEST:
    case ActionTypes.RESULT_SUCCESS:
    case ActionTypes.RESULT_FAILURE:
      return {
        ...state,
        result: action.type
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


const resultStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.RESULT_SELECT_UPDATE:
      return {
        ...state,
        selected: action.selected
      };
    default:
      return state;
  }
};

const resultsStatusReducer = (state = {}, action) => {
  const { resultId } = action;
  if (resultId) {
    return {
      ...state,
      [resultId]: resultStatusReducer(state[resultId], action)
    };
  }

  return state;
};

const projectsStatusReducer = (state = {}, action) => {
  const { projectId } = action;
  if (!projectId) {
    return state;
  }

  const projectStatus = state[projectId] || defaultProjectStatus;
  switch (action.type) {
    case ActionTypes.CHART_DOWNLOAD_STATUS_UPDATE: {
      const { chartDownloadStatus } = action;
      return {
        ...state,
        [projectId]: {
          ...projectStatus,
          chartDownloadStatus
        }
      };
    }
    default:
      return {
        ...state,
        [projectId]: {
          ...projectStatus,
          resultsStatus: resultsStatusReducer(projectStatus.resultsStatus, action)
        }
      };
  }
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
          xAxisKeys: keyOptions.filter((key) => key in logKeySet)
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
  stats: statsReducer
});


const axesConfigReducer = (state = defaultAxisConfig, action) => {
  const {
    axisName,
    logKey,
    scale = 'linear',
    xAxisKey,
    rangeType = 'auto',
    isMin, rangeNumber
  } = action;
  const axisConfig = state[axisName] || {};
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


const resultsConfigWithoutResultReducer = (state, resultId) => {
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

const resultsConfigReducer = (state = {}, action) => {
  const { resultId } = action;
  const resultConfig = state[resultId] || {};
  switch (action.type) {
    case ActionTypes.RESULTS_CONFIG_SELECT_UPDATE:
      if (resultId == null) {
        return state;
      }
      return {
        ...state,
        [Number(resultId)]: {
          ...resultConfig,
          hidden: action.hidden
        }
      };
    case ActionTypes.RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        if (result.isUnregistered) {
          return resultsConfigWithoutResultReducer(state, result.id);
        }
      }
      return state;
    case ActionTypes.RESULT_DELETE_SUCCESS:
      return resultsConfigWithoutResultReducer(state, resultId);
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
        [lineKey]: { ...state[lineKey], ...line }
      };
    default:
      return state;
  }
};

const tableStateReducer = (state = {}, action) => {
  const {
    expanded = {},
    hiddenLogKeys = [],
    hiddenArgKeys = []
  } = action;
  switch (action.type) {
    case ActionTypes.TABLE_STATE_EXPANDED_UPDATE:
      return {
        ...state,
        expanded
      };
    case ActionTypes.TABLE_STATE_COLUMNS_VISIBILITY_UPDATE:
      return {
        ...state,
        hiddenLogKeys,
        hiddenArgKeys
      };
    default:
      return state;
  }
};


const projectsConfigReducer = (state = {}, action) => {
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
        axes: axesConfigReducer(projectConfig.axes, action),
        resultsConfig: resultsConfigReducer(projectConfig.resultsConfig, action),
        lines: linesConfigReducer(projectConfig.lines, action),
        tableState: tableStateReducer(projectConfig.tableState, action)
      }
    };
  }

  return state;
};


const defaultGlobalState = {
  pollingRate: pollingOptions[1].value,
  chartSize: chartSizeOptions[0],
  logsLimit: logsLimitOptions[0].value,
  isResultNameAlignRight: false
};

const globalConfigReducer = (state = defaultGlobalState, action) => {
  const { pollingRate, chartSize, logsLimit, isResultNameAlignRight } = action;
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
    case ActionTypes.GLOBAL_CONFIG_LOGS_LIMIT_UPDATE:
      return {
        ...state,
        logsLimit
      };
    case ActionTypes.GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE:
      return {
        ...state,
        isResultNameAlignRight
      };
    default:
      return state;
  }
};


const configReducer = combineReducers({
  projectsConfig: projectsConfigReducer,
  global: globalConfigReducer
});


const currentStoreVersion = 20181023.0;

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
  entities: entitiesReducer,
  requests: requestsReducer,
  fetchState: fetchStateReducer,
  status: statusReducer,
  config: persistReducer(persistConfig, configReducer),
  routing: routerReducer
});

export default rootReducer;

