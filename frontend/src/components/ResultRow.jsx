import React from 'react';
import PropTypes from 'prop-types';


const emptyStr = '-';

class ResultRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleResultNameChange = this.handleResultNameChange.bind(this);
    this.handleResultNameKeyPress = this.handleResultNameKeyPress.bind(this);
    this.handleResultUpdate = this.handleResultUpdate.bind(this);

    const { result } = this.props;
    this.state = {
      resultName: result.name
    };
  }

  handleResultNameChange(e) {
    this.setState({
      resultName: e.target.value
    });
  }

  handleResultNameKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleResultUpdate();
    }
  }

  handleResultUpdate() {
    const { result, onResultUpdate } = this.props;
    const { resultName } = this.state;
    if (resultName !== result.name) {
      onResultUpdate({ ...result, name: resultName });
    }
  }

  render() {
    const { resultName } = this.state;
    const { result, stats } = this.props;
    const { args, logs } = result;

    const lastLog = logs[logs.length - 1] || {};
    const { logItems = [] } = lastLog;
    const lastLogDict = {};
    logItems.forEach((logItem) => { lastLogDict[logItem.key] = logItem.value; });

    const argDict = {};
    args.forEach((arg) => {
      argDict[arg.key] = arg.value;
    });
    const argElems = stats.argKeys.map((argKey) => {
      const content = (argKey in argDict) ? argDict[argKey] : emptyStr;
      return (<td key={`args-${argKey}`}>{(typeof content === 'boolean') ? String(content) : content}</td>);
    });

    return (
      <tr className="result-row">
        <td>{result.id}</td>
        <td>
          <input
            className="form-control result-name"
            type="text"
            placeholder={result.pathName}
            value={resultName || ''}
            onChange={this.handleResultNameChange}
            onKeyPress={this.handleResultNameKeyPress}
            onBlur={this.handleResultUpdate}
          />
        </td>
        <td>{lastLogDict.epoch}</td>
        <td>{lastLogDict.iteration}</td>
        <td>{lastLogDict.elapsed_time}</td>
        {argElems}
      </tr>
    );
  }
}

ResultRow.propTypes = {
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  stats: PropTypes.shape({
    argKeys: PropTypes.arrayOf(PropTypes.string)
  }),
  onResultUpdate: PropTypes.func.isRequired
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  }
};

export default ResultRow;

