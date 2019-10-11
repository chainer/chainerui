import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';
import SnapshotTakeForm from '../result/SnapshotTakeForm';
import StopForm from '../result/StopForm';
import { urlForResultDetail } from '../../utils';

const SubComponent = (props) => {
  const { original, project, onCommandSubmit } = props;
  const { id } = original;
  const style = {
    padding: '1rem',
    borderTop: '1px solid #eee',
  };

  return (
    <div style={style}>
      <div className="col-sm-6">
        <Button
          tag={Link}
          to={urlForResultDetail(project.id, id)}
          color="primary"
          className="mb-2 mr-2"
        >
          Detail
        </Button>
        <Button
          tag={Link}
          to={`${urlForResultDetail(project.id, id)}/assets`}
          color="primary"
          className="mb-2 mr-2"
        >
          Assets
        </Button>

        <div className="mb-2">
          <SnapshotTakeForm
            projectId={project.id}
            resultId={id}
            onCommandSubmit={onCommandSubmit}
          />
        </div>

        <div className="mb-2">
          <StopForm projectId={project.id} resultId={id} onCommandSubmit={onCommandSubmit} />
        </div>

        <small className="text-muted mr-2">{`result_id: ${id}`}</small>
      </div>
    </div>
  );
};

SubComponent.propTypes = {
  original: uiPropTypes.result.isRequired,
  project: uiPropTypes.project.isRequired,
  onCommandSubmit: PropTypes.func.isRequired,
};

export default SubComponent;
