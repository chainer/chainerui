import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';

class YAxisLogKeySelectorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectLeftToggle = this.handleSelectLeftToggle.bind(this);
    this.handleSelectRightToggle = this.handleSelectRightToggle.bind(this);
  }

  handleSelectLeftToggle() {
    const { logKey, onLogKeySelectToggle } = this.props;
    onLogKeySelectToggle('yLeftAxis', logKey);
  }

  handleSelectRightToggle() {
    const { logKey, onLogKeySelectToggle } = this.props;
    onLogKeySelectToggle('yRightAxis', logKey);
  }

  render() {
    const { logKey, logKeyLeftConfig, logKeyRightConfig } = this.props;
    return (
      <FormGroup check>
        <Label check className="form-check-label-break-word" style={{ paddingRight: '1.25rem' }}>
          <Input
            type="checkbox"
            checked={logKeyLeftConfig.selected}
            onChange={this.handleSelectLeftToggle}
          />{' '}
          {logKey}
        </Label>
        <Input
          type="checkbox"
          checked={logKeyRightConfig.selected}
          onChange={this.handleSelectRightToggle}
        />
      </FormGroup>
    );
  }
}

YAxisLogKeySelectorRow.propTypes = {
  logKey: PropTypes.string.isRequired,
  logKeyLeftConfig: uiPropTypes.logKeyConfig,
  logKeyRightConfig: uiPropTypes.logKeyConfig,
  onLogKeySelectToggle: PropTypes.func.isRequired,
};

YAxisLogKeySelectorRow.defaultProps = {
  logKeyLeftConfig: {
    selected: false,
  },
  logKeyRightConfig: {
    selected: false,
  },
};

export default YAxisLogKeySelectorRow;
