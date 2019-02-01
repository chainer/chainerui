import React from 'react';
import PropTypes from 'prop-types';

import Select from './FormControl/Select';


const scaleOptions = ['linear', 'log'];

const AxisScaleSelector = (props) => {
  const { scale, onChange } = props;
  const handleChangeAxisKey = (e) => {
    onChange(e.target.value);
  };
  return (
    <Select
      value={scale}
      onChange={handleChangeAxisKey}
      values={scaleOptions}
    />
  );
};

AxisScaleSelector.propTypes = {
  scale: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

AxisScaleSelector.defaultProps = {
  scale: '',
};

export default AxisScaleSelector;
