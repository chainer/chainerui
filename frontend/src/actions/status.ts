/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { CHART_DOWNLOAD_STATUS } from '../constants';
import { ProjectId, ResultId } from '../store/types';

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

export const RESULT_CHECK_UPDATE = 'RESULT_CHECK_UPDATE';
export const updateResultCheck = (projectId: ProjectId, resultId: ResultId, checked: boolean) => ({
  type: RESULT_CHECK_UPDATE as typeof RESULT_CHECK_UPDATE,
  projectId,
  resultId,
  checked,
});
export type ResultCheckAction = ReturnType<typeof updateResultCheck>;

export const RESULT_CHECK_BULK_UPDATE = 'RESULT_CHECK_BULK_UPDATE';
export const updateResultCheckBulk = (
  projectId: ProjectId,
  results: { id: ResultId; checked: boolean }[]
) => ({
  type: RESULT_CHECK_BULK_UPDATE as typeof RESULT_CHECK_BULK_UPDATE,
  projectId,
  results,
});
export type ResultCheckBulkAction = ReturnType<typeof updateResultCheckBulk>;

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
