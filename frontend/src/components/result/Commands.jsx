import React from 'react';
import PropTypes from 'prop-types';
import CommandForm from './CommandForm';
import CommandButton from './CommandButton';


const createCommandRowElems = (commands) => commands.sort((a, b) =>
  // sort commands in decending order
  b.id - a.id
).map((command) => (
  <tr className="command-row" key={command.id}>
    <td>{command.name}</td>
    <td>
      <pre>
        <code>{command.body}</code>
      </pre>
    </td>
  </tr>
));

const Commands = (props) => {
  const { resultId, commands, onCommandSubmit } = props;
  return (
    <div className="card">
      <div className="card-header">Commands</div>
      <div className="card-body">
        <div className="mb-2 card">
          <div className="card-body">
            <CommandButton
              resultId={resultId}
              commandName="take_snapshot"
              label="Take snapshot"
              onCommandSubmit={onCommandSubmit}
            />
          </div>
        </div>
        <div className="mb-2 card">
          <div className="card-body">
            <CommandForm
              resultId={resultId}
              onCommandSubmit={onCommandSubmit}
            />
          </div>
        </div>
        <hr />
        <table className="table table-sm table-xy-overflow-scroll">
          <thead>
            <tr>
              <th>command name</th>
              <th>body</th>
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

