import PropTypes from 'prop-types';

export const projectId = PropTypes.number;

export const project = PropTypes.shape({
  id: projectId,
  pathName: PropTypes.string,
  name: PropTypes.string
});

export const projects = PropTypes.objectOf(project);

export const resultId = PropTypes.number;

export const args = PropTypes.arrayOf(PropTypes.shape({
  resultId,
  key: PropTypes.string,
  value: PropTypes.any
}));

export const result = PropTypes.shape({
  id: resultId,
  pathName: PropTypes.string,
  name: PropTypes.string,
  args,
  logs: PropTypes.arrayOf(PropTypes.any)
});

export const results = PropTypes.objectOf(result);

export const fetchState = PropTypes.shape({
  resultList: PropTypes.string
});

export const line = PropTypes.shape({
  resultId,
  logKey: PropTypes.string,
  config: PropTypes.shape({
    color: PropTypes.string,
    isVisible: PropTypes.bool
  })
});

export const lines = PropTypes.objectOf(line);

export const globalConfig = PropTypes.shape({
  chartSize: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    aspect: PropTypes.number.isRequired
  }),
  global: PropTypes.shape({
    pollingRate: PropTypes.number
  }),
  pollingRate: PropTypes.number,
  logsLimit: PropTypes.number,
  isResultNameAlignRight: PropTypes.bool
});

export const resultConfig = PropTypes.shape({
  hidden: PropTypes.bool
});

const resultsConfig = PropTypes.objectOf(resultConfig);

export const logKeyConfig = PropTypes.shape({
  selected: PropTypes.bool
});

const logKeysConfig = PropTypes.objectOf(logKeyConfig);

export const axisName = PropTypes.string;

const projectConfigAxis = PropTypes.shape({
  axisName,
  logKeysConfig
});

export const projectConfig = PropTypes.shape({
  axes: PropTypes.shape({
    xAxis: projectConfigAxis,
    yLeftAxis: projectConfigAxis,
    yRightAxis: projectConfigAxis
  }),
  global: PropTypes.objectOf(PropTypes.any),
  tableState: PropTypes.shape({
    expanded: PropTypes.any
  }).isRequired,
  resultsConfig,
  lines,
  hiddenLogKeys: PropTypes.array,
  hiddenArgKeys: PropTypes.array
});

export const axisConfig = PropTypes.shape({
  axisName: axisName.isRequired,
  scale: PropTypes.string,
  scaleRange: PropTypes.objectOf(PropTypes.shape({
    rangeTypes: PropTypes.arrayOf(PropTypes.string),
    range: PropTypes.arrayOf(PropTypes.number)
  })),
  logKeys: logKeysConfig
});

export const stats = PropTypes.shape({
  axes: PropTypes.objectOf(PropTypes.any),
  argKeys: PropTypes.arrayOf(PropTypes.string),
  logKeys: PropTypes.arrayOf(PropTypes.string),
  xAxisKeys: PropTypes.arrayOf(PropTypes.string)
});

export const commands = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  body: PropTypes.string
}));

export const snapshots = PropTypes.arrayOf(PropTypes.shape({
  iteration: PropTypes.number,
  name: PropTypes.string
}));
