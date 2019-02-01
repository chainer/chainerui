import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, Input } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';


class AxisRangeConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleRangeTypeChange = this.handleRangeTypeChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleRangeTypeChange(e) {
    const {
      projectId, axisName, axisConfig, isMin, onAxisConfigScaleRangeTypeUpdate,
    } = this.props;
    const { scale = 'linear' } = axisConfig;
    onAxisConfigScaleRangeTypeUpdate(projectId, axisName, scale, isMin, e.target.value);
  }

  handleNumberChange(e) {
    const {
      projectId, axisName, axisConfig, isMin, onAxisConfigScaleRangeNumberUpdate,
    } = this.props;
    const { scale = 'linear' } = axisConfig;

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
            <Col sm={{ size: 3 }} className="text-nowrap">
              <Check
                type="radio"
                name="range-auto"
                value="auto"
                checked={rangeType === 'auto'}
                onChange={this.handleRangeTypeChange}
              >
                auto
              </Check>
            </Col>
            <Col sm={{ size: 4 }} className="text-nowrap">
              <Check
                type="radio"
                name="range-data-min-or-max"
                value={isMin ? 'dataMin' : 'dataMax'}
                checked={rangeType === (isMin ? 'dataMin' : 'dataMax')}
                onChange={this.handleRangeTypeChange}
              >
                data {isMin ? 'min' : 'max'}
              </Check>
            </Col>
            <Col sm={{ size: 5 }}>
              <Check
                type="radio"
                name="range-number"
                value="number"
                checked={rangeType === 'number'}
                onChange={this.handleRangeTypeChange}
              >
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
              </Check>
            </Col>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }
}

AxisRangeConfigurator.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  axisName: uiPropTypes.axisName.isRequired,
  axisConfig: uiPropTypes.axisConfig.isRequired,
  isMin: PropTypes.bool.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
};

export default AxisRangeConfigurator;

