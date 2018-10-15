import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, Label, Input } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';


class AxisRangeConfigurator extends React.Component {
  constructor() {
    super();

    this.handleRangeTypeChange = this.handleRangeTypeChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleRangeTypeChange(e) {
    const { projectId, axisConfig, isMin, onAxisConfigScaleRangeTypeUpdate } = this.props;
    const { axisName, scale = 'linear' } = axisConfig;
    onAxisConfigScaleRangeTypeUpdate(projectId, axisName, scale, isMin, e.target.value);
  }

  handleNumberChange(e) {
    const { projectId, axisConfig, isMin, onAxisConfigScaleRangeNumberUpdate } = this.props;
    const { axisName, scale = 'linear' } = axisConfig;

    let rangeNumber = null;
    if (e.target.value) {
      const num = Number(e.target.value);
      rangeNumber = (isNaN(num) || !isFinite(num)) ? null : num;
    }

    onAxisConfigScaleRangeNumberUpdate(projectId, axisName, scale, isMin, rangeNumber);
  }

  render() {
    const { axisConfig, isMin } = this.props;
    const { scale = 'linear', scaleRange = {} } = axisConfig;
    const rangeConfig = scaleRange[scale] || {};
    const { rangeTypes = [], range = [] } = rangeConfig;
    const rangeType = rangeTypes[isMin ? 0 : 1] || 'auto';
    const rangeNumber = range[isMin ? 0 : 1];
    const isNumberInvalid = (rangeType === 'number' && (rangeNumber == null || rangeNumber === ''));

    return (
      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <FormGroup tag="fieldset">
          <legend><small>{isMin ? 'Min' : 'Max'}</small></legend>
          <FormGroup row>
            <Col sm={{ size: 3 }}>
              <FormGroup check className="text-nowrap">
                <Label check>
                  <Input
                    type="radio"
                    name="range-auto"
                    value="auto"
                    checked={rangeType === 'auto'}
                    onChange={this.handleRangeTypeChange}
                  /> auto
                </Label>
              </FormGroup>
            </Col>
            <Col sm={{ size: 4 }}>
              <FormGroup check className="text-nowrap">
                <Label check>
                  <Input
                    type="radio"
                    name="range-data-min-or-max"
                    value={isMin ? 'dataMin' : 'dataMax'}
                    checked={rangeType === (isMin ? 'dataMin' : 'dataMax')}
                    onChange={this.handleRangeTypeChange}
                  /> data {isMin ? 'min' : 'max'}
                </Label>
              </FormGroup>
            </Col>
            <Col sm={{ size: 5 }}>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="range-number"
                    value="number"
                    checked={rangeType === 'number'}
                    onChange={this.handleRangeTypeChange}
                  />
                  <Input
                    className={isNumberInvalid ? 'is-invalid' : ''}
                    type="number"
                    step="any"
                    name="range-number-value"
                    bsSize="sm"
                    value={(rangeNumber == null || rangeNumber === '') ? '' : rangeNumber}
                    disabled={rangeType !== 'number'}
                    onChange={this.handleNumberChange}
                  />
                </Label>
              </FormGroup>
            </Col>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }
}

AxisRangeConfigurator.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  axisConfig: uiPropTypes.axisConfig.isRequired,
  isMin: PropTypes.bool.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired
};

AxisRangeConfigurator.defaultProps = {
};

export default AxisRangeConfigurator;

