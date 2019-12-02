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

export const TABLE_STATE_EXPANDED_UPDATE = 'TABLE_STATE_EXPANDED_UPDATE';
export const updateTableExpanded = (projectId, expanded) => ({
  type: TABLE_STATE_EXPANDED_UPDATE,
  projectId,
  expanded,
});

export const TABLE_STATE_COLUMNS_VISIBILITY_UPDATE = 'TABLE_STATE_COLUMNS_VISIBILITY_UPDATE';
export const updateTableColumnsVisibility = (
  projectId,
  knownLogKeysConfig,
  knownArgKeysConfig,
  isGrouped
) => ({
  type: TABLE_STATE_COLUMNS_VISIBILITY_UPDATE,
  projectId,
  knownLogKeysConfig,
  knownArgKeysConfig,
  isGrouped,
});

export const ASSETS_TABLE_STATE_COLUMNS_VISIBILITY_UPDATE =
  'ASSETS_TABLE_STATE_COLUMNS_VISIBILITY_UPDATE';
export const updateAssetsTableColumnsVisibility = (
  projectId,
  resultId,
  knownTrainInfoKeysConfig,
  knownContentKeysConfig
) => ({
  type: ASSETS_TABLE_STATE_COLUMNS_VISIBILITY_UPDATE,
  projectId,
  resultId,
  knownTrainInfoKeysConfig,
  knownContentKeysConfig,
});
