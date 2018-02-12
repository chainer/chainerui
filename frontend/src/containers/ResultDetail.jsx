import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import {
  getProject,
  getResult,
  createCommand,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalResultNameAlignment
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ResultSummary from '../components/result/ResultSummary';
import Args from '../components/result/Args';
import Commands from '../components/result/Commands';
import Snapshots from '../components/result/Snapshots';
import { defaultConfig } from '../constants';
import { startPolling, stopPolling } from '../utils';

class ResultDetail extends React.Component {
  componentDidMount() {
    const { projectId, resultId, globalConfig } = this.props;
    const { pollingRate } = globalConfig;
    this.props.getProject(projectId);
    this.resultsPollingTimer = startPolling(
      this.props.getResult, pollingRate, projectId, resultId
    );
  }

  componentWillReceiveProps(nextProps) {
    const { projectId, resultId, globalConfig } = this.props;
    const currentPollingRate = globalConfig.pollingRate;
    const nextPollingRate = nextProps.globalConfig.pollingRate;

    if (currentPollingRate !== nextPollingRate) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(
        this.props.getResult, nextPollingRate, projectId, resultId
      );
    }
  }

  componentWillUnmount() {
    stopPolling(this.resultsPollingTimer);
  }

  render() {
    const {
      projectId, project, result, globalConfig, fetchState
    } = this.props;
    return (
      <div className="result-detail">
        <NavigationBar
          pollingKey="result"
          fetchState={fetchState}
          globalConfig={globalConfig}
          onGlobalConfigPollingRateUpdate={this.props.updateGlobalPollingRate}
          onGlobalConfigChartSizeUpdate={this.props.updateGlobalChartSize}
          onGlobalConfigResultNameAlignmentUpdate={this.props.updateGlobalResultNameAlignment}
        />
        <Container fluid>
          <BreadcrumbLink
            length={3}
            project={project}
            result={result}
          />
          <div className="row">
            <div className="col-sm-6 p-2">
              <ResultSummary result={result} />
            </div>
            <div className="col-sm-6 p-2">
              <Args args={result.args || []} />
            </div>
            <div className="col-sm-6 p-2">
              {
                (result.id != null) ? (
                  <Commands
                    projectId={projectId}
                    resultId={result.id}
                    commands={result.commands || []}
                    onCommandSubmit={this.props.createCommand}
                  />
                ) : null
              }
            </div>
            <div className="col-sm-6 p-2">
              <Snapshots snapshots={result.snapshots || []} />
            </div>
          </div>
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
  const globalConfig = config.global;
  const { projects = {}, results = {} } = entities;
  const project = projects[projectId];
  const result = results[resultId];
  return { projectId, resultId, project, result, fetchState, globalConfig };
};

ResultDetail.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string
  }),
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }),
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.objectOf(PropTypes.any).isRequired,
  getProject: PropTypes.func.isRequired,
  getResult: PropTypes.func.isRequired,
  createCommand: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalResultNameAlignment: PropTypes.func.isRequired
};

ResultDetail.defaultProps = {
  project: {},
  result: {}
};

export default connect(mapStateToProps, {
  getProject,
  getResult,
  createCommand,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalResultNameAlignment
})(ResultDetail);

