import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Collapse, Navbar, NavbarBrand,
  Popover, PopoverTitle, PopoverContent,
  Form, FormGroup, Label,
  Button
} from 'reactstrap';
import PollingStatus from './PollingStatus';
import { chartSizeOptions, pollingOptions, CHAINERUI_VERSION } from '../constants';


const createPollingOptionElems = (options) => [
  ...options.map((option) => (
    <option key={option.id} value={option.value}>{option.name}</option>
  ))
];

const createVisualizerSizeOptionElems = (options) => [
  ...options.map((option) => (
    <option key={option.id} value={option.id}>{option.name}</option>
  ))
];

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSettingPopover = this.toggleSettingPopover.bind(this);
    this.handleChangePollingRate = this.handleChangePollingRate.bind(this);
    this.handleChangeChartSize = this.handleChangeChartSize.bind(this);
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

  render() {
    const pollingOptionElems = createPollingOptionElems(pollingOptions);
    const chartSizeElems = createVisualizerSizeOptionElems(chartSizeOptions);
    const { chartSize = {} } = this.props.globalConfig;

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
          placement="left bottom"
          isOpen={this.state.settingPopoverOpen}
          target="navbar-global-setting"
          toggle={this.toggleSettingPopover}
        >
          <PopoverTitle className="popover-header">Global Setting</PopoverTitle>
          <PopoverContent className="popover-body">
            <Form>
              <FormGroup>
                <Label for="global-config-polling-rate">Results polling rate</Label><br />
                <select
                  className="form-control"
                  type="select"
                  name="select"
                  id="global-config-polling-rate"
                  onChange={this.handleChangePollingRate}
                  value={this.props.globalConfig.pollingRate}
                >
                  {pollingOptionElems}
                </select>
              </FormGroup>

              <FormGroup>
                <Label for="global-config-chart-size">Chart size</Label><br />
                <select
                  className="form-control"
                  type="select"
                  name="select"
                  id="global-config-chart-size"
                  value={chartSize.id}
                  onChange={this.handleChangeChartSize}
                >
                  {chartSizeElems}
                </select>
              </FormGroup>
            </Form>
            <p className="my-0"><small>ChainerUI {CHAINERUI_VERSION}</small></p>
          </PopoverContent>
        </Popover>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  pollingKey: PropTypes.string,
  fetchState: PropTypes.shape({
    resultList: PropTypes.string
  }).isRequired,
  globalConfig: PropTypes.shape({
    pollingRate: PropTypes.number,
    chartSize: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
  onGlobalConfigPollingRateUpdate: PropTypes.func.isRequired,
  onGlobalConfigChartSizeUpdate: PropTypes.func.isRequired
};

NavigationBar.defaultProps = {
  pollingKey: undefined
};

export default NavigationBar;

