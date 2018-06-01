import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input } from 'reactstrap';

import {
  getRelativeResultPathName,
  displayResultNameFull,
  truncate
} from '../../utils';

class ResultName extends React.Component {
  constructor(props) {
    super(props);
    this.handleResultNameFocus = this.handleResultNameFocus.bind(this);
    this.handleResultNameBlur = this.handleResultNameBlur.bind(this);
    this.handleResultNameChange = this.handleResultNameChange.bind(this);
    this.handleResultNameKeyPress = this.handleResultNameKeyPress.bind(this);
    this.handleResultUpdate = this.handleResultUpdate.bind(this);

    const { result } = this.props;
    this.state = {
      resultName: result.name,
      resultNameFocused: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.result.id !== nextProps.result.id) {
      this.setState({
        resultName: nextProps.result.name
      });
    }
  }

  handleResultNameFocus() {
    setTimeout(() => {
      this.setState({
        resultNameFocused: true
      });
    }, 100);
  }

  handleResultNameBlur() {
    this.setState({
      resultNameFocused: false
    });
    this.handleResultUpdate();
  }

  handleResultNameChange(e) {
    this.setState({
      resultName: e.target.value
    });
  }

  handleResultNameKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleResultUpdate();
    }
  }

  handleResultUpdate() {
    const { project, result, onResultUpdate } = this.props;
    const { resultName } = this.state;
    if (resultName !== result.name) {
      onResultUpdate(project.id, { ...result, name: resultName });
    }
  }

  render() {
    const { resultName, resultNameFocused } = this.state;
    const { project, result, isResultNameAlignRight } = this.props;

    const truncateConfig = { length: 22, forward: isResultNameAlignRight };
    const resultNameInputStyle = {
      float: isResultNameAlignRight ? 'right' : 'left',
      direction: (isResultNameAlignRight && !resultNameFocused) ? 'rtl' : 'ltr',
      width: '100%'
    };

    return (
      <Form inline onSubmit={(e) => { e.preventDefault(); }}>
        <FormGroup style={{ width: '100%' }}>
          <Input
            className={`result-name ${isResultNameAlignRight ? 'text-right' : ''}`}
            type="text"
            title={displayResultNameFull(project, result)}
            style={resultNameInputStyle}
            placeholder={truncate(getRelativeResultPathName(project, result), truncateConfig)}
            value={resultName || ''}
            onChange={this.handleResultNameChange}
            onKeyPress={this.handleResultNameKeyPress}
            onFocus={this.handleResultNameFocus}
            onBlur={this.handleResultNameBlur}
          />
        </FormGroup>
      </Form>
    );
  }
}

ResultName.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string
  }).isRequired,
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  isResultNameAlignRight: PropTypes.bool,
  onResultUpdate: PropTypes.func.isRequired
};

ResultName.defaultProps = {
  isResultNameAlignRight: false
};

export default ResultName;
