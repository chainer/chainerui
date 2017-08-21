import React from 'react';
import $ from 'jquery';
import path from 'path';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';


const apiEndpoint = '/api/v1';

const getStats = (entities) => {
  const { results } = entities;
  const argKeySet = {};
  Object.keys(results).forEach((resultId) => {
    const result = results[resultId];
    result.args.forEach((arg) => { argKeySet[arg.key] = true; });
  });
  const argKeys = Object.keys(argKeySet);

  const axes = {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  };

  return { axes, argKeys };
};

class ChainerUIContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.requestResults = this.requestResults.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      entities: {
        results: {}
      },
      config: {
        axes: {
          xAxis: {
            axisName: 'xAxis',
            xAxisKey: 'epoch',
            scale: 'linear'
          },
          yLeftAxis: {
            axisName: 'yLeftAxis',
            scale: 'linear',
            // range: [0.0, 1.0],
            lines: [
              {
                resultId: 2,
                logKey: 'main_loss',
                config: {
                  color: '#ABCDEF'
                }
              }
            ]
          },
          yRightAxis: {
            axisName: 'yRightAxis',
            scale: 'log'
          }
        }
      }
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
        const results = {};
        data.results.forEach((result) => {
          results[result.id] = result;
        });
        this.setState({
          entities: {
            ...this.state.entities,
            results
          }
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
    const { entities, config } = this.state;
    const stats = getStats(entities);

    return (
      <div className="chainer-ui-container">
        <LogVisualizer
          entities={entities}
          stats={stats}
          config={config}
        />
        <ExperimentsTable
          entities={entities}
          stats={stats}
        />
      </div>
    );
  }
}

export default ChainerUIContainer;

