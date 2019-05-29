import * as ActionTypes from '../actions';

const transformLogStructure = (log) => {
  const logDict = {};
  log.logItems.forEach((item) => {
    const { key, value } = item;
    logDict[key] = value;
  });
  // eslint-disable-next-line no-param-reassign
  log.logDict = logDict;
};

export default (/* store */) => (next) => (action) => {
  const { response } = action;
  switch (action.type) {
    case ActionTypes.RESULT_LIST_SUCCESS: {
      // handle API calls that receives list of results
      const { results } = response;
      results.forEach((result) => {
        result.logs.forEach((log) => {
          transformLogStructure(log);
        });
      });
      break;
    }
    case ActionTypes.RESULT_SUCCESS:
    case ActionTypes.RESULT_UPDATE_SUCCESS:
    case ActionTypes.RESULT_DELETE_SUCCESS: {
      // handle API calls that receives single result
      const { result } = response;
      result.logs.forEach((log) => {
        transformLogStructure(log);
      });
      break;
    }
    default:
  }

  console.log({ response });
  return next(action);
};
