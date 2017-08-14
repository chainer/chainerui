import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


class ExperimentsTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleToggleResult = this.handleToggleResult.bind(this);
  }

  handleToggleResult(resultId, isToggleed) {
    this.props.onToggleResult(resultId, isToggleed);
  }

  render() {
    const { experiments, selectedResultIds, argKeys } = this.props;
    const selectedResultIdsSet = {};
    selectedResultIds.forEach((resultId) => { selectedResultIdsSet[resultId] = true; });

    const argKeyHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}><span className="glyphicon glyphicon-cog" />{argKey}</th>));

    const resultRows = experiments.map((experiment) => {
      if (experiment.results.length === 0) {
        // experiment with no results
        const key = `result-row-${experiment.id}`;
        return (<ResultRow xpName={experiment.name} argKeys={argKeys} key={key} />);
      }
      return experiment.results.map((result) => {
        const key = `result-row-${experiment.id}-${result.id}`;
        return (
          <ResultRow
            xpName={experiment.name}
            argKeys={argKeys}
            result={result}
            selected={selectedResultIdsSet[result.id]}
            onToggle={this.handleToggleResult}
            key={key}
          />
        );
      });
    });

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th />
            <th>experiment name</th>
            <th>result name</th>
            {argKeyHeaderElems}
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

ExperimentsTable.propTypes = {
  experiments: PropTypes.arrayOf(
    PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.any)
    })
  ).isRequired,
  selectedResultIds: PropTypes.arrayOf(PropTypes.number),
  argKeys: PropTypes.arrayOf(PropTypes.string),
  onToggleResult: PropTypes.func
};
ExperimentsTable.defaultProps = {
  selectedResultIds: [],
  argKeys: [],
  onToggleResult: () => {}
};

export default ExperimentsTable;

