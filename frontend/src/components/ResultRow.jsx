import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
  displayResultName,
  truncate,
  getLastLogDict,
  argValue2string,
  urlForResultDetail
} from '../utils';


const emptyStr = '-';

class ResultRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelectToggle = this.handleSelectToggle.bind(this);
    this.handleResultNameChange = this.handleResultNameChange.bind(this);
    this.handleResultNameKeyPress = this.handleResultNameKeyPress.bind(this);
    this.handleResultUpdate = this.handleResultUpdate.bind(this);
    this.handleUnregister = this.handleUnregister.bind(this);
    this.toggleUnregisterModal = this.toggleUnregisterModal.bind(this);

    const { result } = this.props;
    this.state = {
      resultName: result.name
    };
  }

  handleSelectToggle() {
    const { projectId, result, resultConfig, onResultsConfigSelectUpdate } = this.props;
    onResultsConfigSelectUpdate(projectId, result.id, !resultConfig.hidden);
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
    const { projectId, result, onResultUpdate } = this.props;
    const { resultName } = this.state;
    if (resultName !== result.name) {
      onResultUpdate(projectId, { ...result, name: resultName });
    }
  }

  handleUnregister() {
    const { projectId, result, onResultUpdate } = this.props;
    onResultUpdate(projectId, { ...result, isUnregistered: true });
    this.toggleUnregisterModal();
  }

  toggleUnregisterModal() {
    this.setState({
      showUnregisterModal: !this.state.showUnregisterModal
    });
  }

  render() {
    const { resultName, showUnregisterModal } = this.state;
    const { projectId, result, stats, resultConfig } = this.props;
    const { args } = result;

    const lastLogDict = getLastLogDict(result);

    const argDict = {};
    args.forEach((arg) => {
      argDict[arg.key] = arg.value;
    });
    const argElems = stats.argKeys.map((argKey) => (<td key={`args-${argKey}`}>{argValue2string(argDict[argKey])}</td>));

    return (
      <tr className="result-row">
        <td>
          <input type="checkbox" checked={!resultConfig.hidden} onChange={this.handleSelectToggle} />
        </td>
        <td>
          <Link to={urlForResultDetail(projectId, result.id)}>{result.id}</Link>
        </td>
        <td>
          <input
            className="form-control result-name"
            type="text"
            placeholder={truncate(result.pathName, { length: 22, forward: true })}
            value={resultName || ''}
            onChange={this.handleResultNameChange}
            onKeyPress={this.handleResultNameKeyPress}
            onBlur={this.handleResultUpdate}
          />
        </td>
        <td className="text-right">{lastLogDict.epoch}</td>
        <td className="text-right">{lastLogDict.iteration}</td>
        <td className="text-right">
          {lastLogDict.elapsed_time == null ? emptyStr : lastLogDict.elapsed_time.toFixed(2)}
        </td>
        {argElems}
        <td>
          <Button className="close" aria-label="Close" onClick={this.toggleUnregisterModal}>
            <span aria-hidden>&times;</span>
          </Button>
          <Modal isOpen={showUnregisterModal}>
            <ModalHeader>Unregister a result</ModalHeader>
            <ModalBody>
              Are you sure to unregister {displayResultName(result)} ?
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleUnregisterModal}>Cancel</Button>
              <Button color="danger" onClick={this.handleUnregister}>Unregister</Button>
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    );
  }
}

ResultRow.propTypes = {
  projectId: PropTypes.number.isRequired,
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
  resultConfig: PropTypes.shape({
    hidden: PropTypes.bool
  }),
  onResultsConfigSelectUpdate: PropTypes.func.isRequired,
  onResultUpdate: PropTypes.func.isRequired
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  },
  resultConfig: { hidden: false }
};

export default ResultRow;

