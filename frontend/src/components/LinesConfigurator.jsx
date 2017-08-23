import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Utils from '../utils';
import LinesConfiguratorRow from './LinesConfiguratorRow';
import LineConfigurator from './LineConfigurator';


const defaultLine = {
  config: {
    color: '#ABCDEF'
  }
};

class LinesConfigurator extends React.Component {
  constructor() {
    super();

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleAddingLineChange = this.handleAddingLineChange.bind(this);
    this.handleAxisConfigLineAdd = this.handleAxisConfigLineAdd.bind(this);
    this.handleAxisConfigLineRemove = this.handleAxisConfigLineRemove.bind(this);

    this.state = {
      showModal: false,
      addingLine: defaultLine
    };
  }

  handleModalToggle() {
    const newAddingLine = this.state.showModal ? defaultLine : this.state.addingLine;
    this.setState({
      showModal: !this.state.showModal,
      addingLine: newAddingLine
    });
  }

  handleAddingLineChange(newLine) {
    this.setState({
      addingLine: newLine,
      showLineConfigError: false
    });
  }

  handleAxisConfigLineAdd() {
    const { axisName, onAxisConfigLineAdd, lines } = this.props;
    const { addingLine } = this.state;

    const hasSameLine = !![
      ...lines.filter((l) => l.resultId === addingLine.resultId && l.logKey === addingLine.logKey
      )].length;

    if (addingLine.resultId == null || addingLine.logKey == null || hasSameLine) {
      // invalid or hasSameLine
      this.setState({
        showLineConfigError: true
      });
    } else {
      onAxisConfigLineAdd(axisName, addingLine);
      this.handleModalToggle();
    }
  }

  handleAxisConfigLineRemove(lineKey) {
    const { axisName, onAxisConfigLineRemove } = this.props;
    onAxisConfigLineRemove(axisName, lineKey);
  }

  render() {
    const { line2key } = Utils;
    const { results, lines = [] } = this.props;
    const { addingLine, showLineConfigError } = this.state;

    const lineConfiguratorElems = lines.map((line) => {
      const result = results[line.resultId] || {};

      return (
        <LinesConfiguratorRow
          line={line}
          result={result}
          onRemove={this.handleAxisConfigLineRemove}
          key={line2key(line)}
        />
      );
    });

    return (
      <ul className="list-group list-group-flush">
        {lineConfiguratorElems}
        <li className="list-group-item text-right">
          <button
            type="button"
            className="btn btn-default btn-xs"
            onClick={this.handleModalToggle}
          >
            <span className="glyphicon glyphicon-plus" /> Add
          </button>

          <Modal isOpen={this.state.showModal} toggle={this.handleModalToggle} className="">
            <ModalHeader toggle={this.handleModalToggle}>Modal title</ModalHeader>
            <ModalBody>
              <LineConfigurator
                results={results}
                line={addingLine}
                showError={showLineConfigError}
                onChange={this.handleAddingLineChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.handleModalToggle}>Cancel</Button>{' '}
              <Button color="primary" onClick={this.handleAxisConfigLineAdd}>Add</Button>
            </ModalFooter>
          </Modal>

        </li>
      </ul>
    );
  }
}

LinesConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  axisName: PropTypes.string.isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      resultId: PropTypes.number,
      logKey: PropTypes.string
    })
  ),
  onAxisConfigLineAdd: PropTypes.func.isRequired,
  onAxisConfigLineRemove: PropTypes.func.isRequired
};

LinesConfigurator.defaultProps = {
  lines: []
};

export default LinesConfigurator;

