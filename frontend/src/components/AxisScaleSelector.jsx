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
    <div className="form-group">
      <label htmlFor="axis-scale-selector-select" className="control-label col-sm-3">scale: </label>
      <div className="col-sm-9">
        <select id="axis-scale-selector-select" className="form-control" value={scale} onChange={handleChangeAxisKey}>
          {options}
        </select>
      </div>
    </div>
  );
};

AxisScaleSelector.propTypes = {
  scale: PropTypes.string,
  onChange: PropTypes.func
};

AxisScaleSelector.defaultProps = {
  scale: '',
  onChange: () => {}
};

export default AxisScaleSelector;

