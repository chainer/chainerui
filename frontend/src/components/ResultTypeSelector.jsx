import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import { fetchResultTypes } from '../constants/index';

const ResultTypeSelector = (props) => {
  const { value, onChange } = props;

  const handleChangeFetchResultType = (typeId) => {
    const { projectId } = props;
    onChange(projectId, typeId);
  };

  return (
    <div className="mt-1 mb-2">
      <ButtonGroup>
        <Button
          onClick={() => handleChangeFetchResultType(fetchResultTypes[0].id)}
          active={value === fetchResultTypes[0].id}
        >
          {fetchResultTypes[0].name}
        </Button>
        <Button
          onClick={() => handleChangeFetchResultType(fetchResultTypes[1].id)}
          active={value === fetchResultTypes[1].id}
        >
          {fetchResultTypes[1].name}
        </Button>
      </ButtonGroup>
    </div>
  );
};

ResultTypeSelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResultTypeSelector;
