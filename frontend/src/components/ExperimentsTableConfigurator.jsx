import React from 'react';
import PropTypes from 'prop-types';
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
    console.log('ExperimentsTableConfigurator', this.props);
    const { stats = {} } = this.props;
    const {
      logKeys = [],
      argKeys = []
    } = stats;

    return (
      <div>
        <Button color="secondary" className="my-2" onClick={this.handleModalShow}>
          Table settings
        </Button>

        <Modal isOpen={this.state.showModal}>
          <ModalHeader>
            Edit table columns visibility
          </ModalHeader>
          <ModalBody>
            <p>
              logKeys
            </p>
            {
              logKeys.map((l) => <li key={l}>{l}</li>)
            }
            <hr />
            <p>
              argKeys
            </p>
            {
              argKeys.map((a) => <li key={a}>{a}</li>)
            }
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalHide}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ExperimentsTableConfigurator.propTypes = {
  stats: PropTypes.shape({
    logKeys: PropTypes.array,
    argKeys: PropTypes.array
  }).isRequired
};

ExperimentsTableConfigurator.defaultProps = {};

export default ExperimentsTableConfigurator;
