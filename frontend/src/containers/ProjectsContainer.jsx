import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  updateGlobalPollingRate,
  updateGlobalChartSize
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import { } from '../constants';
import { } from '../utils';

class ProjectsContainer extends React.Component {
  render() {
    const {
      config, fetchState
    } = this.props;
    return (
      <div className="result-detail">
        <NavigationBar
          fetchState={fetchState}
          config={config}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
        />
        <Container fluid>
          <h3>Projects</h3>
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
  const { projects = {}, results = {} } = entities;
  return { projects, results, fetchState, config };
};

ProjectsContainer.propTypes = {
  projects: PropTypes.objectOf(PropTypes.any).isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired,
  config: PropTypes.shape({
    global: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  updateGlobalPollingRate,
  updateGlobalChartSize
})(ProjectsContainer);

