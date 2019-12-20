import { Reducer } from 'redux';
import { isRSAAActions } from '../middleware/apiMiddleware';

export interface Requests {
  [endpoint: string]: boolean;
}

/**
 * Reducer function to handle pending requests.
 * @param state  Existing state object.
 * @param action Incoming action:
 *               - Actions with the meta.httpRequest property are examined.
 *               - The meta.httpRequest.endpoint property is added or removed
 *                 from the current state depending on if the meta.httpRequest.requesting
 *                 property is set.
 * @return       The new state.
 */
const requestsReducer: Reducer<Requests> = (state = {}, action) => {
  if (!isRSAAActions(action)) {
    return state;
  }
  if (action.meta.httpRequest.requesting) {
    // Add this request to the state
    return { ...state, [action.meta.httpRequest.endpoint]: true };
  }
  // Remove this request from the state
  const newState = { ...state };
  delete newState[action.meta.httpRequest.endpoint];
  return newState;
};

export default requestsReducer;
