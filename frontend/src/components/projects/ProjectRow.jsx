import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { displayProjectName, urlForPlot } from '../../utils';


const ProjectRow = (props) => {
  const { project } = props;

  return (
    <div className="project-row py-4 border border-top-0 border-left-0 border-right-0">
      <div className="mb-1">
        <h4><Link to={urlForPlot(project.id)}>{displayProjectName(project)}</Link></h4>
      </div>
      <div>
        <p className="mb-0 text-secondary">
          # {project.id}
        </p>
        <p className="mb-0 text-secondary">
          {project.pathName}
        </p>
      </div>
    </div>
  );
};

ProjectRow.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  })
};

ProjectRow.defaultProps = {
  project: {
    id: undefined,
    name: undefined,
    pathName: undefined
  }
};

export default ProjectRow;

