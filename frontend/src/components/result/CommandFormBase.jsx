import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form
} from 'reactstrap';
import { SCHEDULE_NOW, SCHEDULE_CUSTOM } from '../../constants';
import CommandScheduleForm from './CommandScheduleForm';


const initialState = {
  disabled: false,
  scheduleType: SCHEDULE_NOW,
  schedule: {
    value: 0,
    key: 'epoch'
  }
};

class CommandFormBase extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScheduleTypeChange = this.handleScheduleTypeChange.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);

    this.state = initialState;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      onSubmit,
      freezeTime
    } = this.props;
    const { scheduleType } = this.state;
    const schedule = (scheduleType === SCHEDULE_CUSTOM) ? this.state.schedule : null;

    onSubmit(schedule);

    this.setState({ disabled: true });
    setTimeout(() => {
      this.setState({ disabled: false });
    }, freezeTime);
  }

  handleScheduleTypeChange(scheduleType) {
    this.setState({ scheduleType });
  }

  handleScheduleChange(schedule) {
    this.setState({ schedule });
  }

  render() {
    const { disabled, schedule, scheduleType } = this.state;
    const { title, buttonLabel, children } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <Form onSubmit={this.handleSubmit}>
            <Button
              type="submit"
              color="primary"
              disabled={disabled}
            >
              { buttonLabel }
            </Button>
            <CommandScheduleForm
              schedule={schedule}
              scheduleType={scheduleType}
              onScheduleTypeChange={this.handleScheduleTypeChange}
              onScheduleChange={this.handleScheduleChange}
            />
            {children}
          </Form>
        </div>
      </div>
    );
  }
}

CommandFormBase.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  freezeTime: PropTypes.number,
  onSubmit: PropTypes.func.isRequired
};

CommandFormBase.defaultProps = {
  children: null,
  freezeTime: 1000
};

export default CommandFormBase;

