import React from 'react';
import PropTypes from 'prop-types';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';
import XAxisKeySelector from './XAxisKeySelector';


const defaultRange = [0, 100];
const defaultXAxisConfig = {
  axisName: 'xAxis',
  xAxisKey: 'epoch',
  scale: 'linear',
  range: defaultRange
};
const defaultYAxisConfig = {
  axisName: '',
  scale: 'linear',
  range: defaultRange,
  lines: []
};
const defaultConfig = {
  axes: {
    xAxis: defaultXAxisConfig,
    yLeftAxis: { ...defaultYAxisConfig, axisName: 'yLeftAxis' },
    yRightAxis: { ...defaultYAxisConfig, axisName: 'yRightAxis' }
  }
};


const AxesConfigurator = (props) => {
  const {
    results = {},
    config = defaultConfig,
    onAxisConfigLineAdd, onAxisConfigLineUpdate, onAxisConfigLineRemove,
    onAxisConfigScaleUpdate,
    onAxisConfigXKeyUpdate
  } = props;
  const {
    xAxis = { axisName: 'xAxis' },
    yLeftAxis = { axisName: 'yLeftAxis' },
    yRightAxis = { axisName: 'yRightAxis' }
  } = config.axes;

  return (
    <div className="axes-configurator">
      <AxisConfigurator
        axisConfig={yLeftAxis}
        onChangeScale={onAxisConfigScaleUpdate}
      >
        <LinesConfigurator
          results={results}
          axisName="yLeftAxis"
          lines={yLeftAxis.lines}
          onAxisConfigLineAdd={onAxisConfigLineAdd}
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
          onAxisConfigLineRemove={onAxisConfigLineRemove}
        />
      </AxisConfigurator>
      <AxisConfigurator
        axisConfig={yRightAxis}
        onChangeScale={onAxisConfigScaleUpdate}
      >
        <LinesConfigurator
          results={results}
          axisName="yRightAxis"
          lines={yRightAxis.lines}
          onAxisConfigLineAdd={onAxisConfigLineAdd}
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
          onAxisConfigLineRemove={onAxisConfigLineRemove}
        />
      </AxisConfigurator>
      <AxisConfigurator
        axisConfig={xAxis}
        onChangeScale={onAxisConfigScaleUpdate}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <XAxisKeySelector value={xAxis.xAxisKey} onChange={onAxisConfigXKeyUpdate} />
          </li>
        </ul>
      </AxisConfigurator>
    </div>
  );
};

AxesConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  }).isRequired,
  onAxisConfigLineAdd: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigLineRemove: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired
};

AxesConfigurator.defaultProps = {
};

export default AxesConfigurator;

