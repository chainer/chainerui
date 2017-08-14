import React from 'react';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import LogKeySelector from '../components/LogKeySelector';


const sampleExperiments = require('../utils/sample_api_response.json');

class ChainerUIContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.getLogAndArgsKeys = this.getLogAndArgsKeys.bind(this);
    this.handleCangeLogKey = this.handleCangeLogKey.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      experiments: sampleExperiments.experiments,
      resultIds: [],
      logKey: '',
    };

  }

  getLogAndArgsKeys() {
    const { experiments } = this.state;
    let logKeysSet = {};
    let argKeysSet = {};
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
      argKeys: Object.keys(argKeysSet),
    }
  }

  handleCangeLogKey(e) {
    this.setState({
      logKey: e.target.value,
    });
  }

  handleToggleResult(resultId, isToggleed) {
    const { resultIds } = this.state;
    let newResultIds = [];
    if (isToggleed) {
      newResultIds = resultIds.concat(resultId);
    } else {
      newResultIds = resultIds.filter((resId) => { return (resId != resultId); });
    }
    this.setState({
      resultIds: newResultIds,
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

