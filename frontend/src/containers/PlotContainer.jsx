import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  getProject,
  getResultList, updateResult,
  resetProjectConfig,
  updateLineInAxis,
  updateAxisScale, toggleLogKeySelect,
  updateResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalResultNameAlignment,
  updateXAxisKey,
  updateAxisScaleRangeType, updateAxisScaleRangeNumber
} from '../actions';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';
import { defaultConfig, defaultProjectConfig, keyOptions } from '../constants';
import { startPolling, stopPolling } from '../utils';


class PlotContainer extends React.Component {
  componentDidMount() {
    const { projectId, globalConfig } = this.props;
    const { pollingRate } = globalConfig;
    this.props.getProject(projectId);
    this.resultsPollingTimer = startPolling(this.props.getResultList, pollingRate, projectId);
  }

  componentWillReceiveProps(nextProps) {
    const { projectId, globalConfig } = this.props;
    const currentPollingRate = globalConfig.pollingRate;
    const nextPollingRate = nextProps.globalConfig.pollingRate;

    if (currentPollingRate !== nextPollingRate) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(this.props.getResultList, nextPollingRate, projectId);
    }
  }

  componentWillUnmount() {
    stopPolling(this.resultsPollingTimer);
  }

  render() {
    const {
      projectId,
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
          onGlobalConfigResultNameAlignmentUpdate={this.props.updateGlobalResultNameAlignment}
        />
        <Container fluid>
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <BreadcrumbLink
                length={2}
                project={project}
              />
              <SideBar
                projectId={projectId}
                results={results}
                stats={stats}
                projectConfig={projectConfig}
                onProjectConfigReset={this.props.resetProjectConfig}
                onAxisConfigLineUpdate={this.props.updateLineInAxis}
                onAxisConfigScaleUpdate={this.props.updateAxisScale}
                onAxisConfigXKeyUpdate={this.props.updateXAxisKey}
                onAxisConfigScaleRangeTypeUpdate={this.props.updateAxisScaleRangeType}
                onAxisConfigScaleRangeNumberUpdate={this.props.updateAxisScaleRangeNumber}
                onAxisConfigLogKeySelectToggle={this.props.toggleLogKeySelect}
              />
            </div>
            <div className="col-md-8 col-lg-9">
              <LogVisualizer
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
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapEntitiesToStats = (entities) => {
  const axes = {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  };

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
  const xAxisKeys = keyOptions.filter((key) => logKeys.indexOf(key) > -1);

  return { axes, argKeys, logKeys, xAxisKeys };
};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.params.projectId);
  const {
    entities,
    fetchState,
    config = defaultConfig
  } = state;
  const { projects = {}, results = {} } = entities;
  const project = projects[projectId];
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
  projectId: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  }),
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  projectConfig: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any),
    resultsConfig: PropTypes.objectOf(PropTypes.any),
    global: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  globalConfig: PropTypes.shape({
    pollingRate: PropTypes.number,
    chartSize: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  stats: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any),
    argKeys: PropTypes.arrayOf(PropTypes.string),
    logKeys: PropTypes.arrayOf(PropTypes.string),
    xAxisKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  getProject: PropTypes.func.isRequired,
  getResultList: PropTypes.func.isRequired,
  updateResult: PropTypes.func.isRequired,
  resetProjectConfig: PropTypes.func.isRequired,
  updateLineInAxis: PropTypes.func.isRequired,
  updateAxisScale: PropTypes.func.isRequired,
  toggleLogKeySelect: PropTypes.func.isRequired,
  updateResultsConfigSelect: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalResultNameAlignment: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateAxisScaleRangeType: PropTypes.func.isRequired,
  updateAxisScaleRangeNumber: PropTypes.func.isRequired
};

PlotContainer.defaultProps = {
  project: {}
};

export default connect(mapStateToProps, {
  getProject,
  getResultList,
  updateResult,
  resetProjectConfig,
  updateLineInAxis,
  updateAxisScale,
  toggleLogKeySelect,
  updateResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalResultNameAlignment,
  updateXAxisKey,
  updateAxisScaleRangeType,
  updateAxisScaleRangeNumber
})(PlotContainer);

