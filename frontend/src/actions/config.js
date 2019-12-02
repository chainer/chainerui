// config

export const PROJECT_CONFIG_RESET = 'PROJECT_CONFIG_RESET';
export const PROJECT_CONFIG_SMOOTHING_WEIGHT_UPDATE = 'PROJECT_CONFIG_SMOOTHING_WEIGHT_UPDATE';

export const resetProjectConfig = (projectId) => ({
  type: PROJECT_CONFIG_RESET,
  projectId,
});

export const updateSmoothingWeight = (projectId, smoothingWeight) => ({
  type: PROJECT_CONFIG_SMOOTHING_WEIGHT_UPDATE,
  projectId,
  smoothingWeight,
});

export const TARGET_RESULT_TYPE_UPDATE = 'TARGET_RESULT_TYPE_UPDATE';
export const updateTargetResultType = (projectId, resultType) => ({
  type: TARGET_RESULT_TYPE_UPDATE,
  projectId,
  resultType,
});

// axis config

export const AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';
export const AXIS_CONFIG_X_KEY_UPDATE = 'AXIS_CONFIG_X_KEY_UPDATE';
export const AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE';
export const AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE';
export const AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE = 'AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE';
export const AXIS_CONFIG_LOG_KEY_SMOOTHING_TOGGLE = 'AXIS_CONFIG_LOG_KEY_SMOOTHING_TOGGLE';

export const updateAxisScale = (projectId, axisName, scale) => ({
  type: AXIS_CONFIG_SCALE_UPDATE,
  projectId,
  axisName,
  scale,
});

export const updateXAxisKey = (projectId, xAxisKey) => ({
  type: AXIS_CONFIG_X_KEY_UPDATE,
  projectId,
  axisName: 'xAxis',
  xAxisKey,
});

export const updateAxisScaleRangeType = (
  projectId,
  axisName,
  scale,
  isMin,
  rangeType = 'auto'
) => ({
  type: AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE,
  projectId,
  axisName,
  scale,
  isMin,
  rangeType,
});

export const updateAxisScaleRangeNumber = (projectId, axisName, scale, isMin, rangeNumber) => ({
  type: AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE,
  projectId,
  axisName,
  scale,
  isMin,
  rangeNumber,
});

export const toggleLogKeySelect = (projectId, axisName, logKey) => ({
  type: AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE,
  projectId,
  axisName,
  logKey,
});

export const toggleLogKeySmoothing = (projectId, axisName, logKey) => ({
  type: AXIS_CONFIG_LOG_KEY_SMOOTHING_TOGGLE,
  projectId,
  axisName,
  logKey,
});

// results config

export const RESULTS_CONFIG_SELECT_UPDATE = 'RESULTS_CONFIG_SELECT_UPDATE';

export const updateResultsConfigSelect = (projectId, resultId, hidden) => ({
  type: RESULTS_CONFIG_SELECT_UPDATE,
  projectId,
  resultId,
  hidden,
});

// lines config

export const LINES_CONFIG_LINE_UPDATE = 'LINES_CONFIG_LINE_UPDATE';

export const updateLineInAxis = (projectId, axisName, lineKey, line) => ({
  type: LINES_CONFIG_LINE_UPDATE,
  projectId,
  axisName,
  lineKey,
  line,
});

// global config

export const GLOBAL_CONFIG_POLLING_RATE_UPDATE = 'GLOBAL_CONFIG_POLLING_RATE_UPDATE';
export const GLOBAL_CONFIG_CHART_SIZE_UPDATE = 'GLOBAL_CONFIG_CHART_SIZE_UPDATE';
export const GLOBAL_CONFIG_LOGS_LIMIT_UPDATE = 'GLOBAL_CONFIG_LOGS_LIMIT_UPDATE';
export const GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE =
  'GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE';
export const GLOBAL_CONFIG_HIGHLIGHT_TABLE_AND_CHART = 'GLOBAL_CONFIG_HIGHLIGHT_TABLE_AND_CHART';

export const updateGlobalPollingRate = (pollingRate) => ({
  type: GLOBAL_CONFIG_POLLING_RATE_UPDATE,
  pollingRate,
});

export const updateGlobalChartSize = (chartSize) => ({
  type: GLOBAL_CONFIG_CHART_SIZE_UPDATE,
  chartSize,
});

export const updateGlobalLogsLimit = (logsLimit) => ({
  type: GLOBAL_CONFIG_LOGS_LIMIT_UPDATE,
  logsLimit,
});

export const updateGlobalResultNameAlignment = (isResultNameAlignRight) => ({
  type: GLOBAL_CONFIG_RESULT_NAME_ALIGNMENT_UPDATE,
  isResultNameAlignRight,
});

export const updateGlobalHighlightTableAndChart = (highlightTableAndChart) => ({
  type: GLOBAL_CONFIG_HIGHLIGHT_TABLE_AND_CHART,
  highlightTableAndChart,
});
