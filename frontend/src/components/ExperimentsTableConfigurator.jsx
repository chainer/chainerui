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

  handleChange(prefix, event) {
    const { projectConfig } = this.props;
    const { tableState } = projectConfig;
    const {
      hiddenLogKeys = [],
      hiddenArgKeys = []
    } = tableState;

    if (prefix === 'logKey') {
      const nextHiddenLogKeys = !event.target.checked
        ? hiddenLogKeys.concat(event.target.name)
        : hiddenLogKeys.filter((vk) => vk !== event.target.name);

      this.props.onTableColumnsVisibilityUpdate(
        this.props.project.id, nextHiddenLogKeys, hiddenArgKeys);
    } else {
      const nextHiddenArgKeys = !event.target.checked
        ? hiddenArgKeys.concat(event.target.name)
        : hiddenArgKeys.filter((vk) => vk !== event.target.name);

      this.props.onTableColumnsVisibilityUpdate(
        this.props.project.id, hiddenLogKeys, nextHiddenArgKeys);
    }
  }

  render() {
    const { stats = {}, projectConfig } = this.props;
    const { tableState } = projectConfig;
    const {
      logKeys = [],
      argKeys = []
    } = stats;
    const {
      hiddenLogKeys = [],
      hiddenArgKeys = []
    } = tableState;

    return (
      <div>
        <Button color="secondary" className="my-2" onClick={this.handleModalShow}>
          Table settings
        </Button>

        <Modal isOpen={this.state.showModal} toggle={this.handleModalHide}>
          <ModalHeader>
            Edit table columns visibility
          </ModalHeader>
          <ModalBody>
            <Form>
              <legend>Log Keys</legend>
              {
                logKeys.map((l) => (
                  <FormGroup check key={`logKey.${l}`}>
                    <Label check>
                      <Input
                        type="checkbox"
                        name={l}
                        checked={!hiddenLogKeys.some((vk) => vk === l)}
                        onChange={(e) => this.handleChange('logKey', e)}
                      />
                      {` ${l}`}
                    </Label>
                  </FormGroup>
                ))
              }
              <hr />
              <legend>Arg Keys</legend>
              {
                argKeys.map((a) => (
                  <FormGroup check key={`argKey.${a}`}>
                    <Label check>
                      <Input
                        type="checkbox"
                        name={a}
                        checked={!hiddenArgKeys.some((va) => va === a)}
                        onChange={(e) => this.handleChange('argKey', e)}
                      />
                      {` ${a}`}
                    </Label>
                  </FormGroup>
                ))
              }
            </Form>
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
  project: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  projectConfig: PropTypes.shape({
    hiddenLogKeys: PropTypes.array,
    hiddenArgKeys: PropTypes.array
  }).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.array,
    argKeys: PropTypes.array
  }).isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired
};

ExperimentsTableConfigurator.defaultProps = {};

export default ExperimentsTableConfigurator;
