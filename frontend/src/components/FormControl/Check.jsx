import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';

const Check = ({ children, ...props }) => (
  <FormGroup check>
    <Label check className="form-check-label-break-word">
      <Input {...props} /> {children}
    </Label>
  </FormGroup>
);

Check.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

Check.defaultProps = {
  children: '\u00A0'
};

export default Check;
