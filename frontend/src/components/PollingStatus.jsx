import React from 'react';
import PropTypes from 'prop-types';
import { RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAILUE } from '../actions';


const PollingStatus = (props) => {
  const { fetchState = {}, globalConfig = {} } = props;
  const resultsFetchState = fetchState.resultList;

  let colorClass;
  if (globalConfig.pollingRate === 0) {
    colorClass = 'text-muted';
  } else {
    switch (resultsFetchState) {
      case RESULT_LIST_REQUEST:
        colorClass = 'text-primary';
        break;
      case RESULT_LIST_SUCCESS:
        colorClass = 'text-success';
        break;
      case RESULT_LIST_FAILUE:
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

PollingStatus.propTypes = {
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.shape({
    global: PropTypes.shape({
      pollingRate: PropTypes.number
    })
  }).isRequired
};

export default PollingStatus;

