webpackJsonp([0],{

/***/ 171:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware_api__ = __webpack_require__(287);
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

/***/ 287:
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

/***/ 288:
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

/***/ 428:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(429);


/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_configureStore__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__ = __webpack_require__(567);







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

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middleware_api__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers__ = __webpack_require__(563);







var configureStore = function configureStore(preloadedState) {
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_4__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3_redux_logger__["createLogger"])()];

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_5__reducers__["a" /* default */], preloadedState, __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(undefined, middleware));

  Object(__WEBPACK_IMPORTED_MODULE_2_redux_persist__["persistStore"])(store);

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(288);
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

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createWebStorage = __webpack_require__(565);

var _createWebStorage2 = _interopRequireDefault(_createWebStorage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = (0, _createWebStorage2.default)('local');

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createWebStorage;

var _getStorage = __webpack_require__(566);

var _getStorage2 = _interopRequireDefault(_getStorage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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
    if (true) console.warn('redux-persist ' + storageType + ' test failed, persistence will be disabled.');
    return false;
  }
  return true;
}

function getStorage(type) {
  var storageType = type + 'Storage';
  if (hasStorage(storageType)) return window[storageType];else {
    if (true) {
      console.error('redux-persist failed to create sync storage. falling back to memory storage.');
    }
    return noopStorage;
  }
}

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_ExperimentsTable__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_LogVisualizer__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_NavigationBar__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_SideBar__ = __webpack_require__(849);
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

/***/ 580:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(581);




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

/***/ 581:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(71);
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
            placeholder: result.pathName,
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

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(71);
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

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return line2key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return line2name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return line2dataKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return displayName; });
/* unused harmony export truncate */
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

/***/ 846:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ResultsFetchState__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(288);
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

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(171);




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

/***/ 849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxesConfigurator__ = __webpack_require__(850);




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

/***/ 850:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisConfigurator__ = __webpack_require__(851);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__ = __webpack_require__(854);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__XAxisKeySelector__ = __webpack_require__(939);






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

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AxisScaleSelector__ = __webpack_require__(852);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AxisRangeConfigurator__ = __webpack_require__(853);
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

/***/ 852:
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

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
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

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LineConfigurator__ = __webpack_require__(856);
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

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(71);
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

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(71);
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

/***/ 939:
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

},[428]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWlkZGxld2FyZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3NyYy9zdG9yZS9jb25maWd1cmVTdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvaW5kZXguanN4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC1wZXJzaXN0L2VzL3N0b3JhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9jcmVhdGVXZWJTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWR1eC1wZXJzaXN0L2VzL3N0b3JhZ2UvZ2V0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9DaGFpbmVyVUlDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Jlc3VsdFJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTG9nVmlzdWFsaXplci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYy1zbGlkZXIvYXNzZXRzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uQmFyLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZXN1bHRzRmV0Y2hTdGF0ZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvU2lkZUJhci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhlc0NvbmZpZ3VyYXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhpc0NvbmZpZ3VyYXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhpc1NjYWxlU2VsZWN0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0F4aXNSYW5nZUNvbmZpZ3VyYXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGluZXNDb25maWd1cmF0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xpbmVzQ29uZmlndXJhdG9yUm93LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9MaW5lQ29uZmlndXJhdG9yLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9YQXhpc0tleVNlbGVjdG9yLmpzeCJdLCJuYW1lcyI6WyJSRVNVTFRTX1JFUVVFU1QiLCJSRVNVTFRTX1NVQ0NFU1MiLCJSRVNVTFRTX0ZBSUxVRSIsIlJFU1VMVF9VUERBVEVfUkVRVUVTVCIsIlJFU1VMVF9VUERBVEVfU1VDQ0VTUyIsIlJFU1VMVF9VUERBVEVfRkFJTFVFIiwiUkVTVUxUX0RFTEVURV9SRVFVRVNUIiwiUkVTVUxUX0RFTEVURV9TVUNDRVNTIiwiUkVTVUxUX0RFTEVURV9GQUlMVUUiLCJmZXRjaFJlc3VsdHMiLCJ0eXBlcyIsImVuZHBvaW50IiwibG9hZFJlc3VsdHMiLCJkaXNwYXRjaCIsInVwZGF0ZVJlc3VsdCIsInJlc3VsdCIsImlkIiwibmFtZSIsIk51bWJlciIsImlzSW50ZWdlciIsIkVycm9yIiwibWV0aG9kIiwiYm9keSIsImRlbGV0ZVJlc3VsdCIsInJlc3VsdElkIiwiQVhJU19DT05GSUdfTElORV9BREQiLCJBWElTX0NPTkZJR19MSU5FX1VQREFURSIsIkFYSVNfQ09ORklHX0xJTkVfUkVNT1ZFIiwiQVhJU19DT05GSUdfU0NBTEVfVVBEQVRFIiwiQVhJU19DT05GSUdfWF9LRVlfVVBEQVRFIiwiQVhJU19DT05GSUdfU0NBTEVfUkFOR0VfVFlQRV9VUERBVEUiLCJBWElTX0NPTkZJR19TQ0FMRV9SQU5HRV9OVU1CRVJfVVBEQVRFIiwiYWRkTGluZVRvQXhpcyIsImF4aXNOYW1lIiwibGluZSIsInR5cGUiLCJ1cGRhdGVMaW5lSW5BeGlzIiwibGluZUtleSIsInJlbW92ZUxpbmVGcm9tQXhpcyIsInVwZGF0ZUF4aXNTY2FsZSIsInNjYWxlIiwidXBkYXRlWEF4aXNLZXkiLCJ4QXhpc0tleSIsInVwZGF0ZUF4aXNTY2FsZVJhbmdlVHlwZSIsImlzTWluIiwicmFuZ2VUeXBlIiwidXBkYXRlQXhpc1NjYWxlUmFuZ2VOdW1iZXIiLCJyYW5nZU51bWJlciIsIkdMT0JBTF9DT05GSUdfUE9MTElOR19SQVRFX1VQREFURSIsIkdMT0JBTF9DT05GSUdfQ0hBUlRfU0laRV9VUERBVEUiLCJ1cGRhdGVHbG9iYWxQb2xsaW5nUmF0ZSIsInBvbGxpbmdSYXRlIiwidXBkYXRlR2xvYmFsQ2hhcnRTaXplIiwiY2hhcnRTaXplIiwiQVBJX1JPT1QiLCJjYWxsQXBpIiwiZnVsbFVybCIsImluZGV4T2YiLCJvcHRpb25zIiwiaGVhZGVycyIsIkpTT04iLCJzdHJpbmdpZnkiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJvayIsIlByb21pc2UiLCJyZWplY3QiLCJDQUxMX0FQSSIsInN0b3JlIiwibmV4dCIsImFjdGlvbiIsImNhbGxBUEkiLCJnZXRTdGF0ZSIsIkFycmF5IiwiaXNBcnJheSIsImxlbmd0aCIsImFjdGlvbldpdGgiLCJkYXRhIiwiZmluYWxBY3Rpb24iLCJyZXF1ZXN0VHlwZSIsInN1Y2Nlc3NUeXBlIiwiZmFpbHVyZVR5cGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJjaGFydFNpemVPcHRpb25zIiwid2lkdGgiLCJoZWlnaHQiLCJhc3BlY3QiLCJwb2xsaW5nT3B0aW9ucyIsInZhbHVlIiwiY29uZmlndXJlU3RvcmUiLCJyZW5kZXIiLCJDb21wb25lbnQiLCJhcHBOb2RlIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsIkNoYWluZXJVSUNvbnRhaW5lciIsIm1vZHVsZSIsImhvdCIsImFjY2VwdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRFbGVtZW50QnlJZCIsInByZWxvYWRlZFN0YXRlIiwibWlkZGxld2FyZSIsImNyZWF0ZUxvZ2dlciIsImNyZWF0ZVN0b3JlIiwiYXBwbHlNaWRkbGV3YXJlIiwicGVyc2lzdFN0b3JlIiwiZW50aXRpZXMiLCJzdGF0ZSIsInJlc3VsdHMiLCJyZXN1bHRzTGlzdCIsImZvckVhY2giLCJuZXdSZXN1bHRzIiwiZmV0Y2hTdGF0ZSIsImF4ZXNTdGF0ZVdpdGhvdXRSZXN1bHQiLCJuZXdTdGF0ZSIsIk9iamVjdCIsImtleXMiLCJheGlzQ29uZmlnIiwibGluZXMiLCJmaWx0ZXIiLCJheGVzIiwic2NhbGVSYW5nZSIsImlkeCIsInJhbmdlQ29uZmlnIiwicmFuZ2VUeXBlcyIsInJhbmdlIiwiaSIsImxpbmUya2V5IiwiYXNzaWduIiwibCIsImRlZmF1bHRHbG9iYVN0YXRlIiwiZ2xvYmFsIiwiY29uZmlnIiwiY29tYmluZVJlZHVjZXJzIiwicm9vdFJlZHVjZXIiLCJwZXJzaXN0UmVkdWNlciIsImtleSIsInN0b3JhZ2UiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJfY3JlYXRlV2ViU3RvcmFnZSIsInJlcXVpcmUiLCJfY3JlYXRlV2ViU3RvcmFnZTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJjcmVhdGVXZWJTdG9yYWdlIiwiX2dldFN0b3JhZ2UiLCJfZ2V0U3RvcmFnZTIiLCJnZXRJdGVtIiwiY2IiLCJzZXRJdGVtIiwiaXRlbSIsImVyciIsInJlbW92ZUl0ZW0iLCJnZXRBbGxLZXlzIiwiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJnZXRTdG9yYWdlIiwibm9vcCIsIm5vb3BTdG9yYWdlIiwiaGFzU3RvcmFnZSIsInN0b3JhZ2VUeXBlIiwid2luZG93IiwidGVzdEtleSIsImUiLCJjb25zb2xlIiwid2FybiIsInJlc3VsdHNQb2xsaW5nVGltZXIiLCJzdGFydFJlc3VsdHNQb2xsaW5nIiwiZnVuYyIsInNldEludGVydmFsIiwic3RvcFBvbGxpbmciLCJ0aW1lciIsImNsZWFySW50ZXJ2YWwiLCJwcm9wcyIsIm5leHRQcm9wcyIsImN1cnJlbnRQb2xsaW5nUmF0ZSIsIm5leHRQb2xsaW5nUmF0ZSIsInN0YXRzIiwiUmVhY3QiLCJtYXBFbnRpdGllc1RvU3RhdHMiLCJhcmdLZXlTZXQiLCJhcmdzIiwiYXJnIiwiYXJnS2V5cyIsInhBeGlzIiwieUxlZnRBeGlzIiwieVJpZ2h0QXhpcyIsImRlZmF1bHRDb25maWciLCJtYXBTdGF0ZVRvUHJvcHMiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJvYmplY3RPZiIsImFueSIsImlzUmVxdWlyZWQiLCJzaGFwZSIsInN0cmluZyIsImFycmF5T2YiLCJjb25uZWN0IiwiRXhwZXJpbWVudHNUYWJsZSIsIm9uUmVzdWx0VXBkYXRlIiwib25SZXN1bHREZWxldGUiLCJhcmdIZWFkZXJFbGVtcyIsIm1hcCIsImFyZ0tleSIsInJlc3VsdFJvd0VsZW1zIiwibnVtYmVyIiwicGF0aE5hbWUiLCJsb2dzIiwiZGVmYXVsdFByb3BzIiwiZW1wdHlTdHIiLCJSZXN1bHRSb3ciLCJoYW5kbGVSZXN1bHROYW1lQ2hhbmdlIiwiYmluZCIsImhhbmRsZVJlc3VsdE5hbWVLZXlQcmVzcyIsImhhbmRsZVJlc3VsdFVwZGF0ZSIsImhhbmRsZVVud2F0Y2giLCJ0b2dnbGVVbndhdGNoTW9kYWwiLCJyZXN1bHROYW1lIiwic2V0U3RhdGUiLCJ0YXJnZXQiLCJzaG93VW53YXRjaE1vZGFsIiwibGFzdExvZyIsImxvZ0l0ZW1zIiwibGFzdExvZ0RpY3QiLCJsb2dJdGVtIiwiYXJnRGljdCIsImFyZ0VsZW1zIiwiY29udGVudCIsIlN0cmluZyIsImVwb2NoIiwiaXRlcmF0aW9uIiwiZWxhcHNlZF90aW1lIiwiZGlzcGxheU5hbWUiLCJnZXREb21haW4iLCJkb21haW4iLCJidWlsZExpbmVFbGVtIiwibGluZTJuYW1lIiwibGluZTJkYXRhS2V5IiwiY29sb3IiLCJidWlsZExpbmVFbGVtcyIsInZpc2libGVMaW5lcyIsImlzVmlzaWJsZSIsIkxvZ1Zpc3VhbGl6ZXIiLCJsZWZ0TGluZXMiLCJyaWdodExpbmVzIiwiYXhpc0xpbmVzIiwiZGF0YURpY3QiLCJsb2dLZXkiLCJsb2ciLCJsb2dEaWN0IiwibGluZUVsZW1zIiwib25lT2ZUeXBlIiwidHJ1bmNhdGUiLCJyZXN0U3RyIiwiZm9yd2FyZCIsInN0ciIsImNoYXJzIiwic2xpY2UiLCJqb2luIiwiY3JlYXRlUG9sbGluZ09wdGlvbkVsZW1zIiwib3B0aW9uIiwiY3JlYXRlVmlzdWFsaXplclNpemVPcHRpb25FbGVtcyIsIk5hdmlnYXRpb25CYXIiLCJ0b2dnbGVTZXR0aW5nUG9wb3ZlciIsImhhbmRsZUNoYW5nZVBvbGxpbmdSYXRlIiwiaGFuZGxlQ2hhbmdlQ2hhcnRTaXplIiwic2V0dGluZ1BvcG92ZXJPcGVuIiwib25HbG9iYWxDb25maWdQb2xsaW5nUmF0ZVVwZGF0ZSIsInNlbGVjdGVkSWQiLCJmaW5kIiwibyIsIm9uR2xvYmFsQ29uZmlnQ2hhcnRTaXplVXBkYXRlIiwicG9sbGluZ09wdGlvbkVsZW1zIiwiY2hhcnRTaXplRWxlbXMiLCJSZXN1bHRzRmV0Y2hTdGF0ZSIsInJlc3VsdHNGZXRjaFN0YXRlIiwiY29sb3JDbGFzcyIsIlNpZGVCYXIiLCJvbkF4aXNDb25maWdMaW5lQWRkIiwib25BeGlzQ29uZmlnTGluZVVwZGF0ZSIsIm9uQXhpc0NvbmZpZ0xpbmVSZW1vdmUiLCJvbkF4aXNDb25maWdTY2FsZVVwZGF0ZSIsIm9uQXhpc0NvbmZpZ1hLZXlVcGRhdGUiLCJvbkF4aXNDb25maWdTY2FsZVJhbmdlVHlwZVVwZGF0ZSIsIm9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGUiLCJBeGVzQ29uZmlndXJhdG9yIiwiQXhpc0NvbmZpZ3VyYXRvciIsImhhbmRsZUNoYW5nZVNjYWxlIiwidG9nZ2xlUmFuZ2VDb25maWciLCJzaG93UmFuZ2VDb25maWciLCJvbkNoYW5nZVNjYWxlIiwiY2hpbGRyZW4iLCJlbGVtZW50Iiwic2NhbGVPcHRpb25zIiwiQXhpc1NjYWxlU2VsZWN0b3IiLCJvbkNoYW5nZSIsImhhbmRsZUNoYW5nZUF4aXNLZXkiLCJzY2FsZUtleSIsIkF4aXNSYW5nZUNvbmZpZ3VyYXRvciIsImhhbmRsZVJhbmdlVHlwZUNoYW5nZSIsImhhbmRsZU51bWJlckNoYW5nZSIsIm51bSIsImlzTmFOIiwiaXNGaW5pdGUiLCJpc051bWJlckludmFsaWQiLCJwcmV2ZW50RGVmYXVsdCIsImJvb2wiLCJkZWZhdWx0TGluZSIsImNoZWNrRXJyb3JzIiwiaXNOZXdMaW5lIiwidGFyZ2V0TGluZUtleSIsImhhc1NhbWVMaW5lIiwic29tZSIsInJlc3VsdElkTm9uZSIsImxvZ0tleU5vbmUiLCJoYXNFcnJvciIsImVycm9ycyIsIkxpbmVzQ29uZmlndXJhdG9yIiwiaGFuZGxlTW9kYWxUb2dnbGUiLCJoYW5kbGVNb2RhbE9wZW4iLCJoYW5kbGVNb2RhbENsb3NlIiwiaGFuZGxlRWRpdGluZ0xpbmVDaGFuZ2UiLCJoYW5kbGVBeGlzQ29uZmlnTGluZUFkZCIsImhhbmRsZUF4aXNDb25maWdMaW5lUmVtb3ZlIiwiaGFuZGxlTGluZVZpc2liaWxpdHlVcGRhdGUiLCJzaG93TW9kYWwiLCJzaG93RXJyb3IiLCJlZGl0aW5nTGluZSIsIm5ld0xpbmUiLCJsaW5lQ29uZmlndXJhdG9yRWxlbXMiLCJMaW5lc0NvbmZpZ3VyYXRvclJvdyIsImhhbmRsZUVkaXRDbGljayIsImhhbmRsZVJlbW92ZUNsaWNrIiwib25FZGl0Q2xpY2siLCJzdG9wUHJvcGFnYXRpb24iLCJvblJlbW92ZSIsIm9uVmlzaWJpbGl0eVVwZGF0ZSIsImNoZWNrZWQiLCJib3JkZXJMZWZ0IiwiUkVTVUxUX05PTkUiLCJMT0dfS0VZX05PTkUiLCJnZXRMb2dLZXlzIiwibG9nS2V5U2V0IiwiY3JlYXRlUmVzdWx0T3B0aW9uRWxlbXMiLCJjcmVhdGVMb2dLZXlPcHRpb25FbGVtcyIsImxvZ0tleXMiLCJMaW5lQ29uZmlndXJhdG9yIiwiaGFuZGxlUmVzdWx0Q2hhbmdlIiwiaGFuZGxlTG9nS2V5Q2hhbmdlIiwiaGFuZGxlTGluZUNvbG9yQ2hhbmdlIiwiaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSIsInRvZ2dsZVBpY2tlciIsImNvbG9yUGlja2VyQ29sbGFwc2UiLCJuZXdSZXN1bHRJZCIsInBhcnNlSW50IiwibmV3TG9nS2V5IiwiaGV4IiwiY29sb3JCbG9ja1N0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwicmVzdWx0T3B0aW9uRWxlbXMiLCJsb2dLZXlPcHRpb25FbGVtcyIsInNpemUiLCJrZXlPcHRpb25zIiwiWEF4aXNLZXlTZWxlY3RvciIsImhhbmRsZUNoYW5nZVhBeGlzS2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFHQTs7QUFFTyxJQUFNQSxrQkFBa0IsaUJBQXhCO0FBQ0EsSUFBTUMsa0JBQWtCLGlCQUF4QjtBQUNBLElBQU1DLGlCQUFpQixnQkFBdkI7QUFDQSxJQUFNQyx3QkFBd0IsdUJBQTlCO0FBQ0EsSUFBTUMsd0JBQXdCLHVCQUE5QjtBQUNBLElBQU1DLHVCQUF1QixzQkFBN0I7QUFDQSxJQUFNQyx3QkFBd0IsdUJBQTlCO0FBQ0EsSUFBTUMsd0JBQXdCLHVCQUE5QjtBQUNBLElBQU1DLHVCQUF1QixzQkFBN0I7O0FBRVAsSUFBTUMsZUFBZSxTQUFmQSxZQUFlO0FBQUEsNkJBQ2xCLGlFQURrQixFQUNQO0FBQ1ZDLFdBQU8sQ0FBQ1YsZUFBRCxFQUFrQkMsZUFBbEIsRUFBbUNDLGNBQW5DLENBREc7QUFFVlMsY0FBVTtBQUZBLEdBRE87QUFBQSxDQUFyQjs7QUFPTyxJQUFNQyxjQUFjLFNBQWRBLFdBQWM7QUFBQSxTQUFNLFVBQUNDLFFBQUQ7QUFBQSxXQUFjQSxTQUFTSixjQUFU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QWVvRSxnQkFBZixFIiwiZmlsZSI6ImNoYWluZXJfdWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDQUxMX0FQSSB9IGZyb20gJy4uL21pZGRsZXdhcmUvYXBpJztcblxuXG4vLyByZXN1bHRzIEFQSVxuXG5leHBvcnQgY29uc3QgUkVTVUxUU19SRVFVRVNUID0gJ1JFU1VMVFNfUkVRVUVTVCc7XG5leHBvcnQgY29uc3QgUkVTVUxUU19TVUNDRVNTID0gJ1JFU1VMVFNfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgUkVTVUxUU19GQUlMVUUgPSAnUkVTVUxUU19GQUlMVUUnO1xuZXhwb3J0IGNvbnN0IFJFU1VMVF9VUERBVEVfUkVRVUVTVCA9ICdSRVNVTFRfVVBEQVRFX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IFJFU1VMVF9VUERBVEVfU1VDQ0VTUyA9ICdSRVNVTFRfVVBEQVRFX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IFJFU1VMVF9VUERBVEVfRkFJTFVFID0gJ1JFU1VMVF9VUERBVEVfRkFJTFVFJztcbmV4cG9ydCBjb25zdCBSRVNVTFRfREVMRVRFX1JFUVVFU1QgPSAnUkVTVUxUX0RFTEVURV9SRVFVRVNUJztcbmV4cG9ydCBjb25zdCBSRVNVTFRfREVMRVRFX1NVQ0NFU1MgPSAnUkVTVUxUX0RFTEVURV9TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBSRVNVTFRfREVMRVRFX0ZBSUxVRSA9ICdSRVNVTFRfREVMRVRFX0ZBSUxVRSc7XG5cbmNvbnN0IGZldGNoUmVzdWx0cyA9ICgpID0+ICh7XG4gIFtDQUxMX0FQSV06IHtcbiAgICB0eXBlczogW1JFU1VMVFNfUkVRVUVTVCwgUkVTVUxUU19TVUNDRVNTLCBSRVNVTFRTX0ZBSUxVRV0sXG4gICAgZW5kcG9pbnQ6ICdyZXN1bHRzJ1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGxvYWRSZXN1bHRzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiBkaXNwYXRjaChmZXRjaFJlc3VsdHMoKSk7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVSZXN1bHQgPSAocmVzdWx0ID0ge30pID0+IHtcbiAgY29uc3QgeyBpZCwgbmFtZSB9ID0gcmVzdWx0O1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZXN1bHQgaWQgaXMgaW52YWxpZC4nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIFtDQUxMX0FQSV06IHtcbiAgICAgIHR5cGVzOiBbUkVTVUxUX1VQREFURV9SRVFVRVNULCBSRVNVTFRfVVBEQVRFX1NVQ0NFU1MsIFJFU1VMVF9VUERBVEVfRkFJTFVFXSxcbiAgICAgIGVuZHBvaW50OiBgcmVzdWx0cy8ke2lkfWAsXG4gICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgYm9keTogeyByZXN1bHQ6IHsgaWQsIG5hbWUgfSB9XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZVJlc3VsdCA9IChyZXN1bHRJZCkgPT4ge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIocmVzdWx0SWQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdSZXN1bHQgaWQgaXMgaW52YWxpZC4nKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIFtDQUxMX0FQSV06IHtcbiAgICAgIHR5cGVzOiBbUkVTVUxUX0RFTEVURV9SRVFVRVNULCBSRVNVTFRfREVMRVRFX1NVQ0NFU1MsIFJFU1VMVF9ERUxFVEVfRkFJTFVFXSxcbiAgICAgIGVuZHBvaW50OiBgcmVzdWx0cy8ke3Jlc3VsdElkfWAsXG4gICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgfVxuICB9O1xufTtcblxuXG4vLyBheGlzIGNvbmZpZ1xuXG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfTElORV9BREQgPSAnQVhJU19DT05GSUdfTElORV9BREQnO1xuZXhwb3J0IGNvbnN0IEFYSVNfQ09ORklHX0xJTkVfVVBEQVRFID0gJ0FYSVNfQ09ORklHX0xJTkVfVVBEQVRFJztcbmV4cG9ydCBjb25zdCBBWElTX0NPTkZJR19MSU5FX1JFTU9WRSA9ICdBWElTX0NPTkZJR19MSU5FX1JFTU9WRSc7XG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfU0NBTEVfVVBEQVRFID0gJ0FYSVNfQ09ORklHX1NDQUxFX1VQREFURSc7XG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfWF9LRVlfVVBEQVRFID0gJ0FYSVNfQ09ORklHX1hfS0VZX1VQREFURSc7XG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfU0NBTEVfUkFOR0VfVFlQRV9VUERBVEUgPSAnQVhJU19DT05GSUdfU0NBTEVfUkFOR0VfVFlQRV9VUERBVEUnO1xuZXhwb3J0IGNvbnN0IEFYSVNfQ09ORklHX1NDQUxFX1JBTkdFX05VTUJFUl9VUERBVEUgPSAnQVhJU19DT05GSUdfU0NBTEVfUkFOR0VfTlVNQkVSX1VQREFURSc7XG5cbmV4cG9ydCBjb25zdCBhZGRMaW5lVG9BeGlzID0gKGF4aXNOYW1lLCBsaW5lKSA9PiAoe1xuICB0eXBlOiBBWElTX0NPTkZJR19MSU5FX0FERCxcbiAgYXhpc05hbWUsXG4gIGxpbmVcbn0pO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlTGluZUluQXhpcyA9IChheGlzTmFtZSwgbGluZUtleSwgbGluZSkgPT4gKHtcbiAgdHlwZTogQVhJU19DT05GSUdfTElORV9VUERBVEUsXG4gIGF4aXNOYW1lLFxuICBsaW5lS2V5LFxuICBsaW5lXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUxpbmVGcm9tQXhpcyA9IChheGlzTmFtZSwgbGluZUtleSkgPT4gKHtcbiAgdHlwZTogQVhJU19DT05GSUdfTElORV9SRU1PVkUsXG4gIGF4aXNOYW1lLFxuICBsaW5lS2V5XG59KTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUF4aXNTY2FsZSA9IChheGlzTmFtZSwgc2NhbGUpID0+ICh7XG4gIHR5cGU6IEFYSVNfQ09ORklHX1NDQUxFX1VQREFURSxcbiAgYXhpc05hbWUsXG4gIHNjYWxlXG59KTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVhBeGlzS2V5ID0gKHhBeGlzS2V5KSA9PiAoe1xuICB0eXBlOiBBWElTX0NPTkZJR19YX0tFWV9VUERBVEUsXG4gIGF4aXNOYW1lOiAneEF4aXMnLFxuICB4QXhpc0tleVxufSk7XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVBeGlzU2NhbGVSYW5nZVR5cGUgPSAoYXhpc05hbWUsIHNjYWxlLCBpc01pbiwgcmFuZ2VUeXBlID0gJ2F1dG8nKSA9PiAoe1xuICB0eXBlOiBBWElTX0NPTkZJR19TQ0FMRV9SQU5HRV9UWVBFX1VQREFURSxcbiAgYXhpc05hbWUsXG4gIHNjYWxlLFxuICBpc01pbixcbiAgcmFuZ2VUeXBlXG59KTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUF4aXNTY2FsZVJhbmdlTnVtYmVyID0gKGF4aXNOYW1lLCBzY2FsZSwgaXNNaW4sIHJhbmdlTnVtYmVyKSA9PiAoe1xuICB0eXBlOiBBWElTX0NPTkZJR19TQ0FMRV9SQU5HRV9OVU1CRVJfVVBEQVRFLFxuICBheGlzTmFtZSxcbiAgc2NhbGUsXG4gIGlzTWluLFxuICByYW5nZU51bWJlclxufSk7XG5cblxuLy8gZ2xvYmFsIGNvbmZpZ1xuXG5leHBvcnQgY29uc3QgR0xPQkFMX0NPTkZJR19QT0xMSU5HX1JBVEVfVVBEQVRFID0gJ0dMT0JBTF9DT05GSUdfUE9MTElOR19SQVRFX1VQREFURSc7XG5leHBvcnQgY29uc3QgR0xPQkFMX0NPTkZJR19DSEFSVF9TSVpFX1VQREFURSA9ICdHTE9CQUxfQ09ORklHX0NIQVJUX1NJWkVfVVBEQVRFJztcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUdsb2JhbFBvbGxpbmdSYXRlID0gKHBvbGxpbmdSYXRlKSA9PiAoe1xuICB0eXBlOiBHTE9CQUxfQ09ORklHX1BPTExJTkdfUkFURV9VUERBVEUsXG4gIHBvbGxpbmdSYXRlXG59KTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZUdsb2JhbENoYXJ0U2l6ZSA9IChjaGFydFNpemUpID0+ICh7XG4gIHR5cGU6IEdMT0JBTF9DT05GSUdfQ0hBUlRfU0laRV9VUERBVEUsXG4gIGNoYXJ0U2l6ZVxufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWN0aW9ucy9pbmRleC5qcyIsImNvbnN0IEFQSV9ST09UID0gJy9hcGkvdjEvJztcblxuY29uc3QgY2FsbEFwaSA9IChlbmRwb2ludCwgbWV0aG9kID0gJ0dFVCcsIGJvZHkpID0+IHtcbiAgY29uc3QgZnVsbFVybCA9IChlbmRwb2ludC5pbmRleE9mKEFQSV9ST09UKSA9PT0gLTEpID8gQVBJX1JPT1QgKyBlbmRwb2ludCA6IGVuZHBvaW50O1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIG1ldGhvZCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfVxuICB9O1xuICBpZiAoYm9keSAhPT0gbnVsbCkge1xuICAgIG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGJvZHkpO1xuICB9XG5cbiAgcmV0dXJuIGZldGNoKGZ1bGxVcmwsIG9wdGlvbnMpXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PlxuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChqc29uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ganNvbjtcbiAgICAgIH0pXG4gICAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBDQUxMX0FQSSA9ICdDYWxsIEFQSSc7XG5cbmV4cG9ydCBkZWZhdWx0IChzdG9yZSkgPT4gKG5leHQpID0+IChhY3Rpb24pID0+IHtcbiAgY29uc3QgY2FsbEFQSSA9IGFjdGlvbltDQUxMX0FQSV07XG4gIGlmICh0eXBlb2YgY2FsbEFQSSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICB9XG5cbiAgbGV0IHsgZW5kcG9pbnQgfSA9IGNhbGxBUEk7XG4gIGNvbnN0IHsgdHlwZXMsIG1ldGhvZCwgYm9keSB9ID0gY2FsbEFQSTtcblxuICBpZiAodHlwZW9mIGVuZHBvaW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZW5kcG9pbnQgPSBlbmRwb2ludChzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheSh0eXBlcykgfHwgdHlwZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiB0aHJlZSBhY3Rpb24gdHlwZXMuJyk7XG4gIH1cblxuICBjb25zdCBhY3Rpb25XaXRoID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBmaW5hbEFjdGlvbiA9IHsgLi4uYWN0aW9uLCAuLi5kYXRhIH07XG4gICAgZGVsZXRlIGZpbmFsQWN0aW9uW0NBTExfQVBJXTtcbiAgICByZXR1cm4gZmluYWxBY3Rpb247XG4gIH07XG5cbiAgY29uc3QgW3JlcXVlc3RUeXBlLCBzdWNjZXNzVHlwZSwgZmFpbHVyZVR5cGVdID0gdHlwZXM7XG4gIG5leHQoYWN0aW9uV2l0aCh7IHR5cGU6IHJlcXVlc3RUeXBlIH0pKTtcblxuICByZXR1cm4gY2FsbEFwaShlbmRwb2ludCwgbWV0aG9kLCBib2R5KS50aGVuKFxuICAgIChyZXNwb25zZSkgPT4gbmV4dChhY3Rpb25XaXRoKHtcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgdHlwZTogc3VjY2Vzc1R5cGVcbiAgICB9KSksXG4gICAgKGVycm9yKSA9PiBuZXh0KGFjdGlvbldpdGgoe1xuICAgICAgdHlwZTogZmFpbHVyZVR5cGUsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCdcbiAgICB9KSlcbiAgKTtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taWRkbGV3YXJlL2FwaS5qcyIsIlxuZXhwb3J0IGNvbnN0IGNoYXJ0U2l6ZU9wdGlvbnMgPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBuYW1lOiAnNjQweDQ4MCcsXG4gICAgd2lkdGg6IDY0MCxcbiAgICBoZWlnaHQ6IDQ4MCxcbiAgICBhc3BlY3Q6IDEuMzMzXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnMTAyNHg3NjgnLFxuICAgIHdpZHRoOiAxMDI0LFxuICAgIGhlaWdodDogNzY4LFxuICAgIGFzcGVjdDogMS4zMzNcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIG5hbWU6ICcxMjgweDcyMCcsXG4gICAgd2lkdGg6IDEyODAsXG4gICAgaGVpZ2h0OiA3MjAsXG4gICAgYXNwZWN0OiAxLjc3OFxuICB9LFxuICB7XG4gICAgaWQ6IDQsXG4gICAgbmFtZTogJ2ZsdWlkKDE2OjkpJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGFzcGVjdDogMS43NzhcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IHBvbGxpbmdPcHRpb25zID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ3N0b3AnLFxuICAgIHZhbHVlOiAwXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBuYW1lOiAnNXMnLFxuICAgIHZhbHVlOiAoNSAqIDEwMDApXG4gIH0sXG4gIHtcbiAgICBpZDogMyxcbiAgICBuYW1lOiAnMTBzJyxcbiAgICB2YWx1ZTogKDEwICogMTAwMClcbiAgfSxcbiAge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6ICcxNXMnLFxuICAgIHZhbHVlOiAoMTUgKiAxMDAwKVxuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgbmFtZTogJzIwcycsXG4gICAgdmFsdWU6ICgyMCAqIDEwMDApXG4gIH1cbl07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2hhcnRTaXplT3B0aW9ucyxcbiAgcG9sbGluZ09wdGlvbnNcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29uc3RhbnRzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBBcHBDb250YWluZXIgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICcuL3N0b3JlL2NvbmZpZ3VyZVN0b3JlJztcbmltcG9ydCBDaGFpbmVyVUlDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lcic7XG5cblxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZSgpO1xuXG5jb25zdCByZW5kZXIgPSAoQ29tcG9uZW50LCBhcHBOb2RlKSA9PiB7XG4gIFJlYWN0RE9NLnJlbmRlcihcbiAgICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICAgIDxBcHBDb250YWluZXI+XG4gICAgICAgIDxDb21wb25lbnQgLz5cbiAgICAgIDwvQXBwQ29udGFpbmVyPlxuICAgIDwvUHJvdmlkZXI+LFxuICAgIGFwcE5vZGVcbiAgKTtcbn07XG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIGNvbnN0IGFwcE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhcHBOb2RlKTtcbiAgcmVuZGVyKENoYWluZXJVSUNvbnRhaW5lciwgYXBwTm9kZSk7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KCcuL2NvbnRhaW5lcnMvQ2hhaW5lclVJQ29udGFpbmVyJywgKCkgPT4geyByZW5kZXIoQ2hhaW5lclVJQ29udGFpbmVyLCBhcHBOb2RlKTsgfSk7XG59IGVsc2Uge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGFwcE5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhaW5lcl91aS1yb290Jyk7XG4gICAgaWYgKGFwcE5vZGUpIHtcbiAgICAgIHJlbmRlcihDaGFpbmVyVUlDb250YWluZXIsIGFwcE5vZGUpO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qc3giLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IHBlcnNpc3RTdG9yZSB9IGZyb20gJ3JlZHV4LXBlcnNpc3QnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJztcbmltcG9ydCBhcGkgZnJvbSAnLi4vbWlkZGxld2FyZS9hcGknO1xuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJy4uL3JlZHVjZXJzJztcblxuY29uc3QgY29uZmlndXJlU3RvcmUgPSAocHJlbG9hZGVkU3RhdGUpID0+IHtcbiAgY29uc3QgbWlkZGxld2FyZSA9IFt0aHVuaywgYXBpLCBjcmVhdGVMb2dnZXIoKV07XG5cbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICByb290UmVkdWNlcixcbiAgICBwcmVsb2FkZWRTdGF0ZSxcbiAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSlcbiAgKTtcblxuICBwZXJzaXN0U3RvcmUoc3RvcmUpO1xuXG4gIHJldHVybiBzdG9yZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ3VyZVN0b3JlO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc3RvcmUvY29uZmlndXJlU3RvcmUuanMiLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgeyBwZXJzaXN0UmVkdWNlciB9IGZyb20gJ3JlZHV4LXBlcnNpc3QnO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSAncmVkdXgtcGVyc2lzdC9lcy9zdG9yYWdlJztcbmltcG9ydCAqIGFzIEFjdGlvblR5cGVzIGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgbGluZTJrZXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBjaGFydFNpemVPcHRpb25zLCBwb2xsaW5nT3B0aW9ucyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cblxuY29uc3QgZW50aXRpZXMgPSAoc3RhdGUgPSB7IHJlc3VsdHM6IHt9IH0sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5SRVNVTFRTX1NVQ0NFU1M6XG4gICAgICBpZiAoYWN0aW9uLnJlc3BvbnNlICYmIGFjdGlvbi5yZXNwb25zZS5yZXN1bHRzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHNMaXN0ID0gYWN0aW9uLnJlc3BvbnNlLnJlc3VsdHM7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSB7fTtcbiAgICAgICAgcmVzdWx0c0xpc3QuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgcmVzdWx0c1tyZXN1bHQuaWRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHJlc3VsdHMgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICBjYXNlIEFjdGlvblR5cGVzLlJFU1VMVF9VUERBVEVfU1VDQ0VTUzpcbiAgICAgIGlmIChhY3Rpb24ucmVzcG9uc2UgJiYgYWN0aW9uLnJlc3BvbnNlLnJlc3VsdCkge1xuICAgICAgICBjb25zdCB7IHJlc3VsdCB9ID0gYWN0aW9uLnJlc3BvbnNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIHJlc3VsdHM6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLnJlc3VsdHMsXG4gICAgICAgICAgICBbcmVzdWx0LmlkXTogcmVzdWx0XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuUkVTVUxUX0RFTEVURV9TVUNDRVNTOlxuICAgICAgaWYgKGFjdGlvbi5yZXNwb25zZSAmJiBhY3Rpb24ucmVzcG9uc2UucmVzdWx0KSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdElkID0gYWN0aW9uLnJlc3BvbnNlLnJlc3VsdC5pZDtcbiAgICAgICAgY29uc3QgbmV3UmVzdWx0cyA9IHsgLi4uc3RhdGUucmVzdWx0cyB9O1xuICAgICAgICBkZWxldGUgbmV3UmVzdWx0c1tyZXN1bHRJZF07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgcmVzdWx0czogbmV3UmVzdWx0c1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmNvbnN0IGZldGNoU3RhdGUgPSAoc3RhdGUgPSB7IHJlc3VsdHM6ICcnIH0sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5SRVNVTFRTX1JFUVVFU1Q6XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5SRVNVTFRTX1NVQ0NFU1M6XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5SRVNVTFRTX0ZBSUxVRTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICByZXN1bHRzOiBhY3Rpb24udHlwZVxuICAgICAgfTtcbiAgICBjYXNlIEFjdGlvblR5cGVzLkdMT0JBTF9DT05GSUdfUE9MTElOR19SQVRFX1VQREFURTpcbiAgICAgIGlmIChhY3Rpb24ucG9sbGluZ1JhdGUgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICByZXN1bHRzOiAnJ1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cblxuY29uc3QgYXhlc1N0YXRlV2l0aG91dFJlc3VsdCA9IChzdGF0ZSwgcmVzdWx0SWQpID0+IHtcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHJlc3VsdElkKSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCBuZXdTdGF0ZSA9IHt9O1xuICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaCgoYXhpc05hbWUpID0+IHtcbiAgICBjb25zdCBheGlzQ29uZmlnID0gc3RhdGVbYXhpc05hbWVdO1xuICAgIGNvbnN0IHsgbGluZXMgPSBbXSB9ID0gYXhpc0NvbmZpZztcbiAgICBuZXdTdGF0ZVtheGlzTmFtZV0gPSB7XG4gICAgICAuLi5heGlzQ29uZmlnLFxuICAgICAgbGluZXM6IGxpbmVzLmZpbHRlcigobGluZSA9IHt9KSA9PiAoXG4gICAgICAgIGxpbmUucmVzdWx0SWQgIT0gbnVsbCAmJiBsaW5lLnJlc3VsdElkICE9PSByZXN1bHRJZFxuICAgICAgKSlcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIG5ld1N0YXRlO1xufTtcblxuY29uc3QgYXhlcyA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge1xuICAgIGF4aXNOYW1lLFxuICAgIGxpbmUsXG4gICAgbGluZUtleSxcbiAgICBzY2FsZSA9ICdsaW5lYXInLFxuICAgIHhBeGlzS2V5LFxuICAgIHJhbmdlVHlwZSA9ICdhdXRvJyxcbiAgICBpc01pbiwgcmFuZ2VOdW1iZXJcbiAgfSA9IGFjdGlvbjtcbiAgY29uc3QgYXhpc0NvbmZpZyA9IHN0YXRlW2F4aXNOYW1lXSB8fCB7IGF4aXNOYW1lIH07XG4gIGNvbnN0IHsgbGluZXMgPSBbXSwgc2NhbGVSYW5nZSA9IHt9IH0gPSBheGlzQ29uZmlnO1xuICBjb25zdCBpZHggPSBpc01pbiA/IDAgOiAxO1xuICBjb25zdCByYW5nZUNvbmZpZyA9IHNjYWxlUmFuZ2Vbc2NhbGVdIHx8IHt9O1xuICBjb25zdCB7IHJhbmdlVHlwZXMgPSBbXSwgcmFuZ2UgPSBbXSB9ID0gcmFuZ2VDb25maWc7XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuQVhJU19DT05GSUdfTElORV9BREQ6XG4gICAgICBpZiAobGluZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbYXhpc05hbWVdOiB7XG4gICAgICAgICAgLi4uYXhpc0NvbmZpZyxcbiAgICAgICAgICBsaW5lczogWy4uLmxpbmVzLCBsaW5lXVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuQVhJU19DT05GSUdfTElORV9VUERBVEU6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChsaW5lMmtleShsaW5lc1tpXSkgPT09IGxpbmVLZXkpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBbYXhpc05hbWVdOiB7XG4gICAgICAgICAgICAgIC4uLmF4aXNDb25maWcsXG4gICAgICAgICAgICAgIGxpbmVzOiBPYmplY3QuYXNzaWduKFtdLCBsaW5lcywgeyBbaV06IGxpbmUgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5BWElTX0NPTkZJR19MSU5FX1JFTU9WRTpcbiAgICAgIGlmIChsaW5lS2V5ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtheGlzTmFtZV06IHtcbiAgICAgICAgICAuLi5heGlzQ29uZmlnLFxuICAgICAgICAgIGxpbmVzOiBbLi4ubGluZXMuZmlsdGVyKChsKSA9PiBsaW5lMmtleShsKSAhPT0gbGluZUtleSldXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5BWElTX0NPTkZJR19TQ0FMRV9VUERBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2F4aXNOYW1lXToge1xuICAgICAgICAgIC4uLmF4aXNDb25maWcsXG4gICAgICAgICAgc2NhbGVcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICBjYXNlIEFjdGlvblR5cGVzLkFYSVNfQ09ORklHX1hfS0VZX1VQREFURTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbYXhpc05hbWVdOiB7XG4gICAgICAgICAgLi4uYXhpc0NvbmZpZyxcbiAgICAgICAgICB4QXhpc0tleVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuQVhJU19DT05GSUdfU0NBTEVfUkFOR0VfVFlQRV9VUERBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2F4aXNOYW1lXToge1xuICAgICAgICAgIC4uLmF4aXNDb25maWcsXG4gICAgICAgICAgc2NhbGVSYW5nZToge1xuICAgICAgICAgICAgLi4uc2NhbGVSYW5nZSxcbiAgICAgICAgICAgIFtzY2FsZV06IHtcbiAgICAgICAgICAgICAgcmFuZ2VUeXBlczogT2JqZWN0LmFzc2lnbihbXSwgcmFuZ2VUeXBlcywgeyBbaWR4XTogcmFuZ2VUeXBlIH0pLFxuICAgICAgICAgICAgICByYW5nZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICBjYXNlIEFjdGlvblR5cGVzLkFYSVNfQ09ORklHX1NDQUxFX1JBTkdFX05VTUJFUl9VUERBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2F4aXNOYW1lXToge1xuICAgICAgICAgIC4uLmF4aXNDb25maWcsXG4gICAgICAgICAgc2NhbGVSYW5nZToge1xuICAgICAgICAgICAgLi4uc2NhbGVSYW5nZSxcbiAgICAgICAgICAgIFtzY2FsZV06IHtcbiAgICAgICAgICAgICAgcmFuZ2VUeXBlcyxcbiAgICAgICAgICAgICAgcmFuZ2U6IE9iamVjdC5hc3NpZ24oW10sIHJhbmdlLCB7IFtpZHhdOiByYW5nZU51bWJlciB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICBjYXNlIEFjdGlvblR5cGVzLlJFU1VMVF9ERUxFVEVfU1VDQ0VTUzpcbiAgICAgIGlmIChhY3Rpb24ucmVzcG9uc2UgJiYgYWN0aW9uLnJlc3BvbnNlLnJlc3VsdCkge1xuICAgICAgICBjb25zdCByZXN1bHRJZCA9IGFjdGlvbi5yZXNwb25zZS5yZXN1bHQuaWQ7XG4gICAgICAgIHJldHVybiBheGVzU3RhdGVXaXRob3V0UmVzdWx0KHN0YXRlLCByZXN1bHRJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuY29uc3QgZGVmYXVsdEdsb2JhU3RhdGUgPSB7XG4gIHBvbGxpbmdSYXRlOiBwb2xsaW5nT3B0aW9uc1sxXS52YWx1ZSxcbiAgY2hhcnRTaXplOiBjaGFydFNpemVPcHRpb25zWzBdXG59O1xuXG5jb25zdCBnbG9iYWwgPSAoc3RhdGUgPSBkZWZhdWx0R2xvYmFTdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGNvbnN0IHsgcG9sbGluZ1JhdGUsIGNoYXJ0U2l6ZSB9ID0gYWN0aW9uO1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5HTE9CQUxfQ09ORklHX1BPTExJTkdfUkFURV9VUERBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcG9sbGluZ1JhdGVcbiAgICAgIH07XG5cbiAgICBjYXNlIEFjdGlvblR5cGVzLkdMT0JBTF9DT05GSUdfQ0hBUlRfU0laRV9VUERBVEU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgY2hhcnRTaXplXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGU7XG4gIH1cbn07XG5cbmNvbnN0IGNvbmZpZyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGF4ZXMsXG4gIGdsb2JhbFxufSk7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgZW50aXRpZXMsXG4gIGZldGNoU3RhdGUsXG4gIGNvbmZpZzogcGVyc2lzdFJlZHVjZXIoeyBrZXk6ICdjb25maWcnLCBzdG9yYWdlIH0sIGNvbmZpZylcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlZHVjZXJzL2luZGV4LmpzeCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVXZWJTdG9yYWdlID0gcmVxdWlyZSgnLi9jcmVhdGVXZWJTdG9yYWdlJyk7XG5cbnZhciBfY3JlYXRlV2ViU3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVXZWJTdG9yYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9jcmVhdGVXZWJTdG9yYWdlMi5kZWZhdWx0KSgnbG9jYWwnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgtcGVyc2lzdC9lcy9zdG9yYWdlL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlV2ViU3RvcmFnZTtcblxudmFyIF9nZXRTdG9yYWdlID0gcmVxdWlyZSgnLi9nZXRTdG9yYWdlJyk7XG5cbnZhciBfZ2V0U3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRTdG9yYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlV2ViU3RvcmFnZSh0eXBlKSB7XG4gIHZhciBzdG9yYWdlID0gKDAsIF9nZXRTdG9yYWdlMi5kZWZhdWx0KSh0eXBlKTtcbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtOiBmdW5jdGlvbiBnZXRJdGVtKGtleSwgY2IpIHtcbiAgICAgIHJldHVybiBjYihudWxsLCBzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgfSxcbiAgICBzZXRJdGVtOiBmdW5jdGlvbiBzZXRJdGVtKGtleSwgaXRlbSwgY2IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNiKG51bGwsIHN0b3JhZ2Uuc2V0SXRlbShrZXksIGl0ZW0pKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXksIGNiKSB7XG4gICAgICByZXR1cm4gY2IobnVsbCwgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSkpO1xuICAgIH0sXG4gICAgZ2V0QWxsS2V5czogZnVuY3Rpb24gZ2V0QWxsS2V5cyhjYikge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIE9iamVjdC5rZXlzKHN0b3JhZ2UpKTtcbiAgICB9XG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9jcmVhdGVXZWJTdG9yYWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGdldFN0b3JhZ2U7XG5cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBub29wU3RvcmFnZSA9IHtcbiAgZ2V0SXRlbTogbm9vcCxcbiAgc2V0SXRlbTogbm9vcCxcbiAgcmVtb3ZlSXRlbTogbm9vcCxcbiAgZ2V0QWxsS2V5czogbm9vcFxufTtcblxuZnVuY3Rpb24gaGFzU3RvcmFnZShzdG9yYWdlVHlwZSkge1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHdpbmRvdykpICE9PSAnb2JqZWN0JyB8fCAhKHN0b3JhZ2VUeXBlIGluIHdpbmRvdykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIHZhciBzdG9yYWdlID0gd2luZG93W3N0b3JhZ2VUeXBlXTtcbiAgICB2YXIgdGVzdEtleSA9ICdyZWR1eC1wZXJzaXN0ICcgKyBzdG9yYWdlVHlwZSArICcgdGVzdCc7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHRlc3RLZXksICd0ZXN0Jyk7XG4gICAgc3RvcmFnZS5nZXRJdGVtKHRlc3RLZXkpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0S2V5KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBjb25zb2xlLndhcm4oJ3JlZHV4LXBlcnNpc3QgJyArIHN0b3JhZ2VUeXBlICsgJyB0ZXN0IGZhaWxlZCwgcGVyc2lzdGVuY2Ugd2lsbCBiZSBkaXNhYmxlZC4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2UodHlwZSkge1xuICB2YXIgc3RvcmFnZVR5cGUgPSB0eXBlICsgJ1N0b3JhZ2UnO1xuICBpZiAoaGFzU3RvcmFnZShzdG9yYWdlVHlwZSkpIHJldHVybiB3aW5kb3dbc3RvcmFnZVR5cGVdO2Vsc2Uge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdyZWR1eC1wZXJzaXN0IGZhaWxlZCB0byBjcmVhdGUgc3luYyBzdG9yYWdlLiBmYWxsaW5nIGJhY2sgdG8gbWVtb3J5IHN0b3JhZ2UuJyk7XG4gICAgfVxuICAgIHJldHVybiBub29wU3RvcmFnZTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC1wZXJzaXN0L2VzL3N0b3JhZ2UvZ2V0U3RvcmFnZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuaW1wb3J0IHtcbiAgbG9hZFJlc3VsdHMsIHVwZGF0ZVJlc3VsdCwgZGVsZXRlUmVzdWx0LFxuICBhZGRMaW5lVG9BeGlzLCB1cGRhdGVMaW5lSW5BeGlzLCByZW1vdmVMaW5lRnJvbUF4aXMsXG4gIHVwZGF0ZUF4aXNTY2FsZSxcbiAgdXBkYXRlR2xvYmFsUG9sbGluZ1JhdGUsXG4gIHVwZGF0ZVhBeGlzS2V5LFxuICB1cGRhdGVBeGlzU2NhbGVSYW5nZVR5cGUsIHVwZGF0ZUF4aXNTY2FsZVJhbmdlTnVtYmVyLFxuICB1cGRhdGVHbG9iYWxDaGFydFNpemVcbn0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgRXhwZXJpbWVudHNUYWJsZSBmcm9tICcuLi9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUnO1xuaW1wb3J0IExvZ1Zpc3VhbGl6ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyJztcbmltcG9ydCBOYXZpZ2F0aW9uQmFyIGZyb20gJy4uL2NvbXBvbmVudHMvTmF2aWdhdGlvbkJhcic7XG5pbXBvcnQgU2lkZUJhciBmcm9tICcuLi9jb21wb25lbnRzL1NpZGVCYXInO1xuXG5sZXQgcmVzdWx0c1BvbGxpbmdUaW1lcjtcblxuY29uc3Qgc3RhcnRSZXN1bHRzUG9sbGluZyA9IChmdW5jLCBwb2xsaW5nUmF0ZSkgPT4ge1xuICBpZiAocG9sbGluZ1JhdGUgPiAwKSB7XG4gICAgcmVzdWx0c1BvbGxpbmdUaW1lciA9IHNldEludGVydmFsKGZ1bmMsIHBvbGxpbmdSYXRlKTtcbiAgfVxufTtcblxuY29uc3Qgc3RvcFBvbGxpbmcgPSAodGltZXIpID0+IHtcbiAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XG59O1xuXG5jbGFzcyBDaGFpbmVyVUlDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy5wcm9wcy5sb2FkUmVzdWx0cygpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBwb2xsaW5nUmF0ZSB9ID0gdGhpcy5wcm9wcy5jb25maWcuZ2xvYmFsO1xuICAgIHN0YXJ0UmVzdWx0c1BvbGxpbmcodGhpcy5wcm9wcy5sb2FkUmVzdWx0cywgcG9sbGluZ1JhdGUpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCBjdXJyZW50UG9sbGluZ1JhdGUgPSB0aGlzLnByb3BzLmNvbmZpZy5nbG9iYWwucG9sbGluZ1JhdGU7XG4gICAgY29uc3QgbmV4dFBvbGxpbmdSYXRlID0gbmV4dFByb3BzLmNvbmZpZy5nbG9iYWwucG9sbGluZ1JhdGU7XG5cbiAgICBpZiAoY3VycmVudFBvbGxpbmdSYXRlICE9PSBuZXh0UG9sbGluZ1JhdGUpIHtcbiAgICAgIHN0b3BQb2xsaW5nKHJlc3VsdHNQb2xsaW5nVGltZXIpO1xuICAgICAgc3RhcnRSZXN1bHRzUG9sbGluZyh0aGlzLnByb3BzLmxvYWRSZXN1bHRzLCBuZXh0UG9sbGluZ1JhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHN0b3BQb2xsaW5nKHJlc3VsdHNQb2xsaW5nVGltZXIpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcmVzdWx0cywgZmV0Y2hTdGF0ZSwgY29uZmlnLCBzdGF0cyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYWluZXItdWktY29udGFpbmVyXCI+XG4gICAgICAgIDxOYXZpZ2F0aW9uQmFyXG4gICAgICAgICAgZmV0Y2hTdGF0ZT17ZmV0Y2hTdGF0ZX1cbiAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICBvbkdsb2JhbENvbmZpZ1BvbGxpbmdSYXRlVXBkYXRlPXt0aGlzLnByb3BzLnVwZGF0ZUdsb2JhbFBvbGxpbmdSYXRlfVxuICAgICAgICAgIG9uR2xvYmFsQ29uZmlnQ2hhcnRTaXplVXBkYXRlPXt0aGlzLnByb3BzLnVwZGF0ZUdsb2JhbENoYXJ0U2l6ZX1cbiAgICAgICAgLz5cbiAgICAgICAgPENvbnRhaW5lciBmbHVpZD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtNCBjb2wtbGctM1wiPlxuICAgICAgICAgICAgICA8U2lkZUJhclxuICAgICAgICAgICAgICAgIHJlc3VsdHM9e3Jlc3VsdHN9XG4gICAgICAgICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZUFkZD17dGhpcy5wcm9wcy5hZGRMaW5lVG9BeGlzfVxuICAgICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVVcGRhdGU9e3RoaXMucHJvcHMudXBkYXRlTGluZUluQXhpc31cbiAgICAgICAgICAgICAgICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlPXt0aGlzLnByb3BzLnJlbW92ZUxpbmVGcm9tQXhpc31cbiAgICAgICAgICAgICAgICBvbkF4aXNDb25maWdTY2FsZVVwZGF0ZT17dGhpcy5wcm9wcy51cGRhdGVBeGlzU2NhbGV9XG4gICAgICAgICAgICAgICAgb25BeGlzQ29uZmlnWEtleVVwZGF0ZT17dGhpcy5wcm9wcy51cGRhdGVYQXhpc0tleX1cbiAgICAgICAgICAgICAgICBvbkF4aXNDb25maWdTY2FsZVJhbmdlVHlwZVVwZGF0ZT17dGhpcy5wcm9wcy51cGRhdGVBeGlzU2NhbGVSYW5nZVR5cGV9XG4gICAgICAgICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZU51bWJlclVwZGF0ZT17dGhpcy5wcm9wcy51cGRhdGVBeGlzU2NhbGVSYW5nZU51bWJlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbWQtOCBjb2wtbGctOVwiPlxuICAgICAgICAgICAgICA8TG9nVmlzdWFsaXplclxuICAgICAgICAgICAgICAgIHJlc3VsdHM9e3Jlc3VsdHN9XG4gICAgICAgICAgICAgICAgc3RhdHM9e3N0YXRzfVxuICAgICAgICAgICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e3RoaXMucHJvcHMuYWRkTGluZVRvQXhpc31cbiAgICAgICAgICAgICAgICBvbkF4aXNDb25maWdMaW5lVXBkYXRlPXt0aGlzLnByb3BzLnVwZGF0ZUxpbmVJbkF4aXN9XG4gICAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZT17dGhpcy5wcm9wcy5yZW1vdmVMaW5lRnJvbUF4aXN9XG4gICAgICAgICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVVcGRhdGU9e3RoaXMucHJvcHMudXBkYXRlQXhpc1NjYWxlfVxuICAgICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ1hLZXlVcGRhdGU9e3RoaXMucHJvcHMudXBkYXRlWEF4aXNLZXl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxFeHBlcmltZW50c1RhYmxlXG4gICAgICAgICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICAgICAgICBzdGF0cz17c3RhdHN9XG4gICAgICAgICAgICAgICAgb25SZXN1bHRVcGRhdGU9e3RoaXMucHJvcHMudXBkYXRlUmVzdWx0fVxuICAgICAgICAgICAgICAgIG9uUmVzdWx0RGVsZXRlPXt0aGlzLnByb3BzLmRlbGV0ZVJlc3VsdH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0NvbnRhaW5lcj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgbWFwRW50aXRpZXNUb1N0YXRzID0gKGVudGl0aWVzKSA9PiB7XG4gIGNvbnN0IHsgcmVzdWx0cyA9IHt9IH0gPSBlbnRpdGllcztcbiAgY29uc3QgYXJnS2V5U2V0ID0ge307XG4gIE9iamVjdC5rZXlzKHJlc3VsdHMpLmZvckVhY2goKHJlc3VsdElkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgcmVzdWx0LmFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7IGFyZ0tleVNldFthcmcua2V5XSA9IHRydWU7IH0pO1xuICB9KTtcbiAgY29uc3QgYXJnS2V5cyA9IE9iamVjdC5rZXlzKGFyZ0tleVNldCk7XG5cbiAgY29uc3QgYXhlcyA9IHtcbiAgICB4QXhpczoge30sXG4gICAgeUxlZnRBeGlzOiB7fSxcbiAgICB5UmlnaHRBeGlzOiB7fVxuICB9O1xuXG4gIHJldHVybiB7IGF4ZXMsIGFyZ0tleXMgfTtcbn07XG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIGF4ZXM6IHt9LFxuICBnbG9iYWw6IHt9XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgY29uc3Qge1xuICAgIGVudGl0aWVzLFxuICAgIGZldGNoU3RhdGUsXG4gICAgY29uZmlnID0gZGVmYXVsdENvbmZpZ1xuICB9ID0gc3RhdGU7XG4gIGNvbnN0IHsgcmVzdWx0cyA9IHt9IH0gPSBlbnRpdGllcztcbiAgY29uc3Qgc3RhdHMgPSBtYXBFbnRpdGllc1RvU3RhdHMoZW50aXRpZXMpO1xuICByZXR1cm4geyByZXN1bHRzLCBmZXRjaFN0YXRlLCBjb25maWcsIHN0YXRzIH07XG59O1xuXG5DaGFpbmVyVUlDb250YWluZXIucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgZmV0Y2hTdGF0ZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByZXN1bHRzOiBQcm9wVHlwZXMuc3RyaW5nXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSksXG4gICAgZ2xvYmFsOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc3RhdHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXhlczogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGFyZ0tleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGxvYWRSZXN1bHRzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB1cGRhdGVSZXN1bHQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRlbGV0ZVJlc3VsdDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgYWRkTGluZVRvQXhpczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdXBkYXRlTGluZUluQXhpczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcmVtb3ZlTGluZUZyb21BeGlzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB1cGRhdGVBeGlzU2NhbGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHVwZGF0ZUdsb2JhbFBvbGxpbmdSYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB1cGRhdGVYQXhpc0tleTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdXBkYXRlQXhpc1NjYWxlUmFuZ2VUeXBlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICB1cGRhdGVBeGlzU2NhbGVSYW5nZU51bWJlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdXBkYXRlR2xvYmFsQ2hhcnRTaXplOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge1xuICBsb2FkUmVzdWx0cyxcbiAgdXBkYXRlUmVzdWx0LFxuICBkZWxldGVSZXN1bHQsXG4gIGFkZExpbmVUb0F4aXMsXG4gIHVwZGF0ZUxpbmVJbkF4aXMsXG4gIHJlbW92ZUxpbmVGcm9tQXhpcyxcbiAgdXBkYXRlQXhpc1NjYWxlLFxuICB1cGRhdGVHbG9iYWxQb2xsaW5nUmF0ZSxcbiAgdXBkYXRlWEF4aXNLZXksXG4gIHVwZGF0ZUF4aXNTY2FsZVJhbmdlVHlwZSxcbiAgdXBkYXRlQXhpc1NjYWxlUmFuZ2VOdW1iZXIsXG4gIHVwZGF0ZUdsb2JhbENoYXJ0U2l6ZVxufSkoQ2hhaW5lclVJQ29udGFpbmVyKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhaW5lcnMvQ2hhaW5lclVJQ29udGFpbmVyLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlc3VsdFJvdyBmcm9tICcuL1Jlc3VsdFJvdyc7XG5cblxuY29uc3QgRXhwZXJpbWVudHNUYWJsZSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlc3VsdHMgPSB7fSwgc3RhdHMsIG9uUmVzdWx0VXBkYXRlLCBvblJlc3VsdERlbGV0ZSB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYXJnS2V5cyB9ID0gc3RhdHM7XG5cbiAgY29uc3QgYXJnSGVhZGVyRWxlbXMgPSBhcmdLZXlzLm1hcCgoYXJnS2V5KSA9PiAoPHRoIGtleT17YGFyZ3MtJHthcmdLZXl9YH0+e2AoJHthcmdLZXl9KWB9PC90aD4pKTtcblxuICBjb25zdCByZXN1bHRSb3dFbGVtcyA9IE9iamVjdC5rZXlzKHJlc3VsdHMpLm1hcCgocmVzdWx0SWQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICBjb25zdCBrZXkgPSBgcmVzdWx0LXJvdy0ke3Jlc3VsdC5pZH1gO1xuICAgIHJldHVybiAoXG4gICAgICA8UmVzdWx0Um93XG4gICAgICAgIHJlc3VsdD17cmVzdWx0fVxuICAgICAgICBzdGF0cz17c3RhdHN9XG4gICAgICAgIGtleT17a2V5fVxuICAgICAgICBvblJlc3VsdFVwZGF0ZT17b25SZXN1bHRVcGRhdGV9XG4gICAgICAgIG9uUmVzdWx0RGVsZXRlPXtvblJlc3VsdERlbGV0ZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0aD5pZDwvdGg+XG4gICAgICAgICAgPHRoPm5hbWU8L3RoPlxuICAgICAgICAgIDx0aD5lcG9jaDwvdGg+XG4gICAgICAgICAgPHRoPml0ZXJhdGlvbjwvdGg+XG4gICAgICAgICAgPHRoPmVsYXBzZWRfdGltZTwvdGg+XG4gICAgICAgICAge2FyZ0hlYWRlckVsZW1zfVxuICAgICAgICAgIDx0aCAvPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAge3Jlc3VsdFJvd0VsZW1zfVxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICApO1xufTtcblxuRXhwZXJpbWVudHNUYWJsZS5wcm9wVHlwZXMgPSB7XG4gIHJlc3VsdHM6IFByb3BUeXBlcy5vYmplY3RPZihcbiAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYXRoTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgICB9KVxuICApLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBhcmdLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9KSxcbiAgb25SZXN1bHRVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uUmVzdWx0RGVsZXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuRXhwZXJpbWVudHNUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIHJlc3VsdHM6IHt9LFxuICBzdGF0czoge1xuICAgIGFyZ0tleXM6IFtdXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVyaW1lbnRzVGFibGU7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBCdXR0b24sIE1vZGFsLCBNb2RhbEhlYWRlciwgTW9kYWxCb2R5LCBNb2RhbEZvb3RlciB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuaW1wb3J0IHsgZGlzcGxheU5hbWUgfSBmcm9tICcuLi91dGlscyc7XG5cblxuY29uc3QgZW1wdHlTdHIgPSAnLSc7XG5cbmNsYXNzIFJlc3VsdFJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5oYW5kbGVSZXN1bHROYW1lQ2hhbmdlID0gdGhpcy5oYW5kbGVSZXN1bHROYW1lQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVSZXN1bHROYW1lS2V5UHJlc3MgPSB0aGlzLmhhbmRsZVJlc3VsdE5hbWVLZXlQcmVzcy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlUmVzdWx0VXBkYXRlID0gdGhpcy5oYW5kbGVSZXN1bHRVcGRhdGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVVud2F0Y2ggPSB0aGlzLmhhbmRsZVVud2F0Y2guYmluZCh0aGlzKTtcbiAgICB0aGlzLnRvZ2dsZVVud2F0Y2hNb2RhbCA9IHRoaXMudG9nZ2xlVW53YXRjaE1vZGFsLmJpbmQodGhpcyk7XG5cbiAgICBjb25zdCB7IHJlc3VsdCB9ID0gdGhpcy5wcm9wcztcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcmVzdWx0TmFtZTogcmVzdWx0Lm5hbWVcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlUmVzdWx0TmFtZUNoYW5nZShlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZXN1bHROYW1lOiBlLnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlUmVzdWx0TmFtZUtleVByZXNzKGUpIHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIHRoaXMuaGFuZGxlUmVzdWx0VXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVzdWx0VXBkYXRlKCkge1xuICAgIGNvbnN0IHsgcmVzdWx0LCBvblJlc3VsdFVwZGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IHJlc3VsdE5hbWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKHJlc3VsdE5hbWUgIT09IHJlc3VsdC5uYW1lKSB7XG4gICAgICBvblJlc3VsdFVwZGF0ZSh7IC4uLnJlc3VsdCwgbmFtZTogcmVzdWx0TmFtZSB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVVbndhdGNoKCkge1xuICAgIGNvbnN0IHsgcmVzdWx0LCBvblJlc3VsdERlbGV0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvblJlc3VsdERlbGV0ZShyZXN1bHQuaWQpO1xuICAgIHRoaXMudG9nZ2xlVW53YXRjaE1vZGFsKCk7XG4gIH1cblxuICB0b2dnbGVVbndhdGNoTW9kYWwoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93VW53YXRjaE1vZGFsOiAhdGhpcy5zdGF0ZS5zaG93VW53YXRjaE1vZGFsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHROYW1lLCBzaG93VW53YXRjaE1vZGFsIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgcmVzdWx0LCBzdGF0cyB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGFyZ3MsIGxvZ3MgfSA9IHJlc3VsdDtcblxuICAgIGNvbnN0IGxhc3RMb2cgPSBsb2dzW2xvZ3MubGVuZ3RoIC0gMV0gfHwge307XG4gICAgY29uc3QgeyBsb2dJdGVtcyA9IFtdIH0gPSBsYXN0TG9nO1xuICAgIGNvbnN0IGxhc3RMb2dEaWN0ID0ge307XG4gICAgbG9nSXRlbXMuZm9yRWFjaCgobG9nSXRlbSkgPT4geyBsYXN0TG9nRGljdFtsb2dJdGVtLmtleV0gPSBsb2dJdGVtLnZhbHVlOyB9KTtcblxuICAgIGNvbnN0IGFyZ0RpY3QgPSB7fTtcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgYXJnRGljdFthcmcua2V5XSA9IGFyZy52YWx1ZTtcbiAgICB9KTtcbiAgICBjb25zdCBhcmdFbGVtcyA9IHN0YXRzLmFyZ0tleXMubWFwKChhcmdLZXkpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSAoYXJnS2V5IGluIGFyZ0RpY3QpID8gYXJnRGljdFthcmdLZXldIDogZW1wdHlTdHI7XG4gICAgICByZXR1cm4gKDx0ZCBrZXk9e2BhcmdzLSR7YXJnS2V5fWB9PnsodHlwZW9mIGNvbnRlbnQgPT09ICdib29sZWFuJykgPyBTdHJpbmcoY29udGVudCkgOiBjb250ZW50fTwvdGQ+KTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8dHIgY2xhc3NOYW1lPVwicmVzdWx0LXJvd1wiPlxuICAgICAgICA8dGQ+e3Jlc3VsdC5pZH08L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcmVzdWx0LW5hbWVcIlxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3Jlc3VsdC5wYXRoTmFtZX1cbiAgICAgICAgICAgIHZhbHVlPXtyZXN1bHROYW1lIHx8ICcnfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlUmVzdWx0TmFtZUNoYW5nZX1cbiAgICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlUmVzdWx0TmFtZUtleVByZXNzfVxuICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZVJlc3VsdFVwZGF0ZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+e2xhc3RMb2dEaWN0LmVwb2NofTwvdGQ+XG4gICAgICAgIDx0ZD57bGFzdExvZ0RpY3QuaXRlcmF0aW9ufTwvdGQ+XG4gICAgICAgIDx0ZD57bGFzdExvZ0RpY3QuZWxhcHNlZF90aW1lfTwvdGQ+XG4gICAgICAgIHthcmdFbGVtc31cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVVud2F0Y2hNb2RhbH0+XG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDxNb2RhbCBpc09wZW49e3Nob3dVbndhdGNoTW9kYWx9PlxuICAgICAgICAgICAgPE1vZGFsSGVhZGVyPlVud2F0Y2ggYSByZXN1bHQ8L01vZGFsSGVhZGVyPlxuICAgICAgICAgICAgPE1vZGFsQm9keT5cbiAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlIHRvIHVud2F0Y2gge2Rpc3BsYXlOYW1lKHJlc3VsdCl9ID9cbiAgICAgICAgICAgIDwvTW9kYWxCb2R5PlxuICAgICAgICAgICAgPE1vZGFsRm9vdGVyPlxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwic2Vjb25kYXJ5XCIgb25DbGljaz17dGhpcy50b2dnbGVVbndhdGNoTW9kYWx9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwiZGFuZ2VyXCIgb25DbGljaz17dGhpcy5oYW5kbGVVbndhdGNofT5VbndhdGNoPC9CdXR0b24+XG4gICAgICAgICAgICA8L01vZGFsRm9vdGVyPlxuICAgICAgICAgIDwvTW9kYWw+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICk7XG4gIH1cbn1cblxuUmVzdWx0Um93LnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhdGhOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc3RhdHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXJnS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfSksXG4gIG9uUmVzdWx0VXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvblJlc3VsdERlbGV0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuUmVzdWx0Um93LmRlZmF1bHRQcm9wcyA9IHtcbiAgc3RhdHM6IHtcbiAgICBhcmdLZXlzOiBbXVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHRSb3c7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1Jlc3VsdFJvdy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7XG4gIExpbmVDaGFydCxcbiAgTGluZSxcbiAgWEF4aXMsXG4gIFlBeGlzLFxuICBDYXJ0ZXNpYW5HcmlkLFxuICBUb29sdGlwLFxuICBMZWdlbmQsXG4gIFJlc3BvbnNpdmVDb250YWluZXJcbn0gZnJvbSAncmVjaGFydHMnO1xuaW1wb3J0ICdyYy1zbGlkZXIvYXNzZXRzL2luZGV4LmNzcyc7XG5pbXBvcnQgeyBsaW5lMm5hbWUsIGxpbmUyZGF0YUtleSB9IGZyb20gJy4uL3V0aWxzJztcblxuXG5jb25zdCBnZXREb21haW4gPSAoYXhpc0NvbmZpZyA9IHt9KSA9PiB7XG4gIGNvbnN0IHsgc2NhbGUgPSAnbGluZWFyJywgc2NhbGVSYW5nZSA9IHt9IH0gPSBheGlzQ29uZmlnO1xuICBjb25zdCB7IHJhbmdlVHlwZXMgPSBbXSwgcmFuZ2UgfSA9IHNjYWxlUmFuZ2Vbc2NhbGVdIHx8IHt9O1xuICBjb25zdCBkb21haW4gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpICs9IDEpIHtcbiAgICBjb25zdCByYW5nZVR5cGUgPSByYW5nZVR5cGVzW2ldIHx8ICdhdXRvJztcbiAgICBpZiAocmFuZ2VUeXBlID09PSAnbnVtYmVyJykge1xuICAgICAgZG9tYWluW2ldID0gKHJhbmdlW2ldID09IG51bGwgfHwgcmFuZ2VbaV0gPT09ICcnKSA/ICdhdXRvJyA6IHJhbmdlW2ldO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb21haW5baV0gPSByYW5nZVR5cGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBkb21haW47XG59O1xuXG5jb25zdCBidWlsZExpbmVFbGVtID0gKGxpbmUsIGF4aXNOYW1lLCByZXN1bHRzKSA9PiB7XG4gIGNvbnN0IHsgY29uZmlnID0ge30gfSA9IGxpbmU7XG4gIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbbGluZS5yZXN1bHRJZF0gfHwge307XG5cbiAgcmV0dXJuIChcbiAgICA8TGluZVxuICAgICAgdHlwZT1cImxpbmVhclwiXG4gICAgICBuYW1lPXtsaW5lMm5hbWUobGluZSwgcmVzdWx0KX1cbiAgICAgIGRhdGFLZXk9e2xpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSl9XG4gICAgICB5QXhpc0lkPXtheGlzTmFtZX1cbiAgICAgIHN0cm9rZT17Y29uZmlnLmNvbG9yfVxuICAgICAgY29ubmVjdE51bGxzXG4gICAgICBpc0FuaW1hdGlvbkFjdGl2ZT17ZmFsc2V9XG4gICAgICBrZXk9e2xpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmNvbnN0IGJ1aWxkTGluZUVsZW1zID0gKGF4aXNOYW1lLCByZXN1bHRzLCBjb25maWcpID0+IHtcbiAgY29uc3QgYXhpc0NvbmZpZyA9IGNvbmZpZy5heGVzW2F4aXNOYW1lXSB8fCB7fTtcbiAgY29uc3QgeyBsaW5lcyA9IFtdIH0gPSBheGlzQ29uZmlnO1xuICBjb25zdCB2aXNpYmxlTGluZXMgPSBsaW5lcy5maWx0ZXIoKGxpbmUpID0+IGxpbmUuY29uZmlnLmlzVmlzaWJsZSk7XG4gIHJldHVybiB2aXNpYmxlTGluZXMubWFwKChsaW5lKSA9PiBidWlsZExpbmVFbGVtKGxpbmUsIGF4aXNOYW1lLCByZXN1bHRzKSk7XG59O1xuXG5jbGFzcyBMb2dWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzdWx0cyA9IHt9LFxuICAgICAgY29uZmlnID0ge31cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICB4QXhpcyA9IHsgYXhpc05hbWU6ICd4QXhpcycgfSxcbiAgICAgIHlMZWZ0QXhpcyA9IHsgYXhpc05hbWU6ICd5TGVmdEF4aXMnIH0sXG4gICAgICB5UmlnaHRBeGlzID0geyBheGlzTmFtZTogJ3lSaWdodEF4aXMnIH1cbiAgICB9ID0gY29uZmlnLmF4ZXMgfHwge307XG4gICAgY29uc3QgeyB4QXhpc0tleSA9ICdlcG9jaCcgfSA9IHhBeGlzO1xuICAgIGNvbnN0IGxlZnRMaW5lcyA9IHlMZWZ0QXhpcy5saW5lcyB8fCBbXTtcbiAgICBjb25zdCByaWdodExpbmVzID0geVJpZ2h0QXhpcy5saW5lcyB8fCBbXTtcbiAgICBjb25zdCBheGlzTGluZXMgPSB7XG4gICAgICB5TGVmdEF4aXM6IGxlZnRMaW5lcyxcbiAgICAgIHlSaWdodEF4aXM6IHJpZ2h0TGluZXNcbiAgICB9O1xuXG4gICAgY29uc3QgZGF0YURpY3QgPSB7fTsgLy8gZXguIDE6IHsgZXBvY2g6IDEsIDEyX21haW5fbG9zczogMC4wMTEsIC4uLiB9XG4gICAgT2JqZWN0LmtleXMoYXhpc0xpbmVzKS5mb3JFYWNoKChheGlzTmFtZSkgPT4ge1xuICAgICAgY29uc3QgbGluZXMgPSBheGlzTGluZXNbYXhpc05hbWVdO1xuICAgICAgbGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgICAgICBjb25zdCB7IHJlc3VsdElkLCBsb2dLZXkgfSA9IGxpbmU7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbcmVzdWx0SWRdO1xuICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9ncyA9IHJlc3VsdC5sb2dzIHx8IFtdO1xuICAgICAgICBsb2dzLmZvckVhY2goKGxvZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGxvZ0RpY3QgPSB7fTtcbiAgICAgICAgICBsb2cubG9nSXRlbXMuZm9yRWFjaCgobG9nSXRlbSkgPT4ge1xuICAgICAgICAgICAgbG9nRGljdFtsb2dJdGVtLmtleV0gPSBsb2dJdGVtLnZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChsb2dEaWN0W3hBeGlzS2V5XSA9PSBudWxsIHx8IGxvZ0RpY3RbbG9nS2V5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkYXRhRGljdFtsb2dEaWN0W3hBeGlzS2V5XV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgZGF0YURpY3RbbG9nRGljdFt4QXhpc0tleV1dID0geyBbeEF4aXNLZXldOiBsb2dEaWN0W3hBeGlzS2V5XSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhRGljdFtsb2dEaWN0W3hBeGlzS2V5XV1bbGluZTJkYXRhS2V5KGxpbmUsIGF4aXNOYW1lKV0gPSBsb2dEaWN0W2xvZ0tleV07XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29uc3QgZGF0YSA9IE9iamVjdC5rZXlzKGRhdGFEaWN0KS5tYXAoKGtleSkgPT4gKGRhdGFEaWN0W2tleV0pKTtcblxuICAgIGNvbnN0IGxpbmVFbGVtcyA9IFtcbiAgICAgIC4uLmJ1aWxkTGluZUVsZW1zKCd5TGVmdEF4aXMnLCByZXN1bHRzLCBjb25maWcpLFxuICAgICAgLi4uYnVpbGRMaW5lRWxlbXMoJ3lSaWdodEF4aXMnLCByZXN1bHRzLCBjb25maWcpXG4gICAgXTtcblxuICAgIGNvbnN0IHsgY2hhcnRTaXplIH0gPSB0aGlzLnByb3BzLmNvbmZpZy5nbG9iYWw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2ctdmlzdWFsaXplci1yb290XCI+XG4gICAgICAgIDxSZXNwb25zaXZlQ29udGFpbmVyXG4gICAgICAgICAgd2lkdGg9e2NoYXJ0U2l6ZS53aWR0aH1cbiAgICAgICAgICBoZWlnaHQ9e2NoYXJ0U2l6ZS5oZWlnaHR9XG4gICAgICAgICAgYXNwZWN0PXtjaGFydFNpemUuYXNwZWN0fVxuICAgICAgICA+XG4gICAgICAgICAgPExpbmVDaGFydCBkYXRhPXtkYXRhfT5cbiAgICAgICAgICAgIDxYQXhpc1xuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgZGF0YUtleT17eEF4aXNLZXl9XG4gICAgICAgICAgICAgIHNjYWxlPXt4QXhpcy5zY2FsZX1cbiAgICAgICAgICAgICAgZG9tYWluPXtnZXREb21haW4oeEF4aXMpfVxuICAgICAgICAgICAgICBhbGxvd0RhdGFPdmVyZmxvd1xuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxZQXhpc1xuICAgICAgICAgICAgICB5QXhpc0lkPVwieUxlZnRBeGlzXCJcbiAgICAgICAgICAgICAgb3JpZW50YXRpb249XCJsZWZ0XCJcbiAgICAgICAgICAgICAgc2NhbGU9e3lMZWZ0QXhpcy5zY2FsZX1cbiAgICAgICAgICAgICAgZG9tYWluPXtnZXREb21haW4oeUxlZnRBeGlzKX1cbiAgICAgICAgICAgICAgYWxsb3dEYXRhT3ZlcmZsb3dcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8WUF4aXNcbiAgICAgICAgICAgICAgeUF4aXNJZD1cInlSaWdodEF4aXNcIlxuICAgICAgICAgICAgICBvcmllbnRhdGlvbj1cInJpZ2h0XCJcbiAgICAgICAgICAgICAgc2NhbGU9e3lSaWdodEF4aXMuc2NhbGV9XG4gICAgICAgICAgICAgIGRvbWFpbj17Z2V0RG9tYWluKHlSaWdodEF4aXMpfVxuICAgICAgICAgICAgICBhbGxvd0RhdGFPdmVyZmxvd1xuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIC8+XG4gICAgICAgICAgICA8VG9vbHRpcCAvPlxuICAgICAgICAgICAgPExlZ2VuZCAvPlxuICAgICAgICAgICAge2xpbmVFbGVtc31cbiAgICAgICAgICA8L0xpbmVDaGFydD5cbiAgICAgICAgPC9SZXNwb25zaXZlQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaXN1YWxpemVyLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5TGVmdEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5UmlnaHRBeGlzOiBQcm9wVHlwZXMuYW55XG4gICAgfSksXG4gICAgZ2xvYmFsOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgY2hhcnRTaXplOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLm51bWJlciwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICAgICAgICBoZWlnaHQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5udW1iZXIsIFByb3BUeXBlcy5zdHJpbmddKSxcbiAgICAgICAgYXNwZWN0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWRcbiAgICAgIH0pXG4gICAgfSlcbiAgfSkuaXNSZXF1aXJlZFxufTtcblxuTG9nVmlzdWFsaXplci5kZWZhdWx0UHJvcHMgPSB7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dWaXN1YWxpemVyO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyLmpzeCIsImNvbnN0IGxpbmUya2V5ID0gKGxpbmUpID0+IGAke2xpbmUucmVzdWx0SWR9XyR7bGluZS5sb2dLZXl9YDtcblxuY29uc3QgbGluZTJkYXRhS2V5ID0gKGxpbmUsIGF4aXNOYW1lKSA9PiBgJHtheGlzTmFtZX1fJHtsaW5lMmtleShsaW5lKX1gO1xuXG5jb25zdCB0cnVuY2F0ZSA9IChzdHJpbmcsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCB7IGxlbmd0aCA9IDIwLCByZXN0U3RyID0gJy4uLicsIGZvcndhcmQgPSBmYWxzZSB9ID0gb3B0aW9ucztcbiAgbGV0IHN0ciA9IHN0cmluZyB8fCAnJztcbiAgY29uc3QgY2hhcnMgPSBbLi4uc3RyXTtcbiAgaWYgKGNoYXJzLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICBzdHIgPSByZXN0U3RyICsgY2hhcnMuc2xpY2UoY2hhcnMubGVuZ3RoIC0gbGVuZ3RoKS5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY2hhcnMuc2xpY2UoMCwgbGVuZ3RoKS5qb2luKCcnKSArIHJlc3RTdHI7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG5jb25zdCBkaXNwbGF5TmFtZSA9IChyZXN1bHQgPSB7fSkgPT4gKFxuICB0cnVuY2F0ZShyZXN1bHQubmFtZSkgfHwgdHJ1bmNhdGUocmVzdWx0LnBhdGhOYW1lLCB7IGZvcndhcmQ6IHRydWUgfSlcbik7XG5cbmNvbnN0IGxpbmUybmFtZSA9IChsaW5lLCByZXN1bHQgPSB7fSkgPT4gYCR7ZGlzcGxheU5hbWUocmVzdWx0KX0vJHtsaW5lLmxvZ0tleX1gO1xuXG5cbmV4cG9ydCB7XG4gIGxpbmUya2V5LFxuICBsaW5lMm5hbWUsXG4gIGxpbmUyZGF0YUtleSxcbiAgZGlzcGxheU5hbWUsXG4gIHRydW5jYXRlXG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvaW5kZXguanMiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JjLXNsaWRlci9hc3NldHMvaW5kZXguY3NzXG4vLyBtb2R1bGUgaWQgPSA4NDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1xuICBDb250YWluZXIsXG4gIENvbGxhcHNlLCBOYXZiYXIsIE5hdmJhckJyYW5kLFxuICBQb3BvdmVyLCBQb3BvdmVyVGl0bGUsIFBvcG92ZXJDb250ZW50LFxuICBGb3JtLCBGb3JtR3JvdXAsIExhYmVsLFxuICBCdXR0b25cbn0gZnJvbSAncmVhY3RzdHJhcCc7XG5pbXBvcnQgUmVzdWx0c0ZldGNoU3RhdGUgZnJvbSAnLi9SZXN1bHRzRmV0Y2hTdGF0ZSc7XG5pbXBvcnQgeyBjaGFydFNpemVPcHRpb25zLCBwb2xsaW5nT3B0aW9ucyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XG5cblxuY29uc3QgY3JlYXRlUG9sbGluZ09wdGlvbkVsZW1zID0gKG9wdGlvbnMpID0+IFtcbiAgLi4ub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgIDxvcHRpb24ga2V5PXtvcHRpb24uaWR9IHZhbHVlPXtvcHRpb24udmFsdWV9PntvcHRpb24ubmFtZX08L29wdGlvbj5cbiAgKSlcbl07XG5cbmNvbnN0IGNyZWF0ZVZpc3VhbGl6ZXJTaXplT3B0aW9uRWxlbXMgPSAob3B0aW9ucykgPT4gW1xuICAuLi5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgPG9wdGlvbiBrZXk9e29wdGlvbi5pZH0gdmFsdWU9e29wdGlvbi5pZH0+e29wdGlvbi5uYW1lfTwvb3B0aW9uPlxuICApKVxuXTtcblxuY2xhc3MgTmF2aWdhdGlvbkJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy50b2dnbGVTZXR0aW5nUG9wb3ZlciA9IHRoaXMudG9nZ2xlU2V0dGluZ1BvcG92ZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUNoYW5nZVBvbGxpbmdSYXRlID0gdGhpcy5oYW5kbGVDaGFuZ2VQb2xsaW5nUmF0ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQ2hhbmdlQ2hhcnRTaXplID0gdGhpcy5oYW5kbGVDaGFuZ2VDaGFydFNpemUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2V0dGluZ1BvcG92ZXJPcGVuOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICB0b2dnbGVTZXR0aW5nUG9wb3ZlcigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNldHRpbmdQb3BvdmVyT3BlbjogIXRoaXMuc3RhdGUuc2V0dGluZ1BvcG92ZXJPcGVuXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VQb2xsaW5nUmF0ZShlKSB7XG4gICAgdGhpcy5wcm9wcy5vbkdsb2JhbENvbmZpZ1BvbGxpbmdSYXRlVXBkYXRlKE51bWJlcihlLnRhcmdldC52YWx1ZSkpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlQ2hhcnRTaXplKGUpIHtcbiAgICBjb25zdCBzZWxlY3RlZElkID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcbiAgICBjb25zdCBjaGFydFNpemUgPSBjaGFydFNpemVPcHRpb25zLmZpbmQoKG8pID0+IG8uaWQgPT09IHNlbGVjdGVkSWQpO1xuICAgIHRoaXMucHJvcHMub25HbG9iYWxDb25maWdDaGFydFNpemVVcGRhdGUoY2hhcnRTaXplKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwb2xsaW5nT3B0aW9uRWxlbXMgPSBjcmVhdGVQb2xsaW5nT3B0aW9uRWxlbXMocG9sbGluZ09wdGlvbnMpO1xuICAgIGNvbnN0IGNoYXJ0U2l6ZUVsZW1zID0gY3JlYXRlVmlzdWFsaXplclNpemVPcHRpb25FbGVtcyhjaGFydFNpemVPcHRpb25zKTtcbiAgICBjb25zdCB7IGNoYXJ0U2l6ZSA9IHt9IH0gPSB0aGlzLnByb3BzLmNvbmZpZy5nbG9iYWw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE5hdmJhciBjbGFzc05hbWU9XCJuYXZiYXItbGlnaHQgYmctbGlnaHQgbWItM1wiPlxuICAgICAgICA8Q29udGFpbmVyIGZsdWlkPlxuICAgICAgICAgIDxOYXZiYXJCcmFuZCBocmVmPVwiL1wiPkNoYWluZXIgVUk8L05hdmJhckJyYW5kPlxuICAgICAgICAgIDxDb2xsYXBzZSBpc09wZW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXZiYXItdGV4dCBteC0zIG15LTBcIj5cbiAgICAgICAgICAgICAgPFJlc3VsdHNGZXRjaFN0YXRlIGZldGNoU3RhdGU9e3RoaXMucHJvcHMuZmV0Y2hTdGF0ZX0gY29uZmlnPXt0aGlzLnByb3BzLmNvbmZpZ30gLz5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxCdXR0b24gaWQ9XCJuYXZiYXItZ2xvYmFsLXNldHRpbmdcIiBvbkNsaWNrPXt0aGlzLnRvZ2dsZVNldHRpbmdQb3BvdmVyfT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwib2kgb2ktY29nXCIgLz5cbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICAgIDwvQ29udGFpbmVyPlxuXG4gICAgICAgIDxQb3BvdmVyIHBsYWNlbWVudD1cImxlZnQgYm90dG9tXCIgaXNPcGVuPXt0aGlzLnN0YXRlLnNldHRpbmdQb3BvdmVyT3Blbn0gdGFyZ2V0PVwibmF2YmFyLWdsb2JhbC1zZXR0aW5nXCIgdG9nZ2xlPXt0aGlzLnRvZ2dsZVNldHRpbmdQb3BvdmVyfT5cbiAgICAgICAgICA8UG9wb3ZlclRpdGxlIGNsYXNzTmFtZT1cInBvcG92ZXItaGVhZGVyXCI+R2xvYmFsIFNldHRpbmc8L1BvcG92ZXJUaXRsZT5cbiAgICAgICAgICA8UG9wb3ZlckNvbnRlbnQgY2xhc3NOYW1lPVwicG9wb3Zlci1ib2R5XCI+XG4gICAgICAgICAgICA8Rm9ybT5cbiAgICAgICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgICAgICA8TGFiZWwgZm9yPVwiZ2xvYmFsLWNvbmZpZy1wb2xsaW5nLXJhdGVcIj5SZXN1bHRzIHBvbGxpbmcgcmF0ZTwvTGFiZWw+PGJyIC8+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICBpZD1cImdsb2JhbC1jb25maWctcG9sbGluZy1yYXRlXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVBvbGxpbmdSYXRlfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuY29uZmlnLmdsb2JhbC5wb2xsaW5nUmF0ZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7cG9sbGluZ09wdGlvbkVsZW1zfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cblxuICAgICAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgICAgIDxMYWJlbCBmb3I9XCJnbG9iYWwtY29uZmlnLWNoYXJ0LXNpemVcIj5DaGFydCBzaXplPC9MYWJlbD48YnIgLz5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cInNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICBuYW1lPVwic2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgIGlkPVwiZ2xvYmFsLWNvbmZpZy1jaGFydC1zaXplXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjaGFydFNpemUuaWR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VDaGFydFNpemV9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NoYXJ0U2l6ZUVsZW1zfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgICA8L1BvcG92ZXJDb250ZW50PlxuICAgICAgICA8L1BvcG92ZXI+XG4gICAgICA8L05hdmJhcj5cbiAgICApO1xuICB9XG59XG5cbk5hdmlnYXRpb25CYXIucHJvcFR5cGVzID0ge1xuICBmZXRjaFN0YXRlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJlc3VsdHM6IFByb3BUeXBlcy5zdHJpbmdcbiAgfSkuaXNSZXF1aXJlZCxcbiAgY29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGdsb2JhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHBvbGxpbmdSYXRlOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgY2hhcnRTaXplOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSlcbiAgICB9KVxuICB9KSxcbiAgb25HbG9iYWxDb25maWdQb2xsaW5nUmF0ZVVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25HbG9iYWxDb25maWdDaGFydFNpemVVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbk5hdmlnYXRpb25CYXIuZGVmYXVsdFByb3BzID0ge1xuICBjb25maWc6IHt9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uQmFyO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9OYXZpZ2F0aW9uQmFyLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgUkVTVUxUU19SRVFVRVNULCBSRVNVTFRTX1NVQ0NFU1MsIFJFU1VMVFNfRkFJTFVFIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5cblxuY29uc3QgUmVzdWx0c0ZldGNoU3RhdGUgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBmZXRjaFN0YXRlID0ge30sIGNvbmZpZyA9IHsgZ2xvYmFsOiB7fSB9IH0gPSBwcm9wcztcbiAgY29uc3QgcmVzdWx0c0ZldGNoU3RhdGUgPSBmZXRjaFN0YXRlLnJlc3VsdHM7XG5cbiAgbGV0IGNvbG9yQ2xhc3M7XG4gIGlmIChjb25maWcuZ2xvYmFsLnBvbGxpbmdSYXRlID09PSAwKSB7XG4gICAgY29sb3JDbGFzcyA9ICd0ZXh0LW11dGVkJztcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2ggKHJlc3VsdHNGZXRjaFN0YXRlKSB7XG4gICAgICBjYXNlIFJFU1VMVFNfUkVRVUVTVDpcbiAgICAgICAgY29sb3JDbGFzcyA9ICd0ZXh0LXByaW1hcnknO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUkVTVUxUU19TVUNDRVNTOlxuICAgICAgICBjb2xvckNsYXNzID0gJ3RleHQtc3VjY2Vzcyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSRVNVTFRTX0ZBSUxVRTpcbiAgICAgICAgY29sb3JDbGFzcyA9ICd0ZXh0LWRhbmdlcic7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29sb3JDbGFzcyA9ICd0ZXh0LW11dGVkJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiAoXG4gICAgPHNtYWxsIGNsYXNzTmFtZT17Y29sb3JDbGFzc30+PHNwYW4gY2xhc3NOYW1lPVwib2kgb2ktbWVkaWEtcmVjb3JkXCIgLz48L3NtYWxsPlxuICApO1xufTtcblxuUmVzdWx0c0ZldGNoU3RhdGUucHJvcFR5cGVzID0ge1xuICBmZXRjaFN0YXRlOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJlc3VsdHM6IFByb3BUeXBlcy5zdHJpbmdcbiAgfSkuaXNSZXF1aXJlZCxcbiAgY29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGdsb2JhbDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHBvbGxpbmdSYXRlOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSlcbiAgfSkuaXNSZXF1aXJlZFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0c0ZldGNoU3RhdGU7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1Jlc3VsdHNGZXRjaFN0YXRlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEF4ZXNDb25maWd1cmF0b3IgZnJvbSAnLi9BeGVzQ29uZmlndXJhdG9yJztcblxuXG5jb25zdCBTaWRlQmFyID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICByZXN1bHRzLFxuICAgIGNvbmZpZyxcbiAgICBvbkF4aXNDb25maWdMaW5lQWRkLCBvbkF4aXNDb25maWdMaW5lVXBkYXRlLCBvbkF4aXNDb25maWdMaW5lUmVtb3ZlLFxuICAgIG9uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlLFxuICAgIG9uQXhpc0NvbmZpZ1hLZXlVcGRhdGUsXG4gICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGUsIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGVcbiAgfSA9IHByb3BzO1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2lkZS1iYXJcIj5cbiAgICAgIDxBeGVzQ29uZmlndXJhdG9yXG4gICAgICAgIHtcbiAgICAgICAgLi4ue1xuICAgICAgICAgIHJlc3VsdHMsXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQsXG4gICAgICAgICAgb25BeGlzQ29uZmlnTGluZVVwZGF0ZSxcbiAgICAgICAgICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlLFxuICAgICAgICAgIG9uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlLFxuICAgICAgICAgIG9uQXhpc0NvbmZpZ1hLZXlVcGRhdGUsXG4gICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGUsXG4gICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZU51bWJlclVwZGF0ZVxuICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5TaWRlQmFyLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5TGVmdEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5UmlnaHRBeGlzOiBQcm9wVHlwZXMuYW55XG4gICAgfSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZUFkZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZVVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZVJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnU2NhbGVVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ1hLZXlVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5TaWRlQmFyLmRlZmF1bHRQcm9wcyA9IHtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNpZGVCYXI7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1NpZGVCYXIuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQXhpc0NvbmZpZ3VyYXRvciBmcm9tICcuL0F4aXNDb25maWd1cmF0b3InO1xuaW1wb3J0IExpbmVzQ29uZmlndXJhdG9yIGZyb20gJy4vTGluZXNDb25maWd1cmF0b3InO1xuaW1wb3J0IFhBeGlzS2V5U2VsZWN0b3IgZnJvbSAnLi9YQXhpc0tleVNlbGVjdG9yJztcblxuXG5jb25zdCBBeGVzQ29uZmlndXJhdG9yID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICByZXN1bHRzLFxuICAgIGNvbmZpZyxcbiAgICBvbkF4aXNDb25maWdMaW5lQWRkLCBvbkF4aXNDb25maWdMaW5lVXBkYXRlLCBvbkF4aXNDb25maWdMaW5lUmVtb3ZlLFxuICAgIG9uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlLFxuICAgIG9uQXhpc0NvbmZpZ1hLZXlVcGRhdGUsXG4gICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGUsIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGVcbiAgfSA9IHByb3BzO1xuICBjb25zdCB7XG4gICAgeEF4aXMgPSB7IGF4aXNOYW1lOiAneEF4aXMnIH0sXG4gICAgeUxlZnRBeGlzID0geyBheGlzTmFtZTogJ3lMZWZ0QXhpcycgfSxcbiAgICB5UmlnaHRBeGlzID0geyBheGlzTmFtZTogJ3lSaWdodEF4aXMnIH1cbiAgfSA9IGNvbmZpZy5heGVzIHx8IHt9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJheGVzLWNvbmZpZ3VyYXRvclwiPlxuICAgICAgPEF4aXNDb25maWd1cmF0b3JcbiAgICAgICAgYXhpc0NvbmZpZz17eUxlZnRBeGlzfVxuICAgICAgICBvbkNoYW5nZVNjYWxlPXtvbkF4aXNDb25maWdTY2FsZVVwZGF0ZX1cbiAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGU9e29uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlfVxuICAgICAgICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlPXtvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlfVxuICAgICAgPlxuICAgICAgICA8TGluZXNDb25maWd1cmF0b3JcbiAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgIGF4aXNOYW1lPVwieUxlZnRBeGlzXCJcbiAgICAgICAgICBsaW5lcz17eUxlZnRBeGlzLmxpbmVzfVxuICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e29uQXhpc0NvbmZpZ0xpbmVBZGR9XG4gICAgICAgICAgb25BeGlzQ29uZmlnTGluZVVwZGF0ZT17b25BeGlzQ29uZmlnTGluZVVwZGF0ZX1cbiAgICAgICAgICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlPXtvbkF4aXNDb25maWdMaW5lUmVtb3ZlfVxuICAgICAgICAvPlxuICAgICAgPC9BeGlzQ29uZmlndXJhdG9yPlxuICAgICAgPEF4aXNDb25maWd1cmF0b3JcbiAgICAgICAgYXhpc0NvbmZpZz17eVJpZ2h0QXhpc31cbiAgICAgICAgb25DaGFuZ2VTY2FsZT17b25BeGlzQ29uZmlnU2NhbGVVcGRhdGV9XG4gICAgICAgIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlPXtvbkF4aXNDb25maWdTY2FsZVJhbmdlVHlwZVVwZGF0ZX1cbiAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZU51bWJlclVwZGF0ZT17b25BeGlzQ29uZmlnU2NhbGVSYW5nZU51bWJlclVwZGF0ZX1cbiAgICAgID5cbiAgICAgICAgPExpbmVzQ29uZmlndXJhdG9yXG4gICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICBheGlzTmFtZT1cInlSaWdodEF4aXNcIlxuICAgICAgICAgIGxpbmVzPXt5UmlnaHRBeGlzLmxpbmVzfVxuICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e29uQXhpc0NvbmZpZ0xpbmVBZGR9XG4gICAgICAgICAgb25BeGlzQ29uZmlnTGluZVVwZGF0ZT17b25BeGlzQ29uZmlnTGluZVVwZGF0ZX1cbiAgICAgICAgICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlPXtvbkF4aXNDb25maWdMaW5lUmVtb3ZlfVxuICAgICAgICAvPlxuICAgICAgPC9BeGlzQ29uZmlndXJhdG9yPlxuICAgICAgPEF4aXNDb25maWd1cmF0b3JcbiAgICAgICAgYXhpc0NvbmZpZz17eEF4aXN9XG4gICAgICAgIG9uQ2hhbmdlU2NhbGU9e29uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlfVxuICAgICAgICBvbkF4aXNDb25maWdTY2FsZVJhbmdlVHlwZVVwZGF0ZT17b25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGV9XG4gICAgICAgIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGU9e29uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGV9XG4gICAgICA+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCI+XG4gICAgICAgICAgICA8WEF4aXNLZXlTZWxlY3RvciB2YWx1ZT17eEF4aXMueEF4aXNLZXl9IG9uQ2hhbmdlPXtvbkF4aXNDb25maWdYS2V5VXBkYXRlfSAvPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L0F4aXNDb25maWd1cmF0b3I+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5BeGVzQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5TGVmdEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5UmlnaHRBeGlzOiBQcm9wVHlwZXMuYW55XG4gICAgfSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZUFkZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZVVwZGF0ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZVJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnU2NhbGVVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ1hLZXlVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5BeGVzQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4ZXNDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0F4ZXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBCdXR0b24sIENvbGxhcHNlIH0gZnJvbSAncmVhY3RzdHJhcCc7XG5pbXBvcnQgQXhpc1NjYWxlU2VsZWN0b3IgZnJvbSAnLi9BeGlzU2NhbGVTZWxlY3Rvcic7XG5pbXBvcnQgQXhpc1JhbmdlQ29uZmlndXJhdG9yIGZyb20gJy4vQXhpc1JhbmdlQ29uZmlndXJhdG9yJztcblxuXG5jbGFzcyBBeGlzQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmhhbmRsZUNoYW5nZVNjYWxlID0gdGhpcy5oYW5kbGVDaGFuZ2VTY2FsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG9nZ2xlUmFuZ2VDb25maWcgPSB0aGlzLnRvZ2dsZVJhbmdlQ29uZmlnLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2hvd1JhbmdlQ29uZmlnOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTY2FsZShzY2FsZSkge1xuICAgIGNvbnN0IHsgYXhpc05hbWUgfSA9IHRoaXMucHJvcHMuYXhpc0NvbmZpZztcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlU2NhbGUoYXhpc05hbWUsIHNjYWxlKTtcbiAgfVxuXG4gIHRvZ2dsZVJhbmdlQ29uZmlnKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd1JhbmdlQ29uZmlnOiAhdGhpcy5zdGF0ZS5zaG93UmFuZ2VDb25maWdcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBheGlzQ29uZmlnLFxuICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGUsIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGVcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGF4aXNOYW1lLCBzY2FsZSB9ID0gYXhpc0NvbmZpZztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF4aXMtY29uZmlndXJhdG9yIGNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPntheGlzTmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICA8QXhpc1NjYWxlU2VsZWN0b3JcbiAgICAgICAgICAgIHNjYWxlPXtzY2FsZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVNjYWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEJ1dHRvbiBzaXplPVwic21cIiBjbGFzc05hbWU9XCJteS0yXCIgb25DbGljaz17dGhpcy50b2dnbGVSYW5nZUNvbmZpZ30+VG9nZ2xlIHJhbmdlIHNldHRpbmc8L0J1dHRvbj5cbiAgICAgICAgICA8Q29sbGFwc2UgaXNPcGVuPXt0aGlzLnN0YXRlLnNob3dSYW5nZUNvbmZpZ30+XG4gICAgICAgICAgICA8QXhpc1JhbmdlQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgIGF4aXNDb25maWc9e2F4aXNDb25maWd9XG4gICAgICAgICAgICAgIGlzTWluPXtmYWxzZX1cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGU9e29uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlfVxuICAgICAgICAgICAgICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlPXtvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxBeGlzUmFuZ2VDb25maWd1cmF0b3JcbiAgICAgICAgICAgICAgYXhpc0NvbmZpZz17YXhpc0NvbmZpZ31cbiAgICAgICAgICAgICAgaXNNaW5cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGU9e29uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlfVxuICAgICAgICAgICAgICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlPXtvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkF4aXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICBheGlzQ29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4aXNOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2NhbGVSYW5nZTogUHJvcFR5cGVzLm9iamVjdE9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgcmFuZ2VUeXBlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZyksXG4gICAgICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKVxuICAgICAgfSlcbiAgICApXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuZWxlbWVudCxcbiAgb25DaGFuZ2VTY2FsZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VOdW1iZXJVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5BeGlzQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgY2hpbGRyZW46IG51bGxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXNDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0F4aXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cblxuY29uc3Qgc2NhbGVPcHRpb25zID0gWydsaW5lYXInLCAnbG9nJ107XG5cbmNvbnN0IEF4aXNTY2FsZVNlbGVjdG9yID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgc2NhbGUsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgY29uc3QgaGFuZGxlQ2hhbmdlQXhpc0tleSA9IChlKSA9PiB7XG4gICAgb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2FsZU9wdGlvbnMubWFwKChzY2FsZUtleSkgPT4gKFxuICAgIDxvcHRpb24gdmFsdWU9e3NjYWxlS2V5fSBrZXk9e3NjYWxlS2V5fT57c2NhbGVLZXl9PC9vcHRpb24+XG4gICkpO1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgaWQ9XCJheGlzLXNjYWxlLXNlbGVjdG9yLXNlbGVjdFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtzY2FsZX0gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZUF4aXNLZXl9PlxuICAgICAge29wdGlvbnN9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5BeGlzU2NhbGVTZWxlY3Rvci5wcm9wVHlwZXMgPSB7XG4gIHNjYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbkF4aXNTY2FsZVNlbGVjdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2NhbGU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXNTY2FsZVNlbGVjdG9yO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BeGlzU2NhbGVTZWxlY3Rvci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZvcm0sIEZvcm1Hcm91cCwgTGFiZWwsIElucHV0IH0gZnJvbSAncmVhY3RzdHJhcCc7XG5cblxuY2xhc3MgQXhpc1JhbmdlQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGFuZGxlUmFuZ2VUeXBlQ2hhbmdlID0gdGhpcy5oYW5kbGVSYW5nZVR5cGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU51bWJlckNoYW5nZSA9IHRoaXMuaGFuZGxlTnVtYmVyQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVSYW5nZVR5cGVDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgYXhpc0NvbmZpZywgaXNNaW4sIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgYXhpc05hbWUsIHNjYWxlID0gJ2xpbmVhcicgfSA9IGF4aXNDb25maWc7XG4gICAgb25BeGlzQ29uZmlnU2NhbGVSYW5nZVR5cGVVcGRhdGUoYXhpc05hbWUsIHNjYWxlLCBpc01pbiwgZS50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlTnVtYmVyQ2hhbmdlKGUpIHtcbiAgICBjb25zdCB7IGF4aXNDb25maWcsIGlzTWluLCBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgYXhpc05hbWUsIHNjYWxlID0gJ2xpbmVhcicgfSA9IGF4aXNDb25maWc7XG5cbiAgICBsZXQgcmFuZ2VOdW1iZXIgPSBudWxsO1xuICAgIGlmIChlLnRhcmdldC52YWx1ZSkge1xuICAgICAgY29uc3QgbnVtID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgIHJhbmdlTnVtYmVyID0gKGlzTmFOKG51bSkgfHwgIWlzRmluaXRlKG51bSkpID8gbnVsbCA6IG51bTtcbiAgICB9XG5cbiAgICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlKGF4aXNOYW1lLCBzY2FsZSwgaXNNaW4sIHJhbmdlTnVtYmVyKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGF4aXNDb25maWcsIGlzTWluIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc2NhbGUgPSAnbGluZWFyJywgc2NhbGVSYW5nZSA9IHt9IH0gPSBheGlzQ29uZmlnO1xuICAgIGNvbnN0IHJhbmdlQ29uZmlnID0gc2NhbGVSYW5nZVtzY2FsZV0gfHwge307XG4gICAgY29uc3QgeyByYW5nZVR5cGVzID0gW10sIHJhbmdlID0gW10gfSA9IHJhbmdlQ29uZmlnO1xuICAgIGNvbnN0IHJhbmdlVHlwZSA9IHJhbmdlVHlwZXNbaXNNaW4gPyAwIDogMV0gfHwgJ2F1dG8nO1xuICAgIGNvbnN0IHJhbmdlTnVtYmVyID0gcmFuZ2VbaXNNaW4gPyAwIDogMV07XG4gICAgY29uc3QgaXNOdW1iZXJJbnZhbGlkID0gKHJhbmdlVHlwZSA9PT0gJ251bWJlcicgJiYgKHJhbmdlTnVtYmVyID09IG51bGwgfHwgcmFuZ2VOdW1iZXIgPT09ICcnKSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm0gb25TdWJtaXQ9eyhlKSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgfX0+XG4gICAgICAgIDxGb3JtR3JvdXAgdGFnPVwiZmllbGRzZXRcIj5cbiAgICAgICAgICA8bGVnZW5kPjxzbWFsbD57aXNNaW4gPyAnTWluJyA6ICdNYXgnfTwvc21hbGw+PC9sZWdlbmQ+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLXJvd1wiPlxuICAgICAgICAgICAgPEZvcm1Hcm91cCBjaGVjayBjbGFzc05hbWU9XCJjb2wtc20tM1wiPlxuICAgICAgICAgICAgICA8TGFiZWwgY2hlY2s+XG4gICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInJhbmdlLWF1dG9cIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9XCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtyYW5nZVR5cGUgPT09ICdhdXRvJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlVHlwZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPiBhdXRvXG4gICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDxGb3JtR3JvdXAgY2hlY2sgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj5cbiAgICAgICAgICAgICAgPExhYmVsIGNoZWNrPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJyYW5nZS1kYXRhLW1pbi1vci1tYXhcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2lzTWluID8gJ2RhdGFNaW4nIDogJ2RhdGFNYXgnfVxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3JhbmdlVHlwZSA9PT0gKGlzTWluID8gJ2RhdGFNaW4nIDogJ2RhdGFNYXgnKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJhbmdlVHlwZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPiBkYXRhIHtpc01pbiA/ICdtaW4nIDogJ21heCd9XG4gICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgICAgIDxGb3JtR3JvdXAgY2hlY2sgY2xhc3NOYW1lPVwiY29sLXNtLTVcIj5cbiAgICAgICAgICAgICAgPExhYmVsIGNoZWNrPlxuICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhZGlvXCJcbiAgICAgICAgICAgICAgICAgIG5hbWU9XCJyYW5nZS1udW1iZXJcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgc2l6ZT1cInNtXCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3JhbmdlVHlwZSA9PT0gJ251bWJlcid9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSYW5nZVR5cGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aXNOdW1iZXJJbnZhbGlkID8gJ2lzLWludmFsaWQnIDogJyd9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCJhbnlcIlxuICAgICAgICAgICAgICAgICAgbmFtZT1cInJhbmdlLW51bWJlci12YWx1ZVwiXG4gICAgICAgICAgICAgICAgICBzaXplPVwic21cIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9eyhyYW5nZU51bWJlciA9PSBudWxsIHx8IHJhbmdlTnVtYmVyID09PSAnJykgPyAnJyA6IHJhbmdlTnVtYmVyfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JhbmdlVHlwZSAhPT0gJ251bWJlcid9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVOdW1iZXJDaGFuZ2V9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9MYWJlbD5cbiAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgIDwvRm9ybT5cbiAgICApO1xuICB9XG59XG5cbkF4aXNSYW5nZUNvbmZpZ3VyYXRvci5wcm9wVHlwZXMgPSB7XG4gIGF4aXNDb25maWc6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXhpc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBzY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzY2FsZVJhbmdlOiBQcm9wVHlwZXMub2JqZWN0T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICByYW5nZVR5cGVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKSxcbiAgICAgICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpXG4gICAgICB9KVxuICAgIClcbiAgfSkuaXNSZXF1aXJlZCxcbiAgaXNNaW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ1NjYWxlUmFuZ2VUeXBlVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkF4aXNDb25maWdTY2FsZVJhbmdlTnVtYmVyVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5BeGlzUmFuZ2VDb25maWd1cmF0b3IuZGVmYXVsdFByb3BzID0ge1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpc1JhbmdlQ29uZmlndXJhdG9yO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BeGlzUmFuZ2VDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBCdXR0b24sIE1vZGFsLCBNb2RhbEhlYWRlciwgTW9kYWxCb2R5LCBNb2RhbEZvb3RlciB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuaW1wb3J0IHsgbGluZTJrZXkgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgTGluZXNDb25maWd1cmF0b3JSb3cgZnJvbSAnLi9MaW5lc0NvbmZpZ3VyYXRvclJvdyc7XG5pbXBvcnQgTGluZUNvbmZpZ3VyYXRvciBmcm9tICcuL0xpbmVDb25maWd1cmF0b3InO1xuXG5cbmNvbnN0IGRlZmF1bHRMaW5lID0ge1xuICBjb25maWc6IHtcbiAgICBjb2xvcjogJyNBQkNERUYnLFxuICAgIGlzVmlzaWJsZTogdHJ1ZVxuICB9XG59O1xuXG5jb25zdCBjaGVja0Vycm9ycyA9IChsaW5lID0gZGVmYXVsdExpbmUsIGlzTmV3TGluZSwgdGFyZ2V0TGluZUtleSwgbGluZXMpID0+IHtcbiAgY29uc3QgaGFzU2FtZUxpbmUgPSBpc05ld0xpbmUgP1xuICAgIGxpbmVzLnNvbWUoKGwpID0+IGxpbmUya2V5KGwpID09PSBsaW5lMmtleShsaW5lKSkgOlxuICAgICh0YXJnZXRMaW5lS2V5ICE9PSBsaW5lMmtleShsaW5lKSAmJiBsaW5lcy5zb21lKChsKSA9PiBsaW5lMmtleShsKSA9PT0gbGluZTJrZXkobGluZSkpKTtcblxuICByZXR1cm4ge1xuICAgIHJlc3VsdElkTm9uZTogIU51bWJlci5pc0ludGVnZXIobGluZS5yZXN1bHRJZCksXG4gICAgbG9nS2V5Tm9uZTogIWxpbmUubG9nS2V5LFxuICAgIGhhc1NhbWVMaW5lXG4gIH07XG59O1xuXG5jb25zdCBoYXNFcnJvciA9IChlcnJvcnMgPSB7fSkgPT4ge1xuICBjb25zdCB7IHJlc3VsdElkTm9uZSwgbG9nS2V5Tm9uZSwgaGFzU2FtZUxpbmUgfSA9IGVycm9ycztcbiAgcmV0dXJuIHJlc3VsdElkTm9uZSB8fCBsb2dLZXlOb25lIHx8IGhhc1NhbWVMaW5lO1xufTtcblxuXG5jbGFzcyBMaW5lc0NvbmZpZ3VyYXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlID0gdGhpcy5oYW5kbGVNb2RhbFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW9kYWxPcGVuID0gdGhpcy5oYW5kbGVNb2RhbE9wZW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UgPSB0aGlzLmhhbmRsZU1vZGFsQ2xvc2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUVkaXRpbmdMaW5lQ2hhbmdlID0gdGhpcy5oYW5kbGVFZGl0aW5nTGluZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGQgPSB0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lQWRkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVBeGlzQ29uZmlnTGluZVJlbW92ZSA9IHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVSZW1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUxpbmVWaXNpYmlsaXR5VXBkYXRlID0gdGhpcy5oYW5kbGVMaW5lVmlzaWJpbGl0eVVwZGF0ZS5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgICBzaG93RXJyb3I6IGZhbHNlLFxuICAgICAgZWRpdGluZ0xpbmU6IGRlZmF1bHRMaW5lLFxuICAgICAgaXNOZXdMaW5lOiB0cnVlXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZU1vZGFsVG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnNob3dNb2RhbCkge1xuICAgICAgdGhpcy5oYW5kbGVNb2RhbENsb3NlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFuZGxlTW9kYWxPcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlTW9kYWxPcGVuKGxpbmUgPSBkZWZhdWx0TGluZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgc2hvd0Vycm9yOiBmYWxzZSxcbiAgICAgIHRhcmdldExpbmVLZXk6IGxpbmUya2V5KGxpbmUpLFxuICAgICAgZWRpdGluZ0xpbmU6IGxpbmUsXG4gICAgICBpc05ld0xpbmU6IChsaW5lID09PSBkZWZhdWx0TGluZSksXG4gICAgICBlcnJvcnM6IHt9XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVNb2RhbENsb3NlKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2hvd01vZGFsOiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlRWRpdGluZ0xpbmVDaGFuZ2UobmV3TGluZSkge1xuICAgIGNvbnN0IHsgbGluZXMgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpc05ld0xpbmUsIHRhcmdldExpbmVLZXkgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgZXJyb3JzID0gY2hlY2tFcnJvcnMobmV3TGluZSwgaXNOZXdMaW5lLCB0YXJnZXRMaW5lS2V5LCBsaW5lcyk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGVkaXRpbmdMaW5lOiBuZXdMaW5lLFxuICAgICAgZXJyb3JzXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZUFkZCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBheGlzTmFtZSxcbiAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQsIG9uQXhpc0NvbmZpZ0xpbmVVcGRhdGUsXG4gICAgICBsaW5lc1xuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgdGFyZ2V0TGluZUtleSwgZWRpdGluZ0xpbmUsIGlzTmV3TGluZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBlcnJvcnMgPSBjaGVja0Vycm9ycyhlZGl0aW5nTGluZSwgaXNOZXdMaW5lLCB0YXJnZXRMaW5lS2V5LCBsaW5lcyk7XG5cbiAgICBpZiAoaGFzRXJyb3IoZXJyb3JzKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dFcnJvcjogdHJ1ZSwgZXJyb3JzIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNOZXdMaW5lKSB7XG4gICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQoYXhpc05hbWUsIGVkaXRpbmdMaW5lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVVcGRhdGUoYXhpc05hbWUsIHRhcmdldExpbmVLZXksIGVkaXRpbmdMaW5lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaGFuZGxlTW9kYWxDbG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUF4aXNDb25maWdMaW5lUmVtb3ZlKGxpbmVLZXkpIHtcbiAgICBjb25zdCB7IGF4aXNOYW1lLCBvbkF4aXNDb25maWdMaW5lUmVtb3ZlIH0gPSB0aGlzLnByb3BzO1xuICAgIG9uQXhpc0NvbmZpZ0xpbmVSZW1vdmUoYXhpc05hbWUsIGxpbmVLZXkpO1xuICB9XG5cbiAgaGFuZGxlTGluZVZpc2liaWxpdHlVcGRhdGUodGFyZ2V0TGluZUtleSwgbGluZSkge1xuICAgIGNvbnN0IHsgYXhpc05hbWUsIG9uQXhpc0NvbmZpZ0xpbmVVcGRhdGUgfSA9IHRoaXMucHJvcHM7XG4gICAgb25BeGlzQ29uZmlnTGluZVVwZGF0ZShheGlzTmFtZSwgdGFyZ2V0TGluZUtleSwgbGluZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHRzLCBsaW5lcyA9IFtdIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgZWRpdGluZ0xpbmUsIGlzTmV3TGluZSwgZXJyb3JzLCBzaG93RXJyb3IgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBsaW5lQ29uZmlndXJhdG9yRWxlbXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbbGluZS5yZXN1bHRJZF0gfHwge307XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclJvd1xuICAgICAgICAgIGxpbmU9e2xpbmV9XG4gICAgICAgICAgcmVzdWx0PXtyZXN1bHR9XG4gICAgICAgICAgb25FZGl0Q2xpY2s9e3RoaXMuaGFuZGxlTW9kYWxPcGVufVxuICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lUmVtb3ZlfVxuICAgICAgICAgIG9uVmlzaWJpbGl0eVVwZGF0ZT17dGhpcy5oYW5kbGVMaW5lVmlzaWJpbGl0eVVwZGF0ZX1cbiAgICAgICAgICBrZXk9e2xpbmUya2V5KGxpbmUpfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAgbGlzdC1ncm91cC1mbHVzaFwiPlxuICAgICAgICB7bGluZUNvbmZpZ3VyYXRvckVsZW1zfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgPEJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfT5BZGQ8L0J1dHRvbj5cblxuICAgICAgICAgIDxNb2RhbCBpc09wZW49e3RoaXMuc3RhdGUuc2hvd01vZGFsfSB0b2dnbGU9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9IGNsYXNzTmFtZT1cIlwiPlxuICAgICAgICAgICAgPE1vZGFsSGVhZGVyIHRvZ2dsZT17dGhpcy5oYW5kbGVNb2RhbFRvZ2dsZX0+e2lzTmV3TGluZSA/ICdBZGQgYSBsaW5lJyA6ICdFZGl0IGEgbGluZSd9PC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICAgIDxMaW5lQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICAgICAgICBsaW5lPXtlZGl0aW5nTGluZX1cbiAgICAgICAgICAgICAgICBlcnJvcnM9e3Nob3dFcnJvciA/IGVycm9ycyA6IHt9fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUVkaXRpbmdMaW5lQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Nb2RhbEJvZHk+XG4gICAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfT5DYW5jZWw8L0J1dHRvbj57JyAnfVxuICAgICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lQWRkfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtoYXNFcnJvcihzaG93RXJyb3IgPyBlcnJvcnMgOiB7fSl9XG4gICAgICAgICAgICAgID57aXNOZXdMaW5lID8gJ0FkZCcgOiAnU2F2ZSd9PC9CdXR0b24+XG4gICAgICAgICAgICA8L01vZGFsRm9vdGVyPlxuICAgICAgICAgIDwvTW9kYWw+XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxpbmVzQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGF4aXNOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGxpbmVzOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgcmVzdWx0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBsb2dLZXk6IFByb3BUeXBlcy5zdHJpbmdcbiAgICB9KVxuICApLFxuICBvbkF4aXNDb25maWdMaW5lQWRkOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkF4aXNDb25maWdMaW5lVXBkYXRlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5MaW5lc0NvbmZpZ3VyYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxpbmVzOiBbXVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGluZXNDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVzQ29uZmlndXJhdG9yLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtcbiAgUm93LCBDb2wsIEJ1dHRvbixcbiAgRm9ybSwgRm9ybUdyb3VwLCBMYWJlbCwgSW5wdXRcbn0gZnJvbSAncmVhY3RzdHJhcCc7XG5pbXBvcnQgeyBsaW5lMmtleSwgZGlzcGxheU5hbWUgfSBmcm9tICcuLi91dGlscyc7XG5cblxuY2xhc3MgTGluZXNDb25maWd1cmF0b3JSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaGFuZGxlRWRpdENsaWNrID0gdGhpcy5oYW5kbGVFZGl0Q2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVJlbW92ZUNsaWNrID0gdGhpcy5oYW5kbGVSZW1vdmVDbGljay5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTGluZVZpc2liaWxpdHlVcGRhdGUgPSB0aGlzLmhhbmRsZUxpbmVWaXNpYmlsaXR5VXBkYXRlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVFZGl0Q2xpY2soZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25FZGl0Q2xpY2sgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBvbkVkaXRDbGljayhsaW5lKTtcbiAgfVxuXG4gIGhhbmRsZVJlbW92ZUNsaWNrKGUpIHtcbiAgICBjb25zdCB7IGxpbmUsIG9uUmVtb3ZlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgb25SZW1vdmUobGluZTJrZXkobGluZSkpO1xuICB9XG5cbiAgaGFuZGxlTGluZVZpc2liaWxpdHlVcGRhdGUoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25WaXNpYmlsaXR5VXBkYXRlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29uZmlnIH0gPSBsaW5lO1xuICAgIGNvbnN0IHsgY2hlY2tlZCB9ID0gZS50YXJnZXQ7XG5cbiAgICBvblZpc2liaWxpdHlVcGRhdGUobGluZTJrZXkobGluZSksIHtcbiAgICAgIC4uLmxpbmUsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICBpc1Zpc2libGU6IGNoZWNrZWRcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUsIHJlc3VsdCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGNvbmZpZyA9IHt9IH0gPSBsaW5lO1xuICAgIGNvbnN0IHsgY29sb3IsIGlzVmlzaWJsZSB9ID0gY29uZmlnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibGlzdC1ncm91cC1pdGVtXCJcbiAgICAgICAga2V5PXtsaW5lMmtleShsaW5lKX1cbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyTGVmdDogYDNweCBzb2xpZCAke2NvbG9yfWAgfX1cbiAgICAgID5cbiAgICAgICAgPFJvdz5cbiAgICAgICAgICA8Q29sIHhzPVwiMlwiPlxuICAgICAgICAgICAgPEZvcm0+XG4gICAgICAgICAgICAgIDxGb3JtR3JvdXAgY2hlY2s+XG4gICAgICAgICAgICAgICAgPExhYmVsIGNoZWNrPlxuICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDaGVja2VkPXtpc1Zpc2libGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUxpbmVWaXNpYmlsaXR5VXBkYXRlfVxuICAgICAgICAgICAgICAgICAgLz57JyAnfVxuICAgICAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgPC9Gb3JtPlxuXG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIHNpemU9XCJzbVwiXG4gICAgICAgICAgICAgIGNvbG9yPVwibGlua1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm0tMCBwLTBcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRDbGlja31cbiAgICAgICAgICAgID5lZGl0PC9CdXR0b24+XG4gICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgPENvbD57ZGlzcGxheU5hbWUocmVzdWx0KX08L0NvbD5cbiAgICAgICAgICA8Q29sPntsaW5lLmxvZ0tleX08L0NvbD5cbiAgICAgICAgICA8Q29sIHhzPVwiMVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVJlbW92ZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9Db2w+XG4gICAgICAgIDwvUm93PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5lc0NvbmZpZ3VyYXRvclJvdy5wcm9wVHlwZXMgPSB7XG4gIGxpbmU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcmVzdWx0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbG9nS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlzVmlzaWJsZTogUHJvcFR5cGVzLmJvb2xcbiAgICB9KVxuICB9KS5pc1JlcXVpcmVkLFxuICByZXN1bHQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgcGF0aE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25FZGl0Q2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICBvblJlbW92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uVmlzaWJpbGl0eVVwZGF0ZTogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbkxpbmVzQ29uZmlndXJhdG9yUm93LmRlZmF1bHRQcm9wcyA9IHtcbiAgb25FZGl0Q2xpY2s6ICgpID0+IHt9LFxuICBvblJlbW92ZTogKCkgPT4ge30sXG4gIG9uVmlzaWJpbGl0eVVwZGF0ZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVzQ29uZmlndXJhdG9yUm93O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9MaW5lc0NvbmZpZ3VyYXRvclJvdy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZvcm0sIEZvcm1Hcm91cCwgTGFiZWwsIElucHV0LCBDb2xsYXBzZSwgQnV0dG9uLCBDb2wsIFJvdyB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuaW1wb3J0IHsgQ2hyb21lUGlja2VyLCBTd2F0Y2hlc1BpY2tlciB9IGZyb20gJ3JlYWN0LWNvbG9yJztcbmltcG9ydCB7IGRpc3BsYXlOYW1lIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5cbmNvbnN0IFJFU1VMVF9OT05FID0gLTE7XG5jb25zdCBMT0dfS0VZX05PTkUgPSAnJztcblxuY29uc3QgZ2V0TG9nS2V5cyA9IChyZXN1bHQgPSB7fSkgPT4ge1xuICBjb25zdCB7IGxvZ3MgPSBbXSB9ID0gcmVzdWx0O1xuICBjb25zdCBsb2dLZXlTZXQgPSB7fTtcbiAgbG9ncy5mb3JFYWNoKChsb2cpID0+IHtcbiAgICBjb25zdCB7IGxvZ0l0ZW1zID0gW10gfSA9IGxvZztcbiAgICBsb2dJdGVtcy5mb3JFYWNoKChsb2dJdGVtKSA9PiB7XG4gICAgICBsb2dLZXlTZXRbbG9nSXRlbS5rZXldID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhsb2dLZXlTZXQpO1xufTtcblxuY29uc3QgY3JlYXRlUmVzdWx0T3B0aW9uRWxlbXMgPSAocmVzdWx0cyA9IFtdKSA9PiBbXG4gIDxvcHRpb24gdmFsdWU9e1JFU1VMVF9OT05FfSBrZXk9e1JFU1VMVF9OT05FfSBkaXNhYmxlZD4tLSBzZWxlY3QgcmVzdWx0IC0tPC9vcHRpb24+LFxuICAuLi5PYmplY3Qua2V5cyhyZXN1bHRzKS5tYXAoKHJlc3VsdElkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxvcHRpb24gdmFsdWU9e3Jlc3VsdC5pZH0ga2V5PXtyZXN1bHQuaWR9PntyZXN1bHQuaWR9OiB7ZGlzcGxheU5hbWUocmVzdWx0KX08L29wdGlvbj5cbiAgICApO1xuICB9KVxuXTtcblxuY29uc3QgY3JlYXRlTG9nS2V5T3B0aW9uRWxlbXMgPSAocmVzdWx0ID0ge30pID0+IHtcbiAgY29uc3QgbG9nS2V5cyA9IGdldExvZ0tleXMocmVzdWx0KTtcbiAgcmV0dXJuIFtcbiAgICA8b3B0aW9uIHZhbHVlPXtMT0dfS0VZX05PTkV9IGtleT17TE9HX0tFWV9OT05FfSBkaXNhYmxlZD4tLSBzZWxlY3QgbG9nIGtleSAtLTwvb3B0aW9uPixcbiAgICAuLi5sb2dLZXlzLm1hcCgobG9nS2V5KSA9PiAoXG4gICAgICA8b3B0aW9uIHZhbHVlPXtsb2dLZXl9IGtleT17bG9nS2V5fT57bG9nS2V5fTwvb3B0aW9uPlxuICAgICkpXG4gIF07XG59O1xuXG5jbGFzcyBMaW5lQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGFuZGxlUmVzdWx0Q2hhbmdlID0gdGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUxvZ0tleUNoYW5nZSA9IHRoaXMuaGFuZGxlTG9nS2V5Q2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVMaW5lQ29sb3JDaGFuZ2UgPSB0aGlzLmhhbmRsZUxpbmVDb2xvckNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlVmlzaWJpbGl0eUNoYW5nZSA9IHRoaXMuaGFuZGxlVmlzaWJpbGl0eUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMudG9nZ2xlUGlja2VyID0gdGhpcy50b2dnbGVQaWNrZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7IGNvbG9yUGlja2VyQ29sbGFwc2U6IGZhbHNlIH07XG4gIH1cblxuICB0b2dnbGVQaWNrZXIoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNvbG9yUGlja2VyQ29sbGFwc2U6ICF0aGlzLnN0YXRlLmNvbG9yUGlja2VyQ29sbGFwc2UgfSk7XG4gIH1cblxuICBoYW5kbGVSZXN1bHRDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3UmVzdWx0SWQgPSBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApO1xuICAgIG9uQ2hhbmdlKHsgLi4ubGluZSwgcmVzdWx0SWQ6IG5ld1Jlc3VsdElkIH0pO1xuICB9XG5cbiAgaGFuZGxlTG9nS2V5Q2hhbmdlKGUpIHtcbiAgICBjb25zdCB7IGxpbmUsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0xvZ0tleSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIG9uQ2hhbmdlKHsgLi4ubGluZSwgbG9nS2V5OiBuZXdMb2dLZXkgfSk7XG4gIH1cblxuICBoYW5kbGVMaW5lQ29sb3JDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjb25maWcgfSA9IGxpbmU7XG4gICAgY29uc3QgeyBoZXggfSA9IGU7XG4gICAgb25DaGFuZ2Uoe1xuICAgICAgLi4ubGluZSxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICAuLi5jb25maWcsXG4gICAgICAgIGNvbG9yOiBoZXhcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBjaGVja2VkIH0gPSBlLnRhcmdldDtcbiAgICBjb25zdCB7IGNvbmZpZyB9ID0gbGluZTtcbiAgICBvbkNoYW5nZSh7XG4gICAgICAuLi5saW5lLFxuICAgICAgY29uZmlnOiB7XG4gICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgaXNWaXNpYmxlOiBjaGVja2VkXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHRzLCBsaW5lID0ge30sIGVycm9ycyA9IHt9IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcmVzdWx0SWQgPSBSRVNVTFRfTk9ORSwgbG9nS2V5ID0gTE9HX0tFWV9OT05FLCBjb25maWcgPSB7fSB9ID0gbGluZTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXSB8fCB7fTtcbiAgICBjb25zdCB7IGNvbG9yLCBpc1Zpc2libGUgfSA9IGNvbmZpZztcblxuICAgIGNvbnN0IGNvbG9yQmxvY2tTdHlsZSA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0T3B0aW9uRWxlbXMgPSBjcmVhdGVSZXN1bHRPcHRpb25FbGVtcyhyZXN1bHRzKTtcbiAgICBjb25zdCBsb2dLZXlPcHRpb25FbGVtcyA9IGNyZWF0ZUxvZ0tleU9wdGlvbkVsZW1zKHJlc3VsdCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5lLWNvbmZpZ3VyYXRvclwiPlxuICAgICAgICA8Rm9ybT5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsPmNvbG9yPC9MYWJlbD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbG9yQmxvY2tTdHlsZX0+e2NvbG9yfTwvZGl2PlxuICAgICAgICAgICAgPENvbGxhcHNlIGlzT3Blbj17dGhpcy5zdGF0ZS5jb2xvclBpY2tlckNvbGxhcHNlfT5cbiAgICAgICAgICAgICAgPENocm9tZVBpY2tlclxuICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgICAgICBkaXNhYmxlQWxwaGFcbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVMaW5lQ29sb3JDaGFuZ2V9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbGxhcHNlPlxuICAgICAgICAgICAgPENvbGxhcHNlIGlzT3Blbj17IXRoaXMuc3RhdGUuY29sb3JQaWNrZXJDb2xsYXBzZX0+XG4gICAgICAgICAgICAgIDxTd2F0Y2hlc1BpY2tlclxuICAgICAgICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICAgICAgICB3aWR0aD17NDcwfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUxpbmVDb2xvckNoYW5nZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29sbGFwc2U+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e3RoaXMudG9nZ2xlUGlja2VyfSBzaXplPVwic21cIiBjbGFzc05hbWU9XCJteS0yXCI+VG9nZ2xlIGNvbG9yIHBpY2tlcjwvQnV0dG9uPlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3ItcmVzdWx0LXNlbGVjdFwiPnJlc3VsdDwvTGFiZWw+PGJyIC8+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtlcnJvcnMucmVzdWx0SWROb25lID8gJyBpcy1pbnZhbGlkJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VsZWN0XCJcbiAgICAgICAgICAgICAgaWQ9XCJsaW5lLWNvbmZpZ3VyYXRvci1yZXN1bHQtc2VsZWN0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3Jlc3VsdElkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2V9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtyZXN1bHRPcHRpb25FbGVtc31cbiAgICAgICAgICAgIDwvSW5wdXQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImludmFsaWQtZmVlZGJhY2tcIj5cbiAgICAgICAgICAgICAgU2VsZWN0IGEgcmVzdWx0ISFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3ItbG9nLWtleS1zZWxlY3RcIj5sb2cga2V5PC9MYWJlbD48YnIgLz5cbiAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wke2Vycm9ycy5sb2dLZXlOb25lID8gJyBpcy1pbnZhbGlkJyA6ICcnfWB9XG4gICAgICAgICAgICAgIHR5cGU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VsZWN0XCJcbiAgICAgICAgICAgICAgaWQ9XCJsaW5lLWNvbmZpZ3VyYXRvci1sb2cta2V5LXNlbGVjdFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtsb2dLZXl9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZXN1bHRJZCA9PT0gUkVTVUxUX05PTkV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUxvZ0tleUNoYW5nZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xvZ0tleU9wdGlvbkVsZW1zfVxuICAgICAgICAgICAgPC9JbnB1dD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW52YWxpZC1mZWVkYmFja1wiPlxuICAgICAgICAgICAgICBTZWxlY3QgYSBsb2cga2V5ISFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8Um93PlxuICAgICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3Itc2VsZWN0LXZpc2liaWxpdHlcIiBzbT17eyBzaXplOiAyIH19PnZpc2liaWxpdHk8L0xhYmVsPlxuICAgICAgICAgICAgICA8Q29sIHNtPXt7IHNpemU6IDEwIH19PlxuICAgICAgICAgICAgICAgIDxGb3JtR3JvdXAgY2hlY2s+XG4gICAgICAgICAgICAgICAgICA8TGFiZWwgY2hlY2s+XG4gICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgaWQ9XCJsaW5lLWNvbmZpZ3VyYXRvci1zZWxlY3QtdmlzaWJpbGl0eVwiXG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdENoZWNrZWQ9e2lzVmlzaWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVWaXNpYmlsaXR5Q2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAvPnsnICd9XG4gICAgICAgICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgICAgICA8L0NvbD5cbiAgICAgICAgICAgIDwvUm93PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sJHtlcnJvcnMuaGFzU2FtZUxpbmUgPyAnIGlzLWludmFsaWQnIDogJyd9YH1cbiAgICAgICAgICAgICAgaGlkZGVuXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnZhbGlkLWZlZWRiYWNrXCI+XG4gICAgICAgICAgICAgIENhbm5vdCBhZGQgdGhpcyBsaW5lIGJlY2F1c2UgaXQgYWxyZWFkeSBleGlzdHMuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5lQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGxpbmU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcmVzdWx0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbG9nS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgaXNWaXNpYmxlOiBQcm9wVHlwZXMuYm9vbFxuICAgIH0pXG4gIH0pLFxuICBlcnJvcnM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcmVzdWx0SWROb25lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBsb2dLZXlOb25lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBoYXNTYW1lTGluZTogUHJvcFR5cGVzLmJvb2xcbiAgfSksXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuTGluZUNvbmZpZ3VyYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxpbmU6IHt9LFxuICBlcnJvcnM6IHt9LFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cblxuY29uc3Qga2V5T3B0aW9ucyA9IFsnZXBvY2gnLCAnaXRlcmF0aW9uJywgJ2VsYXBzZWRfdGltZSddO1xuXG5jb25zdCBYQXhpc0tleVNlbGVjdG9yID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgdmFsdWUsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgY29uc3QgaGFuZGxlQ2hhbmdlWEF4aXNLZXkgPSAoZSkgPT4ge1xuICAgIG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBvcHRpb25zID0ga2V5T3B0aW9ucy5tYXAoKGtleSkgPT4gKFxuICAgIDxvcHRpb24gdmFsdWU9e2tleX0ga2V5PXtrZXl9PntrZXl9PC9vcHRpb24+XG4gICkpO1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgaWQ9XCJ4LWF4aXMta2V5LXNlbGVjdG9yLXNlbGVjdFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZVhBeGlzS2V5fT5cbiAgICAgIHtvcHRpb25zfVxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuWEF4aXNLZXlTZWxlY3Rvci5wcm9wVHlwZXMgPSB7XG4gIHZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcbn07XG5cblhBeGlzS2V5U2VsZWN0b3IuZGVmYXVsdFByb3BzID0ge1xuICB2YWx1ZTogJycsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgWEF4aXNLZXlTZWxlY3RvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvWEF4aXNLZXlTZWxlY3Rvci5qc3giXSwic291cmNlUm9vdCI6IiJ9