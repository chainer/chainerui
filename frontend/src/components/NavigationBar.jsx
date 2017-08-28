import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Collapse, Navbar, NavbarBrand,
  Popover, PopoverTitle, PopoverContent,
  Form, FormGroup, Label,
  Button
} from 'reactstrap';
import ResultsFetchState from './ResultsFetchState';
import { chartSizeOptions, pollingOptions } from '../constants';


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
    const { chartSize = {} } = this.props.config.global;

    return (
      <Navbar className="navbar-light bg-light mb-3">
        <Container fluid>
          <NavbarBrand href="/">Chainer UI</NavbarBrand>
          <Collapse isOpen>
            <span className="navbar-text mx-3 my-0">
              <ResultsFetchState fetchState={this.props.fetchState} config={this.props.config} />
            </span>
            <Button id="navbar-global-setting" onClick={this.toggleSettingPopover}>
              <span className="oi oi-cog" />
            </Button>
          </Collapse>
        </Container>

        <Popover placement="left bottom" isOpen={this.state.settingPopoverOpen} target="navbar-global-setting" toggle={this.toggleSettingPopover}>
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
                  value={this.props.config.global.pollingRate}
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
          </PopoverContent>
        </Popover>
      </Navbar>
    );
  }
}

NavigationBar.propTypes = {
  fetchState: PropTypes.shape({
    results: PropTypes.string
  }).isRequired,
  config: PropTypes.shape({
    global: PropTypes.shape({
      pollingRate: PropTypes.number,
      chartSize: PropTypes.objectOf(PropTypes.any)
    })
  }),
  onGlobalConfigPollingRateUpdate: PropTypes.func.isRequired,
  onGlobalConfigChartSizeUpdate: PropTypes.func.isRequired
};

NavigationBar.defaultProps = {
  config: {}
};

export default NavigationBar;

