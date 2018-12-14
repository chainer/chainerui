import React from 'react';
import ReactTable from 'react-table';

import * as uiPropTypes from '../store/uiPropTypes';

const AssetsTable = (props) => {
  const { assets } = props;

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
    }
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

  return (
    <ReactTable
      style={{ width: '100%' }}
      data={assets}
      columns={columns}
      showPagination={false}
      minRows={3}
    />
  );
};

AssetsTable.propTypes = {
  assets: uiPropTypes.assets.isRequired
};

export default AssetsTable;
