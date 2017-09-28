import React from 'react';
import PropTypes from 'prop-types';
import CommandFormBase from './CommandFormBase';


const SnapshotTakeForm = (props) => {
  const { projectId, resultId, onCommandSubmit } = props;
  return (
    <CommandFormBase
      projectId={projectId}
      resultId={resultId}
      commandName="take_snapshot"
      title="Take snapshot"
      buttonLabel="Take snapshot"
      onCommandSubmit={onCommandSubmit}
    />
  );
};

SnapshotTakeForm.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

SnapshotTakeForm.defaultProps = {
};

export default SnapshotTakeForm;

