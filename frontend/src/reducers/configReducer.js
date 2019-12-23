import { combineReducers } from 'redux';
import {
  chartSizeOptions,
  pollingOptions,
  logsLimitOptions,
  defaultAxisConfig,
  fetchResultTypes,
} from '../constants';
import {
  AXIS_CONFIG_SCALE_UPDATE,
  AXIS_CONFIG_X_KEY_UPDATE,
  AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE,
  AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE,
  AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE,
  AXIS_CONFIG_LOG_KEY_SMOOTHING_TOGGLE,
  RESULTS_CONFIG_SELECT_UPDATE,
  ASSETS_TABLE_STATE_COLUMNS_VISIBILITY_UPDATE,
  LINES_CONFIG_LINE_UPDATE,
  TABLE_STATE_EXPANDED_UPDATE,
  TABLE_STATE_COLUMNS_VISIBILITY_UPDATE,
  TARGET_RESULT_TYPE_UPDATE,
  PROJECT_CONFIG_SMOOTHING_WEIGHT_UPDATE,
  PROJECT_CONFIG_RESET,
  GLOBAL_CONFIG_POLLING_RATE_UPDATE,
  GLOBAL_CONFIG_CHART_SIZE_UPDATE,
  GLOBAL_CONFIG_LOGS_LIMIT_UPDATE,
  GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE,
  GLOBAL_CONFIG_HIGHLIGHT_TABLE_AND_CHART,
} from '../actions/config';
import { RESULT_UPDATE_SUCCESS, RESULTS_PATCH_SUCCESS } from '../actions/entities';
import { updatePartialState, removePartialState } from './utils';

const axisConfigReducer = (state = {}, action) => {
  const { logKey, scale = 'linear', xAxisKey, rangeType = 'auto', isMin, rangeNumber } = action;
  const { logKeysConfig = {}, scaleRange = {} } = state;
  const idx = isMin ? 0 : 1;
  const rangeConfig = scaleRange[scale] || {};
  const { rangeTypes = [], range = [] } = rangeConfig;

  switch (action.type) {
    case AXIS_CONFIG_SCALE_UPDATE:
      return {
        ...state,
        scale,
      };
    case AXIS_CONFIG_X_KEY_UPDATE:
      return {
        ...state,
        xAxisKey,
      };
    case AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE:
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
    case AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE:
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
    case AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE: {
      const logKeyConfig = logKeysConfig[logKey] || {};
      return {
        ...state,
        logKeysConfig: {
          ...logKeysConfig,
          [logKey]: {
            smoothing: false,
            ...logKeyConfig,
            selected: !logKeyConfig.selected,
          },
        },
      };
    }
    case AXIS_CONFIG_LOG_KEY_SMOOTHING_TOGGLE: {
      const logKeyConfig = logKeysConfig[logKey] || {};
      return {
        ...state,
        logKeysConfig: {
          ...logKeysConfig,
          [logKey]: {
            selected: false,
            ...logKeyConfig,
            smoothing: !logKeyConfig.smoothing,
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
    case RESULTS_CONFIG_SELECT_UPDATE:
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
    case RESULT_UPDATE_SUCCESS:
      if (action.payload && action.payload.result) {
        const { result } = action.payload;
        if (result.isUnregistered) {
          return removePartialState(state, result.id);
        }
      }
      return state;
    case ASSETS_TABLE_STATE_COLUMNS_VISIBILITY_UPDATE:
      if (resultId) {
        const { knownTrainInfoKeysConfig = {}, knownContentKeysConfig = {} } = action;
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
    case RESULTS_PATCH_SUCCESS:
      if (action.payload && action.payload.results) {
        let tmpState = state;
        const targetResult = action.payload.results.filter(
          (result) => result.is_unregistered && result.is_unregistered === true
        );
        targetResult.forEach((result) => {
          tmpState = removePartialState(tmpState, result.id);
        });
        return tmpState;
      }
      return state;
    default:
      return state;
  }
};

const linesConfigReducer = (state = {}, action) => {
  const { line, lineKey } = action;
  switch (action.type) {
    case LINES_CONFIG_LINE_UPDATE:
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
    case TABLE_STATE_EXPANDED_UPDATE:
      return {
        ...state,
        expanded,
      };
    case TABLE_STATE_COLUMNS_VISIBILITY_UPDATE:
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

const targetResultTypeReducer = (state = fetchResultTypes[0].id, action) => {
  switch (action.type) {
    case TARGET_RESULT_TYPE_UPDATE:
      return action.resultType;
    default:
      return state;
  }
};

const smoothingWeightReducer = (state = 0.8, action) => {
  switch (action.type) {
    case PROJECT_CONFIG_SMOOTHING_WEIGHT_UPDATE:
      return action.smoothingWeight;
    default:
      return state;
  }
};

const projectConfigReducer = combineReducers({
  axes: axesConfigReducer,
  resultsConfig: resultsConfigReducer,
  lines: linesConfigReducer,
  tableState: tableStateReducer,
  resultType: targetResultTypeReducer,
  smoothingWeight: smoothingWeightReducer,
});

const projectsConfigReducer = (state = {}, action) => {
  const { projectId: projectIdA, body = {} } = action;
  const { projectId: projectIdB } = body;
  const targetProjectId = projectIdA || projectIdB;
  if (targetProjectId) {
    switch (action.type) {
      case PROJECT_CONFIG_RESET:
        return updatePartialState(state, action, targetProjectId, () =>
          projectConfigReducer(undefined, action)
        );
      case RESULTS_PATCH_SUCCESS:
        return updatePartialState(state, action, targetProjectId, projectConfigReducer);
      default:
        return updatePartialState(state, action, targetProjectId, projectConfigReducer);
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
    pollingRate,
    chartSize,
    logsLimit,
    isResultNameAlignRight,
    highlightTableAndChart,
  } = action;
  switch (action.type) {
    case GLOBAL_CONFIG_POLLING_RATE_UPDATE:
      return {
        ...state,
        pollingRate,
      };
    case GLOBAL_CONFIG_CHART_SIZE_UPDATE:
      return {
        ...state,
        chartSize,
      };
    case GLOBAL_CONFIG_LOGS_LIMIT_UPDATE:
      return {
        ...state,
        logsLimit,
      };
    case GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE:
      return {
        ...state,
        isResultNameAlignRight,
      };
    case GLOBAL_CONFIG_HIGHLIGHT_TABLE_AND_CHART:
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

export default configReducer;
