import React from 'react';
import PropTypes from 'prop-types';
import AxisScaleSelector from './AxisScaleSelector';


const defaultAxisConfig = {
  axisName: '',
  scale: 'auto',
  range: [0, 100]
};

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
    const { axisName, scale } = this.props.axisConfig;

    return (
      <div className="axis-configurator card">
        <div className="card-header">{axisName}</div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
              <AxisScaleSelector
                scale={scale}
                onChange={this.handleChangeScale}
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
    range: PropTypes.arrayOf(PropTypes.number)
  }),
  children: PropTypes.element,
  onChangeScale: PropTypes.func
};
AxisConfigurator.defaultProps = {
  axisConfig: defaultAxisConfig,
  children: null,
  onChangeScale: () => {}
};

export default AxisConfigurator;

