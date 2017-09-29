import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input
} from 'reactstrap';
import CommandFormBase from './CommandFormBase';


class HyperparamsAdjustForm extends React.Component {
  constructor() {
    super();

    this.handleLRChange = this.handleLRChange.bind(this);
    this.handleMomentumChange = this.handleMomentumChange.bind(this);

    this.state = {
      lr: null,
      momentum: null
    };
  }

  handleLRChange(e) {
    const { value } = e.target;
    this.setState({
      lr: (value == null || value === '') ? null : Number(value)
    });
  }

  handleMomentumChange(e) {
    const { value } = e.target;
    this.setState({
      momentum: (value == null || value === '') ? null : Number(value)
    });
  }

  render() {
    const { lr, momentum } = this.state;
    const { projectId, resultId, onCommandSubmit } = this.props;

    const commandBody = {
      optimizer: 'MomentumSGD',
      hyperparam: { lr, momentum }
    };

    return (
      <CommandFormBase
        projectId={projectId}
        resultId={resultId}
        commandName="adjust_hyperparams"
        commandBody={commandBody}
        title="Adjust hyperparameters (Only for MomentumSGD)"
        buttonLabel="Adjust"
        onCommandSubmit={onCommandSubmit}
      >
        <FormGroup className="row mb-2">
          <Label htmlFor="hyperparams-adjust-form-lr" className="col-sm-6 col-form-label">
          lr
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              step="any"
              size="sm"
              id="hyperparams-adjust-form-lr"
              onChange={this.handleLRChange}
            />
          </div>
        </FormGroup>
        <FormGroup className="row mb-2">
          <Label htmlFor="hyperparams-adjust-form-momentum" className="col-sm-6 col-form-label">
          momentum
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              step="any"
              size="sm"
              id="hyperparams-adjust-form-momentum"
              onChange={this.handleMomentumChange}
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
  onCommandSubmit: PropTypes.func.isRequired
};

HyperparamsAdjustForm.defaultProps = {
};

export default HyperparamsAdjustForm;

