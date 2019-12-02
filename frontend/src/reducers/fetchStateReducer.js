import { GLOBAL_CONFIG_POLLING_RATE_UPDATE } from '../actions/config';
import {
  RESULT_LIST_REQUEST,
  RESULT_LIST_SUCCESS,
  RESULT_LIST_FAILURE,
  RESULT_REQUEST,
  RESULT_SUCCESS,
  RESULT_FAILURE,
} from '../actions/entities';

const fetchStateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESULT_LIST_REQUEST:
    case RESULT_LIST_SUCCESS:
    case RESULT_LIST_FAILURE:
      return {
        ...state,
        resultList: action.type,
      };
    case RESULT_REQUEST:
    case RESULT_SUCCESS:
    case RESULT_FAILURE:
      return {
        ...state,
        result: action.type,
      };
    case GLOBAL_CONFIG_POLLING_RATE_UPDATE:
      if (action.pollingRate === 0) {
        return {};
      }
      return state;
    default:
      return state;
  }
};

export default fetchStateReducer;
