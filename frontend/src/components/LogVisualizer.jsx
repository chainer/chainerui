import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import 'rc-slider/assets/index.css';
import { line2name, line2dataKey } from '../utils';


const getDomain = (axisConfig = {}) => {
  const { scale = 'linear', scaleRange = {} } = axisConfig;
  const { rangeTypes = [], range } = scaleRange[scale] || {};
  const domain = [];
  for (let i = 0; i < 2; i += 1) {
    const rangeType = rangeTypes[i] || 'auto';
    if (rangeType === 'number') {
      domain[i] = (range[i] == null || range[i] === '') ? 'auto' : range[i];
    } else {
      domain[i] = rangeType;
    }
  }
  return domain;
};

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
  const visibleLines = lines.filter((line) => line.config.isVisible);
  return visibleLines.map((line) => buildLineElem(line, axisName, results));
};

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      results = {},
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

    const { chartSize } = this.props.config.global;

    return (
      <div className="log-visualizer-root">
        <ResponsiveContainer
          width={chartSize.width}
          height={chartSize.height}
          aspect={chartSize.aspect}
        >
          <LineChart data={data}>
            <XAxis
              type="number"
              dataKey={xAxisKey}
              scale={xAxis.scale}
              domain={getDomain(xAxis)}
              allowDataOverflow
            />
            <YAxis
              yAxisId="yLeftAxis"
              orientation="left"
              scale={yLeftAxis.scale}
              domain={getDomain(yLeftAxis)}
              allowDataOverflow
            />
            <YAxis
              yAxisId="yRightAxis"
              orientation="right"
              scale={yRightAxis.scale}
              domain={getDomain(yRightAxis)}
              allowDataOverflow
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {lineElems}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

LogVisualizer.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    }),
    global: PropTypes.shape({
      chartSize: PropTypes.shape({
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        aspect: PropTypes.number.isRequired
      })
    })
  }).isRequired
};

LogVisualizer.defaultProps = {
};

export default LogVisualizer;

