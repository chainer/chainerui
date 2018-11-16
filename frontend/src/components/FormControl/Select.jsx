import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

const Select = ({ options, values, ...props }) => (
  <Input type="select" {...props}>
    {options.map((option) => <option key={option.id} value={'value' in option ? option.value : option.id}>{option.name}</option>)}
    {values.map((value) => <option key={value} value={value}>{value}</option>)}
  </Input>
);

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  })),
  values: PropTypes.arrayOf(PropTypes.string)
};

Select.defaultProps = {
  options: [],
  values: []
};

export default Select;
