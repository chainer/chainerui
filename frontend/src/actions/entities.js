import { CALL_API } from '../middleware/api';
import { fetchResultTypes } from '../constants';

// projects API

export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST';
export const PROJECT_LIST_SUCCESS = 'PROJECT_LIST_SUCCESS';
export const PROJECT_LIST_FAILURE = 'PROJECT_LIST_FAILURE';
export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const PROJECT_FAILURE = 'PROJECT_FAILURE';
export const PROJECT_UPDATE_REQUEST = 'PROJECT_UPDATE_REQUEST';
export const PROJECT_UPDATE_SUCCESS = 'PROJECT_UPDATE_SUCCESS';
export const PROJECT_UPDATE_FAILURE = 'PROJECT_UPDATE_FAILURE';
export const PROJECT_DELETE_REQUEST = 'PROJECT_DELETE_REQUEST';
export const PROJECT_DELETE_SUCCESS = 'PROJECT_DELETE_SUCCESS';
export const PROJECT_DELETE_FAILURE = 'PROJECT_DELETE_FAILURE';

export const getProjectList = () => ({
  [CALL_API]: {
    types: [PROJECT_LIST_REQUEST, PROJECT_LIST_SUCCESS, PROJECT_LIST_FAILURE],
    endpoint: 'projects',
  },
});

export const getProject = (projectId) => ({
  [CALL_API]: {
    types: [PROJECT_REQUEST, PROJECT_SUCCESS, PROJECT_FAILURE],
    endpoint: `projects/${projectId}`,
  },
});

export const updateProject = (project = {}) => {
  const { id, name } = project;
  if (!Number.isInteger(id)) {
    throw new Error('Project id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [PROJECT_UPDATE_REQUEST, PROJECT_UPDATE_SUCCESS, PROJECT_UPDATE_FAILURE],
      endpoint: `projects/${id}`,
      method: 'PUT',
      body: { project: { id, name } },
    },
  };
};

export const deleteProject = (projectId) => {
  if (!Number.isInteger(projectId)) {
    throw new Error('Project id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [PROJECT_DELETE_REQUEST, PROJECT_DELETE_SUCCESS, PROJECT_DELETE_FAILURE],
      endpoint: `projects/${projectId}`,
      method: 'DELETE',
    },
  };
};

// results API

export const RESULT_LIST_REQUEST = 'RESULT_LIST_REQUEST';
export const RESULT_LIST_SUCCESS = 'RESULT_LIST_SUCCESS';
export const RESULT_LIST_FAILURE = 'RESULT_LIST_FAILURE';
export const RESULT_REQUEST = 'RESULT_REQUEST';
export const RESULT_SUCCESS = 'RESULT_SUCCESS';
export const RESULT_FAILURE = 'RESULT_FAILURE';
export const RESULT_UPDATE_REQUEST = 'RESULT_UPDATE_REQUEST';
export const RESULT_UPDATE_SUCCESS = 'RESULT_UPDATE_SUCCESS';
export const RESULT_UPDATE_FAILURE = 'RESULT_UPDATE_FAILURE';
export const RESULT_DELETE_REQUEST = 'RESULT_DELETE_REQUEST';
export const RESULT_DELETE_SUCCESS = 'RESULT_DELETE_SUCCESS';
export const RESULT_DELETE_FAILURE = 'RESULT_DELETE_FAILURE';
export const RESULTS_PATCH_REQUEST = 'RESULTS_PATCH_REQUEST';
export const RESULTS_PATCH_SUCCESS = 'RESULTS_PATCH_SUCCESS';
export const RESULTS_PATCH_FAILURE = 'RESULTS_PATCH_FAILURE';
export const RESULT_LIST_CLEAR = 'RESULT_LIST_CLEAR';
export const RESULT_ASSET_REQUEST = 'RESULT_ASSET_REQUEST';
export const RESULT_ASSET_SUCCESS = 'RESULT_ASSET_SUCCESS';
export const RESULT_ASSET_FAILURE = 'RESULT_ASSET_FAILURE';

export const getResultList = (projectId, logsLimit = -1, resultType) => {
  const resultTypeQuery = resultType === fetchResultTypes[0].id ? '' : '&is_unregistered=1';

  return {
    [CALL_API]: {
      types: [RESULT_LIST_REQUEST, RESULT_LIST_SUCCESS, RESULT_LIST_FAILURE],
      endpoint: `projects/${projectId}/results?logs_limit=${logsLimit}${resultTypeQuery}`,
    },
  };
};

export const getResult = (projectId, resultId, logsLimit = -1) => ({
  [CALL_API]: {
    types: [RESULT_REQUEST, RESULT_SUCCESS, RESULT_FAILURE],
    endpoint: `projects/${projectId}/results/${resultId}?logs_limit=${logsLimit}`,
  },
});

export const updateResult = (projectId, result = {}) => {
  const { id, name, isUnregistered } = result;
  if (!Number.isInteger(id)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [RESULT_UPDATE_REQUEST, RESULT_UPDATE_SUCCESS, RESULT_UPDATE_FAILURE],
      endpoint: `projects/${projectId}/results/${id}`,
      method: 'PUT',
      body: { result: { id, name, isUnregistered } },
    },
  };
};

export const deleteResult = (projectId, resultId) => {
  if (!Number.isInteger(resultId)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [RESULT_DELETE_REQUEST, RESULT_DELETE_SUCCESS, RESULT_DELETE_FAILURE],
      endpoint: `projects/${projectId}/results/${resultId}`,
      method: 'DELETE',
    },
  };
};

export const patchResults = (projectId, results = []) => {
  return {
    [CALL_API]: {
      types: [RESULTS_PATCH_REQUEST, RESULTS_PATCH_SUCCESS, RESULTS_PATCH_FAILURE],
      endpoint: `projects/${projectId}/results`,
      method: 'PATCH',
      body: { results },
    },
  };
};

export const clearResultList = () => ({
  type: RESULT_LIST_CLEAR,
});

export const getResultAsset = (projectId, resultId) => ({
  [CALL_API]: {
    types: [RESULT_ASSET_REQUEST, RESULT_ASSET_SUCCESS, RESULT_ASSET_FAILURE],
    endpoint: `projects/${projectId}/results/${resultId}/assets`,
  },
});

// commands API

export const COMMAND_CREATE_REQUEST = 'COMMAND_CREATE_REQUEST';
export const COMMAND_CREATE_SUCCESS = 'COMMAND_CREATE_SUCCESS';
export const COMMAND_CREATE_FAILURE = 'COMMAND_CREATE_FAILURE';

export const createCommand = (
  projectId,
  resultId,
  commandName,
  requestBody = null,
  schedule = null
) => {
  if (!Number.isInteger(resultId)) {
    throw new Error('Result id is invalid.');
  }
  return {
    [CALL_API]: {
      types: [COMMAND_CREATE_REQUEST, COMMAND_CREATE_SUCCESS, COMMAND_CREATE_FAILURE],
      endpoint: `projects/${projectId}/results/${resultId}/commands`,
      method: 'POST',
      body: {
        name: commandName,
        body: requestBody,
        schedule,
        resultId,
      },
    },
  };
};
