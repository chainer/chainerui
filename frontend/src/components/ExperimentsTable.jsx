import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';


const ExperimentsTable = (props) => {
  const {
    project,
    results = {}, stats,
    projectConfig,
    globalConfig,
    onResultsConfigSelectUpdate, onResultUpdate
  } = props;
  const { argKeys, xAxisKeys } = stats;
  const { resultsConfig = {} } = projectConfig;

  const logHeaderElems = xAxisKeys.map((logKey) => (<th key={`logs-${logKey}`}>{logKey}</th>));
  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}>{`(${argKey})`}</th>));

  const resultKeys = Object.keys(results);
  const resultCount = resultKeys.length;
  const visibleResultCount = resultKeys
    .filter((resultId) => !(resultsConfig[resultId] || {}).hidden).length;
  const isPartialSelect = visibleResultCount > 0 && visibleResultCount < resultCount;

  const handleResultsConfigSelectChange = (evt) => {
    resultKeys.forEach((resultId) => {
      onResultsConfigSelectUpdate(project.id, resultId, !evt.target.checked);
    });
  };

  const resultRowElems = resultKeys.map((resultId) => {
    const result = results[resultId];
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        project={project}
        result={result}
        stats={stats}
        resultConfig={resultsConfig[resultId]}
        isResultNameAlignRight={globalConfig.isResultNameAlignRight}
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
          <th>img</th>
          {logHeaderElems}
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
  project: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string
  }).isRequired,
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
  globalConfig: PropTypes.shape({
    isResultNameAlignRight: PropTypes.bool
  }).isRequired,
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string),
    xAxisKeys: PropTypes.arrayOf(PropTypes.string)
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
