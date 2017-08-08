import React from 'react';


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
        <td>timestamp</td>
        <td></td>
        <td>{ lastLog.epoch }</td>
        <td>{ lastLog.iteration }</td>
        <td>{ lastLog.elapsed_time }</td>
      </tr>
    );
  }

}

ResultRow.propTypes = {
  xpName: React.PropTypes.string.isRequired,
  result: React.PropTypes.object,
};

ResultRow.defaultProps = {
  result: { logs: [] },
};

export default ResultRow;

