import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const {
    results = {}, stats, config,
    onResultsConfigSelectToggle, onResultUpdate
  } = props;
  const { argKeys } = stats;
  const { resultsConfig = {} } = config;

  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}>{`(${argKey})`}</th>));

  const resultRowElems = Object.keys(results).map((resultId) => {
    const result = results[resultId];
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        result={result}
        stats={stats}
        resultConfig={resultsConfig[resultId]}
        key={key}
        onResultsConfigSelectToggle={onResultsConfigSelectToggle}
        onResultUpdate={onResultUpdate}
      />
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>id</th>
          <th>name</th>
          <th>epoch</th>
          <th>iteration</th>
          <th>elapsed_time</th>
          {argHeaderElems}
          <th />
        </tr>
      </thead>
      <tbody>
        {resultRowElems}
      </tbody>
    </table>
  );
};

ExperimentsTable.propTypes = {
  results: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      pathName: PropTypes.string,
      args: PropTypes.arrayOf(PropTypes.any),
      logs: PropTypes.arrayOf(PropTypes.any)
    })
  ),
  config: PropTypes.shape({
    resultsConfig: PropTypes.objectOf(PropTypes.shape({
      hidden: PropTypes.bool
    }))
  }).isRequired,
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onResultsConfigSelectToggle: PropTypes.func.isRequired,
  onResultUpdate: PropTypes.func.isRequired
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

export default ExperimentsTable;

