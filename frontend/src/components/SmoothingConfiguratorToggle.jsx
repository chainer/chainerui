import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import SmoothingWeightConfigurator from './SmoothingWeightConfigurator';

class SmoothingConfiguratorToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSmoothingConfig = this.toggleSmoothingConfig.bind(this);

    this.state = {
      showSmoothingConfig: false,
    };
  }

  toggleSmoothingConfig() {
    this.setState((prevState) => ({
      showSmoothingConfig: !prevState.showSmoothingConfig,
    }));
  }

  render() {
    const { project, projectConfig, onSmoothingWeightUpdate } = this.props;

    return (
      <div className="list-group list-group-flush">
        <div className="list-group-item">
          <Button size="sm" className="my-2" onClick={this.toggleSmoothingConfig}>
            Toggle smoothing setting
          </Button>
        </div>
        <Collapse isOpen={this.state.showSmoothingConfig}>
          <SmoothingWeightConfigurator
            projectId={project.id}
            projectConfig={projectConfig}
            onSmoothingWeightUpdate={onSmoothingWeightUpdate}
          />
        </Collapse>
      </div>
    );
  }
}

SmoothingConfiguratorToggle.propTypes = {
  project: uiPropTypes.project.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  onSmoothingWeightUpdate: PropTypes.func.isRequired,
};

export default SmoothingConfiguratorToggle;
