import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input,
} from 'reactstrap';

import * as uiPropTypes from '../../store/uiPropTypes';
import Select from '../FormControl/Select';
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

    this.handleOptimizerChange = this.handleOptimizerChange.bind(this);
    this.handleHyperparamChange = this.handleHyperparamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      optimizer: 'MomentumSGD',
      hyperparam: {},
    };
  }

  handleOptimizerChange(e) {
    const { value } = e.target;
    this.setState({
      optimizer: value,
    });
  }

  handleHyperparamChange(e) {
    const { name, value } = e.target;
    const { hyperparam } = this.state;
    this.setState({
      hyperparam: {
        ...hyperparam,
        [name]: (value == null || value === '') ? null : Number(value),
      },
    });
  }

  handleSubmit(schedule) {
    const { optimizer, hyperparam } = this.state;
    const { projectId, resultId, onCommandSubmit } = this.props;
    const commandBody = { optimizer, hyperparam };

    onCommandSubmit(projectId, resultId, 'adjust_hyperparams', commandBody, schedule);
  }

  render() {
    const { optimizer } = this.state;
    const { commands } = this.props;

    const lastHyperparam = hyperparamFromLastCommand(commands) || {};

    return (
      <CommandFormBase
        title="Adjust hyperparameters"
        buttonLabel="Adjust"
        onSubmit={this.handleSubmit}
      >
        <FormGroup row className="mt-2">
          <Label htmlFor="hyperparams-adjust-form-optimizer" className="col-sm-6 col-form-label">
            optimizer
          </Label>
          <div className="col-sm-6">
            <Select
              id="hyperparams-adjust-from-optimizer"
              value={optimizer}
              onChange={this.handleOptimizerChange}
              values={['MomentumSGD']}
            />
          </div>
        </FormGroup>
        <FormGroup row>
          <Label htmlFor="hyperparams-adjust-form-lr" className="col-sm-6 col-form-label">
            lr
            {lastHyperparam.lr == null ? '' : ` (last value: ${lastHyperparam.lr})`}
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              name="lr"
              step="any"
              bsSize="sm"
              id="hyperparams-adjust-form-lr"
              onChange={this.handleHyperparamChange}
            />
          </div>
        </FormGroup>
        <FormGroup row className="mb-0">
          <Label htmlFor="hyperparams-adjust-form-momentum" className="col-sm-6 col-form-label">
            momentum
            {lastHyperparam.momentum == null ? '' : ` (last value: ${lastHyperparam.momentum})`}
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              name="momentum"
              step="any"
              bsSize="sm"
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
  projectId: uiPropTypes.projectId.isRequired,
  resultId: uiPropTypes.resultId.isRequired,
  commands: uiPropTypes.commands.isRequired,
  onCommandSubmit: PropTypes.func.isRequired,
};

export default HyperparamsAdjustForm;

