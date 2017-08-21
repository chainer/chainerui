import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils';


class LineConfigurator extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { entities, line = {} } = this.props;
    const { results = {} } = entities;
    const result = results[line.resultId] || {};
    const { config = {} } = line;
    const { truncateForward } = Utils;

    const colorBlockStyle = {
      display: 'inline-block',
      width: '20px',
      height: '15px',
      backgroundColor: config.color
    };

    return (
      <div>
        <span style={colorBlockStyle} />
        <span>{truncateForward(result.pathName, 25)}</span>
        <span>{line.logKey}</span>
        <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
    );
  }
}

LineConfigurator.propTypes = {
  entities: PropTypes.shape({
    results: PropTypes.objectOf(PropTypes.any)
  }).isRequired,
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

