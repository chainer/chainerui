import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  line2key, line2dataKey,
  formatLogValue,
  getSelectedResults, getSelectedLogKeys,
  getLogData,
  getPlotLogData,
  createLine,
  getUrlSafeProjectNameFull,
  downloadObjectAsCode,
  downloadChartAsPng
} from '../utils';
import { CHART_DOWNLOAD_STATUS } from '../constants';
import LogVisualizerLegend from './LogVisualizerLegend';
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

class LogVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.chart = null;

    this.chartRef = this.chartRef.bind(this);
    this.handleClickDownloadCode = this.handleClickDownloadCode.bind(this);
    this.handleClickDownloadPNG = this.handleClickDownloadPNG.bind(this);
  }

  componentDidUpdate() {
    const { project, projectStatus, onChartDownloadStatusUpdate } = this.props;
    if (projectStatus.chartDownloadStatus === CHART_DOWNLOAD_STATUS.REQUESTED) {
      onChartDownloadStatusUpdate(project.id, CHART_DOWNLOAD_STATUS.CONVERTING);
      const exportName = getUrlSafeProjectNameFull(project);
      // eslint-disable-next-line react/no-find-dom-node
      downloadChartAsPng(ReactDOM.findDOMNode(this.chart), exportName).then(() => {
        onChartDownloadStatusUpdate(project.id, CHART_DOWNLOAD_STATUS.NONE);
      });
    }
  }

  chartRef(element) {
    this.chart = element;
  }

  handleClickDownloadCode() {
    const { project, results, stats, projectConfig } = this.props;
    const data = getPlotLogData(results, stats, projectConfig);
    const exportName = getUrlSafeProjectNameFull(project);
    downloadObjectAsCode(data, exportName);
  }

  handleClickDownloadPNG() {
    const { project, projectStatus, onChartDownloadStatusUpdate } = this.props;
    if (projectStatus.chartDownloadStatus === CHART_DOWNLOAD_STATUS.NONE) {
      onChartDownloadStatusUpdate(project.id, CHART_DOWNLOAD_STATUS.REQUESTED);
    }
  }

  render() {
    const {
      project,
      results,
      projectStatus,
      projectConfig,
      globalConfig,
      onResultSelect,
      stats
    } = this.props;
    const { resultsStatus = {} } = projectStatus;
    const { axes, resultsConfig, lines } = projectConfig;
    const { logKeys, xAxisKeys } = stats;
    const {
      xAxis = { axisName: 'xAxis' },
      yLeftAxis = { axisName: 'yLeftAxis' },
      yRightAxis = { axisName: 'yRightAxis' }
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
          if (line.config.isVisible) {
            axisLines[axisName].push(line);
          }
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

    const { chartSize, isResultNameAlignRight } = globalConfig;
    // TODO: split these components into a separated component
    const tempHiddenPlot =
      (projectStatus.chartDownloadStatus !== CHART_DOWNLOAD_STATUS.NONE) ? (
        <div className="d-flex plot-hidden" ref={this.chartRef}>
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
              project={project}
              results={results}
              resultsStatus={resultsStatus}
              lines={axisLines}
              maxHeight={chartSize.height}
              isResultNameAlignRight={isResultNameAlignRight}
              onResultSelect={onResultSelect}
            />
          </div>
        </div>
      ) : null;

    return (
      <div className="log-visualizer-root">
        {tempHiddenPlot}
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
              <Tooltip
                content={<LogVisualizerTooltip xAxisKey={xAxisKey} anySelected={anySelected} />}
              />
            </LineChart>
          </ResponsiveContainer>
          <div>
            <LogVisualizerLegend
              project={project}
              results={results}
              resultsStatus={resultsStatus}
              lines={axisLines}
              maxHeight={chartSize.height}
              isResultNameAlignRight={isResultNameAlignRight}
              onResultSelect={onResultSelect}
            />
          </div>
        </div>
        <Button size="sm" className="m-1" onClick={this.handleClickDownloadCode}>
          <span className="mx-1 oi oi-data-transfer-download" />code
        </Button>
        <Button size="sm" className="m-1" onClick={this.handleClickDownloadPNG}>
          <span className="mx-1 oi oi-data-transfer-download" />png
        </Button>
      </div>
    );
  }
}

LogVisualizer.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  projectStatus: uiPropTypes.projectStatus.isRequired,
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  onChartDownloadStatusUpdate: PropTypes.func.isRequired,
  onResultSelect: PropTypes.func.isRequired
};

export default LogVisualizer;

