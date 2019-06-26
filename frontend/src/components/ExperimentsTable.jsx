import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  argValue2string,
  getGrandParentDirectoryName,
  getLastLogDict,
  sortMethod,
  sortKeys,
  displayResultNameFull,
} from '../utils';

import ResultName from './experiments_table_cell/ResultName';
import ToggleResult from './experiments_table_cell/ToggleResult';
import SubComponent from './experiments_table_cell/SubComponent';
import VisibilityCheckbox from './VisibilityCheckbox';
import TableConfigurator from './TableConfigurator';


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
    onTableExpandedUpdate,
    onTableColumnsVisibilityUpdate,
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
  const generateHandleGroupedResultsConfigSelectChange = (groupedResultKeys) => (evt) => {
    groupedResultKeys.forEach((resultId) => {
      onResultsConfigSelectUpdate(project.id, resultId, !evt.target.checked);
    });
  };

  const defaultStyle = {
    textAlign: 'right',
  };

  const resultList = resultKeys.map((resultId) => results[resultId]);
  const expanded = resultList.length === 0 ? {} : tableState.expanded;
  const {
    knownLogKeysConfig = {},
    knownArgKeysConfig = {},
    isGrouped = false,
  } = tableState;

  const nameColumns = [
    {
      Header: <VisibilityCheckbox
        className="fa-xs"
        checked={visibleResultCount > 0}
        indeterminate={isPartialSelect}
        onChange={handleResultsConfigSelectChange}
      />,
      Cell: (p) => {
        const { original } = p;
        if (!original) {
          return {};
        }
        const { id } = original;
        return (
          <ToggleResult
            project={project}
            result={original}
            resultConfig={resultsConfig[id]}
            onResultsConfigSelectUpdate={onResultsConfigSelectUpdate}
          />
        );
      },
      className: 'text-center',
      sortable: false,
      filterable: false,
      minWidth: 40,
      Aggregated: (row) => {
        const groupedResultKeys = row.subRows.map((r) => {
          const { _original } = r;
          return _original.id;
        });
        const groupedVisibleResultCount = groupedResultKeys.filter((resultId) => !(resultsConfig[resultId] || {}).hidden).length;
        const isGroupedPartialSelect = groupedVisibleResultCount > 0
          && visibleResultCount < groupedResultKeys.length;
        return (
          <VisibilityCheckbox
            className="fa-xs"
            checked={groupedVisibleResultCount > 0}
            indeterminate={isGroupedPartialSelect}
            onChange={generateHandleGroupedResultsConfigSelectChange(groupedResultKeys)}
          />
        );
      },
    },
    {
      Header: 'name',
      id: 'name',
      Cell: (p) => {
        const { original } = p;
        if (original) {
          return (
            <ResultName
              project={project}
              result={original}
              isResultNameAlignRight={globalConfig.isResultNameAlignRight}
              onResultUpdate={onResultUpdate}
            />
          );
        }
        return null;
      },
      minWidth: 250,
      filterMethod: (filter, row /* , column */) => {
        // filter by displayed result name
        const { _original } = row;
        if (!_original) {
          // aggregated row
          return true;
        }
        return displayResultNameFull(project, _original).includes(filter.value);
      },
    },
  ];
  if (isGrouped) {
    nameColumns.unshift({
      Header: '',
      id: 'group',
      accessor: (p) => getGrandParentDirectoryName(p),
      filterMethod: (filter, row /* , column */) => row[filter.id].includes(filter.value),
    });
  }
  const groupedKey = isGrouped ? ['group'] : [];

  const logs = sortKeys(logKeys, knownLogKeysConfig).map((logKey) => ({
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
    show: !(knownLogKeysConfig[logKey] || {}).hidden,
    aggregate: () => '',
    filterable: false,
  }));

  const argsList = sortKeys(argKeys, knownArgKeysConfig).map((argKey) => ({
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
    show: !(knownArgKeysConfig[argKey] || {}).hidden,
    aggregate: () => '',
    filterable: false,
  }));

  const columns = [
    {
      Header: ' ', // To prevent from showing "Pivoted" on default (=''), set space on purpose.
      columns: nameColumns,
    },
    {
      Header: 'last logs',
      columns: logs,
    },
    {
      Header: 'args',
      columns: argsList,
    },
  ];

  const dataColumns = columns.slice(1, columns.length);

  const columnHeaders = dataColumns.map((c) => ({
    Header: c.Header,
    columns: c.columns.map((sc) => sc.Header),
  }));

  return (
    <div>
      <ReactTable
        data={resultList}
        columns={columns}
        showPagination={false}
        minRows={3}
        expanded={expanded}
        onExpandedChange={(nextExpanded) => onTableExpandedUpdate(project.id, nextExpanded)}
        pageSize={resultList.length}
        filterable
        defaultSortMethod={sortMethod}
        defaultSorted={[
          {
            id: 'result_id',
          },
        ]}
        pivotBy={groupedKey}
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
          if (!globalConfig.highlightTableAndChart) {
            return {};
          }
          if (rowInfo && !rowInfo.original) {
            return {};
          }
          const resultId = rowInfo && rowInfo.original.id;
          const resultStatus = resultsStatus[resultId] || {};
          return {
            className: resultStatus.selected ? 'result-highlight' : null,
            onMouseEnter: () => {
              onResultSelect(project.id, resultId, true);
            },
            onMouseLeave: () => {
              onResultSelect(project.id, resultId, false);
            },
          };
        }}
      />

      <TableConfigurator
        columnHeaders={columnHeaders}
        keyConfigs={[
          knownLogKeysConfig,
          knownArgKeysConfig,
        ]}
        onTableColumnsVisibilityUpdate={onTableColumnsVisibilityUpdate}
      />
    </div>
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
  onTableExpandedUpdate: PropTypes.func.isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired,
};

ExperimentsTable.defaultProps = {
  resultsStatus: {},
};

export default ExperimentsTable;
