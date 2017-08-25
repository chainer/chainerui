import React from 'react';
import PropTypes from 'prop-types';
import AxisScaleSelector from './AxisScaleSelector';
import AxisRangeConfigurator from './AxisRangeConfigurator';


class AxisConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeScale = this.handleChangeScale.bind(this);
  }

  handleChangeScale(scale) {
    const { axisName } = this.props.axisConfig;
    this.props.onChangeScale(axisName, scale);
  }

  render() {
    const {
      axisConfig,
      axisStats,
      onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate
    } = this.props;
    const { axisName, scale } = axisConfig;

    return (
      <div className="axis-configurator card">
        <div className="card-header">{axisName}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <AxisScaleSelector
                scale={scale}
                onChange={this.handleChangeScale}
              />
            </div>
            <div className="col-md-6">
              <AxisRangeConfigurator
                axisConfig={axisConfig}
                axisStats={axisStats}
                isMin={false}
                onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
                onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
              />
              <AxisRangeConfigurator
                axisConfig={axisConfig}
                axisStats={axisStats}
                isMin
                onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
                onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
              />
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

AxisConfigurator.propTypes = {
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
  children: PropTypes.element,
  onChangeScale: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired
};
AxisConfigurator.defaultProps = {
  children: null
};

export default AxisConfigurator;

