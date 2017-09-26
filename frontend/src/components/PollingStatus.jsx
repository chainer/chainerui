import React from 'react';
import PropTypes from 'prop-types';
import {
  RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAILUE,
  RESULT_REQUEST, RESULT_SUCCESS, RESULT_FAILUE
} from '../actions';


const PollingStatus = (props) => {
  const { pollingKey, fetchState = {}, globalConfig = {} } = props;

  let colorClass;
  if (globalConfig.pollingRate === 0 || !pollingKey) {
    colorClass = 'text-muted';
  } else {
    console.log(fetchState);
    console.log(pollingKey);
    const targetState = fetchState[pollingKey];
    switch (targetState) {
      case RESULT_LIST_REQUEST:
      case RESULT_REQUEST:
        colorClass = 'text-primary';
        break;
      case RESULT_LIST_SUCCESS:
      case RESULT_SUCCESS:
        colorClass = 'text-success';
        break;
      case RESULT_LIST_FAILUE:
      case RESULT_FAILUE:
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
  pollingKey: PropTypes.oneOf(['resultList', 'result']),
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.shape({
    global: PropTypes.shape({
      pollingRate: PropTypes.number
    })
  }).isRequired
};

PollingStatus.defaultProps = {
  pollingKey: undefined
};

export default PollingStatus;

