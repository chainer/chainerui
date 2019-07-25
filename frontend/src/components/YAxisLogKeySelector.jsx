import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import YAxisLogKeySelectorRow from './YAxisLogKeySelectorRow';


class YAxisLogKeySelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogKeySelectToggle = this.handleLogKeySelectToggle.bind(this);
  }

  handleLogKeySelectToggle(axisName, logKey) {
    const { projectId, onAxisConfigLogKeySelectToggle } = this.props;
    onAxisConfigLogKeySelectToggle(projectId, axisName, logKey);
  }

  render() {
    const {
      axesConfig, stats,
    } = this.props;
    const {
      yLeftAxis = {},
      yRightAxis = {},
    } = axesConfig;
    const { logKeysConfig: logKeysLeftConfig = {} } = yLeftAxis;
    const { logKeysConfig: logKeysRightConfig = {} } = yRightAxis;
    const { logKeys } = stats;

    const axisLogKeySelectorRowElems = logKeys.map((logKey) => (
      <YAxisLogKeySelectorRow
        logKey={logKey}
        logKeyLeftConfig={logKeysLeftConfig[logKey]}
        logKeyRightConfig={logKeysRightConfig[logKey]}
        onLogKeySelectToggle={this.handleLogKeySelectToggle}
        key={logKey}
      />
    ));

    return (
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          {axisLogKeySelectorRowElems}
        </li>
      </ul>
    );
  }
}


YAxisLogKeySelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  axesConfig: PropTypes.shape({
    yLeftAxis: uiPropTypes.axisConfig,
    yRightAxis: uiPropTypes.axisConfig,
  }).isRequired,
  stats: uiPropTypes.stats.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired,
};

export default YAxisLogKeySelector;
