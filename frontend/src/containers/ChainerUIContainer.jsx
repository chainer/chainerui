import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  loadResults,
  addLineToAxis, updateLineInAxis, removeLineFromAxis,
  updateAxisScale,
  updateResult,
  updateGlobalPollingRate,
  updateXAxisKey,
  updateGlobalChartSize
} from '../actions';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';

let resultsPollingTimer;

const startResultsPolling = (func, pollingRate) => {
  if (pollingRate > 0) {
    resultsPollingTimer = setInterval(func, pollingRate);
  }
};

const stopPolling = (timer) => {
  clearInterval(timer);
};

class ChainerUIContainer extends React.Component {
  componentWillMount() {
    this.props.loadResults();
  }

  componentDidMount() {
    const { pollingRate } = this.props.config.global;
    startResultsPolling(this.props.loadResults, pollingRate);
  }

  componentWillReceiveProps(nextProps) {
    const currentPollingRate = this.props.config.global.pollingRate;
    const nextPollingRate = nextProps.config.global.pollingRate;

    if (currentPollingRate !== nextPollingRate) {
      stopPolling(resultsPollingTimer);
      startResultsPolling(this.props.loadResults, nextPollingRate);
    }
  }

  componentWillUnmount() {
    stopPolling(resultsPollingTimer);
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
          <div className="row">
            <div className="col-sm-4 col-md-3">
              <SideBar
                results={results}
                config={config}
                onAxisConfigLineAdd={this.props.addLineToAxis}
                onAxisConfigLineUpdate={this.props.updateLineInAxis}
                onAxisConfigLineRemove={this.props.removeLineFromAxis}
                onAxisConfigScaleUpdate={this.props.updateAxisScale}
                onAxisConfigXKeyUpdate={this.props.updateXAxisKey}
              />
            </div>
            <div className="col-sm-8 col-md-9">
              <LogVisualizer
                results={results}
                stats={stats}
                config={config}
                onAxisConfigLineAdd={this.props.addLineToAxis}
                onAxisConfigLineUpdate={this.props.updateLineInAxis}
                onAxisConfigLineRemove={this.props.removeLineFromAxis}
                onAxisConfigScaleUpdate={this.props.updateAxisScale}
                onAxisConfigXKeyUpdate={this.props.updateXAxisKey}
              />
              <ExperimentsTable
                results={results}
                stats={stats}
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
  const { results = {} } = entities;
  const argKeySet = {};
  Object.keys(results).forEach((resultId) => {
    const result = results[resultId];
    result.args.forEach((arg) => { argKeySet[arg.key] = true; });
  });
  const argKeys = Object.keys(argKeySet);

  const axes = {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  };

  return { axes, argKeys };
};

const defaultConfig = {
  axes: {},
  global: {}
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

ChainerUIContainer.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any),
    global: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  stats: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any),
    argKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  loadResults: PropTypes.func.isRequired,
  addLineToAxis: PropTypes.func.isRequired,
  updateLineInAxis: PropTypes.func.isRequired,
  removeLineFromAxis: PropTypes.func.isRequired,
  updateAxisScale: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateResult: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  loadResults,
  addLineToAxis,
  updateLineInAxis,
  removeLineFromAxis,
  updateAxisScale,
  updateResult,
  updateGlobalPollingRate,
  updateXAxisKey,
  updateGlobalChartSize
})(ChainerUIContainer);

