import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';
import ProjectRow from './ProjectRow';


class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.handleAscOrderToggle = this.handleAscOrderToggle.bind(this);
    this.state = {
      ascOrder: false,
    };
  }

  handleAscOrderToggle() {
    this.setState(({ ascOrder }) => ({ ascOrder: !ascOrder }));
  }

  render() {
    const { projects, onProjectUpdate, onProjectDelete } = this.props;
    const { ascOrder } = this.state;

    return (
      <React.Fragment>
        <div className="pb-4 border-bottom d-flex flex-row">
          <h2>Projects</h2>
          <div className="ml-auto mt-2">
            <Button outline size="sm" onClick={this.handleAscOrderToggle}>
              <i className={`fas fa-sort-${ascOrder ? 'down' : 'up'}`} />
              {' '}
              {ascOrder ? 'Asc' : 'Desc'}
            </Button>
          </div>
        </div>
        {Object.keys(projects).sort((a, b) => (ascOrder ? a - b : b - a)).map((projectId) => (
          <ProjectRow
            key={projectId}
            project={projects[projectId]}
            onProjectUpdate={onProjectUpdate}
            onProjectDelete={onProjectDelete}
          />
        ))}
      </React.Fragment>
    );
  }
}

Projects.propTypes = {
  projects: uiPropTypes.projects.isRequired,
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired,
};

export default Projects;
