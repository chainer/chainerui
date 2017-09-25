import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import {
  formatLogValue, formatLogTooltipLabel,
  displayResultName,
  decomposeLineDataKey
} from '../utils';


const renderItems = (payload, formatter, results) => (
  payload.filter((entry) => entry.value != null).map((entry) => {
    const { dataKey, color, value } = entry;
    const { resultId, logKey } = decomposeLineDataKey(dataKey);
    const result = results[resultId] || {};
    return (
      <li
        className="list-group-item py-0"
        key={dataKey}
        style={{ borderLeft: `3px solid ${color}` }}
      >
        <Row>
          <Col xs="5" className="text-truncate px-1">
            {displayResultName(result, { length: 16 })}
          </Col>
          <Col xs="4" className="text-truncate px-1">
            {logKey}
          </Col>
          <Col xs="3" className="px-1">
            {formatter(value)}
          </Col>
        </Row>
      </li>
    );
  })
);

const LogVisualizerTooltip = (props) => {
  const { xAxisKey, label, payload, results, lines } = props;

  if (!payload || payload.length === 0) {
    return null;
  }

  const labelFormatter = formatLogTooltipLabel(xAxisKey);
  const formatter = formatLogValue();

  return (
    <div className="log-visualizer-tooltip card">
      <div className="card-body px-2 py-0">
        <h6 className="card-title my-2">{labelFormatter(label)}</h6>
      </div>
      <ul className="list-group list-group-flush small text-muted">
        {renderItems(payload, formatter, results, lines)}
      </ul>
    </div>
  );
};

LogVisualizerTooltip.propTypes = {
  results: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  })).isRequired,
  lines: PropTypes.objectOf(
    PropTypes.shape({
      resultId: PropTypes.number,
      logKey: PropTypes.string,
      config: PropTypes.shape({
        color: PropTypes.string,
        isVisible: PropTypes.bool
      })
    })
  ).isRequired,
  xAxisKey: PropTypes.string.isRequired,
  // passed by reactstrap Tooltip
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // passed by reactstrap Tooltip
  payload: PropTypes.arrayOf(PropTypes.any)
};

LogVisualizerTooltip.defaultProps = {
  label: undefined,
  payload: []
};

export default LogVisualizerTooltip;

