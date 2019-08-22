import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const ResultFilter = ({ projectId, filterKey, filterText, onResultFilterUpdate }) => {
  const onChange = useCallback(
    (e) => {
      onResultFilterUpdate(projectId, filterKey, e.target.value);
    },
    [projectId, filterKey, onResultFilterUpdate]
  );

  return (
    <div>
      <input
        type="text"
        placeholder={`filter ${filterKey}`}
        value={filterText}
        onChange={onChange}
      />
    </div>
  );
};

ResultFilter.propTypes = {
  projectId: PropTypes.number.isRequired,
  filterKey: PropTypes.string.isRequired,
  filterText: PropTypes.string,
  onResultFilterUpdate: PropTypes.func.isRequired,
};

ResultFilter.defaultProps = {
  filterText: '',
};

export default ResultFilter;
