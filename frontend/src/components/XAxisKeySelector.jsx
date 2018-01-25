import React from 'react';
import PropTypes from 'prop-types';


const keyOptions = ['epoch', 'iteration', 'episode', 'step', 'elapsed_time'];

const XAxisKeySelector = (props) => {
  const { projectId, value, onChange } = props;
  const handleChangeXAxisKey = (e) => {
    onChange(projectId, e.target.value);
  };

  const options = keyOptions.map((key) => (
    <option value={key} key={key}>{key}</option>
  ));
  return (
    <select id="x-axis-key-selector-select" className="form-control" value={value} onChange={handleChangeXAxisKey}>
      {options}
    </select>
  );
};

XAxisKeySelector.propTypes = {
  projectId: PropTypes.number.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

XAxisKeySelector.defaultProps = {
  value: '',
  onChange: () => {}
};

export default XAxisKeySelector;
