import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Toast, ToastBody } from 'reactstrap';
import PropTypes from 'prop-types';
import * as uiPropTypes from '../store/uiPropTypes';
import { fetchResultTypes } from '../constants/index';

const TOAST_LIFE_TIME = 1000 * 20;

const SelectedResultTools = (props) => {
  const {
    project,
    results,
    resultsStatus,
    resultTypeId,
    lastBulkUpdateTarget,
    onResultsPatch,
    onResultCheckBulkUpdate,
    onTableExpandedUpdate,
    onLastBulkUpdateTargetUpdate,
    onHandleGetResultList,
  } = props;

  const [toastTimier, setToastTimer] = useState(null);

  useEffect(() => {
    return () => clearInterval(toastTimier);
  }, [toastTimier]);

  const checkedResults = Object.keys(results).filter(
    (key) => resultsStatus[key] && resultsStatus[key].checked
  );

  const handleDeleteResults = (isUnregistered) => {
    if (toastTimier) {
      clearInterval(toastTimier);
    }

    onTableExpandedUpdate(project.id, {});

    const targetResultKeys = Object.keys(resultsStatus)
      .map(Number)
      .filter((resultStatusId) => {
        const result = results[resultStatusId];
        const resultStatus = resultsStatus[resultStatusId];

        if (!result) {
          return false;
        }

        if (!resultStatus.checked) {
          return false;
        }

        return true;
      });

    const requestBody = targetResultKeys.map((id) => ({ id, isUnregistered }));
    onResultsPatch(project.id, requestBody);
    const resultStatusList = targetResultKeys.map((id) => ({ id, checked: false }));
    onResultCheckBulkUpdate(project.id, resultStatusList);
    onLastBulkUpdateTargetUpdate(project.id, requestBody);

    setToastTimer(setTimeout(() => onLastBulkUpdateTargetUpdate(project.id, {}), TOAST_LIFE_TIME));
  };

  const handleUndo = () => {
    const requestBody = Object.keys(lastBulkUpdateTarget).map((key) => {
      return {
        id: lastBulkUpdateTarget[key].id,
        isUnregistered: !lastBulkUpdateTarget[key].isUnregistered,
      };
    });
    onResultsPatch(project.id, requestBody);
    onLastBulkUpdateTargetUpdate(project.id, {});
    onHandleGetResultList();
  };

  const handleCloseToast = () => {
    onLastBulkUpdateTargetUpdate(project.id, {});
  };

  return (
    <ButtonGroup>
      {checkedResults.length > 0 && resultTypeId === fetchResultTypes[0].id ? (
        <Button color="danger" className="mr-2" onClick={() => handleDeleteResults(true)}>
          Delete results
        </Button>
      ) : null}

      {checkedResults.length > 0 && resultTypeId === fetchResultTypes[1].id ? (
        <Button color="success" className="mr-2" onClick={() => handleDeleteResults(false)}>
          Restore results
        </Button>
      ) : null}

      {Object.keys(lastBulkUpdateTarget).length !== 0 ? (
        <div style={{ position: 'fixed', bottom: '1em', left: '2em', zIndex: 10000 }}>
          <Toast className="bg-dark text-white">
            <ToastBody>
              Selected results removed/restored.
              <Button className="ml-1 mb-1" color="link" size="sm" onClick={() => handleUndo()}>
                Undo
              </Button>
              <Button
                className="ml-1 text-white"
                style={{ 'margin-top': '0.1em' }}
                onClick={() => handleCloseToast()}
                close
              />
            </ToastBody>
          </Toast>
        </div>
      ) : null}
    </ButtonGroup>
  );
};

SelectedResultTools.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus,
  resultTypeId: PropTypes.string.isRequired,
  lastBulkUpdateTarget: uiPropTypes.lastBulkUpdateTarget,
  onResultsPatch: PropTypes.func.isRequired,
  onResultCheckBulkUpdate: PropTypes.func.isRequired,
  onTableExpandedUpdate: PropTypes.func.isRequired,
  onLastBulkUpdateTargetUpdate: PropTypes.func.isRequired,
  onHandleGetResultList: PropTypes.func.isRequired,
};

SelectedResultTools.defaultProps = {
  resultsStatus: {},
  lastBulkUpdateTarget: {},
};

export default SelectedResultTools;
