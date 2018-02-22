import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  getResultImage,
  updateGlobalPollingRate,
  updateGlobalChartSize
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import Images from '../components/images/ImageList';
import { defaultConfig } from '../constants';


class ImagesContainer extends React.Component {
  componentDidMount() {
    const { projectId, resultId } = this.props;
    this.props.getResultImage(projectId, resultId);
  }

  render() {
    const {
      images, globalConfig, fetchState
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
          <Images images={images || []} />
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
  const { images = [] } = entities;
  const globalConfig = config.global;
  return { projectId, resultId, images, fetchState, globalConfig };
};

ImagesContainer.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  images: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  getResultImage: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getResultImage,
  updateGlobalPollingRate,
  updateGlobalChartSize
})(ImagesContainer);
