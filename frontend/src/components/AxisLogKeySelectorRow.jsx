import React from 'react';
import PropTypes from 'prop-types';
import { Label, Input } from 'reactstrap';


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
      <div>
        <Label check>
          <Input
            type="checkbox"
            checked={logKeyConfig.selected}
            onChange={this.handleSelectToggle}
          /> {logKey}
        </Label>
      </div>
    );
  }
}

AxisLogKeySelectorRow.propTypes = {
  logKey: PropTypes.string.isRequired,
  logKeyConfig: PropTypes.shape({
    selected: PropTypes.bool
  }),
  onLogKeySelectToggle: PropTypes.func.isRequired
};

AxisLogKeySelectorRow.defaultProps = {
  logKeyConfig: {
    selected: false
  }
};

export default AxisLogKeySelectorRow;

