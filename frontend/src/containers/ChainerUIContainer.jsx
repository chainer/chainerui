import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import path from 'path';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';


const apiEndpoint = '/api/v1';

const getStats = (results) => {
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
    console.log(props.results);
    console.log(props.config);
    super(props, context);

    this.requestResults = this.requestResults.bind(this);

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
                logKey: 'main/loss',
                config: {
                  color: '#ABCDEF'
                }
              }
            ]
          },
          yRightAxis: {
            axisName: 'yRightAxis',
            scale: 'linear',
            // range: [0.0, 1.0],
            lines: [
              {
                resultId: 3,
                logKey: 'main/loss',
                config: {
                  color: '#FEDCBA'
                }
              }
            ]
          }
        }
      }
    };

    // this.requestResults();
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

  render() {
    const { results, config } = this.props;
    const stats = getStats(results);

    return (
      <div className="chainer-ui-container">
        <LogVisualizer
          results={results}
          stats={stats}
          config={config}
        />
        <ExperimentsTable
          results={results}
          stats={stats}
        />
      </div>
    );
  }
}

ChainerUIContainer.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.objectOf(PropTypes.any)
  }).isRequired
};

const defaultConfig = {
  axes: {}
};

const mapStateToProps = (state) => {
  const {
    entities: { results },
    config = defaultConfig
  } = state;
  return { results, config };
};

export default connect(mapStateToProps)(ChainerUIContainer);

