import { CALL_API } from '../middleware/api';


// results API

export const RESULTS_REQUEST = 'RESULTS_REQUEST';
export const RESULTS_SUCCESS = 'RESULTS_SUCCESS';
export const RESULTS_FAILUE = 'RESULTS_FAILUE';

const fetchResults = () => ({
  [CALL_API]: {
    types: [RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILUE],
    endpoint: 'results'
  }
});

export const loadResults = () => (dispatch) => dispatch(fetchResults());


// axis config

export const AXIS_CONFIG_LINE_ADD = 'AXIS_CONFIG_LINE_ADD';
export const AXIS_CONFIG_LINE_REMOVE = 'AXIS_CONFIG_LINE_REMOVE';

export const addLineToAxis = (axisName, line) => ({
  type: AXIS_CONFIG_LINE_ADD,
  axisName,
  line
});

