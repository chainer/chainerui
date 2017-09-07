import React from 'react';
import PropTypes from 'prop-types';
import AxisLogKeySelectorRow from './AxisLogKeySelectorRow';


class AxisLogKeySelector extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogKeySelectToggle = this.handleLogKeySelectToggle.bind(this);
  }

  handleLogKeySelectToggle(logKey) {
    const { axisConfig, onAxisConfigLogKeySelectToggle } = this.props;
    const { axisName } = axisConfig;
    onAxisConfigLogKeySelectToggle(axisName, logKey);
  }

  render() {
    const {
      axisConfig, stats
    } = this.props;
    const logKeysConfig = axisConfig.logKeys || {};
    const { logKeys } = stats;

    const axisLogKeySelectorRowElems = logKeys.map((logKey) => (
      <AxisLogKeySelectorRow
        logKey={logKey}
        logKeyConfig={logKeysConfig[logKey]}
        onLogKeySelectToggle={this.handleLogKeySelectToggle}
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
  axisConfig: PropTypes.shape({
    axisName: PropTypes.string,
    logKeys: PropTypes.objectOf(PropTypes.shape({
      selected: PropTypes.bool
    }))
  }).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

AxisLogKeySelector.defaultProps = {
};

export default AxisLogKeySelector;

