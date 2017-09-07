import React from 'react';
import PropTypes from 'prop-types';
import AxesConfigurator from './AxesConfigurator';


const SideBar = (props) => {
  const {
    results,
    stats,
    config,
    onAxisConfigLineUpdate,
    onAxisConfigScaleUpdate,
    onAxisConfigXKeyUpdate,
    onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate,
    onAxisConfigLogKeySelectToggle
  } = props;
  return (
    <div className="side-bar">
      <AxesConfigurator
        {
        ...{
          results,
          stats,
          config,
          onAxisConfigLineUpdate,
          onAxisConfigScaleUpdate,
          onAxisConfigXKeyUpdate,
          onAxisConfigScaleRangeTypeUpdate,
          onAxisConfigScaleRangeNumberUpdate,
          onAxisConfigLogKeySelectToggle
        }
        }
      />
    </div>
  );
};

SideBar.propTypes = {
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  config: PropTypes.shape({
    axes: PropTypes.shape({
      xAxis: PropTypes.any,
      yLeftAxis: PropTypes.any,
      yRightAxis: PropTypes.any
    })
  }).isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

SideBar.defaultProps = {
};

export default SideBar;

