import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../utils';
import LineConfigurator from './LineConfigurator';


class LinesConfigurator extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { results, lines = [] } = this.props;
    const { line2key } = Utils;

    const lineConfiguratorElems = lines.map((line) => (
      <li className="list-group-item" key={line2key(line)}>
        <LineConfigurator results={results} line={line} />
      </li>
    ));

    return (
      <ul className="list-group">
        {lineConfiguratorElems}
      </ul>
    );
  }
}

LinesConfigurator.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      resultId: PropTypes.number,
      logKey: PropTypes.string
    })
  )
};

LinesConfigurator.defaultProps = {
  lines: []
};

export default LinesConfigurator;

