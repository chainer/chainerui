import { CALL_API } from '../middleware/api';

export const RESULTS_REQUEST = 'RESULTS_REQUEST';
export const RESULTS_SUCCES = 'RESULTS_SUCCESS';
export const RESULTS_FAILUE = 'RESULTS_FAILUE';

const fetchResults = () => ({
  [CALL_API]: {
    types: [RESULTS_REQUEST, RESULTS_SUCCES, RESULTS_FAILUE],
    endpoint: 'results'
  }
});

export const loadResults = () => (dispatch) => dispatch(fetchResults());

