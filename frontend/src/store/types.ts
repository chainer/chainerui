import { CHART_DOWNLOAD_STATUS } from '../constants';

export type ProjectId = number;

export interface Project {
  id?: ProjectId;
  pathName?: string;
  name?: string;
}

export interface Projects {
  [k: string]: Project;
}

export type ResultId = number;

export interface Log {
  resultId?: ResultId;
  id?: number;
  logDict: { [k: string]: any };
}

export type Logs = Log[];

interface Arg {
  resultId?: ResultId;
  key: string;
  value: any;
}

export type Args = Arg[];

interface Command {
  id?: number;
  name: string;
  request: {
    created_at: string;
    schedule?: {
      key: string;
      value: number;
    };
    body?: object;
  };
  response?: {
    status: string;
    epoch: number;
    iteration: number;
    elapsed_time?: number;
    executed_at?: string;
    body?: object;
  };
}

export type Commands = Command[];

interface Snapshot {
  id?: number;
  iteration: number;
  name: string;
}

export type Snapshots = Snapshot[];

export interface Result {
  id?: ResultId;
  pathName?: string;
  name?: string;
  group?: string;
  isUnregistered?: boolean;
  logs?: Logs;
  args?: Args;
  commands?: Commands;
  snapshots?: Snapshots;
}

export interface Results {
  [k: string]: Result;
}

export interface FetchState {
  resultList?: string;
}

export interface Line {
  resultId?: ResultId;
  logKey?: string;
  config?: {
    color: string;
    isVisible: boolean;
  };
}

export interface Lines {
  [k: string]: Line;
}

export interface ChartSize {
  width: number | string;
  height: number | string;
  aspect: number;
}

export interface GlobalConfig {
  chartSize: ChartSize;
  pollingRate: number;
  logsLimit: number;
  isResultNameAlignRight: boolean;
}

export interface TableState {
  keyConfigs: any[];
}

export interface ResultConfig {
  hidden?: boolean;
  assetsTableState?: TableState;
}

export interface ResultsConfig {
  [k: string]: ResultConfig;
}

export interface LogKeyConfig {
  selected: boolean;
  smoothing: boolean;
}

export interface LogKeysConfig {
  [k: string]: LogKeyConfig;
}

export type AxisName = string;

export interface AxisConfig {
  logKeysConfig?: LogKeysConfig;
  scale?: string;
  scaleRange?: {
    [k: string]: {
      range: number[];
      rangeTypes: string[];
    };
  };
  xAxisKey?: string;
}

interface KnownKeysConfig {
  [k: string]: {
    hidden: boolean;
  };
}

export interface ProjectConfig {
  axes: {
    xAxis?: AxisConfig;
    yLeftAxis?: AxisConfig;
    yRightAxis?: AxisConfig;
  };
  tableState: {
    expanded?: boolean | object;
    knownLogKeysConfig?: KnownKeysConfig;
    knownArgKeysConfig?: KnownKeysConfig;
    isGrouped?: boolean;
  };
  resultsConfig: ResultsConfig;
  lines: Lines;
}

export interface Stats {
  argKeys: string[];
  logKeys: string[];
  xAxisKeys: string[];
}

interface Asset {
  contents?: any[];
  trainInfo?: any[];
}

export type Assets = Asset[];

export interface ResultStatus {
  selected: boolean | string | undefined;
  checked: boolean | string | undefined;
}

export interface ResultsStatus {
  [k: number]: ResultStatus;
}

export interface ResultFilter {
  [filterKey: string]: string;
}

export interface ProjectStatus {
  chartDownloadStatus: CHART_DOWNLOAD_STATUS;
  resultsStatus: ResultsStatus;
  resultFilter: ResultFilter;
}

export interface ProjectsStatus {
  [k: number]: ProjectStatus;
}

export interface Status {
  projectsStatus: ProjectsStatus;
  stats: Stats;
}
