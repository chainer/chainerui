import { CALL_API } from '../middleware/api';


// results API

export const RESULTS_REQUEST = 'RESULTS_REQUEST';
export const RESULTS_SUCCESS = 'RESULTS_SUCCESS';
export const RESULTS_FAILUE = 'RESULTS_FAILUE';
export const RESULT_UPDATE_REQUEST = 'RESULT_UPDATE_REQUEST';
export const RESULT_UPDATE_SUCCESS = 'RESULT_UPDATE_SUCCESS';
export const RESULT_UPDATE_FAILUE = 'RESULT_UPDATE_FAILUE';

const fetchResults = () => ({
  [CALL_API]: {
    types: [RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILUE],
    endpoint: 'results'
  }
});

export const loadResults = () => (dispatch) => dispatch(fetchResults());

export const updateResult = (result = {}) => {
  const { id, name } = result;
  if (!Number.isInteger(id)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [RESULT_UPDATE_REQUEST, RESULT_UPDATE_SUCCESS, RESULT_UPDATE_FAILUE],
      endpoint: `results/${id}`,
      method: 'PUT',
      body: { result: { id, name } }
    }
  };
};


// axis config

export const AXIS_CONFIG_LINE_ADD = 'AXIS_CONFIG_LINE_ADD';
export const AXIS_CONFIG_LINE_UPDATE = 'AXIS_CONFIG_LINE_UPDATE';
export const AXIS_CONFIG_LINE_REMOVE = 'AXIS_CONFIG_LINE_REMOVE';
export const AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';

export const addLineToAxis = (axisName, line) => ({
  type: AXIS_CONFIG_LINE_ADD,
  axisName,
  line
});

export const updateLineInAxis = (axisName, lineKey, line) => ({
  type: AXIS_CONFIG_LINE_UPDATE,
  axisName,
  lineKey,
  line
});

export const removeLineFromAxis = (axisName, lineKey) => ({
  type: AXIS_CONFIG_LINE_REMOVE,
  axisName,
  lineKey
});

export const updateAxisScale = (axisName, scale) => ({
  type: AXIS_CONFIG_SCALE_UPDATE,
  axisName,
  scale
});


// global config

export const GLOBAL_CONFIG_POLLING_RATE_UPDATE = 'GLOBAL_CONFIG_POLLING_RATE_UPDATE';

export const updateGlobalPollingRate = (pollingRate) => ({
  type: GLOBAL_CONFIG_POLLING_RATE_UPDATE,
  pollingRate
});
