import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import AxisLogKeySelectorRow from './AxisLogKeySelectorRow';


class AxisLogKeySelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogKeySelectToggle = this.handleLogKeySelectToggle.bind(this);
    this.handleLogKeySelectSmoothing = this.handleLogKeySelectSmoothing.bind(this);
  }

  handleLogKeySelectToggle(logKey) {
    const { projectId, axisName, onAxisConfigLogKeySelectToggle } = this.props;
    onAxisConfigLogKeySelectToggle(projectId, axisName, logKey);
  }

  handleLogKeySelectSmoothing(logKey) {
    const { projectId, axisName, onAxisConfigLogKeySelectSmoothing } = this.props;
    onAxisConfigLogKeySelectSmoothing(projectId, axisName, logKey);
  }

  render() {
    const {
      axisConfig, stats,
    } = this.props;
    const { logKeysConfig = {} } = axisConfig;
    const { logKeys } = stats;

    const axisLogKeySelectorRowElems = logKeys.map((logKey) => (
      <AxisLogKeySelectorRow
        logKey={logKey}
        logKeyConfig={logKeysConfig[logKey]}
        onLogKeySelectToggle={this.handleLogKeySelectToggle}
        onLogKeySelectSmoothing={this.handleLogKeySelectSmoothing}
        key={logKey}
      />
    ));

    return (
      <div className="list-group-item">
        {axisLogKeySelectorRowElems}
      </div>
    );
  }
}


AxisLogKeySelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  axisName: uiPropTypes.axisName.isRequired,
  axisConfig: uiPropTypes.axisConfig.isRequired,
  stats: uiPropTypes.stats.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectSmoothing: PropTypes.func.isRequired,
};

export default AxisLogKeySelector;
