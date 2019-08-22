import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';
import ProjectRow from './ProjectRow';

const Projects = ({ projects, onProjectUpdate, onProjectDelete }) => {
  const [ascOrder, setAscOrder] = useState(false);

  const onAscOrderToggleClick = useCallback(() => {
    setAscOrder((prevAscOrder) => !prevAscOrder);
  }, []);

  return (
    <React.Fragment>
      <div className="pb-4 border-bottom d-flex flex-row">
        <h2>Projects</h2>
        <div className="ml-auto mt-2">
          <Button outline size="sm" onClick={onAscOrderToggleClick}>
            <i className={`fas fa-sort-${ascOrder ? 'down' : 'up'}`} /> {ascOrder ? 'Asc' : 'Desc'}
          </Button>
        </div>
      </div>
      {Object.keys(projects)
        .sort((a, b) => (ascOrder ? a - b : b - a))
        .map((projectId) => (
          <ProjectRow
            key={projectId}
            project={projects[projectId]}
            onProjectUpdate={onProjectUpdate}
            onProjectDelete={onProjectDelete}
          />
        ))}
    </React.Fragment>
  );
};

Projects.propTypes = {
  projects: uiPropTypes.projects.isRequired,
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired,
};

export default Projects;
