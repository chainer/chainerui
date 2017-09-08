import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const { results = {}, stats, onResultUpdate, onResultDelete } = props;
  const { argKeys } = stats;

  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}>{`(${argKey})`}</th>));

  const resultRowElems = Object.keys(results).map((resultId) => {
    const result = results[resultId];
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        result={result}
        stats={stats}
        key={key}
        onResultUpdate={onResultUpdate}
        onResultDelete={onResultDelete}
      />
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
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
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  }),
  onResultUpdate: PropTypes.func.isRequired,
  onResultDelete: PropTypes.func.isRequired
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

export default ExperimentsTable;

