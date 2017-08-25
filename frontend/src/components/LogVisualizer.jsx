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
import { line2name, line2dataKey } from '../utils';


const sliderSteps = 100.0;
const defaultRange = [0, 100];

const buildLineElem = (line, axisName, results) => {
  const { config = {} } = line;
  const result = results[line.resultId] || {};

  return (
    <Line
      type="linear"
      name={line2name(line, result)}
      dataKey={line2dataKey(line, axisName)}
      yAxisId={axisName}
      stroke={config.color}
      connectNulls
      isAnimationActive={false}
      key={line2dataKey(line, axisName)}
    />
  );
};

const buildLineElems = (axisName, results, config) => {
  const axisConfig = config.axes[axisName] || {};
  const { lines = [] } = axisConfig;
  return lines.map((line) => buildLineElem(line, axisName, results));
};

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      results = {},
      stats = {},
      config = {}
    } = this.props;
    const {
      xAxis = { axisName: 'xAxis' },
      yLeftAxis = { axisName: 'yLeftAxis' },
      yRightAxis = { axisName: 'yRightAxis' }
    } = config.axes || {};
    const { xAxisKey = 'epoch' } = xAxis;
    const leftLines = yLeftAxis.lines || [];
    const rightLines = yRightAxis.lines || [];
    const axisLines = {
      yLeftAxis: leftLines,
      yRightAxis: rightLines
    };
    const xRange = xAxis.range || defaultRange;
    const yLeftRange = yLeftAxis.range || defaultRange;
    const yRightRange = yRightAxis.range || defaultRange;
    const xValueRange = stats.axes.xAxis.valueRange || defaultRange;
    const yLeftValueRange = stats.axes.yLeftAxis.valueRange || defaultRange;
    const yRightValueRange = stats.axes.yRightAxis.valueRange || defaultRange;

    const chartWidth = 640;
    const chartHeight = 360;

    const dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
    Object.keys(axisLines).forEach((axisName) => {
      const lines = axisLines[axisName];
      lines.forEach((line) => {
        const { resultId, logKey } = line;
        const result = results[resultId];
        if (result == null) {
          return;
        }
        const logs = result.logs || [];
        logs.forEach((log) => {
          const logDict = {};
          log.logItems.forEach((logItem) => {
            logDict[logItem.key] = logItem.value;
          });
          if (logDict[xAxisKey] == null || logDict[logKey] == null) {
            return;
          }
          if (dataDict[logDict[xAxisKey]] == null) {
            dataDict[logDict[xAxisKey]] = { [xAxisKey]: logDict[xAxisKey] };
          }
          dataDict[logDict[xAxisKey]][line2dataKey(line, axisName)] = logDict[logKey];
        });
      });
    });
    const data = Object.keys(dataDict).map((key) => (dataDict[key]));

    const lineElems = [
      ...buildLineElems('yLeftAxis', results, config),
      ...buildLineElems('yRightAxis', results, config)
    ];

    return (
      <div className="log-visualizer-root">
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
                    scale={xAxis.scale}
                    domain={['auto', 'auto']}
                    allowDataOverflow
                  />
                  <YAxis
                    yAxisId="yLeftAxis"
                    orientation="left"
                    scale={yLeftAxis.scale}
                    domain={yLeftAxis.scale === 'log' ? [0.01, 'auto'] : ['auto', 'auto']}
                    allowDataOverflow
                  />
                  <YAxis
                    yAxisId="yRightAxis"
                    orientation="right"
                    scale={yRightAxis.scale}
                    domain={yRightAxis.scale === 'log' ? [0.01, 'auto'] : ['auto', 'auto']}
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
    );
  }
}

LogVisualizer.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) }),
      yLeftAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) }),
      yRightAxis: PropTypes.shape({ valueRange: PropTypes.arrayOf(PropTypes.number) })
    })
  }).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  }).isRequired
};

LogVisualizer.defaultProps = {
};

export default LogVisualizer;

