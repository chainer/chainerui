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
  );
};

ResultTypeSelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResultTypeSelector;
