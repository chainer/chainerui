import React from 'react';
import PropTypes from 'prop-types';
import ResultRow from './ResultRow';
import { keyOptions } from '../constants';


const ExperimentsTable = (props) => {
  const {
    projectId,
    results = {}, stats, projectConfig,
    onResultsConfigSelectToggle, onResultUpdate
  } = props;
  const { argKeys, logKeys } = stats;
  const { resultsConfig = {} } = projectConfig;

  const logHeaderElems = keyOptions.filter((key) => logKeys.indexOf(key) > -1).map((logKey) => (<th key={`logs-${logKey}`}>{logKey}</th>));
  const argHeaderElems = argKeys.map((argKey) => (<th key={`args-${argKey}`}>{`(${argKey})`}</th>));

  const resultRowElems = Object.keys(results).map((resultId) => {
    const result = results[resultId];
    const key = `result-row-${result.id}`;
    return (
      <ResultRow
        projectId={projectId}
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
    argKeys: PropTypes.arrayOf(PropTypes.string),
    logKeys: PropTypes.arrayOf(PropTypes.string)
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
