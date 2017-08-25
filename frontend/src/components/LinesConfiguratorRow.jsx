import React from 'react';
import PropTypes from 'prop-types';
import { line2key, displayName } from '../utils';


class LinesConfiguratorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
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

  render() {
    const { line, result } = this.props;
    const { config = {} } = line;

    const colorBlockStyle = {
      width: '20px',
      height: '15px',
      backgroundColor: config.color
    };

    return (
      <a
        href="#"
        className="list-group-item list-group-item-action"
        onClick={this.handleEditClick}
        key={line2key(line)}
      >
        <div className="row">
          <div className="col-sm-1" style={colorBlockStyle} />
          <div className="col-sm-5">{displayName(result)}</div>
          <div className="col-sm-4">{line.logKey}</div>
          <div className="col-sm-1">
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.handleRemoveClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </a>

    );
  }
}

LinesConfiguratorRow.propTypes = {
  line: PropTypes.shape({
    resultId: PropTypes.number,
    logKey: PropTypes.string
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

