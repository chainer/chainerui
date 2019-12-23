import { combineReducers, Reducer } from 'redux';
import { CHART_DOWNLOAD_STATUS, keyOptions } from '../constants';
import {
  ResultStatus,
  ResultsStatus,
  ResultFilter,
  LastBulkUpdateTarget,
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
  RESULT_CHECK_UPDATE,
  RESULT_CHECK_BULK_UPDATE,
  RESULT_FILTER_UPDATE,
  LAST_BULK_UPDATE_TARGET_UPDATE,
  ChartDownloadStatusAction,
  ResultSelectAction,
  ResultCheckAction,
  ResultStatusAction,
  ResultFilterAction,
  LastBulkUpdateTargetAction,
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
    case RESULT_CHECK_UPDATE:
      return action.checked;
    default:
      return state;
  }
};

const resultStatusReducer: Reducer<ResultStatus> = combineReducers({
  selected: resultSelectedReducer,
  checked: resultCheckedReducer,
});

const resultsStatusReducer: Reducer<ResultsStatus, ResultStatusAction> = (state = {}, action) => {
  const { projectId } = action;
  switch (action.type) {
    case RESULT_CHECK_BULK_UPDATE:
      if (action.results) {
        let tmpState = state;
        action.results.forEach((result) => {
          const currentAction: ResultCheckAction = {
            type: RESULT_CHECK_UPDATE,
            projectId,
            resultId: result.id,
            checked: result.checked,
          };
          tmpState = updatePartialState(tmpState, currentAction, result.id, resultStatusReducer);
        });
        return tmpState;
      }
      return state;
    case RESULT_SELECT_UPDATE:
    case RESULT_CHECK_UPDATE:
      return updatePartialState(state, action, action.resultId, resultStatusReducer);
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

const lastBulkUpdateTargetReducer: Reducer<LastBulkUpdateTarget, LastBulkUpdateTargetAction> = (
  state = {},
  action
) => {
  const { results } = action;
  switch (action.type) {
    case LAST_BULK_UPDATE_TARGET_UPDATE:
      return { ...results };
    default:
      return state;
  }
};

const projectStatusReducer: Reducer<ProjectStatus> = combineReducers({
  chartDownloadStatus: chartDownloadStatusReducer,
  resultsStatus: resultsStatusReducer,
  resultFilter: resultFilterReducer,
  lastBulkUpdateTarget: lastBulkUpdateTargetReducer,
});

type ProjectsStatusAction =
  | ChartDownloadStatusAction
  | ResultStatusAction
  | ResultFilterAction
  | LastBulkUpdateTargetAction;
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
