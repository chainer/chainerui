import React from 'react';
import PropTypes from 'prop-types';
import SnapshotTakeForm from './SnapshotTakeForm';
import { responseStatusToIcon } from '../../utils';


const createCommandRowElems = (commands) => commands.sort((a, b) =>
  // sort commands in decending order
  b.id - a.id
).map((command) => {
  const request = command.request || {};
  const response = command.response || {};
  const { schedule } = request;
  return (
    <tr className="command-row" key={command.id}>
      <td>{command.name}</td>
      <td>{responseStatusToIcon(response.status)}</td>
      <td>{(new Date(request.created_at)).toLocaleString()}</td>
      <td>{schedule ? `${schedule.value} ${schedule.key}` : ''}</td>
      <td>{(new Date(response.executed_at)).toLocaleString()}</td>
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
  const { resultId, commands, onCommandSubmit } = props;
  return (
    <div className="card">
      <div className="card-header">Commands</div>
      <div className="card-body">
        <div className="mb-2">
          <SnapshotTakeForm
            resultId={resultId}
            commandName="take_snapshot"
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
              <th>iteraion</th>
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
  resultId: PropTypes.number.isRequired,
  commands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    body: PropTypes.string
  })).isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

Commands.defaultProps = {
};

export default Commands;

