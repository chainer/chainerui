import React from 'react';
import PropTypes from 'prop-types';
import AxisScaleSelector from './AxisScaleSelector';


const defaultAxisConfig = {
  axisName: '',
  scale: 'auto',
  range: [0, 100],
  lines: []
};

class YAxisConfigurator extends React.Component {
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
      <div className="axis-configurator panel panel-default">
        <div className="panel-heading">{axisName}</div>
        <div className="panel-body">
          <form className="form-horizontal">
            <AxisScaleSelector
              scale={scale}
              onChange={this.handleChangeScale}
            />
          </form>
        </div>
      </div>
    );
  }
}

YAxisConfigurator.propTypes = {
  axisConfig: PropTypes.shape({
    axisName: PropTypes.string.isRequired,
    scale: PropTypes.string,
    range: PropTypes.arrayOf(PropTypes.number),
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        resultID: PropTypes.number,
        logID: PropTypes.number,
        logKey: PropTypes.string
      })
    )
  }),
  onChangeScale: PropTypes.func
};
YAxisConfigurator.defaultProps = {
  axisConfig: defaultAxisConfig,
  onChangeScale: () => {}
};

export default YAxisConfigurator;

