import { combineReducers } from 'redux';
// import * as ActionTypes from '../actions';


const entities = (state = { results: {} }, action) => {
  if (action.response && action.response.entities) {
    return { ...state, entities: action.response.entities };
  }
  return state;
};

const rootReducer = combineReducers({
  entities
});

export default rootReducer;

