import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import TruncatedResultName from './TruncatedResultName';
import {
  line2dataKey
} from '../utils';


const renderItems = (
  lines, axisName, project, results, isResultNameAlignRight, resultsStatus, onResultSelect
) => (
  lines[axisName].map((line) => {
    const { resultId, logKey, config } = line;
    const result = results[resultId] || {};
    const resultStatus = resultsStatus[resultId] || {};
    const selected = resultStatus.selected === true || resultStatus.selected === logKey;
    return (
      <li
        className={`list-group-item py-0 ${selected ? 'result-highlight' : ''}`}
        key={line2dataKey(line, axisName)}
        style={{ borderLeft: `3px solid ${config.color}` }}
        onMouseEnter={() => {
          onResultSelect(project.id, resultId, logKey);
        }}
        onMouseLeave={() => {
          onResultSelect(project.id, resultId, false);
        }}
      >
        <Row>
          <Col xs="6" className="text-truncate px-1">
            <TruncatedResultName
              project={project}
              result={result}
              isResultNameAlignRight={isResultNameAlignRight}
            />
          </Col>
          <Col xs="6" className="text-truncate px-1">
            {logKey}
          </Col>
        </Row>
      </li>
    );
  })
);

const LogVisualizerLegend = (props) => {
  const {
    project, results, resultsStatus, lines, maxHeight, isResultNameAlignRight, onResultSelect
  } = props;

  return (
    <div className="log-visualizer-legend" style={{ maxHeight }}>
      <div className="card">
        <ul className="list-group list-group-flush small text-muted">
          {renderItems(lines, 'yLeftAxis', project, results, isResultNameAlignRight, resultsStatus, onResultSelect)}
          {renderItems(lines, 'yRightAxis', project, results, isResultNameAlignRight, resultsStatus, onResultSelect)}
        </ul>
      </div>
    </div>
  );
};

LogVisualizerLegend.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus.isRequired,
  lines: PropTypes.objectOf(PropTypes.any).isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isResultNameAlignRight: PropTypes.bool.isRequired,
  onResultSelect: PropTypes.func.isRequired
};

export default LogVisualizerLegend;

