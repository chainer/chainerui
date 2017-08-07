import React from 'react';
import ExperimentsTable from '../components/ExperimentsTable';


class ChainerUIContainer extends React.Component {

  render() {
    return (
      <div className="chainer-ui-container">
        <div className="container">
          <h1>chainer-ui</h1>
          <ExperimentsTable />
        </div>
      </div>
    );
  }

}

export default ChainerUIContainer;

