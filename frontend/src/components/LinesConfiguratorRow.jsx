import React from 'react';
import PropTypes from 'prop-types';
import {
  Row, Col,
  Form, FormGroup, Label, Input
} from 'reactstrap';
import { line2key, displayName } from '../utils';


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
    const { line, result } = this.props;
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
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    checked={isVisible}
                    onChange={this.handleLineVisibilityUpdate}
                  />{' '}
                </Label>
              </FormGroup>
            </Form>
          </Col>
          <Col xs="9" lg="5" className="text-truncate" title={result.name || result.pathName}>
            <a href="" className="text-dark" onClick={this.handleEditClick}>{displayName(result, { length: 10 })}</a>
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
  onVisibilityUpdate: PropTypes.func
};

LinesConfiguratorRow.defaultProps = {
  onEditClick: () => {},
  onVisibilityUpdate: () => {}
};

export default LinesConfiguratorRow;

