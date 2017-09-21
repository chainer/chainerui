import React from 'react';
import PropTypes from 'prop-types';
import ProjectRow from './ProjectRow';


const createProjectsNotFoundElem = () => (
  <div className="my-5 text-center">
    <h4>There is no project yet.</h4>
    <p>You need to create a project first.</p>
    <code>chainer-ui project create -d PROJECT_DIR [-n PROJECT_NAME]</code>
  </div>
);

const createProjectRowElems = (projects) => (
  Object.keys(projects).sort().map((projectId) => (
    <ProjectRow
      project={projects[projectId]}
      key={projectId}
    />
  ))
);

const Projects = (props) => {
  const { projects } = props;

  return (
    <div className="mt-4 border border-left-0 border-right-0 border-bottom-0">
      {(Object.keys(projects).length === 0) ?
        createProjectsNotFoundElem() :
        createProjectRowElems(projects)}
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
  )
};

Projects.defaultProps = {
  projects: {}
};

export default Projects;

