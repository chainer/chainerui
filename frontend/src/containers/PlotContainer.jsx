import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  loadResults, updateResult,
  resetConfig,
  updateLineInAxis,
  updateAxisScale, toggleLogKeySelect,
  toggleResultsConfigSelect,
  updateGlobalPollingRate, updateGlobalChartSize,
  updateXAxisKey,
  updateAxisScaleRangeType, updateAxisScaleRangeNumber
} from '../actions';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';
import { defaultConfig } from '../constants';
import { startPolling, stopPolling } from '../utils';


class PlotContainer extends React.Component {
  componentDidMount() {
    const { pollingRate } = this.props.config.global;
    this.resultsPollingTimer = startPolling(this.props.loadResults, pollingRate);
  }

  componentWillReceiveProps(nextProps) {
    const currentPollingRate = this.props.config.global.pollingRate;
    const nextPollingRate = nextProps.config.global.pollingRate;

    if (currentPollingRate !== nextPollingRate) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(this.props.loadResults, nextPollingRate);
    }
  }

  componentWillUnmount() {
    stopPolling(this.resultsPollingTimer);
  }

  render() {
    const { results, fetchState, config, stats } = this.props;

    return (
      <div className="chainer-ui-container">
        <NavigationBar
          fetchState={fetchState}
          config={config}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
        />
        <Container fluid>
          <BreadcrumbLink />
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <SideBar
                results={results}
                stats={stats}
                config={config}
                onConfigReset={this.props.resetConfig}
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
                config={config}
              />
              <ExperimentsTable
                results={results}
                stats={stats}
                config={config}
                onResultsConfigSelectToggle={this.props.toggleResultsConfigSelect}
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

  return { axes, argKeys, logKeys };
};

const mapStateToProps = (state) => {
  const {
    entities,
    fetchState,
    config = defaultConfig
  } = state;
  const { results = {} } = entities;
  const stats = mapEntitiesToStats(entities);
  return { results, fetchState, config, stats };
};

PlotContainer.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any),
    resultsConfig: PropTypes.objectOf(PropTypes.any),
    global: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  stats: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any),
    argKeys: PropTypes.arrayOf(PropTypes.string),
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  loadResults: PropTypes.func.isRequired,
  updateResult: PropTypes.func.isRequired,
  resetConfig: PropTypes.func.isRequired,
  updateLineInAxis: PropTypes.func.isRequired,
  updateAxisScale: PropTypes.func.isRequired,
  toggleLogKeySelect: PropTypes.func.isRequired,
  toggleResultsConfigSelect: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateAxisScaleRangeType: PropTypes.func.isRequired,
  updateAxisScaleRangeNumber: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  loadResults,
  updateResult,
  resetConfig,
  updateLineInAxis,
  updateAxisScale,
  toggleLogKeySelect,
  toggleResultsConfigSelect,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateXAxisKey,
  updateAxisScaleRangeType,
  updateAxisScaleRangeNumber
})(PlotContainer);

