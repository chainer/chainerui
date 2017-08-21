import React from 'react';
import PropTypes from 'prop-types';


class LineConfigurator extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { results, line = {} } = this.props;
    console.log(results.length, line.length);
    return (
      <div className="row" />
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

