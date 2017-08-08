import React from 'react';
import PropTypes from 'prop-types';


class ResultRow extends React.Component {

  constructor(props, context) {
    super(props);

    this.state = {};

  }

  render() {
    const { xpName, result } = this.props;
    const { logs } = result;
    const lastLog = logs[logs.length - 1] || {};
    return (
      <tr>
        <td>{ xpName }</td>
        <td>{ result.name }</td>
        <td>{ Date.now() }</td>
        <td></td>
        <td>{ lastLog.epoch }</td>
        <td>{ lastLog.iteration }</td>
        <td>{ lastLog.elapsed_time }</td>
      </tr>
    );
  }

}

ResultRow.propTypes = {
  xpName: PropTypes.string.isRequired,
  result: PropTypes.object,
};
ResultRow.defaultProps = {
  result: { logs: [] },
};

export default ResultRow;

