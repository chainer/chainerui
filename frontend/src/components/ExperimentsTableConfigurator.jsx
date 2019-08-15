import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';

class ExperimentsTableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsGrouped = this.handleIsGrouped.bind(this);
  }

  handleIsGrouped(event) {
    const { tableState } = this.props.projectConfig;

    this.props.onTableColumnsVisibilityUpdate(
      this.props.project.id,
      tableState.hiddenLogKeys,
      tableState.hiddenArgKeys,
      event.target.checked
    );
  }

  render() {
    const { projectConfig } = this.props;
    const { tableState } = projectConfig;
    const { isGrouped = false } = tableState;

    return (
      <div>
        <div className="form-inline">
          <Check
            type="checkbox"
            className="ml-2"
            checked={isGrouped}
            onChange={this.handleIsGrouped}
          >
            Grouping
          </Check>
        </div>
      </div>
    );
  }
}

ExperimentsTableConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired,
};

export default ExperimentsTableConfigurator;
