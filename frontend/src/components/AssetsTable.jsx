import React from 'react';
import ReactTable from 'react-table';

import PropTypes from 'prop-types';
import * as uiPropTypes from '../store/uiPropTypes';

import TableConfigurator from './TableConfigurator';

const AssetsTable = (props) => {
  const { assets, onAssetsTableColumnsVisibilityUpdate, tableState } = props;
  const { hiddenKeysForEveryHeader } = tableState;

  const trainInfoKeys = assets.map((asset) => Object.keys(asset.train_info)).flat();
  const uniqueTrainInfoKeys = [...new Set(trainInfoKeys)];

  const contentKeys = assets.map((asset) => asset.contents.map((content) => content.tag)).flat();
  const uniqueContentKeys = [...new Set(contentKeys)];

  const trainInfoColumns = uniqueTrainInfoKeys.map((k) => ({
    Header: k,
    id: k,
    className: 'text-right',
    accessor: (p) => {
      const trainInfo = p.train_info;
      return trainInfo[k];
    },
    show: !hiddenKeysForEveryHeader[0].find((hk) => hk === k)
  }));

  const contentColumns = uniqueContentKeys.map((k) => ({
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
      } else {
        return (
          <img
            src={selectedContent.uri}
            alt={selectedContent.tag}
            width="80%"
            height="auto"
          />
        );
      }
    }
  }));

  const columns = [
    {
      Header: 'Train Info',
      columns: trainInfoColumns
    },
    {
      Header: 'Contents',
      columns: contentColumns
    }
  ];

  console.log({ columns });

  const columnHeaders = columns.map((c) => ({
    Header: c.Header,
    columns: c.columns.map((sc) => sc.Header)
  }));

  console.log({ columnHeaders });



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
        hiddenKeysForEveryHeader={hiddenKeysForEveryHeader}
        onTableColumnsVisibilityUpdate={onAssetsTableColumnsVisibilityUpdate}
      />
    </div>
  );
};

AssetsTable.propTypes = {
  assets: uiPropTypes.assets.isRequired,
  tableState: PropTypes.objectOf({
    hiddenKeysForEveryHeader: PropTypes.any
  }).isRequired,
  onAssetsTableColumnsVisibilityUpdate: PropTypes.func.isRequired
};

export default AssetsTable;
