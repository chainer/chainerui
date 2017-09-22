import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  Button, Input,
  Modal, ModalHeader, ModalFooter, ModalBody
} from 'reactstrap';
import {
  displayProjectName,
  displayProjectNameFull,
  urlForPlot
} from '../../utils';


class ProjectRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditEnd = this.handleEditEnd.bind(this);
    this.handleEditCancel = this.handleEditCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNameKeyPress = this.handleNameKeyPress.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.toggleDeleteModal = this.toggleDeleteModal.bind(this);

    this.state = {
      isEditing: false,
      name: ''
    };
  }

  handleEditClick() {
    const { project } = this.props;

    this.setState({
      isEditing: true,
      isDeleteModalOpen: false,
      name: displayProjectNameFull(project)
    });
  }

  handleEditEnd() {
    const { project, onProjectUpdate } = this.props;
    const { name } = this.state;

    if (name !== project.name) {
      onProjectUpdate({ ...project, name });
    }

    this.setState({
      isEditing: false
    });
  }

  handleEditCancel() {
    this.setState({
      isEditing: false
    });
  }

  handleDelete() {
    const { project, onProjectDelete } = this.props;

    onProjectDelete(project.id);
  }

  handleNameKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleEditEnd();
    }
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  toggleDeleteModal() {
    this.setState({
      isDeleteModalOpen: !this.state.isDeleteModalOpen
    });
  }

  render() {
    const { project } = this.props;
    const { isEditing, isDeleteModalOpen, name } = this.state;

    const nameElem = isEditing ? (
      <Input
        type="text"
        autoFocus
        value={name}
        onChange={this.handleNameChange}
        onKeyPress={this.handleNameKeyPress}
      />
    ) : (
      <h4>
        <Link to={urlForPlot(project.id)}>{displayProjectName(project)}</Link>
      </h4>
    );

    const controlElem = isEditing ? (
      <div>
        <Button size="sm" color="primary" onClick={this.handleEditEnd}>Save</Button>
        <span className="ml-2">or</span>
        <Button size="sm" color="link" onClick={this.handleEditCancel}>Cancel</Button>
      </div>
    ) : (
      <div>
        <Button className="mx-2" size="sm" onClick={this.handleEditClick}>Edit</Button>
        <Button size="sm" onClick={this.toggleDeleteModal}>Delete</Button>
      </div>
    );

    return (
      <div className="project-row py-4 border border-top-0 border-left-0 border-right-0">
        <div className="mb-1 d-flex flex-row">
          <div>{nameElem}</div>
          <div className="ml-auto">
            {controlElem}
          </div>
        </div>
        <div>
          <p className="mb-0 text-secondary">
          # {project.id}
          </p>
          <p className="mb-0 text-secondary">
            {project.pathName}
          </p>
        </div>
        <Modal isOpen={isDeleteModalOpen}>
          <ModalHeader>Delete a proect</ModalHeader>
          <ModalBody>
              Are you sure to delete {displayProjectName(project)} ?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
            <Button color="danger" onClick={this.handleDelete}>Delete</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ProjectRow.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  }),
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired
};

ProjectRow.defaultProps = {
  project: {
    id: undefined,
    name: undefined,
    pathName: undefined
  }
};

export default ProjectRow;

