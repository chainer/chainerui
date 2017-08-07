import React from 'react';
import ResultRow from './ResultRow';


const sampleExperiments = require('../utils/sample_api_response.json');

class ExperimentsTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.requestExperiments = this.requestExperiments.bind(this);

    this.state = {
      experiments: [],
    };

    this.requestExperiments();
  }

  requestExperiments() {
    this.state.experiments = sampleExperiments.experiments;
  }

  render() {
    const { experiments } = this.state;
    let resultRows = experiments.map((experiment, i) => {
      if (experiment.results.length === 0) {
        const key = 'result-row-' + experiment.name + '-' + 0;
        return (<ResultRow xpName={experiment.name} key={key} />);
      }
      return experiment.results.map((result, i) => {
        const key = 'result-row-' + experiment.name + '-' + i;
        console.log(key);
        return (<ResultRow xpName={experiment.name} result={result} key={'result-row-' + i} />);
      });
    });
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Experiment Name</th>
            <th>timestamp</th>
            <th>args</th>
            <th>epoch</th>
            <th>iteration</th>
            <th>elapsed_time</th>
          </tr>
        </thead>
        <tbody>
          { resultRows }
        </tbody>
      </table>
    );
  }

}

export default ExperimentsTable;

