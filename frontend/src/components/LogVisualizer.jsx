import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  line2key, line2dataKey,
  formatLogValue,
  getSelectedResults, getSelectedLogKeys,
  createLine
} from '../utils';
import LogVisualizerTooltip from './LogVisualizerTooltip';


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

const buildLineElem = (line, axisName) => {
  const { config = {} } = line;

  return (
    <Line
      type="linear"
      dataKey={line2dataKey(line, axisName)}
      yAxisId={axisName}
      stroke={config.color}
      connectNulls
      isAnimationActive={false}
      dot={false}
      key={line2dataKey(line, axisName)}
    />
  );
};

class LogVisualizer extends React.Component {
  render() {
    const {
      project = {},
      results = {},
      projectConfig = {},
      globalConfig = {},
      stats
    } = this.props;
    const { axes, resultsConfig = {}, lines = {} } = projectConfig;
    const { logKeys = [], xAxisKeys } = stats;
    const {
      xAxis = { axisName: 'xAxis' },
      yLeftAxis = { axisName: 'yLeftAxis' },
      yRightAxis = { axisName: 'yRightAxis' }
    } = axes || {};
    const { xAxisKey = xAxisKeys[0] } = xAxis;
    const selectedResults = getSelectedResults(results, resultsConfig);
    const selectedLogKeys = {
      yLeftAxis: getSelectedLogKeys(yLeftAxis.logKeysConfig),
      yRightAxis: getSelectedLogKeys(yRightAxis.logKeysConfig)
    };

    const lineElems = [];
    const dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
    Object.keys(selectedLogKeys).forEach((axisName) => {
      selectedResults.forEach((resultId) => {
        const result = results[resultId];
        if (result == null) {
          return;
        }
        selectedLogKeys[axisName].forEach((logKey) => {
          const line = lines[line2key({ resultId, logKey })] ||
                createLine(resultId, logKey, results, logKeys);
          if (line.config.isVisible) {
            lineElems.push(buildLineElem(line, axisName));
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
    });

    const data = Object.values(dataDict);
    const { chartSize, isResultNameAlignRight } = globalConfig;

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
              tickFormatter={formatLogValue()}
              allowDataOverflow
            />
            <YAxis
              yAxisId="yRightAxis"
              orientation="right"
              scale={yRightAxis.scale}
              domain={getDomain(yRightAxis)}
              tickFormatter={formatLogValue()}
              allowDataOverflow
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              content={
                <LogVisualizerTooltip
                  project={project}
                  results={results}
                  xAxisKey={xAxisKey}
                  isResultNameAlignRight={isResultNameAlignRight}
                />
              }
            />
            {lineElems}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

LogVisualizer.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  }).isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string),
    xAxisKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  projectConfig: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.shape({
      axisName: PropTypes.string,
      logKeysConfig: PropTypes.objectOf(PropTypes.shape({
        selected: PropTypes.bool
      }))
    })),
    resultsConfig: PropTypes.objectOf(PropTypes.shape({
      hidden: PropTypes.bool
    })),
    lines: PropTypes.objectOf(
      PropTypes.shape({
        resultId: PropTypes.number,
        logKey: PropTypes.string,
        config: PropTypes.shape({
          color: PropTypes.string,
          isVisible: PropTypes.bool
        })
      })
    )
  }).isRequired,
  globalConfig: PropTypes.shape({
    chartSize: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      aspect: PropTypes.number.isRequired
    }),
    isResultNameAlignRight: PropTypes.bool
  }).isRequired
};

LogVisualizer.defaultProps = {
};

export default LogVisualizer;

