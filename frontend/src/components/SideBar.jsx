import React from 'react';
import PropTypes from 'prop-types';
import AxesConfigurator from './AxesConfigurator';


const SideBar = (props) => {
  const {
    results,
    config,
    onAxisConfigLineAdd, onAxisConfigLineUpdate, onAxisConfigLineRemove,
    onAxisConfigScaleUpdate,
    onAxisConfigXKeyUpdate,
    onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate
  } = props;
  return (
    <div className="side-bar">
      <AxesConfigurator
        {
        ...{
          results,
          config,
          onAxisConfigLineAdd,
          onAxisConfigLineUpdate,
          onAxisConfigLineRemove,
          onAxisConfigScaleUpdate,
          onAxisConfigXKeyUpdate,
          onAxisConfigScaleRangeTypeUpdate,
          onAxisConfigScaleRangeNumberUpdate
        }
        }
      />
    </div>
  );
};

SideBar.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  }).isRequired,
  onAxisConfigLineAdd: PropTypes.func.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigLineRemove: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired
};

SideBar.defaultProps = {
};

export default SideBar;

