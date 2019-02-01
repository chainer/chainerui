import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const Check = ({ inline, children, ...props }) => (
  <FormGroup check inline={inline}>
    <Label check className="form-check-label-break-word">
      <Input {...props} />
      {' '}
      {children}
    </Label>
  </FormGroup>
);

Check.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Check.defaultProps = {
  inline: false,
  children: '\u00A0',
};

export default Check;
