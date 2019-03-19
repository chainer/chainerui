import React from 'react';
import ReactTable from 'react-table';

import PropTypes from 'prop-types';
import * as uiPropTypes from '../store/uiPropTypes';

import TableConfigurator from './TableConfigurator';

import {
  sortKeys,
} from '../utils';

const AssetsTable = (props) => {
  const { assets, onAssetsTableColumnsVisibilityUpdate, tableState } = props;
  const {
    knownTrainInfoKeysConfig = {},
    knownContentKeysConfig = {},
  } = tableState;

  const trainInfoKeys = assets.map((asset) => Object.keys(asset.train_info)).flat();
  const uniqueTrainInfoKeys = [...new Set(trainInfoKeys)];

  const contentKeys = assets.map((asset) => asset.contents.map((content) => content.tag)).flat();
  const uniqueContentKeys = [...new Set(contentKeys)];

  const trainInfoColumns = sortKeys(uniqueTrainInfoKeys, knownTrainInfoKeysConfig).map((k) => ({
    Header: k,
    id: k,
    className: 'text-right',
    accessor: (p) => {
      const trainInfo = p.train_info;
      return trainInfo[k];
    },
    show: !(knownTrainInfoKeysConfig[k] || {}).hidden,
  }));

  const contentColumns = sortKeys(uniqueContentKeys, knownContentKeysConfig).map((k) => ({
    Header: k,
    id: k,
    className: 'text-center',
    sortable: false,
    Cell: (p) => {
      const { original } = p;
      const selectedContent = original.contents.find((content) => content.tag === k);
      if (selectedContent == null) {
        return null;
      }
      if (selectedContent.name.endsWith('.wav')) {
        return (
          <audio
            src={selectedContent.uri}
            alt={selectedContent.tag}
            controls
          />
        );
      }
      return (
        <img
          src={selectedContent.uri}
          alt={selectedContent.tag}
          width="80%"
          height="auto"
        />
      );
    },
    show: !(knownContentKeysConfig[k] || {}).hidden,
  }));

  const columns = [
    {
      Header: 'Train Info',
      columns: trainInfoColumns,
    },
    {
      Header: 'Contents',
      columns: contentColumns,
    },
  ];

  const columnHeaders = columns.map((c) => ({
    Header: c.Header,
    columns: c.columns.map((sc) => sc.Header),
  }));

  return (
    <div>
      <ReactTable
        style={{ width: '100%' }}
        data={assets}
        columns={columns}
        showPagination={false}
        minRows={3}
      />

      <TableConfigurator
        columnHeaders={columnHeaders}
        keyConfigs={[
          knownTrainInfoKeysConfig,
          knownContentKeysConfig,
        ]}
        onTableColumnsVisibilityUpdate={onAssetsTableColumnsVisibilityUpdate}
      />
    </div>
  );
};

AssetsTable.propTypes = {
  assets: uiPropTypes.assets.isRequired,
  tableState: uiPropTypes.tableState.isRequired,
  onAssetsTableColumnsVisibilityUpdate: PropTypes.func.isRequired,
};

export default AssetsTable;
