import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
  FormGroup, Label, Input
} from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import TruncatedResultName from './TruncatedResultName';
import { line2key } from '../utils';


class LinesConfiguratorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleLineVisibilityUpdate = this.handleLineVisibilityUpdate.bind(this);
  }

  handleEditClick(e) {
    const { line, onEditClick } = this.props;

    e.preventDefault();
    e.stopPropagation();
    onEditClick(line);
  }

  handleLineVisibilityUpdate(e) {
    const { line, onVisibilityUpdate } = this.props;
    const { config } = line;
    const { checked } = e.target;

    onVisibilityUpdate(line2key(line), {
      ...line,
      config: {
        ...config,
        isVisible: checked
      }
    });
  }

  render() {
    const { line, project, result, isResultNameAlignRight } = this.props;
    const { config = {} } = line;
    const { color, isVisible } = config;

    return (
      <div
        className="list-group-item py-0"
        key={line2key(line)}
        style={{ borderLeft: `3px solid ${color}` }}
      >
        <Row>
          <Col xs="3" lg="2">
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={isVisible}
                  onChange={this.handleLineVisibilityUpdate}
                />&nbsp;
              </Label>
            </FormGroup>
          </Col>
          <Col xs="9" lg="5" className="text-truncate">
            <a href="" className="text-dark d-block" onClick={this.handleEditClick}>
              <TruncatedResultName
                project={project}
                result={result}
                isResultNameAlignRight={isResultNameAlignRight}
              />
            </a>
          </Col>
          <Col xs="12" lg="5" className="text-truncate" title={line.logKey}>
            <a href="" className="text-dark" onClick={this.handleEditClick}>{line.logKey}</a>
          </Col>
        </Row>
      </div>
    );
  }
}

LinesConfiguratorRow.propTypes = {
  line: uiPropTypes.line.isRequired,
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result.isRequired,
  isResultNameAlignRight: PropTypes.bool,
  onEditClick: PropTypes.func,
  onVisibilityUpdate: PropTypes.func
};

LinesConfiguratorRow.defaultProps = {
  isResultNameAlignRight: false,
  onEditClick: () => {},
  onVisibilityUpdate: () => {}
};

export default LinesConfiguratorRow;

