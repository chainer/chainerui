import React from 'react';
import PropTypes from 'prop-types';

import VisibilityCheckbox from '../VisibilityCheckbox';
import * as uiPropTypes from '../../store/uiPropTypes';

class ToggleResult extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectToggle = this.handleSelectToggle.bind(this);
  }

  handleSelectToggle() {
    const {
      project, result, resultConfig, onResultsConfigSelectUpdate,
    } = this.props;
    onResultsConfigSelectUpdate(project.id, result.id, !resultConfig.hidden);
  }

  render() {
    const { resultConfig } = this.props;
    return (
      <VisibilityCheckbox
        className="fa-xs"
        checked={!resultConfig.hidden}
        onChange={this.handleSelectToggle}
      />
    );
  }
}

ToggleResult.propTypes = {
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result.isRequired,
  onResultsConfigSelectUpdate: PropTypes.func.isRequired,
  resultConfig: uiPropTypes.resultConfig,
};

ToggleResult.defaultProps = {
  resultConfig: {
    hidden: false,
  },
};

export default ToggleResult;
