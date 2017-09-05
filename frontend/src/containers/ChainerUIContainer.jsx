import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  loadResults, updateResult, deleteResult,
  addLineToAxis, updateLineInAxis, removeLineFromAxis,
  updateAxisScale,
  updateGlobalPollingRate,
  updateXAxisKey,
  updateAxisScaleRangeType, updateAxisScaleRangeNumber,
  updateGlobalChartSize
} from '../actions';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import NavigationBar from '../components/NavigationBar';
import SideBar from '../components/SideBar';
import { startResultsPolling, stopResultsPolling } from '../utils';


class ChainerUIContainer extends React.Component {
  componentDidMount() {
    const { pollingRate } = this.props.config.global;
    this.resultsPollingTimer = startResultsPolling(this.props.loadResults, pollingRate);
  }

  componentWillReceiveProps(nextProps) {
    const currentPollingRate = this.props.config.global.pollingRate;
    const nextPollingRate = nextProps.config.global.pollingRate;

    if (currentPollingRate !== nextPollingRate) {
      stopResultsPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startResultsPolling(this.props.loadResults, nextPollingRate);
    }
  }

  componentWillUnmount() {
    stopResultsPolling(this.resultsPollingTimer);
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
            <div className="col-md-4 col-lg-3">
              <SideBar
                results={results}
                config={config}
                onAxisConfigLineAdd={this.props.addLineToAxis}
                onAxisConfigLineUpdate={this.props.updateLineInAxis}
                onAxisConfigLineRemove={this.props.removeLineFromAxis}
                onAxisConfigScaleUpdate={this.props.updateAxisScale}
                onAxisConfigXKeyUpdate={this.props.updateXAxisKey}
                onAxisConfigScaleRangeTypeUpdate={this.props.updateAxisScaleRangeType}
                onAxisConfigScaleRangeNumberUpdate={this.props.updateAxisScaleRangeNumber}
              />
            </div>
            <div className="col-md-8 col-lg-9">
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
                onResultDelete={this.props.deleteResult}
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
  updateResult: PropTypes.func.isRequired,
  deleteResult: PropTypes.func.isRequired,
  addLineToAxis: PropTypes.func.isRequired,
  updateLineInAxis: PropTypes.func.isRequired,
  removeLineFromAxis: PropTypes.func.isRequired,
  updateAxisScale: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateXAxisKey: PropTypes.func.isRequired,
  updateAxisScaleRangeType: PropTypes.func.isRequired,
  updateAxisScaleRangeNumber: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  loadResults,
  updateResult,
  deleteResult,
  addLineToAxis,
  updateLineInAxis,
  removeLineFromAxis,
  updateAxisScale,
  updateGlobalPollingRate,
  updateXAxisKey,
  updateAxisScaleRangeType,
  updateAxisScaleRangeNumber,
  updateGlobalChartSize
})(ChainerUIContainer);

