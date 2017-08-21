import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  loadResults,
  addLineToAxis
} from '../actions';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';


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
  constructor(props) {
    super(props);

    this.handleAxisConfigLineAdd = this.handleAxisConfigLineAdd.bind(this);
  }
  componentWillMount() {
    this.props.loadResults();
  }

  handleAxisConfigLineAdd(...args) {
    console.log(this && args);
  }

  render() {
    // const { results, config } = this.props;
    const { results } = this.props;
    const stats = getStats(results);
    const config = {
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
    };

    return (
      <div className="chainer-ui-container">
        <LogVisualizer
          results={results}
          stats={stats}
          config={config}
          onAxisConfigLineAdd={this.handleAxisConfigLineAdd}
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
  // config: PropTypes.shape({
  //   axes: PropTypes.objectOf(PropTypes.any)
  // }).isRequired,
  loadResults: PropTypes.func.isRequired
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

export default connect(mapStateToProps, {
  loadResults,
  addLineToAxis
})(ChainerUIContainer);

