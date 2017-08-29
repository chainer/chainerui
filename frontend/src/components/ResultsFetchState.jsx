import React from 'react';
import PropTypes from 'prop-types';
import { RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILUE } from '../actions';


const ResultsFetchState = (props) => {
  const { fetchState = {}, config = { global: {} } } = props;
  const resultsFetchState = fetchState.results;

  let colorClass;
  if (config.global.pollingRate === 0) {
    colorClass = 'text-muted';
  } else {
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
        break;
    }
  }
  return (
    <small className={colorClass}><span className="oi oi-media-record" /></small>
  );
};

ResultsFetchState.propTypes = {
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired,
  config: PropTypes.shape({
    global: PropTypes.shape({
      pollingRate: PropTypes.number
    })
  }).isRequired
};

export default ResultsFetchState;

