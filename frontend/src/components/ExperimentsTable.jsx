import React from 'react';
import ResultRow from './ResultRow';


class ExperimentsTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };

  }

  render() {
    const { experiments } = this.props;
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

