import React from 'react';
import PropTypes from 'prop-types';
import * as uiPropTypes from '../../store/uiPropTypes';
import Check from '../FormControl/Check';

const ResultSelectionCheckbox = (props) => {
  const resultStateList = props.targetResults.map((result) => props.resultsStatus[result.id] || {});
  const currentCheckState = resultStateList.every((item) => item.checked);

  return (
    <Check
      type="checkbox"
      checked={currentCheckState}
      onChange={() =>
        props.targetResults.forEach((result) =>
          props.onChange(props.project.id, result.id, !currentCheckState)
        )
      }
    />
  );
};

ResultSelectionCheckbox.propTypes = {
  project: uiPropTypes.project.isRequired,
  targetResults: PropTypes.arrayOf(uiPropTypes.result).isRequired,
  resultsStatus: uiPropTypes.resultsStatus.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResultSelectionCheckbox;
