import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../../store/uiPropTypes';
import CommandFormBase from './CommandFormBase';


const StopForm = (props) => {
  const { projectId, resultId, onCommandSubmit } = props;
  return (
    <CommandFormBase
      title="Stop"
      buttonLabel="Stop"
      onSubmit={(schedule) => onCommandSubmit(projectId, resultId, 'stop', null, schedule)}
      needConfirmation
      confirmationMessage="Are you sure to stop the training?"
    />
  );
};

StopForm.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

export default StopForm;
