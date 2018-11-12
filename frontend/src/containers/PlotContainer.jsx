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
  updateResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment,
  updateXAxisKey,
  updateAxisScaleRangeType, updateAxisScaleRangeNumber,
  createCommand,
  updateTableExpanded,
  updateTableColumnsVisibility
} from '../actions';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ExperimentsTable from '../components/ExperimentsTable';
import ExperimentsTableConfigurator from '../components/ExperimentsTableConfigurator';
import LogVisualizer from '../components/LogVisualizer';
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';
import { defaultProjectConfig, keyOptions } from '../constants';
import { startPolling, stopPolling } from '../utils';


class PlotContainer extends React.Component {
  componentDidMount() {
    const { projectId, globalConfig } = this.props;
    const { pollingRate, logsLimit } = globalConfig;

    this.props.clearResultList();
    this.props.getProject(projectId);
    this.resultsPollingTimer = startPolling(
      this.props.getResultList, pollingRate, projectId, logsLimit
    );
  }

  componentWillReceiveProps(nextProps) {
    const { projectId, globalConfig } = this.props;
    const currentPollingRate = globalConfig.pollingRate;
    const currentLogsLimit = globalConfig.logsLimit;
    const nextPollingRate = nextProps.globalConfig.pollingRate;
    const nextLogsLimit = nextProps.globalConfig.logsLimit;

    if (currentPollingRate !== nextPollingRate || currentLogsLimit !== nextLogsLimit) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(
        this.props.getResultList, nextPollingRate, projectId, nextLogsLimit
      );
    }
  }

  componentWillUnmount() {
    stopPolling(this.resultsPollingTimer);
  }

  render() {
    const {
      project,
      results,
      fetchState,
      projectConfig,
      globalConfig,
      stats
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
        />
        <Container fluid>
          <div className="row">
            <div className="col-md-4 col-lg-3 order-12 order-md-1">
              <BreadcrumbLink
                length={2}
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
                stats={stats}
                projectConfig={projectConfig}
                globalConfig={globalConfig}
              />
              <ExperimentsTable
                project={project}
                results={results}
                stats={stats}
                projectConfig={projectConfig}
                globalConfig={globalConfig}
                onResultsConfigSelectUpdate={this.props.updateResultsConfigSelect}
                onResultUpdate={this.props.updateResult}
                onCommandSubmit={this.props.createCommand}
                onTableExpandedUpdate={this.props.updateTableExpanded}
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

const mapEntitiesToStats = (entities) => {
  const { results = {} } = entities;
  const argKeySet = {};
  const logKeySet = {};
  Object.keys(results).forEach((resultId) => {
    const result = results[resultId];
    result.args.forEach((arg) => { argKeySet[arg.key] = true; });
    result.logs.forEach((log) => {
      log.logItems.forEach((logItem) => {
        logKeySet[logItem.key] = true;
      });
    });
  });
  const argKeys = Object.keys(argKeySet);
  const logKeys = Object.keys(logKeySet).sort();
  const xAxisKeys = keyOptions.filter((key) => key in logKeySet);

  return { argKeys, logKeys, xAxisKeys };
};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.params.projectId);
  const {
    entities,
    fetchState,
    config
  } = state;
  const { projects = {}, results = {} } = entities;
  const project = projects[projectId] || { id: projectId };
  const projectConfig = config.projectsConfig[projectId] || defaultProjectConfig;
  const globalConfig = config.global;
  const stats = mapEntitiesToStats(entities);

  return {
    projectId,
    project,
    results,
    fetchState,
    projectConfig,
    globalConfig,
    stats
  };
};

PlotContainer.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  fetchState: uiPropTypes.fetchState.isRequired,
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
  updateResultsConfigSelect: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalLogsLimit: PropTypes.func.isRequired,
  updateGlobalResultNameAlignment: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateAxisScaleRangeType: PropTypes.func.isRequired,
  updateAxisScaleRangeNumber: PropTypes.func.isRequired,
  updateTableExpanded: PropTypes.func.isRequired,
  updateTableColumnsVisibility: PropTypes.func.isRequired
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
  updateResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment,
  updateXAxisKey,
  updateAxisScaleRangeType,
  updateAxisScaleRangeNumber,
  updateTableExpanded,
  updateTableColumnsVisibility
})(PlotContainer);
