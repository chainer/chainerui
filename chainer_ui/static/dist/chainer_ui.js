webpackJsonp([0],{

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return RESULTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return RESULTS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return RESULTS_FAILUE; });
/* unused harmony export RESULT_UPDATE_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return RESULT_UPDATE_SUCCESS; });
/* unused harmony export RESULT_UPDATE_FAILUE */
/* unused harmony export RESULT_DELETE_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return RESULT_DELETE_SUCCESS; });
/* unused harmony export RESULT_DELETE_FAILUE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return loadResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return updateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return deleteResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXIS_CONFIG_LINE_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AXIS_CONFIG_LINE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AXIS_CONFIG_LINE_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return AXIS_CONFIG_SCALE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return AXIS_CONFIG_X_KEY_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return addLineToAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return updateLineInAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return removeLineFromAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return updateAxisScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return updateXAxisKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return updateAxisScaleRangeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return updateAxisScaleRangeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return GLOBAL_CONFIG_POLLING_RATE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return GLOBAL_CONFIG_CHART_SIZE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return updateGlobalPollingRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return updateGlobalChartSize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware_api__ = __webpack_require__(282);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// results API

var RESULTS_REQUEST = 'RESULTS_REQUEST';
var RESULTS_SUCCESS = 'RESULTS_SUCCESS';
var RESULTS_FAILUE = 'RESULTS_FAILUE';
var RESULT_UPDATE_REQUEST = 'RESULT_UPDATE_REQUEST';
var RESULT_UPDATE_SUCCESS = 'RESULT_UPDATE_SUCCESS';
var RESULT_UPDATE_FAILUE = 'RESULT_UPDATE_FAILUE';
var RESULT_DELETE_REQUEST = 'RESULT_DELETE_REQUEST';
var RESULT_DELETE_SUCCESS = 'RESULT_DELETE_SUCCESS';
var RESULT_DELETE_FAILUE = 'RESULT_DELETE_FAILUE';

var fetchResults = function fetchResults() {
  return _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__middleware_api__["a" /* CALL_API */], {
    types: [RESULTS_REQUEST, RESULTS_SUCCESS, RESULTS_FAILUE],
    endpoint: 'results'
  });
};

var loadResults = function loadResults() {
  return function (dispatch) {
    return dispatch(fetchResults());
  };
};

var updateResult = function updateResult() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var id = result.id,
      name = result.name;

  if (!Number.isInteger(id)) {
    throw new Error('Result id is invalid.');
  }
  return _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__middleware_api__["a" /* CALL_API */], {
    types: [RESULT_UPDATE_REQUEST, RESULT_UPDATE_SUCCESS, RESULT_UPDATE_FAILUE],
    endpoint: 'results/' + id,
    method: 'PUT',
    body: { result: { id: id, name: name } }
  });
};

var deleteResult = function deleteResult(resultId) {
  if (!Number.isInteger(resultId)) {
    throw new Error('Result id is invalid.');
  }
  return _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__middleware_api__["a" /* CALL_API */], {
    types: [RESULT_DELETE_REQUEST, RESULT_DELETE_SUCCESS, RESULT_DELETE_FAILUE],
    endpoint: 'results/' + resultId,
    method: 'DELETE'
  });
};

// axis config

var AXIS_CONFIG_LINE_ADD = 'AXIS_CONFIG_LINE_ADD';
var AXIS_CONFIG_LINE_UPDATE = 'AXIS_CONFIG_LINE_UPDATE';
var AXIS_CONFIG_LINE_REMOVE = 'AXIS_CONFIG_LINE_REMOVE';
var AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';
var AXIS_CONFIG_X_KEY_UPDATE = 'AXIS_CONFIG_X_KEY_UPDATE';
var AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE';
var AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE';

var addLineToAxis = function addLineToAxis(axisName, line) {
  return {
    type: AXIS_CONFIG_LINE_ADD,
    axisName: axisName,
    line: line
  };
};

var updateLineInAxis = function updateLineInAxis(axisName, lineKey, line) {
  return {
    type: AXIS_CONFIG_LINE_UPDATE,
    axisName: axisName,
    lineKey: lineKey,
    line: line
  };
};

var removeLineFromAxis = function removeLineFromAxis(axisName, lineKey) {
  return {
    type: AXIS_CONFIG_LINE_REMOVE,
    axisName: axisName,
    lineKey: lineKey
  };
};

var updateAxisScale = function updateAxisScale(axisName, scale) {
  return {
    type: AXIS_CONFIG_SCALE_UPDATE,
    axisName: axisName,
    scale: scale
  };
};

var updateXAxisKey = function updateXAxisKey(xAxisKey) {
  return {
    type: AXIS_CONFIG_X_KEY_UPDATE,
    axisName: 'xAxis',
    xAxisKey: xAxisKey
  };
};

var updateAxisScaleRangeType = function updateAxisScaleRangeType(axisName, scale, isMin) {
  var rangeType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'auto';
  return {
    type: AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE,
    axisName: axisName,
    scale: scale,
    isMin: isMin,
    rangeType: rangeType
  };
};

var updateAxisScaleRangeNumber = function updateAxisScaleRangeNumber(axisName, scale, isMin, rangeNumber) {
  return {
    type: AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE,
    axisName: axisName,
    scale: scale,
    isMin: isMin,
    rangeNumber: rangeNumber
  };
};

// global config

var GLOBAL_CONFIG_POLLING_RATE_UPDATE = 'GLOBAL_CONFIG_POLLING_RATE_UPDATE';
var GLOBAL_CONFIG_CHART_SIZE_UPDATE = 'GLOBAL_CONFIG_CHART_SIZE_UPDATE';

var updateGlobalPollingRate = function updateGlobalPollingRate(pollingRate) {
  return {
    type: GLOBAL_CONFIG_POLLING_RATE_UPDATE,
    pollingRate: pollingRate
  };
};

var updateGlobalChartSize = function updateGlobalChartSize(chartSize) {
  return {
    type: GLOBAL_CONFIG_CHART_SIZE_UPDATE,
    chartSize: chartSize
  };
};

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CALL_API; });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var API_ROOT = '/api/v1/';

var callApi = function callApi(endpoint) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
  var body = arguments[2];

  var fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  var options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  return fetch(fullUrl, options).then(function (response) {
    return response.json().then(function (json) {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
  });
};

var CALL_API = 'Call API';

/* harmony default export */ __webpack_exports__["b"] = (function (store) {
  return function (next) {
    return function (action) {
      var callAPI = action[CALL_API];
      if (typeof callAPI === 'undefined') {
        return next(action);
      }

      var endpoint = callAPI.endpoint;
      var types = callAPI.types,
          method = callAPI.method,
          body = callAPI.body;


      if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
      }

      if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
      }

      var actionWith = function actionWith(data) {
        var finalAction = _extends({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
      };

      var _types = _slicedToArray(types, 3),
          requestType = _types[0],
          successType = _types[1],
          failureType = _types[2];

      next(actionWith({ type: requestType }));

      return callApi(endpoint, method, body).then(function (response) {
        return next(actionWith({
          response: response,
          type: successType
        }));
      }, function (error) {
        return next(actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        }));
      });
    };
  };
});

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return chartSizeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pollingOptions; });

var chartSizeOptions = [{
  id: 1,
  name: '640x480',
  width: 640,
  height: 480,
  aspect: 1.333
}, {
  id: 2,
  name: '1024x768',
  width: 1024,
  height: 768,
  aspect: 1.333
}, {
  id: 3,
  name: '1280x720',
  width: 1280,
  height: 720,
  aspect: 1.778
}, {
  id: 4,
  name: 'fluid(16:9)',
  width: '100%',
  height: '100%',
  aspect: 1.778
}];

var pollingOptions = [{
  id: 1,
  name: 'stop',
  value: 0
}, {
  id: 2,
  name: '5s',
  value: 5 * 1000
}, {
  id: 3,
  name: '10s',
  value: 10 * 1000
}, {
  id: 4,
  name: '15s',
  value: 15 * 1000
}, {
  id: 5,
  name: '20s',
  value: 20 * 1000
}];

/* unused harmony default export */ var _unused_webpack_default_export = ({
  chartSizeOptions: chartSizeOptions,
  pollingOptions: pollingOptions
});

/***/ }),

/***/ 422:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(423);


/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_configureStore__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__ = __webpack_require__(553);







var store = Object(__WEBPACK_IMPORTED_MODULE_4__store_configureStore__["a" /* default */])();

var render = function render(Component, appNode) {
  __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_redux__["Provider"],
    { store: store },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__["AppContainer"],
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, null)
    )
  ), appNode);
};

if (false) {
  var appNode = document.createElement('div');
  document.body.appendChild(appNode);
  render(ChainerUIContainer, appNode);
  module.hot.accept('./containers/ChainerUIContainer', function () {
    render(ChainerUIContainer, appNode);
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    var appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(__WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__["a" /* default */], appNode);
    }
  });
}

/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middleware_api__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers__ = __webpack_require__(549);







var configureStore = function configureStore(preloadedState) {
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_4__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3_redux_logger__["createLogger"])()];

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_5__reducers__["a" /* default */], preloadedState, __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(undefined, middleware));

  Object(__WEBPACK_IMPORTED_MODULE_2_redux_persist__["persistStore"])(store);

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(283);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["l" /* RESULTS_SUCCESS */]:
      if (action.response && action.response.results) {
        var resultsList = action.response.results;
        var results = {};
        resultsList.forEach(function (result) {
          results[result.id] = result;
        });
        return _extends({}, state, { results: results });
      }
      return state;
    case __WEBPACK_IMPORTED_MODULE_3__actions__["n" /* RESULT_UPDATE_SUCCESS */]:
      if (action.response && action.response.result) {
        var result = action.response.result;

        return _extends({}, state, {
          results: _extends({}, state.results, _defineProperty({}, result.id, result))
        });
      }
      return state;
    case __WEBPACK_IMPORTED_MODULE_3__actions__["m" /* RESULT_DELETE_SUCCESS */]:
      if (action.response && action.response.result) {
        var resultId = action.response.result.id;
        var newResults = _extends({}, state.results);
        delete newResults[resultId];
        return _extends({}, state, {
          results: newResults
        });
      }
      return state;
    default:
      return state;
  }
};

var fetchState = function fetchState() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: '' };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["k" /* RESULTS_REQUEST */]:
    case __WEBPACK_IMPORTED_MODULE_3__actions__["l" /* RESULTS_SUCCESS */]:
    case __WEBPACK_IMPORTED_MODULE_3__actions__["j" /* RESULTS_FAILUE */]:
      return _extends({}, state, {
        results: action.type
      });
    case __WEBPACK_IMPORTED_MODULE_3__actions__["i" /* GLOBAL_CONFIG_POLLING_RATE_UPDATE */]:
      if (action.pollingRate === 0) {
        return _extends({}, state, {
          results: ''
        });
      }
      return state;
    default:
      return state;
  }
};

var axesStateWithoutResult = function axesStateWithoutResult(state, resultId) {
  if (!Number.isInteger(resultId)) {
    return state;
  }
  var newState = {};
  Object.keys(state).forEach(function (axisName) {
    var axisConfig = state[axisName];
    var _axisConfig$lines = axisConfig.lines,
        lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;

    newState[axisName] = _extends({}, axisConfig, {
      lines: lines.filter(function () {
        var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return line.resultId != null && line.resultId !== resultId;
      })
    });
  });
  return newState;
};

var axes = function axes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var axisName = action.axisName,
      line = action.line,
      lineKey = action.lineKey,
      _action$scale = action.scale,
      scale = _action$scale === undefined ? 'linear' : _action$scale,
      xAxisKey = action.xAxisKey,
      _action$rangeType = action.rangeType,
      rangeType = _action$rangeType === undefined ? 'auto' : _action$rangeType,
      isMin = action.isMin,
      rangeNumber = action.rangeNumber;

  var axisConfig = state[axisName] || { axisName: axisName };
  var _axisConfig$lines2 = axisConfig.lines,
      lines = _axisConfig$lines2 === undefined ? [] : _axisConfig$lines2,
      _axisConfig$scaleRang = axisConfig.scaleRange,
      scaleRange = _axisConfig$scaleRang === undefined ? {} : _axisConfig$scaleRang;

  var idx = isMin ? 0 : 1;
  var rangeConfig = scaleRange[scale] || {};
  var _rangeConfig$rangeTyp = rangeConfig.rangeTypes,
      rangeTypes = _rangeConfig$rangeTyp === undefined ? [] : _rangeConfig$rangeTyp,
      _rangeConfig$range = rangeConfig.range,
      range = _rangeConfig$range === undefined ? [] : _rangeConfig$range;


  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* AXIS_CONFIG_LINE_ADD */]:
      if (line == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        lines: [].concat(_toConsumableArray(lines), [line])
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* AXIS_CONFIG_LINE_UPDATE */]:
      for (var i = 0; i < lines.length; i += 1) {
        if (Object(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* line2key */])(lines[i]) === lineKey) {
          return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
            lines: Object.assign([], lines, _defineProperty({}, i, line))
          })));
        }
      }
      return state;
    case __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* AXIS_CONFIG_LINE_REMOVE */]:
      if (lineKey == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        lines: [].concat(_toConsumableArray(lines.filter(function (l) {
          return Object(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* line2key */])(l) !== lineKey;
        })))
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["f" /* AXIS_CONFIG_SCALE_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scale: scale
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["g" /* AXIS_CONFIG_X_KEY_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        xAxisKey: xAxisKey
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["e" /* AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scaleRange: _extends({}, scaleRange, _defineProperty({}, scale, {
          rangeTypes: Object.assign([], rangeTypes, _defineProperty({}, idx, rangeType)),
          range: range
        }))
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scaleRange: _extends({}, scaleRange, _defineProperty({}, scale, {
          rangeTypes: rangeTypes,
          range: Object.assign([], range, _defineProperty({}, idx, rangeNumber))
        }))
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["m" /* RESULT_DELETE_SUCCESS */]:
      if (action.response && action.response.result) {
        var resultId = action.response.result.id;
        return axesStateWithoutResult(state, resultId);
      }
      return state;
    default:
      return state;
  }
};

var defaultGlobaState = {
  pollingRate: __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* pollingOptions */][1].value,
  chartSize: __WEBPACK_IMPORTED_MODULE_5__constants__["a" /* chartSizeOptions */][0]
};

var global = function global() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultGlobaState;
  var action = arguments[1];
  var pollingRate = action.pollingRate,
      chartSize = action.chartSize;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["i" /* GLOBAL_CONFIG_POLLING_RATE_UPDATE */]:
      return _extends({}, state, {
        pollingRate: pollingRate
      });

    case __WEBPACK_IMPORTED_MODULE_3__actions__["h" /* GLOBAL_CONFIG_CHART_SIZE_UPDATE */]:
      return _extends({}, state, {
        chartSize: chartSize
      });
    default:
      return state;
  }
};

var config = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  axes: axes,
  global: global
});

var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  entities: entities,
  fetchState: fetchState,
  config: Object(__WEBPACK_IMPORTED_MODULE_1_redux_persist__["persistReducer"])({ key: 'config', storage: __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default.a }, config)
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createWebStorage = __webpack_require__(551);

var _createWebStorage2 = _interopRequireDefault(_createWebStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createWebStorage2.default)('local');

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createWebStorage;

var _getStorage = __webpack_require__(552);

var _getStorage2 = _interopRequireDefault(_getStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createWebStorage(type) {
  var storage = (0, _getStorage2.default)(type);
  return {
    getItem: function getItem(key, cb) {
      return cb(null, storage.getItem(key));
    },
    setItem: function setItem(key, item, cb) {
      try {
        cb(null, storage.setItem(key, item));
      } catch (err) {
        cb(err);
      }
    },
    removeItem: function removeItem(key, cb) {
      return cb(null, storage.removeItem(key));
    },
    getAllKeys: function getAllKeys(cb) {
      return cb(null, Object.keys(storage));
    }
  };
}

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getStorage;


function noop() {}

var noopStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop,
  getAllKeys: noop
};

function hasStorage(storageType) {
  if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(storageType in window)) {
    return false;
  }

  try {
    var storage = window[storageType];
    var testKey = 'redux-persist ' + storageType + ' test';
    storage.setItem(testKey, 'test');
    storage.getItem(testKey);
    storage.removeItem(testKey);
  } catch (e) {
    if (false) console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function getStorage(type) {
  var storageType = type + 'Storage';
  if (hasStorage(storageType)) return window[storageType];else {
    if (false) {
      console.error('redux-persist failed to create sync storage. falling back to memory storage.');
    }
    return noopStorage;
  }
}

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_ExperimentsTable__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_LogVisualizer__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_NavigationBar__ = __webpack_require__(833);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_SideBar__ = __webpack_require__(835);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }











var resultsPollingTimer = void 0;

var startResultsPolling = function startResultsPolling(func, pollingRate) {
  if (pollingRate > 0) {
    resultsPollingTimer = setInterval(func, pollingRate);
  }
};

var stopPolling = function stopPolling(timer) {
  clearInterval(timer);
};

var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer() {
    _classCallCheck(this, ChainerUIContainer);

    return _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).apply(this, arguments));
  }

  _createClass(ChainerUIContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.loadResults();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pollingRate = this.props.config.global.pollingRate;

      startResultsPolling(this.props.loadResults, pollingRate);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var currentPollingRate = this.props.config.global.pollingRate;
      var nextPollingRate = nextProps.config.global.pollingRate;

      if (currentPollingRate !== nextPollingRate) {
        stopPolling(resultsPollingTimer);
        startResultsPolling(this.props.loadResults, nextPollingRate);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      stopPolling(resultsPollingTimer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          results = _props.results,
          fetchState = _props.fetchState,
          config = _props.config,
          stats = _props.stats;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'chainer-ui-container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_NavigationBar__["a" /* default */], {
          fetchState: fetchState,
          config: config,
          onGlobalConfigPollingRateUpdate: this.props.updateGlobalPollingRate,
          onGlobalConfigChartSizeUpdate: this.props.updateGlobalChartSize
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Container"],
          { fluid: true },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-md-4 col-lg-3' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_SideBar__["a" /* default */], {
                results: results,
                config: config,
                onAxisConfigLineAdd: this.props.addLineToAxis,
                onAxisConfigLineUpdate: this.props.updateLineInAxis,
                onAxisConfigLineRemove: this.props.removeLineFromAxis,
                onAxisConfigScaleUpdate: this.props.updateAxisScale,
                onAxisConfigXKeyUpdate: this.props.updateXAxisKey,
                onAxisConfigScaleRangeTypeUpdate: this.props.updateAxisScaleRangeType,
                onAxisConfigScaleRangeNumberUpdate: this.props.updateAxisScaleRangeNumber
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-md-8 col-lg-9' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_LogVisualizer__["a" /* default */], {
                results: results,
                stats: stats,
                config: config,
                onAxisConfigLineAdd: this.props.addLineToAxis,
                onAxisConfigLineUpdate: this.props.updateLineInAxis,
                onAxisConfigLineRemove: this.props.removeLineFromAxis,
                onAxisConfigScaleUpdate: this.props.updateAxisScale,
                onAxisConfigXKeyUpdate: this.props.updateXAxisKey
              }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_ExperimentsTable__["a" /* default */], {
                results: results,
                stats: stats,
                onResultUpdate: this.props.updateResult,
                onResultDelete: this.props.deleteResult
              })
            )
          )
        )
      );
    }
  }]);

  return ChainerUIContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapEntitiesToStats = function mapEntitiesToStats(entities) {
  var _entities$results = entities.results,
      results = _entities$results === undefined ? {} : _entities$results;

  var argKeySet = {};
  Object.keys(results).forEach(function (resultId) {
    var result = results[resultId];
    result.args.forEach(function (arg) {
      argKeySet[arg.key] = true;
    });
  });
  var argKeys = Object.keys(argKeySet);

  var axes = {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  };

  return { axes: axes, argKeys: argKeys };
};

var defaultConfig = {
  axes: {},
  global: {}
};

var mapStateToProps = function mapStateToProps(state) {
  var entities = state.entities,
      fetchState = state.fetchState,
      _state$config = state.config,
      config = _state$config === undefined ? defaultConfig : _state$config;
  var _entities$results2 = entities.results,
      results = _entities$results2 === undefined ? {} : _entities$results2;

  var stats = mapEntitiesToStats(entities);
  return { results: results, fetchState: fetchState, config: config, stats: stats };
};

ChainerUIContainer.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  fetchState: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    global: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  loadResults: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateResult: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  deleteResult: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateLineInAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateGlobalPollingRate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateXAxisKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScaleRangeType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScaleRangeNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateGlobalChartSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, {
  loadResults: __WEBPACK_IMPORTED_MODULE_4__actions__["q" /* loadResults */],
  updateResult: __WEBPACK_IMPORTED_MODULE_4__actions__["y" /* updateResult */],
  deleteResult: __WEBPACK_IMPORTED_MODULE_4__actions__["p" /* deleteResult */],
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_4__actions__["o" /* addLineToAxis */],
  updateLineInAxis: __WEBPACK_IMPORTED_MODULE_4__actions__["x" /* updateLineInAxis */],
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_4__actions__["r" /* removeLineFromAxis */],
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_4__actions__["s" /* updateAxisScale */],
  updateGlobalPollingRate: __WEBPACK_IMPORTED_MODULE_4__actions__["w" /* updateGlobalPollingRate */],
  updateXAxisKey: __WEBPACK_IMPORTED_MODULE_4__actions__["z" /* updateXAxisKey */],
  updateAxisScaleRangeType: __WEBPACK_IMPORTED_MODULE_4__actions__["u" /* updateAxisScaleRangeType */],
  updateAxisScaleRangeNumber: __WEBPACK_IMPORTED_MODULE_4__actions__["t" /* updateAxisScaleRangeNumber */],
  updateGlobalChartSize: __WEBPACK_IMPORTED_MODULE_4__actions__["v" /* updateGlobalChartSize */]
})(ChainerUIContainer));

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(567);




var ExperimentsTable = function ExperimentsTable(props) {
  var _props$results = props.results,
      results = _props$results === undefined ? {} : _props$results,
      stats = props.stats,
      onResultUpdate = props.onResultUpdate,
      onResultDelete = props.onResultDelete;
  var argKeys = stats.argKeys;


  var argHeaderElems = argKeys.map(function (argKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'th',
      { key: 'args-' + argKey },
      '(' + argKey + ')'
    );
  });

  var resultRowElems = Object.keys(results).map(function (resultId) {
    var result = results[resultId];
    var key = 'result-row-' + result.id;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ResultRow__["a" /* default */], {
      result: result,
      stats: stats,
      key: key,
      onResultUpdate: onResultUpdate,
      onResultDelete: onResultDelete
    });
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'table',
    { className: 'table' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'thead',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tr',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'id'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'name'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'epoch'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'iteration'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          null,
          'elapsed_time'
        ),
        argHeaderElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('th', null)
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'tbody',
      null,
      resultRowElems
    )
  );
};

ExperimentsTable.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  })),
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }),
  onResultUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onResultDelete: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ExperimentsTable);

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(69);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var emptyStr = '-';

var ResultRow = function (_React$Component) {
  _inherits(ResultRow, _React$Component);

  function ResultRow(props) {
    _classCallCheck(this, ResultRow);

    var _this = _possibleConstructorReturn(this, (ResultRow.__proto__ || Object.getPrototypeOf(ResultRow)).call(this, props));

    _this.handleResultNameChange = _this.handleResultNameChange.bind(_this);
    _this.handleResultNameKeyPress = _this.handleResultNameKeyPress.bind(_this);
    _this.handleResultUpdate = _this.handleResultUpdate.bind(_this);
    _this.handleUnwatch = _this.handleUnwatch.bind(_this);
    _this.toggleUnwatchModal = _this.toggleUnwatchModal.bind(_this);

    var result = _this.props.result;

    _this.state = {
      resultName: result.name
    };
    return _this;
  }

  _createClass(ResultRow, [{
    key: 'handleResultNameChange',
    value: function handleResultNameChange(e) {
      this.setState({
        resultName: e.target.value
      });
    }
  }, {
    key: 'handleResultNameKeyPress',
    value: function handleResultNameKeyPress(e) {
      if (e.key === 'Enter') {
        this.handleResultUpdate();
      }
    }
  }, {
    key: 'handleResultUpdate',
    value: function handleResultUpdate() {
      var _props = this.props,
          result = _props.result,
          onResultUpdate = _props.onResultUpdate;
      var resultName = this.state.resultName;

      if (resultName !== result.name) {
        onResultUpdate(_extends({}, result, { name: resultName }));
      }
    }
  }, {
    key: 'handleUnwatch',
    value: function handleUnwatch() {
      var _props2 = this.props,
          result = _props2.result,
          onResultDelete = _props2.onResultDelete;

      onResultDelete(result.id);
      this.toggleUnwatchModal();
    }
  }, {
    key: 'toggleUnwatchModal',
    value: function toggleUnwatchModal() {
      this.setState({
        showUnwatchModal: !this.state.showUnwatchModal
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          resultName = _state.resultName,
          showUnwatchModal = _state.showUnwatchModal;
      var _props3 = this.props,
          result = _props3.result,
          stats = _props3.stats;
      var args = result.args,
          logs = result.logs;


      var lastLog = logs[logs.length - 1] || {};
      var _lastLog$logItems = lastLog.logItems,
          logItems = _lastLog$logItems === undefined ? [] : _lastLog$logItems;

      var lastLogDict = {};
      logItems.forEach(function (logItem) {
        lastLogDict[logItem.key] = logItem.value;
      });

      var argDict = {};
      args.forEach(function (arg) {
        argDict[arg.key] = arg.value;
      });
      var argElems = stats.argKeys.map(function (argKey) {
        var content = argKey in argDict ? argDict[argKey] : emptyStr;
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          { key: 'args-' + argKey },
          typeof content === 'boolean' ? String(content) : content
        );
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tr',
        { className: 'result-row' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          result.id
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'form-control result-name',
            type: 'text',
            placeholder: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["e" /* truncate */])(result.pathName, { length: 22, forward: true }),
            value: resultName || '',
            onChange: this.handleResultNameChange,
            onKeyPress: this.handleResultNameKeyPress,
            onBlur: this.handleResultUpdate
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          lastLogDict.epoch
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          lastLogDict.iteration
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          lastLogDict.elapsed_time
        ),
        argElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { className: 'close', 'aria-label': 'Close', onClick: this.toggleUnwatchModal },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { 'aria-hidden': true },
              '\xD7'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Modal"],
            { isOpen: showUnwatchModal },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalHeader"],
              null,
              'Unwatch a result'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalBody"],
              null,
              'Are you sure to unwatch ',
              Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* displayName */])(result),
              ' ?'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalFooter"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
                { color: 'secondary', onClick: this.toggleUnwatchModal },
                'Cancel'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
                { color: 'danger', onClick: this.handleUnwatch },
                'Unwatch'
              )
            )
          )
        )
      );
    }
  }]);

  return ResultRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ResultRow.propTypes = {
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }),
  onResultUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onResultDelete: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ResultRow);

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css__ = __webpack_require__(832);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(69);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var getDomain = function getDomain() {
  var axisConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _axisConfig$scale = axisConfig.scale,
      scale = _axisConfig$scale === undefined ? 'linear' : _axisConfig$scale,
      _axisConfig$scaleRang = axisConfig.scaleRange,
      scaleRange = _axisConfig$scaleRang === undefined ? {} : _axisConfig$scaleRang;

  var _ref = scaleRange[scale] || {},
      _ref$rangeTypes = _ref.rangeTypes,
      rangeTypes = _ref$rangeTypes === undefined ? [] : _ref$rangeTypes,
      range = _ref.range;

  var domain = [];
  for (var i = 0; i < 2; i += 1) {
    var rangeType = rangeTypes[i] || 'auto';
    if (rangeType === 'number') {
      domain[i] = range[i] == null || range[i] === '' ? 'auto' : range[i];
    } else {
      domain[i] = rangeType;
    }
  }
  return domain;
};

var buildLineElem = function buildLineElem(line, axisName, results) {
  var _line$config = line.config,
      config = _line$config === undefined ? {} : _line$config;

  var result = results[line.resultId] || {};

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Line"], {
    type: 'linear',
    name: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["d" /* line2name */])(line, result),
    dataKey: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* line2dataKey */])(line, axisName),
    yAxisId: axisName,
    stroke: config.color,
    connectNulls: true,
    isAnimationActive: false,
    key: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* line2dataKey */])(line, axisName)
  });
};

var buildLineElems = function buildLineElems(axisName, results, config) {
  var axisConfig = config.axes[axisName] || {};
  var _axisConfig$lines = axisConfig.lines,
      lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;

  var visibleLines = lines.filter(function (line) {
    return line.config.isVisible;
  });
  return visibleLines.map(function (line) {
    return buildLineElem(line, axisName, results);
  });
};

var LogVisualizer = function (_React$Component) {
  _inherits(LogVisualizer, _React$Component);

  function LogVisualizer(props) {
    _classCallCheck(this, LogVisualizer);

    var _this = _possibleConstructorReturn(this, (LogVisualizer.__proto__ || Object.getPrototypeOf(LogVisualizer)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(LogVisualizer, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$results = _props.results,
          results = _props$results === undefined ? {} : _props$results,
          _props$config = _props.config,
          config = _props$config === undefined ? {} : _props$config;

      var _ref2 = config.axes || {},
          _ref2$xAxis = _ref2.xAxis,
          xAxis = _ref2$xAxis === undefined ? { axisName: 'xAxis' } : _ref2$xAxis,
          _ref2$yLeftAxis = _ref2.yLeftAxis,
          yLeftAxis = _ref2$yLeftAxis === undefined ? { axisName: 'yLeftAxis' } : _ref2$yLeftAxis,
          _ref2$yRightAxis = _ref2.yRightAxis,
          yRightAxis = _ref2$yRightAxis === undefined ? { axisName: 'yRightAxis' } : _ref2$yRightAxis;

      var _xAxis$xAxisKey = xAxis.xAxisKey,
          xAxisKey = _xAxis$xAxisKey === undefined ? 'epoch' : _xAxis$xAxisKey;

      var leftLines = yLeftAxis.lines || [];
      var rightLines = yRightAxis.lines || [];
      var axisLines = {
        yLeftAxis: leftLines,
        yRightAxis: rightLines
      };

      var dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
      Object.keys(axisLines).forEach(function (axisName) {
        var lines = axisLines[axisName];
        lines.forEach(function (line) {
          var resultId = line.resultId,
              logKey = line.logKey;

          var result = results[resultId];
          if (result == null) {
            return;
          }
          var logs = result.logs || [];
          logs.forEach(function (log) {
            var logDict = {};
            log.logItems.forEach(function (logItem) {
              logDict[logItem.key] = logItem.value;
            });
            if (logDict[xAxisKey] == null || logDict[logKey] == null) {
              return;
            }
            if (dataDict[logDict[xAxisKey]] == null) {
              dataDict[logDict[xAxisKey]] = _defineProperty({}, xAxisKey, logDict[xAxisKey]);
            }
            dataDict[logDict[xAxisKey]][Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* line2dataKey */])(line, axisName)] = logDict[logKey];
          });
        });
      });
      var data = Object.keys(dataDict).map(function (key) {
        return dataDict[key];
      });

      var lineElems = [].concat(_toConsumableArray(buildLineElems('yLeftAxis', results, config)), _toConsumableArray(buildLineElems('yRightAxis', results, config)));

      var chartSize = this.props.config.global.chartSize;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'log-visualizer-root' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_recharts__["ResponsiveContainer"],
          {
            width: chartSize.width,
            height: chartSize.height,
            aspect: chartSize.aspect
          },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_recharts__["LineChart"],
            { data: data },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["XAxis"], {
              type: 'number',
              dataKey: xAxisKey,
              scale: xAxis.scale,
              domain: getDomain(xAxis),
              allowDataOverflow: true
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
              yAxisId: 'yLeftAxis',
              orientation: 'left',
              scale: yLeftAxis.scale,
              domain: getDomain(yLeftAxis),
              allowDataOverflow: true
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
              yAxisId: 'yRightAxis',
              orientation: 'right',
              scale: yRightAxis.scale,
              domain: getDomain(yRightAxis),
              allowDataOverflow: true
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["CartesianGrid"], { strokeDasharray: '3 3' }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Tooltip"], null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Legend"], null),
            lineElems
          )
        )
      );
    }
  }]);

  return LogVisualizer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LogVisualizer.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    }),
    global: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      chartSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]),
        height: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string]),
        aspect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired
      })
    })
  }).isRequired
};

LogVisualizer.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (LogVisualizer);

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return line2key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return line2name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return line2dataKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return displayName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return truncate; });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var line2key = function line2key(line) {
  return line.resultId + '_' + line.logKey;
};

var line2dataKey = function line2dataKey(line, axisName) {
  return axisName + '_' + line2key(line);
};

var truncate = function truncate(string) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$length = options.length,
      length = _options$length === undefined ? 20 : _options$length,
      _options$restStr = options.restStr,
      restStr = _options$restStr === undefined ? '...' : _options$restStr,
      _options$forward = options.forward,
      forward = _options$forward === undefined ? false : _options$forward;

  var str = string || '';
  var chars = [].concat(_toConsumableArray(str));
  if (chars.length > length) {
    if (forward) {
      str = restStr + chars.slice(chars.length - length).join('');
    } else {
      str = chars.slice(0, length).join('') + restStr;
    }
  }
  return str;
};

var displayName = function displayName() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return truncate(result.name) || truncate(result.pathName, { forward: true });
};

var line2name = function line2name(line) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return displayName(result) + '/' + line.logKey;
};



/***/ }),

/***/ 832:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 833:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ResultsFetchState__ = __webpack_require__(834);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(283);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







var createPollingOptionElems = function createPollingOptionElems(options) {
  return [].concat(_toConsumableArray(options.map(function (option) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { key: option.id, value: option.value },
      option.name
    );
  })));
};

var createVisualizerSizeOptionElems = function createVisualizerSizeOptionElems(options) {
  return [].concat(_toConsumableArray(options.map(function (option) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { key: option.id, value: option.id },
      option.name
    );
  })));
};

var NavigationBar = function (_React$Component) {
  _inherits(NavigationBar, _React$Component);

  function NavigationBar(props) {
    _classCallCheck(this, NavigationBar);

    var _this = _possibleConstructorReturn(this, (NavigationBar.__proto__ || Object.getPrototypeOf(NavigationBar)).call(this, props));

    _this.toggleSettingPopover = _this.toggleSettingPopover.bind(_this);
    _this.handleChangePollingRate = _this.handleChangePollingRate.bind(_this);
    _this.handleChangeChartSize = _this.handleChangeChartSize.bind(_this);
    _this.state = {
      settingPopoverOpen: false
    };
    return _this;
  }

  _createClass(NavigationBar, [{
    key: 'toggleSettingPopover',
    value: function toggleSettingPopover() {
      this.setState({
        settingPopoverOpen: !this.state.settingPopoverOpen
      });
    }
  }, {
    key: 'handleChangePollingRate',
    value: function handleChangePollingRate(e) {
      this.props.onGlobalConfigPollingRateUpdate(Number(e.target.value));
    }
  }, {
    key: 'handleChangeChartSize',
    value: function handleChangeChartSize(e) {
      var selectedId = Number(e.target.value);
      var chartSize = __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* chartSizeOptions */].find(function (o) {
        return o.id === selectedId;
      });
      this.props.onGlobalConfigChartSizeUpdate(chartSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var pollingOptionElems = createPollingOptionElems(__WEBPACK_IMPORTED_MODULE_4__constants__["b" /* pollingOptions */]);
      var chartSizeElems = createVisualizerSizeOptionElems(__WEBPACK_IMPORTED_MODULE_4__constants__["a" /* chartSizeOptions */]);
      var _props$config$global$ = this.props.config.global.chartSize,
          chartSize = _props$config$global$ === undefined ? {} : _props$config$global$;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Navbar"],
        { className: 'navbar-light bg-light mb-3' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Container"],
          { fluid: true },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["NavbarBrand"],
            { href: '/' },
            'Chainer UI'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Collapse"],
            { isOpen: true },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { className: 'navbar-text mx-3 my-0' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__ResultsFetchState__["a" /* default */], { fetchState: this.props.fetchState, config: this.props.config })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { id: 'navbar-global-setting', onClick: this.toggleSettingPopover },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'oi oi-cog' })
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Popover"],
          { placement: 'left bottom', isOpen: this.state.settingPopoverOpen, target: 'navbar-global-setting', toggle: this.toggleSettingPopover },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["PopoverTitle"],
            { className: 'popover-header' },
            'Global Setting'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["PopoverContent"],
            { className: 'popover-body' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                  { 'for': 'global-config-polling-rate' },
                  'Results polling rate'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'select',
                  {
                    className: 'form-control',
                    type: 'select',
                    name: 'select',
                    id: 'global-config-polling-rate',
                    onChange: this.handleChangePollingRate,
                    value: this.props.config.global.pollingRate
                  },
                  pollingOptionElems
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                  { 'for': 'global-config-chart-size' },
                  'Chart size'
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'select',
                  {
                    className: 'form-control',
                    type: 'select',
                    name: 'select',
                    id: 'global-config-chart-size',
                    value: chartSize.id,
                    onChange: this.handleChangeChartSize
                  },
                  chartSizeElems
                )
              )
            )
          )
        )
      );
    }
  }]);

  return NavigationBar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

NavigationBar.propTypes = {
  fetchState: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    global: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      pollingRate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      chartSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
    })
  }),
  onGlobalConfigPollingRateUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onGlobalConfigChartSizeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

NavigationBar.defaultProps = {
  config: {}
};

/* harmony default export */ __webpack_exports__["a"] = (NavigationBar);

/***/ }),

/***/ 834:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(168);




var ResultsFetchState = function ResultsFetchState(props) {
  var _props$fetchState = props.fetchState,
      fetchState = _props$fetchState === undefined ? {} : _props$fetchState,
      _props$config = props.config,
      config = _props$config === undefined ? { global: {} } : _props$config;

  var resultsFetchState = fetchState.results;

  var colorClass = void 0;
  if (config.global.pollingRate === 0) {
    colorClass = 'text-muted';
  } else {
    switch (resultsFetchState) {
      case __WEBPACK_IMPORTED_MODULE_2__actions__["k" /* RESULTS_REQUEST */]:
        colorClass = 'text-primary';
        break;
      case __WEBPACK_IMPORTED_MODULE_2__actions__["l" /* RESULTS_SUCCESS */]:
        colorClass = 'text-success';
        break;
      case __WEBPACK_IMPORTED_MODULE_2__actions__["j" /* RESULTS_FAILUE */]:
        colorClass = 'text-danger';
        break;
      default:
        colorClass = 'text-muted';
        break;
    }
  }
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'small',
    { className: colorClass },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'oi oi-media-record' })
  );
};

ResultsFetchState.propTypes = {
  fetchState: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    global: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      pollingRate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
    })
  }).isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (ResultsFetchState);

/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxesConfigurator__ = __webpack_require__(836);




var SideBar = function SideBar(props) {
  var results = props.results,
      config = props.config,
      onAxisConfigLineAdd = props.onAxisConfigLineAdd,
      onAxisConfigLineUpdate = props.onAxisConfigLineUpdate,
      onAxisConfigLineRemove = props.onAxisConfigLineRemove,
      onAxisConfigScaleUpdate = props.onAxisConfigScaleUpdate,
      onAxisConfigXKeyUpdate = props.onAxisConfigXKeyUpdate,
      onAxisConfigScaleRangeTypeUpdate = props.onAxisConfigScaleRangeTypeUpdate,
      onAxisConfigScaleRangeNumberUpdate = props.onAxisConfigScaleRangeNumberUpdate;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'side-bar' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__AxesConfigurator__["a" /* default */], {
      results: results,
      config: config,
      onAxisConfigLineAdd: onAxisConfigLineAdd,
      onAxisConfigLineUpdate: onAxisConfigLineUpdate,
      onAxisConfigLineRemove: onAxisConfigLineRemove,
      onAxisConfigScaleUpdate: onAxisConfigScaleUpdate,
      onAxisConfigXKeyUpdate: onAxisConfigXKeyUpdate,
      onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
      onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate
    })
  );
};

SideBar.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    })
  }).isRequired,
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigXKeyUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

SideBar.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (SideBar);

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisConfigurator__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__XAxisKeySelector__ = __webpack_require__(925);






var AxesConfigurator = function AxesConfigurator(props) {
  var results = props.results,
      config = props.config,
      onAxisConfigLineAdd = props.onAxisConfigLineAdd,
      onAxisConfigLineUpdate = props.onAxisConfigLineUpdate,
      onAxisConfigLineRemove = props.onAxisConfigLineRemove,
      onAxisConfigScaleUpdate = props.onAxisConfigScaleUpdate,
      onAxisConfigXKeyUpdate = props.onAxisConfigXKeyUpdate,
      onAxisConfigScaleRangeTypeUpdate = props.onAxisConfigScaleRangeTypeUpdate,
      onAxisConfigScaleRangeNumberUpdate = props.onAxisConfigScaleRangeNumberUpdate;

  var _ref = config.axes || {},
      _ref$xAxis = _ref.xAxis,
      xAxis = _ref$xAxis === undefined ? { axisName: 'xAxis' } : _ref$xAxis,
      _ref$yLeftAxis = _ref.yLeftAxis,
      yLeftAxis = _ref$yLeftAxis === undefined ? { axisName: 'yLeftAxis' } : _ref$yLeftAxis,
      _ref$yRightAxis = _ref.yRightAxis,
      yRightAxis = _ref$yRightAxis === undefined ? { axisName: 'yRightAxis' } : _ref$yRightAxis;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'axes-configurator' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2__AxisConfigurator__["a" /* default */],
      {
        axisConfig: yLeftAxis,
        onChangeScale: onAxisConfigScaleUpdate,
        onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
        onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__["a" /* default */], {
        results: results,
        axisName: 'yLeftAxis',
        lines: yLeftAxis.lines,
        onAxisConfigLineAdd: onAxisConfigLineAdd,
        onAxisConfigLineUpdate: onAxisConfigLineUpdate,
        onAxisConfigLineRemove: onAxisConfigLineRemove
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2__AxisConfigurator__["a" /* default */],
      {
        axisConfig: yRightAxis,
        onChangeScale: onAxisConfigScaleUpdate,
        onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
        onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__["a" /* default */], {
        results: results,
        axisName: 'yRightAxis',
        lines: yRightAxis.lines,
        onAxisConfigLineAdd: onAxisConfigLineAdd,
        onAxisConfigLineUpdate: onAxisConfigLineUpdate,
        onAxisConfigLineRemove: onAxisConfigLineRemove
      })
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2__AxisConfigurator__["a" /* default */],
      {
        axisConfig: xAxis,
        onChangeScale: onAxisConfigScaleUpdate,
        onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
        onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: 'list-group list-group-flush' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: 'list-group-item' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__XAxisKeySelector__["a" /* default */], { value: xAxis.xAxisKey, onChange: onAxisConfigXKeyUpdate })
        )
      )
    )
  );
};

AxesConfigurator.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    })
  }).isRequired,
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigXKeyUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

AxesConfigurator.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (AxesConfigurator);

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AxisScaleSelector__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AxisRangeConfigurator__ = __webpack_require__(839);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var AxisConfigurator = function (_React$Component) {
  _inherits(AxisConfigurator, _React$Component);

  function AxisConfigurator(props) {
    _classCallCheck(this, AxisConfigurator);

    var _this = _possibleConstructorReturn(this, (AxisConfigurator.__proto__ || Object.getPrototypeOf(AxisConfigurator)).call(this, props));

    _this.handleChangeScale = _this.handleChangeScale.bind(_this);
    _this.toggleRangeConfig = _this.toggleRangeConfig.bind(_this);

    _this.state = {
      showRangeConfig: false
    };
    return _this;
  }

  _createClass(AxisConfigurator, [{
    key: 'handleChangeScale',
    value: function handleChangeScale(scale) {
      var axisName = this.props.axisConfig.axisName;

      this.props.onChangeScale(axisName, scale);
    }
  }, {
    key: 'toggleRangeConfig',
    value: function toggleRangeConfig() {
      this.setState({
        showRangeConfig: !this.state.showRangeConfig
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          axisConfig = _props.axisConfig,
          onAxisConfigScaleRangeTypeUpdate = _props.onAxisConfigScaleRangeTypeUpdate,
          onAxisConfigScaleRangeNumberUpdate = _props.onAxisConfigScaleRangeNumberUpdate;
      var axisName = axisConfig.axisName,
          scale = axisConfig.scale;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'axis-configurator card' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card-header' },
          axisName
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__AxisScaleSelector__["a" /* default */], {
            scale: scale,
            onChange: this.handleChangeScale
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { size: 'sm', className: 'my-2', onClick: this.toggleRangeConfig },
            'Toggle range setting'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Collapse"],
            { isOpen: this.state.showRangeConfig },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__AxisRangeConfigurator__["a" /* default */], {
              axisConfig: axisConfig,
              isMin: false,
              onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
              onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__AxisRangeConfigurator__["a" /* default */], {
              axisConfig: axisConfig,
              isMin: true,
              onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
              onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate
            })
          )
        ),
        this.props.children
      );
    }
  }]);

  return AxisConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AxisConfigurator.propTypes = {
  axisConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    scale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    scaleRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      rangeTypes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
      range: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number)
    }))
  }).isRequired,
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element,
  onChangeScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
AxisConfigurator.defaultProps = {
  children: null
};

/* harmony default export */ __webpack_exports__["a"] = (AxisConfigurator);

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var scaleOptions = ['linear', 'log'];

var AxisScaleSelector = function AxisScaleSelector(props) {
  var scale = props.scale,
      onChange = props.onChange;

  var handleChangeAxisKey = function handleChangeAxisKey(e) {
    onChange(e.target.value);
  };

  var options = scaleOptions.map(function (scaleKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: scaleKey, key: scaleKey },
      scaleKey
    );
  });
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'select',
    { id: 'axis-scale-selector-select', className: 'form-control', value: scale, onChange: handleChangeAxisKey },
    options
  );
};

AxisScaleSelector.propTypes = {
  scale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

AxisScaleSelector.defaultProps = {
  scale: '',
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (AxisScaleSelector);

/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var AxisRangeConfigurator = function (_React$Component) {
  _inherits(AxisRangeConfigurator, _React$Component);

  function AxisRangeConfigurator() {
    _classCallCheck(this, AxisRangeConfigurator);

    var _this = _possibleConstructorReturn(this, (AxisRangeConfigurator.__proto__ || Object.getPrototypeOf(AxisRangeConfigurator)).call(this));

    _this.handleRangeTypeChange = _this.handleRangeTypeChange.bind(_this);
    _this.handleNumberChange = _this.handleNumberChange.bind(_this);
    return _this;
  }

  _createClass(AxisRangeConfigurator, [{
    key: 'handleRangeTypeChange',
    value: function handleRangeTypeChange(e) {
      var _props = this.props,
          axisConfig = _props.axisConfig,
          isMin = _props.isMin,
          onAxisConfigScaleRangeTypeUpdate = _props.onAxisConfigScaleRangeTypeUpdate;
      var axisName = axisConfig.axisName,
          _axisConfig$scale = axisConfig.scale,
          scale = _axisConfig$scale === undefined ? 'linear' : _axisConfig$scale;

      onAxisConfigScaleRangeTypeUpdate(axisName, scale, isMin, e.target.value);
    }
  }, {
    key: 'handleNumberChange',
    value: function handleNumberChange(e) {
      var _props2 = this.props,
          axisConfig = _props2.axisConfig,
          isMin = _props2.isMin,
          onAxisConfigScaleRangeNumberUpdate = _props2.onAxisConfigScaleRangeNumberUpdate;
      var axisName = axisConfig.axisName,
          _axisConfig$scale2 = axisConfig.scale,
          scale = _axisConfig$scale2 === undefined ? 'linear' : _axisConfig$scale2;


      var rangeNumber = null;
      if (e.target.value) {
        var num = Number(e.target.value);
        rangeNumber = isNaN(num) || !isFinite(num) ? null : num;
      }

      onAxisConfigScaleRangeNumberUpdate(axisName, scale, isMin, rangeNumber);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          axisConfig = _props3.axisConfig,
          isMin = _props3.isMin;
      var _axisConfig$scale3 = axisConfig.scale,
          scale = _axisConfig$scale3 === undefined ? 'linear' : _axisConfig$scale3,
          _axisConfig$scaleRang = axisConfig.scaleRange,
          scaleRange = _axisConfig$scaleRang === undefined ? {} : _axisConfig$scaleRang;

      var rangeConfig = scaleRange[scale] || {};
      var _rangeConfig$rangeTyp = rangeConfig.rangeTypes,
          rangeTypes = _rangeConfig$rangeTyp === undefined ? [] : _rangeConfig$rangeTyp,
          _rangeConfig$range = rangeConfig.range,
          range = _rangeConfig$range === undefined ? [] : _rangeConfig$range;

      var rangeType = rangeTypes[isMin ? 0 : 1] || 'auto';
      var rangeNumber = range[isMin ? 0 : 1];
      var isNumberInvalid = rangeType === 'number' && (rangeNumber == null || rangeNumber === '');

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
        { onSubmit: function onSubmit(e) {
            e.preventDefault();
          } },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
          { tag: 'fieldset' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'legend',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'small',
              null,
              isMin ? 'Min' : 'Max'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form-row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
              { check: true, className: 'col-sm-3' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                { check: true },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
                  type: 'radio',
                  name: 'range-auto',
                  value: 'auto',
                  size: 'sm',
                  checked: rangeType === 'auto',
                  onChange: this.handleRangeTypeChange
                }),
                ' auto'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
              { check: true, className: 'col-sm-4' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                { check: true },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
                  type: 'radio',
                  name: 'range-data-min-or-max',
                  value: isMin ? 'dataMin' : 'dataMax',
                  size: 'sm',
                  checked: rangeType === (isMin ? 'dataMin' : 'dataMax'),
                  onChange: this.handleRangeTypeChange
                }),
                ' data ',
                isMin ? 'min' : 'max'
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
              { check: true, className: 'col-sm-5' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                { check: true },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
                  type: 'radio',
                  name: 'range-number',
                  value: 'number',
                  size: 'sm',
                  checked: rangeType === 'number',
                  onChange: this.handleRangeTypeChange
                }),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
                  className: isNumberInvalid ? 'is-invalid' : '',
                  type: 'number',
                  step: 'any',
                  name: 'range-number-value',
                  size: 'sm',
                  value: rangeNumber == null || rangeNumber === '' ? '' : rangeNumber,
                  disabled: rangeType !== 'number',
                  onChange: this.handleNumberChange
                })
              )
            )
          )
        )
      );
    }
  }]);

  return AxisRangeConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AxisRangeConfigurator.propTypes = {
  axisConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    scale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    scaleRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      rangeTypes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
      range: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number)
    }))
  }).isRequired,
  isMin: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

AxisRangeConfigurator.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (AxisRangeConfigurator);

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LineConfigurator__ = __webpack_require__(842);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var defaultLine = {
  config: {
    color: '#ABCDEF',
    isVisible: true
  }
};

var checkErrors = function checkErrors() {
  var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultLine;
  var isNewLine = arguments[1];
  var targetLineKey = arguments[2];
  var lines = arguments[3];

  var hasSameLine = isNewLine ? lines.some(function (l) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(l) === Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line);
  }) : targetLineKey !== Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line) && lines.some(function (l) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(l) === Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line);
  });

  return {
    resultIdNone: !Number.isInteger(line.resultId),
    logKeyNone: !line.logKey,
    hasSameLine: hasSameLine
  };
};

var hasError = function hasError() {
  var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var resultIdNone = errors.resultIdNone,
      logKeyNone = errors.logKeyNone,
      hasSameLine = errors.hasSameLine;

  return resultIdNone || logKeyNone || hasSameLine;
};

var LinesConfigurator = function (_React$Component) {
  _inherits(LinesConfigurator, _React$Component);

  function LinesConfigurator() {
    _classCallCheck(this, LinesConfigurator);

    var _this = _possibleConstructorReturn(this, (LinesConfigurator.__proto__ || Object.getPrototypeOf(LinesConfigurator)).call(this));

    _this.handleModalToggle = _this.handleModalToggle.bind(_this);
    _this.handleModalOpen = _this.handleModalOpen.bind(_this);
    _this.handleModalClose = _this.handleModalClose.bind(_this);
    _this.handleEditingLineChange = _this.handleEditingLineChange.bind(_this);
    _this.handleAxisConfigLineAdd = _this.handleAxisConfigLineAdd.bind(_this);
    _this.handleAxisConfigLineRemove = _this.handleAxisConfigLineRemove.bind(_this);
    _this.handleLineVisibilityUpdate = _this.handleLineVisibilityUpdate.bind(_this);

    _this.state = {
      showModal: false,
      showError: false,
      editingLine: defaultLine,
      isNewLine: true
    };
    return _this;
  }

  _createClass(LinesConfigurator, [{
    key: 'handleModalToggle',
    value: function handleModalToggle() {
      if (this.state.showModal) {
        this.handleModalClose();
      } else {
        this.handleModalOpen();
      }
    }
  }, {
    key: 'handleModalOpen',
    value: function handleModalOpen() {
      var line = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultLine;

      this.setState({
        showModal: true,
        showError: false,
        targetLineKey: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line),
        editingLine: line,
        isNewLine: line === defaultLine,
        errors: {}
      });
    }
  }, {
    key: 'handleModalClose',
    value: function handleModalClose() {
      this.setState({
        showModal: false
      });
    }
  }, {
    key: 'handleEditingLineChange',
    value: function handleEditingLineChange(newLine) {
      var lines = this.props.lines;
      var _state = this.state,
          isNewLine = _state.isNewLine,
          targetLineKey = _state.targetLineKey;

      var errors = checkErrors(newLine, isNewLine, targetLineKey, lines);

      this.setState({
        editingLine: newLine,
        errors: errors
      });
    }
  }, {
    key: 'handleAxisConfigLineAdd',
    value: function handleAxisConfigLineAdd() {
      var _props = this.props,
          axisName = _props.axisName,
          onAxisConfigLineAdd = _props.onAxisConfigLineAdd,
          onAxisConfigLineUpdate = _props.onAxisConfigLineUpdate,
          lines = _props.lines;
      var _state2 = this.state,
          targetLineKey = _state2.targetLineKey,
          editingLine = _state2.editingLine,
          isNewLine = _state2.isNewLine;

      var errors = checkErrors(editingLine, isNewLine, targetLineKey, lines);

      if (hasError(errors)) {
        this.setState({ showError: true, errors: errors });
      } else {
        if (isNewLine) {
          onAxisConfigLineAdd(axisName, editingLine);
        } else {
          onAxisConfigLineUpdate(axisName, targetLineKey, editingLine);
        }
        this.handleModalClose();
      }
    }
  }, {
    key: 'handleAxisConfigLineRemove',
    value: function handleAxisConfigLineRemove(lineKey) {
      var _props2 = this.props,
          axisName = _props2.axisName,
          onAxisConfigLineRemove = _props2.onAxisConfigLineRemove;

      onAxisConfigLineRemove(axisName, lineKey);
    }
  }, {
    key: 'handleLineVisibilityUpdate',
    value: function handleLineVisibilityUpdate(targetLineKey, line) {
      var _props3 = this.props,
          axisName = _props3.axisName,
          onAxisConfigLineUpdate = _props3.onAxisConfigLineUpdate;

      onAxisConfigLineUpdate(axisName, targetLineKey, line);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          results = _props4.results,
          _props4$lines = _props4.lines,
          lines = _props4$lines === undefined ? [] : _props4$lines;
      var _state3 = this.state,
          editingLine = _state3.editingLine,
          isNewLine = _state3.isNewLine,
          errors = _state3.errors,
          showError = _state3.showError;


      var lineConfiguratorElems = lines.map(function (line) {
        var result = results[line.resultId] || {};

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__["a" /* default */], {
          line: line,
          result: result,
          onEditClick: _this2.handleModalOpen,
          onRemove: _this2.handleAxisConfigLineRemove,
          onVisibilityUpdate: _this2.handleLineVisibilityUpdate,
          key: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line)
        });
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'list-group list-group-flush' },
        lineConfiguratorElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'list-group-item text-right' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
            { color: 'primary', onClick: this.handleModalToggle },
            'Add'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Modal"],
            { isOpen: this.state.showModal, toggle: this.handleModalToggle, className: '' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalHeader"],
              { toggle: this.handleModalToggle },
              isNewLine ? 'Add a line' : 'Edit a line'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalBody"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__LineConfigurator__["a" /* default */], {
                results: results,
                line: editingLine,
                errors: showError ? errors : {},
                onChange: this.handleEditingLineChange
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalFooter"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
                { color: 'secondary', onClick: this.handleModalToggle },
                'Cancel'
              ),
              ' ',
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
                {
                  color: 'primary',
                  onClick: this.handleAxisConfigLineAdd,
                  disabled: hasError(showError ? errors : {})
                },
                isNewLine ? 'Add' : 'Save'
              )
            )
          )
        )
      );
    }
  }]);

  return LinesConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LinesConfigurator.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  lines: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })),
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

LinesConfigurator.defaultProps = {
  lines: []
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfigurator);

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(69);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var LinesConfiguratorRow = function (_React$Component) {
  _inherits(LinesConfiguratorRow, _React$Component);

  function LinesConfiguratorRow(props) {
    _classCallCheck(this, LinesConfiguratorRow);

    var _this = _possibleConstructorReturn(this, (LinesConfiguratorRow.__proto__ || Object.getPrototypeOf(LinesConfiguratorRow)).call(this, props));

    _this.handleEditClick = _this.handleEditClick.bind(_this);
    _this.handleRemoveClick = _this.handleRemoveClick.bind(_this);
    _this.handleLineVisibilityUpdate = _this.handleLineVisibilityUpdate.bind(_this);
    return _this;
  }

  _createClass(LinesConfiguratorRow, [{
    key: 'handleEditClick',
    value: function handleEditClick(e) {
      var _props = this.props,
          line = _props.line,
          onEditClick = _props.onEditClick;


      e.preventDefault();
      e.stopPropagation();
      onEditClick(line);
    }
  }, {
    key: 'handleRemoveClick',
    value: function handleRemoveClick(e) {
      var _props2 = this.props,
          line = _props2.line,
          onRemove = _props2.onRemove;


      e.preventDefault();
      e.stopPropagation();
      onRemove(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line));
    }
  }, {
    key: 'handleLineVisibilityUpdate',
    value: function handleLineVisibilityUpdate(e) {
      var _props3 = this.props,
          line = _props3.line,
          onVisibilityUpdate = _props3.onVisibilityUpdate;
      var config = line.config;
      var checked = e.target.checked;


      onVisibilityUpdate(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line), _extends({}, line, {
        config: _extends({}, config, {
          isVisible: checked
        })
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          line = _props4.line,
          result = _props4.result;
      var _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;
      var color = config.color,
          isVisible = config.isVisible;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: 'list-group-item',
          key: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* line2key */])(line),
          style: { borderLeft: '3px solid ' + color }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Row"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            { xs: '2' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
                { check: true },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                  { check: true },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
                    type: 'checkbox',
                    defaultChecked: isVisible,
                    onChange: this.handleLineVisibilityUpdate
                  }),
                  ' '
                )
              )
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              {
                size: 'sm',
                color: 'link',
                className: 'm-0 p-0',
                onClick: this.handleEditClick
              },
              'edit'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            null,
            Object(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* displayName */])(result)
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            null,
            line.logKey
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            { xs: '1' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'button',
              {
                type: 'button',
                className: 'close',
                'aria-label': 'Close',
                onClick: this.handleRemoveClick
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'span',
                { 'aria-hidden': 'true' },
                '\xD7'
              )
            )
          )
        )
      );
    }
  }]);

  return LinesConfiguratorRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LinesConfiguratorRow.propTypes = {
  line: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      isVisible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
    })
  }).isRequired,
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  onEditClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  onVisibilityUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LinesConfiguratorRow.defaultProps = {
  onEditClick: function onEditClick() {},
  onRemove: function onRemove() {},
  onVisibilityUpdate: function onVisibilityUpdate() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfiguratorRow);

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(69);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







var RESULT_NONE = -1;
var LOG_KEY_NONE = '';

var getLogKeys = function getLogKeys() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _result$logs = result.logs,
      logs = _result$logs === undefined ? [] : _result$logs;

  var logKeySet = {};
  logs.forEach(function (log) {
    var _log$logItems = log.logItems,
        logItems = _log$logItems === undefined ? [] : _log$logItems;

    logItems.forEach(function (logItem) {
      logKeySet[logItem.key] = true;
    });
  });
  return Object.keys(logKeySet);
};

var createResultOptionElems = function createResultOptionElems() {
  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'option',
    { value: RESULT_NONE, key: RESULT_NONE, disabled: true },
    '-- select result --'
  )].concat(_toConsumableArray(Object.keys(results).map(function (resultId) {
    var result = results[resultId];
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: result.id, key: result.id },
      result.id,
      ': ',
      Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* displayName */])(result)
    );
  })));
};

var createLogKeyOptionElems = function createLogKeyOptionElems() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var logKeys = getLogKeys(result);
  return [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'option',
    { value: LOG_KEY_NONE, key: LOG_KEY_NONE, disabled: true },
    '-- select log key --'
  )].concat(_toConsumableArray(logKeys.map(function (logKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: logKey, key: logKey },
      logKey
    );
  })));
};

var LineConfigurator = function (_React$Component) {
  _inherits(LineConfigurator, _React$Component);

  function LineConfigurator() {
    _classCallCheck(this, LineConfigurator);

    var _this = _possibleConstructorReturn(this, (LineConfigurator.__proto__ || Object.getPrototypeOf(LineConfigurator)).call(this));

    _this.handleResultChange = _this.handleResultChange.bind(_this);
    _this.handleLogKeyChange = _this.handleLogKeyChange.bind(_this);
    _this.handleLineColorChange = _this.handleLineColorChange.bind(_this);
    _this.handleVisibilityChange = _this.handleVisibilityChange.bind(_this);
    _this.togglePicker = _this.togglePicker.bind(_this);

    _this.state = { colorPickerCollapse: false };
    return _this;
  }

  _createClass(LineConfigurator, [{
    key: 'togglePicker',
    value: function togglePicker() {
      this.setState({ colorPickerCollapse: !this.state.colorPickerCollapse });
    }
  }, {
    key: 'handleResultChange',
    value: function handleResultChange(e) {
      var _props = this.props,
          line = _props.line,
          onChange = _props.onChange;

      var newResultId = parseInt(e.target.value, 10);
      onChange(_extends({}, line, { resultId: newResultId }));
    }
  }, {
    key: 'handleLogKeyChange',
    value: function handleLogKeyChange(e) {
      var _props2 = this.props,
          line = _props2.line,
          onChange = _props2.onChange;

      var newLogKey = e.target.value;
      onChange(_extends({}, line, { logKey: newLogKey }));
    }
  }, {
    key: 'handleLineColorChange',
    value: function handleLineColorChange(e) {
      var _props3 = this.props,
          line = _props3.line,
          onChange = _props3.onChange;
      var config = line.config;
      var hex = e.hex;

      onChange(_extends({}, line, {
        config: _extends({}, config, {
          color: hex
        })
      }));
    }
  }, {
    key: 'handleVisibilityChange',
    value: function handleVisibilityChange(e) {
      var _props4 = this.props,
          line = _props4.line,
          onChange = _props4.onChange;
      var checked = e.target.checked;
      var config = line.config;

      onChange(_extends({}, line, {
        config: _extends({}, config, {
          isVisible: checked
        })
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props,
          results = _props5.results,
          _props5$line = _props5.line,
          line = _props5$line === undefined ? {} : _props5$line,
          _props5$errors = _props5.errors,
          errors = _props5$errors === undefined ? {} : _props5$errors;
      var _line$resultId = line.resultId,
          resultId = _line$resultId === undefined ? RESULT_NONE : _line$resultId,
          _line$logKey = line.logKey,
          logKey = _line$logKey === undefined ? LOG_KEY_NONE : _line$logKey,
          _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;

      var result = results[resultId] || {};
      var color = config.color,
          isVisible = config.isVisible;


      var colorBlockStyle = {
        backgroundColor: color
      };

      var resultOptionElems = createResultOptionElems(results);
      var logKeyOptionElems = createLogKeyOptionElems(result);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'line-configurator' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Form"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
              null,
              'color'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { style: colorBlockStyle },
              color
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Collapse"],
              { isOpen: this.state.colorPickerCollapse },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_color__["ChromePicker"], {
                color: color,
                disableAlpha: true,
                onChange: this.handleLineColorChange
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Collapse"],
              { isOpen: !this.state.colorPickerCollapse },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_color__["SwatchesPicker"], {
                color: color,
                width: 470,
                onChange: this.handleLineColorChange
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { onClick: this.togglePicker, size: 'sm', className: 'my-2' },
              'Toggle color picker'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
              { 'for': 'line-configurator-result-select' },
              'result'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"],
              {
                className: 'form-control' + (errors.resultIdNone ? ' is-invalid' : ''),
                type: 'select',
                name: 'select',
                id: 'line-configurator-result-select',
                value: resultId,
                onChange: this.handleResultChange
              },
              resultOptionElems
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'invalid-feedback' },
              'Select a result!!'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
              { 'for': 'line-configurator-log-key-select' },
              'log key'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('br', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"],
              {
                className: 'form-control' + (errors.logKeyNone ? ' is-invalid' : ''),
                type: 'select',
                name: 'select',
                id: 'line-configurator-log-key-select',
                value: logKey,
                disabled: resultId === RESULT_NONE,
                onChange: this.handleLogKeyChange
              },
              logKeyOptionElems
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'invalid-feedback' },
              'Select a log key!!'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Row"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                { 'for': 'line-configurator-select-visibility', sm: { size: 2 } },
                'visibility'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
                { sm: { size: 10 } },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
                  { check: true },
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
                    { check: true },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
                      type: 'checkbox',
                      id: 'line-configurator-select-visibility',
                      defaultChecked: isVisible,
                      onChange: this.handleVisibilityChange
                    }),
                    ' '
                  )
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormGroup"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
              className: 'form-control' + (errors.hasSameLine ? ' is-invalid' : ''),
              hidden: true
            }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'invalid-feedback' },
              'Cannot add this line because it already exists.'
            )
          )
        )
      );
    }
  }]);

  return LineConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LineConfigurator.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  line: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      isVisible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
    })
  }),
  errors: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultIdNone: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    logKeyNone: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
    hasSameLine: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
  }),
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LineConfigurator.defaultProps = {
  line: {},
  errors: {},
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LineConfigurator);

/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var keyOptions = ['epoch', 'iteration', 'elapsed_time'];

var XAxisKeySelector = function XAxisKeySelector(props) {
  var value = props.value,
      onChange = props.onChange;

  var handleChangeXAxisKey = function handleChangeXAxisKey(e) {
    onChange(e.target.value);
  };

  var options = keyOptions.map(function (key) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: key, key: key },
      key
    );
  });
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'select',
    { id: 'x-axis-key-selector-select', className: 'form-control', value: value, onChange: handleChangeXAxisKey },
    options
  );
};

XAxisKeySelector.propTypes = {
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

XAxisKeySelector.defaultProps = {
  value: '',
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (XAxisKeySelector);

/***/ })

},[422]);