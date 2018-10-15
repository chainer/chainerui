import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getProjectList, updateProject, deleteProject,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import Projects from '../components/projects/Projects';


class ProjectsContainer extends React.Component {
  componentDidMount() {
    this.props.getProjectList();
  }

  render() {
    const {
      projects, globalConfig, fetchState
    } = this.props;
    return (
      <div className="result-detail">
        <NavigationBar
          fetchState={fetchState}
          globalConfig={globalConfig}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
          onGlobalConfigLogsLimitUpdate={this.props.updateGlobalLogsLimit}
          onGlobalConfigResultNameAlignmentUpdate={this.props.updateGlobalResultNameAlignment}
        />
        <Container fluid>
          <Row>
            <Col sm={10} lg={8} className="m-auto">
              <h2>Projects</h2>
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

const mapStateToProps = (state) => {
  const {
    entities,
    fetchState,
    config
  } = state;
  const { projects = {} } = entities;
  const globalConfig = config.global;
  return { projects, fetchState, globalConfig };
};

ProjectsContainer.propTypes = {
  projects: uiPropTypes.projects.isRequired,
  fetchState: uiPropTypes.fetchState.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  getProjectList: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalLogsLimit: PropTypes.func.isRequired,
  updateGlobalResultNameAlignment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getProjectList,
  updateProject,
  deleteProject,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment
})(ProjectsContainer);

