import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import TruncatedResultName from './TruncatedResultName';
import {
  formatLogValue, formatLogTooltipLabel,
  decomposeLineDataKey
} from '../utils';


const renderItems = (payload, formatter, project, results, isResultNameAlignRight) => (
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
            <TruncatedResultName
              project={project}
              result={result}
              isResultNameAlignRight={isResultNameAlignRight}
            />
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
  const {
    xAxisKey,
    label, payload,
    project, results, isResultNameAlignRight
  } = props;

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
        {renderItems(payload, formatter, project, results, isResultNameAlignRight)}
      </ul>
    </div>
  );
};

LogVisualizerTooltip.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    pathName: PropTypes.string
  }).isRequired,
  results: PropTypes.objectOf(PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  })).isRequired,
  xAxisKey: PropTypes.string.isRequired,
  isResultNameAlignRight: PropTypes.bool,
  // passed by reactstrap Tooltip
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // passed by reactstrap Tooltip
  payload: PropTypes.arrayOf(PropTypes.any)
};

LogVisualizerTooltip.defaultProps = {
  isResultNameAlignRight: false,
  label: undefined,
  payload: []
};

export default LogVisualizerTooltip;

