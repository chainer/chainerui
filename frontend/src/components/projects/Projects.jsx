import React from 'react';
import PropTypes from 'prop-types';
import ProjectRow from './ProjectRow';


const createProjectsNotFoundElem = () => (
  <div className="my-5 text-center">
    <h4>There is no project yet.</h4>
    <p>You need to create a project first.</p>
    <code>chainerui project create -d PROJECT_DIR [-n PROJECT_NAME]</code>
  </div>
);

const createProjectRowElems = (projects, onProjectUpdate, onProjectDelete) => (
  Object.keys(projects).sort().map((projectId) => (
    <ProjectRow
      project={projects[projectId]}
      onProjectUpdate={onProjectUpdate}
      onProjectDelete={onProjectDelete}
      key={projectId}
    />
  ))
);

const Projects = (props) => {
  const { projects, onProjectUpdate, onProjectDelete } = props;

  return (
    <div className="mt-4 border border-left-0 border-right-0 border-bottom-0">
      {(Object.keys(projects).length === 0) ?
        createProjectsNotFoundElem() :
        createProjectRowElems(projects, onProjectUpdate, onProjectDelete)}
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      pathName: PropTypes.string
    })
  ),
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired
};

Projects.defaultProps = {
  projects: {}
};

export default Projects;

