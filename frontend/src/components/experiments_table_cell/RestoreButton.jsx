import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';

class RestoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleUnregister = this.handleUnregister.bind(this);
  }

  handleUnregister() {
    const { project, result, onResultUpdate, onResultUnregistered } = this.props;
    onResultUpdate(project.id, { ...result, isUnregistered: false });
    onResultUnregistered();
  }

  render() {
    return <Button onClick={this.handleUnregister}>Restore</Button>;
  }
}

RestoreButton.propTypes = {
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result.isRequired,
  onResultUpdate: PropTypes.func.isRequired,
  onResultUnregistered: PropTypes.func.isRequired,
};

export default RestoreButton;
