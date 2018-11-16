import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';


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
      <FormGroup check>
        <Label check className="form-check-label-break-word">
          <Input
            type="checkbox"
            checked={logKeyConfig.selected}
            onChange={this.handleSelectToggle}
          /> {logKey}
        </Label>
      </FormGroup>
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

