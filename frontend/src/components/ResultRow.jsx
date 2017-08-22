import React from 'react';
import PropTypes from 'prop-types';


const emptyStr = '-';

const ResultRow = (props) => {
  const { result, stats } = props;
  const { args, logs } = result;

  const lastLog = logs[logs.length - 1] || {};
  const lastLogDict = {};
  lastLog.logItems.forEach((logItem) => { lastLogDict[logItem.key] = logItem.value; });

  const argDict = {};
  args.forEach((arg) => {
    argDict[arg.key] = arg.value;
  });
  const argElems = stats.argKeys.map((argKey) => {
    const content = (argKey in argDict) ? argDict[argKey] : emptyStr;
    return (<td key={`args-${argKey}`}>{content}</td>);
  });

  return (
    <tr>
      <td>{result.id}</td>
      <td>{result.pathName}</td>
      <td>{lastLogDict.epoch}</td>
      <td>{lastLogDict.iteration}</td>
      <td>{lastLogDict.elapsed_time}</td>
      {argElems}
    </tr>
  );
};

ResultRow.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  })
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  }
};

export default ResultRow;

