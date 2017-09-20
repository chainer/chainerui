import React from 'react';
import PropTypes from 'prop-types';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';
import XAxisKeySelector from './XAxisKeySelector';
import AxisLogKeySelector from './AxisLogKeySelector';


const AxesConfigurator = (props) => {
  const {
    projectId,
    results,
    stats,
    projectConfig,
    onAxisConfigLineUpdate,
    onAxisConfigScaleUpdate,
    onAxisConfigXKeyUpdate,
    onAxisConfigScaleRangeTypeUpdate, onAxisConfigScaleRangeNumberUpdate,
    onAxisConfigLogKeySelectToggle
  } = props;
  const {
    xAxis = { axisName: 'xAxis' },
    yLeftAxis = { axisName: 'yLeftAxis' },
    yRightAxis = { axisName: 'yRightAxis' }
  } = projectConfig.axes || {};

  return (
    <div className="axes-configurator">
      <AxisConfigurator
        projectId={projectId}
        axisConfig={yLeftAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <AxisLogKeySelector
          axisConfig={yLeftAxis}
          stats={stats}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
        <LinesConfigurator
          results={results}
          stats={stats}
          projectConfig={projectConfig}
          axisName="yLeftAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
      </AxisConfigurator>
      <AxisConfigurator
        projectId={projectId}
        axisConfig={yRightAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <AxisLogKeySelector
          axisConfig={yRightAxis}
          stats={stats}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
        <LinesConfigurator
          results={results}
          stats={stats}
          projectConfig={projectConfig}
          axisName="yRightAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
      </AxisConfigurator>
      <AxisConfigurator
        projectId={projectId}
        axisConfig={xAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <XAxisKeySelector value={xAxis.xAxisKey} onChange={onAxisConfigXKeyUpdate} />
          </li>
        </ul>
      </AxisConfigurator>
    </div>
  );
};

AxesConfigurator.propTypes = {
  projectId: PropTypes.number.isRequired,
  results: PropTypes.objectOf(PropTypes.any).isRequired,
  stats: PropTypes.shape({
    logKeys: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  projectConfig: PropTypes.shape({
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

AxesConfigurator.defaultProps = {
};

export default AxesConfigurator;

