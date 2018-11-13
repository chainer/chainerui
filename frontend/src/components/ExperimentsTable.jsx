import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  argValue2string,
  getLastLogDict,
  sortMethod
} from '../utils';

import ResultName from './experiments_table_cell/ResultName';
import ToggleResult from './experiments_table_cell/ToggleResult';
import SubComponent from './experiments_table_cell/SubComponent';

const emptyStr = '-';

const ExperimentsTable = (props) => {
  const {
    project,
    results,
    resultsStatus,
    stats,
    projectConfig,
    globalConfig,
    onResultsConfigSelectUpdate,
    onResultUpdate,
    onResultSelect,
    onCommandSubmit,
    onTableExpandedUpdate
  } = props;
  const { argKeys, logKeys } = stats;
  const { resultsConfig, tableState } = projectConfig;

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
  const expanded = resultList.length === 0 ? {} : tableState.expanded;
  const {
    hiddenLogKeys = [],
    hiddenArgKeys = []
  } = tableState;

  const logs = logKeys.map((logKey) => ({
    Header: logKey,
    id: `logKey${logKey}`,
    accessor: (p) => {
      const lastLogDict = getLastLogDict(p);
      if (logKey === 'elapsed_time') {
        return lastLogDict.elapsed_time == null ? emptyStr : lastLogDict.elapsed_time.toFixed(2);
      }
      return lastLogDict[logKey];
    },
    style: defaultStyle,
    show: !hiddenLogKeys.find((k) => k === logKey)
  }));

  const argsList = argKeys.map((argKey) => ({
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
    style: defaultStyle,
    show: !hiddenArgKeys.find((k) => k === argKey)
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
    }
  ];

  return (
    <ReactTable
      data={resultList}
      columns={columns}
      showPagination={false}
      minRows={3}
      expanded={expanded}
      onExpandedChange={(nextExpanded) => onTableExpandedUpdate(project.id, nextExpanded)}
      pageSize={resultList.length}
      defaultSortMethod={sortMethod}
      defaultSorted={[
        {
          id: 'result_id'
        }
      ]}
      freezeWhenExpanded={expanded === {}}
      SubComponent={(p) => (
        <SubComponent
          original={p.original}
          project={project}
          onResultUpdate={onResultUpdate}
          onResultUnregistered={() => onTableExpandedUpdate(project.id, {})}
          onCommandSubmit={onCommandSubmit}
        />
      )}
      getTrProps={(state, rowInfo) => {
        const resultId = rowInfo && rowInfo.original.id;
        const resultStatus = resultsStatus[resultId] || {};
        return {
          className: resultStatus.selected ? 'result-highlight' : null,
          onMouseEnter: () => {
            onResultSelect(project.id, resultId, true);
          },
          onMouseLeave: () => {
            onResultSelect(project.id, resultId, false);
          }
        };
      }}
    />
  );
};

ExperimentsTable.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  stats: uiPropTypes.stats.isRequired,
  onResultsConfigSelectUpdate: PropTypes.func.isRequired,
  onResultUpdate: PropTypes.func.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  onCommandSubmit: PropTypes.func.isRequired,
  onTableExpandedUpdate: PropTypes.func.isRequired
};

ExperimentsTable.defaultProps = {
  resultsStatus: {}
};

export default ExperimentsTable;
