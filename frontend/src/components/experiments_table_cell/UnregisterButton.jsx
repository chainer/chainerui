import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

import {
  displayResultNameFull
} from '../../utils';

class UnregisterButton extends React.Component {
  constructor(props) {
    super(props);
    this.toggleUnregisterModal = this.toggleUnregisterModal.bind(this);

    this.state = {
      showUnregisterModal: false
    };
  }

  handleUnregister() {
    const { project, result, onResultUpdate } = this.props;
    onResultUpdate(project.id, { ...result, isUnregistered: true });
    this.toggleUnregisterModal();
  }

  toggleUnregisterModal() {
    this.setState({
      showUnregisterModal: !this.state.showUnregisterModal
    });
  }

  render() {
    const { showUnregisterModal } = this.state;
    const { project, result } = this.props;
    return (
      <div>
        <Button className="close" aria-label="Close" onClick={this.toggleUnregisterModal}>
          <span aria-hidden>&times;</span>
        </Button>
        <Modal isOpen={showUnregisterModal}>
          <ModalHeader>Unregister a result</ModalHeader>
          <ModalBody>
            Are you sure to unregister {displayResultNameFull(project, result)} ?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleUnregisterModal}>Cancel</Button>
            <Button color="danger" onClick={this.handleUnregister}>Unregister</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

UnregisterButton.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string
  }).isRequired,
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  onResultUpdate: PropTypes.func.isRequired
};

export default UnregisterButton;
