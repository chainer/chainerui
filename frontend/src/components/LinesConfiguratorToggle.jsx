import React from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse } from 'reactstrap';

import * as uiPropTypes from '../store/uiPropTypes';
import LinesConfigurator from './LinesConfigurator';

class LinesConfiguratorToggle extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLinesConfig = this.toggleLinesConfig.bind(this);

    this.state = {
      showLinesConfig: false,
    };
  }

  toggleLinesConfig() {
    this.setState((prevState) => ({
      showLinesConfig: !prevState.showLinesConfig,
    }));
  }

  render() {
    const {
      project,
      results,
      stats,
      projectConfig,
      globalConfig,
      onAxisConfigLineUpdate,
    } = this.props;

    return (
      <div className="list-group list-group-flush">
        <div className="list-group-item">
          <Button size="sm" className="my-2" onClick={this.toggleLinesConfig}>
            Toggle lines setting
          </Button>
        </div>
        <Collapse isOpen={this.state.showLinesConfig}>
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
        </Collapse>
      </div>
    );
  }
}

LinesConfiguratorToggle.propTypes = {
  project: uiPropTypes.project.isRequired,
  results: uiPropTypes.results.isRequired,
  stats: uiPropTypes.stats.isRequired,
  projectConfig: uiPropTypes.projectConfig.isRequired,
  globalConfig: uiPropTypes.globalConfig.isRequired,
  onAxisConfigLineUpdate: PropTypes.func.isRequired,
};

export default LinesConfiguratorToggle;
