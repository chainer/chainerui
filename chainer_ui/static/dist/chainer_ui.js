webpackJsonp([0],{

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RESULTS_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RESULTS_SUCCESS; });
/* unused harmony export RESULTS_FAILUE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return loadResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXIS_CONFIG_LINE_ADD; });
/* unused harmony export AXIS_CONFIG_LINE_REMOVE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return addLineToAxis; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware_api__ = __webpack_require__(263);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



// results API

var RESULTS_REQUEST = 'RESULTS_REQUEST';
var RESULTS_SUCCESS = 'RESULTS_SUCCESS';
var RESULTS_FAILUE = 'RESULTS_FAILUE';

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

// axis config

var AXIS_CONFIG_LINE_ADD = 'AXIS_CONFIG_LINE_ADD';
var AXIS_CONFIG_LINE_REMOVE = 'AXIS_CONFIG_LINE_REMOVE';

var addLineToAxis = function addLineToAxis(axisName, line) {
  return {
    type: AXIS_CONFIG_LINE_ADD,
    axisName: axisName,
    line: line
  };
};

/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CALL_API; });
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var API_ROOT = '/api/v1/';

var callApi = function callApi(endpoint) {
  var fullUrl = endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl).then(function (response) {
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
      var types = callAPI.types;


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

      return callApi(endpoint).then(function (response) {
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

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'line2key',
    value: function line2key(line) {
      return line.resultId + '_' + line.logKey;
    }
  }, {
    key: 'line2dataKey',
    value: function line2dataKey(line, axisName) {
      return axisName + '_' + Utils.line2key(line);
    }
  }, {
    key: 'truncateForward',
    value: function truncateForward(string, length) {
      var beginning = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '...';

      var str = string || '';
      if (str.length > length) {
        return beginning + str.substring(str.length - length + beginning.length, str.length);
      }
      return str;
    }
  }]);

  return Utils;
}();

/* harmony default export */ __webpack_exports__["a"] = (Utils);

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(389);


/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_thunk__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_logger__ = __webpack_require__(260);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_hot_loader__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__reducers__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__middleware_api__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__containers_ChainerUIContainer__ = __webpack_require__(518);











var middleware = [__WEBPACK_IMPORTED_MODULE_4_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_8__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_5_redux_logger__["createLogger"])()];

var store = Object(__WEBPACK_IMPORTED_MODULE_2_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_7__reducers__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2_redux__["applyMiddleware"].apply(undefined, middleware));

var render = function render(Component, appNode) {
  __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    __WEBPACK_IMPORTED_MODULE_3_react_redux__["Provider"],
    { store: store },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_6_react_hot_loader__["AppContainer"],
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
      render(__WEBPACK_IMPORTED_MODULE_9__containers_ChainerUIContainer__["a" /* default */], appNode);
    }
  });
}

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions__ = __webpack_require__(262);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }




var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actions__["b" /* RESULTS_SUCCESS */]:
      if (action.response && action.response.results) {
        var resultsList = action.response.results;
        var results = {};
        resultsList.forEach(function (result) {
          results[result.id] = result;
        });
        return _extends({}, state, { results: results });
      }
      break;
    default:
      break;
  }
  return state;
};

var axes = function axes() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var axisName = action.axisName,
      line = action.line;

  if (axisName == null || line == null) {
    return state;
  }
  var axisConfig = state[axisName] || { axisName: axisName };
  var _axisConfig$lines = axisConfig.lines,
      lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;


  var newAxisConfig = void 0;
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_1__actions__["a" /* AXIS_CONFIG_LINE_ADD */]:
      newAxisConfig = _extends({}, axisConfig, { lines: [].concat(_toConsumableArray(lines), [line]) });
      break;
    default:
      newAxisConfig = axisConfig;
      break;
  }
  return _extends({}, state, _defineProperty({}, axisName, newAxisConfig));
};

var config = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  axes: axes
});

var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  entities: entities,
  config: config
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ExperimentsTable__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_LogVisualizer__ = __webpack_require__(521);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer(props) {
    _classCallCheck(this, ChainerUIContainer);

    var _this = _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).call(this, props));

    _this.handleAxisConfigLineAdd = _this.handleAxisConfigLineAdd.bind(_this);
    return _this;
  }

  _createClass(ChainerUIContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.loadResults();
    }
  }, {
    key: 'handleAxisConfigLineAdd',
    value: function handleAxisConfigLineAdd(axisName, line) {
      this.props.addLineToAxis(axisName, line);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          results = _props.results,
          config = _props.config,
          stats = _props.stats;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'chainer-ui-container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_LogVisualizer__["a" /* default */], {
          results: results,
          stats: stats,
          config: config,
          onAxisConfigLineAdd: this.handleAxisConfigLineAdd
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_ExperimentsTable__["a" /* default */], {
          results: results,
          stats: stats
        })
      );
    }
  }]);

  return ChainerUIContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ChainerUIContainer.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  }).isRequired,
  loadResults: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

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
  axes: {}
};

var mapStateToProps = function mapStateToProps(state) {
  var results = state.entities.results,
      _state$config = state.config,
      config = _state$config === undefined ? defaultConfig : _state$config;

  var stats = mapEntitiesToStats(state.entities);
  return { results: results, config: config, stats: stats };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, {
  loadResults: __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* loadResults */],
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* addLineToAxis */]
})(ChainerUIContainer));

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(520);




var ExperimentsTable = function ExperimentsTable(props) {
  var _props$results = props.results,
      results = _props$results === undefined ? {} : _props$results,
      stats = props.stats;
  var argKeys = stats.argKeys;


  var argHeaderElems = argKeys.map(function (argKey) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'th',
      { key: 'args-' + argKey },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-cog' }),
      argKey
    );
  });

  var resultRowElems = Object.keys(results).map(function (resultId) {
    var result = results[resultId];
    var key = 'result-row-' + result.id;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ResultRow__["a" /* default */], {
      result: result,
      stats: stats,
      key: key
    });
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'table',
    { className: 'table table-hover' },
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
          'path name'
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
        argHeaderElems
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
  })
};
ExperimentsTable.defaultProps = {
  results: {},
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ExperimentsTable);

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var emptyStr = '-';

var ResultRow = function ResultRow(props) {
  var result = props.result,
      stats = props.stats;
  var args = result.args,
      logs = result.logs;


  var lastLog = logs[logs.length - 1] || {};
  var lastLogDict = {};
  lastLog.logItems.forEach(function (logItem) {
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
      content
    );
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'tr',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      result.id
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'td',
      null,
      result.pathName
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
    argElems
  );
};

ResultRow.propTypes = {
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  })
};

ResultRow.defaultProps = {
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ResultRow);

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__ = __webpack_require__(899);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var sliderSteps = 100.0;
var defaultStats = {
  axes: {
    xAxis: {},
    yLeftAxis: {},
    yRightAxis: {}
  }
};

var defaultRange = [0, 100];
var defaultXAxisConfig = {
  axisName: 'xAxis',
  xAxisKey: 'epoch',
  scale: 'linear',
  range: defaultRange
};
var defaultYAxisConfig = {
  axisName: '',
  scale: 'linear',
  range: defaultRange,
  lines: []
};
var defaultConfig = {
  axes: {
    xAxis: defaultXAxisConfig,
    yLeftAxis: _extends({}, defaultYAxisConfig, { axisName: 'yLeftAxis' }),
    yRightAxis: _extends({}, defaultYAxisConfig, { axisName: 'yRightAxis' })
  }
};

var buildLineElem = function buildLineElem(line, axisName) {
  var _line$config = line.config,
      config = _line$config === undefined ? {} : _line$config;
  var line2key = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].line2key,
      line2dataKey = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].line2dataKey;


  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Line"], {
    type: 'linear',
    name: line2key(line),
    dataKey: line2dataKey(line, axisName),
    yAxisId: axisName,
    stroke: config.color,
    connectNulls: true,
    isAnimationActive: false,
    key: line2dataKey(line, axisName)
  });
};

var buildLineElems = function buildLineElems(axisName, config) {
  var axisConfig = config.axes[axisName] || {};
  var _axisConfig$lines = axisConfig.lines,
      lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;

  return lines.map(function (line) {
    return buildLineElem(line, axisName);
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
      var line2dataKey = __WEBPACK_IMPORTED_MODULE_5__utils__["a" /* default */].line2dataKey;
      var _props = this.props,
          _props$results = _props.results,
          results = _props$results === undefined ? {} : _props$results,
          _props$stats = _props.stats,
          stats = _props$stats === undefined ? defaultStats : _props$stats,
          _props$config = _props.config,
          config = _props$config === undefined ? defaultConfig : _props$config,
          onAxisConfigLineAdd = _props.onAxisConfigLineAdd;
      var _config$axes = config.axes,
          _config$axes$xAxis = _config$axes.xAxis,
          xAxis = _config$axes$xAxis === undefined ? { axisName: 'xAxis' } : _config$axes$xAxis,
          _config$axes$yLeftAxi = _config$axes.yLeftAxis,
          yLeftAxis = _config$axes$yLeftAxi === undefined ? { axisName: 'yLeftAxis' } : _config$axes$yLeftAxi,
          _config$axes$yRightAx = _config$axes.yRightAxis,
          yRightAxis = _config$axes$yRightAx === undefined ? { axisName: 'yRightAxis' } : _config$axes$yRightAx;
      var _xAxis$xAxisKey = xAxis.xAxisKey,
          xAxisKey = _xAxis$xAxisKey === undefined ? 'epoch' : _xAxis$xAxisKey;

      var leftLines = yLeftAxis.lines || [];
      var rightLines = yRightAxis.lines || [];
      var axisLines = {
        yLeftAxis: leftLines,
        yRightAxis: rightLines
      };
      var xRange = xAxis.range || defaultRange;
      var yLeftRange = yLeftAxis.range || defaultRange;
      var yRightRange = yRightAxis.range || defaultRange;
      var xValueRange = stats.axes.xAxis.valueRange || defaultRange;
      var yLeftValueRange = stats.axes.yLeftAxis.valueRange || defaultRange;
      var yRightValueRange = stats.axes.yRightAxis.valueRange || defaultRange;

      var chartWidth = 640;
      var chartHeight = 360;

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
            dataDict[logDict[xAxisKey]][line2dataKey(line, axisName)] = logDict[logKey];
          });
        });
      });
      var data = Object.keys(dataDict).map(function (key) {
        return dataDict[key];
      });

      var lineElems = [].concat(_toConsumableArray(buildLineElems('yLeftAxis', config)), _toConsumableArray(buildLineElems('yRightAxis', config)));

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'log-visualizer-root row' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'col-sm-8' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'table',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'tbody',
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'tr',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_slider__["Range"], {
                    style: { height: chartHeight + 'px' },
                    vertical: true,
                    min: yLeftValueRange[0],
                    max: yLeftValueRange[1],
                    step: (yLeftRange[1] - yLeftRange[0]) / sliderSteps,
                    value: yLeftRange
                  })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    __WEBPACK_IMPORTED_MODULE_2_recharts__["LineChart"],
                    {
                      width: chartWidth,
                      height: chartHeight,
                      data: data,
                      margin: { top: 5, right: 30, left: 20, bottom: 5 }
                    },
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["XAxis"], {
                      type: 'number',
                      dataKey: xAxisKey,
                      scale: xAxis.scale,
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
                      yAxisId: 'yLeftAxis',
                      orientation: 'left',
                      scale: yLeftAxis.scale,
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
                      yAxisId: 'yRightAxis',
                      orientation: 'right',
                      scale: yRightAxis.scale,
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["CartesianGrid"], { strokeDasharray: '3 3' }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Tooltip"], null),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Legend"], null),
                    lineElems
                  )
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_slider__["Range"], {
                    style: { height: chartHeight + 'px' },
                    vertical: true,
                    min: yRightValueRange[0],
                    max: yRightValueRange[1],
                    step: (yRightRange[1] - yRightRange[0]) / sliderSteps,
                    value: yRightRange
                  })
                )
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'tr',
                null,
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('td', null),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'td',
                  null,
                  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_rc_slider__["Range"], {
                    style: { width: chartWidth + 'px', margin: 'auto' },
                    min: xValueRange.min,
                    max: xValueRange.max,
                    value: xRange,
                    onChange: this.handleChangeXRange
                  })
                ),
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('td', null)
              )
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'col-sm-4' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */],
            {
              axisConfig: yLeftAxis
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              results: results,
              axisName: 'yLeftAxis',
              lines: yLeftAxis.lines,
              onAxisConfigLineAdd: onAxisConfigLineAdd
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */],
            {
              axisConfig: yRightAxis
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              results: results,
              axisName: 'yRightAxis',
              lines: yRightAxis.lines,
              onAxisConfigLineAdd: onAxisConfigLineAdd
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */], { axisConfig: xAxis })
        )
      );
    }
  }]);

  return LogVisualizer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LogVisualizer.propTypes = {
  results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any).isRequired,
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ valueRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number) }),
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ valueRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number) }),
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({ valueRange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number) })
    })
  }),
  config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    axes: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      xAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yLeftAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any,
      yRightAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
    })
  }),
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
LogVisualizer.defaultProps = {
  stats: defaultStats,
  config: defaultConfig
};

/* harmony default export */ __webpack_exports__["a"] = (LogVisualizer);

/***/ }),

/***/ 896:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 897:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisScaleSelector__ = __webpack_require__(898);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var defaultAxisConfig = {
  axisName: '',
  scale: 'auto',
  range: [0, 100]
};

var AxisConfigurator = function (_React$Component) {
  _inherits(AxisConfigurator, _React$Component);

  function AxisConfigurator(props) {
    _classCallCheck(this, AxisConfigurator);

    var _this = _possibleConstructorReturn(this, (AxisConfigurator.__proto__ || Object.getPrototypeOf(AxisConfigurator)).call(this, props));

    _this.handleChangeScale = _this.handleChangeScale.bind(_this);
    return _this;
  }

  _createClass(AxisConfigurator, [{
    key: 'handleChangeScale',
    value: function handleChangeScale(scale) {
      var axisName = this.props.axisConfig.axisName;

      this.props.onChangeScale(axisName, scale);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$axisConfig = this.props.axisConfig,
          axisName = _props$axisConfig.axisName,
          scale = _props$axisConfig.scale;


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
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__AxisScaleSelector__["a" /* default */], {
                scale: scale,
                onChange: this.handleChangeScale
              })
            )
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
    range: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number)
  }),
  children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element,
  onChangeScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
AxisConfigurator.defaultProps = {
  axisConfig: defaultAxisConfig,
  children: null,
  onChangeScale: function onChangeScale() {}
};

/* harmony default export */ __webpack_exports__["a"] = (AxisConfigurator);

/***/ }),

/***/ 898:
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

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LineConfigurator__ = __webpack_require__(904);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var defaultLine = {
  config: {
    color: '#ABCDEF'
  }
};

var LinesConfigurator = function (_React$Component) {
  _inherits(LinesConfigurator, _React$Component);

  function LinesConfigurator() {
    _classCallCheck(this, LinesConfigurator);

    var _this = _possibleConstructorReturn(this, (LinesConfigurator.__proto__ || Object.getPrototypeOf(LinesConfigurator)).call(this));

    _this.handleModalToggle = _this.handleModalToggle.bind(_this);
    _this.handleAddingLineChange = _this.handleAddingLineChange.bind(_this);
    _this.handleAxisConfigLineAdd = _this.handleAxisConfigLineAdd.bind(_this);

    _this.state = {
      showModal: false,
      addingLine: defaultLine
    };
    return _this;
  }

  _createClass(LinesConfigurator, [{
    key: 'handleModalToggle',
    value: function handleModalToggle() {
      var newAddingLine = this.state.showModal ? defaultLine : this.state.addingLine;
      this.setState({
        showModal: !this.state.showModal,
        addingLine: newAddingLine
      });
    }
  }, {
    key: 'handleAddingLineChange',
    value: function handleAddingLineChange(newLine) {
      this.setState({
        addingLine: newLine,
        showLineConfigError: false
      });
    }
  }, {
    key: 'handleAxisConfigLineAdd',
    value: function handleAxisConfigLineAdd() {
      var _props = this.props,
          axisName = _props.axisName,
          onAxisConfigLineAdd = _props.onAxisConfigLineAdd;
      var addingLine = this.state.addingLine;


      if (addingLine.resultId == null || addingLine.logKey == null) {
        // invalid
        this.setState({
          showLineConfigError: true
        });
      } else {
        onAxisConfigLineAdd(axisName, addingLine);
        this.handleModalToggle();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var line2key = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].line2key,
          truncateForward = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].truncateForward;
      var _props2 = this.props,
          results = _props2.results,
          _props2$lines = _props2.lines,
          lines = _props2$lines === undefined ? [] : _props2$lines;
      var _state = this.state,
          addingLine = _state.addingLine,
          showLineConfigError = _state.showLineConfigError;


      var lineConfiguratorElems = lines.map(function (line) {
        var result = results[line.resultId] || {};
        var _line$config = line.config,
            config = _line$config === undefined ? {} : _line$config;


        var colorBlockStyle = {
          width: '20px',
          height: '15px',
          backgroundColor: config.color
        };

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: 'list-group-item', key: line2key(line) },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: 'col-sm-1', style: colorBlockStyle }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-5' },
              truncateForward(result.pathName, 24)
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-4' },
              line.logKey
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-1' },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'button',
                { type: 'button', className: 'close', 'aria-label': 'Close' },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                  'span',
                  { 'aria-hidden': 'true' },
                  '\xD7'
                )
              )
            )
          )
        );
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: 'list-group list-group-flush' },
        lineConfiguratorElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: 'list-group-item text-right' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            {
              type: 'button',
              className: 'btn btn-default btn-xs',
              onClick: this.handleModalToggle
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-plus' }),
            ' Add'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2_reactstrap__["Modal"],
            { isOpen: this.state.showModal, toggle: this.handleModalToggle, className: '' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalHeader"],
              { toggle: this.handleModalToggle },
              'Modal title'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["ModalBody"],
              null,
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__LineConfigurator__["a" /* default */], {
                results: results,
                line: addingLine,
                showError: showLineConfigError,
                onChange: this.handleAddingLineChange
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
                { color: 'primary', onClick: this.handleAxisConfigLineAdd },
                'Add'
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
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

LinesConfigurator.defaultProps = {
  lines: []
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfigurator);

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(216);
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
      result.pathName
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

    _this.state = {
      showError: false
    };
    return _this;
  }

  _createClass(LineConfigurator, [{
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
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          results = _props3.results,
          _props3$line = _props3.line,
          line = _props3$line === undefined ? {} : _props3$line,
          _props3$showError = _props3.showError,
          showError = _props3$showError === undefined ? false : _props3$showError;
      var _line$resultId = line.resultId,
          resultId = _line$resultId === undefined ? RESULT_NONE : _line$resultId,
          _line$logKey = line.logKey,
          logKey = _line$logKey === undefined ? LOG_KEY_NONE : _line$logKey,
          _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;

      var result = results[resultId] || {};
      var color = config.color;

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
              'select',
              {
                className: 'form-control',
                type: 'select',
                name: 'select',
                id: 'line-configurator-result-select',
                value: resultId,
                onChange: this.handleResultChange
              },
              resultOptionElems
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormText"],
              { className: 'text-danger', hidden: !showError || resultId !== RESULT_NONE },
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
              'select',
              {
                className: 'form-control',
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
              __WEBPACK_IMPORTED_MODULE_2_reactstrap__["FormText"],
              { className: 'text-danger', hidden: !showError || logKey !== LOG_KEY_NONE },
              'Select a log key!!'
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
      color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
    })
  }),
  showError: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onChange: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LineConfigurator.defaultProps = {
  line: {},
  showError: false,
  onChange: function onChange() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LineConfigurator);

/***/ })

},[388]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWlkZGxld2FyZS9hcGkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL2luZGV4LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVycy9DaGFpbmVyVUlDb250YWluZXIuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1Jlc3VsdFJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTG9nVmlzdWFsaXplci5qc3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JjLXNsaWRlci9hc3NldHMvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0F4aXNDb25maWd1cmF0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0F4aXNTY2FsZVNlbGVjdG9yLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9MaW5lc0NvbmZpZ3VyYXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGluZUNvbmZpZ3VyYXRvci5qc3giXSwibmFtZXMiOlsiUkVTVUxUU19SRVFVRVNUIiwiUkVTVUxUU19TVUNDRVNTIiwiUkVTVUxUU19GQUlMVUUiLCJmZXRjaFJlc3VsdHMiLCJ0eXBlcyIsImVuZHBvaW50IiwibG9hZFJlc3VsdHMiLCJkaXNwYXRjaCIsIkFYSVNfQ09ORklHX0xJTkVfQUREIiwiQVhJU19DT05GSUdfTElORV9SRU1PVkUiLCJhZGRMaW5lVG9BeGlzIiwiYXhpc05hbWUiLCJsaW5lIiwidHlwZSIsIkFQSV9ST09UIiwiY2FsbEFwaSIsImZ1bGxVcmwiLCJpbmRleE9mIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwib2siLCJQcm9taXNlIiwicmVqZWN0IiwiQ0FMTF9BUEkiLCJzdG9yZSIsIm5leHQiLCJhY3Rpb24iLCJjYWxsQVBJIiwiZ2V0U3RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJFcnJvciIsImFjdGlvbldpdGgiLCJkYXRhIiwiZmluYWxBY3Rpb24iLCJyZXF1ZXN0VHlwZSIsInN1Y2Nlc3NUeXBlIiwiZmFpbHVyZVR5cGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJVdGlscyIsInJlc3VsdElkIiwibG9nS2V5IiwibGluZTJrZXkiLCJzdHJpbmciLCJiZWdpbm5pbmciLCJzdHIiLCJzdWJzdHJpbmciLCJtaWRkbGV3YXJlIiwiY3JlYXRlTG9nZ2VyIiwiY3JlYXRlU3RvcmUiLCJhcHBseU1pZGRsZXdhcmUiLCJyZW5kZXIiLCJDb21wb25lbnQiLCJhcHBOb2RlIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDaGFpbmVyVUlDb250YWluZXIiLCJtb2R1bGUiLCJob3QiLCJhY2NlcHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJlbnRpdGllcyIsInN0YXRlIiwicmVzdWx0cyIsInJlc3VsdHNMaXN0IiwiZm9yRWFjaCIsInJlc3VsdCIsImlkIiwiYXhlcyIsImF4aXNDb25maWciLCJsaW5lcyIsIm5ld0F4aXNDb25maWciLCJjb25maWciLCJjb21iaW5lUmVkdWNlcnMiLCJyb290UmVkdWNlciIsInByb3BzIiwiaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGQiLCJiaW5kIiwic3RhdHMiLCJSZWFjdCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdE9mIiwiYW55IiwiaXNSZXF1aXJlZCIsInNoYXBlIiwiYXJnS2V5cyIsImFycmF5T2YiLCJmdW5jIiwibWFwRW50aXRpZXNUb1N0YXRzIiwiYXJnS2V5U2V0IiwiT2JqZWN0Iiwia2V5cyIsImFyZ3MiLCJhcmciLCJrZXkiLCJ4QXhpcyIsInlMZWZ0QXhpcyIsInlSaWdodEF4aXMiLCJkZWZhdWx0Q29uZmlnIiwibWFwU3RhdGVUb1Byb3BzIiwiY29ubmVjdCIsIkV4cGVyaW1lbnRzVGFibGUiLCJhcmdIZWFkZXJFbGVtcyIsIm1hcCIsImFyZ0tleSIsInJlc3VsdFJvd0VsZW1zIiwibnVtYmVyIiwicGF0aE5hbWUiLCJsb2dzIiwiZGVmYXVsdFByb3BzIiwiZW1wdHlTdHIiLCJSZXN1bHRSb3ciLCJsYXN0TG9nIiwibGFzdExvZ0RpY3QiLCJsb2dJdGVtcyIsImxvZ0l0ZW0iLCJ2YWx1ZSIsImFyZ0RpY3QiLCJhcmdFbGVtcyIsImNvbnRlbnQiLCJlcG9jaCIsIml0ZXJhdGlvbiIsImVsYXBzZWRfdGltZSIsInNsaWRlclN0ZXBzIiwiZGVmYXVsdFN0YXRzIiwiZGVmYXVsdFJhbmdlIiwiZGVmYXVsdFhBeGlzQ29uZmlnIiwieEF4aXNLZXkiLCJzY2FsZSIsInJhbmdlIiwiZGVmYXVsdFlBeGlzQ29uZmlnIiwiYnVpbGRMaW5lRWxlbSIsImxpbmUyZGF0YUtleSIsImNvbG9yIiwiYnVpbGRMaW5lRWxlbXMiLCJMb2dWaXN1YWxpemVyIiwib25BeGlzQ29uZmlnTGluZUFkZCIsImxlZnRMaW5lcyIsInJpZ2h0TGluZXMiLCJheGlzTGluZXMiLCJ4UmFuZ2UiLCJ5TGVmdFJhbmdlIiwieVJpZ2h0UmFuZ2UiLCJ4VmFsdWVSYW5nZSIsInZhbHVlUmFuZ2UiLCJ5TGVmdFZhbHVlUmFuZ2UiLCJ5UmlnaHRWYWx1ZVJhbmdlIiwiY2hhcnRXaWR0aCIsImNoYXJ0SGVpZ2h0IiwiZGF0YURpY3QiLCJsb2ciLCJsb2dEaWN0IiwibGluZUVsZW1zIiwiaGVpZ2h0IiwidG9wIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwid2lkdGgiLCJtYXJnaW4iLCJtaW4iLCJtYXgiLCJoYW5kbGVDaGFuZ2VYUmFuZ2UiLCJkZWZhdWx0QXhpc0NvbmZpZyIsIkF4aXNDb25maWd1cmF0b3IiLCJoYW5kbGVDaGFuZ2VTY2FsZSIsIm9uQ2hhbmdlU2NhbGUiLCJjaGlsZHJlbiIsImVsZW1lbnQiLCJzY2FsZU9wdGlvbnMiLCJBeGlzU2NhbGVTZWxlY3RvciIsIm9uQ2hhbmdlIiwiaGFuZGxlQ2hhbmdlQXhpc0tleSIsImUiLCJ0YXJnZXQiLCJvcHRpb25zIiwic2NhbGVLZXkiLCJkZWZhdWx0TGluZSIsIkxpbmVzQ29uZmlndXJhdG9yIiwiaGFuZGxlTW9kYWxUb2dnbGUiLCJoYW5kbGVBZGRpbmdMaW5lQ2hhbmdlIiwic2hvd01vZGFsIiwiYWRkaW5nTGluZSIsIm5ld0FkZGluZ0xpbmUiLCJzZXRTdGF0ZSIsIm5ld0xpbmUiLCJzaG93TGluZUNvbmZpZ0Vycm9yIiwidHJ1bmNhdGVGb3J3YXJkIiwibGluZUNvbmZpZ3VyYXRvckVsZW1zIiwiY29sb3JCbG9ja1N0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwiUkVTVUxUX05PTkUiLCJMT0dfS0VZX05PTkUiLCJnZXRMb2dLZXlzIiwibG9nS2V5U2V0IiwiY3JlYXRlUmVzdWx0T3B0aW9uRWxlbXMiLCJjcmVhdGVMb2dLZXlPcHRpb25FbGVtcyIsImxvZ0tleXMiLCJMaW5lQ29uZmlndXJhdG9yIiwiaGFuZGxlUmVzdWx0Q2hhbmdlIiwiaGFuZGxlTG9nS2V5Q2hhbmdlIiwic2hvd0Vycm9yIiwibmV3UmVzdWx0SWQiLCJwYXJzZUludCIsIm5ld0xvZ0tleSIsInJlc3VsdE9wdGlvbkVsZW1zIiwibG9nS2V5T3B0aW9uRWxlbXMiLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7O0FBRU8sSUFBTUEsa0JBQWtCLGlCQUF4QjtBQUNBLElBQU1DLGtCQUFrQixpQkFBeEI7QUFDQSxJQUFNQyxpQkFBaUIsZ0JBQXZCOztBQUVQLElBQU1DLGVBQWUsU0FBZkEsWUFBZTtBQUFBLDZCQUNsQixpRUFEa0IsRUFDUDtBQUNWQyxXQUFPLENBQUNKLGVBQUQsRUFBa0JDLGVBQWxCLEVBQW1DQyxjQUFuQyxDQURHO0FBRVZHLGNBQVU7QUFG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OztBQWFBK0csaUJBQWlCekYsWUFBakIsR0FBZ0M7QUFDOUIxRyxRQUFNLEVBRHdCO0FBRTlCc00sYUFBVyxLQUZtQjtBQUc5QjlCLFlBQVUsb0JBQU0sQ0FBRTtBQUhZLENBQWhDOztBQU1BLHlEQUFlMkIsZ0JBQWYsRSIsImZpbGUiOiJjaGFpbmVyX3VpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ0FMTF9BUEkgfSBmcm9tICcuLi9taWRkbGV3YXJlL2FwaSc7XG5cblxuLy8gcmVzdWx0cyBBUElcblxuZXhwb3J0IGNvbnN0IFJFU1VMVFNfUkVRVUVTVCA9ICdSRVNVTFRTX1JFUVVFU1QnO1xuZXhwb3J0IGNvbnN0IFJFU1VMVFNfU1VDQ0VTUyA9ICdSRVNVTFRTX1NVQ0NFU1MnO1xuZXhwb3J0IGNvbnN0IFJFU1VMVFNfRkFJTFVFID0gJ1JFU1VMVFNfRkFJTFVFJztcblxuY29uc3QgZmV0Y2hSZXN1bHRzID0gKCkgPT4gKHtcbiAgW0NBTExfQVBJXToge1xuICAgIHR5cGVzOiBbUkVTVUxUU19SRVFVRVNULCBSRVNVTFRTX1NVQ0NFU1MsIFJFU1VMVFNfRkFJTFVFXSxcbiAgICBlbmRwb2ludDogJ3Jlc3VsdHMnXG4gIH1cbn0pO1xuXG5leHBvcnQgY29uc3QgbG9hZFJlc3VsdHMgPSAoKSA9PiAoZGlzcGF0Y2gpID0+IGRpc3BhdGNoKGZldGNoUmVzdWx0cygpKTtcblxuXG4vLyBheGlzIGNvbmZpZ1xuXG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfTElORV9BREQgPSAnQVhJU19DT05GSUdfTElORV9BREQnO1xuZXhwb3J0IGNvbnN0IEFYSVNfQ09ORklHX0xJTkVfUkVNT1ZFID0gJ0FYSVNfQ09ORklHX0xJTkVfUkVNT1ZFJztcblxuZXhwb3J0IGNvbnN0IGFkZExpbmVUb0F4aXMgPSAoYXhpc05hbWUsIGxpbmUpID0+ICh7XG4gIHR5cGU6IEFYSVNfQ09ORklHX0xJTkVfQURELFxuICBheGlzTmFtZSxcbiAgbGluZVxufSk7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hY3Rpb25zL2luZGV4LmpzIiwiY29uc3QgQVBJX1JPT1QgPSAnL2FwaS92MS8nO1xuXG5jb25zdCBjYWxsQXBpID0gKGVuZHBvaW50KSA9PiB7XG4gIGNvbnN0IGZ1bGxVcmwgPSAoZW5kcG9pbnQuaW5kZXhPZihBUElfUk9PVCkgPT09IC0xKSA/IEFQSV9ST09UICsgZW5kcG9pbnQgOiBlbmRwb2ludDtcblxuICByZXR1cm4gZmV0Y2goZnVsbFVybClcbiAgICAudGhlbigocmVzcG9uc2UpID0+XG4gICAgICByZXNwb25zZS5qc29uKCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgICAgfSlcbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENBTExfQVBJID0gJ0NhbGwgQVBJJztcblxuZXhwb3J0IGRlZmF1bHQgKHN0b3JlKSA9PiAobmV4dCkgPT4gKGFjdGlvbikgPT4ge1xuICBjb25zdCBjYWxsQVBJID0gYWN0aW9uW0NBTExfQVBJXTtcbiAgaWYgKHR5cGVvZiBjYWxsQVBJID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gIH1cblxuICBsZXQgeyBlbmRwb2ludCB9ID0gY2FsbEFQSTtcbiAgY29uc3QgeyB0eXBlcyB9ID0gY2FsbEFQSTtcblxuICBpZiAodHlwZW9mIGVuZHBvaW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZW5kcG9pbnQgPSBlbmRwb2ludChzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheSh0eXBlcykgfHwgdHlwZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiB0aHJlZSBhY3Rpb24gdHlwZXMuJyk7XG4gIH1cblxuICBjb25zdCBhY3Rpb25XaXRoID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBmaW5hbEFjdGlvbiA9IHsgLi4uYWN0aW9uLCAuLi5kYXRhIH07XG4gICAgZGVsZXRlIGZpbmFsQWN0aW9uW0NBTExfQVBJXTtcbiAgICByZXR1cm4gZmluYWxBY3Rpb247XG4gIH07XG5cbiAgY29uc3QgW3JlcXVlc3RUeXBlLCBzdWNjZXNzVHlwZSwgZmFpbHVyZVR5cGVdID0gdHlwZXM7XG4gIG5leHQoYWN0aW9uV2l0aCh7IHR5cGU6IHJlcXVlc3RUeXBlIH0pKTtcblxuICByZXR1cm4gY2FsbEFwaShlbmRwb2ludCkudGhlbihcbiAgICAocmVzcG9uc2UpID0+IG5leHQoYWN0aW9uV2l0aCh7XG4gICAgICByZXNwb25zZSxcbiAgICAgIHR5cGU6IHN1Y2Nlc3NUeXBlXG4gICAgfSkpLFxuICAgIChlcnJvcikgPT4gbmV4dChhY3Rpb25XaXRoKHtcbiAgICAgIHR5cGU6IGZhaWx1cmVUeXBlLFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ1NvbWV0aGluZyBiYWQgaGFwcGVuZWQnXG4gICAgfSkpXG4gICk7XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWlkZGxld2FyZS9hcGkuanMiLCJjbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBsaW5lMmtleShsaW5lKSB7XG4gICAgcmV0dXJuIGAke2xpbmUucmVzdWx0SWR9XyR7bGluZS5sb2dLZXl9YDtcbiAgfVxuXG4gIHN0YXRpYyBsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpIHtcbiAgICByZXR1cm4gYCR7YXhpc05hbWV9XyR7VXRpbHMubGluZTJrZXkobGluZSl9YDtcbiAgfVxuXG4gIHN0YXRpYyB0cnVuY2F0ZUZvcndhcmQoc3RyaW5nLCBsZW5ndGgsIGJlZ2lubmluZyA9ICcuLi4nKSB7XG4gICAgY29uc3Qgc3RyID0gc3RyaW5nIHx8ICcnO1xuICAgIGlmIChzdHIubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYmVnaW5uaW5nICsgc3RyLnN1YnN0cmluZygoc3RyLmxlbmd0aCAtIGxlbmd0aCkgKyBiZWdpbm5pbmcubGVuZ3RoLCBzdHIubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlscztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gJ3JlZHV4LWxvZ2dlcic7XG5pbXBvcnQgeyBBcHBDb250YWluZXIgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCByZWR1Y2VyIGZyb20gJy4vcmVkdWNlcnMnO1xuaW1wb3J0IGFwaSBmcm9tICcuL21pZGRsZXdhcmUvYXBpJztcbmltcG9ydCBDaGFpbmVyVUlDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lcic7XG5cblxuY29uc3QgbWlkZGxld2FyZSA9IFt0aHVuaywgYXBpLCBjcmVhdGVMb2dnZXIoKV07XG5cbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXG4gIHJlZHVjZXIsXG4gIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuKTtcblxuY29uc3QgcmVuZGVyID0gKENvbXBvbmVudCwgYXBwTm9kZSkgPT4ge1xuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICA8QXBwQ29udGFpbmVyPlxuICAgICAgICA8Q29tcG9uZW50IC8+XG4gICAgICA8L0FwcENvbnRhaW5lcj5cbiAgICA8L1Byb3ZpZGVyPixcbiAgICBhcHBOb2RlXG4gICk7XG59O1xuXG5pZiAobW9kdWxlLmhvdCkge1xuICBjb25zdCBhcHBOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYXBwTm9kZSk7XG4gIHJlbmRlcihDaGFpbmVyVUlDb250YWluZXIsIGFwcE5vZGUpO1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lcicsICgpID0+IHsgcmVuZGVyKENoYWluZXJVSUNvbnRhaW5lciwgYXBwTm9kZSk7IH0pO1xufSBlbHNlIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBhcHBOb2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoYWluZXJfdWktcm9vdCcpO1xuICAgIGlmIChhcHBOb2RlKSB7XG4gICAgICByZW5kZXIoQ2hhaW5lclVJQ29udGFpbmVyLCBhcHBOb2RlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanN4IiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0ICogYXMgQWN0aW9uVHlwZXMgZnJvbSAnLi4vYWN0aW9ucyc7XG5cblxuY29uc3QgZW50aXRpZXMgPSAoc3RhdGUgPSB7IHJlc3VsdHM6IHt9IH0sIGFjdGlvbikgPT4ge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5SRVNVTFRTX1NVQ0NFU1M6XG4gICAgICBpZiAoYWN0aW9uLnJlc3BvbnNlICYmIGFjdGlvbi5yZXNwb25zZS5yZXN1bHRzKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdHNMaXN0ID0gYWN0aW9uLnJlc3BvbnNlLnJlc3VsdHM7XG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSB7fTtcbiAgICAgICAgcmVzdWx0c0xpc3QuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgcmVzdWx0c1tyZXN1bHQuaWRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIHJlc3VsdHMgfTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59O1xuXG5jb25zdCBheGVzID0gKHN0YXRlID0ge30sIGFjdGlvbikgPT4ge1xuICBjb25zdCB7IGF4aXNOYW1lLCBsaW5lIH0gPSBhY3Rpb247XG4gIGlmIChheGlzTmFtZSA9PSBudWxsIHx8IGxpbmUgPT0gbnVsbCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuICBjb25zdCBheGlzQ29uZmlnID0gc3RhdGVbYXhpc05hbWVdIHx8IHsgYXhpc05hbWUgfTtcbiAgY29uc3QgeyBsaW5lcyA9IFtdIH0gPSBheGlzQ29uZmlnO1xuXG4gIGxldCBuZXdBeGlzQ29uZmlnO1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5BWElTX0NPTkZJR19MSU5FX0FERDpcbiAgICAgIG5ld0F4aXNDb25maWcgPSB7IC4uLmF4aXNDb25maWcsIGxpbmVzOiBbLi4ubGluZXMsIGxpbmVdIH07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbmV3QXhpc0NvbmZpZyA9IGF4aXNDb25maWc7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4geyAuLi5zdGF0ZSwgW2F4aXNOYW1lXTogbmV3QXhpc0NvbmZpZyB9O1xufTtcblxuY29uc3QgY29uZmlnID0gY29tYmluZVJlZHVjZXJzKHtcbiAgYXhlc1xufSk7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgZW50aXRpZXMsXG4gIGNvbmZpZ1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvcmVkdWNlcnMvaW5kZXguanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgbG9hZFJlc3VsdHMsXG4gIGFkZExpbmVUb0F4aXNcbn0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgRXhwZXJpbWVudHNUYWJsZSBmcm9tICcuLi9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUnO1xuaW1wb3J0IExvZ1Zpc3VhbGl6ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyJztcblxuXG5jbGFzcyBDaGFpbmVyVUlDb250YWluZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGQgPSB0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lQWRkLmJpbmQodGhpcyk7XG4gIH1cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIHRoaXMucHJvcHMubG9hZFJlc3VsdHMoKTtcbiAgfVxuXG4gIGhhbmRsZUF4aXNDb25maWdMaW5lQWRkKGF4aXNOYW1lLCBsaW5lKSB7XG4gICAgdGhpcy5wcm9wcy5hZGRMaW5lVG9BeGlzKGF4aXNOYW1lLCBsaW5lKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHJlc3VsdHMsIGNvbmZpZywgc3RhdHMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFpbmVyLXVpLWNvbnRhaW5lclwiPlxuICAgICAgICA8TG9nVmlzdWFsaXplclxuICAgICAgICAgIHJlc3VsdHM9e3Jlc3VsdHN9XG4gICAgICAgICAgc3RhdHM9e3N0YXRzfVxuICAgICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e3RoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGR9XG4gICAgICAgIC8+XG4gICAgICAgIDxFeHBlcmltZW50c1RhYmxlXG4gICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICBzdGF0cz17c3RhdHN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNoYWluZXJVSUNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gIHJlc3VsdHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICBjb25maWc6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXhlczogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHN0YXRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4ZXM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KSxcbiAgICBhcmdLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9KS5pc1JlcXVpcmVkLFxuICBsb2FkUmVzdWx0czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgYWRkTGluZVRvQXhpczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgbWFwRW50aXRpZXNUb1N0YXRzID0gKGVudGl0aWVzKSA9PiB7XG4gIGNvbnN0IHsgcmVzdWx0cyA9IHt9IH0gPSBlbnRpdGllcztcbiAgY29uc3QgYXJnS2V5U2V0ID0ge307XG4gIE9iamVjdC5rZXlzKHJlc3VsdHMpLmZvckVhY2goKHJlc3VsdElkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgcmVzdWx0LmFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7IGFyZ0tleVNldFthcmcua2V5XSA9IHRydWU7IH0pO1xuICB9KTtcbiAgY29uc3QgYXJnS2V5cyA9IE9iamVjdC5rZXlzKGFyZ0tleVNldCk7XG5cbiAgY29uc3QgYXhlcyA9IHtcbiAgICB4QXhpczoge30sXG4gICAgeUxlZnRBeGlzOiB7fSxcbiAgICB5UmlnaHRBeGlzOiB7fVxuICB9O1xuXG4gIHJldHVybiB7IGF4ZXMsIGFyZ0tleXMgfTtcbn07XG5cbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIGF4ZXM6IHt9XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgY29uc3Qge1xuICAgIGVudGl0aWVzOiB7IHJlc3VsdHMgfSxcbiAgICBjb25maWcgPSBkZWZhdWx0Q29uZmlnXG4gIH0gPSBzdGF0ZTtcbiAgY29uc3Qgc3RhdHMgPSBtYXBFbnRpdGllc1RvU3RhdHMoc3RhdGUuZW50aXRpZXMpO1xuICByZXR1cm4geyByZXN1bHRzLCBjb25maWcsIHN0YXRzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge1xuICBsb2FkUmVzdWx0cyxcbiAgYWRkTGluZVRvQXhpc1xufSkoQ2hhaW5lclVJQ29udGFpbmVyKTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRhaW5lcnMvQ2hhaW5lclVJQ29udGFpbmVyLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlc3VsdFJvdyBmcm9tICcuL1Jlc3VsdFJvdyc7XG5cblxuY29uc3QgRXhwZXJpbWVudHNUYWJsZSA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlc3VsdHMgPSB7fSwgc3RhdHMgfSA9IHByb3BzO1xuICBjb25zdCB7IGFyZ0tleXMgfSA9IHN0YXRzO1xuXG4gIGNvbnN0IGFyZ0hlYWRlckVsZW1zID0gYXJnS2V5cy5tYXAoKGFyZ0tleSkgPT4gKDx0aCBrZXk9e2BhcmdzLSR7YXJnS2V5fWB9PjxzcGFuIGNsYXNzTmFtZT1cImdseXBoaWNvbiBnbHlwaGljb24tY29nXCIgLz57YXJnS2V5fTwvdGg+KSk7XG5cbiAgY29uc3QgcmVzdWx0Um93RWxlbXMgPSBPYmplY3Qua2V5cyhyZXN1bHRzKS5tYXAoKHJlc3VsdElkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgY29uc3Qga2V5ID0gYHJlc3VsdC1yb3ctJHtyZXN1bHQuaWR9YDtcbiAgICByZXR1cm4gKFxuICAgICAgPFJlc3VsdFJvd1xuICAgICAgICByZXN1bHQ9e3Jlc3VsdH1cbiAgICAgICAgc3RhdHM9e3N0YXRzfVxuICAgICAgICBrZXk9e2tleX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUgdGFibGUtaG92ZXJcIj5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0aD5pZDwvdGg+XG4gICAgICAgICAgPHRoPnBhdGggbmFtZTwvdGg+XG4gICAgICAgICAgPHRoPmVwb2NoPC90aD5cbiAgICAgICAgICA8dGg+aXRlcmF0aW9uPC90aD5cbiAgICAgICAgICA8dGg+ZWxhcHNlZF90aW1lPC90aD5cbiAgICAgICAgICB7YXJnSGVhZGVyRWxlbXN9XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICB7cmVzdWx0Um93RWxlbXN9XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gICk7XG59O1xuXG5FeHBlcmltZW50c1RhYmxlLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHBhdGhOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgICBsb2dzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICAgIH0pXG4gICksXG4gIHN0YXRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFyZ0tleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH0pXG59O1xuRXhwZXJpbWVudHNUYWJsZS5kZWZhdWx0UHJvcHMgPSB7XG4gIHJlc3VsdHM6IHt9LFxuICBzdGF0czoge1xuICAgIGFyZ0tleXM6IFtdXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVyaW1lbnRzVGFibGU7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cblxuY29uc3QgZW1wdHlTdHIgPSAnLSc7XG5cbmNvbnN0IFJlc3VsdFJvdyA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHJlc3VsdCwgc3RhdHMgfSA9IHByb3BzO1xuICBjb25zdCB7IGFyZ3MsIGxvZ3MgfSA9IHJlc3VsdDtcblxuICBjb25zdCBsYXN0TG9nID0gbG9nc1tsb2dzLmxlbmd0aCAtIDFdIHx8IHt9O1xuICBjb25zdCBsYXN0TG9nRGljdCA9IHt9O1xuICBsYXN0TG9nLmxvZ0l0ZW1zLmZvckVhY2goKGxvZ0l0ZW0pID0+IHsgbGFzdExvZ0RpY3RbbG9nSXRlbS5rZXldID0gbG9nSXRlbS52YWx1ZTsgfSk7XG5cbiAgY29uc3QgYXJnRGljdCA9IHt9O1xuICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgIGFyZ0RpY3RbYXJnLmtleV0gPSBhcmcudmFsdWU7XG4gIH0pO1xuICBjb25zdCBhcmdFbGVtcyA9IHN0YXRzLmFyZ0tleXMubWFwKChhcmdLZXkpID0+IHtcbiAgICBjb25zdCBjb250ZW50ID0gKGFyZ0tleSBpbiBhcmdEaWN0KSA/IGFyZ0RpY3RbYXJnS2V5XSA6IGVtcHR5U3RyO1xuICAgIHJldHVybiAoPHRkIGtleT17YGFyZ3MtJHthcmdLZXl9YH0+e2NvbnRlbnR9PC90ZD4pO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDx0cj5cbiAgICAgIDx0ZD57cmVzdWx0LmlkfTwvdGQ+XG4gICAgICA8dGQ+e3Jlc3VsdC5wYXRoTmFtZX08L3RkPlxuICAgICAgPHRkPntsYXN0TG9nRGljdC5lcG9jaH08L3RkPlxuICAgICAgPHRkPntsYXN0TG9nRGljdC5pdGVyYXRpb259PC90ZD5cbiAgICAgIDx0ZD57bGFzdExvZ0RpY3QuZWxhcHNlZF90aW1lfTwvdGQ+XG4gICAgICB7YXJnRWxlbXN9XG4gICAgPC90cj5cbiAgKTtcbn07XG5cblJlc3VsdFJvdy5wcm9wVHlwZXMgPSB7XG4gIHJlc3VsdDogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBpZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBwYXRoTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBsb2dzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICB9KS5pc1JlcXVpcmVkLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBhcmdLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9KVxufTtcblxuUmVzdWx0Um93LmRlZmF1bHRQcm9wcyA9IHtcbiAgc3RhdHM6IHtcbiAgICBhcmdLZXlzOiBbXVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHRSb3c7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL1Jlc3VsdFJvdy5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7XG4gIExpbmVDaGFydCxcbiAgTGluZSxcbiAgWEF4aXMsXG4gIFlBeGlzLFxuICBDYXJ0ZXNpYW5HcmlkLFxuICBUb29sdGlwLFxuICBMZWdlbmRcbn0gZnJvbSAncmVjaGFydHMnO1xuaW1wb3J0IHsgUmFuZ2UgfSBmcm9tICdyYy1zbGlkZXInO1xuaW1wb3J0ICdyYy1zbGlkZXIvYXNzZXRzL2luZGV4LmNzcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IEF4aXNDb25maWd1cmF0b3IgZnJvbSAnLi9BeGlzQ29uZmlndXJhdG9yJztcbmltcG9ydCBMaW5lc0NvbmZpZ3VyYXRvciBmcm9tICcuL0xpbmVzQ29uZmlndXJhdG9yJztcblxuXG5jb25zdCBzbGlkZXJTdGVwcyA9IDEwMC4wO1xuY29uc3QgZGVmYXVsdFN0YXRzID0ge1xuICBheGVzOiB7XG4gICAgeEF4aXM6IHt9LFxuICAgIHlMZWZ0QXhpczoge30sXG4gICAgeVJpZ2h0QXhpczoge31cbiAgfVxufTtcblxuY29uc3QgZGVmYXVsdFJhbmdlID0gWzAsIDEwMF07XG5jb25zdCBkZWZhdWx0WEF4aXNDb25maWcgPSB7XG4gIGF4aXNOYW1lOiAneEF4aXMnLFxuICB4QXhpc0tleTogJ2Vwb2NoJyxcbiAgc2NhbGU6ICdsaW5lYXInLFxuICByYW5nZTogZGVmYXVsdFJhbmdlXG59O1xuY29uc3QgZGVmYXVsdFlBeGlzQ29uZmlnID0ge1xuICBheGlzTmFtZTogJycsXG4gIHNjYWxlOiAnbGluZWFyJyxcbiAgcmFuZ2U6IGRlZmF1bHRSYW5nZSxcbiAgbGluZXM6IFtdXG59O1xuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgYXhlczoge1xuICAgIHhBeGlzOiBkZWZhdWx0WEF4aXNDb25maWcsXG4gICAgeUxlZnRBeGlzOiB7IC4uLmRlZmF1bHRZQXhpc0NvbmZpZywgYXhpc05hbWU6ICd5TGVmdEF4aXMnIH0sXG4gICAgeVJpZ2h0QXhpczogeyAuLi5kZWZhdWx0WUF4aXNDb25maWcsIGF4aXNOYW1lOiAneVJpZ2h0QXhpcycgfVxuICB9XG59O1xuXG5jb25zdCBidWlsZExpbmVFbGVtID0gKGxpbmUsIGF4aXNOYW1lKSA9PiB7XG4gIGNvbnN0IHsgY29uZmlnID0ge30gfSA9IGxpbmU7XG4gIGNvbnN0IHsgbGluZTJrZXksIGxpbmUyZGF0YUtleSB9ID0gVXRpbHM7XG5cbiAgcmV0dXJuIChcbiAgICA8TGluZVxuICAgICAgdHlwZT1cImxpbmVhclwiXG4gICAgICBuYW1lPXtsaW5lMmtleShsaW5lKX1cbiAgICAgIGRhdGFLZXk9e2xpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSl9XG4gICAgICB5QXhpc0lkPXtheGlzTmFtZX1cbiAgICAgIHN0cm9rZT17Y29uZmlnLmNvbG9yfVxuICAgICAgY29ubmVjdE51bGxzXG4gICAgICBpc0FuaW1hdGlvbkFjdGl2ZT17ZmFsc2V9XG4gICAgICBrZXk9e2xpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmNvbnN0IGJ1aWxkTGluZUVsZW1zID0gKGF4aXNOYW1lLCBjb25maWcpID0+IHtcbiAgY29uc3QgYXhpc0NvbmZpZyA9IGNvbmZpZy5heGVzW2F4aXNOYW1lXSB8fCB7fTtcbiAgY29uc3QgeyBsaW5lcyA9IFtdIH0gPSBheGlzQ29uZmlnO1xuICByZXR1cm4gbGluZXMubWFwKChsaW5lKSA9PiBidWlsZExpbmVFbGVtKGxpbmUsIGF4aXNOYW1lKSk7XG59O1xuXG5jbGFzcyBMb2dWaXN1YWxpemVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBsaW5lMmRhdGFLZXkgfSA9IFV0aWxzO1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3VsdHMgPSB7fSxcbiAgICAgIHN0YXRzID0gZGVmYXVsdFN0YXRzLFxuICAgICAgY29uZmlnID0gZGVmYXVsdENvbmZpZyxcbiAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGRcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICB4QXhpcyA9IHsgYXhpc05hbWU6ICd4QXhpcycgfSxcbiAgICAgIHlMZWZ0QXhpcyA9IHsgYXhpc05hbWU6ICd5TGVmdEF4aXMnIH0sXG4gICAgICB5UmlnaHRBeGlzID0geyBheGlzTmFtZTogJ3lSaWdodEF4aXMnIH1cbiAgICB9ID0gY29uZmlnLmF4ZXM7XG4gICAgY29uc3QgeyB4QXhpc0tleSA9ICdlcG9jaCcgfSA9IHhBeGlzO1xuICAgIGNvbnN0IGxlZnRMaW5lcyA9IHlMZWZ0QXhpcy5saW5lcyB8fCBbXTtcbiAgICBjb25zdCByaWdodExpbmVzID0geVJpZ2h0QXhpcy5saW5lcyB8fCBbXTtcbiAgICBjb25zdCBheGlzTGluZXMgPSB7XG4gICAgICB5TGVmdEF4aXM6IGxlZnRMaW5lcyxcbiAgICAgIHlSaWdodEF4aXM6IHJpZ2h0TGluZXNcbiAgICB9O1xuICAgIGNvbnN0IHhSYW5nZSA9IHhBeGlzLnJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5TGVmdFJhbmdlID0geUxlZnRBeGlzLnJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5UmlnaHRSYW5nZSA9IHlSaWdodEF4aXMucmFuZ2UgfHwgZGVmYXVsdFJhbmdlO1xuICAgIGNvbnN0IHhWYWx1ZVJhbmdlID0gc3RhdHMuYXhlcy54QXhpcy52YWx1ZVJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5TGVmdFZhbHVlUmFuZ2UgPSBzdGF0cy5heGVzLnlMZWZ0QXhpcy52YWx1ZVJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5UmlnaHRWYWx1ZVJhbmdlID0gc3RhdHMuYXhlcy55UmlnaHRBeGlzLnZhbHVlUmFuZ2UgfHwgZGVmYXVsdFJhbmdlO1xuXG4gICAgY29uc3QgY2hhcnRXaWR0aCA9IDY0MDtcbiAgICBjb25zdCBjaGFydEhlaWdodCA9IDM2MDtcblxuICAgIGNvbnN0IGRhdGFEaWN0ID0ge307IC8vIGV4LiAxOiB7IGVwb2NoOiAxLCAxMl9tYWluX2xvc3M6IDAuMDExLCAuLi4gfVxuICAgIE9iamVjdC5rZXlzKGF4aXNMaW5lcykuZm9yRWFjaCgoYXhpc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVzID0gYXhpc0xpbmVzW2F4aXNOYW1lXTtcbiAgICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgY29uc3QgeyByZXN1bHRJZCwgbG9nS2V5IH0gPSBsaW5lO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ3MgPSByZXN1bHQubG9ncyB8fCBbXTtcbiAgICAgICAgbG9ncy5mb3JFYWNoKChsb2cpID0+IHtcbiAgICAgICAgICBjb25zdCBsb2dEaWN0ID0ge307XG4gICAgICAgICAgbG9nLmxvZ0l0ZW1zLmZvckVhY2goKGxvZ0l0ZW0pID0+IHtcbiAgICAgICAgICAgIGxvZ0RpY3RbbG9nSXRlbS5rZXldID0gbG9nSXRlbS52YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobG9nRGljdFt4QXhpc0tleV0gPT0gbnVsbCB8fCBsb2dEaWN0W2xvZ0tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGF0YURpY3RbbG9nRGljdFt4QXhpc0tleV1dID09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGFEaWN0W2xvZ0RpY3RbeEF4aXNLZXldXSA9IHsgW3hBeGlzS2V5XTogbG9nRGljdFt4QXhpc0tleV0gfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YURpY3RbbG9nRGljdFt4QXhpc0tleV1dW2xpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSldID0gbG9nRGljdFtsb2dLZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBPYmplY3Qua2V5cyhkYXRhRGljdCkubWFwKChrZXkpID0+IChkYXRhRGljdFtrZXldKSk7XG5cbiAgICBjb25zdCBsaW5lRWxlbXMgPSBbLi4uYnVpbGRMaW5lRWxlbXMoJ3lMZWZ0QXhpcycsIGNvbmZpZyksIC4uLmJ1aWxkTGluZUVsZW1zKCd5UmlnaHRBeGlzJywgY29uZmlnKV07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2ctdmlzdWFsaXplci1yb290IHJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS04XCI+XG4gICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogYCR7Y2hhcnRIZWlnaHR9cHhgIH19XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgIG1pbj17eUxlZnRWYWx1ZVJhbmdlWzBdfVxuICAgICAgICAgICAgICAgICAgICBtYXg9e3lMZWZ0VmFsdWVSYW5nZVsxXX1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17KHlMZWZ0UmFuZ2VbMV0gLSB5TGVmdFJhbmdlWzBdKSAvIHNsaWRlclN0ZXBzfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17eUxlZnRSYW5nZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICA8TGluZUNoYXJ0XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXtjaGFydFdpZHRofVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2NoYXJ0SGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgICAgICAgICBtYXJnaW49e3sgdG9wOiA1LCByaWdodDogMzAsIGxlZnQ6IDIwLCBib3R0b206IDUgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFhBeGlzXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17eEF4aXNLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU9e3hBeGlzLnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICAgIGFsbG93RGF0YU92ZXJmbG93XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxZQXhpc1xuICAgICAgICAgICAgICAgICAgICAgIHlBeGlzSWQ9XCJ5TGVmdEF4aXNcIlxuICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU9e3lMZWZ0QXhpcy5zY2FsZX1cbiAgICAgICAgICAgICAgICAgICAgICBhbGxvd0RhdGFPdmVyZmxvd1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8WUF4aXNcbiAgICAgICAgICAgICAgICAgICAgICB5QXhpc0lkPVwieVJpZ2h0QXhpc1wiXG4gICAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU9e3lSaWdodEF4aXMuc2NhbGV9XG4gICAgICAgICAgICAgICAgICAgICAgYWxsb3dEYXRhT3ZlcmZsb3dcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPFRvb2x0aXAgLz5cbiAgICAgICAgICAgICAgICAgICAgPExlZ2VuZCAvPlxuICAgICAgICAgICAgICAgICAgICB7bGluZUVsZW1zfVxuICAgICAgICAgICAgICAgICAgPC9MaW5lQ2hhcnQ+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiBgJHtjaGFydEhlaWdodH1weGAgfX1cbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWxcbiAgICAgICAgICAgICAgICAgICAgbWluPXt5UmlnaHRWYWx1ZVJhbmdlWzBdfVxuICAgICAgICAgICAgICAgICAgICBtYXg9e3lSaWdodFZhbHVlUmFuZ2VbMV19XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9eyh5UmlnaHRSYW5nZVsxXSAtIHlSaWdodFJhbmdlWzBdKSAvIHNsaWRlclN0ZXBzfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17eVJpZ2h0UmFuZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICA8dGQgLz5cbiAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICA8UmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2NoYXJ0V2lkdGh9cHhgLCBtYXJnaW46ICdhdXRvJyB9fVxuICAgICAgICAgICAgICAgICAgICBtaW49e3hWYWx1ZVJhbmdlLm1pbn1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXt4VmFsdWVSYW5nZS5tYXh9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt4UmFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVhSYW5nZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgLz5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj5cbiAgICAgICAgICA8QXhpc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgYXhpc0NvbmZpZz17eUxlZnRBeGlzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgICAgICBheGlzTmFtZT1cInlMZWZ0QXhpc1wiXG4gICAgICAgICAgICAgIGxpbmVzPXt5TGVmdEF4aXMubGluZXN9XG4gICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e29uQXhpc0NvbmZpZ0xpbmVBZGR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQXhpc0NvbmZpZ3VyYXRvcj5cbiAgICAgICAgICA8QXhpc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgYXhpc0NvbmZpZz17eVJpZ2h0QXhpc31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TGluZXNDb25maWd1cmF0b3JcbiAgICAgICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICAgICAgYXhpc05hbWU9XCJ5UmlnaHRBeGlzXCJcbiAgICAgICAgICAgICAgbGluZXM9e3lSaWdodEF4aXMubGluZXN9XG4gICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e29uQXhpc0NvbmZpZ0xpbmVBZGR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQXhpc0NvbmZpZ3VyYXRvcj5cbiAgICAgICAgICA8QXhpc0NvbmZpZ3VyYXRvciBheGlzQ29uZmlnPXt4QXhpc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxvZ1Zpc3VhbGl6ZXIucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgc3RhdHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXhlczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHhBeGlzOiBQcm9wVHlwZXMuc2hhcGUoeyB2YWx1ZVJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSB9KSxcbiAgICAgIHlMZWZ0QXhpczogUHJvcFR5cGVzLnNoYXBlKHsgdmFsdWVSYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikgfSksXG4gICAgICB5UmlnaHRBeGlzOiBQcm9wVHlwZXMuc2hhcGUoeyB2YWx1ZVJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSB9KVxuICAgIH0pXG4gIH0pLFxuICBjb25maWc6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXhlczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHhBeGlzOiBQcm9wVHlwZXMuYW55LFxuICAgICAgeUxlZnRBeGlzOiBQcm9wVHlwZXMuYW55LFxuICAgICAgeVJpZ2h0QXhpczogUHJvcFR5cGVzLmFueVxuICAgIH0pXG4gIH0pLFxuICBvbkF4aXNDb25maWdMaW5lQWRkOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuTG9nVmlzdWFsaXplci5kZWZhdWx0UHJvcHMgPSB7XG4gIHN0YXRzOiBkZWZhdWx0U3RhdHMsXG4gIGNvbmZpZzogZGVmYXVsdENvbmZpZ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9nVmlzdWFsaXplcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvTG9nVmlzdWFsaXplci5qc3giLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JjLXNsaWRlci9hc3NldHMvaW5kZXguY3NzXG4vLyBtb2R1bGUgaWQgPSA4OTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQXhpc1NjYWxlU2VsZWN0b3IgZnJvbSAnLi9BeGlzU2NhbGVTZWxlY3Rvcic7XG5cblxuY29uc3QgZGVmYXVsdEF4aXNDb25maWcgPSB7XG4gIGF4aXNOYW1lOiAnJyxcbiAgc2NhbGU6ICdhdXRvJyxcbiAgcmFuZ2U6IFswLCAxMDBdXG59O1xuXG5jbGFzcyBBeGlzQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmhhbmRsZUNoYW5nZVNjYWxlID0gdGhpcy5oYW5kbGVDaGFuZ2VTY2FsZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2NhbGUoc2NhbGUpIHtcbiAgICBjb25zdCB7IGF4aXNOYW1lIH0gPSB0aGlzLnByb3BzLmF4aXNDb25maWc7XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZVNjYWxlKGF4aXNOYW1lLCBzY2FsZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBheGlzTmFtZSwgc2NhbGUgfSA9IHRoaXMucHJvcHMuYXhpc0NvbmZpZztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImF4aXMtY29uZmlndXJhdG9yIGNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWhlYWRlclwiPntheGlzTmFtZX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYXJkLWJvZHlcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxuICAgICAgICAgICAgICA8QXhpc1NjYWxlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBzY2FsZT17c2NhbGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlU2NhbGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BeGlzQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgYXhpc0NvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGlzTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNjYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKVxuICB9KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LFxuICBvbkNoYW5nZVNjYWxlOiBQcm9wVHlwZXMuZnVuY1xufTtcbkF4aXNDb25maWd1cmF0b3IuZGVmYXVsdFByb3BzID0ge1xuICBheGlzQ29uZmlnOiBkZWZhdWx0QXhpc0NvbmZpZyxcbiAgY2hpbGRyZW46IG51bGwsXG4gIG9uQ2hhbmdlU2NhbGU6ICgpID0+IHt9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlzQ29uZmlndXJhdG9yO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BeGlzQ29uZmlndXJhdG9yLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5cbmNvbnN0IHNjYWxlT3B0aW9ucyA9IFsnbGluZWFyJywgJ2xvZyddO1xuXG5jb25zdCBBeGlzU2NhbGVTZWxlY3RvciA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHNjYWxlLCBvbkNoYW5nZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZUF4aXNLZXkgPSAoZSkgPT4ge1xuICAgIG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBvcHRpb25zID0gc2NhbGVPcHRpb25zLm1hcCgoc2NhbGVLZXkpID0+IChcbiAgICA8b3B0aW9uIHZhbHVlPXtzY2FsZUtleX0ga2V5PXtzY2FsZUtleX0+e3NjYWxlS2V5fTwvb3B0aW9uPlxuICApKTtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IGlkPVwiYXhpcy1zY2FsZS1zZWxlY3Rvci1zZWxlY3RcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17c2NhbGV9IG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2VBeGlzS2V5fT5cbiAgICAgIHtvcHRpb25zfVxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuQXhpc1NjYWxlU2VsZWN0b3IucHJvcFR5cGVzID0ge1xuICBzY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5BeGlzU2NhbGVTZWxlY3Rvci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNjYWxlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlzU2NhbGVTZWxlY3RvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQXhpc1NjYWxlU2VsZWN0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBCdXR0b24sIE1vZGFsLCBNb2RhbEhlYWRlciwgTW9kYWxCb2R5LCBNb2RhbEZvb3RlciB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBMaW5lQ29uZmlndXJhdG9yIGZyb20gJy4vTGluZUNvbmZpZ3VyYXRvcic7XG5cblxuY29uc3QgZGVmYXVsdExpbmUgPSB7XG4gIGNvbmZpZzoge1xuICAgIGNvbG9yOiAnI0FCQ0RFRidcbiAgfVxufTtcblxuY2xhc3MgTGluZXNDb25maWd1cmF0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5oYW5kbGVNb2RhbFRvZ2dsZSA9IHRoaXMuaGFuZGxlTW9kYWxUb2dnbGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUFkZGluZ0xpbmVDaGFuZ2UgPSB0aGlzLmhhbmRsZUFkZGluZ0xpbmVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lQWRkID0gdGhpcy5oYW5kbGVBeGlzQ29uZmlnTGluZUFkZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgICBhZGRpbmdMaW5lOiBkZWZhdWx0TGluZVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVNb2RhbFRvZ2dsZSgpIHtcbiAgICBjb25zdCBuZXdBZGRpbmdMaW5lID0gdGhpcy5zdGF0ZS5zaG93TW9kYWwgPyBkZWZhdWx0TGluZSA6IHRoaXMuc3RhdGUuYWRkaW5nTGluZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNob3dNb2RhbDogIXRoaXMuc3RhdGUuc2hvd01vZGFsLFxuICAgICAgYWRkaW5nTGluZTogbmV3QWRkaW5nTGluZVxuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQWRkaW5nTGluZUNoYW5nZShuZXdMaW5lKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBhZGRpbmdMaW5lOiBuZXdMaW5lLFxuICAgICAgc2hvd0xpbmVDb25maWdFcnJvcjogZmFsc2VcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUF4aXNDb25maWdMaW5lQWRkKCkge1xuICAgIGNvbnN0IHsgYXhpc05hbWUsIG9uQXhpc0NvbmZpZ0xpbmVBZGQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBhZGRpbmdMaW5lIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKGFkZGluZ0xpbmUucmVzdWx0SWQgPT0gbnVsbCB8fCBhZGRpbmdMaW5lLmxvZ0tleSA9PSBudWxsKSB7XG4gICAgICAvLyBpbnZhbGlkXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hvd0xpbmVDb25maWdFcnJvcjogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQoYXhpc05hbWUsIGFkZGluZ0xpbmUpO1xuICAgICAgdGhpcy5oYW5kbGVNb2RhbFRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUya2V5LCB0cnVuY2F0ZUZvcndhcmQgfSA9IFV0aWxzO1xuICAgIGNvbnN0IHsgcmVzdWx0cywgbGluZXMgPSBbXSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGFkZGluZ0xpbmUsIHNob3dMaW5lQ29uZmlnRXJyb3IgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBsaW5lQ29uZmlndXJhdG9yRWxlbXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbbGluZS5yZXN1bHRJZF0gfHwge307XG4gICAgICBjb25zdCB7IGNvbmZpZyA9IHt9IH0gPSBsaW5lO1xuXG4gICAgICBjb25zdCBjb2xvckJsb2NrU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiAnMjBweCcsXG4gICAgICAgIGhlaWdodDogJzE1cHgnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbmZpZy5jb2xvclxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiIGtleT17bGluZTJrZXkobGluZSl9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xXCIgc3R5bGU9e2NvbG9yQmxvY2tTdHlsZX0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTVcIj57dHJ1bmNhdGVGb3J3YXJkKHJlc3VsdC5wYXRoTmFtZSwgMjQpfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNFwiPntsaW5lLmxvZ0tleX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTFcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbGk+XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICAgICAge2xpbmVDb25maWd1cmF0b3JFbGVtc31cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgLz4gQWRkXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8TW9kYWwgaXNPcGVuPXt0aGlzLnN0YXRlLnNob3dNb2RhbH0gdG9nZ2xlPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfSBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgIDxNb2RhbEhlYWRlciB0b2dnbGU9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9Pk1vZGFsIHRpdGxlPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICAgIDxMaW5lQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICAgICAgICBsaW5lPXthZGRpbmdMaW5lfVxuICAgICAgICAgICAgICAgIHNob3dFcnJvcj17c2hvd0xpbmVDb25maWdFcnJvcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVBZGRpbmdMaW5lQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Nb2RhbEJvZHk+XG4gICAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfT5DYW5jZWw8L0J1dHRvbj57JyAnfVxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGR9PkFkZDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbEZvb3Rlcj5cbiAgICAgICAgICA8L01vZGFsPlxuXG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuTGluZXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgYXhpc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGluZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICByZXN1bHRJZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0pXG4gICksXG4gIG9uQXhpc0NvbmZpZ0xpbmVBZGQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbkxpbmVzQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGluZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5lc0NvbmZpZ3VyYXRvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvTGluZXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGb3JtLCBGb3JtR3JvdXAsIExhYmVsLCBGb3JtVGV4dCB9IGZyb20gJ3JlYWN0c3RyYXAnO1xuXG5cbmNvbnN0IFJFU1VMVF9OT05FID0gLTE7XG5jb25zdCBMT0dfS0VZX05PTkUgPSAnJztcblxuY29uc3QgZ2V0TG9nS2V5cyA9IChyZXN1bHQgPSB7fSkgPT4ge1xuICBjb25zdCB7IGxvZ3MgPSBbXSB9ID0gcmVzdWx0O1xuICBjb25zdCBsb2dLZXlTZXQgPSB7fTtcbiAgbG9ncy5mb3JFYWNoKChsb2cpID0+IHtcbiAgICBjb25zdCB7IGxvZ0l0ZW1zID0gW10gfSA9IGxvZztcbiAgICBsb2dJdGVtcy5mb3JFYWNoKChsb2dJdGVtKSA9PiB7XG4gICAgICBsb2dLZXlTZXRbbG9nSXRlbS5rZXldID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhsb2dLZXlTZXQpO1xufTtcblxuY29uc3QgY3JlYXRlUmVzdWx0T3B0aW9uRWxlbXMgPSAocmVzdWx0cyA9IFtdKSA9PiBbXG4gIDxvcHRpb24gdmFsdWU9e1JFU1VMVF9OT05FfSBrZXk9e1JFU1VMVF9OT05FfSBkaXNhYmxlZD4tLSBzZWxlY3QgcmVzdWx0IC0tPC9vcHRpb24+LFxuICAuLi5PYmplY3Qua2V5cyhyZXN1bHRzKS5tYXAoKHJlc3VsdElkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgcmV0dXJuIChcbiAgICAgIDxvcHRpb24gdmFsdWU9e3Jlc3VsdC5pZH0ga2V5PXtyZXN1bHQuaWR9PntyZXN1bHQuaWR9OiB7cmVzdWx0LnBhdGhOYW1lfTwvb3B0aW9uPlxuICAgICk7XG4gIH0pXG5dO1xuXG5jb25zdCBjcmVhdGVMb2dLZXlPcHRpb25FbGVtcyA9IChyZXN1bHQgPSB7fSkgPT4ge1xuICBjb25zdCBsb2dLZXlzID0gZ2V0TG9nS2V5cyhyZXN1bHQpO1xuICByZXR1cm4gW1xuICAgIDxvcHRpb24gdmFsdWU9e0xPR19LRVlfTk9ORX0ga2V5PXtMT0dfS0VZX05PTkV9IGRpc2FibGVkPi0tIHNlbGVjdCBsb2cga2V5IC0tPC9vcHRpb24+LFxuICAgIC4uLmxvZ0tleXMubWFwKChsb2dLZXkpID0+IChcbiAgICAgIDxvcHRpb24gdmFsdWU9e2xvZ0tleX0ga2V5PXtsb2dLZXl9Pntsb2dLZXl9PC9vcHRpb24+XG4gICAgKSlcbiAgXTtcbn07XG5cbmNsYXNzIExpbmVDb25maWd1cmF0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2UgPSB0aGlzLmhhbmRsZVJlc3VsdENoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTG9nS2V5Q2hhbmdlID0gdGhpcy5oYW5kbGVMb2dLZXlDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93RXJyb3I6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVJlc3VsdENoYW5nZShlKSB7XG4gICAgY29uc3QgeyBsaW5lLCBvbkNoYW5nZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBuZXdSZXN1bHRJZCA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCk7XG4gICAgb25DaGFuZ2UoeyAuLi5saW5lLCByZXN1bHRJZDogbmV3UmVzdWx0SWQgfSk7XG4gIH1cblxuICBoYW5kbGVMb2dLZXlDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3TG9nS2V5ID0gZS50YXJnZXQudmFsdWU7XG4gICAgb25DaGFuZ2UoeyAuLi5saW5lLCBsb2dLZXk6IG5ld0xvZ0tleSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHJlc3VsdHMsIGxpbmUgPSB7fSwgc2hvd0Vycm9yID0gZmFsc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByZXN1bHRJZCA9IFJFU1VMVF9OT05FLCBsb2dLZXkgPSBMT0dfS0VZX05PTkUsIGNvbmZpZyA9IHt9IH0gPSBsaW5lO1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbcmVzdWx0SWRdIHx8IHt9O1xuICAgIGNvbnN0IGNvbG9yID0gY29uZmlnLmNvbG9yO1xuXG4gICAgY29uc3QgY29sb3JCbG9ja1N0eWxlID0ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvclxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHRPcHRpb25FbGVtcyA9IGNyZWF0ZVJlc3VsdE9wdGlvbkVsZW1zKHJlc3VsdHMpO1xuICAgIGNvbnN0IGxvZ0tleU9wdGlvbkVsZW1zID0gY3JlYXRlTG9nS2V5T3B0aW9uRWxlbXMocmVzdWx0KTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImxpbmUtY29uZmlndXJhdG9yXCI+XG4gICAgICAgIDxGb3JtPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWw+Y29sb3I8L0xhYmVsPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17Y29sb3JCbG9ja1N0eWxlfT57Y29sb3J9PC9kaXY+XG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCBmb3I9XCJsaW5lLWNvbmZpZ3VyYXRvci1yZXN1bHQtc2VsZWN0XCI+cmVzdWx0PC9MYWJlbD48YnIgLz5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdHlwZT1cInNlbGVjdFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBpZD1cImxpbmUtY29uZmlndXJhdG9yLXJlc3VsdC1zZWxlY3RcIlxuICAgICAgICAgICAgICB2YWx1ZT17cmVzdWx0SWR9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVJlc3VsdENoYW5nZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3Jlc3VsdE9wdGlvbkVsZW1zfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8Rm9ybVRleHQgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIiBoaWRkZW49eyFzaG93RXJyb3IgfHwgcmVzdWx0SWQgIT09IFJFU1VMVF9OT05FfT5cbiAgICAgICAgICAgICAgU2VsZWN0IGEgcmVzdWx0ISFcbiAgICAgICAgICAgIDwvRm9ybVRleHQ+XG4gICAgICAgICAgPC9Gb3JtR3JvdXA+XG4gICAgICAgICAgPEZvcm1Hcm91cD5cbiAgICAgICAgICAgIDxMYWJlbCBmb3I9XCJsaW5lLWNvbmZpZ3VyYXRvci1sb2cta2V5LXNlbGVjdFwiPmxvZyBrZXk8L0xhYmVsPjxiciAvPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICB0eXBlPVwic2VsZWN0XCJcbiAgICAgICAgICAgICAgbmFtZT1cInNlbGVjdFwiXG4gICAgICAgICAgICAgIGlkPVwibGluZS1jb25maWd1cmF0b3ItbG9nLWtleS1zZWxlY3RcIlxuICAgICAgICAgICAgICB2YWx1ZT17bG9nS2V5fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17cmVzdWx0SWQgPT09IFJFU1VMVF9OT05FfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVMb2dLZXlDaGFuZ2V9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsb2dLZXlPcHRpb25FbGVtc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPEZvcm1UZXh0IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCIgaGlkZGVuPXshc2hvd0Vycm9yIHx8IGxvZ0tleSAhPT0gTE9HX0tFWV9OT05FfT5cbiAgICAgICAgICAgICAgU2VsZWN0IGEgbG9nIGtleSEhXG4gICAgICAgICAgICA8L0Zvcm1UZXh0PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICA8L0Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkxpbmVDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgbGluZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByZXN1bHRJZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBsb2dLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgY29sb3I6IFByb3BUeXBlcy5zdHJpbmdcbiAgICB9KVxuICB9KSxcbiAgc2hvd0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5MaW5lQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGluZToge30sXG4gIHNob3dFcnJvcjogZmFsc2UsXG4gIG9uQ2hhbmdlOiAoKSA9PiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGluZUNvbmZpZ3VyYXRvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvTGluZUNvbmZpZ3VyYXRvci5qc3giXSwic291cmNlUm9vdCI6IiJ9