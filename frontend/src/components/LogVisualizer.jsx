import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getPlotLogData,
  getUrlSafeProjectNameFull,
  downloadObjectAsCode,
  downloadChartAsPng,
} from '../utils';
import { CHART_DOWNLOAD_STATUS } from '../constants';
import LogVisualizerChart from './LogVisualizerChart';


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
      onAxisConfigLineUpdate,
      stats,
    } = this.props;
    const { resultsStatus = {} } = projectStatus;

    const { chartSize, isResultNameAlignRight } = globalConfig;
    const tempHiddenPlot =
      (projectStatus.chartDownloadStatus !== CHART_DOWNLOAD_STATUS.NONE) ? (
        <div className="plot-hidden" ref={this.chartRef}>
          <LogVisualizerChart
            isDisplay={false}
            project={project}
            results={results}
            stats={stats}
            projectConfig={projectConfig}
            resultsStatus={resultsStatus}
            chartSize={chartSize}
            isResultNameAlignRight={isResultNameAlignRight}
            onResultSelect={onResultSelect}
            onAxisConfigLineUpdate={onAxisConfigLineUpdate}
          />
        </div>
      ) : null;

    return (
      <div className="log-visualizer-root">
        {tempHiddenPlot}
        <LogVisualizerChart
          isDisplay
          project={project}
          results={results}
          stats={stats}
          projectConfig={projectConfig}
          resultsStatus={resultsStatus}
          chartSize={chartSize}
          isResultNameAlignRight={isResultNameAlignRight}
          onResultSelect={onResultSelect}
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
        <Button size="sm" className="m-1" onClick={this.handleClickDownloadCode}>
          <i className="mx-1 fas fa-download" />code
        </Button>
        <Button size="sm" className="m-1" onClick={this.handleClickDownloadPNG}>
          <i className="mx-1 fas fa-download" />png
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
  onResultSelect: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
};

export default LogVisualizer;

