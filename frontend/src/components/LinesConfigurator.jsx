import React from 'react';
import PropTypes fomr 'prop-types';


class LinesConfigurator extends React.Component {

}

LinesConfigurator.propTypes = {
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      resultId: PropTypes.number,
      logKey: PropTypes.string,
    })
  ),
}

export default LinesConfigurator;

