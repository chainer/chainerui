import React from 'react';
import PropTypes from 'prop-types';

import * as uiPropTypes from '../store/uiPropTypes';
import AxisConfigurator from './AxisConfigurator';
import LinesConfigurator from './LinesConfigurator';
import XAxisKeySelector from './XAxisKeySelector';
import YAxisLogKeySelector from './YAxisLogKeySelector';


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
    onAxisConfigLogKeySelectToggle,
  } = props;
  const {
    xAxis = {},
    yLeftAxis = {},
    yRightAxis = {},
  } = projectConfig.axes;

  return (
    <div className="axes-configurator">
      <div className="axis-configurator card">
        <div className="card-header">yAxis</div>
        <YAxisLogKeySelector
          projectId={project.id}
          axesConfig={projectConfig.axes}
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
        <LinesConfigurator
          project={project}
          results={results}
          stats={stats}
          projectConfig={projectConfig}
          globalConfig={globalConfig}
          axisName="yRightAxis"
          onAxisConfigLineUpdate={onAxisConfigLineUpdate}
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div>Left</div>
            <AxisConfigurator
              projectId={project.id}
              axisName="yLeftAxis"
              axisConfig={yLeftAxis}
              onChangeScale={onAxisConfigScaleUpdate}
              onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
              onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
            />
          </li>
          <li className="list-group-item">
            <div>Right</div>
            <AxisConfigurator
              projectId={project.id}
              axisName="yRightAxis"
              axisConfig={yRightAxis}
              onChangeScale={onAxisConfigScaleUpdate}
              onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
              onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
            />
          </li>
        </ul>
      </div>
      <div className="axis-configurator card">
        <div className="card-header">xAxis</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <XAxisKeySelector
              projectId={project.id}
              stats={stats}
              value={xAxis.xAxisKey}
              onChange={onAxisConfigXKeyUpdate}
            />
          </li>
          <li className="list-group-item">
            <AxisConfigurator
              projectId={project.id}
              axisName="xAxis"
              axisConfig={xAxis}
              onChangeScale={onAxisConfigScaleUpdate}
              onAxisConfigScaleRangeTypeUpdate={onAxisConfigScaleRangeTypeUpdate}
              onAxisConfigScaleRangeNumberUpdate={onAxisConfigScaleRangeNumberUpdate}
            />
          </li>
        </ul>
      </div>
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
  onAxisConfigLogKeySelectToggle: PropTypes.func.isRequired,
};

export default React.memo(AxesConfigurator);
