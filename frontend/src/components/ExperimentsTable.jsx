import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const { results } = props;
  const resultRowElems = results.map((result) => {
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        result={result}
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
        </tr>
      </thead>
      <tbody>
        { resultRowElems }
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
  )
};
ExperimentsTable.defaultProps = {
  results: []
};

export default ExperimentsTable;

