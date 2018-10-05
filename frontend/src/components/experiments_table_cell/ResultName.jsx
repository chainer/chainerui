import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

import {
  getRelativeResultPathName,
  displayResultNameFull
} from '../../utils';

class ResultName extends React.Component {
  constructor(props) {
    super(props);
    this.handleResultNameBlur = this.handleResultNameBlur.bind(this);
    this.handleResultNameChange = this.handleResultNameChange.bind(this);
    this.handleResultNameKeyPress = this.handleResultNameKeyPress.bind(this);
    this.handleResultUpdate = this.handleResultUpdate.bind(this);

    const { result } = this.props;
    this.state = {
      resultName: result.name
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.result.id !== nextProps.result.id) {
      this.setState({
        resultName: nextProps.result.name
      });
    }
  }

  handleResultNameBlur() {
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
    const { resultName } = this.state;
    const { project, result, isResultNameAlignRight } = this.props;

    return (
      <Input
        className={`result-name text-truncate ${isResultNameAlignRight ? 'text-right' : ''}`}
        type="text"
        title={displayResultNameFull(project, result)}
        placeholder={getRelativeResultPathName(project, result)}
        value={resultName || ''}
        onChange={this.handleResultNameChange}
        onKeyPress={this.handleResultNameKeyPress}
        onBlur={this.handleResultNameBlur}
      />
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
