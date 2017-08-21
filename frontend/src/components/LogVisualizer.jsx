import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Utils from '../utils';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';


const sliderSteps = 100.0;
const defaultStats = {
  axes: {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  }
};

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

const buildLineElem = (line, axisName) => {
  const { config = {} } = line;
  const { line2key } = Utils;

  return (
    <Line
      type="monotone"
      name={line2key(line)}
      dataKey={line2key(line)}
      yAxisId={axisName}
      stroke={config.color}
      connectNulls
      isAnimationActive={false}
      key={line2key}
    />
  );
};

const buildLineElems = (axisName, config) => {
  const axisConfig = config.axes[axisName];
  const { lines = [] } = axisConfig;
  return lines.map((line) => buildLineElem(line, axisName));
};

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { entities } = this.props;
    const { results = {} } = entities;
    const stats = this.props.stats || defaultStats;
    const config = this.props.config || defaultConfig;
    const { xAxis, yLeftAxis, yRightAxis } = config.axes;
    const { xAxisKey } = xAxis;
    const leftLines = yLeftAxis.lines || [];
    const rightLines = yRightAxis.lines || [];
    const xRange = xAxis.range || defaultRange;
    const yLeftRange = yLeftAxis.range || defaultRange;
    const yRightRange = yRightAxis.range || defaultRange;
    const xValueRange = stats.axes.xAxis.valueRange || defaultRange;
    const yLeftValueRange = stats.axes.yLeftAxis.valueRange || defaultRange;
    const yRightValueRange = stats.axes.yRightAxis.valueRange || defaultRange;

    const chartWidth = 640;
    const chartHeight = 360;

    const lines = leftLines.concat(rightLines);
    const dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
    lines.forEach((line) => {
      const { resultId, logKey } = line;
      const result = results[resultId];
      if (result == null) {
        return;
      }
      const logs = result.logs || [];
      logs.forEach((log) => {
        if (log[xAxisKey] == null || log[logKey] == null) {
          return;
        }
        if (dataDict[log[xAxisKey]] == null) {
          dataDict[log[xAxisKey]] = {};
          dataDict[log[xAxisKey]][xAxisKey] = log[xAxisKey];
        }
        dataDict[log[xAxisKey]][logKey] = log[logKey];
      });
    });
    const data = Object.keys(dataDict).map((key) => (dataDict[key]));

    const lineElems = buildLineElems('yLeftAxis', config) + buildLineElems('yRightAxis', config);

    return (
      <div className="log-visualizer-root row">
        <div className="col-sm-8">
          <table>
            <tbody>
              <tr>
                <td>
                  <Range
                    style={{ height: `${chartHeight}px` }}
                    vertical
                    min={yLeftValueRange[0]}
                    max={yLeftValueRange[1]}
                    step={(yLeftRange[1] - yLeftRange[0]) / sliderSteps}
                    value={yLeftRange}
                  />
                </td>
                <td>
                  <LineChart
                    width={chartWidth}
                    height={chartHeight}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      dataKey={xAxisKey}
                      domain={xRange}
                      scale={xAxis.scale}
                      allowDataOverflow
                    />
                    <YAxis
                      yAxisId="yLeftAxis"
                      orientation="left"
                      domain={yLeftRange}
                      scale={yLeftAxis.scale}
                      allowDataOverflow
                    />
                    <YAxis
                      yAxisId="yRightAxis"
                      orientation="right"
                      domain={yRightRange}
                      scale={yRightAxis.scale}
                      allowDataOverflow
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {lineElems}
                  </LineChart>
                </td>
                <td>
                  <Range
                    style={{ height: `${chartHeight}px` }}
                    vertical
                    min={yRightValueRange[0]}
                    max={yRightValueRange[1]}
                    step={(yRightRange[1] - yRightRange[0]) / sliderSteps}
                    value={yRightRange}
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Range
                    style={{ width: `${chartWidth}px`, margin: 'auto' }}
                    min={xValueRange.min}
                    max={xValueRange.max}
                    value={xRange}
                    onChange={this.handleChangeXRange}
                  />
                </td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-4">
          <AxisConfigurator axisConfig={yLeftAxis}>
            <LinesConfigurator
              entities={entities}
              lines={yLeftAxis.lines}
            />
          </AxisConfigurator>
          <AxisConfigurator axisConfig={yRightAxis}>
            <LinesConfigurator
              entities={entities}
              lines={yRightAxis.lines}
            />
          </AxisConfigurator>
          <AxisConfigurator axisConfig={xAxis} />
        </div>
      </div>
    );
  }
}

LogVisualizer.propTypes = {
  entities: PropTypes.shape({
    results: PropTypes.objectOf(PropTypes.any)
  }),
  stats: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) }),
      yLeftAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) }),
      yRightAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) })
    })
  }),
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  })
};
LogVisualizer.defaultProps = {
  entities: {
    results: {}
  },
  stats: defaultStats,
  config: defaultConfig
};

export default LogVisualizer;

