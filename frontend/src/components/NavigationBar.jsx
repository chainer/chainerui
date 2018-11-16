import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Collapse, Navbar, NavbarBrand,
  Popover, PopoverHeader, PopoverBody,
  Form, FormGroup, Label,
  Button
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import Check from './FormControl/Check';
import PollingStatus from './PollingStatus';
import { chartSizeOptions, pollingOptions, logsLimitOptions, CHAINERUI_VERSION } from '../constants';


const RESULT_NAME_ALIGN_LEFT = 'result-name-align-left';
const RESULT_NAME_ALIGN_RIGHT = 'result-name-align-right';

const createPollingOptionElems = (options) => options.map((option) => (
  <option key={option.id} value={option.value}>{option.name}</option>
));

const createVisualizerSizeOptionElems = (options) => options.map((option) => (
  <option key={option.id} value={option.id}>{option.name}</option>
));

const createLogsLimitOptionElems = (options) => options.map((option) => (
  <option key={option.id} value={option.value}>{option.name}</option>
));

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSettingPopover = this.toggleSettingPopover.bind(this);
    this.handleChangePollingRate = this.handleChangePollingRate.bind(this);
    this.handleChangeChartSize = this.handleChangeChartSize.bind(this);
    this.handleChangeLogsLimit = this.handleChangeLogsLimit.bind(this);
    this.handleResultNameAlignmentChange = this.handleResultNameAlignmentChange.bind(this);
    this.state = {
      settingPopoverOpen: false
    };
  }

  toggleSettingPopover() {
    this.setState({
      settingPopoverOpen: !this.state.settingPopoverOpen
    });
  }

  handleChangePollingRate(e) {
    this.props.onGlobalConfigPollingRateUpdate(Number(e.target.value));
  }

  handleChangeChartSize(e) {
    const selectedId = Number(e.target.value);
    const chartSize = chartSizeOptions.find((o) => o.id === selectedId);
    this.props.onGlobalConfigChartSizeUpdate(chartSize);
  }

  handleChangeLogsLimit(e) {
    const logsLimit = Number(e.target.value);
    this.props.onGlobalConfigLogsLimitUpdate(logsLimit);
  }

  handleResultNameAlignmentChange(e) {
    const isResultNameAlignRight = (e.target.name === RESULT_NAME_ALIGN_RIGHT);
    this.props.onGlobalConfigResultNameAlignmentUpdate(isResultNameAlignRight);
  }

  render() {
    const pollingOptionElems = createPollingOptionElems(pollingOptions);
    const chartSizeElems = createVisualizerSizeOptionElems(chartSizeOptions);
    const logsLimitOptionElems = createLogsLimitOptionElems(logsLimitOptions);
    const {
      pollingRate,
      chartSize,
      logsLimit,
      isResultNameAlignRight
    } = this.props.globalConfig;

    return (
      <Navbar className="navbar-light bg-light mb-3">
        <Container fluid>
          <NavbarBrand href="/">ChainerUI</NavbarBrand>
          <Collapse isOpen>
            <span className="navbar-text mx-3 my-0">
              <PollingStatus
                pollingKey={this.props.pollingKey}
                fetchState={this.props.fetchState}
                globalConfig={this.props.globalConfig}
              />
            </span>
            <Button id="navbar-global-setting" onClick={this.toggleSettingPopover}>
              <span className="oi oi-cog" />
            </Button>
          </Collapse>
        </Container>

        <Popover
          placement="left-end"
          isOpen={this.state.settingPopoverOpen}
          target="navbar-global-setting"
          toggle={this.toggleSettingPopover}
        >
          <PopoverHeader className="popover-header">Global Settings</PopoverHeader>
          <PopoverBody className="popover-body">
            <Form>
              <FormGroup>
                <Label for="global-config-polling-rate">Results polling rate</Label><br />
                <select
                  className="form-control"
                  id="global-config-polling-rate"
                  onChange={this.handleChangePollingRate}
                  value={pollingRate}
                >
                  {pollingOptionElems}
                </select>
              </FormGroup>

              <FormGroup>
                <Label for="global-config-chart-size">Chart size</Label><br />
                <select
                  className="form-control"
                  id="global-config-chart-size"
                  value={chartSize.id}
                  onChange={this.handleChangeChartSize}
                >
                  {chartSizeElems}
                </select>
              </FormGroup>

              <FormGroup>
                <Label for="global-config-logs-limit">Max log count</Label>
                <select
                  className="form-control"
                  id="global-config-logs-limit"
                  value={logsLimit}
                  onChange={this.handleChangeLogsLimit}
                >
                  {logsLimitOptionElems}
                </select>
              </FormGroup>

              <FormGroup tag="fieldset">
                <Label>Result name alignment</Label>
                <Check
                  type="radio"
                  name={RESULT_NAME_ALIGN_LEFT}
                  checked={!isResultNameAlignRight}
                  onChange={this.handleResultNameAlignmentChange}
                >
                  <span className="mx-1 oi oi-align-left" />
                  Align left
                </Check>
                <Check
                  type="radio"
                  name={RESULT_NAME_ALIGN_RIGHT}
                  checked={!!isResultNameAlignRight}
                  onChange={this.handleResultNameAlignmentChange}
                >
                  <span className="mx-1 oi oi-align-right" />
                  Align right
                </Check>
              </FormGroup>
            </Form>
            <p className="my-0"><small>ChainerUI {CHAINERUI_VERSION}</small></p>
          </PopoverBody>
        </Popover>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  pollingKey: PropTypes.string,
  fetchState: uiPropTypes.fetchState.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  onGlobalConfigPollingRateUpdate: PropTypes.func.isRequired,
  onGlobalConfigChartSizeUpdate: PropTypes.func.isRequired,
  onGlobalConfigLogsLimitUpdate: PropTypes.func.isRequired,
  onGlobalConfigResultNameAlignmentUpdate: PropTypes.func.isRequired
};

NavigationBar.defaultProps = {
  pollingKey: undefined
};

export default NavigationBar;

