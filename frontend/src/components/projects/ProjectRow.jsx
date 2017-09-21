import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Button, Input } from 'reactstrap';
import { displayProjectName, urlForPlot } from '../../utils';


class ProjectRow extends React.Component {
  constructor(props) {
    super(props);

    const { project } = props;

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleEditEnd = this.handleEditEnd.bind(this);
    this.handleNameKeyPress = this.handleNameKeyPress.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);

    this.state = {
      isEditing: false,
      name: project.name || ''
    };
  }

  handleEditClick() {
    this.setState({
      isEditing: true
    });
  }

  handleEditEnd() {
    this.setState({
      isEditing: false
    });
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

  render() {
    const { project } = this.props;
    const { isEditing, name } = this.state;
    const nameElem = isEditing ? (
      <Input
        type="text"
        value={name}
        onChange={this.handleNameChange}
        onKeyPress={this.handleNameKeyPress}
      />
    ) : (
      <h4>
        <Link to={urlForPlot(project.id)}>{displayProjectName(project)}</Link>
      </h4>
    );


    return (
      <div className="project-row py-4 border border-top-0 border-left-0 border-right-0">
        <div className="mb-1 d-flex flex-row">
          <div>{nameElem}</div>
          <div className="ml-auto">
            <Button
              size="sm"
              onClick={this.handleEditClick}
            >Edit</Button>
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
      </div>
    );
  }
}

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
  },
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired
};

export default ProjectRow;

