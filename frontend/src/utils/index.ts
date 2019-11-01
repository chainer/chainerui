import path from 'path';
import { lineColorGenerator } from './color';
import {
  Project,
  ResultId,
  Log,
  Result,
  Results,
  Line,
  ResultsConfig,
  LogKeysConfig,
  AxisName,
  ProjectConfig,
  Stats,
} from '../store/types';

export * from './color';
export * from './command';
export * from './download';
export * from './polling';
export * from './url';

export const line2key = (line: Line): string => `${line.resultId}_${line.logKey}`;

export const line2dataKey = (line: Line, axisName: AxisName): string =>
  `${axisName}_${line2key(line)}`;

export const decomposeLineDataKey = (
  dataKey: string
): { axisName: AxisName; resultId: ResultId; logKey: string } => {
  const keys = dataKey.split('_');
  const axisName = keys[0];
  const resultId = Number(keys[1]);
  const logKey = keys.slice(2).join('_');
  return { axisName, resultId, logKey };
};

interface TruncateOptions {
  length?: number;
  restStr?: string;
  forward?: boolean;
}

export const truncate = (text: string, options: TruncateOptions = {}): string => {
  const { length = 20, restStr = '...', forward = false } = options;
  let str = text || '';
  const chars = Array.from(str);
  if (chars.length > length) {
    if (forward) {
      str = restStr + chars.slice(chars.length - length).join('');
    } else {
      str = chars.slice(0, length).join('') + restStr;
    }
  }
  return str;
};

export const getRelativeResultPathName = (project: Project = {}, result: Result = {}): string =>
  path.relative(project.pathName || '', result.pathName || '');

export const getGrandParentDirectoryName = (result: Result = {}): string =>
  path.basename(path.resolve(result.pathName || '', '..'));

export const displayResultNameFull = (project: Project = {}, result: Result = {}): string =>
  result.name || getRelativeResultPathName(project, result);

export const displayProjectNameFull = (project: Project = {}): string =>
  project.name || path.basename(project.pathName || '');

export const displayProjectName = (project: Project = {}, options: TruncateOptions = {}): string =>
  truncate(displayProjectNameFull(project), options);

export const getUrlSafeProjectNameFull = (project: Project = {}): string =>
  displayProjectNameFull(project).replace(/[^a-z0-9]/gi, '_');

export const isFloat = (value: any): boolean => Number.isFinite(value) && !Number.isInteger(value);

export const formatLogValue = (precision = 4) => (value: any): any =>
  isFloat(value) ? value.toPrecision(precision) : value;

export const formatLogTooltipLabel = (xAxisKey: string, precision: number) => (
  value: any
): string => `${formatLogValue(precision)(value)} ${xAxisKey === 'elapsed_time' ? 's' : xAxisKey}`;

export const getLastLogDict = (result: Result = {}): Log['logDict'] | undefined => {
  const { logs = [] } = result;
  const lastLog = logs[logs.length - 1] || {};
  const { logDict } = lastLog;
  return logDict;
};

export const argValue2string = (argValue: any): string => {
  const emptyStr = '-';
  if (argValue == null) {
    return emptyStr;
  }
  return typeof argValue === 'object' ? JSON.stringify(argValue) : String(argValue);
};

export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getSelectedResults = (
  results: Results = {},
  resultsConfig: ResultsConfig = {}
): number[] =>
  Object.keys(results)
    .filter((resultId) => !resultsConfig[resultId] || !resultsConfig[resultId].hidden)
    .map((resultId) => Number(resultId));

export const getSelectedLogKeys = (logKeysConfig: LogKeysConfig = {}): string[] =>
  Object.keys(logKeysConfig).filter((logKey) => logKeysConfig[logKey].selected);

export const createLine = (
  resultId: ResultId,
  logKey: string,
  results: Results = {},
  logKeys: string[] = []
): Line => ({
  resultId,
  logKey,
  config: {
    color: lineColorGenerator(resultId, logKey, results, logKeys),
    isVisible: true,
  },
});

export const sortMethod = (a: any, b: any): number => {
  const original = [a, b];
  const isNumber = original.every((o) => Number.isFinite(o) || !Number.isNaN(o) || o === 'NaN');
  const casted = isNumber
    ? original.map((o) => Number(o))
    : original.map((o) => String(o).toLowerCase());

  if (casted[0] > casted[1]) {
    return 1;
  }
  if (casted[0] < casted[1]) {
    return -1;
  }
  return 0;
};

export const getLogData = (
  results: Results,
  stats: Stats,
  projectConfig: ProjectConfig
): { [k: string]: any }[] => {
  const { axes, resultsConfig = {}, lines = {} } = projectConfig;
  const { logKeys = [], xAxisKeys } = stats;

  const { xAxis = {}, yLeftAxis = {}, yRightAxis = {} } = axes || {};
  const { xAxisKey = xAxisKeys[0] } = xAxis;

  const selectedResults = getSelectedResults(results, resultsConfig);
  const selectedLogKeys = {
    yLeftAxis: getSelectedLogKeys(yLeftAxis.logKeysConfig),
    yRightAxis: getSelectedLogKeys(yRightAxis.logKeysConfig),
  };

  const dataDict: { [k: string]: { [dataKey: string]: any } } = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
  (['yLeftAxis', 'yRightAxis'] as (keyof typeof selectedLogKeys)[]).forEach((axisName) => {
    selectedResults.forEach((resultId) => {
      const result = results[resultId];
      if (result == null) {
        return;
      }
      selectedLogKeys[axisName].forEach((logKey) => {
        const line =
          lines[line2key({ resultId, logKey })] || createLine(resultId, logKey, results, logKeys);
        const logs = result.logs || [];
        logs.forEach((log) => {
          const { logDict } = log;
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

export const getPlotLogData = (
  results: Results,
  stats: Stats,
  projectConfig: ProjectConfig
): {
  data: {
    [resultId: string]: {
      log: Log['logDict'][];
      name?: string;
    };
  };
  config: {
    xAxis: string;
    yLeftAxis: string[];
    yRightAxis: string[];
    resultIds: number[];
  };
} => {
  const { axes, resultsConfig = {} } = projectConfig;
  const { xAxisKeys } = stats;
  const { xAxis = {}, yLeftAxis = {}, yRightAxis = {} } = axes || {};
  const { xAxisKey = xAxisKeys[0] } = xAxis;

  const selectedResults = getSelectedResults(results, resultsConfig);
  const selectedLogKeys = {
    yLeftAxis: getSelectedLogKeys(yLeftAxis.logKeysConfig),
    yRightAxis: getSelectedLogKeys(yRightAxis.logKeysConfig),
  };
  const plotConfig = {
    xAxis: xAxisKey,
    yLeftAxis: selectedLogKeys.yLeftAxis,
    yRightAxis: selectedLogKeys.yRightAxis,
    resultIds: selectedResults,
  };

  const allData: {
    [resultId: string]: {
      log: Log['logDict'][];
      name?: string;
    };
  } = {};
  Object.keys(results).forEach((resultId) => {
    const result = results[resultId];
    const logs = result.logs || [];
    const allLogs = logs.map((log) => {
      const { logDict = {} } = log;
      return logDict;
    });
    allData[result.id || ''] = {
      log: allLogs,
      name: result.name || result.pathName,
    };
  });

  return { data: allData, config: plotConfig };
};

export const padDigits = (num: number, len: number): string => {
  let str = `${num}`;
  while (str.length < len) {
    str = `0${str}`;
  }
  return str;
};

export const sortKeys = (keys: string[], keysConfig: { [k: string]: any }): string[] =>
  keys.slice().sort((a, b) => {
    const aOrder = (keysConfig[a] || {}).order || Infinity;
    const bOrder = (keysConfig[b] || {}).order || Infinity;
    return aOrder - bOrder || 0; // Infinity - Infinity = NaN
  });

export const arrayMove = <T extends {}>(arr: T[], from: number, to: number): T[] => {
  const a = arr.slice();
  a.splice(to < 0 ? a.length + to : to, 0, a.splice(from, 1)[0]);
  return a;
};
