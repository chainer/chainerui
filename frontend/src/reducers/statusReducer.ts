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
  ResultFilterAction,
} from '../actions/status';
import { updatePartialState } from './utils';

type ChartDownloadStatusState = CHART_DOWNLOAD_STATUS;
const chartDownloadStatusReducer: Reducer<ChartDownloadStatusState, ChartDownloadStatusAction> = (
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

type ResultSelectedState = boolean;
const resultSelectedReducer: Reducer<ResultSelectedState, ResultSelectedAction> = (
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

type ResultCheckedState = boolean;
const resultCheckedReducer: Reducer<ResultCheckedState, ResultCheckedAction> = (
  state = false,
  action
) => {
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
type ResultStatusState = ReturnType<typeof resultStatusReducer>;

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

type ResultFilterState = {
  [filterKey: string]: string;
};
const resultFilterReducer: Reducer<ResultFilterState, ResultFilterAction> = (
  state = {},
  action
) => {
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
type ProjectStatusState = ReturnType<typeof projectStatusReducer>;

type ProjectsStatusState = {
  [projectId: string]: ProjectStatusState;
};
type ProjectsStatusAction = ChartDownloadStatusAction | ResultsStatusAction | ResultFilterAction;
const projectsStatusReducer: Reducer<ProjectsStatusState, ProjectsStatusAction> = (
  state = {},
  action
) => {
  const { projectId } = action;
  if (projectId) {
    return updatePartialState(state, action, projectId, projectStatusReducer);
  }

  return state;
};

type StatsState = {
  argKeys: string[];
  logKeys: string[];
  xAxisKeys: string[];
};
// TODO: use ResultListAction
// TODO: remove any
const statsReducer: Reducer<StatsState> = (
  state = { argKeys: [], logKeys: [], xAxisKeys: [] },
  action
) => {
  switch (action.type) {
    case RESULT_LIST_SUCCESS:
      if (action.response && action.response.results) {
        const resultsList = action.response.results;
        const argKeySet: { [argKey: string]: boolean } = {};
        const logKeySet: { [logKey: string]: boolean } = {};
        resultsList.forEach((result: any) => {
          result.args.forEach((arg: any) => {
            argKeySet[arg.key] = true;
          });
          result.logs.forEach((log: any) => {
            Object.keys(log.logDict).forEach((key) => {
              logKeySet[key] = true;
            });
          });
        });
        const newStats: StatsState = {
          argKeys: Object.keys(argKeySet),
          logKeys: Object.keys(logKeySet).sort(),
          xAxisKeys: keyOptions.filter((key) => key in logKeySet),
        };
        const statsKeys = Object.keys(newStats) as (keyof StatsState)[];
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

const statusReducer = combineReducers({
  projectsStatus: projectsStatusReducer,
  stats: statsReducer,
});
export type StatusState = ReturnType<typeof statusReducer>;

export default statusReducer;
