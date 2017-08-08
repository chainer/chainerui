import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';


class LogVisualizer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};

  }

  render() {
    const { experiments, resultIds, logKey } = this.props;
    const results = {};
    let maxLogLength = 0;
    experiments.forEach((experiment, i) => {
      experiment.results.forEach((result, j) => {
        results[result.id] = result;
        maxLogLength = Math.max(maxLogLength, result.logs.length);
      });
    });
    console.log(results);
    console.log(maxLogLength);
    let data = [];
    for (let i = 0; i < maxLogLength; i++) {
      const iteration = results[Object.keys(results)[0]].logs[i].iteration;
      let dataItem = { iteration };
      resultIds.forEach((resultId) => {
        const result = results[resultId];
        dataItem[result.name] = result.logs[i][logKey];
      });
      data.push(dataItem);
    }
    console.log(data);
    const lineElems = resultIds.map((resultId) => {
      const result = results[resultId];
      const key = 'line-' + resultId;
      return (<Line type="monotone" dataKey={result.name} stroke={'#'+Math.floor(Math.random()*16777215).toString(16)} key={key} />);
    });

    return (
      <div className="log-visualizer-root">
        <LineChart width={730} height={250} data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" dataKey="iteration" domain={[0, 'dataMax']} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          {lineElems}
        </LineChart>
      </div>
    );
  }

}

LogVisualizer.propTypes = {
  experiments: PropTypes.array.isRequired,
  resultIds: PropTypes.array.isRequired,
  logKey: PropTypes.string,
};

export default LogVisualizer;

