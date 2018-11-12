import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import {
  getProject,
  getResult,
  createCommand,
  updateGlobalPollingRate,
  updateGlobalChartSize,
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment
} from '../actions';
import NavigationBar from '../components/NavigationBar';
import BreadcrumbLink from '../components/BreadcrumbLink';
import ResultSummary from '../components/result/ResultSummary';
import Args from '../components/result/Args';
import Commands from '../components/result/Commands';
import Snapshots from '../components/result/Snapshots';
import { startPolling, stopPolling } from '../utils';

class ResultDetail extends React.Component {
  componentDidMount() {
    const { projectId, resultId, globalConfig } = this.props;
    const { pollingRate, logsLimit } = globalConfig;
    this.props.getProject(projectId);
    this.resultsPollingTimer = startPolling(
      this.props.getResult, pollingRate, projectId, resultId, logsLimit
    );
  }

  componentWillReceiveProps(nextProps) {
    const { projectId, resultId, globalConfig } = this.props;
    const currentPollingRate = globalConfig.pollingRate;
    const currentLogsLimit = globalConfig.logsLimit;
    const nextPollingRate = nextProps.globalConfig.pollingRate;
    const nextLogsLimit = nextProps.globalConfig.logsLimit;

    if (currentPollingRate !== nextPollingRate || currentLogsLimit !== nextLogsLimit) {
      stopPolling(this.resultsPollingTimer);
      this.resultsPollingTimer = startPolling(
        this.props.getResult, nextPollingRate, projectId, resultId, nextLogsLimit
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
          onGlobalConfigLogsLimitUpdate={this.props.updateGlobalLogsLimit}
          onGlobalConfigResultNameAlignmentUpdate={this.props.updateGlobalResultNameAlignment}
        />
        <Container fluid>
          <BreadcrumbLink
            length={3}
            globalConfig={globalConfig}
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
    config
  } = state;
  const globalConfig = config.global;
  const { projects = {}, results = {} } = entities;
  const project = projects[projectId];
  const result = results[resultId];
  return { projectId, resultId, project, result, fetchState, globalConfig };
};

ResultDetail.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  project: uiPropTypes.project,
  result: uiPropTypes.result,
  fetchState: uiPropTypes.fetchState.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  getProject: PropTypes.func.isRequired,
  getResult: PropTypes.func.isRequired,
  createCommand: PropTypes.func.isRequired,
  updateGlobalPollingRate: PropTypes.func.isRequired,
  updateGlobalChartSize: PropTypes.func.isRequired,
  updateGlobalLogsLimit: PropTypes.func.isRequired,
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
  updateGlobalLogsLimit,
  updateGlobalResultNameAlignment
})(ResultDetail);

