export const RESULT_SELECT_UPDATE = 'RESULT_SELECT_UPDATE';
export const updateResultSelect = (projectId, resultId, selected) => ({
  type: RESULT_SELECT_UPDATE,
  projectId,
  resultId,
  selected,
});

export const CHECKED_OF_RESULT_STATUS_UPDATE = 'CHECKED_OF_RESULT_STATUS_UPDATE';
export const updateCheckedOfResultStatus = (projectId, resultId, checked) => ({
  type: CHECKED_OF_RESULT_STATUS_UPDATE,
  projectId,
  resultId,
  checked,
});

export const RESULT_FILTER_UPDATE = 'RESULT_FILTER_UPDATE';
export const updateResultFilter = (projectId, filterKey, filterText) => ({
  type: RESULT_FILTER_UPDATE,
  projectId,
  filterKey,
  filterText,
});

export const CHART_DOWNLOAD_STATUS_UPDATE = 'CHART_DOWNLOAD_STATUS_UPDATE';
export const updateChartDownloadStatus = (projectId, chartDownloadStatus) => ({
  type: CHART_DOWNLOAD_STATUS_UPDATE,
  projectId,
  chartDownloadStatus,
});
