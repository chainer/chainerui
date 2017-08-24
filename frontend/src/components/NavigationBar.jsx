import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Collapse, Navbar, NavbarBrand,
  Popover, PopoverTitle, PopoverContent,
  Form, FormGroup, Label,
  Button
} from 'reactstrap';


const pollingOptions = [
  {
    id: 1,
    name: 'stop',
    value: 0
  },
  {
    id: 2,
    name: '5s',
    value: (5 * 1000)
  },
  {
    id: 3,
    name: '10s',
    value: (10 * 1000)
  },
  {
    id: 4,
    name: '15s',
    value: (15 * 1000)
  },
  {
    id: 5,
    name: '20s',
    value: (20 * 1000)
  }
];

const createPollingOptionElems = (options) => [
  ...options.map((option) => (
    <option key={option.id} value={option.value}>{option.name}</option>
  ))
];

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSettingPopover = this.toggleSettingPopover.bind(this);
    this.handlePollingRate = this.handlePollingRate.bind(this);
    this.state = {
      settingPopoverOpen: false
    };
  }

  toggleSettingPopover() {
    this.setState({
      settingPopoverOpen: !this.state.settingPopoverOpen
    });
  }

  handlePollingRate(e) {
    this.props.onGlobalConfigPollingRateUpdate(Number(e.target.value));
  }

  render() {
    const pollingOptionElems = createPollingOptionElems(pollingOptions);

    return (
      <Navbar className="navbar-light bg-light mb-3">
        <Container fluid>
          <NavbarBrand href="/">Chainer UI</NavbarBrand>
          <Collapse isOpen>
            <Button id="navbar-global-setting" onClick={this.toggleSettingPopover}>
              <span className="oi oi-cog" />
            </Button>
          </Collapse>
        </Container>

        <Popover placement="bottom" isOpen={this.state.settingPopoverOpen} target="navbar-global-setting" toggle={this.toggleSettingPopover}>
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
                  onChange={this.handlePollingRate}
                  value={this.props.config.global.pollingRate}
                >
                  {pollingOptionElems}
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
  config: PropTypes.shape({
    global: PropTypes.shape({
      pollingRate: PropTypes.number
    })
  }),
  onGlobalConfigPollingRateUpdate: PropTypes.func.isRequired
};

NavigationBar.defaultProps = {
  config: {}
};

export default NavigationBar;

