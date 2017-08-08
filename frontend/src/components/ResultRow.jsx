import React from 'react';
import PropTypes from 'prop-types';


class ResultRow extends React.Component {

  constructor(props, context) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    const { result, onToggle } = this.props;
    onToggle(result.id, e.target.checked);
  }

  render() {
    const { xpName, result, selected, onToggle } = this.props;
    const { logs } = result;
    const lastLog = logs[logs.length - 1] || {};
    return (
      <tr>
        <td>
          <input type="checkbox" aria-label="select single row" checked={selected} onChange={this.handleToggle} />
        </td>
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
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
};
ResultRow.defaultProps = {
  result: { logs: [] },
  selected: false,
  onToggle: () => {},
};

export default ResultRow;

