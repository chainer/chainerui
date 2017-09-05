import React from 'react';
import PropTypes from 'prop-types';
import CommandForm from './CommandForm';


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
  const { commands } = props;
  return (
    <div className="card">
      <div className="card-header">Commands</div>
      <div className="card-body">
        <div className="mb-2 card">
          <div className="card-body">
            <CommandForm />
          </div>
        </div>
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
  commands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    body: PropTypes.string
  })).isRequired
};

Commands.defaultProps = {
};

export default Commands;

