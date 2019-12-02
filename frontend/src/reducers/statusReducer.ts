import { combineReducers, Reducer } from 'redux';
import { CHART_DOWNLOAD_STATUS, keyOptions } from '../constants';
import { RESULT_LIST_SUCCESS } from '../actions/entities';
import {
  CHART_DOWNLOAD_STATUS_UPDATE,
  RESULT_SELECT_UPDATE,
  CHECK_OF_RESULT_STATUS_LIST_UPDATE,
  RESULT_FILTER_UPDATE,
  ChartDownloadStatusAction,
  ResultSelectedAction,
  ResultCheckedAction,
} from '../actions/status';
import { updatePartialState } from './utils';

type ChartDownloadStatusState = CHART_DOWNLOAD_STATUS;
const chartDownloadStatusReducer: Reducer<ChartDownloadStatusState> = (
  state = CHART_DOWNLOAD_STATUS.NONE,
  action: ChartDownloadStatusAction
) => {
  switch (action.type) {
    case CHART_DOWNLOAD_STATUS_UPDATE:
      return action.chartDownloadStatus;
    default:
      return state;
  }
};

const resultSelectedReducer = (state = false, action: ResultSelectedAction) => {
  switch (action.type) {
    case RESULT_SELECT_UPDATE:
      return action.selected;
    default:
      return state;
  }
};

const resultCheckedReducer = (state = false, action: ResultCheckedAction) => {
  switch (action.type) {
    case CHECK_OF_RESULT_STATUS_LIST_UPDATE:
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
  const { results } = action;
  switch (action.type) {
    case CHECK_OF_RESULT_STATUS_LIST_UPDATE:
      if (results) {
        let tmpState = state;
        results.forEach((result) => {
          const currentAction = { type: action.type, checked: result.checked };
          tmpState = updatePartialState(tmpState, currentAction, result.id, resultStatusReducer);
        });
        return tmpState;
      }
      return state;
    default:
      return state;
  }
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
