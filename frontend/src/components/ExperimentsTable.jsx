import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const {
    projectId,
    results = {}, stats, projectConfig,
    onResultsConfigSelectUpdate, onResultUpdate
  } = props;
  const { argKeys } = stats;
  const { resultsConfig = {} } = projectConfig;

  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}>{`(${argKey})`}</th>));

  const resultKeys = Object.keys(results);
  const resultCount = resultKeys.length;
  const visibleResultCount = resultKeys
    .filter((resultId) => !(resultsConfig[resultId] || {}).hidden).length;
  const isPartialSelect = visibleResultCount > 0 && visibleResultCount < resultCount;

  const handleResultsConfigSelectChange = (evt) => {
    resultKeys.forEach((resultId) => {
      onResultsConfigSelectUpdate(projectId, resultId, !evt.target.checked);
    });
  };

  const resultRowElems = resultKeys.map((resultId) => {
    const result = results[resultId];
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        projectId={projectId}
        result={result}
        stats={stats}
        resultConfig={resultsConfig[resultId]}
        key={key}
        onResultsConfigSelectUpdate={onResultsConfigSelectUpdate}
        onResultUpdate={onResultUpdate}
      />
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={visibleResultCount > 0}
              style={{ opacity: isPartialSelect ? 0.5 : 1 }}
              onChange={handleResultsConfigSelectChange}
            />
          </th>
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
  projectId: PropTypes.number.isRequired,
  results: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      pathName: PropTypes.string,
      args: PropTypes.arrayOf(PropTypes.any),
      logs: PropTypes.arrayOf(PropTypes.any)
    })
  ),
  projectConfig: PropTypes.shape({
    resultsConfig: PropTypes.objectOf(PropTypes.shape({
      hidden: PropTypes.bool
    }))
  }).isRequired,
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onResultsConfigSelectUpdate: PropTypes.func.isRequired,
  onResultUpdate: PropTypes.func.isRequired
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

export default ExperimentsTable;

