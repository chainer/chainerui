import React from 'react';
import PropTypes from 'prop-types';


const ResultRow = (props) => {
  const { result } = props;
  const { logs } = result;
  const lastLog = logs[logs.length - 1] || {};
  const lastLogDict = {};
  lastLog.logItems.forEach((logItem) => { lastLogDict[logItem.key] = logItem.value; });

  return (
    <tr>
      <td>{result.id}</td>
      <td>{result.pathName}</td>
      <td>{lastLogDict.epoch}</td>
      <td>{lastLogDict.iteration}</td>
      <td>{lastLogDict.elapsed_time}</td>
    </tr>
  );
};

ResultRow.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired
};

export default ResultRow;

