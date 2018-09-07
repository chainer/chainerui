import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Form
} from 'reactstrap';

class ExperimentsTableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

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

  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.checked);
    this.setState({
      showModal: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    // this.onTableConfigUpdate()
    this.setState({
      showModal: true
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
            <Form>
              <legend>Log Keys</legend>
              {
                logKeys.map((l) => (
                  <FormGroup check key={`logKey${l}`}>
                    <Label check>
                      <Input type="checkbox" name={`logKey.${l}`} onChange={this.handleChange} />
                      {` ${l}`}
                    </Label>
                  </FormGroup>
                ))
              }
              <hr />
              <legend>Arg Keys</legend>
              {
                argKeys.map((a) => (
                  <FormGroup check key={`argKey${a}`}>
                    <Label check>
                      <Input type="checkbox" />
                      {` ${a}`}
                    </Label>
                  </FormGroup>
                ))
              }
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalHide}>Close</Button>
            <Button color="primary" onClick={this.handleSubmit}>Save</Button>
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
