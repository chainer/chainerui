import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../../store/uiPropTypes';
import { responseStatusToIcon } from '../../utils';
import SnapshotTakeForm from './SnapshotTakeForm';
import StopForm from './StopForm';
import HyperparamsAdjustForm from './HyperparamsAdjustFrom';


// sort commands in decending order
const createCommandRowElems = (commands) => commands.sort((a, b) => b.id - a.id).map((command) => {
  const request = command.request || {};
  const response = command.response || {};
  const { schedule } = request;
  const { executed_at: executedAt } = response;
  return (
    <tr className="command-row" key={command.id}>
      <td>{command.name}</td>
      <td>{responseStatusToIcon(response.status)}</td>
      <td>{(new Date(request.created_at)).toLocaleString()}</td>
      <td>{schedule ? `${schedule.value} ${schedule.key}` : ''}</td>
      <td>{executedAt ? (new Date(executedAt)).toLocaleString() : ''}</td>
      <td>{response.epoch}</td>
      <td>{response.iteration}</td>
      <td>{response.elapsed_time != null ? response.elapsed_time.toFixed(2) : ''}</td>
      <td>
        <pre>
          <code>{request.body ? JSON.stringify(request.body) : ''}</code>
        </pre>
      </td>
      <td>
        <pre>
          <code>{response.body ? JSON.stringify(response.body) : ''}</code>
        </pre>
      </td>
    </tr>
  );
});

const Commands = (props) => {
  const {
    projectId, resultId, commands, onCommandSubmit,
  } = props;
  return (
    <div className="card">
      <div className="card-header">Commands</div>
      <div className="card-body">
        <div className="mb-2">
          <SnapshotTakeForm
            projectId={projectId}
            resultId={resultId}
            onCommandSubmit={onCommandSubmit}
          />
        </div>
        <div className="mb-2">
          <StopForm
            projectId={projectId}
            resultId={resultId}
            onCommandSubmit={onCommandSubmit}
          />
        </div>
        <div className="mb-2">
          <HyperparamsAdjustForm
            projectId={projectId}
            resultId={resultId}
            commands={commands}
            onCommandSubmit={onCommandSubmit}
          />
        </div>
        <hr />
        <table className="table table-sm table-xy-overflow-scroll">
          <thead>
            <tr>
              <th>command name</th>
              <th>response status</th>
              <th>created at</th>
              <th>schedule</th>
              <th>executed at</th>
              <th>epoch</th>
              <th>iteration</th>
              <th>elapsed time</th>
              <th>request body</th>
              <th>response body</th>
            </tr>
          </thead>
          <tbody>
            {createCommandRowElems(commands)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Commands.propTypes = {
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  commands: uiPropTypes.commands.isRequired,
  onCommandSubmit: PropTypes.func.isRequired,
};

export default Commands;

