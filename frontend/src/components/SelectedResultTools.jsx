import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import * as uiPropTypes from '../store/uiPropTypes';
import { fetchResultTypes } from '../constants/index';

const SelectedResultTools = (props) => {
  const {
    project,
    results,
    resultsStatus,
    resultTypeId,
    onResultUpdate,
    onCheckedOfResultStatusUpdate,
    onTableExpandedUpdate,
  } = props;

  const checkedResults = Object.keys(results).filter(
    (key) => resultsStatus[key] && resultsStatus[key].checked
  );

  const handleDeleteResults = (isUnregistered) => {
    onTableExpandedUpdate(project.id, {});

    Object.keys(resultsStatus).forEach((resultStatusId) => {
      const result = results[resultStatusId];
      const resultStatus = resultsStatus[resultStatusId];

      if (!result) {
        return;
      }

      if (!resultStatus.checked) {
        return;
      }

      onResultUpdate(project.id, { ...result, isUnregistered });
      onCheckedOfResultStatusUpdate(project.id, result.id, false);
    });
  };

  return (
    <div>
      {checkedResults.length > 0 && resultTypeId === fetchResultTypes[0].id ? (
        <Button color="danger" onClick={() => handleDeleteResults(true)}>
          Delete results
        </Button>
      ) : null}

      {checkedResults.length > 0 && resultTypeId === fetchResultTypes[1].id ? (
        <Button color="success" onClick={() => handleDeleteResults(false)}>
          Restore results
        </Button>
      ) : null}
    </div>
  );
};

SelectedResultTools.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus,
  resultTypeId: PropTypes.string.isRequired,
  onResultUpdate: PropTypes.func.isRequired,
  onCheckedOfResultStatusUpdate: PropTypes.func.isRequired,
  onTableExpandedUpdate: PropTypes.func.isRequired,
};

SelectedResultTools.defaultProps = {
  resultsStatus: {},
};

export default SelectedResultTools;
