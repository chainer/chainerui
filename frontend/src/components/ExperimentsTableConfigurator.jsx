import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';

class ExperimentsTableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsGrouped = this.handleIsGrouped.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);

    this.state = {
      showModal: false,
    };
  }

  handleModalShow() {
    this.setState({
      showModal: true,
    });
  }

  handleModalHide() {
    this.setState({
      showModal: false,
    });
  }

  handleIsGrouped(event) {
    const { tableState } = this.props.projectConfig;

    this.props.onTableColumnsVisibilityUpdate(
      this.props.project.id, tableState.hiddenLogKeys, tableState.hiddenArgKeys,
      event.target.checked
    );
  }

  render() {
    const { projectConfig, deletedResults } = this.props;
    const { tableState } = projectConfig;
    const {
      isGrouped = false,
    } = tableState;

    return (
      <div>
        <div className="form-inline">
          <Check
            type="checkbox"
            className="ml-2"
            checked={isGrouped}
            onChange={this.handleIsGrouped}
          >
            Grouping
          </Check>
        </div>

        <Button color="secondary" onClick={this.handleModalShow}>
          Manage unregistered results
        </Button>

        <Modal isOpen={this.state.showModal} toggle={this.handleModalHide}>
          <ModalHeader>
            Manage unregistered results
          </ModalHeader>
          <ModalBody>
            { Object.keys(deletedResults).length }
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ExperimentsTableConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired,
};

export default ExperimentsTableConfigurator;
