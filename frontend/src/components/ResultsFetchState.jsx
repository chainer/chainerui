import React from 'react';
import PropTypes from 'prop-types';
import { RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILUE } from '../actions';


const ResultsFetchState = (props) => {
  const { fetchState = {} } = props;
  const resultsFetchState = fetchState.results;

  let colorClass;
  switch (resultsFetchState) {
    case RESULTS_REQUEST:
      colorClass = 'text-primary';
      break;
    case RESULTS_SUCCESS:
      colorClass = 'text-success';
      break;
    case RESULTS_FAILUE:
      colorClass = 'text-danger';
      break;
    default:
      colorClass = 'text-muted';
  }
  return (
    <small className={colorClass}><span className="oi oi-media-record" /></small>
  );
};

ResultsFetchState.propTypes = {
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired
};

export default ResultsFetchState;

