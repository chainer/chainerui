import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';


class AxisLogKeySelectorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectToggle = this.handleSelectToggle.bind(this);
  }

  handleSelectToggle() {
    const { logKey, onLogKeySelectToggle } = this.props;
    onLogKeySelectToggle(logKey);
  }

  render() {
    const { logKey, logKeyConfig } = this.props;
    return (
      <Check
        type="checkbox"
        checked={logKeyConfig.selected}
        onChange={this.handleSelectToggle}
      >{logKey}</Check>
    );
  }
}

AxisLogKeySelectorRow.propTypes = {
  logKey: PropTypes.string.isRequired,
  logKeyConfig: uiPropTypes.logKeyConfig,
  onLogKeySelectToggle: PropTypes.func.isRequired
};

AxisLogKeySelectorRow.defaultProps = {
  logKeyConfig: {
    selected: false
  }
};

export default AxisLogKeySelectorRow;

