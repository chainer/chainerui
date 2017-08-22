import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';


const entities = (state = { results: {} }, action) => {
  switch (action.type) {
    case ActionTypes.RESULTS_SUCCESS:
      if (action.response && action.response.results) {
        const resultsList = action.response.results;
        const results = {};
        resultsList.forEach((result) => {
          results[result.id] = result;
        });
        return { ...state, results };
      }
      break;
    default:
      break;
  }
  return state;
};

const axes = (state = {}, action) => {
  const { axisName, line } = action;
  if (axisName == null || line == null) {
    return state;
  }
  const axisConfig = state[axisName] || { axisName };
  const { lines = [] } = axisConfig;

  let newAxisConfig;
  switch (action.type) {
    case ActionTypes.AXIS_CONFIG_LINE_ADD:
      newAxisConfig = { ...axisConfig, lines: [...lines, line] };
      break;
    default:
      newAxisConfig = axisConfig;
      break;
  }
  return { ...state, [axisName]: newAxisConfig };
};

const config = combineReducers({
  axes
});

const rootReducer = combineReducers({
  entities,
  config
});

export default rootReducer;

