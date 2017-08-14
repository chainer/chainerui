import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';


const LogVisualizer = (props) => {
  const { experiments, resultIds, xAxisKey, logKey } = props;

  const results = {};
  let maxLogLength = 0;
  experiments.forEach((experiment) => {
    experiment.results.forEach((result) => {
      results[result.id] = result;
      results[result.id].experimentName = experiment.name;
      results[result.id].logs = result.logs || [];
      maxLogLength = Math.max(maxLogLength, result.logs.length);
    });
  });

  const dataDict = {};
  resultIds.forEach((resultId) => {
    const result = results[resultId];
    result.logs.forEach((log) => {
      if (dataDict[log[xAxisKey]] == null) {
        dataDict[log[xAxisKey]] = {};
        dataDict[log[xAxisKey]][xAxisKey] = log[xAxisKey];
      }
      dataDict[log[xAxisKey]][resultId] = log[logKey];
    });
  });
  const data = Object.keys(dataDict).map((key) => (dataDict[key]));

  const lineElems = resultIds.map((resultId) => {
    const result = results[resultId];
    const nameSeparator = '.';
    const name = result.experimentName + nameSeparator + result.name;
    const key = `line-${resultId}`;
    return (
      <Line
        type="monotone"
        name={name}
        dataKey={result.id}
        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
        connectNulls
        isAnimationActive={false}
        key={key}
      />
    );
  });

  return (
    <div className="log-visualizer-root">
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis type="number" dataKey={xAxisKey} domain={[0, 'dataMax']} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {lineElems}
      </LineChart>
    </div>
  );
};

LogVisualizer.propTypes = {
  experiments: PropTypes.arrayOf(
    PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.any)
    })
  ).isRequired,
  resultIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  xAxisKey: PropTypes.string,
  logKey: PropTypes.string
};
LogVisualizer.defaultProps = {
  xAxisKey: '',
  logKey: ''
};

export default LogVisualizer;

