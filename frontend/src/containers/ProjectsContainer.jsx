import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getProjectList, updateProject, deleteProject,
} from '../actions';
import NavigationBar from './NavigationBar';
import Projects from '../components/projects/Projects';


class ProjectsContainer extends React.Component {
  componentDidMount() {
    this.props.getProjectList();
  }

  render() {
    const {
      projects,
    } = this.props;
    return (
      <div className="chainerui-container">
        <NavigationBar />
        <Container fluid>
          <Row>
            <Col sm={10} lg={8} className="m-auto">
              <h2 className="pb-4 border-bottom">Projects</h2>
              <Projects
                projects={projects}
                onProjectUpdate={this.props.updateProject}
                onProjectDelete={this.props.deleteProject}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ProjectsContainer.propTypes = {
  projects: uiPropTypes.projects.isRequired,
  getProjectList: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    entities,
  } = state;
  const { projects } = entities;
  return {
    projects,
  };
};

export default connect(mapStateToProps, {
  getProjectList,
  updateProject,
  deleteProject,
})(ProjectsContainer);
