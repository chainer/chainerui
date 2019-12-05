/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { CHART_DOWNLOAD_STATUS } from '../constants';
import { ProjectId, ResultId, Result } from '../store/types';

export const RESULT_SELECT_UPDATE = 'RESULT_SELECT_UPDATE';
export const updateResultSelect = (
  projectId: ProjectId,
  resultId: ResultId,
  selected: boolean
) => ({
  type: RESULT_SELECT_UPDATE as typeof RESULT_SELECT_UPDATE,
  projectId,
  resultId,
  selected,
});
export type ResultSelectAction = ReturnType<typeof updateResultSelect>;

export const CHECKED_OF_RESULT_STATUS_UPDATE = 'CHECKED_OF_RESULT_STATUS_UPDATE';
export const updateCheckedOfResultStatus = (
  projectId: ProjectId,
  resultId: ResultId,
  checked: boolean
) => ({
  type: CHECKED_OF_RESULT_STATUS_UPDATE as typeof CHECKED_OF_RESULT_STATUS_UPDATE,
  projectId,
  resultId,
  checked,
});
export type ResultCheckAction = ReturnType<typeof updateCheckedOfResultStatus>;

export const CHECK_OF_RESULT_STATUS_LIST_UPDATE = 'CHECK_OF_RESULT_STATUS_LIST_UPDATE';
export const updateCheckOfResultStatusList = (
  projectId: ProjectId,
  results: { id: ResultId; checked: boolean }[]
) => ({
  type: CHECK_OF_RESULT_STATUS_LIST_UPDATE as typeof CHECK_OF_RESULT_STATUS_LIST_UPDATE,
  projectId,
  results,
});
export type ResultsStatusAction = ReturnType<typeof updateCheckOfResultStatusList>;

export const RESULT_FILTER_UPDATE = 'RESULT_FILTER_UPDATE';
export const updateResultFilter = (
  projectId: ProjectId,
  filterKey: string,
  filterText: string
) => ({
  type: RESULT_FILTER_UPDATE as typeof RESULT_FILTER_UPDATE,
  projectId,
  filterKey,
  filterText,
});
export type ResultFilterAction = ReturnType<typeof updateResultFilter>;

export const CHART_DOWNLOAD_STATUS_UPDATE = 'CHART_DOWNLOAD_STATUS_UPDATE';
export const updateChartDownloadStatus = (
  projectId: ProjectId,
  chartDownloadStatus: CHART_DOWNLOAD_STATUS
) => ({
  type: CHART_DOWNLOAD_STATUS_UPDATE as typeof CHART_DOWNLOAD_STATUS_UPDATE,
  projectId,
  chartDownloadStatus,
});
export type ChartDownloadStatusAction = ReturnType<typeof updateChartDownloadStatus>;
