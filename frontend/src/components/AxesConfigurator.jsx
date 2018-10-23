import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';
import XAxisKeySelector from './XAxisKeySelector';
import AxisLogKeySelector from './AxisLogKeySelector';


const AxesConfigurator = (props) => {
  const {
    project,
    results,
    stats,
    projectConfig,
    globalConfig,
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
  } = projectConfig.axes;

  return (
    <div className="axes-configurator">
      <AxisConfigurator
        projectId={project.id}
        axisConfig={yLeftAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <AxisLogKeySelector
          projectId={project.id}
          axisConfig={yLeftAxis}
          stats={stats}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
        <LinesConfigurator
          project={project}
          results={results}
          stats={stats}
          projectConfig={projectConfig}
          globalConfig={globalConfig}
          axisName="yLeftAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
      </AxisConfigurator>
      <AxisConfigurator
        projectId={project.id}
        axisConfig={yRightAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <AxisLogKeySelector
          projectId={project.id}
          axisConfig={yRightAxis}
          stats={stats}
          onAxisConfigLogKeySelectToggle={onAxisConfigLogKeySelectToggle}
        />
        <LinesConfigurator
          project={project}
          results={results}
          stats={stats}
          projectConfig={projectConfig}
          globalConfig={globalConfig}
          axisName="yRightAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
      </AxisConfigurator>
      <AxisConfigurator
        projectId={project.id}
        axisConfig={xAxis}
        onChangeScale={onAxisConfigScaleUpdate}
        onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
        onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
      >
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <XAxisKeySelector
              projectId={project.id}
              stats={stats}
              value={xAxis.xAxisKey}
              onChange={onAxisConfigXKeyUpdate}
            />
          </li>
        </ul>
      </AxisConfigurator>
    </div>
  );
};

AxesConfigurator.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleUpdate: PropTypes.func.isRequired,
  onAxisConfigXKeyUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: PropTypes.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: PropTypes.func.isRequired,
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired
};

export default AxesConfigurator;

