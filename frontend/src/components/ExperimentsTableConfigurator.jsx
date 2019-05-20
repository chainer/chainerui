import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';

class ExperimentsTableConfigurator extends React.Component {
  constructor(props) {
    super(props);
    this.handleIsGrouped = this.handleIsGrouped.bind(this);
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);
    this.handleResultRestore = this.handleResultRestore.bind(this);

    this.state = {
      showModal: false,
    };
  }

  handleModalShow() {
    this.props.getDeletedResultList(this.props.project.id);
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

  handleResultRestore(result) {
    const newResult = { ...result, isUnregistered: false };

    this.props.onResultUpdate(this.props.project.id, newResult);
    this.props.getDeletedResultList(this.props.project.id);
  }

  render() {
    const { projectConfig, deletedResults } = this.props;
    const { tableState } = projectConfig;
    const {
      isGrouped = false,
    } = tableState;
    const deletedResultKeys = Object.keys(deletedResults);

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

        <div className="mt-2">
          <Button color="secondary" onClick={this.handleModalShow}>
            Manage unregistered results
          </Button>
        </div>

        <Modal isOpen={this.state.showModal} toggle={this.handleModalHide}>
          <ModalHeader toggle={this.handleModalHide}>
            Manage unregistered results
          </ModalHeader>
          <ModalBody>
            { deletedResultKeys.length === 0
              ? (<p>There are no unregistered results.</p>)
              : null
            }
            <Table borderless>
              <tbody>
                { deletedResultKeys.map((rId) => (
                  <tr key={rId}>
                    <td>
                      {`${deletedResults[rId].name}, ${deletedResults[rId].pathName}`}
                    </td>
                    <td>
                      <Button onClick={() => this.handleResultRestore(deletedResults[rId])} size="sm">Restore</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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
  deletedResults: uiPropTypes.deletedResults.isRequired,
  onResultUpdate: PropTypes.func.isRequired,
  getDeletedResultList: PropTypes.func.isRequired,
};

export default ExperimentsTableConfigurator;
