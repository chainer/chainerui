import React from 'react';
import PropTypes from 'prop-types';
import { displayResultNameFull } from '../utils';

const TruncatedResultName = (props) => {
  const { project, result, isResultNameAlignRight } = props;
  return (
    <div className={`text-truncate ${isResultNameAlignRight ? 'text-truncate-right' : ''}`}>
      {displayResultNameFull(project, result)}
    </div>
  );
};

TruncatedResultName.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string
  }).isRequired,
  result: PropTypes.shape({
    id: PropTypes.number,
    pathName: PropTypes.string,
    name: PropTypes.string,
    args: PropTypes.arrayOf(PropTypes.any),
    logs: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  isResultNameAlignRight: PropTypes.bool
};

TruncatedResultName.defaultProps = {
  isResultNameAlignRight: false
};

export default TruncatedResultName;
