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
import AxisConfigurator from './AxisConfigurator';


const xAxisKeys = ['iteration', 'epoch', 'elapsed_time'];
const defaultValueRange = { min: 0.0, max: 100.0 };
const sliderSteps = 100.0;

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeAxisKey = this.handleChangeAxisKey.bind(this);
    this.handleChangeXRange = this.handleChangeXRange.bind(this);
    this.handleChangeYRange = this.handleChangeYRange.bind(this);
    this.handleChangeRange = this.handleChangeRange.bind(this);

    this.state = {
      xAxis: {
        axisKey: '',
        domain: [defaultValueRange.min, defaultValueRange.max]
      },
      yAxis: {
        axisKey: '',
        domain: [defaultValueRange.min, defaultValueRange.max]
      }
    };
  }

  handleChangeAxisKey(axisName, axisKey) {
    const { valueRanges } = this.props;
    const valueRange = valueRanges[axisKey] || defaultValueRange;
    const newState = {};
    newState[axisName] = {
      axisKey,
      domain: [valueRange.min, valueRange.max]
    };
    this.setState(newState);
  }

  handleChangeXRange(range) {
    this.handleChangeRange('xAxis', range);
  }

  handleChangeYRange(range) {
    this.handleChangeRange('yAxis', range);
  }

  handleChangeRange(axisName, range) {
    const newState = {};
    newState[axisName] = {
      ...this.state[axisName],
      domain: range
    };
    this.setState(newState);
  }

  render() {
    const { experiments, valueRanges, resultIds, logKeys } = this.props;
    const { xAxis, yAxis } = this.state;
    const xAxisKey = xAxis.axisKey;
    const yAxisKey = yAxis.axisKey;
    const xDomain = xAxis.domain;
    const yDomain = yAxis.domain;
    const xValueRange = valueRanges[xAxisKey] || defaultValueRange;
    const yValueRange = valueRanges[yAxisKey] || defaultValueRange;

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
                    style={{ height: '190px' }}
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
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      type="number"
                      dataKey={xAxisKey}
                      domain={xDomain}
                      allowDataOverflow
                    />
                    <YAxis
                      domain={yDomain}
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
                    style={{ width: '620px', margin: 'auto' }}
                    min={xValueRange.min}
                    max={xValueRange.max}
                    step={(xDomain[1] - xDomain[0]) / sliderSteps}
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
            title="Y axis:"
            axisKey={yAxisKey}
            axisKeys={logKeys}
            onChangeAxisKey={this.handleChangeAxisKey}
          />
          <AxisConfigurator
            axisName="xAxis"
            title="X axis:"
            axisKey={xAxisKey}
            axisKeys={xAxisKeys}
            onChangeAxisKey={this.handleChangeAxisKey}
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

