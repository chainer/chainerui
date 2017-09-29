import React from 'react';
import PropTypes from 'prop-types';
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
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

SnapshotTakeForm.defaultProps = {
};

export default SnapshotTakeForm;

