import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup,
  Input,
  Button
} from 'reactstrap';
import { isJsonString } from '../../utils';


const isValidName = (commandName) => (commandName != null && commandName !== '');
const isValidBody = (commandBody) => commandBody === '' || isJsonString(commandBody);

const initialState = {
  commandName: '',
  commandBody: '',
  showNameError: false,
  showBodyError: false
};

class CommandForm extends React.Component {
  constructor() {
    super();

    this.handleCommandChange = this.handleCommandChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);

    this.state = initialState;
  }

  handleCommandChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { resultId, onCommandSubmit } = this.props;
    const { commandName, commandBody } = this.state;
    if (!isValidName(commandName) || !isValidBody(commandBody)) {
      this.setState({
        showNameError: true,
        showBodyError: true
      });
      return;
    }
    const commandBodyJson = commandBody === '' ? {} : JSON.parse(commandBody);
    onCommandSubmit(resultId, commandName, commandBodyJson);
  }

  handleClear() {
    this.setState({ ...initialState });
  }

  render() {
    const { commandName, commandBody, showNameError, showBodyError } = this.state;
    const isNameInvalid = showNameError && !isValidName(commandName);
    const isBodyInvalid = showBodyError && !isValidBody(commandBody);

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup color="">
          <Input
            className={['form-control-sm', isNameInvalid ? 'is-invalid' : ''].join(' ')}
            name="commandName"
            type="text"
            state=""
            placeholder="command name"
            value={commandName}
            required
            onChange={this.handleCommandChange}
            onBlur={() => { this.setState({ showNameError: true }); }}
          />
        </FormGroup>
        <FormGroup>
          <Input
            className={['form-control-sm', isBodyInvalid ? 'is-invalid' : ''].join(' ')}
            name="commandBody"
            type="textarea"
            state=""
            placeholder="body"
            value={commandBody}
            onChange={this.handleCommandChange}
            onBlur={() => { this.setState({ showBodyError: true }); }}
          />
          <div className="invalid-feedback">
            Input a valid json string.
          </div>
        </FormGroup>
        <Button color="primary" size="sm">Submit</Button>
        <Button className="mx-1" color="secondary" size="sm" onClick={this.handleClear}>Clear</Button>
      </Form>
    );
  }
}

CommandForm.propTypes = {
  resultId: PropTypes.number.isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

export default CommandForm;

