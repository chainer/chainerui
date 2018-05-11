import React from 'react';
import PropTypes from 'prop-types';

class ToggleResult extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelectToggle = this.handleSelectToggle.bind(this);
  }

  handleSelectToggle() {
    const { project, result, resultConfig, onResultsConfigSelectUpdate } = this.props;
    onResultsConfigSelectUpdate(project.id, result.id, !resultConfig.hidden);
  }

  render() {
    const { resultConfig } = this.props;
    return (
      <input
        type="checkbox"
        checked={!resultConfig.hidden}
        onChange={this.handleSelectToggle}
      />
    );
  }
}

ToggleResult.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  result: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  onResultsConfigSelectUpdate: PropTypes.func.isRequired,
  resultConfig: PropTypes.shape({
    hidden: PropTypes.bool
  })
};

ToggleResult.defaultProps = {
  resultConfig: {
    hidden: false
  }
};

export default ToggleResult;
