import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Input, FormGroup,
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import TruncatedResultName from './TruncatedResultName';
import {
  line2key,
  line2dataKey,
} from '../utils';

class LogVisualizerLegendItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleLineVisibilityUpdate = this.handleLineVisibilityUpdate.bind(this);
  }

  handleLineVisibilityUpdate(e) {
    const {
      project, axisName, line, onAxisConfigLineUpdate,
    } = this.props;
    const { config } = line;
    const { checked } = e.target;
    const newLine = {
      ...line,
      config: {
        ...config,
        isVisible: checked,
      },
    };

    onAxisConfigLineUpdate(project.id, axisName, line2key(line), newLine);
  }

  render() {
    const {
      isDisplay, project, result, resultStatus, line, isResultNameAlignRight, highlightTableAndChart,
      onResultSelect,
    } = this.props;
    const { logKey, config } = line;
    const selected = highlightTableAndChart && (resultStatus.selected === true || resultStatus.selected === logKey);
    const highlightEvents = {
      onMouseEnter: () => {
        onResultSelect(project.id, result.id, logKey);
      },
      onMouseLeave: () => {
        onResultSelect(project.id, result.id, false);
      },
    };
    if (!isDisplay && !line.config.isVisible) {
      // do not inclue rows for invisible lines when rendering for png download
      return null;
    }

    return (
      <li
        className={`list-group-item py-0 ${selected ? 'result-highlight' : ''}`}
        style={{ borderLeft: `3px solid ${config.color}` }}
        {...highlightEvents}
      >
        <Row>
          { isDisplay ? (
            <Col xs="auto" className="px-1">
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={line.config.isVisible}
                  onChange={this.handleLineVisibilityUpdate}
                />
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
  }
}

LogVisualizerLegendItem.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result,
  resultStatus: uiPropTypes.resultStatus,
  axisName: uiPropTypes.axisName.isRequired,
  line: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  isResultNameAlignRight: PropTypes.bool.isRequired,
  highlightTableAndChart: PropTypes.bool.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
};

LogVisualizerLegendItem.defaultProps = {
  result: {},
  resultStatus: {},
};

const LogVisualizerLegend = (props) => {
  const {
    isDisplay,
    project, results, resultsStatus, lines, maxHeight, isResultNameAlignRight, highlightTableAndChart,
    onResultSelect, onAxisConfigLineUpdate,
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
                axisName={axisName}
                line={line}
                isResultNameAlignRight={isResultNameAlignRight}
                highlightTableAndChart={highlightTableAndChart}
                onResultSelect={onResultSelect}
                onAxisConfigLineUpdate={onAxisConfigLineUpdate}
              />
            ))
          ))}
        </ul>
      </div>
    </div>
  );
};

LogVisualizerLegend.propTypes = {
  isDisplay: PropTypes.bool.isRequired, // false when rendering for png download
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  resultsStatus: uiPropTypes.resultsStatus.isRequired,
  lines: PropTypes.objectOf(PropTypes.any).isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isResultNameAlignRight: PropTypes.bool.isRequired,
  highlightTableAndChart: PropTypes.bool.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
};

export default LogVisualizerLegend;
