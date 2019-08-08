import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const ResultFilter = ({
  projectId,
  filterKey,
  onResultFilterUpdate,
}) => {
  const onChange = useCallback((e) => {
    onResultFilterUpdate(projectId, filterKey, e.target.value);
  }, [projectId, filterKey, onResultFilterUpdate]);

  return (
    <div>
      <input type="text" placeholder={`filter ${filterKey}`} onChange={onChange} />
    </div>
  );
};

ResultFilter.propTypes = {
  projectId: PropTypes.number.isRequired,
  filterKey: PropTypes.string.isRequired,
  onResultFilterUpdate: PropTypes.func.isRequired,
};

export default ResultFilter;
