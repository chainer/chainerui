import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class ExperimentsTableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);

    this.state = {
      showModal: false
    };
  }

  handleModalShow() {
    this.setState({
      showModal: true
    });
  }

  handleModalHide() {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div>
        <Button color="secondary" className="my-2" onClick={this.handleModalShow}>
          Table settings
        </Button>

        <Modal isOpen={this.state.showModal}>
          <ModalHeader>
            Edit Table Columns
          </ModalHeader>
          <ModalBody>
            body
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalHide}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ExperimentsTableConfigurator.propTypes = {};

ExperimentsTableConfigurator.defaultProps = {};

export default ExperimentsTableConfigurator;
