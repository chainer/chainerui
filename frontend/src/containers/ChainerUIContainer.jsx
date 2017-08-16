import React from 'react';
import $ from 'jquery';
import path from 'path';
import * as Cookies from 'js-cookie';
import ExperimentsTable from '../components/ExperimentsTable';
import LogVisualizer from '../components/LogVisualizer';


const apiEndpoint = '/api/v1';

function rgb2Color(r, g, b) {
  const rs = (r < 16 ? '0' : '') + Math.floor(r).toString(16);
  const gs = (g < 16 ? '0' : '') + Math.floor(g).toString(16);
  const bs = (b < 16 ? '0' : '') + Math.floor(b).toString(16);
  return `#${rs}${gs}${bs}`;
}

function makeColorGradient(len) {
  const width = 127;
  const center = 128;
  const freq = (2 * Math.PI) / (len + 1);
  const colors = [];
  for (let i = 0; i < len; i += 1) {
    const r = (Math.cos((freq * i) + (Math.PI * 0.66)) * width) + center;
    const g = (Math.cos((freq * i) + (Math.PI * 1.33)) * width) + center;
    const b = (Math.cos((freq * i) + (Math.PI * 0.00)) * width) + center;
    colors.push(rgb2Color(r, g, b));
  }
  return colors;
}

class ChainerUIContainer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getStats = this.getStats.bind(this);
    this.requestExperiments = this.requestExperiments.bind(this);
    this.handleToggleResult = this.handleToggleResult.bind(this);

    this.state = {
      experiments: [],
      resultIds: Cookies.getJSON('chainerUIResultIds') || []
    };

    this.requestExperiments();
  }

  getStats() {
    const { experiments } = this.state;
    const logKeysSet = {};
    const argKeysSet = {};
    const valueRanges = {};
    let resultRowCount = 0;
    experiments.forEach((experiment) => {
      resultRowCount += (experiment.results.length === 0 ? 1 : 0);
      experiment.results.forEach((result) => {
        resultRowCount += 1;
        result.logs.forEach((log) => {
          Object.keys(log).forEach((logKey) => {
            logKeysSet[logKey] = true;
            if (valueRanges[logKey] == null) {
              valueRanges[logKey] = {
                min: Math.min(0, log[logKey]),
                max: log[logKey]
              };
            } else {
              valueRanges[logKey].min = Math.min(valueRanges[logKey].min, log[logKey]);
              valueRanges[logKey].max = Math.max(valueRanges[logKey].max, log[logKey]);
            }
          });
        });
        Object.keys(result.args).forEach((argKey) => {
          argKeysSet[argKey] = true;
        });
      });
    });
    return {
      logKeys: Object.keys(logKeysSet),
      argKeys: Object.keys(argKeysSet),
      valueRanges,
      resultRowCount
    };
  }

  requestExperiments() {
    const url = path.resolve(apiEndpoint, 'experiments');
    $.ajax({
      url,
      type: 'GET',
      dataType: 'json'
    })
      .done((data) => {
        this.setState({
          experiments: data.experiments
        });
      })
      .fail(() => {
        alert('Web API Error\nPlease check API log.'); // eslint-disable-line no-alert
      });
  }

  handleToggleResult(resultId, isToggleed) {
    const { resultIds } = this.state;
    let newResultIds = [];
    if (isToggleed) {
      newResultIds = resultIds.concat(resultId);
    } else {
      newResultIds = resultIds.filter((resId) => (resId !== resultId));
    }
    this.setState({
      resultIds: newResultIds
    });
    Cookies.set('chainerUIResultIds', newResultIds);
  }

  render() {
    const { experiments, resultIds } = this.state;
    const { logKeys, argKeys, valueRanges, resultRowCount } = this.getStats();
    const colors = makeColorGradient(resultRowCount, 0, Math.PI * 0.67, Math.PI * 1.32);

    return (
      <div className="chainer-ui-container">
        <LogVisualizer
          experiments={experiments}
          valueRanges={valueRanges}
          resultIds={resultIds}
          logKeys={logKeys}
          colors={colors}
        />
        <ExperimentsTable
          experiments={experiments}
          selectedResultIds={resultIds}
          argKeys={argKeys}
          colors={colors}
          onToggleResult={this.handleToggleResult}
        />
      </div>
    );
  }
}

export default ChainerUIContainer;

