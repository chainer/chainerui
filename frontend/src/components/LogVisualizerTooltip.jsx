import React from 'react';
import PropTypes from 'prop-types';
import {
  formatLogValue, formatLogTooltipLabel
} from '../utils';


const renderItems = (payload, formatter) => (
  payload.filter((entry) => entry.value != null).map((entry) => {
    const { dataKey, color, value } = entry;
    return (
      <li
        className="list-group-item py-0"
        key={dataKey}
        style={{ borderLeft: `3px solid ${color}` }}
      >
        {formatter(value)}
      </li>
    );
  })
);

const LogVisualizerTooltip = (props) => {
  const { xAxisKey, label, payload } = props;

  if (!payload || payload.length === 0) {
    return null;
  }

  const labelFormatter = formatLogTooltipLabel(xAxisKey);
  const formatter = formatLogValue();

  return (
    <div className="log-visualizer-tooltip card">
      <div className="card-body px-2 py-0">
        <h6 className="cart-title my-2">{labelFormatter(label)}</h6>
      </div>
      <ul className="list-group list-group-flush small">
        {renderItems(payload, formatter)}
      </ul>
    </div>
  );
};

LogVisualizerTooltip.propTypes = {
  xAxisKey: PropTypes.string,
  // passed by reactstrap Tooltip
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // passed by reactstrap Tooltip
  payload: PropTypes.arrayOf(PropTypes.any)
};

LogVisualizerTooltip.defaultProps = {
  xAxisKey: '',
  label: undefined,
  payload: []
};

export default LogVisualizerTooltip;
