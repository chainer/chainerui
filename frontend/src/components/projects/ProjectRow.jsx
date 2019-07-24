import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  Button, Input,
  Modal, ModalHeader, ModalFooter, ModalBody,
} from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';
import {
  displayProjectName,
  displayProjectNameFull,
  urlForPlot,
} from '../../utils';


const ProjectRow = ({ project, onProjectUpdate, onProjectDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [name, setName] = useState('');

  const onEditClick = useCallback(() => {
    setIsEditing(true);
    setName(displayProjectNameFull(project));
  }, [project]);

  const onEditSaveClick = useCallback(() => {
    if (name !== project.name) {
      onProjectUpdate({ ...project, name });
    }

    setIsEditing(false);
  }, [project, onProjectUpdate, name]);

  const onEditCancelClick = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onNameKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      onEditSaveClick();
    }
  }, [onEditSaveClick]);

  const onDeleteModalToggleClick = useCallback(() => {
    setIsDeleteModalOpen((prevIsDeleteModalOpen) => !prevIsDeleteModalOpen);
  }, []);

  const onDeleteClick = useCallback(() => {
    onProjectDelete(project.id);
  }, [project, onProjectDelete]);

  return (
    <div className="py-4 border-bottom">
      {isEditing ? (
        <div className="mb-1 d-flex flex-row">
          <div>
            <Input
              type="text"
              autoFocus
              value={name}
              onChange={onNameChange}
              onKeyPress={onNameKeyPress}
            />
          </div>
          <div className="ml-auto">
            <Button size="sm" color="primary" onClick={onEditSaveClick}>Save</Button>
            <span className="ml-2">or</span>
            <Button size="sm" color="link" onClick={onEditCancelClick}>Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="mb-1 d-flex flex-row">
          <h4>
            <Link to={urlForPlot(project.id)}>{displayProjectName(project)}</Link>
          </h4>
          <div className="ml-auto">
            <Button className="mx-2" size="sm" onClick={onEditClick}>Edit</Button>
            <Button size="sm" onClick={onDeleteModalToggleClick}>Delete</Button>
          </div>
        </div>
      )}
      <p className="mb-0 text-secondary">
        {'# '}
        {project.id}
      </p>
      <p className="mb-0 text-secondary">
        {project.pathName}
      </p>
      <Modal isOpen={isDeleteModalOpen}>
        <ModalHeader>Delete a project</ModalHeader>
        <ModalBody>
          {`Are you sure to delete ${displayProjectName(project)} ?`}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onDeleteModalToggleClick}>Cancel</Button>
          <Button color="danger" onClick={onDeleteClick}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

ProjectRow.propTypes = {
  project: uiPropTypes.project.isRequired,
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired,
};

export default ProjectRow;
