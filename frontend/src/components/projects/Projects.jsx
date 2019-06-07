import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../../store/uiPropTypes';
import ProjectRow from './ProjectRow';


const Projects = ({ projects, onProjectUpdate, onProjectDelete }) => (
  <React.Fragment>
    {Object.keys(projects).sort((a, b) => a - b).map((projectId) => (
      <ProjectRow
        key={projectId}
        project={projects[projectId]}
        onProjectUpdate={onProjectUpdate}
        onProjectDelete={onProjectDelete}
      />
    ))}
  </React.Fragment>
);

Projects.propTypes = {
  projects: uiPropTypes.projects.isRequired,
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired,
};

export default Projects;
