/**
 * Reducer function to handle pending requests.
 * @param  {Object} state  Existing state object.
 * @param  {Object} action Incoming action:
 *                         - Actions with the meta.httpRequest property are examined.
 *                         - The meta.httpRequest.url property is added or removed
 *                           from the current state depending on if the meta.httpRequest.requesting
 *                           property is set.
 * @return {Object}        The new state.
 */
const requestsReducer = (state = {}, action) => {
  if (!action.meta || !action.meta.httpRequest || !action.meta.httpRequest.url) {
    return state;
  }
  if (action.meta.httpRequest.requesting) {
    // Add this request to the state
    return { ...state, [action.meta.httpRequest.url]: true };
  }
  // Remove this request from the state
  const newState = { ...state };
  delete newState[action.meta.httpRequest.url];
  return newState;
};

export default requestsReducer;
