import React from 'react';
import PropTypes from 'prop-types';
import { formatLogValue, formatLogTooltipLabel } from '../utils';

const LogVisualizerTooltipItem = (props) => {
  const { entry, formatter, anySelected } = props;
  const { color, value, strokeOpacity } = entry;
  const unSelected = !anySelected || strokeOpacity < 1;
  return (
    <li
      className={`list-group-item py-0 ${unSelected ? '' : 'result-highlight'}`}
      style={{ borderLeft: `3px solid ${color}` }}
    >
      {formatter(value)}
    </li>
  );
};

LogVisualizerTooltipItem.propTypes = {
  entry: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  formatter: PropTypes.func.isRequired,
  anySelected: PropTypes.bool.isRequired,
};

const LogVisualizerTooltip = (props) => {
  const { xAxisKey, label, payload, anySelected } = props;

  if (!payload || payload.length === 0) {
    return null;
  }

  const labelFormatter = formatLogTooltipLabel(xAxisKey);
  const formatter = formatLogValue();
  const entries = payload.filter(
    (entry) => entry.value != null && !/-(?:smoothed|events)$/.test(entry.name)
  );

  return (
    <div className="log-visualizer-tooltip card">
      <div className="card-body px-2 py-0">
        <h6 className="cart-title my-2">{labelFormatter(label)}</h6>
      </div>
      <ul className="list-group list-group-flush small">
        {entries.map((entry) => (
          <LogVisualizerTooltipItem
            key={entry.dataKey}
            entry={entry}
            formatter={formatter}
            anySelected={anySelected}
          />
        ))}
      </ul>
    </div>
  );
};

LogVisualizerTooltip.propTypes = {
  xAxisKey: PropTypes.string,
  anySelected: PropTypes.bool.isRequired,
  // passed by reactstrap Tooltip
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // passed by reactstrap Tooltip
  payload: PropTypes.arrayOf(PropTypes.any),
};

LogVisualizerTooltip.defaultProps = {
  xAxisKey: '',
  label: undefined,
  payload: [],
};

export default LogVisualizerTooltip;
