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
      projectId,
      resultId,
      onCommandSubmit,
      commandName,
      commandBody,
      freezeTime
    } = this.props;
    const { scheduleType } = this.state;
    const schedule = (scheduleType === SCHEDULE_CUSTOM) ? this.state.schedule : null;

    onCommandSubmit(projectId, resultId, commandName, commandBody, schedule);

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
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  commandName: PropTypes.string.isRequired,
  commandBody: PropTypes.objectOf(PropTypes.any),
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  freezeTime: PropTypes.number,
  onCommandSubmit: PropTypes.func.isRequired
};

CommandFormBase.defaultProps = {
  commandBody: null,
  children: null,
  freezeTime: 1000
};

export default CommandFormBase;

