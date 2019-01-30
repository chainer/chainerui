import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';


const GroupingCheckBox = ({ checked, onChange }) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for
  <label className="ml-2 fa-xs">
    <i
      className={`fas fa-folder${checked ? '' : '-open'}`}
    />
    <input
      type="checkbox"
      style={{ display: 'none' }}
      checked={checked}
      onChange={onChange}
    />
  </label>
);


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
      hiddenArgKeys = [],
      isGrouped = false
    } = tableState;

    if (prefix === 'logKey') {
      const nextHiddenLogKeys = !event.target.checked
        ? hiddenLogKeys.concat(event.target.name)
        : hiddenLogKeys.filter((vk) => vk !== event.target.name);

      this.props.onTableColumnsVisibilityUpdate(
        this.props.project.id, nextHiddenLogKeys, hiddenArgKeys, isGrouped);
    } else {
      const nextHiddenArgKeys = !event.target.checked
        ? hiddenArgKeys.concat(event.target.name)
        : hiddenArgKeys.filter((vk) => vk !== event.target.name);

      this.props.onTableColumnsVisibilityUpdate(
        this.props.project.id, hiddenLogKeys, nextHiddenArgKeys, isGrouped);
    }
  }

  handleIsGrouped(event) {
    const { tableState } = this.props.projectConfig;

    this.props.onTableColumnsVisibilityUpdate(
      this.props.project.id, tableState.hiddenLogKeys, tableState.hiddenArgKeys,
      event.target.checked
    );
  }

  render() {
    const { stats, projectConfig } = this.props;
    const { logKeys, argKeys } = stats;
    const { tableState } = projectConfig;
    const {
      hiddenLogKeys = [],
      hiddenArgKeys = [],
      isGrouped = false
    } = tableState;

    return (
      <div>
        <Button color="secondary" className="my-2" onClick={this.handleModalShow}>
          Table settings
        </Button>
        <GroupingCheckBox
          checked={isGrouped}
          onChange={(e) => this.handleIsGrouped(e)}
        />

        <Modal isOpen={this.state.showModal} toggle={this.handleModalHide}>
          <ModalHeader>
            Edit table columns visibility
          </ModalHeader>
          <ModalBody>
            <Form>
              <legend>Log Keys</legend>
              {
                logKeys.map((l) => (
                  <Check
                    key={`logKey.${l}`}
                    type="checkbox"
                    name={l}
                    checked={!hiddenLogKeys.find((vk) => vk === l)}
                    onChange={(e) => this.handleChange('logKey', e)}
                  >{l}</Check>
                ))
              }
              <hr />
              <legend>Arg Keys</legend>
              {
                argKeys.map((a) => (
                  <Check
                    key={`argKey.${a}`}
                    type="checkbox"
                    name={a}
                    checked={!hiddenArgKeys.find((va) => va === a)}
                    onChange={(e) => this.handleChange('argKey', e)}
                  >{a}</Check>
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

GroupingCheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

ExperimentsTableConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  stats: uiPropTypes.stats.isRequired,
  onTableColumnsVisibilityUpdate: PropTypes.func.isRequired
};

export default ExperimentsTableConfigurator;
