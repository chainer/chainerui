import React from 'react';
import $ from 'jquery';
import path from 'path';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import LogKeySelector from '../components/LogKeySelector';


const apiEndpoint = '/api/v1';

class ChainerUIContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getLogAndArgsKeys = this.getLogAndArgsKeys.bind(this);
    this.requestExperiments = this.requestExperiments.bind(this);
    this.handleCangeLogKey = this.handleCangeLogKey.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      experiments: [],
      resultIds: [],
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

  handleCangeLogKey(e) {
    this.setState({
      logKey: e.target.value
    });
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
    const { experiments, resultIds, logKey } = this.state;
    const { logKeys, argKeys } = this.getLogAndArgsKeys();

    return (
      <div className="chainer-ui-container">
        <div className="row">
          <div className="col-sm-9">
            <LogVisualizer
              experiments={experiments}
              resultIds={resultIds}
              logKey={logKey}
            />
          </div>
          <div className="col-sm-3">
            <LogKeySelector
              logKey={logKey}
              logKeys={logKeys}
              onChangeLogKey={this.handleCangeLogKey}
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

