import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';
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
  createLine,
  getUrlSafeProjectNameFull,
  downloadObjectAsJson,
  downloadChartAsPng
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
  constructor(props) {
    super(props);

    this.chart = null;

    this.chartRef = this.chartRef.bind(this);
    this.handleClickDownloadJSON = this.handleClickDownloadJSON.bind(this);
    this.handleClickDownloadPNG = this.handleClickDownloadPNG.bind(this);
  }

  chartRef(element) {
    this.chart = element;
  }

  handleClickDownloadJSON() {
    const { project, results, stats, projectConfig } = this.props;
    const data = getLogData(results, stats, projectConfig);
    const exportName = getUrlSafeProjectNameFull(project);
    downloadObjectAsJson(data, exportName);
  }

  handleClickDownloadPNG() {
    const { project } = this.props;
    const exportName = getUrlSafeProjectNameFull(project);
    // eslint-disable-next-line react/no-find-dom-node
    downloadChartAsPng(ReactDOM.findDOMNode(this.chart), exportName);
  }

  render() {
    const {
      project,
      results,
      projectConfig,
      globalConfig,
      stats
    } = this.props;
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
    const lineElems = {};
    Object.keys(axisLines).forEach((axisName) => {
      lineElems[axisName] = axisLines[axisName].map((line) => buildLineElem(line, axisName));
    });

    const { chartSize, isResultNameAlignRight } = globalConfig;

    return (
      <div className="log-visualizer-root">
        <div className="d-flex">
          <ResponsiveContainer
            width={chartSize.width}
            height={chartSize.height}
            aspect={chartSize.aspect}
          >
            <LineChart data={data} ref={this.chartRef}>
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
              {lineElems.yLeftAxis}
              {lineElems.yRightAxis}
            </LineChart>
          </ResponsiveContainer>
          <div>
            <LogVisualizerLegend
              project={project}
              results={results}
              lines={axisLines}
              maxHeight={chartSize.height}
              isResultNameAlignRight={isResultNameAlignRight}
            />
          </div>
        </div>
        <Button size="sm" className="m-1" onClick={this.handleClickDownloadJSON}>
          <span className="mx-1 oi oi-data-transfer-download" />json
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
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired
};

export default LogVisualizer;

