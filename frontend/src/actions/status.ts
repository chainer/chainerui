import { CHART_DOWNLOAD_STATUS } from '../constants';

export const CHART_DOWNLOAD_STATUS_UPDATE = 'CHART_DOWNLOAD_STATUS_UPDATE';
export const updateChartDownloadStatus = (
  projectId: number,
  chartDownloadStatus: CHART_DOWNLOAD_STATUS
) => ({
  type: CHART_DOWNLOAD_STATUS_UPDATE as typeof CHART_DOWNLOAD_STATUS_UPDATE,
  projectId,
  chartDownloadStatus,
});
export type ChartDownloadStatusAction = ReturnType<typeof updateChartDownloadStatus>;

export const RESULT_SELECT_UPDATE = 'RESULT_SELECT_UPDATE';
export const updateResultSelect = (projectId: number, resultId: number, selected: boolean) => ({
  type: RESULT_SELECT_UPDATE as typeof RESULT_SELECT_UPDATE,
  projectId,
  resultId,
  selected,
});
export type ResultSelectedAction = ReturnType<typeof updateResultSelect>;

export const CHECKED_OF_RESULT_STATUS_UPDATE = 'CHECKED_OF_RESULT_STATUS_UPDATE';
export const updateCheckedOfResultStatus = (
  projectId: number,
  resultId: number,
  checked: boolean
) => ({
  type: CHECKED_OF_RESULT_STATUS_UPDATE as typeof CHECKED_OF_RESULT_STATUS_UPDATE,
  projectId,
  resultId,
  checked,
});
export type ResultCheckedAction = ReturnType<typeof updateCheckedOfResultStatus>;

export const RESULT_FILTER_UPDATE = 'RESULT_FILTER_UPDATE';
export const updateResultFilter = (projectId: number, filterKey: string, filterText: string) => ({
  type: RESULT_FILTER_UPDATE as typeof RESULT_FILTER_UPDATE,
  projectId,
  filterKey,
  filterText,
});
