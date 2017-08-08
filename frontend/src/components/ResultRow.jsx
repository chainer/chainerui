import React from 'react';
import PropTypes from 'prop-types';


const emptyStr = '-';

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
    const { xpName, argKeys, result, selected, onToggle } = this.props;
    const { logs, args } = result;
    const lastLog = logs[logs.length - 1] || {};

    const argKeyElems = argKeys.map((argKey) => {
      const content = (argKey in result.args) ? result.args[argKey] : emptyStr;
      return (<td key={'args-' + argKey}>{content}</td>);
    });

    return (
      <tr>
        <td>
          <input type="checkbox" aria-label="select single row" checked={selected} onChange={this.handleToggle} />
        </td>
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
  argKeys: PropTypes.array.isRequired,
  result: PropTypes.object,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
};
ResultRow.defaultProps = {
  result: { logs: [], args: {} },
  selected: false,
  onToggle: () => {},
};

export default ResultRow;

