import * as ActionTypes from '../actions';

const targetActions = [
  ActionTypes.RESULT_LIST_SUCCESS,
  ActionTypes.RESULT_SUCCESS,
  ActionTypes.RESULT_UPDATE_SUCCESS,
  ActionTypes.RESULT_DELETE_SUCCESS,
];

export default (/* store */) => (next) => (action) => {
  if (!targetActions.includes(action.type)) {
    return next(action);
  }

  // TODO: transform log structure
  const { response } = action;
  console.log({ response });
  return next(action);
};
