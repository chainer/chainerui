import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import { Link } from 'react-router';
import {
  argValue2string,
  getLastLogDict,
  urlForResultDetail,
  sortMethod
} from '../utils';

import UnregisterButton from './experiments_table_cell/UnregisterButton';
import ResultName from './experiments_table_cell/ResultName';
import ToggleResult from './experiments_table_cell/ToggleResult';

const emptyStr = '-';

const ExperimentsTable = (props) => {
  const {
    project,
    results = {},
    projectConfig,
    globalConfig,
    onResultsConfigSelectUpdate, onResultUpdate
  } = props;
  const { resultsConfig = {}, experiments } = projectConfig;

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

  const defaultStyle = {
    textAlign: 'right'
  };

  const resultList = resultKeys.map((resultId) => results[resultId]);

  const logs = experiments.logKeys.map((logKey) => ({
    Header: logKey,
    id: `logKey${logKey}`,
    accessor: (p) => {
      const lastLogDict = getLastLogDict(p);
      if (logKey === 'elapsed_time') {
        return lastLogDict.elapsed_time == null ? emptyStr : lastLogDict.elapsed_time.toFixed(2);
      }
      return lastLogDict[logKey];
    },
    style: defaultStyle
  }));

  const argsList = experiments.argKeys.map((argKey) => ({
    Header: argKey,
    id: argKey,
    accessor: (p) => {
      const { args } = p;
      const argDict = {};
      args.forEach((arg) => {
        argDict[arg.key] = arg.value;
      });
      return argValue2string(argDict[argKey]);
    },
    style: defaultStyle
  }));

  const columns = [
    {
      Header: <input
        type="checkbox"
        checked={visibleResultCount > 0}
        style={{ opacity: isPartialSelect ? 0.5 : 1 }}
        onChange={handleResultsConfigSelectChange}
      />,
      Cell: (p) => {
        const { original } = p;
        const { id } = original;
        return (<ToggleResult
          project={project}
          result={original}
          resultConfig={resultsConfig[id]}
          onResultsConfigSelectUpdate={onResultsConfigSelectUpdate}
        />);
      },
      className: 'text-center',
      sortable: false,
      minWidth: 40
    },
    {
      Header: 'id',
      id: 'result_id',
      Cell: (p) => {
        const { original } = p;
        const { id } = original;
        return (<Link to={urlForResultDetail(project.id, id)}>{id}</Link>);
      },
      className: 'text-center',
      minWidth: 50
    },
    {
      Header: 'name',
      id: 'name',
      Cell: (p) => {
        const { original } = p;
        return (<ResultName
          project={project}
          result={original}
          isResultNameAlignRight={globalConfig.isResultNameAlignRight}
          onResultUpdate={onResultUpdate}
        />);
      },
      minWidth: 250
    },
    {
      Header: 'last logs',
      columns: logs
    },
    {
      Header: 'args',
      columns: argsList
    },
    {
      Header: '',
      Cell: (p) => {
        const { original } = p;
        return (<UnregisterButton
          project={project}
          result={original}
          onResultUpdate={onResultUpdate}
        />);
      },
      sortable: false,
      minWidth: 30
    }
  ];

  return (
    <ReactTable
      data={resultList}
      columns={columns}
      showPagination={false}
      minRows={3}
      pageSize={resultList.length}
      defaultSortMethod={sortMethod}
      defaultSorted={[
        {
          id: 'result_id'
        }
      ]}
    />
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
    })),
    experiments: PropTypes.shape({
      logKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
      argKeys: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired
  }).isRequired,
  globalConfig: PropTypes.shape({
    isResultNameAlignRight: PropTypes.bool
  }).isRequired,
  onResultsConfigSelectUpdate: PropTypes.func.isRequired,
  onResultUpdate: PropTypes.func.isRequired
};
ExperimentsTable.defaultProps = {
  results: {}
};

export default ExperimentsTable;
