import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const { stats } = props;
  const { results } = props.entities || {};
  const { argKeys } = stats;

  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}><span className="glyphicon glyphicon-cog" />{argKey}</th>));

  const resultRowElems = Object.keys(results).map((resultId) => {
    const result = results[resultId];
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
  entities: PropTypes.shape({
    results: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number,
        pathName: PropTypes.string,
        args: PropTypes.arrayOf(PropTypes.any),
        logs: PropTypes.arrayOf(PropTypes.any)
      })
    )
  }),
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  })
};
ExperimentsTable.defaultProps = {
  entities: {
    results: {}
  },
  stats: {
    argKeys: []
  }
};

export default ExperimentsTable;

