import path from 'path';
import saveSvgAsPng from 'save-svg-as-png';
import * as moment from 'moment';
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

export const getUrlSafeProjectNameFull = (project = {}) => (
  displayProjectNameFull(project).replace(/[^a-z0-9]/gi, '_')
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

export const getLogData = (results, stats, projectConfig) => {
  const { axes, resultsConfig = {}, lines = {} } = projectConfig;
  const { logKeys = [], xAxisKeys } = stats;

  const {
    xAxis = { axisName: 'xAxis' },
    yLeftAxis = { axisName: 'yLeftAxis' },
    yRightAxis = { axisName: 'yRightAxis' }
  } = axes || {};
  const { xAxisKey = xAxisKeys[0] } = xAxis;

  const selectedResults = getSelectedResults(results, resultsConfig);
  const selectedLogKeys = {
    yLeftAxis: getSelectedLogKeys(yLeftAxis.logKeysConfig),
    yRightAxis: getSelectedLogKeys(yRightAxis.logKeysConfig)
  };

  const dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
  ['yLeftAxis', 'yRightAxis'].forEach((axisName) => {
    selectedResults.forEach((resultId) => {
      const result = results[resultId];
      if (result == null) {
        return;
      }
      selectedLogKeys[axisName].forEach((logKey) => {
        const line = lines[line2key({ resultId, logKey })] ||
              createLine(resultId, logKey, results, logKeys);
        const logs = result.logs || [];
        logs.forEach((log) => {
          const logDict = {};
          log.logItems.forEach((logItem) => {
            logDict[logItem.key] = logItem.value;
          });
          if (logDict[xAxisKey] == null || logDict[logKey] == null) {
            return;
          }
          if (dataDict[logDict[xAxisKey]] == null) {
            dataDict[logDict[xAxisKey]] = { [xAxisKey]: logDict[xAxisKey] };
          }
          dataDict[logDict[xAxisKey]][line2dataKey(line, axisName)] = logDict[logKey];
        });
      });
    });
  });
  const data = Object.values(dataDict);

  return data;
};

export const getPlotLogData = (results, stats, projectConfig) => {
  const { axes, resultsConfig = {} } = projectConfig;
  const { xAxisKeys } = stats;
  const {
    xAxis = { axisName: 'xAxis' },
    yLeftAxis = { axisName: 'yLeftAxis' },
    yRightAxis = { axisName: 'yRightAxis' }
  } = axes || {};
  const { xAxisKey = xAxisKeys[0] } = xAxis;

  const selectedResults = getSelectedResults(results, resultsConfig);
  const selectedLogKeys = {
    yLeftAxis: getSelectedLogKeys(yLeftAxis.logKeysConfig),
    yRightAxis: getSelectedLogKeys(yRightAxis.logKeysConfig)
  };
  const plotConfig = {
    xAxis: xAxisKey,
    yLeftAxis: selectedLogKeys.yLeftAxis,
    yRightAxis: selectedLogKeys.yRightAxis,
    resultIds: selectedResults
  };

  const allData = {};
  Object.keys(results).forEach((resultId) => {
    const result = results[resultId];
    const logs = result.logs || [];
    const allLogs = logs.map((log) => {
      const logDict = {};
      log.logItems.forEach((logItem) => {
        logDict[logItem.key] = logItem.value;
      });
      return logDict;
    });
    allData[result.id] = {
      log: allLogs,
      name: result.name || result.pathName
    };
  });

  return { data: allData, config: plotConfig };
};

export const padDigits = (num, len) => {
  let str = `${num}`;
  while (str.length < len) {
    str = `0${str}`;
  }
  return str;
};

export const downloadObjectAsJson = (exportObj, exportName) => {
  const fileName = `${exportName}_${moment().format('YYYYMMDDHHmmss')}.json`;
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportObj))}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', fileName);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const downloadChartAsPng = (chartDOMNode, exportName) => {
  const fileName = `${exportName}_${moment().format('YYYYMMDDHHmmss')}.png`;
  saveSvgAsPng.saveSvgAsPng(chartDOMNode.getElementsByTagName('svg')[0], fileName);
};
