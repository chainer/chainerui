import React from 'react';
import PropTypes from 'prop-types';
// import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { Row, Col, Input, FormGroup } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import TruncatedResultName from './TruncatedResultName';
import {
  line2dataKey
} from '../utils';

const LogVisualizerLegendItem = (props) => {
  const {
    isDisplay, project, result, resultStatus, line, isResultNameAlignRight, onResultSelect
  } = props;
  const { logKey, config } = line;
  const selected = resultStatus.selected === true || resultStatus.selected === logKey;
  return (
    <li
      className={`list-group-item py-0 ${selected ? 'result-highlight' : ''}`}
      style={{ borderLeft: `3px solid ${config.color}` }}
      onMouseEnter={() => {
        onResultSelect(project.id, result.id, logKey);
      }}
      onMouseLeave={() => {
        onResultSelect(project.id, result.id, false);
      }}
    >
      <Row>
        { isDisplay ? (
          <Col xs="auto" className="px-1">
            <FormGroup check>
              <Input type="checkbox" />
            </FormGroup>
          </Col>
        ) : null}
        <Col className="text-truncate px-1">
          <TruncatedResultName
            project={project}
            result={result}
            isResultNameAlignRight={isResultNameAlignRight}
          />
        </Col>
        <Col className="text-truncate px-1">
          {logKey}
        </Col>
      </Row>
    </li>
  );
};

LogVisualizerLegendItem.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result,
  resultStatus: uiPropTypes.resultStatus,
  line: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  isResultNameAlignRight: PropTypes.bool.isRequired,
  onResultSelect: PropTypes.func.isRequired
};

LogVisualizerLegendItem.defaultProps = {
  result: {},
  resultStatus: {}
};

const LogVisualizerLegend = (props) => {
  const {
    isDisplay,
    project, results, resultsStatus, lines, maxHeight, isResultNameAlignRight, onResultSelect
  } = props;

  return (
    <div className="log-visualizer-legend" style={{ maxHeight }}>
      <div className="card">
        <ul className="list-group list-group-flush small text-muted">
          {Object.keys(lines).flatMap((axisName) => (
            lines[axisName].map((line) => (
              <LogVisualizerLegendItem
                isDisplay={isDisplay}
                key={line2dataKey(line, axisName)}
                project={project}
                result={results[line.resultId]}
                resultStatus={resultsStatus[line.resultId]}
                line={line}
                isResultNameAlignRight={isResultNameAlignRight}
                onResultSelect={onResultSelect}
              />
            ))
          ))}
        </ul>
      </div>
    </div>
  );
};

LogVisualizerLegend.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus.isRequired,
  lines: PropTypes.objectOf(PropTypes.any).isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isResultNameAlignRight: PropTypes.bool.isRequired,
  onResultSelect: PropTypes.func.isRequired
};

export default LogVisualizerLegend;
