import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils';


class LinesConfiguratorRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleRemoveClick() {
    const { line2key } = Utils;
    const { line, onRemove } = this.props;

    onRemove(line2key(line));
  }

  render() {
    const { line2key, displayName, truncateForward } = Utils;
    const { line, result } = this.props;
    const { config = {} } = line;

    const colorBlockStyle = {
      width: '20px',
      height: '15px',
      backgroundColor: config.color
    };

    return (
      <li className="list-group-item" key={line2key(line)}>
        <div className="row">
          <div className="col-sm-1" style={colorBlockStyle} />
          <div className="col-sm-5">{truncateForward(displayName(result), 24)}</div>
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
      </li>

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
  onRemove: PropTypes.func
};

LinesConfiguratorRow.defaultProps = {
  onRemove: () => {}
};

export default LinesConfiguratorRow;

