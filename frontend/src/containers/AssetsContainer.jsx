import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import { getResultAsset, updateAssetsTableColumnsVisibility } from '../actions';
import NavigationBar from './NavigationBar';
import AssetsTable from '../components/AssetsTable';

class AssetsContainer extends React.Component {
  componentDidMount() {
    const { projectId, resultId } = this.props;
    this.props.getResultAsset(projectId, resultId);
    this.handleAssetsTableColumnsVisibilityUpdate = this.handleAssetsTableColumnsVisibilityUpdate.bind(
      this
    );
  }

  handleAssetsTableColumnsVisibilityUpdate(knownTrainInfoKeysConfig, knownContentKeysConfig) {
    const { projectId, resultId } = this.props;
    this.props.updateAssetsTableColumnsVisibility(
      projectId,
      resultId,
      knownTrainInfoKeysConfig,
      knownContentKeysConfig
    );
  }

  render() {
    const { assets, resultConfig } = this.props;
    const { assetsTableState = {} } = resultConfig;
    return (
      <div className="chainerui-container">
        <NavigationBar />
        <Container>
          <AssetsTable
            assets={assets}
            tableState={assetsTableState}
            onAssetsTableColumnsVisibilityUpdate={this.handleAssetsTableColumnsVisibilityUpdate}
          />
        </Container>
      </div>
    );
  }
}

AssetsContainer.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  assets: uiPropTypes.assets.isRequired,
  resultConfig: uiPropTypes.resultConfig.isRequired,
  getResultAsset: PropTypes.func.isRequired,
  updateAssetsTableColumnsVisibility: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const projectId = Number(ownProps.match.params.projectId);
  const resultId = Number(ownProps.match.params.resultId);
  const { entities, config } = state;
  const { assets } = entities;
  const projectConfig = config.projectsConfig[projectId] || {};
  const resultConfig = projectConfig.resultsConfig[resultId] || {};
  return {
    projectId,
    resultId,
    assets,
    resultConfig,
  };
};

export default connect(
  mapStateToProps,
  {
    getResultAsset,
    updateAssetsTableColumnsVisibility,
  }
)(AssetsContainer);
