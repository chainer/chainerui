import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import AxisScaleSelector from './AxisScaleSelector';
import AxisRangeConfigurator from './AxisRangeConfigurator';

class AxisConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeScale = this.handleChangeScale.bind(this);
    this.toggleRangeConfig = this.toggleRangeConfig.bind(this);

    this.state = {
      showRangeConfig: false,
    };
  }

  handleChangeScale(scale) {
    const { projectId, axisName } = this.props;
    this.props.onChangeScale(projectId, axisName, scale);
  }

  toggleRangeConfig() {
    this.setState((prevState) => ({
      showRangeConfig: !prevState.showRangeConfig,
    }));
  }

  render() {
    const {
      projectId,
      axisName,
      axisConfig,
      onAxisConfigScaleRangeTypeUpdate,
      onAxisConfigScaleRangeNumberUpdate,
    } = this.props;
    const { scale } = axisConfig;

    return (
      <>
        <AxisScaleSelector scale={scale} onChange={this.handleChangeScale} />
        <Button size="sm" className="my-2" onClick={this.toggleRangeConfig}>
          Toggle range setting
        </Button>
        <Collapse isOpen={this.state.showRangeConfig}>
          <AxisRangeConfigurator
            projectId={projectId}
            axisName={axisName}
            axisConfig={axisConfig}
            isMin={false}
            onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
            onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
          />
          <AxisRangeConfigurator
            projectId={projectId}
            axisName={axisName}
            axisConfig={axisConfig}
            isMin
            onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
            onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
          />
        </Collapse>
      </>
    );
  }
}

AxisConfigurator.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  axisName: uiPropTypes.axisName.isRequired,
  axisConfig: uiPropTypes.axisConfig.isRequired,
  onChangeScale: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
};

export default AxisConfigurator;
