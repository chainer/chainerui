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

const mapStateToProps = (state, /* ownProps */) => state;

ProjectsContainer.propTypes = {
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

