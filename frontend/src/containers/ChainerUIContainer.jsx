import React from 'react';
import $ from 'jquery';
import path from 'path';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import AxisKeySelector from '../components/AxisKeySelector';


const apiEndpoint = '/api/v1';

class ChainerUIContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getLogAndArgsKeys = this.getLogAndArgsKeys.bind(this);
    this.requestExperiments = this.requestExperiments.bind(this);
    this.handleCangeXAxisKey = this.handleCangeXAxisKey.bind(this);
    this.handleCangeLogKey = this.handleCangeLogKey.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      experiments: [],
      resultIds: [],
      xAxisKey: '',
      logKey: ''
    };

    this.requestExperiments();
  }

  getLogAndArgsKeys() {
    const { experiments } = this.state;
    const logKeysSet = {};
    const argKeysSet = {};
    experiments.forEach((experiment) => {
      experiment.results.forEach((result) => {
        result.logs.forEach((log) => {
          Object.keys(log).forEach((logKey) => {
            logKeysSet[logKey] = true;
          });
        });
        Object.keys(result.args).forEach((argKey) => {
          argKeysSet[argKey] = true;
        });
      });
    });
    return {
      logKeys: Object.keys(logKeysSet),
      argKeys: Object.keys(argKeysSet)
    };
  }

  requestExperiments() {
    const url = path.resolve(apiEndpoint, 'experiments');
    $.ajax({
      url,
      type: 'GET',
      dataType: 'json'
    })
      .done((data) => {
        this.setState({
          experiments: data.experiments
        });
      });
  }

  handleCangeXAxisKey(axisName, xAxisKey) {
    this.setState({ xAxisKey });
  }

  handleCangeLogKey(axisName, logKey) {
    this.setState({ logKey });
  }

  handleToggleResult(resultId, isToggleed) {
    const { resultIds } = this.state;
    let newResultIds = [];
    if (isToggleed) {
      newResultIds = resultIds.concat(resultId);
    } else {
      newResultIds = resultIds.filter((resId) => (resId !== resultId));
    }
    this.setState({
      resultIds: newResultIds
    });
  }

  render() {
    const { experiments, resultIds, xAxisKey, logKey } = this.state;
    const { logKeys, argKeys } = this.getLogAndArgsKeys();
    const xAxisKeys = ['iteration', 'epoch', 'elapsed_time'];

    return (
      <div className="chainer-ui-container">
        <div className="row">
          <div className="col-sm-9">
            <LogVisualizer
              experiments={experiments}
              resultIds={resultIds}
              xAxisKey={xAxisKey}
              logKey={logKey}
            />
          </div>
          <div className="col-sm-3">
            <AxisKeySelector
              axisName="y"
              title="Y axis:"
              axisKey={logKey}
              axisKeys={logKeys}
              onChangeAxisKey={this.handleCangeLogKey}
            />
            <AxisKeySelector
              axisName="x"
              title="X axis:"
              axisKey={xAxisKey}
              axisKeys={xAxisKeys}
              onChangeAxisKey={this.handleCangeXAxisKey}
            />
          </div>
        </div>
        <ExperimentsTable
          experiments={experiments}
          selectedResultIds={resultIds}
          argKeys={argKeys}
          onToggleResult={this.handleToggleResult}
        />
      </div>
    );
  }
}

export default ChainerUIContainer;

