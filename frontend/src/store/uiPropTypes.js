import PropTypes from 'prop-types';
import { CHART_DOWNLOAD_STATUS } from '../constants';

export const projectId = PropTypes.number;

export const project = PropTypes.shape({
  id: projectId,
  pathName: PropTypes.string,
  name: PropTypes.string
});

export const projects = PropTypes.objectOf(project);

export const resultId = PropTypes.number;

export const logs = PropTypes.arrayOf(PropTypes.shape({
  resultId,
  id: PropTypes.number,
  logItems: PropTypes.arrayOf(PropTypes.shape({
    logId: PropTypes.number,
    key: PropTypes.string.isRequired,
    value: PropTypes.any
  })).isRequired
}));

export const args = PropTypes.arrayOf(PropTypes.shape({
  resultId,
  key: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired
}));

export const commands = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  request: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    schedule: PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    }),
    body: PropTypes.object
  }).isRequired,
  response: PropTypes.shape({
    status: PropTypes.string.isRequired,
    epoch: PropTypes.number.isRequired,
    iteration: PropTypes.number.isRequired,
    elapsed_time: PropTypes.number,
    executed_at: PropTypes.string,
    body: PropTypes.object
  })
}));

export const snapshots = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  iteration: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
}));

export const result = PropTypes.shape({
  id: resultId,
  pathName: PropTypes.string,
  name: PropTypes.string,
  group: PropTypes.string,
  isUnregistered: PropTypes.bool,
  logs,
  args,
  commands,
  snapshots
});

export const results = PropTypes.objectOf(result);

export const fetchState = PropTypes.shape({
  resultList: PropTypes.string
});

export const line = PropTypes.shape({
  resultId,
  logKey: PropTypes.string,
  config: PropTypes.shape({
    color: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
  })
});

export const lines = PropTypes.objectOf(line);

export const chartSize = PropTypes.shape({
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  aspect: PropTypes.number.isRequired
});

export const globalConfig = PropTypes.shape({
  chartSize: chartSize.isRequired,
  pollingRate: PropTypes.number.isRequired,
  logsLimit: PropTypes.number.isRequired,
  isResultNameAlignRight: PropTypes.bool.isRequired
});

export const resultConfig = PropTypes.shape({
  hidden: PropTypes.bool.isRequired
});

export const resultsConfig = PropTypes.objectOf(resultConfig);

export const logKeyConfig = PropTypes.shape({
  selected: PropTypes.bool.isRequired
});

const logKeysConfig = PropTypes.objectOf(logKeyConfig);

export const axisName = PropTypes.string;

export const axisConfig = PropTypes.shape({
  logKeysConfig,
  scale: PropTypes.string,
  scaleRange: PropTypes.objectOf(PropTypes.shape({
    range: PropTypes.arrayOf(PropTypes.number).isRequired,
    rangeTypes: PropTypes.arrayOf(PropTypes.string).isRequired
  }))
});

export const projectConfig = PropTypes.shape({
  axes: PropTypes.shape({
    xAxis: axisConfig,
    yLeftAxis: axisConfig,
    yRightAxis: axisConfig
  }).isRequired,
  tableState: PropTypes.shape({
    expanded: PropTypes.oneOfType([
      PropTypes.bool, PropTypes.object
    ]),
    hiddenLogKeys: PropTypes.arrayOf(PropTypes.string),
    hiddenArgKeys: PropTypes.arrayOf(PropTypes.string),
    isGrouped: PropTypes.bool
  }).isRequired,
  resultsConfig: resultsConfig.isRequired,
  lines: lines.isRequired
});

export const stats = PropTypes.shape({
  argKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  logKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  xAxisKeys: PropTypes.arrayOf(PropTypes.string).isRequired
});

export const assets = PropTypes.arrayOf(PropTypes.shape({
  contents: PropTypes.arrayOf(PropTypes.any),
  trainInfo: PropTypes.objectOf(PropTypes.any)
}));

export const resultStatus = PropTypes.shape({
  selected: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
});

export const resultsStatus = PropTypes.objectOf(resultStatus);

export const projectStatus = PropTypes.shape({
  chartDownloadStatus: PropTypes.oneOf(Object.values(CHART_DOWNLOAD_STATUS)),
  resultsStatus
});

export const projectsStatus = PropTypes.objectOf(projectStatus);

export const status = PropTypes.shape({
  projectsStatus
});
