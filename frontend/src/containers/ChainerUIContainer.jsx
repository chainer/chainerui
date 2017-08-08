import React from 'react';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';
import LogKeySelector from '../components/LogKeySelector';


const sampleExperiments = require('../utils/sample_api_response.json');

class ChainerUIContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.getLogKeys = this.getLogKeys.bind(this);
    this.handleCangeLogKey = this.handleCangeLogKey.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      experiments: sampleExperiments.experiments,
      resultIds: [],
      logKey: '',
    };

  }

  getLogKeys() {
    const { experiments } = this.state;
    let logKeysSet = {};
    experiments.forEach((experiment) => {
      experiment.results.forEach((result) => {
        result.logs.forEach((log) => {
          Object.keys(log).forEach((logKey) => {
            logKeysSet[logKey] = true;
          });
        });
      });
    });
    return Object.keys(logKeysSet);
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
    const logKeys = this.getLogKeys();

    return (
      <div className="chainer-ui-container">
        <div className="container">
          <h1>chainer_ui</h1>
          <hr />
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
                logKeys={this.getLogKeys()}
                onChangeLogKey={this.handleCangeLogKey}
              />
            </div>
          </div>
          <ExperimentsTable
            experiments={experiments}
            selectedResultIds={resultIds}
            onToggleResult={this.handleToggleResult}
          />
        </div>
      </div>
    );
  }

}

export default ChainerUIContainer;

