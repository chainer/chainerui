import { combineReducers, Reducer } from 'redux';
import { CHART_DOWNLOAD_STATUS, keyOptions } from '../constants';
import {
  ResultStatus,
  ResultsStatus,
  ResultFilter,
  ProjectStatus,
  ProjectsStatus,
  Stats,
  Result,
  Status,
} from '../store/types';
import { RESULT_LIST_SUCCESS } from '../actions/entities';
import {
  CHART_DOWNLOAD_STATUS_UPDATE,
  RESULT_SELECT_UPDATE,
  CHECKED_OF_RESULT_STATUS_UPDATE,
  CHECK_OF_RESULT_STATUS_LIST_UPDATE,
  RESULT_FILTER_UPDATE,
  ChartDownloadStatusAction,
  ResultSelectAction,
  ResultCheckAction,
  ResultsStatusAction,
  ResultFilterAction,
} from '../actions/status';
import { updatePartialState } from './utils';

const chartDownloadStatusReducer: Reducer<CHART_DOWNLOAD_STATUS, ChartDownloadStatusAction> = (
  state = CHART_DOWNLOAD_STATUS.NONE,
  action
) => {
  switch (action.type) {
    case CHART_DOWNLOAD_STATUS_UPDATE:
      return action.chartDownloadStatus;
    default:
      return state;
  }
};

const resultSelectedReducer: Reducer<ResultStatus['selected'], ResultSelectAction> = (
  state = false,
  action
) => {
  switch (action.type) {
    case RESULT_SELECT_UPDATE:
      return action.selected;
    default:
      return state;
  }
};

const resultCheckedReducer: Reducer<ResultStatus['checked'], ResultCheckAction> = (
  state = false,
  action
) => {
  switch (action.type) {
    case CHECKED_OF_RESULT_STATUS_UPDATE:
      return action.checked;
    default:
      return state;
  }
};

const resultStatusReducer: Reducer<ResultStatus> = combineReducers({
  selected: resultSelectedReducer,
  checked: resultCheckedReducer,
});

const resultsStatusReducer: Reducer<ResultsStatus, ResultsStatusAction> = (state = {}, action) => {
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

const resultFilterReducer: Reducer<ResultFilter, ResultFilterAction> = (state = {}, action) => {
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

const projectStatusReducer: Reducer<ProjectStatus> = combineReducers({
  chartDownloadStatus: chartDownloadStatusReducer,
  resultsStatus: resultsStatusReducer,
  resultFilter: resultFilterReducer,
});

type ProjectsStatusAction = ChartDownloadStatusAction | ResultsStatusAction | ResultFilterAction;
const projectsStatusReducer: Reducer<ProjectsStatus, ProjectsStatusAction> = (
  state = {},
  action
) => {
  const { projectId } = action;
  if (projectId) {
    return updatePartialState(state, action, projectId, projectStatusReducer);
  }

  return state;
};

// TODO: use ResultListAction
const statsReducer: Reducer<Stats> = (
  state = { argKeys: [], logKeys: [], xAxisKeys: [] },
  action
) => {
  switch (action.type) {
    case RESULT_LIST_SUCCESS:
      if (action.response && action.response.results) {
        const resultsList: Result[] = action.response.results;
        const argKeySet: { [argKey: string]: boolean } = {};
        const logKeySet: { [logKey: string]: boolean } = {};
        resultsList.forEach((result) => {
          if (result.args) {
            result.args.forEach((arg) => {
              argKeySet[arg.key] = true;
            });
          }
          if (result.logs) {
            result.logs.forEach((log) => {
              Object.keys(log.logDict).forEach((key) => {
                logKeySet[key] = true;
              });
            });
          }
        });
        const newStats: Stats = {
          argKeys: Object.keys(argKeySet),
          logKeys: Object.keys(logKeySet).sort(),
          xAxisKeys: keyOptions.filter((key) => key in logKeySet),
        };
        const statsKeys = Object.keys(newStats) as (keyof Stats)[];
        statsKeys.forEach((key) => {
          if (`${newStats[key]}` === `${state[key]}`) {
            newStats[key] = state[key];
          }
        });
        if (statsKeys.some((key) => newStats[key] !== state[key])) {
          return newStats;
        }
        return state;
      }
      return state;
    default:
      return state;
  }
};

const statusReducer: Reducer<Status> = combineReducers({
  projectsStatus: projectsStatusReducer,
  stats: statsReducer,
});

export default statusReducer;
