import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const { results, stats } = props;
  const { argKeys } = stats;

  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}><span className="glyphicon glyphicon-cog" />{argKey}</th>));

  const resultRowElems = results.map((result) => {
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        result={result}
        stats={stats}
        key={key}
      />
    );
  });

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>path name</th>
          <th>epoch</th>
          <th>iteration</th>
          <th>elapsed_time</th>
          {argHeaderElems}
        </tr>
      </thead>
      <tbody>
        {resultRowElems}
      </tbody>
    </table>
  );
};

ExperimentsTable.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      pathName: PropTypes.string,
      args: PropTypes.arrayOf(PropTypes.any),
      logs: PropTypes.arrayOf(PropTypes.any)
    })
  ),
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  })
};
ExperimentsTable.defaultProps = {
  results: [],
  stats: {
    argKeys: []
  }
};

export default ExperimentsTable;

