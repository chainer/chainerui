import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal, ModalHeader, ModalFooter, ModalBody
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import AxesConfigurator from './AxesConfigurator';


class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleConfigReset = this.handleConfigReset.bind(this);

    this.state = {
      showModal: false
    };
  }

  handleModalToggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleConfigReset() {
    const { project, onProjectConfigReset } = this.props;
    this.handleModalToggle();
    onProjectConfigReset(project.id);
  }

  render() {
    const {
      project,
      results,
      stats,
      projectConfig,
      globalConfig,
      onAxisConfigLineUpdate,
      onAxisConfigScaleUpdate,
      onAxisConfigXKeyUpdate,
      onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate,
      onAxisConfigLogKeySelectToggle
    } = this.props;

    return (
      <div className="side-bar">
        <AxesConfigurator
          {
          ...{
            project,
            results,
            stats,
            projectConfig,
            globalConfig,
            onAxisConfigLineUpdate,
            onAxisConfigScaleUpdate,
            onAxisConfigXKeyUpdate,
            onAxisConfigScaleRangeTypeUpdate,
            onAxisConfigScaleRangeNumberUpdate,
            onAxisConfigLogKeySelectToggle
          }
          }
        />
        <Button color="primary" className="m-2" onClick={this.handleModalToggle}>
        Reset settings
        </Button>
        <Modal isOpen={this.state.showModal} toggle={this.handleModalToggle} className="">
          <ModalHeader toggle={this.handleModalToggle}>Reset settings</ModalHeader>
          <ModalBody>
            Are you sure to reset settings?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalToggle}>Cancel</Button>
            <Button color="primary" className="mx-2" onClick={this.handleConfigReset}>Reset</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

SideBar.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  onProjectConfigReset: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

SideBar.defaultProps = {
};

export default SideBar;

