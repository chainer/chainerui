import React from 'react';
import $ from 'jquery';
import path from 'path';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';


const apiEndpoint = '/api/v1';

class ChainerUIContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.requestResults = this.requestResults.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      results: [],
      config: null
    };

    this.requestResults();
  }

  requestResults() {
    const url = path.resolve(apiEndpoint, 'results');
    $.ajax({
      url,
      type: 'GET',
      dataType: 'json'
    })
      .done((data) => {
        this.setState({
          results: data.results
        });
      })
      .fail(() => {
        alert('Web API Error\nPlease check API log.'); // eslint-disable-line no-alert
      });
  }

  handleToggleResult(resultId, isToggleed) {
    const { resultIds } = this.state;
    let newResultIds = [];
    if (isToggleed) {
      newResultIds = resultIds.concat(resultId);
    } else {
      newResultIds = resultIds.filter((resId) => (resId !== resultId));
    }
    this.setState({
      resultIds: newResultIds
    });
  }

  render() {
    const { results, config } = this.state;

    return (
      <div className="chainer-ui-container">
        <LogVisualizer
          results={results}
          stats={null}
          config={config}
        />
        <ExperimentsTable
          results={results}
        />
      </div>
    );
  }
}

export default ChainerUIContainer;

