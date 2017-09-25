import path from 'path';
import { lineColorGenerator } from '../utils';

export * from './color';
export * from './command.jsx';
export * from './polling';
export * from './url';

export const line2key = (line) => `${line.resultId}_${line.logKey}`;

export const line2dataKey = (line, axisName) => `${axisName}_${line2key(line)}`;

export const decomposeLineDataKey = (dataKey) => {
  const keys = dataKey.split('_');
  const axisName = keys[0];
  const resultId = Number(keys[1]);
  const logKey = keys.slice(2).join('_');
  return { axisName, resultId, logKey };
};

export const truncate = (string, options = {}) => {
  const { length = 20, restStr = '...', forward = false } = options;
  let str = string || '';
  const chars = [...str];
  if (chars.length > length) {
    if (forward) {
      str = restStr + chars.slice(chars.length - length).join('');
    } else {
      str = chars.slice(0, length).join('') + restStr;
    }
  }
  return str;
};

export const displayResultName = (result = {}, options = {}) => (
  truncate(result.name, options) || truncate(result.pathName, { ...options, forward: true })
);

export const displayProjectNameFull = (project = {}) => (
  project.name || path.basename(project.pathName)
);

export const displayProjectName = (project = {}, options = {}) => (
  truncate(displayProjectNameFull(project), options)
);

export const line2name = (line, result = {}) => `${displayResultName(result)}/${line.logKey}`;

export const isFloat = (value) => (
  isFinite(value) && !Number.isInteger(value)
);

export const formatLogValue = (precision = 4) => (value) => (
  isFloat(value) ? value.toPrecision(precision) : value
);

export const formatLogTooltipLabel = (xAxisKey, precision) => (value) => (
  `${formatLogValue(precision)(value)} ${xAxisKey === 'elapsed_time' ? 's' : xAxisKey}`
);

export const getLastLogDict = (result = {}) => {
  const { logs = [] } = result;
  const lastLog = logs[logs.length - 1] || {};
  const { logItems = [] } = lastLog;
  const lastLogDict = {};
  logItems.forEach((logItem) => { lastLogDict[logItem.key] = logItem.value; });
  return lastLogDict;
};

export const argValue2string = (argValue) => {
  const emptyStr = '-';
  if (argValue == null) {
    return emptyStr;
  }
  return (typeof argValue === 'boolean') ? String(argValue) : argValue;
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getSelectedResults = (results = {}, resultsConfig = {}) => (
  Object.keys(results).filter((resultId) => (
    !resultsConfig[resultId] || !resultsConfig[resultId].hidden
  )).map((resultId) => (
    Number(resultId)
  ))
);

export const getSelectedLogKeys = (logKeysConfig = {}) => (
  Object.keys(logKeysConfig).filter((logKey) => (logKeysConfig[logKey].selected))
);

export const createLine = (resultId, logKey, results = {}, logKeys = []) => ({
  resultId,
  logKey,
  config: {
    color: lineColorGenerator(resultId, logKey, results, logKeys),
    isVisible: true
  }
});

