import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAILURE,
  RESULT_REQUEST, RESULT_SUCCESS, RESULT_FAILURE,
} from '../actions';


class PollingStatus extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTooltip = this.toggleTooltip.bind(this);

    this.state = {
      isTooltipOpen: false,
    };
  }

  toggleTooltip() {
    this.setState((prevState) => ({
      isTooltipOpen: !prevState.isTooltipOpen,
    }));
  }

  render() {
    const { pollingKey, fetchState, globalConfig } = this.props;
    const { isTooltipOpen } = this.state;

    let colorClass;
    let statusMessage;
    if (globalConfig.pollingRate === 0 || !pollingKey) {
      colorClass = 'text-muted';
      statusMessage = '';
    } else {
      const targetState = fetchState[pollingKey];
      switch (targetState) {
        case RESULT_LIST_REQUEST:
        case RESULT_REQUEST:
          colorClass = 'text-primary';
          statusMessage = 'loading data ...';
          break;
        case RESULT_LIST_SUCCESS:
        case RESULT_SUCCESS:
          colorClass = 'text-success';
          statusMessage = 'success fully loaded data';
          break;
        case RESULT_LIST_FAILURE:
        case RESULT_FAILURE:
          colorClass = 'text-danger';
          statusMessage = 'failed to load data';
          break;
        default:
          colorClass = 'text-muted';
          statusMessage = '';
          break;
      }
    }
    return (
      <div className={colorClass}>
        <small>
          <i id="polling-status-tooltip" className="fas fa-circle fa-xs" />
        </small>
        <Tooltip
          placement="bottom"
          isOpen={!!(isTooltipOpen && statusMessage)}
          target="polling-status-tooltip"
          toggle={this.toggleTooltip}
        >
          {statusMessage}
        </Tooltip>
      </div>
    );
  }
}

PollingStatus.propTypes = {
  pollingKey: PropTypes.oneOf(['resultList', 'result']),
  fetchState: uiPropTypes.fetchState.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
};

PollingStatus.defaultProps = {
  pollingKey: undefined,
};

export default PollingStatus;
