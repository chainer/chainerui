import React from 'react';
import PropTypes from 'prop-types';

const ResultFilter = ({
  filterKey,
}) => (
  <div>
    <input type="text" placeholder={`filter ${filterKey}`} />
  </div>
);

ResultFilter.propTypes = {
  filterKey: PropTypes.string.isRequired,
};

export default ResultFilter;
