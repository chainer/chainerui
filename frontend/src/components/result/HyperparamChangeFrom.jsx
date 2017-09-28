import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input
} from 'reactstrap';
import CommandFormBase from './CommandFormBase';


class HyperparamChangeForm extends React.Component {
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
    return (
      <CommandFormBase
        projectId={projectId}
        resultId={resultId}
        commandName="change_hyperparam"
        commandBody={{ lr, momentum }}
        title="Change hyperparameters (Only for MomentumSGD)"
        buttonLabel="Change"
        onCommandSubmit={onCommandSubmit}
      >
        <FormGroup className="row mb-2">
          <Label htmlFor="hyperparam-change-form-lr" className="col-sm-6 col-form-label">
          lr
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              step="any"
              size="sm"
              id="hyperparam-change-form-lr"
              onChange={this.handleLRChange}
            />
          </div>
        </FormGroup>
        <FormGroup className="row mb-2">
          <Label htmlFor="hyperparam-change-form-momentum" className="col-sm-6 col-form-label">
          momentum
          </Label>
          <div className="col-sm-6">
            <Input
              type="number"
              step="any"
              size="sm"
              id="hyperparam-change-form-momentum"
              onChange={this.handleMomentumChange}
            />
          </div>
        </FormGroup>
      </CommandFormBase>
    );
  }
}

HyperparamChangeForm.propTypes = {
  projectId: PropTypes.number.isRequired,
  resultId: PropTypes.number.isRequired,
  onCommandSubmit: PropTypes.func.isRequired
};

HyperparamChangeForm.defaultProps = {
};

export default HyperparamChangeForm;

