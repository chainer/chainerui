import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils';


class LineConfigurator extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { results = {}, line = {} } = this.props;
    const result = results[line.resultId] || {};
    const { config = {} } = line;
    const { truncateForward } = Utils;

    const colorBlockStyle = {
      width: '20px',
      height: '15px',
      backgroundColor: config.color
    };

    return (
      <div className="row">
        <div className="col-sm-1" style={colorBlockStyle} />
        <div className="col-sm-5">{truncateForward(result.pathName, 24)}</div>
        <div className="col-sm-4">{line.logKey}</div>
        <div className="col-sm-1">
          <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
      </div>
    );
  }
}

LineConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  line: PropTypes.shape({
    resultId: PropTypes.number,
    logKey: PropTypes.string,
    config: PropTypes.shape({
      color: PropTypes.string
    })
  })
};

LineConfigurator.defaultProps = {
  line: {}
};

export default LineConfigurator;

