import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input } from 'reactstrap';


class AxisRangeConfigurator extends React.Component {
  constructor() {
    super();

    this.handleRangeTypeChange = this.handleRangeTypeChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  handleRangeTypeChange(e) {
    const { axisConfig, isMin, onAxisConfigScaleRangeTypeUpdate } = this.props;
    const { axisName, scale = 'linear' } = axisConfig;
    onAxisConfigScaleRangeTypeUpdate(axisName, scale, isMin, e.target.value);
  }

  handleNumberChange(e) {
    const { axisConfig, isMin, onAxisConfigScaleRangeNumberUpdate } = this.props;
    const { axisName, scale = 'linear' } = axisConfig;

    let rangeNumber = null;
    if (e.target.value) {
      const num = Number(e.target.value);
      rangeNumber = (isNaN(num) || !isFinite(num)) ? null : num;
    }

    onAxisConfigScaleRangeNumberUpdate(axisName, scale, isMin, rangeNumber);
  }

  render() {
    const { axisConfig, isMin } = this.props;
    const { scale = 'linear', scaleRange = {} } = axisConfig;
    const rangeConfig = scaleRange[scale] || {};
    const { rangeTypes = [], range = [] } = rangeConfig;
    const rangeType = rangeTypes[isMin ? 0 : 1] || 'auto';
    const rangeNumber = range[isMin ? 0 : 1];

    return (
      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <FormGroup tag="fieldset">
          <legend><small>{isMin ? 'Min' : 'Max'}</small></legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="range-auto"
                value="auto"
                size="sm"
                checked={rangeType === 'auto'}
                onChange={this.handleRangeTypeChange}
              /> auto
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="range-data-min-or-max"
                value={isMin ? 'dataMin' : 'dataMax'}
                size="sm"
                checked={rangeType === (isMin ? 'dataMin' : 'dataMax')}
                onChange={this.handleRangeTypeChange}
              /> data {isMin ? 'min' : 'max'}
            </Label>
          </FormGroup>
          <FormGroup check disabled>
            <Label check>
              <Input
                type="radio"
                name="range-number"
                value="number"
                size="sm"
                checked={rangeType === 'number'}
                onChange={this.handleRangeTypeChange}
              />
              <Input
                type="number"
                step="any"
                name="range-number-value"
                size="sm"
                value={(rangeNumber == null) ? '' : rangeNumber}
                disabled={rangeType !== 'number'}
                onChange={this.handleNumberChange}
              />
            </Label>
          </FormGroup>
        </FormGroup>
      </Form>
    );
  }
}

AxisRangeConfigurator.propTypes = {
  axisConfig: PropTypes.shape({
    axisName: PropTypes.string.isRequired,
    scale: PropTypes.string,
    scaleRange: PropTypes.objectOf(
      PropTypes.shape({
        rangeTypes: PropTypes.arrayOf(PropTypes.string),
        range: PropTypes.arrayOf(PropTypes.number)
      })
    )
  }).isRequired,
  axisStats: PropTypes.shape({
    valueRange: PropTypes.arrayOf(PropTypes.number)
  }).isRequired,
  isMin: PropTypes.bool.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired
};

AxisRangeConfigurator.defaultProps = {
};

export default AxisRangeConfigurator;

