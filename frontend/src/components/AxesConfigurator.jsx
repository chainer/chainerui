import React from 'react';
import PropTypes from 'prop-types';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';
import XAxisKeySelector from './XAxisKeySelector';


const AxesConfigurator = (props) => {
  const {
    results,
    stats,
    config,
    onAxisConfigLineAdd, onAxisConfigLineUpdate, onAxisConfigLineRemove,
    onAxisConfigScaleUpdate,
    onAxisConfigXKeyUpdate,
    onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate
  } = props;
  const {
    xAxis = { axisName: 'xAxis' },
    yLeftAxis = { axisName: 'yLeftAxis' },
    yRightAxis = { axisName: 'yRightAxis' }
  } = config.axes || {};
  const xAxisStats = stats.axes.xAxis;
  const yLeftAxisStats = stats.axes.yLeftAxis;
  const yRightAxisStats = stats.axes.yRightAxis;

  return (
    <div className="axes-configurator">
      <AxisConfigurator
        axisConfig={yLeftAxis}
        axisStats={yLeftAxisStats}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
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
        axisStats={yRightAxisStats}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
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
        axisStats={xAxisStats}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
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
  stats: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) }),
      yLeftAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) }),
      yRightAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) })
    })
  }).isRequired,
  onAxisConfigLineAdd: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigLineRemove: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired
};

AxesConfigurator.defaultProps = {
};

export default AxesConfigurator;

