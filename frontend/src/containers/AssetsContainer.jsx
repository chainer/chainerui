import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  getResultAsset,
  updateGlobalPollingRate,
  updateGlobalChartSize
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import Assets from '../components/assets/AssetList';
import { defaultConfig } from '../constants';


class AssetsContainer extends React.Component {
  componentDidMount() {
    const { projectId, resultId } = this.props;
    this.props.getResultAsset(projectId, resultId);
  }

  render() {
    const {
      assets, globalConfig, fetchState
    } = this.props;
    return (
      <div>
        <NavigationBar
          fetchState={fetchState}
          globalConfig={globalConfig}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
        />
        <Container fluid>
          <Assets assets={assets || []} />
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.params.projectId);
  const resultId = Number(ownProps.params.resultId);
  const {
    entities,
    fetchState,
    config = defaultConfig
  } = state;
  const { assets = [] } = entities;
  const globalConfig = config.global;
  return { projectId, resultId, assets, fetchState, globalConfig };
};

AssetsContainer.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  assets: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  getResultAsset: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getResultAsset,
  updateGlobalPollingRate,
  updateGlobalChartSize
})(AssetsContainer);
