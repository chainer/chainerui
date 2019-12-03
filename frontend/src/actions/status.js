export const RESULT_SELECT_UPDATE = 'RESULT_SELECT_UPDATE';
export const updateResultSelect = (projectId, resultId, selected) => ({
  type: RESULT_SELECT_UPDATE,
  projectId,
  resultId,
  selected,
});

export const CHECK_OF_RESULT_STATUS_LIST_UPDATE = 'CHECK_OF_RESULT_STATUS_LIST_UPDATE';
export const updateCheckOfResultStatusList = (projectId, results) => ({
  type: CHECK_OF_RESULT_STATUS_LIST_UPDATE,
  projectId,
  results,
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
