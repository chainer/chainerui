import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import { line2key, getSelectedResults, getSelectedLogKeys, createLine } from '../utils';
import LinesConfiguratorRow from './LinesConfiguratorRow';
import LineConfigurator from './LineConfigurator';


class LinesConfigurator extends React.Component {
  constructor() {
    super();

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleEditingLineChange = this.handleEditingLineChange.bind(this);
    this.handleAxisConfigLineSave = this.handleAxisConfigLineSave.bind(this);
    this.handleLineVisibilityUpdate = this.handleLineVisibilityUpdate.bind(this);
    this.toggleLinesConfig = this.toggleLinesConfig.bind(this);

    this.state = {
      showModal: false,
      showLinesConfig: false,
      editingLine: undefined
    };
  }

  handleModalToggle() {
    if (this.state.showModal) {
      this.handleModalClose();
    } else {
      this.handleModalOpen();
    }
  }

  handleModalOpen(line) {
    this.setState({
      showModal: true,
      targetLineKey: line2key(line),
      editingLine: line
    });
  }

  handleModalClose() {
    this.setState({
      showModal: false
    });
  }

  handleEditingLineChange(newLine) {
    this.setState({
      editingLine: newLine
    });
  }

  handleAxisConfigLineSave() {
    const {
      project,
      axisName,
      onAxisConfigLineUpdate
    } = this.props;
    const { targetLineKey, editingLine } = this.state;
    onAxisConfigLineUpdate(project.id, axisName, targetLineKey, editingLine);
    this.handleModalClose();
  }

  handleLineVisibilityUpdate(targetLineKey, line) {
    const { project, axisName, onAxisConfigLineUpdate } = this.props;
    onAxisConfigLineUpdate(project.id, axisName, targetLineKey, line);
  }

  toggleLinesConfig() {
    this.setState({
      showLinesConfig: !this.state.showLinesConfig
    });
  }

  render() {
    const { axisName, project, results, stats, projectConfig, globalConfig } = this.props;
    const { editingLine } = this.state;
    const { logKeys = [] } = stats;
    const { axes = {}, resultsConfig = {}, lines = {} } = projectConfig;
    const axisConfig = axes[axisName] || {};
    const { logKeysConfig = {} } = axisConfig;
    const { isResultNameAlignRight } = globalConfig;

    const selectedResults = getSelectedResults(results, resultsConfig);
    const selectedLogKeys = getSelectedLogKeys(logKeysConfig);
    const lineConfiguratorElems = [];
    selectedResults.forEach((resultId) => {
      const result = results[resultId];
      if (!result) {
        return;
      }
      selectedLogKeys.forEach((logKey) => {
        const line = lines[line2key({ resultId, logKey })] ||
          createLine(resultId, logKey, results, logKeys);
        lineConfiguratorElems.push(
          <LinesConfiguratorRow
            line={line}
            project={project}
            result={result}
            isResultNameAlignRight={isResultNameAlignRight}
            onEditClick={this.handleModalOpen}
            onVisibilityUpdate={this.handleLineVisibilityUpdate}
            key={line2key(line)}
          />
        );
      });
    });

    return (
      <div className="list-group list-group-flush">
        <div className="list-group-item">
          <Button size="sm" className="my-2" onClick={this.toggleLinesConfig}>Toggle lines setting</Button>
        </div>
        <Collapse isOpen={this.state.showLinesConfig}>
          {lineConfiguratorElems}
        </Collapse>
        <div className="list-group-item text-right">
          <Modal isOpen={this.state.showModal} toggle={this.handleModalToggle} className="">
            <ModalHeader toggle={this.handleModalToggle}>Edit a line</ModalHeader>
            <ModalBody>
              <LineConfigurator
                project={project}
                results={results}
                line={editingLine}
                stats={stats}
                isResultNameAlignRight={isResultNameAlignRight}
                onChange={this.handleEditingLineChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.handleModalToggle}>Cancel</Button>{' '}
              <Button
                color="primary"
                onClick={this.handleAxisConfigLineSave}
              >Save</Button>
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}

LinesConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  axisName: uiPropTypes.axisName.isRequired,
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired
};

LinesConfigurator.defaultProps = {
};

export default LinesConfigurator;

