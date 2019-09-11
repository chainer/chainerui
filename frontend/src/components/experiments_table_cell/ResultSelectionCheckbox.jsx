import React from 'react';
import PropTypes from 'prop-types';
import * as uiPropTypes from '../../store/uiPropTypes';
import Check from '../FormControl/Check';

const ResultSelectionCheckbox = (props) => {
  const resultState = props.resultsStatus[props.result.id] || {};
  const currentCheckState = resultState.checked || false;

  return (
    <Check
      type="checkbox"
      checked={currentCheckState}
      onChange={() => props.onChange(props.project.id, props.result.id, !currentCheckState)}
    />
  );
};

ResultSelectionCheckbox.propTypes = {
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result.isRequired,
  resultsStatus: uiPropTypes.resultsStatus.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResultSelectionCheckbox;
