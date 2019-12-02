import { combineReducers } from 'redux';
import { CHART_DOWNLOAD_STATUS, keyOptions } from '../constants';
import { RESULT_LIST_SUCCESS } from '../actions/entities';
import {
  CHART_DOWNLOAD_STATUS_UPDATE,
  RESULT_SELECT_UPDATE,
  CHECKED_OF_RESULT_STATUS_UPDATE,
  RESULT_FILTER_UPDATE,
} from '../actions/status';
import { updatePartialState } from './utils';

const chartDownloadStatusReducer = (state = CHART_DOWNLOAD_STATUS.NONE, action) => {
  switch (action.type) {
    case CHART_DOWNLOAD_STATUS_UPDATE:
      return action.chartDownloadStatus;
    default:
      return state;
  }
};

const resultSelectedReducer = (state = false, action) => {
  switch (action.type) {
    case RESULT_SELECT_UPDATE:
      return action.selected;
    default:
      return state;
  }
};

const resultCheckedReducer = (state = false, action) => {
  switch (action.type) {
    case CHECKED_OF_RESULT_STATUS_UPDATE:
      return action.checked;
    default:
      return state;
  }
};

const resultStatusReducer = combineReducers({
  selected: resultSelectedReducer,
  checked: resultCheckedReducer,
});

const resultsStatusReducer = (state = {}, action) => {
  const { resultId } = action;
  if (resultId) {
    return updatePartialState(state, action, resultId, resultStatusReducer);
  }

  return state;
};

const resultFilterReducer = (state = {}, action) => {
  switch (action.type) {
    case RESULT_FILTER_UPDATE: {
      const { filterKey, filterText } = action;
      return {
        ...state,
        [filterKey]: filterText,
      };
    }
    default:
      return state;
  }
};

const projectStatusReducer = combineReducers({
  chartDownloadStatus: chartDownloadStatusReducer,
  resultsStatus: resultsStatusReducer,
  resultFilter: resultFilterReducer,
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
    case RESULT_LIST_SUCCESS:
      if (action.response && action.response.results) {
        const resultsList = action.response.results;
        const argKeySet = {};
        const logKeySet = {};
        resultsList.forEach((result) => {
          result.args.forEach((arg) => {
            argKeySet[arg.key] = true;
          });
          result.logs.forEach((log) => {
            Object.keys(log.logDict).forEach((key) => {
              logKeySet[key] = true;
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

export default statusReducer;
