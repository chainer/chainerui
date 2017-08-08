import React from 'react';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';


const sampleExperiments = require('../utils/sample_api_response.json');

class ChainerUIContainer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      experiments: sampleExperiments.experiments,
      resultIds: [1, 2, 3],
      logKey: 'main/loss',
    };

  }

  render() {
    const { experiments, resultIds, logKey } = this.state;
    return (
      <div className="chainer-ui-container">
        <div className="container">
          <h1>chainer_ui</h1>
          <LogVisualizer
            experiments={experiments}
            resultIds={resultIds}
            logKey={logKey}
          />
          <ExperimentsTable
            experiments={experiments}
          />
        </div>
      </div>
    );
  }

}

export default ChainerUIContainer;

