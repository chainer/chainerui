import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../../store/uiPropTypes';
import CommandFormBase from './CommandFormBase';


const SnapshotTakeForm = (props) => {
  const { projectId, resultId, onCommandSubmit } = props;
  return (
    <CommandFormBase
      title="Take snapshot"
      buttonLabel="Take snapshot"
      onSubmit={(schedule) => onCommandSubmit(projectId, resultId, 'take_snapshot', null, schedule)}
    />
  );
};

SnapshotTakeForm.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  onCommandSubmit: PropTypes.func.isRequired,
};

export default SnapshotTakeForm;

