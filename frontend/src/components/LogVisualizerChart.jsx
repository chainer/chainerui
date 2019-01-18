import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  line2key, line2dataKey,
  formatLogValue,
  getSelectedResults, getSelectedLogKeys,
  getLogData,
  createLine
} from '../utils';
import LogVisualizerLegend from './LogVisualizerLegend';


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

const LogVisualizerChart = (props) => {
  const {
    isDisplay,
    project,
    results,
    stats,
    projectConfig,
    resultsStatus,
    chartSize,
    isResultNameAlignRight,
    onResultSelect,
    onAxisConfigLogKeySelectToggle
  } = props;
  const { axes, resultsConfig, lines } = projectConfig;
  const { logKeys, xAxisKeys } = stats;
  const {
    xAxis = {},
    yLeftAxis = {},
    yRightAxis = {}
  } = axes;
  const { xAxisKey = xAxisKeys[0] } = xAxis;

  const selectedResults = getSelectedResults(results, resultsConfig);
  const selectedLogKeys = {
    yLeftAxis: getSelectedLogKeys(yLeftAxis.logKeysConfig),
    yRightAxis: getSelectedLogKeys(yRightAxis.logKeysConfig)
  };

  const data = getLogData(results, stats, projectConfig);

  const axisLines = {};
  ['yLeftAxis', 'yRightAxis'].forEach((axisName) => {
    axisLines[axisName] = [];
    selectedResults.forEach((resultId) => {
      const result = results[resultId];
      if (result == null) {
        return;
      }
      selectedLogKeys[axisName].forEach((logKey) => {
        const line = lines[line2key({ resultId, logKey })] ||
                createLine(resultId, logKey, results, logKeys);
        axisLines[axisName].push(line);
      });
    });
  });

  const anySelected = selectedResults.some((resultId) => {
    const resultStatus = resultsStatus[resultId];
    return resultStatus && resultStatus.selected;
  });

  const lineElems = [];
  Object.keys(axisLines).forEach((axisName) => {
    axisLines[axisName].forEach((line) => {
      if (!line.config.isVisible) {
        return;
      }
      const { config = {}, resultId, logKey } = line;
      const resultStatus = resultsStatus[resultId] || {};
      const selected = resultStatus.selected === true || resultStatus.selected === logKey;
      lineElems.push(
        <Line
          type="linear"
          dataKey={line2dataKey(line, axisName)}
          yAxisId={axisName}
          stroke={config.color}
          strokeOpacity={!anySelected || selected ? 1 : 0.1}
          connectNulls
          isAnimationActive={false}
          dot={false}
          key={line2dataKey(line, axisName)}
        />,
        <Line
          type="linear"
          dataKey={line2dataKey(line, axisName)}
          yAxisId={axisName}
          stroke={config.color}
          strokeWidth="10"
          strokeOpacity="0"
          connectNulls
          isAnimationActive={false}
          dot={false}
          activeDot={false}
          key={`${line2dataKey(line, axisName)}-events`}
          onMouseEnter={() => {
            onResultSelect(project.id, resultId, logKey);
          }}
          onMouseLeave={() => {
            onResultSelect(project.id, resultId, false);
          }}
        />
      );
    });
  });

  return (
    <div className="d-flex">
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
          {lineElems}
        </LineChart>
      </ResponsiveContainer>
      <div>
        <LogVisualizerLegend
          isDisplay={isDisplay}
          project={project}
          results={results}
          resultsStatus={resultsStatus}
          lines={axisLines}
          maxHeight={chartSize.height}
          isResultNameAlignRight={isResultNameAlignRight}
          onResultSelect={onResultSelect}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
      </div>
    </div>
  );
};

LogVisualizerChart.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  resultsStatus: uiPropTypes.resultsStatus.isRequired,
  chartSize: uiPropTypes.chartSize.isRequired,
  isResultNameAlignRight: PropTypes.bool.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

export default LogVisualizerChart;
