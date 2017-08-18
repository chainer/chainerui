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
import YAxisConfigurator from './YAxisConfigurator';


// const xAxisKeys = ['iteration', 'epoch', 'elapsed_time'];
// const defaultValueRange = { min: 0.0, max: 100.0 };
// const defaultAxisConfig = {
//   axisKey: '',
//   domain: [defaultValueRange.min, defaultValueRange.max],
//   scale: 'auto'
// };

const sliderSteps = 100.0;
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
  },
  colors: {}
};

const lineKey = (line) => `${line.resultID}_${line.logKey}`;

const buildLineElem = (line, axisName, colors) => (
  <Line
    type="monotone"
    name={lineKey(line)}
    dataKey={lineKey(line)}
    yAxisId={axisName}
    stroke={colors[lineKey]}
    connectNulls
    isAnimationActive={false}
    key={lineKey}
  />
);

const buildLineElems = (axisName, config) => {
  const { colors } = config.colors;
  const axisConfig = config.axes[axisName];
  const { lines } = axisConfig;
  return lines.map((line) => buildLineElem(line, axisName, colors));
};

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    // this.handleChangeAxisKey = this.handleChangeAxisKey.bind(this);
    // this.handleChangeScale = this.handleChangeScale.bind(this);
    // this.handleChangeXRange = this.handleChangeXRange.bind(this);
    // this.handleChangeYRange = this.handleChangeYRange.bind(this);
    // this.handleChangeConfig = this.handleChangeConfig.bind(this);
    this.state = {};
  }

  // handleChangeAxisKey(axisName, axisKey) {
  //   const { valueRanges } = this.props;
  //   const { scale } = this.state[axisName];
  //   const valueRange = valueRanges[axisKey] || defaultValueRange;
  //   this.handleChangeConfig(axisName, axisKey, [valueRange.min, valueRange.max], scale);
  // }
  //
  // handleChangeScale(axisName, scale) {
  //   const { axisKey, domain } = this.state[axisName];
  //   this.handleChangeConfig(axisName, axisKey, domain, scale);
  // }
  //
  // handleChangeXRange(range) {
  //   const { axisKey, scale } = this.state.xAxis;
  //   this.handleChangeConfig('xAxis', axisKey, range, scale);
  // }
  //
  // handleChangeYRange(range) {
  //   const { axisKey, scale } = this.state.yAxis;
  //   this.handleChangeConfig('yAxis', axisKey, range, scale);
  // }
  //
  // handleChangeConfig(axisName, axisKey, domain, scale) {
  //   const newState = {};
  //   newState[axisName] = {
  //     axisKey,
  //     domain,
  //     scale
  //   };
  //   this.setState(newState);
  //   Cookies.set(`chainerUILogVisualizer-${axisName}`, newState[axisName]);
  // }

  render() {
    const { results, stats, config } = this.props;
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


    // const { experiments, valueRanges, resultIds, logKeys, colors } = this.props;
    // const { xAxis, yAxis } = this.state;
    // const xAxisKey = xAxis.axisKey;
    // const yAxisKey = yAxis.axisKey;
    // const xDomain = (xAxis.scale === 'auto') ? xAxis.domain : [];
    // const yDomain = (yAxis.scale === 'auto') ? yAxis.domain : [];
    // const xValueRange = valueRanges[xAxisKey] || defaultValueRange;
    // const yValueRange = valueRanges[yAxisKey] || defaultValueRange;
    const chartWidth = 640;
    const chartHeight = 360;

    const resultsDict = {};
    results.forEach((result) => {
      resultsDict[result.id] = result;
    });

    const lines = leftLines.concat(rightLines);
    console.log(lines);
    const dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
    lines.forEach((line) => {
      const { resultID, logKey } = line;
      const result = resultsDict[resultID];
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


    // const results = {};
    // const id2Color = {};
    // let maxLogLength = 0;
    // let resultRowIndex = 0;
    // experiments.forEach((experiment) => {
    //   resultRowIndex += (experiment.results.length === 0 ? 1 : 0);
    //   experiment.results.forEach((result) => {
    //     results[result.id] = result;
    //     results[result.id].experimentName = experiment.name;
    //     results[result.id].logs = result.logs || [];
    //     id2Color[result.id] = colors[resultRowIndex];
    //     maxLogLength = Math.max(maxLogLength, result.logs.length);
    //     resultRowIndex += 1;
    //   });
    // });
    //
    // const dataDict = {};
    // resultIds.forEach((resultId) => {
    //   const result = results[resultId];
    //   if (result == null) {
    //     return;
    //   }
    //   result.logs.forEach((log) => {
    //     if (dataDict[log[xAxisKey]] == null) {
    //       dataDict[log[xAxisKey]] = {};
    //       dataDict[log[xAxisKey]][xAxisKey] = log[xAxisKey];
    //     }
    //     dataDict[log[xAxisKey]][resultId] = log[yAxisKey];
    //   });
    // });
    const data = Object.keys(dataDict).map((key) => (dataDict[key]));

    const lineElems = buildLineElems('yLeftAxis', config) + buildLineElems('yRightAxis', config);

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
        <div className="col-sm-3">
          <YAxisConfigurator
            axisConfig={yLeftAxis}
          />
          <YAxisConfigurator
            axisConfig={yRightAxis}
          />
        </div>
      </div>
    );
  }
}

LogVisualizer.propTypes = {
  results: PropTypes.arrayOf(PropTypes.any),
  stats: PropTypes.shape({
    axis: PropTypes.shape({
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
    }),
    colors: PropTypes.objectOf(
      PropTypes.string
    )
  })
};
LogVisualizer.defaultProps = {
  results: [],
  stats: {
    axes: {
      xAxis: {},
      yLeftAxis: {},
      yRightAxis: {}
    }
  },
  config: defaultConfig
};

export default LogVisualizer;

