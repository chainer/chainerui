import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';


class AxisLogKeySelectorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectToggle = this.handleSelectToggle.bind(this);
    this.handleSelectSmoothing = this.handleSelectSmoothing.bind(this);
  }

  handleSelectToggle() {
    const { logKey, onLogKeySelectToggle } = this.props;
    onLogKeySelectToggle(logKey);
  }

  handleSelectSmoothing() {
    const { logKey, onLogKeySelectSmoothing } = this.props;
    onLogKeySelectSmoothing(logKey);
  }

  render() {
    const { logKey, logKeyConfig } = this.props;
    return (
      <>
        <Check
          type="checkbox"
          checked={logKeyConfig.selected}
          onChange={this.handleSelectToggle}
        >
          {logKey}
          <Check
            type="checkbox"
            checked={logKeyConfig.smoothing}
            onChange={this.handleSelectSmoothing}
            disabled={!logKeyConfig.selected}
          />
        </Check>
      </>
    );
  }
}

AxisLogKeySelectorRow.propTypes = {
  logKey: PropTypes.string.isRequired,
  logKeyConfig: uiPropTypes.logKeyConfig,
  onLogKeySelectToggle: PropTypes.func.isRequired,
  onLogKeySelectSmoothing: PropTypes.func.isRequired,
};

AxisLogKeySelectorRow.defaultProps = {
  logKeyConfig: {
    selected: false,
    smoothing: false,
  },
};

export default AxisLogKeySelectorRow;
