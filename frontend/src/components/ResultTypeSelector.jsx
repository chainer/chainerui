import React from 'react';
import PropTypes from 'prop-types';
import Select from './FormControl/Select';

import * as uiPropTypes from '../store/uiPropTypes';
import { fetchResultTypes } from '../constants/index';

const ResultTypeSelector = (props) => {
  const { value, onChange } = props;

  const handleChangeFetchResultType = (e) => {
    const { projectId } = props;
    onChange(projectId, e.target.value);
  };

  return (
    <div className="mb-3">
      <Select
        id="result-type"
        options={fetchResultTypes}
        onChange={handleChangeFetchResultType}
        value={value}
      />
    </div>
  );
};

ResultTypeSelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResultTypeSelector;
