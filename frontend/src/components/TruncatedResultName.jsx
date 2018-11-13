import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import { displayResultNameFull } from '../utils';

const TruncatedResultName = (props) => {
  const { project, result, isResultNameAlignRight } = props;
  const resultNameFull = displayResultNameFull(project, result);

  return (
    <div
      className={`text-truncate ${isResultNameAlignRight ? 'text-right' : ''}`}
      title={resultNameFull}
    >
      {resultNameFull}
    </div>
  );
};

TruncatedResultName.propTypes = {
  project: uiPropTypes.project.isRequired,
  result: uiPropTypes.result.isRequired,
  isResultNameAlignRight: PropTypes.bool.isRequired
};

export default TruncatedResultName;
