const API_ROOT = '/api/v1/';

const callApi = (endpoint, method = 'GET', body) => {
  const fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(fullUrl, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export const CALL_API = 'Call API';

/**
 * Helper function to attempt a request and handle the response.
 * @param  {String} url           The URL the request is for.
 * @param  {Object} actions       Actions to dispatch depending on the outcome of the "makeRequest" Promise.
 * @param  {Function} makeRequest Function that returns a Promise object. This function performs the actual request.
 * @param  {Function} dispatch    Redux store dispatch function.
 */
const attemptRequest = (url, actions, makeRequest, dispatch) => {
  const beginAction = { ...actions.begin() };
  beginAction.meta = beginAction.meta || {};
  beginAction.meta.httpRequest = { url, done: false };
  if (!dispatch(beginAction)) {
    return; // bail out here if the middleware cancelled the dispatch
  }
  makeRequest()
    .then((response) => {
      const successAction = { ...actions.success(response) };
      successAction.meta = successAction.meta || {};
      successAction.meta.httpRequest = { url, done: true };
      dispatch(successAction);
    })
    .catch((err) => {
      const failureAction = { ...actions.failure(err) };
      failureAction.meta = failureAction.meta || {};
      failureAction.meta.httpRequest = { url, done: true };
      dispatch(failureAction);
    });
};

export default (store) => (next) => (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, body } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  const actionWith = (data) => {
    const finalAction = { ...action, ...data };
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  return attemptRequest(
    endpoint,
    {
      begin: () => actionWith({ type: requestType }),
      success: (response) =>
        actionWith({
          response,
          type: successType,
          endpoint,
          body,
        }),
      failure: (error) =>
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened',
        }),
    },
    () => callApi(endpoint, method, body),
    next
  );
};
