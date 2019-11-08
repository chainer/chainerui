import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import { getSelectedLogKeys } from '../utils';
import Check from './FormControl/Check';

const SmoothingLinesConfigurator = ({
  project,
  projectConfig,
  axisName,
  onAxisConfigLogKeySmoothingToggle,
}) => {
  const { axes = {} } = projectConfig;
  const axisConfig = axes[axisName] || {};
  const { logKeysConfig = {} } = axisConfig;

  const selectedLogKeys = getSelectedLogKeys(logKeysConfig);

  return (
    <>
      {selectedLogKeys.map((logKey) => (
        <Check
          key={logKey}
          type="checkbox"
          checked={axes[axisName].logKeysConfig[logKey].smoothing}
          onChange={() => {
            onAxisConfigLogKeySmoothingToggle(project.id, axisName, logKey);
          }}
        >
          {logKey}
        </Check>
      ))}
    </>
  );
};

SmoothingLinesConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  axisName: uiPropTypes.axisName.isRequired,
  onAxisConfigLogKeySmoothingToggle: PropTypes.func.isRequired,
};

export default SmoothingLinesConfigurator;
