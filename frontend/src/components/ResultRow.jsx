import React from 'react';
import PropTypes from 'prop-types';


const emptyStr = '-';

class ResultRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    const { result, onToggle } = this.props;
    onToggle(result.id, e.target.checked);
  }

  render() {
    const { xpName, argKeys, result, selected, color } = this.props;
    const { logs } = result;
    const lastLog = logs[logs.length - 1] || {};
    const colorCellStyle = selected ? { backgroundColor: color } : {};

    const argKeyElems = argKeys.map((argKey) => {
      const content = (argKey in result.args) ? result.args[argKey] : emptyStr;
      return (<td key={`args-${argKey}`}>{content}</td>);
    });

    return (
      <tr>
        <td>
          <input type="checkbox" aria-label="select single row" checked={selected} onChange={this.handleToggle} />
        </td>
        <td style={colorCellStyle} />
        <td>{ xpName }</td>
        <td>{ result.name }</td>
        {argKeyElems}
        <td>{ lastLog.epoch }</td>
        <td>{ lastLog.iteration }</td>
        <td>{ lastLog.elapsed_time }</td>
      </tr>
    );
  }
}

ResultRow.propTypes = {
  xpName: PropTypes.string.isRequired,
  argKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  result: PropTypes.shape({
    logs: PropTypes.arrayOf(PropTypes.any),
    args: PropTypes.any
  }),
  selected: PropTypes.bool,
  color: PropTypes.string,
  onToggle: PropTypes.func
};
ResultRow.defaultProps = {
  result: { logs: [], args: {} },
  selected: false,
  color: '',
  onToggle: () => {}
};

export default ResultRow;

