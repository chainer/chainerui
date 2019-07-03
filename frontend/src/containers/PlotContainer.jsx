import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert, Container, Button } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getProject,
  getResultList, updateResult, clearResultList,
  getDeletedResultList,
  resetProjectConfig,
  updateLineInAxis,
  updateAxisScale, toggleLogKeySelect,
  updateResultSelect,
  updateResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment,
  updateGlobalHighlightTableAndChart,
  updateXAxisKey,
  updateAxisScaleRangeType, updateAxisScaleRangeNumber,
  createCommand,
  updateTableExpanded,
  updateTableColumnsVisibility,
  updateChartDownloadStatus,
  updateTargetResultType,
} from '../actions';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ExperimentsTable from '../components/ExperimentsTable';
import ExperimentsTableConfigurator from '../components/ExperimentsTableConfigurator';
import LogVisualizer from '../components/LogVisualizer';
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';
import { defaultProjectStatus, defaultProjectConfig } from '../constants';
import { startPolling, stopPolling } from '../utils';


class PlotContainer extends React.Component {
  componentDidMount() {
    const { projectId, globalConfig, projectConfig } = this.props;
    const { pollingRate, logsLimit } = globalConfig;
    const { resultType } = projectConfig;

    this.props.clearResultList();
    this.props.getProject(projectId);
    this.resultsPollingTimer = startPolling(this.props.getResultList, pollingRate, projectId, logsLimit, resultType);
    this.handleExperimentsTableColumnsVisibilityUpdate = this.handleExperimentsTableColumnsVisibilityUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { projectId, globalConfig, projectConfig } = this.props;
    const currentPollingRate = globalConfig.pollingRate;
    const currentLogsLimit = globalConfig.logsLimit;
    const nextPollingRate = nextProps.globalConfig.pollingRate;
    const nextLogsLimit = nextProps.globalConfig.logsLimit;
    const nextResultType = nextProps.projectConfig.resultType;
    const currentResultType = projectConfig.resultType;

    if (currentPollingRate !== nextPollingRate || currentLogsLimit !== nextLogsLimit || currentResultType !== nextResultType) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(this.props.getResultList, nextPollingRate, projectId, nextLogsLimit, nextResultType);
    }
  }

  componentWillUnmount() {
    stopPolling(this.resultsPollingTimer);
  }

  handleExperimentsTableColumnsVisibilityUpdate(hiddenLogKeys, hiddenArgKeys) {
    const {
      projectId,
      projectConfig,
    } = this.props;
    const { tableState } = projectConfig;
    const { isGrouped = false } = tableState;

    this.props.updateTableColumnsVisibility(
      projectId,
      hiddenLogKeys,
      hiddenArgKeys,
      isGrouped
    );
  }

  render() {
    const {
      projectId,
      project,
      results,
      projectStatus,
      fetchState,
      projectConfig,
      globalConfig,
      stats,
      deletedResults,
    } = this.props;

    return (
      <div className="chainerui-container">
        <NavigationBar
          pollingKey="resultList"
          fetchState={fetchState}
          globalConfig={globalConfig}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
          onGlobalConfigLogsLimitUpdate={this.props.updateGlobalLogsLimit}
          onGlobalConfigResultNameAlignmentUpdate={this.props.updateGlobalResultNameAlignment}
          onGlobalHighlightTableAndChartUpdate={this.props.updateGlobalHighlightTableAndChart}
        />
        <Container fluid>
          <div className="row">
            <div className="col-md-4 col-lg-3 order-12 order-md-1">
              { projectConfig.resultType === 'DELETED'
                ? (<Alert color="danger">Unregistered result mode</Alert>)
                : null
              }
              <Button onClick={() => this.props.updateTargetResultType(projectId, 'ACTIVE')}>ACTIVE</Button>
              <Button onClick={() => this.props.updateTargetResultType(projectId, 'DELETED')}>DELETED</Button>
              <BreadcrumbLink
                globalConfig={globalConfig}
                project={project}
              />
              <SideBar
                project={project}
                results={results}
                stats={stats}
                projectConfig={projectConfig}
                globalConfig={globalConfig}
                onProjectConfigReset={this.props.resetProjectConfig}
                onAxisConfigLineUpdate={this.props.updateLineInAxis}
                onAxisConfigScaleUpdate={this.props.updateAxisScale}
                onAxisConfigXKeyUpdate={this.props.updateXAxisKey}
                onAxisConfigScaleRangeTypeUpdate={this.props.updateAxisScaleRangeType}
                onAxisConfigScaleRangeNumberUpdate={this.props.updateAxisScaleRangeNumber}
                onAxisConfigLogKeySelectToggle={this.props.toggleLogKeySelect}
              />
            </div>
            <div className="col-md-8 col-lg-9 order-1 order-md-12">
              <LogVisualizer
                project={project}
                results={results}
                projectStatus={projectStatus}
                stats={stats}
                projectConfig={projectConfig}
                globalConfig={globalConfig}
                onChartDownloadStatusUpdate={this.props.updateChartDownloadStatus}
                onResultSelect={this.props.updateResultSelect}
                onAxisConfigLineUpdate={this.props.updateLineInAxis}
              />
              <ExperimentsTable
                project={project}
                results={results}
                resultsStatus={projectStatus.resultsStatus}
                stats={stats}
                projectConfig={projectConfig}
                globalConfig={globalConfig}
                onResultsConfigSelectUpdate={this.props.updateResultsConfigSelect}
                onResultUpdate={this.props.updateResult}
                onResultSelect={this.props.updateResultSelect}
                onCommandSubmit={this.props.createCommand}
                onTableExpandedUpdate={this.props.updateTableExpanded}
                onTableColumnsVisibilityUpdate={this.handleExperimentsTableColumnsVisibilityUpdate}
              />
              <ExperimentsTableConfigurator
                project={project}
                stats={stats}
                projectConfig={projectConfig}
                onTableColumnsVisibilityUpdate={this.props.updateTableColumnsVisibility}
                deletedResults={deletedResults}
                onResultUpdate={this.props.updateResult}
                getDeletedResultList={this.props.getDeletedResultList}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

PlotContainer.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  fetchState: uiPropTypes.fetchState.isRequired,
  projectStatus: uiPropTypes.projectStatus.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  deletedResults: uiPropTypes.results.isRequired,
  stats: uiPropTypes.stats.isRequired,
  getProject: PropTypes.func.isRequired,
  getResultList: PropTypes.func.isRequired,
  getDeletedResultList: PropTypes.func.isRequired,
  updateResult: PropTypes.func.isRequired,
  clearResultList: PropTypes.func.isRequired,
  createCommand: PropTypes.func.isRequired,
  resetProjectConfig: PropTypes.func.isRequired,
  updateLineInAxis: PropTypes.func.isRequired,
  updateAxisScale: PropTypes.func.isRequired,
  toggleLogKeySelect: PropTypes.func.isRequired,
  updateResultSelect: PropTypes.func.isRequired,
  updateResultsConfigSelect: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalLogsLimit: PropTypes.func.isRequired,
  updateGlobalResultNameAlignment: PropTypes.func.isRequired,
  updateGlobalHighlightTableAndChart: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateAxisScaleRangeType: PropTypes.func.isRequired,
  updateAxisScaleRangeNumber: PropTypes.func.isRequired,
  updateTableExpanded: PropTypes.func.isRequired,
  updateTableColumnsVisibility: PropTypes.func.isRequired,
  updateChartDownloadStatus: PropTypes.func.isRequired,
  updateTargetResultType: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.params.projectId);
  const {
    entities,
    fetchState,
    status,
    config,
  } = state;
  const { projects = {}, results = {}, deletedResults = {} } = entities;
  const project = projects[projectId] || { id: projectId };
  const projectStatus = status.projectsStatus[projectId] || defaultProjectStatus;
  const projectConfig = config.projectsConfig[projectId] || defaultProjectConfig;
  const globalConfig = config.global;
  const { stats } = status;
  return {
    projectId,
    project,
    results,
    fetchState,
    projectStatus,
    projectConfig,
    globalConfig,
    stats,
    deletedResults,
  };
};

export default connect(mapStateToProps, {
  getProject,
  getResultList,
  getDeletedResultList,
  updateResult,
  clearResultList,
  createCommand,
  resetProjectConfig,
  updateLineInAxis,
  updateAxisScale,
  toggleLogKeySelect,
  updateResultSelect,
  updateResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment,
  updateGlobalHighlightTableAndChart,
  updateXAxisKey,
  updateAxisScaleRangeType,
  updateAxisScaleRangeNumber,
  updateTableExpanded,
  updateTableColumnsVisibility,
  updateChartDownloadStatus,
  updateTargetResultType,
})(PlotContainer);
