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
    const { experiments, selectedResultIds, argKeys, colors } = this.props;
    const selectedResultIdsSet = {};
    selectedResultIds.forEach((resultId) => { selectedResultIdsSet[resultId] = true; });

    const argKeyHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}><span className="glyphicon glyphicon-cog" />{argKey}</th>));

    let resultRowIndex = 0;
    const resultRows = experiments.map((experiment) => {
      if (experiment.results.length === 0) {
        // experiment with no results
        const key = `result-row-${experiment.id}`;
        const color = colors[resultRowIndex];
        resultRowIndex += 1;
        return (<ResultRow xpName={experiment.name} argKeys={argKeys} color={color} key={key} />);
      }
      return experiment.results.map((result) => {
        const key = `result-row-${experiment.id}-${result.id}`;
        const color = colors[resultRowIndex];
        resultRowIndex += 1;
        return (
          <ResultRow
            xpName={experiment.name}
            argKeys={argKeys}
            result={result}
            selected={selectedResultIdsSet[result.id]}
            color={color}
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
  colors: PropTypes.arrayOf(PropTypes.string),
  onToggleResult: PropTypes.func
};
ExperimentsTable.defaultProps = {
  selectedResultIds: [],
  argKeys: [],
  colors: [],
  onToggleResult: () => {}
};

export default ExperimentsTable;

