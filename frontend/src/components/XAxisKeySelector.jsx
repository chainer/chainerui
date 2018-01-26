import React from 'react';
import PropTypes from 'prop-types';
import { keyOptions } from '../constants';


const XAxisKeySelector = (props) => {
  const { projectId, stats, value, onChange } = props;
  const { logKeys } = stats;
  const handleChangeXAxisKey = (e) => {
    onChange(projectId, e.target.value);
  };

  const options = keyOptions.filter((key) => logKeys.indexOf(key) > -1).map((key) => (
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
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

XAxisKeySelector.defaultProps = {
  value: '',
  onChange: () => {}
};

export default XAxisKeySelector;
