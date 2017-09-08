import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Collapse, Button, Col, Row } from 'reactstrap';
import { ChromePicker, SwatchesPicker } from 'react-color';
import { displayName } from '../utils';


const RESULT_NONE = -1;
const LOG_KEY_NONE = '';


class LineConfigurator extends React.Component {
  constructor() {
    super();

    this.handleResultChange = this.handleResultChange.bind(this);
    this.handleLogKeyChange = this.handleLogKeyChange.bind(this);
    this.handleLineColorChange = this.handleLineColorChange.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
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

  render() {
    const { results, line = {} } = this.props;
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
          <dd>{displayName(result)}</dd>
          <dt>log key</dt>
          <dd>{logKey}</dd>
        </dl>
        <Form>
          <FormGroup>
            <Label>color</Label>
            <div style={colorBlockStyle}>{color}</div>
            <Collapse isOpen={this.state.colorPickerCollapse}>
              <ChromePicker
                color={color}
                disableAlpha
                onChange={this.handleLineColorChange}
              />
            </Collapse>
            <Collapse isOpen={!this.state.colorPickerCollapse}>
              <SwatchesPicker
                color={color}
                width={470}
                onChange={this.handleLineColorChange}
              />
            </Collapse>
            <Button onClick={this.togglePicker} size="sm" className="my-2">Toggle color picker</Button>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label for="line-configurator-select-visibility" sm={{ size: 2 }}>visibility</Label>
              <Col sm={{ size: 10 }}>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      id="line-configurator-select-visibility"
                      checked={isVisible}
                      onChange={this.handleVisibilityChange}
                    />{' '}
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

LineConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  line: PropTypes.shape({
    resultId: PropTypes.number,
    logKey: PropTypes.string,
    config: PropTypes.shape({
      color: PropTypes.string,
      isVisible: PropTypes.bool
    })
  }),
  onChange: PropTypes.func
};

LineConfigurator.defaultProps = {
  line: {},
  onChange: () => {}
};

export default LineConfigurator;

