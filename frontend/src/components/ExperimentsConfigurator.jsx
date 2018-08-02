import React from 'react';
import PropTypes from 'prop-types';
import { Button, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ExperimentsConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.handleLogKeyToggle = this.handleLogKeyToggle.bind(this);
    this.handleArgKeyToggle = this.handleArgKeyToggle.bind(this);

    this.state = {
      showModal: false
    };
  }

  handleModalToggle() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleLogKeyToggle(e) {
    const { name, checked } = e.target;
    this.updateExperimentsKeys('logKeys', name, checked);
  }

  handleArgKeyToggle(e) {
    const { name, checked } = e.target;
    this.updateExperimentsKeys('argKeys', name, checked);
  }

  updateExperimentsKeys(key, name, checked) {
    const { stats, projectConfig, project, onExperimentsConfigUpdate } = this.props;
    const shown = {};
    projectConfig.experiments[key].forEach((n) => {
      shown[n] = true;
    });
    shown[name] = checked;
    const keys = stats[key].filter((n) => shown[n]);
    onExperimentsConfigUpdate(project.id, {
      ...projectConfig.experiments,
      [key]: keys
    });
  }

  render() {
    const { stats, projectConfig } = this.props;
    const groupElems = [
      {
        key: 'logKeys',
        label: 'Log keys',
        handleMethod: 'handleLogKeyToggle'
      },
      {
        key: 'argKeys',
        label: 'Arg keys',
        handleMethod: 'handleArgKeyToggle'
      }
    ].map(({ key, label, handleMethod }) => {
      const shown = {};
      projectConfig.experiments[key].forEach((name) => {
        shown[name] = true;
      });
      return (
        <div key={key} className="form-group">
          <div className="col-form-label">{label}</div>
          {stats[key].map((name) => (
            <div key={name} className="form-check">
              <Label check>
                <Input
                  type="checkbox"
                  name={name}
                  checked={shown[name] || false}
                  onChange={this[handleMethod]}
                /> {name}
              </Label>
            </div>
          ))}
        </div>
      );
    });

    return (
      <div>
        <Button color="primary" className="m-2" onClick={this.handleModalToggle}>
          Table settings
        </Button>
        <Modal isOpen={this.state.showModal} toggle={this.handleModalToggle} className="">
          <ModalHeader toggle={this.handleModalToggle}>Edit table columns</ModalHeader>
          <ModalBody>
            {groupElems}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleModalToggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ExperimentsConfigurator.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number
  }).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string),
    argKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  projectConfig: PropTypes.shape({
    experiments: PropTypes.shape({
      logKeys: PropTypes.arrayOf(PropTypes.string),
      argKeys: PropTypes.arrayOf(PropTypes.string)
    })
  }).isRequired,
  onExperimentsConfigUpdate: PropTypes.func.isRequired
};

ExperimentsConfigurator.defaultProps = {
};

export default ExperimentsConfigurator;
