import React from 'react';
import PropTypes from 'prop-types';


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
  projectId: PropTypes.number.isRequired,
  stats: PropTypes.shape({
    xAxisKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

XAxisKeySelector.defaultProps = {
  value: '',
  onChange: () => {}
};

export default XAxisKeySelector;
