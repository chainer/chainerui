import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';


const SCHEDULE_NOW = 'scheduleNow';
const SCHEDULE_CUSTOM = 'scheduleCustom';

const initialState = {
  disabled: false,
  scheduleType: SCHEDULE_NOW,
  schedule: {
    value: 0,
    key: 'epoch'
  }
};

class SnapshotTakeForm extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleScheduleTypeChange = this.handleScheduleTypeChange.bind(this);
    this.handleScheduleValueChange = this.handleScheduleValueChange.bind(this);
    this.handleScheduleKeyChange = this.handleScheduleKeyChange.bind(this);

    this.state = initialState;
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      projectId,
      resultId,
      onCommandSubmit,
      commandName,
      freezeTime
    } = this.props;
    const { scheduleType } = this.state;

    const schedule = (scheduleType === SCHEDULE_CUSTOM) ? this.state.schedule : null;
    onCommandSubmit(projectId, resultId, commandName, null, schedule);

    this.setState({ disabled: true });
    setTimeout(() => {
      this.setState({ disabled: false });
    }, freezeTime);
  }

  handleScheduleTypeChange(e) {
    this.setState({
      scheduleType: e.target.name
    });
  }

  handleScheduleValueChange(e) {
    const { schedule } = this.state;
    this.setState({
      schedule: {
        value: Number(e.target.value),
        key: schedule.key
      }
    });
  }

  handleScheduleKeyChange(e) {
    const { schedule } = this.state;
    this.setState({
      schedule: {
        value: schedule.value,
        key: e.target.value
      }
    });
  }

  render() {
    const { disabled, schedule, scheduleType } = this.state;
    const buttonLabel = 'Take snapshot';
    return (
      <div className="card">
        <div className="card-body">
          <Form className="form-inline" onSubmit={this.handleSubmit}>
            <Button
              type="submit"
              color="primary"
              disabled={disabled}
            >
              { buttonLabel }
            </Button>
            <FormGroup>
              <FormGroup check className="form-check-inline ml-3">
                <Label check>
                  <Input
                    type="radio"
                    name={SCHEDULE_NOW}
                    checked={scheduleType === SCHEDULE_NOW}
                    onChange={this.handleScheduleTypeChange}
                  />now
                </Label>
              </FormGroup>
              <FormGroup check className="form-check-inline">
                <Label check>
                  <Input
                    type="radio"
                    name={SCHEDULE_CUSTOM}
                    checked={scheduleType === SCHEDULE_CUSTOM}
                    onChange={this.handleScheduleTypeChange}
                  />schedule
                  <Input
                    type="number"
                    className="ml-3"
                    size="sm"
                    min="0"
                    step="1"
                    placeholder={`# ${schedule.key}`}
                    disabled={scheduleType !== SCHEDULE_CUSTOM}
                    value={schedule.value}
                    onChange={this.handleScheduleValueChange}
                  />
                  <Input
                    type="select"
                    size="sm"
                    disabled={scheduleType !== SCHEDULE_CUSTOM}
                    value={schedule.key}
                    onChange={this.handleScheduleKeyChange}
                  >
                    <option value="epoch">epoch</option>
                    <option value="iteration">iteration</option>
                  </Input>
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

SnapshotTakeForm.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  commandName: PropTypes.string.isRequired,
  freezeTime: PropTypes.number,
  onCommandSubmit: PropTypes.func.isRequired
};

SnapshotTakeForm.defaultProps = {
  freezeTime: 1000
};

export default SnapshotTakeForm;

