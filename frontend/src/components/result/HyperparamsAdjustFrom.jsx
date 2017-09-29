import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input
} from 'reactstrap';
import CommandFormBase from './CommandFormBase';


const hyperparamFromLastCommand = (commands) => {
  const lastCommand = commands.filter((command) => (
    command.response && command.response.body && command.response.body.hyperparam
  ))[0];
  if (lastCommand) {
    return lastCommand.response.body.hyperparam;
  }
  return undefined;
};

class HyperparamsAdjustForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleHyperparamChange = this.handleHyperparamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      hyperparam: {}
    };
  }

  handleHyperparamChange(e) {
    const { name, value } = e.target;
    const { hyperparam } = this.state;
    this.setState({
      hyperparam: {
        ...hyperparam,
        [name]: (value == null || value === '') ? null : Number(value)
      }
    });
  }

  handleSubmit(schedule) {
    const { hyperparam } = this.state;
    const { projectId, resultId, onCommandSubmit } = this.props;
    const optimizer = 'MomentumSGD';
    const commandBody = { optimizer, hyperparam };

    onCommandSubmit(projectId, resultId, 'adjust_hyperparams', commandBody, schedule);
  }

  render() {
    const { commands } = this.props;

    const lastHyperparam = hyperparamFromLastCommand(commands) || {};

    return (
      <CommandFormBase
        title="Adjust hyperparameters (Only for MomentumSGD)"
        buttonLabel="Adjust"
        onSubmit={this.handleSubmit}
      >
        <FormGroup className="row mb-2">
          <Label htmlFor="hyperparams-adjust-form-lr" className="col-sm-6 col-form-label">
            lr
            {lastHyperparam.lr == null ? '' : ` (last value: ${lastHyperparam.lr})`}
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              name="lr"
              step="any"
              size="sm"
              id="hyperparams-adjust-form-lr"
              onChange={this.handleHyperparamChange}
            />
          </div>
        </FormGroup>
        <FormGroup className="row mb-2">
          <Label htmlFor="hyperparams-adjust-form-momentum" className="col-sm-6 col-form-label">
            momentum
            {lastHyperparam.momentum == null ? '' : ` (last value: ${lastHyperparam.momentum})`}
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              name="momentum"
              step="any"
              size="sm"
              id="hyperparams-adjust-form-momentum"
              onChange={this.handleHyperparamChange}
            />
          </div>
        </FormGroup>
      </CommandFormBase>
    );
  }
}

HyperparamsAdjustForm.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  commands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    body: PropTypes.string
  })).isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

HyperparamsAdjustForm.defaultProps = {
};

export default HyperparamsAdjustForm;

