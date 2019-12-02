import { combineReducers } from 'redux';
import {
  PROJECT_LIST_SUCCESS,
  PROJECT_SUCCESS,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_DELETE_SUCCESS,
  RESULT_LIST_SUCCESS,
  RESULT_SUCCESS,
  RESULT_UPDATE_SUCCESS,
  RESULT_DELETE_SUCCESS,
  RESULTS_PATCH_SUCCESS,
  COMMAND_CREATE_SUCCESS,
  RESULT_LIST_CLEAR,
  RESULT_ASSET_SUCCESS,
} from '../actions/entities';
import { removePartialState } from './utils';

const projectsReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_LIST_SUCCESS:
      if (action.response && action.response.projects) {
        const projectList = action.response.projects;
        const projects = {};
        projectList.forEach((project) => {
          projects[project.id] = project;
        });
        return projects;
      }
      return state;
    case PROJECT_SUCCESS:
    case PROJECT_UPDATE_SUCCESS:
      if (action.response && action.response.project) {
        const { project } = action.response;
        return {
          ...state,
          [project.id]: project,
        };
      }
      return state;
    case PROJECT_DELETE_SUCCESS:
      if (action.response && action.response.project) {
        const { project } = action.response;
        return removePartialState(state, project.id);
      }
      return state;
    default:
      return state;
  }
};

const mergeResult = (result, oldResult) => {
  const newResult = { ...result };
  ['args', 'commands', 'snapshots'].forEach((k) => {
    const data = oldResult[k];
    if (data && data.length === newResult[k].length) {
      newResult[k] = data; // eslint-disable-line no-param-reassign
    }
  });
  if (oldResult.logs && oldResult.logs.length === newResult.logs.length) {
    if (oldResult.logModifiedAt === newResult.logModifiedAt) {
      newResult.logs = oldResult.logs; // eslint-disable-line no-param-reassign
    }
  }
  const modified = Object.keys(newResult).some((k) => newResult[k] !== oldResult[k]);
  return modified ? newResult : oldResult;
};

const resultsReducer = (state = {}, action) => {
  switch (action.type) {
    case RESULT_LIST_SUCCESS:
      if (action.response && action.response.results) {
        const resultList = action.response.results;
        const resultIds = resultList.map((result) => result.id);
        let modified = Object.keys(state).length !== resultIds.length;
        const results = {};
        resultList.forEach((result) => {
          const oldResult = state[result.id] || {};
          const newResult = mergeResult(result, oldResult);
          const resultModified = oldResult !== newResult;
          results[result.id] = newResult;
          modified = modified || resultModified;
        });
        return modified ? results : state;
      }
      return state;
    case RESULT_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        return {
          ...state,
          [result.id]: result,
        };
      }
      return state;
    case RESULT_UPDATE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        if (result.isUnregistered !== state[result.id].isUnregistered) {
          return removePartialState(state, result.id);
        }
        return {
          ...state,
          [result.id]: result,
        };
      }
      return state;
    case RESULT_DELETE_SUCCESS:
      if (action.response && action.response.result) {
        const { result } = action.response;
        return removePartialState(state, result.id);
      }
      return state;
    case RESULTS_PATCH_SUCCESS:
      if (action.response && action.response.results) {
        const { results } = action.response;
        let currentState = state;
        results.forEach((result) => {
          currentState = removePartialState(currentState, result.id);
        });
        return currentState;
      }
      return state;
    case COMMAND_CREATE_SUCCESS:
      if (action.response && action.response.commands) {
        const result = state[action.body.resultId];
        return {
          ...state,
          [action.body.resultId]: {
            ...result,
            commands: action.response.commands,
          },
        };
      }
      return state;
    case RESULT_LIST_CLEAR:
      return {};
    default:
      return state;
  }
};

const assetsReducer = (state = [], action) => {
  switch (action.type) {
    case RESULT_ASSET_SUCCESS:
      if (action.response && action.response.assets) {
        const assetList = action.response.assets;
        return assetList;
      }
      return state;
    default:
      return state;
  }
};

const entitiesReducer = combineReducers({
  projects: projectsReducer,
  results: resultsReducer,
  assets: assetsReducer,
});

export default entitiesReducer;
