import React from 'react';
import { Link } from 'react-router';
import { Button } from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';
import {
  urlForResultDetail
} from '../../utils';

const Assets = (props) => {
  const { projectId, resultId } = props;
  return (
    <div className="card">
      <div className="card-header">Assets</div>
      <div className="card-body">
        <Button
          tag={Link}
          to={`${urlForResultDetail(projectId, resultId)}/assets`}
          color="primary"
        >
          Assets
        </Button>
      </div>
    </div>
  );
};

Assets.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired
};

export default Assets;
