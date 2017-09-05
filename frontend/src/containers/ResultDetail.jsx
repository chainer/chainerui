import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  // loadResults, updateResult, deleteResult,
  updateGlobalPollingRate,
  updateGlobalChartSize
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import { defaultConfig } from '../constants';

class ResultDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      resultId, config, fetchState
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
          <div className="row">
            <h3>resultId: {resultId}</h3>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const resultId = Number(ownProps.params.resultId);
  const {
    entities,
    fetchState,
    config = defaultConfig
  } = state;
  const { results = {} } = entities;
  return { resultId, results, fetchState, config };
};

ResultDetail.propTypes = {
  resultId: PropTypes.number.isRequired,
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
})(ResultDetail);

