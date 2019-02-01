import React from 'react';
import PropTypes from 'prop-types';

const VisibilityCheckbox = ({
  className, checked, indeterminate, onChange,
}) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
  <label className={className}>
    <i
      className={`fas fa-eye${checked || indeterminate ? '' : '-slash'}`}
      style={{ opacity: checked && !indeterminate ? 1 : 0.5 }}
    />
    <input
      type="checkbox"
      style={{ display: 'none' }}
      checked={checked}
      indeterminate={indeterminate.toString()}
      onChange={onChange}
    />
  </label>
);

VisibilityCheckbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
};

VisibilityCheckbox.defaultProps = {
  className: '',
  checked: false,
  indeterminate: false,
  onChange: () => {},
};

export default VisibilityCheckbox;
