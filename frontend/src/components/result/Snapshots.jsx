import React from 'react';
import PropTypes from 'prop-types';


const createSnapshotRowElems = (snapshots) => snapshots.sort((a, b) =>
  // sort commands in decending order
  a.iteration - b.iteration
).map((snapshot) => (
  <tr className="command-row" key={snapshot.id}>
    <td>{snapshot.iteration}</td>
    <td>{snapshot.name}</td>
  </tr>
));

const Snapshots = (props) => {
  const { snapshots } = props;
  return (
    <div className="card">
      <div className="card-header">Snapshots</div>
      <div className="card-body">
        <table className="table table-sm table-xy-overflow-scroll">
          <thead>
            <tr>
              <th>iteration</th>
              <th>name</th>
            </tr>
          </thead>
          <tbody>
            {createSnapshotRowElems(snapshots)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Snapshots.propTypes = {
  snapshots: PropTypes.arrayOf(PropTypes.shape({
    iteration: PropTypes.number,
    name: PropTypes.string
  })).isRequired
};

Snapshots.defaultProps = {
};

export default Snapshots;

