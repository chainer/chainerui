import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import { getSelectedResults, getSelectedLogKeys } from '../utils';
import Check from './FormControl/Check';

const SmoothingLinesConfigurator = ({
  project,
  results,
  projectConfig,
  axisName,
  onAxisConfigLogKeySmoothingToggle,
}) => {
  const { axes = {}, resultsConfig = {} } = projectConfig;
  const axisConfig = axes[axisName] || {};
  const { logKeysConfig = {} } = axisConfig;

  const selectedResults = getSelectedResults(results, resultsConfig);
  const selectedLogKeys = getSelectedLogKeys(logKeysConfig);

  return (
    <>
      {selectedResults.map((resultId) => (
        <React.Fragment key={resultId}>
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
        </React.Fragment>
      ))}
    </>
  );
};

SmoothingLinesConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  axisName: uiPropTypes.axisName.isRequired,
  onAxisConfigLogKeySmoothingToggle: PropTypes.func.isRequired,
};

export default SmoothingLinesConfigurator;
