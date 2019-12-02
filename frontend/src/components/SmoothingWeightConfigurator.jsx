import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';

class SmoothingWeightConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleSmoothingWeight = this.handleSmoothingWeight.bind(this);
  }

  handleSmoothingWeight(e) {
    const { projectId, onSmoothingWeightUpdate } = this.props;
    onSmoothingWeightUpdate(projectId, Number(e.target.value));
  }

  render() {
    const { smoothingWeight = 0.8 } = this.props.projectConfig;
    return (
      <div className="list-group-item d-flex flex-row">
        weight:
        <input
          type="range"
          className="custom-range px-2"
          min="0"
          max="0.95"
          step="0.05"
          value={smoothingWeight}
          onChange={this.handleSmoothingWeight}
        />
        {smoothingWeight.toFixed(2)}
      </div>
    );
  }
}

SmoothingWeightConfigurator.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  onSmoothingWeightUpdate: PropTypes.func.isRequired,
};

export default SmoothingWeightConfigurator;
