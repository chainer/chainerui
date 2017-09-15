import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const initialState = {
  disabled: false
};

class CommandButton extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = initialState;
  }

  handleClick(e) {
    e.preventDefault();
    const {
      resultId,
      onCommandSubmit,
      commandName,
      freezeTime
    } = this.props;

    onCommandSubmit(resultId, commandName);

    this.setState({ disabled: true });
    setTimeout(() => {
      this.setState({ disabled: false });
    }, freezeTime);
  }

  render() {
    const { commandName, label } = this.props;
    const { disabled } = this.state;
    const buttonLabel = label || commandName;
    return (
      <Button
        color="primary"
        disabled={disabled}
        onClick={this.handleClick}
      >
        { buttonLabel }
      </Button>
    );
  }
}

CommandButton.propTypes = {
  resultId: PropTypes.number.isRequired,
  commandName: PropTypes.string.isRequired,
  label: PropTypes.string,
  freezeTime: PropTypes.number,
  onCommandSubmit: PropTypes.func.isRequired
};

CommandButton.defaultProps = {
  label: undefined,
  freezeTime: 5000
};

export default CommandButton;

