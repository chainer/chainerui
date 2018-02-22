import { CALL_API } from '../middleware/api';


// projects API

export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST';
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS';
export const PROJECT_LIST_FAILURE = 'PROJECT_LIST_FAILURE';
export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';
export const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST';
export const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
export const PROJECT_UPDATE_FAILURE = 'PROJECT_UPDATE_FAILURE';
export const PROJECT_DELETE_REQUEST = 'PROJECT_DELETE_REQUEST';
export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_DELETE_FAILURE = 'PROJECT_DELETE_FAILURE';

export const getProjectList = () => ({
  [CALL_API]: {
    types: [PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAILURE],
    endpoint: 'projects'
  }
});

export const getProject = (projectId) => ({
  [CALL_API]: {
    types: [PROJECT_REQUEST, PROJECT_SUCCESS, PROJECT_FAILURE],
    endpoint: `projects/${projectId}`
  }
});

export const updateProject = (project = {}) => {
  const { id, name } = project;
  if (!Number.isInteger(id)) {
    throw new Error('Project id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAILURE],
      endpoint: `projects/${id}`,
      method: 'PUT',
      body: { project: { id, name } }
    }
  };
};

export const deleteProject = (projectId) => {
  if (!Number.isInteger(projectId)) {
    throw new Error('Project id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [PROJECT_DELETE_REQUEST, PROJECT_DELETE_SUCCESS, PROJECT_DELETE_FAILURE],
      endpoint: `projects/${projectId}`,
      method: 'DELETE'
    }
  };
};


// results API

export const RESULT_LIST_REQUEST = 'RESULT_LIST_REQUEST';
export const RESULT_LIST_SUCCESS = 'RESULT_LIST_SUCCESS';
export const RESULT_LIST_FAILURE = 'RESULT_LIST_FAILURE';
export const RESULT_REQUEST = 'RESULT_REQUEST';
export const RESULT_SUCCESS = 'RESULT_SUCCESS';
export const RESULT_FAILURE = 'RESULT_FAILURE';
export const RESULT_UPDATE_REQUEST = 'RESULT_UPDATE_REQUEST';
export const RESULT_UPDATE_SUCCESS = 'RESULT_UPDATE_SUCCESS';
export const RESULT_UPDATE_FAILURE = 'RESULT_UPDATE_FAILURE';
export const RESULT_DELETE_REQUEST = 'RESULT_DELETE_REQUEST';
export const RESULT_DELETE_SUCCESS = 'RESULT_DELETE_SUCCESS';
export const RESULT_DELETE_FAILURE = 'RESULT_DELETE_FAILURE';
export const RESULT_IMAGE_REQUEST = 'RESULT_IMAGE_REQUEST';
export const RESULT_IMAGE_SUCCESS = 'RESULT_IMAGE_SUCCESS';
export const RESULT_IMAGE_FAILURE = 'RESULT_IMAGE_FAILURE';

export const getResultList = (projectId) => ({
  [CALL_API]: {
    types: [RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAILURE],
    endpoint: `projects/${projectId}/results`
  }
});

export const getResult = (projectId, resultId) => ({
  [CALL_API]: {
    types: [RESULT_REQUEST, RESULT_SUCCESS, RESULT_FAILURE],
    endpoint: `projects/${projectId}/results/${resultId}`
  }
});

export const updateResult = (projectId, result = {}) => {
  const { id, name, isUnregistered } = result;
  if (!Number.isInteger(id)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [RESULT_UPDATE_REQUEST, RESULT_UPDATE_SUCCESS, RESULT_UPDATE_FAILURE],
      endpoint: `projects/${projectId}/results/${id}`,
      method: 'PUT',
      body: { result: { id, name, isUnregistered } }
    }
  };
};

export const deleteResult = (projectId, resultId) => {
  if (!Number.isInteger(resultId)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [RESULT_DELETE_REQUEST, RESULT_DELETE_SUCCESS, RESULT_DELETE_FAILURE],
      endpoint: `projects/${projectId}/results/${resultId}`,
      method: 'DELETE'
    }
  };
};

export const getResultImage = (projectId, resultId) => ({
  [CALL_API]: {
    types: [RESULT_IMAGE_REQUEST, RESULT_IMAGE_SUCCESS, RESULT_IMAGE_FAILURE],
    endpoint: `projects/${projectId}/results/${resultId}/images`
  }
});

// commands API

export const COMMAND_CREATE_REQUEST = 'COMMAND_CREATE_REQUEST';
export const COMMAND_CREATE_SUCCESS = 'COMMAND_CREATE_SUCCESS';
export const COMMAND_CREATE_FAILURE = 'COMMAND_CREATE_FAILURE';

export const createCommand = (
  projectId, resultId, commandName, requestBody = null, schedule = null
) => {
  if (!Number.isInteger(resultId)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [COMMAND_CREATE_REQUEST, COMMAND_CREATE_SUCCESS, COMMAND_CREATE_FAILURE],
      endpoint: `projects/${projectId}/results/${resultId}/commands`,
      method: 'POST',
      body: {
        name: commandName,
        body: requestBody,
        schedule,
        resultId
      }
    }
  };
};


// config

export const PROJECT_CONFIG_RESET = 'PROJECT_CONFIG_RESET';

export const resetProjectConfig = (projectId) => ({
  type: PROJECT_CONFIG_RESET,
  projectId
});


// axis config

export const AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';
export const AXIS_CONFIG_X_KEY_UPDATE = 'AXIS_CONFIG_X_KEY_UPDATE';
export const AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE';
export const AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE';
export const AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE = 'AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE';

export const updateAxisScale = (projectId, axisName, scale) => ({
  type: AXIS_CONFIG_SCALE_UPDATE,
  projectId,
  axisName,
  scale
});

export const updateXAxisKey = (projectId, xAxisKey) => ({
  type: AXIS_CONFIG_X_KEY_UPDATE,
  projectId,
  axisName: 'xAxis',
  xAxisKey
});

export const updateAxisScaleRangeType = (projectId, axisName, scale, isMin, rangeType = 'auto') => ({
  type: AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE,
  projectId,
  axisName,
  scale,
  isMin,
  rangeType
});

export const updateAxisScaleRangeNumber = (projectId, axisName, scale, isMin, rangeNumber) => ({
  type: AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE,
  projectId,
  axisName,
  scale,
  isMin,
  rangeNumber
});

export const toggleLogKeySelect = (projectId, axisName, logKey) => ({
  type: AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE,
  projectId,
  axisName,
  logKey
});


// results config

export const RESULTS_CONFIG_SELECT_UPDATE = 'RESULTS_CONFIG_SELECT_UPDATE';

export const updateResultsConfigSelect = (projectId, resultId, hidden) => ({
  type: RESULTS_CONFIG_SELECT_UPDATE,
  projectId,
  resultId,
  hidden
});


// lines config

export const LINES_CONFIG_LINE_UPDATE = 'LINES_CONFIG_LINE_UPDATE';

export const updateLineInAxis = (projectId, axisName, lineKey, line) => ({
  type: LINES_CONFIG_LINE_UPDATE,
  projectId,
  axisName,
  lineKey,
  line
});


// global config

export const GLOBAL_CONFIG_POLLING_RATE_UPDATE = 'GLOBAL_CONFIG_POLLING_RATE_UPDATE';
export const GLOBAL_CONFIG_CHART_SIZE_UPDATE = 'GLOBAL_CONFIG_CHART_SIZE_UPDATE';

export const updateGlobalPollingRate = (pollingRate) => ({
  type: GLOBAL_CONFIG_POLLING_RATE_UPDATE,
  pollingRate
});

export const updateGlobalChartSize = (chartSize) => ({
  type: GLOBAL_CONFIG_CHART_SIZE_UPDATE,
  chartSize
});
