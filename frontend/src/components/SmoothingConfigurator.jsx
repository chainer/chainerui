import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';


class SmoothingConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleSmoothingWeight = this.handleSmoothingWeight.bind(this);
  }

  handleSmoothingWeight(e) {
    const { projectId, onSelectSmoothingWeight } = this.props;
    onSelectSmoothingWeight(projectId, Number(e.target.value));
  }

  render() {
    const { projectConfig } = this.props;
    return (
      <div className="smoothing-configurator card">
        <div className="card-header">Smoothing</div>
        <div className="list-group-item">
          <FormGroup>
            <Label>
              {'weight'}
              <Input
                type="range"
                className="custom-range"
                min="0"
                max="0.95"
                step="0.05"
                value={projectConfig.smoothingWeight}
                onChange={this.handleSmoothingWeight}
              />
              {projectConfig.smoothingWeight}
            </Label>
          </FormGroup>
        </div>
      </div>
    );
  }
}

SmoothingConfigurator.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  onSelectSmoothingWeight: PropTypes.func.isRequired,
};

export default SmoothingConfigurator;
