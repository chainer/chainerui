webpackJsonp([0],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return RESULTS_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return RESULTS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return RESULTS_FAILUE; });
/* unused harmony export RESULT_UPDATE_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return RESULT_UPDATE_SUCCESS; });
/* unused harmony export RESULT_UPDATE_FAILUE */
/* unused harmony export RESULT_DELETE_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return RESULT_DELETE_SUCCESS; });
/* unused harmony export RESULT_DELETE_FAILUE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return COMMAND_CREATE_REQUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return COMMAND_CREATE_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return COMMAND_CREATE_FAILUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return loadResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return updateResult; });
/* unused harmony export deleteResult */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return createCommand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CONFIG_RESET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return resetConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return AXIS_CONFIG_SCALE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return AXIS_CONFIG_X_KEY_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "x", function() { return updateAxisScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return updateXAxisKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return updateAxisScaleRangeType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return updateAxisScaleRangeNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return toggleLogKeySelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return RESULTS_CONFIG_SELECT_TOGGLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return toggleResultsConfigSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return LINES_CONFIG_LINE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return updateLineInAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return GLOBAL_CONFIG_POLLING_RATE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return GLOBAL_CONFIG_CHART_SIZE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return updateGlobalPollingRate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return updateGlobalChartSize; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware_api__ = __webpack_require__(316);
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
var COMMAND_CREATE_REQUEST = 'COMMAND_CREATE_REQUEST';
var COMMAND_CREATE_SUCCESS = 'COMMAND_CREATE_SUCCESS';
var COMMAND_CREATE_FAILUE = 'COMMAND_CREATE_FAILUE';

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
      name = result.name,
      isUnregistered = result.isUnregistered;

  if (!Number.isInteger(id)) {
    throw new Error('Result id is invalid.');
  }
  return _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__middleware_api__["a" /* CALL_API */], {
    types: [RESULT_UPDATE_REQUEST, RESULT_UPDATE_SUCCESS, RESULT_UPDATE_FAILUE],
    endpoint: 'results/' + id,
    method: 'PUT',
    body: { result: { id: id, name: name, isUnregistered: isUnregistered } }
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

var createCommand = function createCommand(resultId, commandName) {
  var requestBody = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (!Number.isInteger(resultId)) {
    throw new Error('Result id is invalid.');
  }
  return _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__middleware_api__["a" /* CALL_API */], {
    types: [COMMAND_CREATE_REQUEST, COMMAND_CREATE_SUCCESS, COMMAND_CREATE_FAILUE],
    endpoint: 'results/' + resultId + '/commands',
    method: 'POST',
    body: {
      name: commandName,
      body: requestBody
    }
  });
};

// config

var CONFIG_RESET = 'CONFIG_RESET';

var resetConfig = function resetConfig() {
  return {
    type: CONFIG_RESET
  };
};

// axis config

var AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';
var AXIS_CONFIG_X_KEY_UPDATE = 'AXIS_CONFIG_X_KEY_UPDATE';
var AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE';
var AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE = 'AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE';
var AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE = 'AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE';

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

var toggleLogKeySelect = function toggleLogKeySelect(axisName, logKey) {
  return {
    type: AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE,
    axisName: axisName,
    logKey: logKey
  };
};

// results config

var RESULTS_CONFIG_SELECT_TOGGLE = 'RESULTS_CONFIG_SELECT_TOGGLE';

var toggleResultsConfigSelect = function toggleResultsConfigSelect(resultId) {
  return {
    type: RESULTS_CONFIG_SELECT_TOGGLE,
    resultId: resultId
  };
};

// lines config

var LINES_CONFIG_LINE_UPDATE = 'LINES_CONFIG_LINE_UPDATE';

var updateLineInAxis = function updateLineInAxis(axisName, lineKey, line) {
  return {
    type: LINES_CONFIG_LINE_UPDATE,
    axisName: axisName,
    lineKey: lineKey,
    line: line
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

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHAINER_UI_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return chartSizeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return pollingOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return defaultConfig; });
var CHAINER_UI_VERSION = 'v0.0.7';

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

var defaultConfig = {
  axes: {},
  resultsConfig: {},
  lines: {},
  global: {}
};

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return line2key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return line2dataKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return truncate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return displayName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return line2name; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getLastLogDict; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return argValue2string; });
/* unused harmony export isJsonString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getSelectedResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getSelectedLogKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createLine; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__color__ = __webpack_require__(628);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_1__color__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__command_jsx__ = __webpack_require__(629);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_2__command_jsx__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__polling__ = __webpack_require__(630);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_3__polling__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_3__polling__["b"]; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return truncate(result.name, config) || truncate(result.pathName, _extends({}, config, { forward: true }));
};

var line2name = function line2name(line) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return displayName(result) + '/' + line.logKey;
};

var getLastLogDict = function getLastLogDict() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _result$logs = result.logs,
      logs = _result$logs === undefined ? [] : _result$logs;

  var lastLog = logs[logs.length - 1] || {};
  var _lastLog$logItems = lastLog.logItems,
      logItems = _lastLog$logItems === undefined ? [] : _lastLog$logItems;

  var lastLogDict = {};
  logItems.forEach(function (logItem) {
    lastLogDict[logItem.key] = logItem.value;
  });
  return lastLogDict;
};

var argValue2string = function argValue2string(argValue) {
  var emptyStr = '-';
  if (argValue == null) {
    return emptyStr;
  }
  return typeof argValue === 'boolean' ? String(argValue) : argValue;
};

var isJsonString = function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

var getSelectedResults = function getSelectedResults() {
  var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var resultsConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(results).filter(function (resultId) {
    return !resultsConfig[resultId] || !resultsConfig[resultId].hidden;
  }).map(function (resultId) {
    return Number(resultId);
  });
};

var getSelectedLogKeys = function getSelectedLogKeys() {
  var logKeysConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(logKeysConfig).filter(function (logKey) {
    return logKeysConfig[logKey].selected;
  });
};

var createLine = function createLine(resultId, logKey) {
  var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var logKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    resultId: resultId,
    logKey: logKey,
    config: {
      color: Object(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* lineColorGenerator */])(resultId, logKey, results, logKeys),
      isVisible: true
    }
  };
};

/***/ }),

/***/ 316:
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

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ResultsFetchState__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(132);
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
      var chartSize = __WEBPACK_IMPORTED_MODULE_4__constants__["b" /* chartSizeOptions */].find(function (o) {
        return o.id === selectedId;
      });
      this.props.onGlobalConfigChartSizeUpdate(chartSize);
    }
  }, {
    key: 'render',
    value: function render() {
      var pollingOptionElems = createPollingOptionElems(__WEBPACK_IMPORTED_MODULE_4__constants__["d" /* pollingOptions */]);
      var chartSizeElems = createVisualizerSizeOptionElems(__WEBPACK_IMPORTED_MODULE_4__constants__["b" /* chartSizeOptions */]);
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
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'p',
              { className: 'my-0' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'small',
                null,
                'Chainer UI ',
                __WEBPACK_IMPORTED_MODULE_4__constants__["a" /* CHAINER_UI_VERSION */]
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

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(457);


/***/ }),

/***/ 457:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Root__ = __webpack_require__(551);





var render = function render(Component, appNode) {
  __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__["AppContainer"],
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Component, null)
  ), appNode);
};

if (false) {
  var appNode = document.createElement('div');
  document.body.appendChild(appNode);
  render(Root, appNode);
  module.hot.accept('./containers/Root', function () {
    render(Root, appNode);
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    var appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(__WEBPACK_IMPORTED_MODULE_3__components_Root__["a" /* default */], appNode);
    }
  });
}

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_persist__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__store_configureStore__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__containers_ChainerUIContainer__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__containers_ResultDetail__ = __webpack_require__(990);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var store = Object(__WEBPACK_IMPORTED_MODULE_5__store_configureStore__["a" /* default */])();
var history = Object(__WEBPACK_IMPORTED_MODULE_4_react_router_redux__["syncHistoryWithStore"])(__WEBPACK_IMPORTED_MODULE_2_react_router__["browserHistory"], store);

var Root = function (_React$Component) {
  _inherits(Root, _React$Component);

  function Root() {
    _classCallCheck(this, Root);

    var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this));

    _this.state = {
      rehydrated: false
    };
    return _this;
  }

  _createClass(Root, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      Object(__WEBPACK_IMPORTED_MODULE_3_redux_persist__["persistStore"])(store, {}, function () {
        _this2.setState({ rehydrated: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.rehydrated) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          'loading...'
        );
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_1_react_redux__["Provider"],
        { store: store },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_react_router__["Router"],
          { history: history },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], { path: '/', component: __WEBPACK_IMPORTED_MODULE_6__containers_ChainerUIContainer__["a" /* default */] }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_react_router__["Route"], { path: '/results/(:resultId)', component: __WEBPACK_IMPORTED_MODULE_7__containers_ResultDetail__["a" /* default */] })
        )
      );
    }
  }]);

  return Root;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (Root);

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middleware_api__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers__ = __webpack_require__(609);






var configureStore = function configureStore(preloadedState) {
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_3__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_2_redux_logger__["createLogger"])()];

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_4__reducers__["a" /* default */], preloadedState, __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(undefined, middleware));

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_router_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_router_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_persist_es_storage__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(132);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_4__actions__["p" /* RESULTS_SUCCESS */]:
      if (action.response && action.response.results) {
        var resultsList = action.response.results;
        var results = {};
        resultsList.forEach(function (result) {
          results[result.id] = result;
        });
        return _extends({}, state, { results: results });
      }
      return state;
    case __WEBPACK_IMPORTED_MODULE_4__actions__["r" /* RESULT_UPDATE_SUCCESS */]:
      if (action.response && action.response.result) {
        var result = action.response.result;

        var newResults = _extends({}, state.results);
        if (result.isUnregistered) {
          delete newResults[result.id];
        } else {
          newResults[result.id] = result;
        }
        return _extends({}, state, {
          results: newResults
        });
      }
      return state;
    case __WEBPACK_IMPORTED_MODULE_4__actions__["q" /* RESULT_DELETE_SUCCESS */]:
      if (action.response && action.response.result) {
        var _result = action.response.result;

        var _newResults = _extends({}, state.results);
        delete _newResults[_result.id];
        return _extends({}, state, {
          results: _newResults
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
    case __WEBPACK_IMPORTED_MODULE_4__actions__["o" /* RESULTS_REQUEST */]:
    case __WEBPACK_IMPORTED_MODULE_4__actions__["p" /* RESULTS_SUCCESS */]:
    case __WEBPACK_IMPORTED_MODULE_4__actions__["n" /* RESULTS_FAILUE */]:
      return _extends({}, state, {
        results: action.type
      });
    case __WEBPACK_IMPORTED_MODULE_4__actions__["g" /* COMMAND_CREATE_REQUEST */]:
    case __WEBPACK_IMPORTED_MODULE_4__actions__["h" /* COMMAND_CREATE_SUCCESS */]:
    case __WEBPACK_IMPORTED_MODULE_4__actions__["f" /* COMMAND_CREATE_FAILUE */]:
      return _extends({}, state, {
        commandCreate: action.type
      });
    case __WEBPACK_IMPORTED_MODULE_4__actions__["k" /* GLOBAL_CONFIG_POLLING_RATE_UPDATE */]:
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

var defaultAxisState = {
  yLeftAxis: {
    axisName: 'yLeftAxis',
    logKeysConfig: {
      'main/loss': {
        selected: true
      }
    }
  }
};

var axes = function axes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultAxisState;
  var action = arguments[1];
  var axisName = action.axisName,
      logKey = action.logKey,
      _action$scale = action.scale,
      scale = _action$scale === undefined ? 'linear' : _action$scale,
      xAxisKey = action.xAxisKey,
      _action$rangeType = action.rangeType,
      rangeType = _action$rangeType === undefined ? 'auto' : _action$rangeType,
      isMin = action.isMin,
      rangeNumber = action.rangeNumber;

  var axisConfig = state[axisName] || { axisName: axisName };
  var _axisConfig$logKeysCo = axisConfig.logKeysConfig,
      logKeysConfig = _axisConfig$logKeysCo === undefined ? {} : _axisConfig$logKeysCo,
      _axisConfig$scaleRang = axisConfig.scaleRange,
      scaleRange = _axisConfig$scaleRang === undefined ? {} : _axisConfig$scaleRang;

  var idx = isMin ? 0 : 1;
  var rangeConfig = scaleRange[scale] || {};
  var _rangeConfig$rangeTyp = rangeConfig.rangeTypes,
      rangeTypes = _rangeConfig$rangeTyp === undefined ? [] : _rangeConfig$rangeTyp,
      _rangeConfig$range = rangeConfig.range,
      range = _rangeConfig$range === undefined ? [] : _rangeConfig$range;


  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_4__actions__["d" /* AXIS_CONFIG_SCALE_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scale: scale
      })));
    case __WEBPACK_IMPORTED_MODULE_4__actions__["e" /* AXIS_CONFIG_X_KEY_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        xAxisKey: xAxisKey
      })));
    case __WEBPACK_IMPORTED_MODULE_4__actions__["c" /* AXIS_CONFIG_SCALE_RANGE_TYPE_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scaleRange: _extends({}, scaleRange, _defineProperty({}, scale, {
          rangeTypes: Object.assign([], rangeTypes, _defineProperty({}, idx, rangeType)),
          range: range
        }))
      })));
    case __WEBPACK_IMPORTED_MODULE_4__actions__["b" /* AXIS_CONFIG_SCALE_RANGE_NUMBER_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scaleRange: _extends({}, scaleRange, _defineProperty({}, scale, {
          rangeTypes: rangeTypes,
          range: Object.assign([], range, _defineProperty({}, idx, rangeNumber))
        }))
      })));
    case __WEBPACK_IMPORTED_MODULE_4__actions__["a" /* AXIS_CONFIG_LOG_KEY_SELECT_TOGGLE */]:
      {
        var logKeyConfig = logKeysConfig[logKey] || {};
        return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
          logKeysConfig: _extends({}, logKeysConfig, _defineProperty({}, logKey, _extends({}, logKeyConfig, {
            selected: !logKeyConfig.selected
          })))

        })));
      }
    default:
      return state;
  }
};

var resultsConfigWithoutResult = function resultsConfigWithoutResult(state, resultId) {
  if (!Number.isInteger(resultId)) {
    return state;
  }
  var newState = {};
  Object.keys(state).forEach(function (id) {
    if (Number(id) === resultId) {
      return;
    }
    newState[id] = state[id];
  });
  return newState;
};

var resultsConfig = function resultsConfig() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var resultId = action.resultId;

  var resultConfig = state[resultId] || {};
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_4__actions__["m" /* RESULTS_CONFIG_SELECT_TOGGLE */]:
      if (resultId == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, Number(resultId), _extends({}, resultConfig, {
        hidden: !resultConfig.hidden
      })));
    case __WEBPACK_IMPORTED_MODULE_4__actions__["r" /* RESULT_UPDATE_SUCCESS */]:
      if (action.response && action.response.result) {
        var result = action.response.result;

        if (result.isUnregistered) {
          return resultsConfigWithoutResult(state, result.id);
        }
      }
      return state;
    case __WEBPACK_IMPORTED_MODULE_4__actions__["q" /* RESULT_DELETE_SUCCESS */]:
      return resultsConfigWithoutResult(state, resultId);
    default:
      return state;
  }
};

var lines = function lines() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var line = action.line,
      lineKey = action.lineKey;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_4__actions__["l" /* LINES_CONFIG_LINE_UPDATE */]:
      if (lineKey == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, lineKey, _extends({}, state[lineKey], line)));
    default:
      return state;
  }
};

var defaultGlobaState = {
  pollingRate: __WEBPACK_IMPORTED_MODULE_5__constants__["d" /* pollingOptions */][1].value,
  chartSize: __WEBPACK_IMPORTED_MODULE_5__constants__["b" /* chartSizeOptions */][0]
};

var global = function global() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultGlobaState;
  var action = arguments[1];
  var pollingRate = action.pollingRate,
      chartSize = action.chartSize;

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_4__actions__["k" /* GLOBAL_CONFIG_POLLING_RATE_UPDATE */]:
      return _extends({}, state, {
        pollingRate: pollingRate
      });

    case __WEBPACK_IMPORTED_MODULE_4__actions__["j" /* GLOBAL_CONFIG_CHART_SIZE_UPDATE */]:
      return _extends({}, state, {
        chartSize: chartSize
      });
    default:
      return state;
  }
};

var configReducers = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  axes: axes,
  resultsConfig: resultsConfig,
  lines: lines,
  global: global
});

var config = function config(state, action) {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_4__actions__["i" /* CONFIG_RESET */]:
      return configReducers(undefined, action);
    default:
      return configReducers(state, action);
  }
};

var currentStoreVersion = 20170911.0;

var persistConfig = {
  key: 'config',
  version: currentStoreVersion,
  storage: __WEBPACK_IMPORTED_MODULE_3_redux_persist_es_storage__["a" /* default */],
  migrate: function migrate(restoredState) {
    // eslint-disable-next-line no-underscore-dangle
    var persist = restoredState ? restoredState._persist : {};
    var restoredVersion = persist.version === undefined ? -1 : persist.version;
    if (restoredVersion < currentStoreVersion) {
      // ignore any restored state whoes version is older than currentStoreVersion
      return Promise.resolve(undefined);
    }
    return Promise.resolve(restoredState);
  }
};

var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  entities: entities,
  fetchState: fetchState,
  config: Object(__WEBPACK_IMPORTED_MODULE_2_redux_persist__["persistReducer"])(persistConfig, config),
  routing: __WEBPACK_IMPORTED_MODULE_1_react_router_redux__["routerReducer"]
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createWebStorage__ = __webpack_require__(611);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__createWebStorage__["a" /* default */])('local'));

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createWebStorage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getStorage__ = __webpack_require__(612);


function createWebStorage(type) {
  var storage = Object(__WEBPACK_IMPORTED_MODULE_0__getStorage__["a" /* default */])(type);
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
    }
  };
}

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getStorage;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function noop() {}

var noopStorage = {
  getItem: noop,
  setItem: noop,
  removeItem: noop
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

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_ExperimentsTable__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_LogVisualizer__ = __webpack_require__(631);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_NavigationBar__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_SideBar__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__constants__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils__ = __webpack_require__(30);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }













var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer() {
    _classCallCheck(this, ChainerUIContainer);

    return _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).apply(this, arguments));
  }

  _createClass(ChainerUIContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pollingRate = this.props.config.global.pollingRate;

      this.resultsPollingTimer = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["l" /* startPolling */])(this.props.loadResults, pollingRate);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var currentPollingRate = this.props.config.global.pollingRate;
      var nextPollingRate = nextProps.config.global.pollingRate;

      if (currentPollingRate !== nextPollingRate) {
        Object(__WEBPACK_IMPORTED_MODULE_10__utils__["m" /* stopPolling */])(this.resultsPollingTimer);
        this.resultsPollingTimer = Object(__WEBPACK_IMPORTED_MODULE_10__utils__["l" /* startPolling */])(this.props.loadResults, nextPollingRate);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      Object(__WEBPACK_IMPORTED_MODULE_10__utils__["m" /* stopPolling */])(this.resultsPollingTimer);
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
                stats: stats,
                config: config,
                onConfigReset: this.props.resetConfig,
                onAxisConfigLineUpdate: this.props.updateLineInAxis,
                onAxisConfigScaleUpdate: this.props.updateAxisScale,
                onAxisConfigXKeyUpdate: this.props.updateXAxisKey,
                onAxisConfigScaleRangeTypeUpdate: this.props.updateAxisScaleRangeType,
                onAxisConfigScaleRangeNumberUpdate: this.props.updateAxisScaleRangeNumber,
                onAxisConfigLogKeySelectToggle: this.props.toggleLogKeySelect
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-md-8 col-lg-9' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_LogVisualizer__["a" /* default */], {
                results: results,
                stats: stats,
                config: config
              }),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_ExperimentsTable__["a" /* default */], {
                results: results,
                stats: stats,
                config: config,
                onResultsConfigSelectToggle: this.props.toggleResultsConfigSelect,
                onResultUpdate: this.props.updateResult
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
  var axes = {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  };

  var _entities$results = entities.results,
      results = _entities$results === undefined ? {} : _entities$results;

  var argKeySet = {};
  var logKeySet = {};
  Object.keys(results).forEach(function (resultId) {
    var result = results[resultId];
    result.args.forEach(function (arg) {
      argKeySet[arg.key] = true;
    });
    result.logs.forEach(function (log) {
      log.logItems.forEach(function (logItem) {
        logKeySet[logItem.key] = true;
      });
    });
  });
  var argKeys = Object.keys(argKeySet);
  var logKeys = Object.keys(logKeySet).sort();

  return { axes: axes, argKeys: argKeys, logKeys: logKeys };
};

var mapStateToProps = function mapStateToProps(state) {
  var entities = state.entities,
      fetchState = state.fetchState,
      _state$config = state.config,
      config = _state$config === undefined ? __WEBPACK_IMPORTED_MODULE_9__constants__["c" /* defaultConfig */] : _state$config;
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
    resultsConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    global: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  loadResults: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateResult: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  resetConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateLineInAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  toggleLogKeySelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  toggleResultsConfigSelect: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateGlobalPollingRate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateGlobalChartSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateXAxisKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScaleRangeType: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScaleRangeNumber: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, {
  loadResults: __WEBPACK_IMPORTED_MODULE_4__actions__["t" /* loadResults */],
  updateResult: __WEBPACK_IMPORTED_MODULE_4__actions__["D" /* updateResult */],
  resetConfig: __WEBPACK_IMPORTED_MODULE_4__actions__["u" /* resetConfig */],
  updateLineInAxis: __WEBPACK_IMPORTED_MODULE_4__actions__["C" /* updateLineInAxis */],
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_4__actions__["x" /* updateAxisScale */],
  toggleLogKeySelect: __WEBPACK_IMPORTED_MODULE_4__actions__["v" /* toggleLogKeySelect */],
  toggleResultsConfigSelect: __WEBPACK_IMPORTED_MODULE_4__actions__["w" /* toggleResultsConfigSelect */],
  updateGlobalPollingRate: __WEBPACK_IMPORTED_MODULE_4__actions__["B" /* updateGlobalPollingRate */],
  updateGlobalChartSize: __WEBPACK_IMPORTED_MODULE_4__actions__["A" /* updateGlobalChartSize */],
  updateXAxisKey: __WEBPACK_IMPORTED_MODULE_4__actions__["E" /* updateXAxisKey */],
  updateAxisScaleRangeType: __WEBPACK_IMPORTED_MODULE_4__actions__["z" /* updateAxisScaleRangeType */],
  updateAxisScaleRangeNumber: __WEBPACK_IMPORTED_MODULE_4__actions__["y" /* updateAxisScaleRangeNumber */]
})(ChainerUIContainer));

/***/ }),

/***/ 626:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(627);




var ExperimentsTable = function ExperimentsTable(props) {
  var _props$results = props.results,
      results = _props$results === undefined ? {} : _props$results,
      stats = props.stats,
      config = props.config,
      onResultsConfigSelectToggle = props.onResultsConfigSelectToggle,
      onResultUpdate = props.onResultUpdate;
  var argKeys = stats.argKeys;
  var _config$resultsConfig = config.resultsConfig,
      resultsConfig = _config$resultsConfig === undefined ? {} : _config$resultsConfig;


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
      resultConfig: resultsConfig[resultId],
      key: key,
      onResultsConfigSelectToggle: onResultsConfigSelectToggle,
      onResultUpdate: onResultUpdate
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
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('th', null),
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
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultsConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
    }))
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  onResultsConfigSelectToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onResultUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ExperimentsTable);

/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_router__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(30);
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

    _this.handleSelectToggle = _this.handleSelectToggle.bind(_this);
    _this.handleResultNameChange = _this.handleResultNameChange.bind(_this);
    _this.handleResultNameKeyPress = _this.handleResultNameKeyPress.bind(_this);
    _this.handleResultUpdate = _this.handleResultUpdate.bind(_this);
    _this.handleUnregister = _this.handleUnregister.bind(_this);
    _this.toggleUnregisterModal = _this.toggleUnregisterModal.bind(_this);

    var result = _this.props.result;

    _this.state = {
      resultName: result.name
    };
    return _this;
  }

  _createClass(ResultRow, [{
    key: 'handleSelectToggle',
    value: function handleSelectToggle() {
      var _props = this.props,
          result = _props.result,
          onResultsConfigSelectToggle = _props.onResultsConfigSelectToggle;

      onResultsConfigSelectToggle(result.id);
    }
  }, {
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
      var _props2 = this.props,
          result = _props2.result,
          onResultUpdate = _props2.onResultUpdate;
      var resultName = this.state.resultName;

      if (resultName !== result.name) {
        onResultUpdate(_extends({}, result, { name: resultName }));
      }
    }
  }, {
    key: 'handleUnregister',
    value: function handleUnregister() {
      var _props3 = this.props,
          result = _props3.result,
          onResultUpdate = _props3.onResultUpdate;

      onResultUpdate(_extends({}, result, { isUnregistered: true }));
      this.toggleUnregisterModal();
    }
  }, {
    key: 'toggleUnregisterModal',
    value: function toggleUnregisterModal() {
      this.setState({
        showUnregisterModal: !this.state.showUnregisterModal
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          resultName = _state.resultName,
          showUnregisterModal = _state.showUnregisterModal;
      var _props4 = this.props,
          result = _props4.result,
          stats = _props4.stats,
          resultConfig = _props4.resultConfig;
      var args = result.args;


      var lastLogDict = Object(__WEBPACK_IMPORTED_MODULE_4__utils__["d" /* getLastLogDict */])(result);

      var argDict = {};
      args.forEach(function (arg) {
        argDict[arg.key] = arg.value;
      });
      var argElems = stats.argKeys.map(function (argKey) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          { key: 'args-' + argKey },
          Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* argValue2string */])(argDict[argKey])
        );
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'tr',
        { className: 'result-row' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', checked: !resultConfig.hidden, onChange: this.handleSelectToggle })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_react_router__["Link"],
            { to: 'results/' + result.id },
            result.id
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'form-control result-name',
            type: 'text',
            placeholder: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["n" /* truncate */])(result.pathName, { length: 22, forward: true }),
            value: resultName || '',
            onChange: this.handleResultNameChange,
            onKeyPress: this.handleResultNameKeyPress,
            onBlur: this.handleResultUpdate
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          { className: 'text-right' },
          lastLogDict.epoch
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          { className: 'text-right' },
          lastLogDict.iteration
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          { className: 'text-right' },
          lastLogDict.elapsed_time == null ? emptyStr : lastLogDict.elapsed_time.toFixed(2)
        ),
        argElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Button"],
            { className: 'close', 'aria-label': 'Close', onClick: this.toggleUnregisterModal },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'span',
              { 'aria-hidden': true },
              '\xD7'
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Modal"],
            { isOpen: showUnregisterModal },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_reactstrap__["ModalHeader"],
              null,
              'Unregister a result'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_reactstrap__["ModalBody"],
              null,
              'Are you sure to unregister ',
              Object(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* displayName */])(result),
              ' ?'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_3_reactstrap__["ModalFooter"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Button"],
                { color: 'secondary', onClick: this.toggleUnregisterModal },
                'Cancel'
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Button"],
                { color: 'danger', onClick: this.handleUnregister },
                'Unregister'
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
  resultConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
  }),
  onResultsConfigSelectToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onResultUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  },
  resultConfig: { hidden: false }
};

/* harmony default export */ __webpack_exports__["a"] = (ResultRow);

/***/ }),

/***/ 628:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export rgbFromHSV */
/* unused harmony export hexFromRGB */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return lineColorGenerator; });
var rgbFromHSV = function rgbFromHSV(_ref) {
  var h = _ref.h,
      s = _ref.s,
      v = _ref.v;

  var r = 0;
  var g = 0;
  var b = 0;
  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      r = v;g = t;b = p;break;
    case 1:
      r = q;g = v;b = p;break;
    case 2:
      r = p;g = v;b = t;break;
    case 3:
      r = p;g = q;b = v;break;
    case 4:
      r = t;g = p;b = v;break;
    case 5:
      r = v;g = p;b = q;break;
    default:
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

var hexFromRGB = function hexFromRGB(_ref2) {
  var r = _ref2.r,
      g = _ref2.g,
      b = _ref2.b;
  return "#" + (Math.pow(2, 24) + r * Math.pow(2, 16) + g * Math.pow(2, 8) + b).toString(16).slice(1);
};

var lineColorGenerator = function lineColorGenerator(resultId, logKey) {
  var results = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var logKeys = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var resultIds = Object.keys(results).sort().map(Number);
  var resultIdx = resultIds.indexOf(resultId);
  var logKeyIdx = logKeys.indexOf(logKey);
  var hsv = {
    h: resultIdx / Math.max(1, resultIds.length),
    s: 0.75,
    v: logKeyIdx / Math.max(1, logKeys.length) * 0.5 + 0.5
  };
  return hexFromRGB(rgbFromHSV(hsv));
};

/***/ }),

/***/ 629:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CommandStatus */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return responseStatusToIcon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var CommandStatus = {
  REQUEST_OPEN: 'OPEN',
  RESPONSE_SUCCESS: 'SUCCESS',
  RESPONSE_FAILUE: 'FAILUE'
};

var responseStatusToIcon = function responseStatusToIcon(status) {
  switch (status) {
    case CommandStatus.RESPONSE_SUCCESS:
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'oi oi-check text-success' });
    case CommandStatus.RESPONSE_FAILUE:
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'oi oi-x text-danger' });
    default:
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'oi oi-ellipses text-muted' });
  }
};

/***/ }),

/***/ 630:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return startPolling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return stopPolling; });
var startPolling = function startPolling(func, pollingRate) {
  func();
  if (pollingRate <= 0) {
    return null;
  }
  return setInterval(func, pollingRate);
};

var stopPolling = function stopPolling(timer) {
  clearInterval(timer);
};

/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(321);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(30);
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

var buildLineElem = function buildLineElem(line, axisName, result) {
  var _line$config = line.config,
      config = _line$config === undefined ? {} : _line$config;


  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Line"], {
    type: 'linear',
    name: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["i" /* line2name */])(line, result),
    dataKey: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* line2dataKey */])(line, axisName),
    yAxisId: axisName,
    stroke: config.color,
    connectNulls: true,
    isAnimationActive: false,
    key: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* line2dataKey */])(line, axisName)
  });
};

var buildLineElems = function buildLineElems(selectedResults, selectedLogKeys, axisName, results, config, logKeys) {
  var _config$lines = config.lines,
      lines = _config$lines === undefined ? {} : _config$lines;


  var lineElems = [];
  selectedResults.forEach(function (resultId) {
    var result = results[resultId];
    if (!result) {
      return;
    }
    selectedLogKeys.forEach(function (logKey) {
      var line = lines[Object(__WEBPACK_IMPORTED_MODULE_4__utils__["h" /* line2key */])({ resultId: resultId, logKey: logKey })] || Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* createLine */])(resultId, logKey, results, logKeys);
      if (line.config.isVisible) {
        lineElems.push(buildLineElem(line, axisName, result));
      }
    });
  });

  return lineElems;
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
          config = _props$config === undefined ? {} : _props$config,
          stats = _props.stats;
      var axes = config.axes,
          _config$resultsConfig = config.resultsConfig,
          resultsConfig = _config$resultsConfig === undefined ? {} : _config$resultsConfig,
          _config$lines2 = config.lines,
          lines = _config$lines2 === undefined ? {} : _config$lines2;
      var _stats$logKeys = stats.logKeys,
          logKeys = _stats$logKeys === undefined ? [] : _stats$logKeys;

      var _ref2 = axes || {},
          _ref2$xAxis = _ref2.xAxis,
          xAxis = _ref2$xAxis === undefined ? { axisName: 'xAxis' } : _ref2$xAxis,
          _ref2$yLeftAxis = _ref2.yLeftAxis,
          yLeftAxis = _ref2$yLeftAxis === undefined ? { axisName: 'yLeftAxis' } : _ref2$yLeftAxis,
          _ref2$yRightAxis = _ref2.yRightAxis,
          yRightAxis = _ref2$yRightAxis === undefined ? { axisName: 'yRightAxis' } : _ref2$yRightAxis;

      var _xAxis$xAxisKey = xAxis.xAxisKey,
          xAxisKey = _xAxis$xAxisKey === undefined ? 'epoch' : _xAxis$xAxisKey;

      var selectedResults = Object(__WEBPACK_IMPORTED_MODULE_4__utils__["f" /* getSelectedResults */])(results, resultsConfig);
      var selectedLogKeys = {
        yLeftAxis: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* getSelectedLogKeys */])(yLeftAxis.logKeysConfig),
        yRightAxis: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* getSelectedLogKeys */])(yRightAxis.logKeysConfig)
      };

      var dataDict = {}; // ex. 1: { epoch: 1, 12_main_loss: 0.011, ... }
      ['yLeftAxis', 'yRightAxis'].forEach(function (axisName) {
        selectedResults.forEach(function (resultId) {
          var result = results[resultId];
          if (result == null) {
            return;
          }
          selectedLogKeys[axisName].forEach(function (logKey) {
            var line = lines[Object(__WEBPACK_IMPORTED_MODULE_4__utils__["h" /* line2key */])({ resultId: resultId, logKey: logKey })] || Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* createLine */])(resultId, logKey, results, logKeys);
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
              dataDict[logDict[xAxisKey]][Object(__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* line2dataKey */])(line, axisName)] = logDict[logKey];
            });
          });
        });
      });
      var data = Object.keys(dataDict).map(function (key) {
        return dataDict[key];
      });

      var lineElems = [].concat(_toConsumableArray(buildLineElems(selectedResults, selectedLogKeys.yLeftAxis, 'yLeftAxis', results, config, logKeys)), _toConsumableArray(buildLineElems(selectedResults, selectedLogKeys.yRightAxis, 'yRightAxis', results, config, logKeys)));

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
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      logKeysConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
      }))
    })),
    resultsConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
    })),
    lines: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
        isVisible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
      })
    })),
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

/***/ 895:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(131);




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
      case __WEBPACK_IMPORTED_MODULE_2__actions__["o" /* RESULTS_REQUEST */]:
        colorClass = 'text-primary';
        break;
      case __WEBPACK_IMPORTED_MODULE_2__actions__["p" /* RESULTS_SUCCESS */]:
        colorClass = 'text-success';
        break;
      case __WEBPACK_IMPORTED_MODULE_2__actions__["n" /* RESULTS_FAILUE */]:
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

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AxesConfigurator__ = __webpack_require__(898);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var SideBar = function (_React$Component) {
  _inherits(SideBar, _React$Component);

  function SideBar(props) {
    _classCallCheck(this, SideBar);

    var _this = _possibleConstructorReturn(this, (SideBar.__proto__ || Object.getPrototypeOf(SideBar)).call(this, props));

    _this.handleModalToggle = _this.handleModalToggle.bind(_this);
    _this.handleConfigReset = _this.handleConfigReset.bind(_this);

    _this.state = {
      showModal: false
    };
    return _this;
  }

  _createClass(SideBar, [{
    key: 'handleModalToggle',
    value: function handleModalToggle() {
      this.setState({
        showModal: !this.state.showModal
      });
    }
  }, {
    key: 'handleConfigReset',
    value: function handleConfigReset() {
      this.handleModalToggle();
      this.props.onConfigReset();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          results = _props.results,
          stats = _props.stats,
          config = _props.config,
          onAxisConfigLineUpdate = _props.onAxisConfigLineUpdate,
          onAxisConfigScaleUpdate = _props.onAxisConfigScaleUpdate,
          onAxisConfigXKeyUpdate = _props.onAxisConfigXKeyUpdate,
          onAxisConfigScaleRangeTypeUpdate = _props.onAxisConfigScaleRangeTypeUpdate,
          onAxisConfigScaleRangeNumberUpdate = _props.onAxisConfigScaleRangeNumberUpdate,
          onAxisConfigLogKeySelectToggle = _props.onAxisConfigLogKeySelectToggle;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'side-bar' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__AxesConfigurator__["a" /* default */], {
          results: results,
          stats: stats,
          config: config,
          onAxisConfigLineUpdate: onAxisConfigLineUpdate,
          onAxisConfigScaleUpdate: onAxisConfigScaleUpdate,
          onAxisConfigXKeyUpdate: onAxisConfigXKeyUpdate,
          onAxisConfigScaleRangeTypeUpdate: onAxisConfigScaleRangeTypeUpdate,
          onAxisConfigScaleRangeNumberUpdate: onAxisConfigScaleRangeNumberUpdate,
          onAxisConfigLogKeySelectToggle: onAxisConfigLogKeySelectToggle
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
          { color: 'primary', className: 'm-2', onClick: this.handleModalToggle },
          'Reset settings'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Modal"],
          { isOpen: this.state.showModal, toggle: this.handleModalToggle, className: '' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalHeader"],
            { toggle: this.handleModalToggle },
            'Reset settings'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalBody"],
            null,
            'Are you sure to reset settings?'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalFooter"],
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { color: 'secondary', onClick: this.handleModalToggle },
              'Cancel'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { color: 'primary', className: 'mx-2', onClick: this.handleConfigReset },
              'Reset'
            )
          )
        )
      );
    }
  }]);

  return SideBar;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

SideBar.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    })
  }).isRequired,
  onConfigReset: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigXKeyUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLogKeySelectToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

SideBar.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (SideBar);

/***/ }),

/***/ 898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisConfigurator__ = __webpack_require__(899);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__XAxisKeySelector__ = __webpack_require__(987);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AxisLogKeySelector__ = __webpack_require__(988);







var AxesConfigurator = function AxesConfigurator(props) {
  var results = props.results,
      stats = props.stats,
      config = props.config,
      onAxisConfigLineUpdate = props.onAxisConfigLineUpdate,
      onAxisConfigScaleUpdate = props.onAxisConfigScaleUpdate,
      onAxisConfigXKeyUpdate = props.onAxisConfigXKeyUpdate,
      onAxisConfigScaleRangeTypeUpdate = props.onAxisConfigScaleRangeTypeUpdate,
      onAxisConfigScaleRangeNumberUpdate = props.onAxisConfigScaleRangeNumberUpdate,
      onAxisConfigLogKeySelectToggle = props.onAxisConfigLogKeySelectToggle;

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
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__AxisLogKeySelector__["a" /* default */], {
        axisConfig: yLeftAxis,
        stats: stats,
        onAxisConfigLogKeySelectToggle: onAxisConfigLogKeySelectToggle
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__["a" /* default */], {
        results: results,
        stats: stats,
        config: config,
        axisName: 'yLeftAxis',
        onAxisConfigLineUpdate: onAxisConfigLineUpdate
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
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__AxisLogKeySelector__["a" /* default */], {
        axisConfig: yRightAxis,
        stats: stats,
        onAxisConfigLogKeySelectToggle: onAxisConfigLogKeySelectToggle
      }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LinesConfigurator__["a" /* default */], {
        results: results,
        stats: stats,
        config: config,
        axisName: 'yRightAxis',
        onAxisConfigLineUpdate: onAxisConfigLineUpdate
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
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    })
  }).isRequired,
  onAxisConfigLineUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigXKeyUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLogKeySelectToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

AxesConfigurator.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (AxesConfigurator);

/***/ }),

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AxisScaleSelector__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__AxisRangeConfigurator__ = __webpack_require__(901);
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
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node), __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node]),
  onChangeScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeTypeUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleRangeNumberUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
AxisConfigurator.defaultProps = {
  children: null
};

/* harmony default export */ __webpack_exports__["a"] = (AxisConfigurator);

/***/ }),

/***/ 900:
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

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
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

/***/ 902:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__ = __webpack_require__(903);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LineConfigurator__ = __webpack_require__(904);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var LinesConfigurator = function (_React$Component) {
  _inherits(LinesConfigurator, _React$Component);

  function LinesConfigurator() {
    _classCallCheck(this, LinesConfigurator);

    var _this = _possibleConstructorReturn(this, (LinesConfigurator.__proto__ || Object.getPrototypeOf(LinesConfigurator)).call(this));

    _this.handleModalToggle = _this.handleModalToggle.bind(_this);
    _this.handleModalOpen = _this.handleModalOpen.bind(_this);
    _this.handleModalClose = _this.handleModalClose.bind(_this);
    _this.handleEditingLineChange = _this.handleEditingLineChange.bind(_this);
    _this.handleAxisConfigLineSave = _this.handleAxisConfigLineSave.bind(_this);
    _this.handleLineVisibilityUpdate = _this.handleLineVisibilityUpdate.bind(_this);

    _this.state = {
      showModal: false,
      editingLine: undefined
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
    value: function handleModalOpen(line) {
      this.setState({
        showModal: true,
        targetLineKey: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["h" /* line2key */])(line),
        editingLine: line
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
      this.setState({
        editingLine: newLine
      });
    }
  }, {
    key: 'handleAxisConfigLineSave',
    value: function handleAxisConfigLineSave() {
      var _props = this.props,
          axisName = _props.axisName,
          onAxisConfigLineUpdate = _props.onAxisConfigLineUpdate;
      var _state = this.state,
          targetLineKey = _state.targetLineKey,
          editingLine = _state.editingLine;

      onAxisConfigLineUpdate(axisName, targetLineKey, editingLine);
      this.handleModalClose();
    }
  }, {
    key: 'handleLineVisibilityUpdate',
    value: function handleLineVisibilityUpdate(targetLineKey, line) {
      var _props2 = this.props,
          axisName = _props2.axisName,
          onAxisConfigLineUpdate = _props2.onAxisConfigLineUpdate;

      onAxisConfigLineUpdate(axisName, targetLineKey, line);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          axisName = _props3.axisName,
          results = _props3.results,
          stats = _props3.stats,
          config = _props3.config;
      var editingLine = this.state.editingLine;
      var _stats$logKeys = stats.logKeys,
          logKeys = _stats$logKeys === undefined ? [] : _stats$logKeys;
      var _config$axes = config.axes,
          axes = _config$axes === undefined ? {} : _config$axes,
          _config$resultsConfig = config.resultsConfig,
          resultsConfig = _config$resultsConfig === undefined ? {} : _config$resultsConfig,
          _config$lines = config.lines,
          lines = _config$lines === undefined ? {} : _config$lines;

      var axisConfig = axes[axisName] || {};
      var _axisConfig$logKeysCo = axisConfig.logKeysConfig,
          logKeysConfig = _axisConfig$logKeysCo === undefined ? {} : _axisConfig$logKeysCo;


      var selectedResults = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["f" /* getSelectedResults */])(results, resultsConfig);
      var selectedLogKeys = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["e" /* getSelectedLogKeys */])(logKeysConfig);
      var lineConfiguratorElems = [];
      selectedResults.forEach(function (resultId) {
        var result = results[resultId];
        if (!result) {
          return;
        }
        selectedLogKeys.forEach(function (logKey) {
          var line = lines[Object(__WEBPACK_IMPORTED_MODULE_3__utils__["h" /* line2key */])({ resultId: resultId, logKey: logKey })] || Object(__WEBPACK_IMPORTED_MODULE_3__utils__["b" /* createLine */])(resultId, logKey, results, logKeys);
          lineConfiguratorElems.push(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__["a" /* default */], {
            line: line,
            result: result,
            onEditClick: _this2.handleModalOpen,
            onVisibilityUpdate: _this2.handleLineVisibilityUpdate,
            key: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["h" /* line2key */])(line)
          }));
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
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Modal"],
            { isOpen: this.state.showModal, toggle: this.handleModalToggle, className: '' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalHeader"],
              { toggle: this.handleModalToggle },
              'Edit a line'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalBody"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__LineConfigurator__["a" /* default */], {
                results: results,
                line: editingLine,
                stats: stats,
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
                  onClick: this.handleAxisConfigLineSave
                },
                'Save'
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
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      logKeysConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
      }))
    })),
    resultsConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      hidden: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
    })),
    lines: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
        isVisible: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
      })
    }))
  }),
  onAxisConfigLineUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

LinesConfigurator.defaultProps = {
  config: {}
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfigurator);

/***/ }),

/***/ 903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(30);
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
    key: 'handleLineVisibilityUpdate',
    value: function handleLineVisibilityUpdate(e) {
      var _props2 = this.props,
          line = _props2.line,
          onVisibilityUpdate = _props2.onVisibilityUpdate;
      var config = line.config;
      var checked = e.target.checked;


      onVisibilityUpdate(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["h" /* line2key */])(line), _extends({}, line, {
        config: _extends({}, config, {
          isVisible: checked
        })
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          line = _props3.line,
          result = _props3.result;
      var _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;
      var color = config.color,
          isVisible = config.isVisible;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: 'list-group-item py-0',
          key: Object(__WEBPACK_IMPORTED_MODULE_3__utils__["h" /* line2key */])(line),
          style: { borderLeft: '3px solid ' + color }
        },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Row"],
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            { xs: '3', lg: '2' },
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
                    checked: isVisible,
                    onChange: this.handleLineVisibilityUpdate
                  })
                )
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            { xs: '9', lg: '5', className: 'text-truncate', title: result.name || result.pathName },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '', className: 'text-dark', onClick: this.handleEditClick },
              Object(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* displayName */])(result, { length: 10 })
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Col"],
            { xs: '12', lg: '5', className: 'text-truncate', title: line.logKey },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'a',
              { href: '', className: 'text-dark', onClick: this.handleEditClick },
              line.logKey
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
  onVisibilityUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LinesConfiguratorRow.defaultProps = {
  onEditClick: function onEditClick() {},
  onVisibilityUpdate: function onVisibilityUpdate() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfiguratorRow);

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(30);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var RESULT_NONE = -1;
var LOG_KEY_NONE = '';

var LineConfigurator = function (_React$Component) {
  _inherits(LineConfigurator, _React$Component);

  function LineConfigurator() {
    _classCallCheck(this, LineConfigurator);

    var _this = _possibleConstructorReturn(this, (LineConfigurator.__proto__ || Object.getPrototypeOf(LineConfigurator)).call(this));

    _this.handleResultChange = _this.handleResultChange.bind(_this);
    _this.handleLogKeyChange = _this.handleLogKeyChange.bind(_this);
    _this.handleLineColorChange = _this.handleLineColorChange.bind(_this);
    _this.handleVisibilityChange = _this.handleVisibilityChange.bind(_this);
    _this.handleResetColorClick = _this.handleResetColorClick.bind(_this);
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
    key: 'handleResetColorClick',
    value: function handleResetColorClick() {
      var _props5 = this.props,
          line = _props5.line,
          results = _props5.results,
          stats = _props5.stats,
          onChange = _props5.onChange;
      var config = line.config;
      var _stats$logKeys = stats.logKeys,
          logKeys = _stats$logKeys === undefined ? [] : _stats$logKeys;

      onChange(_extends({}, line, {
        config: _extends({}, config, {
          color: Object(__WEBPACK_IMPORTED_MODULE_4__utils__["j" /* lineColorGenerator */])(line.resultId, line.logKey, results, logKeys)
        })
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          results = _props6.results,
          _props6$line = _props6.line,
          line = _props6$line === undefined ? {} : _props6$line;
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

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'line-configurator' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dl',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'dt',
            null,
            'result name'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'dd',
            null,
            Object(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* displayName */])(result)
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'dt',
            null,
            'log key'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'dd',
            null,
            logKey
          )
        ),
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
              { style: colorBlockStyle, className: 'mb-2' },
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
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_react_color__["GithubPicker"], {
                color: color,
                width: 212,
                onChange: this.handleLineColorChange
              })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { onClick: this.togglePicker, size: 'sm', className: 'my-2' },
              'Toggle color picker'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
              { onClick: this.handleResetColorClick, size: 'sm', className: 'm-2' },
              'Reset color'
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
                      checked: isVisible,
                      onChange: this.handleVisibilityChange
                    }),
                    ' '
                  )
                )
              )
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
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LineConfigurator.defaultProps = {
  line: {},
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LineConfigurator);

/***/ }),

/***/ 987:
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

/***/ }),

/***/ 988:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisLogKeySelectorRow__ = __webpack_require__(989);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var AxisLogKeySelector = function (_React$Component) {
  _inherits(AxisLogKeySelector, _React$Component);

  function AxisLogKeySelector(props) {
    _classCallCheck(this, AxisLogKeySelector);

    var _this = _possibleConstructorReturn(this, (AxisLogKeySelector.__proto__ || Object.getPrototypeOf(AxisLogKeySelector)).call(this, props));

    _this.handleLogKeySelectToggle = _this.handleLogKeySelectToggle.bind(_this);
    return _this;
  }

  _createClass(AxisLogKeySelector, [{
    key: 'handleLogKeySelectToggle',
    value: function handleLogKeySelectToggle(logKey) {
      var _props = this.props,
          axisConfig = _props.axisConfig,
          onAxisConfigLogKeySelectToggle = _props.onAxisConfigLogKeySelectToggle;
      var axisName = axisConfig.axisName;

      onAxisConfigLogKeySelectToggle(axisName, logKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          axisConfig = _props2.axisConfig,
          stats = _props2.stats;
      var _axisConfig$logKeysCo = axisConfig.logKeysConfig,
          logKeysConfig = _axisConfig$logKeysCo === undefined ? {} : _axisConfig$logKeysCo;
      var logKeys = stats.logKeys;


      var axisLogKeySelectorRowElems = logKeys.map(function (logKey) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__AxisLogKeySelectorRow__["a" /* default */], {
          logKey: logKey,
          logKeyConfig: logKeysConfig[logKey],
          onLogKeySelectToggle: _this2.handleLogKeySelectToggle,
          key: logKey
        });
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'list-group-item' },
        axisLogKeySelectorRowElems
      );
    }
  }]);

  return AxisLogKeySelector;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AxisLogKeySelector.propTypes = {
  axisConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axisName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
    }))
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  onAxisConfigLogKeySelectToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

AxisLogKeySelector.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (AxisLogKeySelector);

/***/ }),

/***/ 989:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var AxisLogKeySelectorRow = function (_React$Component) {
  _inherits(AxisLogKeySelectorRow, _React$Component);

  function AxisLogKeySelectorRow(props) {
    _classCallCheck(this, AxisLogKeySelectorRow);

    var _this = _possibleConstructorReturn(this, (AxisLogKeySelectorRow.__proto__ || Object.getPrototypeOf(AxisLogKeySelectorRow)).call(this, props));

    _this.handleSelectToggle = _this.handleSelectToggle.bind(_this);
    return _this;
  }

  _createClass(AxisLogKeySelectorRow, [{
    key: 'handleSelectToggle',
    value: function handleSelectToggle() {
      var _props = this.props,
          logKey = _props.logKey,
          onLogKeySelectToggle = _props.onLogKeySelectToggle;

      onLogKeySelectToggle(logKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          logKey = _props2.logKey,
          logKeyConfig = _props2.logKeyConfig;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Label"],
          { check: true },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_reactstrap__["Input"], {
            type: 'checkbox',
            checked: logKeyConfig.selected,
            onChange: this.handleSelectToggle
          }),
          ' ',
          logKey
        )
      );
    }
  }]);

  return AxisLogKeySelectorRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

AxisLogKeySelectorRow.propTypes = {
  logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  logKeyConfig: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool
  }),
  onLogKeySelectToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

AxisLogKeySelectorRow.defaultProps = {
  logKeyConfig: {
    selected: false
  }
};

/* harmony default export */ __webpack_exports__["a"] = (AxisLogKeySelectorRow);

/***/ }),

/***/ 990:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_reactstrap__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__actions__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_NavigationBar__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_result_ResultSummary__ = __webpack_require__(991);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_result_Args__ = __webpack_require__(992);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_result_Commands__ = __webpack_require__(993);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_result_Snapshots__ = __webpack_require__(995);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__constants__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__utils__ = __webpack_require__(30);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }














var ResultDetail = function (_React$Component) {
  _inherits(ResultDetail, _React$Component);

  function ResultDetail() {
    _classCallCheck(this, ResultDetail);

    return _possibleConstructorReturn(this, (ResultDetail.__proto__ || Object.getPrototypeOf(ResultDetail)).apply(this, arguments));
  }

  _createClass(ResultDetail, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var pollingRate = this.props.config.global.pollingRate;

      this.resultsPollingTimer = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["l" /* startPolling */])(this.props.loadResults, pollingRate);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var currentPollingRate = this.props.config.global.pollingRate;
      var nextPollingRate = nextProps.config.global.pollingRate;

      if (currentPollingRate !== nextPollingRate) {
        Object(__WEBPACK_IMPORTED_MODULE_11__utils__["m" /* stopPolling */])(this.resultsPollingTimer);
        this.resultsPollingTimer = Object(__WEBPACK_IMPORTED_MODULE_11__utils__["l" /* startPolling */])(this.props.loadResults, nextPollingRate);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      Object(__WEBPACK_IMPORTED_MODULE_11__utils__["m" /* stopPolling */])(this.resultsPollingTimer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          result = _props.result,
          config = _props.config,
          fetchState = _props.fetchState;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'result-detail' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_NavigationBar__["a" /* default */], {
          fetchState: fetchState,
          config: config,
          onGlobalConfigPollingRateUpdate: this.props.updateGlobalPollingRate,
          onGlobalConfigChartSizeUpdate: this.props.updateGlobalChartSize
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_3_reactstrap__["Container"],
          { fluid: true },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h3',
            null,
            result.name
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6 p-2' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__components_result_ResultSummary__["a" /* default */], { result: result })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6 p-2' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__components_result_Args__["a" /* default */], { args: result.args || [] })
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6 p-2' },
              result.id != null ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__components_result_Commands__["a" /* default */], {
                resultId: result.id,
                commands: result.commands || [],
                onCommandSubmit: this.props.createCommand
              }) : null
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6 p-2' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9__components_result_Snapshots__["a" /* default */], { snapshots: result.snapshots || [] })
            )
          )
        )
      );
    }
  }]);

  return ResultDetail;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var resultId = Number(ownProps.params.resultId);
  var entities = state.entities,
      fetchState = state.fetchState,
      _state$config = state.config,
      config = _state$config === undefined ? __WEBPACK_IMPORTED_MODULE_10__constants__["c" /* defaultConfig */] : _state$config;
  var _entities$results = entities.results,
      results = _entities$results === undefined ? {} : _entities$results;

  var result = results[resultId] || {};
  return { result: result, fetchState: fetchState, config: config };
};

ResultDetail.propTypes = {
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  fetchState: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    global: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  loadResults: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  createCommand: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateGlobalPollingRate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateGlobalChartSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, {
  loadResults: __WEBPACK_IMPORTED_MODULE_4__actions__["t" /* loadResults */],
  createCommand: __WEBPACK_IMPORTED_MODULE_4__actions__["s" /* createCommand */],
  updateGlobalPollingRate: __WEBPACK_IMPORTED_MODULE_4__actions__["B" /* updateGlobalPollingRate */],
  updateGlobalChartSize: __WEBPACK_IMPORTED_MODULE_4__actions__["A" /* updateGlobalChartSize */]
})(ResultDetail));

/***/ }),

/***/ 991:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(30);




var ResultSummary = function ResultSummary(props) {
  var result = props.result;

  var lastLogDict = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["d" /* getLastLogDict */])(result);
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'card' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-header' },
      'Summary'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-body' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'dl',
        { className: 'row' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dt',
          { className: 'col-sm-3' },
          'id'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dd',
          { className: 'col-sm-9' },
          result.id
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dt',
          { className: 'col-sm-3' },
          'name'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dd',
          { className: 'col-sm-9' },
          result.name
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dt',
          { className: 'col-sm-3' },
          'path name'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dd',
          { className: 'col-sm-9' },
          result.pathName
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dt',
          { className: 'col-sm-3' },
          'epoch'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dd',
          { className: 'col-sm-9' },
          lastLogDict.epoch
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dt',
          { className: 'col-sm-3' },
          'iteration'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dd',
          { className: 'col-sm-9' },
          lastLogDict.iteration
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dt',
          { className: 'col-sm-3' },
          'elapsed time'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'dd',
          { className: 'col-sm-9' },
          lastLogDict.elapsed_time
        )
      )
    )
  );
};

ResultSummary.propTypes = {
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired
};

ResultSummary.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (ResultSummary);

/***/ }),

/***/ 992:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(30);




var createDescriptionElems = function createDescriptionElems(args) {
  return args.map(function (arg) {
    return [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'dt',
      { className: 'col-sm-3' },
      '(',
      arg.key,
      ')'
    ), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'dd',
      { className: 'col-sm-9' },
      Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* argValue2string */])(arg.value)
    )];
  });
};

var Args = function Args(props) {
  var args = props.args;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'card' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-header' },
      'Args'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-body' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'dl',
        { className: 'row' },
        createDescriptionElems(args)
      )
    )
  );
};

Args.propTypes = {
  args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    key: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
  })).isRequired
};

Args.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (Args);

/***/ }),

/***/ 993:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CommandButton__ = __webpack_require__(994);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(30);





var createCommandRowElems = function createCommandRowElems(commands) {
  return commands.sort(function (a, b) {
    return (
      // sort commands in decending order
      b.id - a.id
    );
  }).map(function (command) {
    var request = command.request || {};
    var response = command.response || {};
    var schedule = request.schedule;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'tr',
      { className: 'command-row', key: command.id },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        command.name
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        Object(__WEBPACK_IMPORTED_MODULE_3__utils__["k" /* responseStatusToIcon */])(response.status)
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        new Date(request.created_at).toLocaleString()
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        schedule ? schedule.value + ' ' + schedule.key : ''
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        new Date(response.executed_at).toLocaleString()
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        response.epoch
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        response.iteration
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        response.elapsed_time != null ? response.elapsed_time.toFixed(2) : ''
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'pre',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'code',
            null,
            request.body ? JSON.stringify(request.body) : ''
          )
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'pre',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'code',
            null,
            response.body ? JSON.stringify(response.body) : ''
          )
        )
      )
    );
  });
};

var Commands = function Commands(props) {
  var resultId = props.resultId,
      commands = props.commands,
      onCommandSubmit = props.onCommandSubmit;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'card' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-header' },
      'Commands'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-body' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'mb-2 card' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'card-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__CommandButton__["a" /* default */], {
            resultId: resultId,
            commandName: 'take_snapshot',
            label: 'Take snapshot',
            onCommandSubmit: onCommandSubmit
          })
        )
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('hr', null),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'table',
        { className: 'table table-sm table-xy-overflow-scroll' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'thead',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tr',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'command name'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'response status'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'created at'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'schedule'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'executed at'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'epoch'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'iteraion'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'elapsed time'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'request body'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'response body'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          createCommandRowElems(commands)
        )
      )
    )
  );
};

Commands.propTypes = {
  resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  commands: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    body: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })).isRequired,
  onCommandSubmit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

Commands.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (Commands);

/***/ }),

/***/ 994:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(23);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var initialState = {
  disabled: false
};

var CommandButton = function (_React$Component) {
  _inherits(CommandButton, _React$Component);

  function CommandButton() {
    _classCallCheck(this, CommandButton);

    var _this = _possibleConstructorReturn(this, (CommandButton.__proto__ || Object.getPrototypeOf(CommandButton)).call(this));

    _this.handleClick = _this.handleClick.bind(_this);

    _this.state = initialState;
    return _this;
  }

  _createClass(CommandButton, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var _this2 = this;

      e.preventDefault();
      var _props = this.props,
          resultId = _props.resultId,
          onCommandSubmit = _props.onCommandSubmit,
          commandName = _props.commandName,
          freezeTime = _props.freezeTime;


      onCommandSubmit(resultId, commandName);

      this.setState({ disabled: true });
      setTimeout(function () {
        _this2.setState({ disabled: false });
      }, freezeTime);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          commandName = _props2.commandName,
          label = _props2.label;
      var disabled = this.state.disabled;

      var buttonLabel = label || commandName;
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Button"],
        {
          color: 'primary',
          disabled: disabled,
          onClick: this.handleClick
        },
        buttonLabel
      );
    }
  }]);

  return CommandButton;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

CommandButton.propTypes = {
  resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  commandName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  label: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  freezeTime: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  onCommandSubmit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

CommandButton.defaultProps = {
  label: undefined,
  freezeTime: 5000
};

/* harmony default export */ __webpack_exports__["a"] = (CommandButton);

/***/ }),

/***/ 995:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var createSnapshotRowElems = function createSnapshotRowElems(snapshots) {
  return snapshots.sort(function (a, b) {
    return (
      // sort snapshots by their iteration
      a.iteration - b.iteration
    );
  }).map(function (snapshot) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'tr',
      { className: 'command-row', key: snapshot.id },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        snapshot.iteration
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'td',
        null,
        snapshot.name
      )
    );
  });
};

var Snapshots = function Snapshots(props) {
  var snapshots = props.snapshots;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'card' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-header' },
      'Snapshots'
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'card-body' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'table',
        { className: 'table table-sm table-xy-overflow-scroll' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'thead',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'tr',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'iteration'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'name'
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          createSnapshotRowElems(snapshots)
        )
      )
    )
  );
};

Snapshots.propTypes = {
  snapshots: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    iteration: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })).isRequired
};

Snapshots.defaultProps = {};

/* harmony default export */ __webpack_exports__["a"] = (Snapshots);

/***/ })

},[456]);