import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getProject,
  getResultList, updateResult, clearResultList,
  resetProjectConfig,
  updateLineInAxis,
  updateAxisScale, toggleLogKeySelect,
  smoothingLogKeySelect, updateSmoothingWeight,
  updateResultSelect,
  updateResultsConfigSelect,
  updateXAxisKey,
  updateAxisScaleRangeType, updateAxisScaleRangeNumber,
  createCommand,
  updateTableExpanded,
  updateTableColumnsVisibility,
  updateChartDownloadStatus,
} from '../actions';
import NavigationBar from './NavigationBar';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ExperimentsTable from '../components/ExperimentsTable';
import ExperimentsTableConfigurator from '../components/ExperimentsTableConfigurator';
import LogVisualizer from '../components/LogVisualizer';
import SideBar from '../components/SideBar';
import { defaultProjectStatus, defaultProjectConfig } from '../constants';
import { startPolling, stopPolling } from '../utils';


class PlotContainer extends React.Component {
  componentDidMount() {
    const { projectId, globalConfig } = this.props;
    const { pollingRate, logsLimit } = globalConfig;

    this.props.clearResultList();
    this.props.getProject(projectId);
    this.resultsPollingTimer = startPolling(this.props.getResultList, pollingRate, projectId, logsLimit);
    this.handleExperimentsTableColumnsVisibilityUpdate = this.handleExperimentsTableColumnsVisibilityUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { projectId, globalConfig } = this.props;
    const currentPollingRate = globalConfig.pollingRate;
    const currentLogsLimit = globalConfig.logsLimit;
    const nextPollingRate = nextProps.globalConfig.pollingRate;
    const nextLogsLimit = nextProps.globalConfig.logsLimit;

    if (currentPollingRate !== nextPollingRate || currentLogsLimit !== nextLogsLimit) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(this.props.getResultList, nextPollingRate, projectId, nextLogsLimit);
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
      project,
      results,
      projectStatus,
      projectConfig,
      globalConfig,
      stats,
    } = this.props;

    return (
      <div className="chainerui-container">
        <NavigationBar pollingKey="resultList" />
        <Container fluid>
          <div className="row">
            <div className="col-md-4 col-lg-3 order-12 order-md-1">
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
                onAxisConfigLogKeySelectSmoothing={this.props.smoothingLogKeySelect}
                onSelectSmoothingWeight={this.props.updateSmoothingWeight}
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
  projectStatus: uiPropTypes.projectStatus.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  stats: uiPropTypes.stats.isRequired,
  getProject: PropTypes.func.isRequired,
  getResultList: PropTypes.func.isRequired,
  updateResult: PropTypes.func.isRequired,
  clearResultList: PropTypes.func.isRequired,
  createCommand: PropTypes.func.isRequired,
  resetProjectConfig: PropTypes.func.isRequired,
  updateLineInAxis: PropTypes.func.isRequired,
  updateAxisScale: PropTypes.func.isRequired,
  toggleLogKeySelect: PropTypes.func.isRequired,
  smoothingLogKeySelect: PropTypes.func.isRequired,
  updateSmoothingWeight: PropTypes.func.isRequired,
  updateResultSelect: PropTypes.func.isRequired,
  updateResultsConfigSelect: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateAxisScaleRangeType: PropTypes.func.isRequired,
  updateAxisScaleRangeNumber: PropTypes.func.isRequired,
  updateTableExpanded: PropTypes.func.isRequired,
  updateTableColumnsVisibility: PropTypes.func.isRequired,
  updateChartDownloadStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.params.projectId);
  const {
    entities,
    status,
    config,
  } = state;
  const { projects = {}, results = {} } = entities;
  const project = projects[projectId] || { id: projectId };
  const projectStatus = status.projectsStatus[projectId] || defaultProjectStatus;
  const projectConfig = config.projectsConfig[projectId] || defaultProjectConfig;
  const globalConfig = config.global;
  const { stats } = status;
  return {
    projectId,
    project,
    results,
    projectStatus,
    projectConfig,
    globalConfig,
    stats,
  };
};

export default connect(mapStateToProps, {
  getProject,
  getResultList,
  updateResult,
  clearResultList,
  createCommand,
  resetProjectConfig,
  updateLineInAxis,
  updateAxisScale,
  toggleLogKeySelect,
  smoothingLogKeySelect,
  updateSmoothingWeight,
  updateResultSelect,
  updateResultsConfigSelect,
  updateXAxisKey,
  updateAxisScaleRangeType,
  updateAxisScaleRangeNumber,
  updateTableExpanded,
  updateTableColumnsVisibility,
  updateChartDownloadStatus,
})(PlotContainer);
