import React from 'react';
import PropTypes from 'prop-types';
import Select from './FormControl/Select';

import * as uiPropTypes from '../store/uiPropTypes';

const ResultTypeSelector = (props) => {
  const { options, value, onChange } = props;

  const handleChangeFetchResultType = (e) => {
    const { projectId } = props;
    onChange(projectId, e.target.value);
  };

  return (
    <div className="mb-3">
      <Select
        id="result-type"
        options={options}
        onChange={handleChangeFetchResultType}
        value={value}
      />
    </div>
  );
};

ResultTypeSelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ResultTypeSelector;
