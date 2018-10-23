import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input
} from 'reactstrap';
import { SCHEDULE_NOW, SCHEDULE_CUSTOM } from '../../constants';


class CommandScheduleForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleScheduleTypeChange = this.handleScheduleTypeChange.bind(this);
    this.handleScheduleValueChange = this.handleScheduleValueChange.bind(this);
    this.handleScheduleKeyChange = this.handleScheduleKeyChange.bind(this);
  }

  handleScheduleTypeChange(e) {
    this.props.onScheduleTypeChange(e.target.name);
  }

  handleScheduleValueChange(e) {
    const { schedule, onScheduleChange } = this.props;
    onScheduleChange({
      ...schedule,
      value: Number(e.target.value)
    });
  }

  handleScheduleKeyChange(e) {
    const { schedule, onScheduleChange } = this.props;
    onScheduleChange({
      ...schedule,
      key: e.target.value
    });
  }

  render() {
    const { schedule, scheduleType } = this.props;
    return (
      <FormGroup className="form-inline">
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
              bsSize="sm"
              min="0"
              step="1"
              placeholder={`# ${schedule.key}`}
              disabled={scheduleType !== SCHEDULE_CUSTOM}
              value={schedule.value}
              onChange={this.handleScheduleValueChange}
            />
            <Input
              type="select"
              bsSize="sm"
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
    );
  }
}

CommandScheduleForm.propTypes = {
  scheduleType: PropTypes.oneOf([SCHEDULE_NOW, SCHEDULE_CUSTOM]).isRequired,
  schedule: PropTypes.shape({
    value: PropTypes.number,
    key: PropTypes.oneOf(['epoch', 'iteration'])
  }).isRequired,
  onScheduleTypeChange: PropTypes.func.isRequired,
  onScheduleChange: PropTypes.func.isRequired
};

export default CommandScheduleForm;

