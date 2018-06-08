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

export const getRelativeResultPathName = (project = {}, result = {}) => (
  path.relative(project.pathName || '', result.pathName || '')
);

export const displayResultNameFull = (project = {}, result = {}) => (
  result.name || getRelativeResultPathName(project, result)
);

export const displayProjectNameFull = (project = {}) => (
  project.name || path.basename(project.pathName)
);

export const displayProjectName = (project = {}, options = {}) => (
  truncate(displayProjectNameFull(project), options)
);

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
  return (typeof argValue === 'object') ? JSON.stringify(argValue) : String(argValue);
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

export const sortMethod = (a, b) => {
  const original = [a, b];
  const isNumber = original.every((o) => isFinite(o) || !isNaN(o) || o === 'NaN');
  const casted = isNumber ?
    original.map((o) => Number(o)) :
    original.map((o) => String(o).toLowerCase());

  if (casted[0] > casted[1]) {
    return 1;
  } else if (casted[0] < casted[1]) {
    return -1;
  }
  return 0;
};
