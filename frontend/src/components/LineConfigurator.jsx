import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Collapse, Button, Col } from 'reactstrap';
import { ChromePicker, GithubPicker } from 'react-color';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';
import TruncatedResultName from './TruncatedResultName';
import { lineColorGenerator } from '../utils';


const RESULT_NONE = -1;
const LOG_KEY_NONE = '';


class LineConfigurator extends React.Component {
  constructor(props) {
    super(props);

    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleLogKeyChange = this.handleLogKeyChange.bind(this);
    this.handleLineColorChange = this.handleLineColorChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleResetColorClick = this.handleResetColorClick.bind(this);
    this.togglePicker = this.togglePicker.bind(this);

    this.state = { colorPickerCollapse: false };
  }

  togglePicker() {
    this.setState({ colorPickerCollapse: !this.state.colorPickerCollapse });
  }

  handleResultChange(e) {
    const { line, onChange } = this.props;
    const newResultId = parseInt(e.target.value, 10);
    onChange({ ...line, resultId: newResultId });
  }

  handleLogKeyChange(e) {
    const { line, onChange } = this.props;
    const newLogKey = e.target.value;
    onChange({ ...line, logKey: newLogKey });
  }

  handleLineColorChange(e) {
    const { line, onChange } = this.props;
    const { config } = line;
    const { hex } = e;
    onChange({
      ...line,
      config: {
        ...config,
        color: hex
      }
    });
  }

  handleVisibilityChange(e) {
    const { line, onChange } = this.props;
    const { checked } = e.target;
    const { config } = line;
    onChange({
      ...line,
      config: {
        ...config,
        isVisible: checked
      }
    });
  }

  handleResetColorClick() {
    const { line, results, stats, onChange } = this.props;
    const { config } = line;
    const { logKeys } = stats;
    onChange({
      ...line,
      config: {
        ...config,
        color: lineColorGenerator(line.resultId, line.logKey, results, logKeys)
      }
    });
  }

  render() {
    const { project, results, line, isResultNameAlignRight } = this.props;
    const { resultId = RESULT_NONE, logKey = LOG_KEY_NONE, config = {} } = line;
    const result = results[resultId] || {};
    const { color, isVisible } = config;

    const colorBlockStyle = {
      backgroundColor: color
    };

    return (
      <div className="line-configurator">
        <dl>
          <dt>result name</dt>
          <dd>
            <TruncatedResultName
              project={project}
              result={result}
              isResultNameAlignRight={isResultNameAlignRight}
            />
          </dd>
          <dt>log key</dt>
          <dd>{logKey}</dd>
        </dl>
        <Form>
          <FormGroup>
            <Label>color</Label>
            <div style={colorBlockStyle} className="mb-2">{color}</div>
            <Collapse isOpen={this.state.colorPickerCollapse}>
              <ChromePicker
                color={color}
                disableAlpha
                onChange={this.handleLineColorChange}
              />
            </Collapse>
            <Collapse isOpen={!this.state.colorPickerCollapse}>
              <GithubPicker
                color={color}
                width={212}
                onChange={this.handleLineColorChange}
              />
            </Collapse>
            <Button onClick={this.togglePicker} size="sm" className="my-2">Toggle color picker</Button>
            <Button onClick={this.handleResetColorClick} size="sm" className="m-2">Reset color</Button>
          </FormGroup>
          <FormGroup row>
            <Label for="line-configurator-select-visibility" className="col-sm-2">visibility</Label>
            <Col sm={{ size: 10 }}>
              <Check
                type="checkbox"
                id="line-configurator-select-visibility"
                checked={isVisible}
                onChange={this.handleVisibilityChange}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

LineConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  stats: uiPropTypes.stats.isRequired,
  line: uiPropTypes.line,
  isResultNameAlignRight: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

LineConfigurator.defaultProps = {
  line: {}
};

export default LineConfigurator;

