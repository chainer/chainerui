import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col, Button,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import { line2key, displayName } from '../utils';


class LinesConfiguratorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleLineVisibility = this.handleLineVisibility.bind(this);
  }

  handleEditClick(e) {
    const { line, onEditClick } = this.props;

    e.preventDefault();
    e.stopPropagation();
    onEditClick(line);
  }

  handleRemoveClick(e) {
    const { line, onRemove } = this.props;

    e.preventDefault();
    e.stopPropagation();
    onRemove(line2key(line));
  }

  handleLineVisibility(e) {
    console.log(e.target.checked);
    console.log(this);
  }

  render() {
    const { line, result } = this.props;
    const { config = {} } = line;
    const { isVisible } = config;

    return (
      <div
        className="list-group-item"
        key={line2key(line)}
        style={{ borderLeft: `3px solid ${config.color}` }}
      >
        <Row>
          <Col xs="2">
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    defaultChecked={isVisible}
                    onChange={this.handleLineVisibility}
                  />{' '}
                </Label>
              </FormGroup>
            </Form>

            <Button
              size="sm"
              color="link"
              className="m-0 p-0"
              onClick={this.handleEditClick}
            >edit</Button>
          </Col>
          <Col>{displayName(result)}</Col>
          <Col>{line.logKey}</Col>
          <Col xs="1">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.handleRemoveClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

LinesConfiguratorRow.propTypes = {
  line: PropTypes.shape({
    resultId: PropTypes.number,
    logKey: PropTypes.string,
    config: PropTypes.shape({
      isVisible: PropTypes.bool
    })
  }).isRequired,
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  onEditClick: PropTypes.func,
  onRemove: PropTypes.func
};

LinesConfiguratorRow.defaultProps = {
  onEditClick: () => {},
  onRemove: () => {}
};

export default LinesConfiguratorRow;

