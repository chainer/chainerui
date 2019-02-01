import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form,
  Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { SCHEDULE_NOW, SCHEDULE_CUSTOM } from '../../constants';
import CommandScheduleForm from './CommandScheduleForm';


const initialState = {
  disabled: false,
  scheduleType: SCHEDULE_NOW,
  schedule: {
    value: 0,
    key: 'epoch',
  },
  showConfirmationModal: false,
};

class CommandFormBase extends React.Component {
  constructor(props) {
    super(props);

    this.openConfirmationModal = this.openConfirmationModal.bind(this);
    this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
    this.submitCommand = this.submitCommand.bind(this);
    this.handleScheduleTypeChange = this.handleScheduleTypeChange.bind(this);
    this.handleScheduleChange = this.handleScheduleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = initialState;
  }

  openConfirmationModal() {
    this.setState({
      showConfirmationModal: true,
    });
  }

  closeConfirmationModal() {
    this.setState({
      showConfirmationModal: false,
    });
  }

  submitCommand() {
    const {
      onSubmit,
      freezeTime,
    } = this.props;
    const { scheduleType } = this.state;
    const schedule = (scheduleType === SCHEDULE_CUSTOM) ? this.state.schedule : null;

    onSubmit(schedule);
    this.closeConfirmationModal();

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

  handleSubmit(e) {
    const { needConfirmation } = this.props;

    e.preventDefault();
    if (needConfirmation) {
      this.openConfirmationModal();
    } else {
      this.submitCommand();
    }
  }

  render() {
    const { disabled, schedule, scheduleType, showConfirmationModal } = this.state;
    const { title, buttonLabel, children, confirmationMessage } = this.props;
    const confirmationTitle = this.props.confirmationTitle || title;
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

            <Modal isOpen={showConfirmationModal}>
              <ModalHeader>{confirmationTitle}</ModalHeader>
              <ModalBody>
                {confirmationMessage}
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.closeConfirmationModal}>Cancel</Button>
                <Button color="primary" onClick={this.submitCommand}>Submit</Button>
              </ModalFooter>
            </Modal>

          </Form>
        </div>
      </div>
    );
  }
}

CommandFormBase.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  needConfirmation: PropTypes.bool,
  confirmationTitle: PropTypes.string,
  confirmationMessage: PropTypes.node,
  freezeTime: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

CommandFormBase.defaultProps = {
  needConfirmation: false,
  confirmationTitle: '',
  confirmationMessage: 'Are you sure to submit this command?',
  freezeTime: 1000,
  children: null,
};

export default CommandFormBase;

