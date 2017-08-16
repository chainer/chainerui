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
import * as Cookies from 'js-cookie';
import AxisConfigurator from './AxisConfigurator';


const xAxisKeys = ['iteration', 'epoch', 'elapsed_time'];
const defaultValueRange = { min: 0.0, max: 100.0 };
const defaultAxisConfig = {
  axisKey: '',
  domain: [defaultValueRange.min, defaultValueRange.max],
  scale: 'auto'
};
const sliderSteps = 100.0;

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeAxisKey = this.handleChangeAxisKey.bind(this);
    this.handleChangeScale = this.handleChangeScale.bind(this);
    this.handleChangeXRange = this.handleChangeXRange.bind(this);
    this.handleChangeYRange = this.handleChangeYRange.bind(this);
    this.handleChangeConfig = this.handleChangeConfig.bind(this);

    this.state = {
      xAxis: Cookies.getJSON('chainerUILogVisualizer-xAxis') || defaultAxisConfig,
      yAxis: Cookies.getJSON('chainerUILogVisualizer-yAxis') || defaultAxisConfig
    };
  }

  handleChangeAxisKey(axisName, axisKey) {
    const { valueRanges } = this.props;
    const { scale } = this.state[axisName];
    const valueRange = valueRanges[axisKey] || defaultValueRange;
    this.handleChangeConfig(axisName, axisKey, [valueRange.min, valueRange.max], scale);
  }

  handleChangeScale(axisName, scale) {
    const { axisKey, domain } = this.state[axisName];
    this.handleChangeConfig(axisName, axisKey, domain, scale);
  }

  handleChangeXRange(range) {
    const { axisKey, scale } = this.state.xAxis;
    this.handleChangeConfig('xAxis', axisKey, range, scale);
  }

  handleChangeYRange(range) {
    const { axisKey, scale } = this.state.yAxis;
    this.handleChangeConfig('yAxis', axisKey, range, scale);
  }

  handleChangeConfig(axisName, axisKey, domain, scale) {
    const newState = {};
    newState[axisName] = {
      axisKey,
      domain,
      scale
    };
    this.setState(newState);
    Cookies.set(`chainerUILogVisualizer-${axisName}`, newState[axisName]);
  }

  render() {
    const { experiments, valueRanges, resultIds, logKeys } = this.props;
    const { xAxis, yAxis } = this.state;
    const xAxisKey = xAxis.axisKey;
    const yAxisKey = yAxis.axisKey;
    const xDomain = (xAxis.scale === 'auto') ? xAxis.domain : [];
    const yDomain = (yAxis.scale === 'auto') ? yAxis.domain : [];
    const xValueRange = valueRanges[xAxisKey] || defaultValueRange;
    const yValueRange = valueRanges[yAxisKey] || defaultValueRange;
    const chartWidth = 640;
    const chartHeight = 360;

    const results = {};
    let maxLogLength = 0;
    experiments.forEach((experiment) => {
      experiment.results.forEach((result) => {
        results[result.id] = result;
        results[result.id].experimentName = experiment.name;
        results[result.id].logs = result.logs || [];
        maxLogLength = Math.max(maxLogLength, result.logs.length);
      });
    });

    const dataDict = {};
    resultIds.forEach((resultId) => {
      const result = results[resultId];
      if (result == null) {
        return;
      }
      result.logs.forEach((log) => {
        if (dataDict[log[xAxisKey]] == null) {
          dataDict[log[xAxisKey]] = {};
          dataDict[log[xAxisKey]][xAxisKey] = log[xAxisKey];
        }
        dataDict[log[xAxisKey]][resultId] = log[yAxisKey];
      });
    });
    const data = Object.keys(dataDict).map((key) => (dataDict[key]));

    const lineElems = resultIds.map((resultId) => {
      const result = results[resultId];
      if (result == null) {
        return null;
      }
      const nameSeparator = '.';
      const name = result.experimentName + nameSeparator + result.name;
      const key = `line-${resultId}`;
      return (
        <Line
          type="monotone"
          name={name}
          dataKey={result.id}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          connectNulls
          isAnimationActive={false}
          key={key}
        />
      );
    });

    return (
      <div className="log-visualizer-root row">
        <div className="col-sm-9">
          <table>
            <tbody>
              <tr>
                <td>
                  <Range
                    style={{ height: `${chartHeight}px` }}
                    vertical
                    min={yValueRange.min}
                    max={yValueRange.max}
                    step={(yDomain[1] - yDomain[0]) / sliderSteps}
                    value={yDomain}
                    onChange={this.handleChangeYRange}
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
                      domain={xDomain}
                      scale={xAxis.scale}
                      allowDataOverflow
                    />
                    <YAxis
                      domain={yDomain}
                      scale={yAxis.scale}
                      allowDataOverflow
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    {lineElems}
                  </LineChart>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <Range
                    style={{ width: `${chartWidth}px`, margin: 'auto' }}
                    min={xValueRange.min}
                    max={xValueRange.max}
                    value={xDomain}
                    onChange={this.handleChangeXRange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-3">
          <AxisConfigurator
            axisName="yAxis"
            axisKey={yAxisKey}
            axisKeys={logKeys}
            scale={yAxis.scale}
            onChangeAxisKey={this.handleChangeAxisKey}
            onChangeScale={this.handleChangeScale}
          />
          <AxisConfigurator
            axisName="xAxis"
            axisKey={xAxisKey}
            axisKeys={xAxisKeys}
            scale={xAxis.scale}
            onChangeAxisKey={this.handleChangeAxisKey}
            onChangeScale={this.handleChangeScale}
          />
        </div>
      </div>
    );
  }
}

LogVisualizer.propTypes = {
  experiments: PropTypes.arrayOf(
    PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.any)
    })
  ).isRequired,
  valueRanges: PropTypes.objectOf(
    PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  ).isRequired,
  resultIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  logKeys: PropTypes.arrayOf(PropTypes.string)
};
LogVisualizer.defaultProps = {
  logKeys: []
};

export default LogVisualizer;

