import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';


const XAxisKeySelector = (props) => {
  const { projectId, stats, value, onChange } = props;
  const { xAxisKeys } = stats;
  const handleChangeXAxisKey = (e) => {
    onChange(projectId, e.target.value);
  };

  const options = xAxisKeys.map((key) => (<option value={key} key={key}>{key}</option>));
  return (
    <select id="x-axis-key-selector-select" className="form-control" value={value} onChange={handleChangeXAxisKey}>
      {options}
    </select>
  );
};

XAxisKeySelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  stats: uiPropTypes.stats.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

XAxisKeySelector.defaultProps = {
  value: ''
};

export default XAxisKeySelector;
