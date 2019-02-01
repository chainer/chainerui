import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import Select from './FormControl/Select';


const XAxisKeySelector = (props) => {
  const { projectId, stats, value, onChange } = props;
  const { xAxisKeys } = stats;
  const handleChangeXAxisKey = (e) => {
    onChange(projectId, e.target.value);
  };
  return (
    <Select
      value={value}
      onChange={handleChangeXAxisKey}
      values={xAxisKeys}
    />
  );
};

XAxisKeySelector.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  stats: uiPropTypes.stats.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

XAxisKeySelector.defaultProps = {
  value: '',
};

export default XAxisKeySelector;
