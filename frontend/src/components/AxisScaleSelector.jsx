import React from 'react';
import PropTypes from 'prop-types';


const scaleOptions = ['linear', 'log'];

const AxisScaleSelector = (props) => {
  const { scale, onChange } = props;
  const handleChangeAxisKey = (e) => {
    onChange(e.target.value);
  };

  const options = scaleOptions.map((scaleKey) => (
    <option value={scaleKey} key={scaleKey}>{scaleKey}</option>
  ));
  return (
    <select id="axis-scale-selector-select" className="form-control" value={scale} onChange={handleChangeAxisKey}>
      {options}
    </select>
  );
};

AxisScaleSelector.propTypes = {
  scale: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

AxisScaleSelector.defaultProps = {
  scale: ''
};

export default AxisScaleSelector;

