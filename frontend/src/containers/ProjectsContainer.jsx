import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {
  getProjectList,
  updateGlobalPollingRate,
  updateGlobalChartSize
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import ProjectRow from '../components/projects/ProjectRow';
import { } from '../constants';
import { } from '../utils';


const createProjectRows = (projects) => (
  Object.keys(projects).sort().map((projectId) => (
    <ProjectRow
      project={projects[projectId]}
      key={projectId}
    />
  ))
);

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
        />
        <Container fluid>
          <Row>
            <Col sm={10} lg={8} className="m-auto">
              <h2>Projects</h2>
              <div className="mt-4 border border-left-0 border-right-0 border-bottom-0">
                {createProjectRows(projects)}
              </div>
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
  projects: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  getProjectList: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getProjectList,
  updateGlobalPollingRate,
  updateGlobalChartSize
})(ProjectsContainer);

