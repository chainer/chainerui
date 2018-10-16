import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

const Assets = (props) => {
  const { assets } = props;

  console.log({ assets });

  const trainInfoKeys = assets.map((asset) => Object.keys(asset.train_info)).flatten();
  const uniqueTrainInfoKeys = [...new Set(trainInfoKeys)];

  console.log({ uniqueTrainInfoKeys });

  const contentKeys = assets.map((asset) => asset.contents.map((content) => content.tag)).flatten();
  const uniqueContentKeys = [...new Set(contentKeys)];

  console.log({ uniqueContentKeys });

  const trainInfoColumns = uniqueTrainInfoKeys.map((k) => ({
    Header: k,
    id: k,
    accessor: (p) => {
      const trainInfo = p.train_info;
      return trainInfo[k];
    }
  }));

  const contentColumns = uniqueContentKeys.map((k) => ({
    Header: k,
    id: k,
    Cell: (p) => {
      const { original } = p;
      // console.log({ original });
      const selectedContent = original.contents.find((content) => content.tag === k);
      // console.log({ selectedContent });
      return (
        <img
          src={selectedContent.uri}
          alt={selectedContent.tag}
        />
      );
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

Assets.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.shape({
    contents: PropTypes.objectOf(PropTypes.any),
    trainInfo: PropTypes.objectOf(PropTypes.any)
  })).isRequired
};

Assets.defaultProps = {
  assets: []
};

export default Assets;
