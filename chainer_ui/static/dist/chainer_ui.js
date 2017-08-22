webpackJsonp([0],{

/***/ 114:
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

/***/ 269:
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

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RESULTS_REQUEST */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RESULTS_SUCCESS; });
/* unused harmony export RESULTS_FAILUE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return loadResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXIS_CONFIG_LINE_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AXIS_CONFIG_LINE_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return addLineToAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return removeLineFromAxis; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__middleware_api__ = __webpack_require__(269);
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

var removeLineFromAxis = function removeLineFromAxis(axisName, lineKey) {
  return {
    type: AXIS_CONFIG_LINE_REMOVE,
    axisName: axisName,
    lineKey: lineKey
  };
};

/***/ }),

/***/ 393:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(394);


/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_configureStore__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__ = __webpack_require__(531);







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

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middleware_api__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers__ = __webpack_require__(527);







var configureStore = function configureStore(preloadedState) {
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_4__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3_redux_logger__["createLogger"])()];

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_5__reducers__["a" /* default */], preloadedState, __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(undefined, middleware));

  Object(__WEBPACK_IMPORTED_MODULE_2_redux_persist__["persistStore"])(store);

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(114);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* RESULTS_SUCCESS */]:
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
  var line2key = __WEBPACK_IMPORTED_MODULE_4__utils__["a" /* default */].line2key;
  var axisName = action.axisName,
      line = action.line,
      lineKey = action.lineKey;

  if (axisName == null) {
    return state;
  }
  var axisConfig = state[axisName] || { axisName: axisName };
  var _axisConfig$lines = axisConfig.lines,
      lines = _axisConfig$lines === undefined ? [] : _axisConfig$lines;


  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["a" /* AXIS_CONFIG_LINE_ADD */]:
      if (line == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        lines: [].concat(_toConsumableArray(lines), [line])
      })));
    case __WEBPACK_IMPORTED_MODULE_3__actions__["b" /* AXIS_CONFIG_LINE_REMOVE */]:
      if (lineKey == null) {
        return state;
      }
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        lines: [].concat(_toConsumableArray(lines.filter(function (l) {
          return line2key(l) !== lineKey;
        })))
      })));
    default:
      return state;
  }
};

var config = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  axes: axes
});

var rootReducer = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
  entities: entities,
  config: Object(__WEBPACK_IMPORTED_MODULE_1_redux_persist__["persistReducer"])({ key: 'config', storage: __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__["a" /* default */] }, config)
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createWebStorage__ = __webpack_require__(529);


/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__createWebStorage__["a" /* default */])('local'));

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createWebStorage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getStorage__ = __webpack_require__(530);


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

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getStorage;
var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

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

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ExperimentsTable__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_LogVisualizer__ = __webpack_require__(534);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var resultsLoadInterval = 5 * 1000;

var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer() {
    _classCallCheck(this, ChainerUIContainer);

    return _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).apply(this, arguments));
  }

  _createClass(ChainerUIContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resultsLoadTimer = setInterval(this.props.loadResults, resultsLoadInterval);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.resultsLoadTimer);
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
          onAxisConfigLineAdd: this.props.addLineToAxis,
          onAxisConfigLineRemove: this.props.removeLineFromAxis
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
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
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
  var entities = state.entities,
      _state$config = state.config,
      config = _state$config === undefined ? defaultConfig : _state$config;
  var _entities$results2 = entities.results,
      results = _entities$results2 === undefined ? {} : _entities$results2;

  var stats = mapEntitiesToStats(entities);
  return { results: results, config: config, stats: stats };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["connect"])(mapStateToProps, {
  loadResults: __WEBPACK_IMPORTED_MODULE_3__actions__["e" /* loadResults */],
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* addLineToAxis */],
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["f" /* removeLineFromAxis */]
})(ChainerUIContainer));

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(533);




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

/***/ 533:
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

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__ = __webpack_require__(911);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__ = __webpack_require__(912);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__ = __webpack_require__(914);
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
          onAxisConfigLineAdd = _props.onAxisConfigLineAdd,
          onAxisConfigLineRemove = _props.onAxisConfigLineRemove;
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
                      domain: ['auto', 'auto'],
                      allowDataOverflow: true
                    }),
                    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], {
                      yAxisId: 'yRightAxis',
                      orientation: 'right',
                      scale: yRightAxis.scale,
                      domain: ['auto', 'auto'],
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
              onAxisConfigLineAdd: onAxisConfigLineAdd,
              onAxisConfigLineRemove: onAxisConfigLineRemove
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
              onAxisConfigLineAdd: onAxisConfigLineAdd,
              onAxisConfigLineRemove: onAxisConfigLineRemove
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
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};
LogVisualizer.defaultProps = {
  stats: defaultStats,
  config: defaultConfig
};

/* harmony default export */ __webpack_exports__["a"] = (LogVisualizer);

/***/ }),

/***/ 911:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisScaleSelector__ = __webpack_require__(913);
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

/***/ 913:
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

/***/ 914:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__ = __webpack_require__(919);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__LineConfigurator__ = __webpack_require__(920);
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
    _this.handleAxisConfigLineRemove = _this.handleAxisConfigLineRemove.bind(_this);

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
    key: 'handleAxisConfigLineRemove',
    value: function handleAxisConfigLineRemove(lineKey) {
      var _props2 = this.props,
          axisName = _props2.axisName,
          onAxisConfigLineRemove = _props2.onAxisConfigLineRemove;

      onAxisConfigLineRemove(axisName, lineKey);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var line2key = __WEBPACK_IMPORTED_MODULE_3__utils__["a" /* default */].line2key;
      var _props3 = this.props,
          results = _props3.results,
          _props3$lines = _props3.lines,
          lines = _props3$lines === undefined ? [] : _props3$lines;
      var _state = this.state,
          addingLine = _state.addingLine,
          showLineConfigError = _state.showLineConfigError;


      var lineConfiguratorElems = lines.map(function (line) {
        var result = results[line.resultId] || {};

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__LinesConfiguratorRow__["a" /* default */], {
          line: line,
          result: result,
          onRemove: _this2.handleAxisConfigLineRemove,
          key: line2key(line)
        });
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
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__LineConfigurator__["a" /* default */], {
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
  onAxisConfigLineAdd: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

LinesConfigurator.defaultProps = {
  lines: []
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfigurator);

/***/ }),

/***/ 919:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(114);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LinesConfiguratorRow = function (_React$Component) {
  _inherits(LinesConfiguratorRow, _React$Component);

  function LinesConfiguratorRow(props) {
    _classCallCheck(this, LinesConfiguratorRow);

    var _this = _possibleConstructorReturn(this, (LinesConfiguratorRow.__proto__ || Object.getPrototypeOf(LinesConfiguratorRow)).call(this, props));

    _this.handleRemoveClick = _this.handleRemoveClick.bind(_this);
    return _this;
  }

  _createClass(LinesConfiguratorRow, [{
    key: 'handleRemoveClick',
    value: function handleRemoveClick() {
      var line2key = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].line2key;
      var _props = this.props,
          line = _props.line,
          onRemove = _props.onRemove;


      onRemove(line2key(line));
    }
  }, {
    key: 'render',
    value: function render() {
      var line2key = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].line2key,
          truncateForward = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].truncateForward;
      var _props2 = this.props,
          line = _props2.line,
          result = _props2.result;
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
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }).isRequired,
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  onRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};

LinesConfiguratorRow.defaultProps = {
  onRemove: function onRemove() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfiguratorRow);

/***/ }),

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_reactstrap__ = __webpack_require__(219);
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

},[393]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmUvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2NvbmZpZ3VyZVN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgtcGVyc2lzdC9lcy9zdG9yYWdlL2NyZWF0ZVdlYlN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9nZXRTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhwZXJpbWVudHNUYWJsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVzdWx0Um93LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyLmpzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmMtc2xpZGVyL2Fzc2V0cy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhpc0NvbmZpZ3VyYXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhpc1NjYWxlU2VsZWN0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xpbmVzQ29uZmlndXJhdG9yLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9MaW5lc0NvbmZpZ3VyYXRvclJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGluZUNvbmZpZ3VyYXRvci5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJsaW5lIiwicmVzdWx0SWQiLCJsb2dLZXkiLCJheGlzTmFtZSIsImxpbmUya2V5Iiwic3RyaW5nIiwibGVuZ3RoIiwiYmVnaW5uaW5nIiwic3RyIiwic3Vic3RyaW5nIiwiQVBJX1JPT1QiLCJjYWxsQXBpIiwiZW5kcG9pbnQiLCJmdWxsVXJsIiwiaW5kZXhPZiIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm9rIiwiUHJvbWlzZSIsInJlamVjdCIsIkNBTExfQVBJIiwic3RvcmUiLCJuZXh0IiwiYWN0aW9uIiwiY2FsbEFQSSIsInR5cGVzIiwiZ2V0U3RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJFcnJvciIsImFjdGlvbldpdGgiLCJkYXRhIiwiZmluYWxBY3Rpb24iLCJyZXF1ZXN0VHlwZSIsInN1Y2Nlc3NUeXBlIiwiZmFpbHVyZVR5cGUiLCJ0eXBlIiwiZXJyb3IiLCJtZXNzYWdlIiwiUkVTVUxUU19SRVFVRVNUIiwiUkVTVUxUU19TVUNDRVNTIiwiUkVTVUxUU19GQUlMVUUiLCJmZXRjaFJlc3VsdHMiLCJsb2FkUmVzdWx0cyIsImRpc3BhdGNoIiwiQVhJU19DT05GSUdfTElORV9BREQiLCJBWElTX0NPTkZJR19MSU5FX1JFTU9WRSIsImFkZExpbmVUb0F4aXMiLCJyZW1vdmVMaW5lRnJvbUF4aXMiLCJsaW5lS2V5IiwiY29uZmlndXJlU3RvcmUiLCJyZW5kZXIiLCJDb21wb25lbnQiLCJhcHBOb2RlIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDaGFpbmVyVUlDb250YWluZXIiLCJtb2R1bGUiLCJob3QiLCJhY2NlcHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJwcmVsb2FkZWRTdGF0ZSIsIm1pZGRsZXdhcmUiLCJjcmVhdGVMb2dnZXIiLCJjcmVhdGVTdG9yZSIsImFwcGx5TWlkZGxld2FyZSIsInBlcnNpc3RTdG9yZSIsImVudGl0aWVzIiwic3RhdGUiLCJyZXN1bHRzIiwicmVzdWx0c0xpc3QiLCJmb3JFYWNoIiwicmVzdWx0IiwiaWQiLCJheGVzIiwiYXhpc0NvbmZpZyIsImxpbmVzIiwiZmlsdGVyIiwibCIsImNvbmZpZyIsImNvbWJpbmVSZWR1Y2VycyIsInJvb3RSZWR1Y2VyIiwicGVyc2lzdFJlZHVjZXIiLCJrZXkiLCJzdG9yYWdlIiwiY3JlYXRlV2ViU3RvcmFnZSIsImdldFN0b3JhZ2UiLCJnZXRJdGVtIiwiY2IiLCJzZXRJdGVtIiwiaXRlbSIsImVyciIsInJlbW92ZUl0ZW0iLCJfdHlwZW9mIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJvYmoiLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsIm5vb3AiLCJub29wU3RvcmFnZSIsImhhc1N0b3JhZ2UiLCJzdG9yYWdlVHlwZSIsIndpbmRvdyIsInRlc3RLZXkiLCJlIiwiY29uc29sZSIsIndhcm4iLCJyZXN1bHRzTG9hZEludGVydmFsIiwicmVzdWx0c0xvYWRUaW1lciIsInNldEludGVydmFsIiwicHJvcHMiLCJjbGVhckludGVydmFsIiwic3RhdHMiLCJSZWFjdCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9iamVjdE9mIiwiYW55IiwiaXNSZXF1aXJlZCIsInNoYXBlIiwiYXJnS2V5cyIsImFycmF5T2YiLCJmdW5jIiwibWFwRW50aXRpZXNUb1N0YXRzIiwiYXJnS2V5U2V0IiwiT2JqZWN0Iiwia2V5cyIsImFyZ3MiLCJhcmciLCJ4QXhpcyIsInlMZWZ0QXhpcyIsInlSaWdodEF4aXMiLCJkZWZhdWx0Q29uZmlnIiwibWFwU3RhdGVUb1Byb3BzIiwiY29ubmVjdCIsIkV4cGVyaW1lbnRzVGFibGUiLCJhcmdIZWFkZXJFbGVtcyIsIm1hcCIsImFyZ0tleSIsInJlc3VsdFJvd0VsZW1zIiwibnVtYmVyIiwicGF0aE5hbWUiLCJsb2dzIiwiZGVmYXVsdFByb3BzIiwiZW1wdHlTdHIiLCJSZXN1bHRSb3ciLCJsYXN0TG9nIiwibGFzdExvZ0RpY3QiLCJsb2dJdGVtcyIsImxvZ0l0ZW0iLCJ2YWx1ZSIsImFyZ0RpY3QiLCJhcmdFbGVtcyIsImNvbnRlbnQiLCJlcG9jaCIsIml0ZXJhdGlvbiIsImVsYXBzZWRfdGltZSIsInNsaWRlclN0ZXBzIiwiZGVmYXVsdFN0YXRzIiwiZGVmYXVsdFJhbmdlIiwiZGVmYXVsdFhBeGlzQ29uZmlnIiwieEF4aXNLZXkiLCJzY2FsZSIsInJhbmdlIiwiZGVmYXVsdFlBeGlzQ29uZmlnIiwiYnVpbGRMaW5lRWxlbSIsImxpbmUyZGF0YUtleSIsImNvbG9yIiwiYnVpbGRMaW5lRWxlbXMiLCJMb2dWaXN1YWxpemVyIiwib25BeGlzQ29uZmlnTGluZUFkZCIsIm9uQXhpc0NvbmZpZ0xpbmVSZW1vdmUiLCJsZWZ0TGluZXMiLCJyaWdodExpbmVzIiwiYXhpc0xpbmVzIiwieFJhbmdlIiwieUxlZnRSYW5nZSIsInlSaWdodFJhbmdlIiwieFZhbHVlUmFuZ2UiLCJ2YWx1ZVJhbmdlIiwieUxlZnRWYWx1ZVJhbmdlIiwieVJpZ2h0VmFsdWVSYW5nZSIsImNoYXJ0V2lkdGgiLCJjaGFydEhlaWdodCIsImRhdGFEaWN0IiwibG9nIiwibG9nRGljdCIsImxpbmVFbGVtcyIsImhlaWdodCIsInRvcCIsInJpZ2h0IiwibGVmdCIsImJvdHRvbSIsIndpZHRoIiwibWFyZ2luIiwibWluIiwibWF4IiwiaGFuZGxlQ2hhbmdlWFJhbmdlIiwiZGVmYXVsdEF4aXNDb25maWciLCJBeGlzQ29uZmlndXJhdG9yIiwiaGFuZGxlQ2hhbmdlU2NhbGUiLCJiaW5kIiwib25DaGFuZ2VTY2FsZSIsImNoaWxkcmVuIiwiZWxlbWVudCIsInNjYWxlT3B0aW9ucyIsIkF4aXNTY2FsZVNlbGVjdG9yIiwib25DaGFuZ2UiLCJoYW5kbGVDaGFuZ2VBeGlzS2V5IiwidGFyZ2V0Iiwib3B0aW9ucyIsInNjYWxlS2V5IiwiZGVmYXVsdExpbmUiLCJMaW5lc0NvbmZpZ3VyYXRvciIsImhhbmRsZU1vZGFsVG9nZ2xlIiwiaGFuZGxlQWRkaW5nTGluZUNoYW5nZSIsImhhbmRsZUF4aXNDb25maWdMaW5lQWRkIiwiaGFuZGxlQXhpc0NvbmZpZ0xpbmVSZW1vdmUiLCJzaG93TW9kYWwiLCJhZGRpbmdMaW5lIiwibmV3QWRkaW5nTGluZSIsInNldFN0YXRlIiwibmV3TGluZSIsInNob3dMaW5lQ29uZmlnRXJyb3IiLCJsaW5lQ29uZmlndXJhdG9yRWxlbXMiLCJMaW5lc0NvbmZpZ3VyYXRvclJvdyIsImhhbmRsZVJlbW92ZUNsaWNrIiwib25SZW1vdmUiLCJ0cnVuY2F0ZUZvcndhcmQiLCJjb2xvckJsb2NrU3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJSRVNVTFRfTk9ORSIsIkxPR19LRVlfTk9ORSIsImdldExvZ0tleXMiLCJsb2dLZXlTZXQiLCJjcmVhdGVSZXN1bHRPcHRpb25FbGVtcyIsImNyZWF0ZUxvZ0tleU9wdGlvbkVsZW1zIiwibG9nS2V5cyIsIkxpbmVDb25maWd1cmF0b3IiLCJoYW5kbGVSZXN1bHRDaGFuZ2UiLCJoYW5kbGVMb2dLZXlDaGFuZ2UiLCJzaG93RXJyb3IiLCJuZXdSZXN1bHRJZCIsInBhcnNlSW50IiwibmV3TG9nS2V5IiwicmVzdWx0T3B0aW9uRWxlbXMiLCJsb2dLZXlPcHRpb25FbGVtcyIsImJvb2wiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsSzs7Ozs7Ozs2QkFDWUMsSSxFQUFNO0FBQ3BCLGFBQVVBLEtBQUtDLFFBQWYsU0FBMkJELEtBQUtFLE1BQWhDO0FBQ0Q7OztpQ0FFbUJGLEksRUFBTUcsUSxFQUFVO0FBQ2xDLGFBQVVBLFFBQVYsU0FBc0JKLE1BQU1LLFFBQU4sQ0FBZUosSUFBZixDQUF0QjtBQUNEOzs7b0NBRXNCSyxNLEVBQVFDLE0sRUFBMkI7QUFBQSxVQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDeEQsVUFBTUMsTUFBTUgsVUFBVSxFQUF0QjtBQUNBLFVBQUlHLElBQUlGLE1BQUosR0FBYUEsTUFBakIsRUFBeUI7QUFDdkIsZUFBT0MsWUFBWUMsSUFBSUMsU0FBSixDQUFlRCxJQUFJRixNQUFKLEdBQWFBLE1BQWQsR0FBd0JDLFVBQVVELE1BQWhELEVBQXdERSxJQUFJRixNQUE1RCxDQUFuQjtBQUNEO0FBQ0QsYUFBT0UsR0FBUDtBQUNEOzs7Ozs7QUFHSCx5REFBZVQsS0FBZixFOzs7Ozs7Ozs7Ozs7O0FDbEJBLElBQU1XLFdBQVcsVUFBakI7O0FBRUEsSUFBTUMsVUFBVSxTQUFWQSxPQUFVLENBQUNDLFFBQUQsRUFBYztBQUM1QixNQUFNQyxVQUFXRCxTQUFTRSxPQUFULENBQWlCSixRQUFqQixNQUErQixDQUFDLENBQWpDLEdBQXNDQSxXQUFXRSxRQUFqRCxHQUE0REEsUUFBNUU7O0FBRUEsU0FBT0csTUFBTUYsT0FBTixFQUNKRyxJQURJLENBQ0MsVUFBQ0MsUUFBRDtBQUFBLFdBQ0pBLFNBQVNDLElBQVQsR0FBZ0JGLElBQWhCLENBQXFCLFVBQUNFLElBQUQsRUFBVTtBQUM3QixVQUFJLENBQUNELFNBQVNFLEVBQWQsRUFBa0I7QUFDaEIsZUFBT0MsUUFBUUMsTUFBUixDQUFlSCxJQUFmLENBQVA7QUFDRDtBQUNELGFBQU9BLElBQVA7QUFDRCxLQUxELENBREk7QUFBQSxHQURELENBQVA7QUFTRCxDQVpEOztBQWNPLElBQU1JLFdBQVcsVUFBakI7O0FBRVAseURBQWUsVUFBQ0MsS0FBRDtBQUFBLFNBQVcsVUFBQ0MsSUFBRDtBQUFBLFdBQVUsVUFBQ0MsTUFBRCxFQUFZO0FBQzlDLFVBQU1DLFVBQVVELE9BQU9ILFFBQVAsQ0FBaEI7QUFDQSxVQUFJLE9BQU9JLE9BQVAsS0FBbUIsV0FBdkIsRUFBb0M7QUFDbEMsZUFBT0YsS0FBS0MsTUFBTCxDQUFQO0FBQ0Q7O0FBSjZDLFVBTXhDYixRQU53QyxHQU0zQmMsT0FOMkIsQ0FNeENkLFFBTndDO0FBQUEsVUFPdENlLEtBUHNDLEdBTzVCRCxPQVA0QixDQU90Q0MsS0FQc0M7OztBQVM5QyxVQUFJLE9BQU9mLFFBQVAsS0FBb0IsVUFBeEIsRUFBb0M7QUFDbENBLG1CQUFXQSxTQUFTVyxNQUFNSyxRQUFOLEVBQVQsQ0FBWDtBQUNEOztBQUVELFVBQUksQ0FBQ0MsTUFBTUMsT0FBTixDQUFjSCxLQUFkLENBQUQsSUFBeUJBLE1BQU1yQixNQUFOLEtBQWlCLENBQTlDLEVBQWlEO0FBQy9DLGNBQU0sSUFBSXlCLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0Q7O0FBRUQsVUFBTUMsYUFBYSxTQUFiQSxVQUFhLENBQUNDLElBQUQsRUFBVTtBQUMzQixZQUFNQywyQkFBbUJULE1BQW5CLEVBQThCUSxJQUE5QixDQUFOO0FBQ0EsZUFBT0MsWUFBWVosUUFBWixDQUFQO0FBQ0EsZUFBT1ksV0FBUDtBQUNELE9BSkQ7O0FBakI4QyxrQ0F1QkVQLEtBdkJGO0FBQUEsVUF1QnZDUSxXQXZCdUM7QUFBQSxVQXVCMUJDLFdBdkIwQjtBQUFBLFVBdUJiQyxXQXZCYTs7QUF3QjlDYixXQUFLUSxXQUFXLEVBQUVNLE1BQU1ILFdBQVIsRUFBWCxDQUFMOztBQUVBLGFBQU94QixRQUFRQyxRQUFSLEVBQWtCSSxJQUFsQixDQUNMLFVBQUNDLFFBQUQ7QUFBQSxlQUFjTyxLQUFLUSxXQUFXO0FBQzVCZiw0QkFENEI7QUFFNUJxQixnQkFBTUY7QUFGc0IsU0FBWCxDQUFMLENBQWQ7QUFBQSxPQURLLEVBS0wsVUFBQ0csS0FBRDtBQUFBLGVBQVdmLEtBQUtRLFdBQVc7QUFDekJNLGdCQUFNRCxXQURtQjtBQUV6QkUsaUJBQU9BLE1BQU1DLE9BQU4sSUFBaUI7QUFGQyxTQUFYLENBQUwsQ0FBWDtBQUFBLE9BTEssQ0FBUDtBQVVELEtBcEN5QjtBQUFBLEdBQVg7QUFBQSxDQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQkE7O0FBR0E7O0FBRU8sSUFBTUMsa0JBQWtCLGlCQUF4QjtBQUNBLElBQU1DLGtCQUFrQixpQkFBeEI7QUFDQSxJQUFNQyxpQkFBaUIsZ0JBQXZCOztBQUVQLElBQU1DLGVBQWUsU0FBZkEsWUFBZTtBQUFBLDZCQUNsQixpRUFEa0IsRUFDUDtBQUNWakIsV0FBTyxDQUFDYyxlQUFELEVBQWtCQyxlQUFsQixFQUFtQ0MsY0FBbkMsQ0FERztBQUVWL0IsY0FBVTtBQUZBLEdBRE87QUFBQSxDQUFyQjs7QUFPTyxJQUFNaUMsY0FBYyxTQUFkQSxXQUFjO0FBQUEsU0FBTSxVQUFDQyxRQUFEO0FBQUEsV0FBY0EsU0FBU0YsY0FBVCxDQUFkO0FBQUEsR0FBTjtBQUFBLENBQXBCOztBQUdQOztBQUVPLElBQU1HLHVCQUF1QixzQkFBN0I7QUFDQSxJQUFNQywwQkFBMEIseUJBQWhDOztBQUVBLElBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQzlDLFFBQUQsRUFBV0gsSUFBWDtBQUFBLFNBQXFCO0FBQ2hEc0MsVUFBTVMsb0JBRDBDO0FBRWhENUMsc0JBRmdEO0FBR2hESDtBQUhnRCxHQUFyQjtBQUFBLENBQXRCOztBQU1BLElBQU1rRCxxQkFBcUIsU0FBckJBLGtCQUFxQixDQUFDL0MsUUFBRCxFQUFXZ0QsT0FBWDtBQUFBLFNBQXdCO0FBQ3hEYixVQUFNVSx1QkFEa0Q7QUFFeEQ3QyxzQkFGd0Q7QUFHeERnRDtBQUh3RCxHQUF4QjtBQUFBLENBQTNCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxJQUFNNUIsUUFBUSw4RUFBQTZCLEVBQWQ7O0FBRUEsSUFBTUMsU0FBUyxTQUFUQSxNQUFTLENBQUNDLFNBQUQsRUFBWUMsT0FBWixFQUF3QjtBQUNyQ0MsRUFBQSxpREFBQUEsQ0FBU0gsTUFBVCxDQUNFO0FBQUMseURBQUQ7QUFBQSxNQUFVLE9BQU85QixLQUFqQjtBQUNFO0FBQUMsb0VBQUQ7QUFBQTtBQUNFLGtFQUFDLFNBQUQ7QUFERjtBQURGLEdBREYsRUFNRWdDLE9BTkY7QUFRRCxDQVREOztBQVdBLElBQUksS0FBSixFQUFnQjtBQUNkLE1BQU1BLFVBQVVFLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQUQsV0FBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCTCxPQUExQjtBQUNBRixTQUFPUSxrQkFBUCxFQUEyQk4sT0FBM0I7QUFDQU8sU0FBT0MsR0FBUCxDQUFXQyxNQUFYLENBQWtCLGlDQUFsQixFQUFxRCxZQUFNO0FBQUVYLFdBQU9RLGtCQUFQLEVBQTJCTixPQUEzQjtBQUFzQyxHQUFuRztBQUNELENBTEQsTUFLTztBQUNMRSxXQUFTUSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxRQUFNVixVQUFVRSxTQUFTUyxjQUFULENBQXdCLGlCQUF4QixDQUFoQjtBQUNBLFFBQUlYLE9BQUosRUFBYTtBQUNYRixhQUFPLCtFQUFQLEVBQTJCRSxPQUEzQjtBQUNEO0FBQ0YsR0FMRDtBQU1ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1ILGlCQUFpQixTQUFqQkEsY0FBaUIsQ0FBQ2UsY0FBRCxFQUFvQjtBQUN6QyxNQUFNQyxhQUFhLENBQUMsbURBQUQsRUFBUSxnRUFBUixFQUFhLGtFQUFBQyxFQUFiLENBQW5COztBQUVBLE1BQU05QyxRQUFRLDBEQUFBK0MsQ0FDWiwwREFEWSxFQUVaSCxjQUZZLEVBR1osc0RBQUFJLGtCQUFtQkgsVUFBbkIsQ0FIWSxDQUFkOztBQU1BSSxFQUFBLG1FQUFBQSxDQUFhakQsS0FBYjs7QUFFQSxTQUFPQSxLQUFQO0FBQ0QsQ0FaRDs7QUFjQSx5REFBZTZCLGNBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLElBQU1xQixXQUFXLFNBQVhBLFFBQVcsR0FBcUM7QUFBQSxNQUFwQ0MsS0FBb0MsdUVBQTVCLEVBQUVDLFNBQVMsRUFBWCxFQUE0QjtBQUFBLE1BQVhsRCxNQUFXOztBQUNwRCxVQUFRQSxPQUFPYSxJQUFmO0FBQ0UsU0FBSyxpRUFBTDtBQUNFLFVBQUliLE9BQU9SLFFBQVAsSUFBbUJRLE9BQU9SLFFBQVAsQ0FBZ0IwRCxPQUF2QyxFQUFnRDtBQUM5QyxZQUFNQyxjQUFjbkQsT0FBT1IsUUFBUCxDQUFnQjBELE9BQXBDO0FBQ0EsWUFBTUEsVUFBVSxFQUFoQjtBQUNBQyxvQkFBWUMsT0FBWixDQUFvQixVQUFDQyxNQUFELEVBQVk7QUFDOUJILGtCQUFRRyxPQUFPQyxFQUFmLElBQXFCRCxNQUFyQjtBQUNELFNBRkQ7QUFHQSw0QkFBWUosS0FBWixJQUFtQkMsZ0JBQW5CO0FBQ0Q7QUFDRDtBQUNGO0FBQ0U7QUFaSjtBQWNBLFNBQU9ELEtBQVA7QUFDRCxDQWhCRDs7QUFrQkEsSUFBTU0sT0FBTyxTQUFQQSxJQUFPLEdBQXdCO0FBQUEsTUFBdkJOLEtBQXVCLHVFQUFmLEVBQWU7QUFBQSxNQUFYakQsTUFBVztBQUFBLE1BQzNCckIsUUFEMkIsR0FDZCx1REFEYyxDQUMzQkEsUUFEMkI7QUFBQSxNQUUzQkQsUUFGMkIsR0FFQ3NCLE1BRkQsQ0FFM0J0QixRQUYyQjtBQUFBLE1BRWpCSCxJQUZpQixHQUVDeUIsTUFGRCxDQUVqQnpCLElBRmlCO0FBQUEsTUFFWG1ELE9BRlcsR0FFQzFCLE1BRkQsQ0FFWDBCLE9BRlc7O0FBR25DLE1BQUloRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFdBQU91RSxLQUFQO0FBQ0Q7QUFDRCxNQUFNTyxhQUFhUCxNQUFNdkUsUUFBTixLQUFtQixFQUFFQSxrQkFBRixFQUF0QztBQU5tQywwQkFPWjhFLFVBUFksQ0FPM0JDLEtBUDJCO0FBQUEsTUFPM0JBLEtBUDJCLHFDQU9uQixFQVBtQjs7O0FBU25DLFVBQVF6RCxPQUFPYSxJQUFmO0FBQ0UsU0FBSyxzRUFBTDtBQUNFLFVBQUl0QyxRQUFRLElBQVosRUFBa0I7QUFDaEIsZUFBTzBFLEtBQVA7QUFDRDtBQUNELDBCQUNLQSxLQURMLHNCQUVHdkUsUUFGSCxlQUdPOEUsVUFIUDtBQUlJQyw0Q0FBV0EsS0FBWCxJQUFrQmxGLElBQWxCO0FBSko7QUFPRixTQUFLLHlFQUFMO0FBQ0UsVUFBSW1ELFdBQVcsSUFBZixFQUFxQjtBQUNuQixlQUFPdUIsS0FBUDtBQUNEO0FBQ0QsMEJBQ0tBLEtBREwsc0JBRUd2RSxRQUZILGVBR084RSxVQUhQO0FBSUlDLDRDQUFXQSxNQUFNQyxNQUFOLENBQWEsVUFBQ0MsQ0FBRDtBQUFBLGlCQUFPaEYsU0FBU2dGLENBQVQsTUFBZ0JqQyxPQUF2QjtBQUFBLFNBQWIsQ0FBWDtBQUpKO0FBT0Y7QUFDRSxhQUFPdUIsS0FBUDtBQXhCSjtBQTBCRCxDQW5DRDs7QUFxQ0EsSUFBTVcsU0FBUyw4REFBQUMsQ0FBZ0I7QUFDN0JOO0FBRDZCLENBQWhCLENBQWY7O0FBSUEsSUFBTU8sY0FBYyw4REFBQUQsQ0FBZ0I7QUFDbENiLG9CQURrQztBQUVsQ1ksVUFBUSxxRUFBQUcsQ0FBZSxFQUFFQyxLQUFLLFFBQVAsRUFBaUJDLFNBQUEseUVBQWpCLEVBQWYsRUFBMkNMLE1BQTNDO0FBRjBCLENBQWhCLENBQXBCOztBQUtBLHlEQUFlRSxXQUFmLEU7Ozs7Ozs7OztBQ3ZFQTs7QUFFQSx5REFBZSwwRUFBQUksQ0FBaUIsT0FBakIsQ0FBZixFOzs7Ozs7Ozs7O0FDRkE7O0FBRWUsU0FBU0EsZ0JBQVQsQ0FBMEJyRCxJQUExQixFQUFnQztBQUM3QyxNQUFJb0QsVUFBVSxvRUFBQUUsQ0FBV3RELElBQVgsQ0FBZDtBQUNBLFNBQU87QUFDTHVELGFBQVMsU0FBU0EsT0FBVCxDQUFpQkosR0FBakIsRUFBc0JLLEVBQXRCLEVBQTBCO0FBQ2pDLGFBQU9BLEdBQUcsSUFBSCxFQUFTSixRQUFRRyxPQUFSLENBQWdCSixHQUFoQixDQUFULENBQVA7QUFDRCxLQUhJO0FBSUxNLGFBQVMsU0FBU0EsT0FBVCxDQUFpQk4sR0FBakIsRUFBc0JPLElBQXRCLEVBQTRCRixFQUE1QixFQUFnQztBQUN2QyxVQUFJO0FBQ0ZBLFdBQUcsSUFBSCxFQUFTSixRQUFRSyxPQUFSLENBQWdCTixHQUFoQixFQUFxQk8sSUFBckIsQ0FBVDtBQUNELE9BRkQsQ0FFRSxPQUFPQyxHQUFQLEVBQVk7QUFDWkgsV0FBR0csR0FBSDtBQUNEO0FBQ0YsS0FWSTtBQVdMQyxnQkFBWSxTQUFTQSxVQUFULENBQW9CVCxHQUFwQixFQUF5QkssRUFBekIsRUFBNkI7QUFDdkMsYUFBT0EsR0FBRyxJQUFILEVBQVNKLFFBQVFRLFVBQVIsQ0FBbUJULEdBQW5CLENBQVQsQ0FBUDtBQUNEO0FBYkksR0FBUDtBQWVELEM7Ozs7Ozs7Ozs7O0FDbkJELElBQUlVLFVBQVUsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQyxTQUFPQSxPQUFPQyxRQUFkLE1BQTJCLFFBQTNELEdBQXNFLFVBQVVDLEdBQVYsRUFBZTtBQUFFLGdCQUFjQSxHQUFkLDBDQUFjQSxHQUFkO0FBQW9CLENBQTNHLEdBQThHLFVBQVVBLEdBQVYsRUFBZTtBQUFFLFNBQU9BLE9BQU8sT0FBT0YsTUFBUCxLQUFrQixVQUF6QixJQUF1Q0UsSUFBSUMsV0FBSixLQUFvQkgsTUFBM0QsSUFBcUVFLFFBQVFGLE9BQU9JLFNBQXBGLEdBQWdHLFFBQWhHLFVBQWtIRixHQUFsSCwwQ0FBa0hBLEdBQWxILENBQVA7QUFBK0gsQ0FBNVE7O0FBRUEsU0FBU0csSUFBVCxHQUFnQixDQUFFOztBQUVsQixJQUFJQyxjQUFjO0FBQ2hCYixXQUFTWSxJQURPO0FBRWhCVixXQUFTVSxJQUZPO0FBR2hCUCxjQUFZTztBQUhJLENBQWxCOztBQU1BLFNBQVNFLFVBQVQsQ0FBb0JDLFdBQXBCLEVBQWlDO0FBQy9CLE1BQUksQ0FBQyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLFdBQWhDLEdBQThDVixRQUFRVSxNQUFSLENBQS9DLE1BQW9FLFFBQXBFLElBQWdGLEVBQUVELGVBQWVDLE1BQWpCLENBQXBGLEVBQThHO0FBQzVHLFdBQU8sS0FBUDtBQUNEOztBQUVELE1BQUk7QUFDRixRQUFJbkIsVUFBVW1CLE9BQU9ELFdBQVAsQ0FBZDtBQUNBLFFBQUlFLFVBQVUsbUJBQW1CRixXQUFuQixHQUFpQyxPQUEvQztBQUNBbEIsWUFBUUssT0FBUixDQUFnQmUsT0FBaEIsRUFBeUIsTUFBekI7QUFDQXBCLFlBQVFHLE9BQVIsQ0FBZ0JpQixPQUFoQjtBQUNBcEIsWUFBUVEsVUFBUixDQUFtQlksT0FBbkI7QUFDRCxHQU5ELENBTUUsT0FBT0MsQ0FBUCxFQUFVO0FBQ1YsUUFBSSxJQUFKLEVBQTJDQyxRQUFRQyxJQUFSLENBQWEsbUJBQW1CTCxXQUFuQixHQUFpQyw2Q0FBOUM7QUFDM0MsV0FBTyxLQUFQO0FBQ0Q7QUFDRCxTQUFPLElBQVA7QUFDRDs7QUFFYyxTQUFTaEIsVUFBVCxDQUFvQnRELElBQXBCLEVBQTBCO0FBQ3ZDLE1BQUlzRSxjQUFjdEUsT0FBTyxTQUF6QjtBQUNBLE1BQUlxRSxXQUFXQyxXQUFYLENBQUosRUFBNkIsT0FBT0MsT0FBT0QsV0FBUCxDQUFQLENBQTdCLEtBQTZEO0FBQzNELFFBQUksSUFBSixFQUEyQztBQUN6Q0ksY0FBUXpFLEtBQVIsQ0FBYyw4RUFBZDtBQUNEO0FBQ0QsV0FBT21FLFdBQVA7QUFDRDtBQUNGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDRDtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7O0FBR0EsSUFBTVEsc0JBQXNCLElBQUksSUFBaEM7O0lBRU1yRCxrQjs7Ozs7Ozs7Ozs7d0NBQ2dCO0FBQ2xCLFdBQUtzRCxnQkFBTCxHQUF3QkMsWUFBWSxLQUFLQyxLQUFMLENBQVd4RSxXQUF2QixFQUFvQ3FFLG1CQUFwQyxDQUF4QjtBQUNEOzs7MkNBRXNCO0FBQ3JCSSxvQkFBYyxLQUFLSCxnQkFBbkI7QUFDRDs7OzRDQUV1QmhILFEsRUFBVUgsSSxFQUFNO0FBQ3RDLFdBQUtxSCxLQUFMLENBQVdwRSxhQUFYLENBQXlCOUMsUUFBekIsRUFBbUNILElBQW5DO0FBQ0Q7Ozs2QkFFUTtBQUFBLG1CQUM0QixLQUFLcUgsS0FEakM7QUFBQSxVQUNDMUMsT0FERCxVQUNDQSxPQUREO0FBQUEsVUFDVVUsTUFEVixVQUNVQSxNQURWO0FBQUEsVUFDa0JrQyxLQURsQixVQUNrQkEsS0FEbEI7OztBQUdQLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxzQkFBZjtBQUNFLG9FQUFDLDBFQUFEO0FBQ0UsbUJBQVM1QyxPQURYO0FBRUUsaUJBQU80QyxLQUZUO0FBR0Usa0JBQVFsQyxNQUhWO0FBSUUsK0JBQXFCLEtBQUtnQyxLQUFMLENBQVdwRSxhQUpsQztBQUtFLGtDQUF3QixLQUFLb0UsS0FBTCxDQUFXbkU7QUFMckMsVUFERjtBQVFFLG9FQUFDLDZFQUFEO0FBQ0UsbUJBQVN5QixPQURYO0FBRUUsaUJBQU80QztBQUZUO0FBUkYsT0FERjtBQWVEOzs7O0VBL0I4Qiw2Q0FBQUMsQ0FBTWxFLFM7O0FBa0N2Q08sbUJBQW1CNEQsU0FBbkIsR0FBK0I7QUFDN0I5QyxXQUFTLGtEQUFBK0MsQ0FBVUMsUUFBVixDQUFtQixrREFBQUQsQ0FBVUUsR0FBN0IsRUFBa0NDLFVBRGQ7QUFFN0J4QyxVQUFRLGtEQUFBcUMsQ0FBVUksS0FBVixDQUFnQjtBQUN0QjlDLFVBQU0sa0RBQUEwQyxDQUFVQyxRQUFWLENBQW1CLGtEQUFBRCxDQUFVRSxHQUE3QjtBQURnQixHQUFoQixFQUVMQyxVQUowQjtBQUs3Qk4sU0FBTyxrREFBQUcsQ0FBVUksS0FBVixDQUFnQjtBQUNyQjlDLFVBQU0sa0RBQUEwQyxDQUFVQyxRQUFWLENBQW1CLGtEQUFBRCxDQUFVRSxHQUE3QixDQURlO0FBRXJCRyxhQUFTLGtEQUFBTCxDQUFVTSxPQUFWLENBQWtCLGtEQUFBTixDQUFVckgsTUFBNUI7QUFGWSxHQUFoQixFQUdKd0gsVUFSMEI7QUFTN0JoRixlQUFhLGtEQUFBNkUsQ0FBVU8sSUFBVixDQUFlSixVQVRDO0FBVTdCNUUsaUJBQWUsa0RBQUF5RSxDQUFVTyxJQUFWLENBQWVKLFVBVkQ7QUFXN0IzRSxzQkFBb0Isa0RBQUF3RSxDQUFVTyxJQUFWLENBQWVKO0FBWE4sQ0FBL0I7O0FBY0EsSUFBTUsscUJBQXFCLFNBQXJCQSxrQkFBcUIsQ0FBQ3pELFFBQUQsRUFBYztBQUFBLDBCQUNkQSxRQURjLENBQy9CRSxPQUQrQjtBQUFBLE1BQy9CQSxPQUQrQixxQ0FDckIsRUFEcUI7O0FBRXZDLE1BQU13RCxZQUFZLEVBQWxCO0FBQ0FDLFNBQU9DLElBQVAsQ0FBWTFELE9BQVosRUFBcUJFLE9BQXJCLENBQTZCLFVBQUM1RSxRQUFELEVBQWM7QUFDekMsUUFBTTZFLFNBQVNILFFBQVExRSxRQUFSLENBQWY7QUFDQTZFLFdBQU93RCxJQUFQLENBQVl6RCxPQUFaLENBQW9CLFVBQUMwRCxHQUFELEVBQVM7QUFBRUosZ0JBQVVJLElBQUk5QyxHQUFkLElBQXFCLElBQXJCO0FBQTRCLEtBQTNEO0FBQ0QsR0FIRDtBQUlBLE1BQU1zQyxVQUFVSyxPQUFPQyxJQUFQLENBQVlGLFNBQVosQ0FBaEI7O0FBRUEsTUFBTW5ELE9BQU87QUFDWHdELFdBQU8sRUFESTtBQUVYQyxlQUFXLEVBRkE7QUFHWEMsZ0JBQVk7QUFIRCxHQUFiOztBQU1BLFNBQU8sRUFBRTFELFVBQUYsRUFBUStDLGdCQUFSLEVBQVA7QUFDRCxDQWhCRDs7QUFrQkEsSUFBTVksZ0JBQWdCO0FBQ3BCM0QsUUFBTTtBQURjLENBQXRCOztBQUlBLElBQU00RCxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUNsRSxLQUFELEVBQVc7QUFBQSxNQUUvQkQsUUFGK0IsR0FJN0JDLEtBSjZCLENBRS9CRCxRQUYrQjtBQUFBLHNCQUk3QkMsS0FKNkIsQ0FHL0JXLE1BSCtCO0FBQUEsTUFHL0JBLE1BSCtCLGlDQUd0QnNELGFBSHNCO0FBQUEsMkJBS1JsRSxRQUxRLENBS3pCRSxPQUx5QjtBQUFBLE1BS3pCQSxPQUx5QixzQ0FLZixFQUxlOztBQU1qQyxNQUFNNEMsUUFBUVcsbUJBQW1CekQsUUFBbkIsQ0FBZDtBQUNBLFNBQU8sRUFBRUUsZ0JBQUYsRUFBV1UsY0FBWCxFQUFtQmtDLFlBQW5CLEVBQVA7QUFDRCxDQVJEOztBQVVBLHlEQUFlLDREQUFBc0IsQ0FBUUQsZUFBUixFQUF5QjtBQUN0Qy9GLGVBQUEsNkRBRHNDO0FBRXRDSSxpQkFBQSwrREFGc0M7QUFHdENDLHNCQUFBLG9FQUFBQTtBQUhzQyxDQUF6QixFQUlaVyxrQkFKWSxDQUFmLEU7Ozs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBOztBQUdBLElBQU1pRixtQkFBbUIsU0FBbkJBLGdCQUFtQixDQUFDekIsS0FBRCxFQUFXO0FBQUEsdUJBQ0ZBLEtBREUsQ0FDMUIxQyxPQUQwQjtBQUFBLE1BQzFCQSxPQUQwQixrQ0FDaEIsRUFEZ0I7QUFBQSxNQUNaNEMsS0FEWSxHQUNGRixLQURFLENBQ1pFLEtBRFk7QUFBQSxNQUUxQlEsT0FGMEIsR0FFZFIsS0FGYyxDQUUxQlEsT0FGMEI7OztBQUlsQyxNQUFNZ0IsaUJBQWlCaEIsUUFBUWlCLEdBQVIsQ0FBWSxVQUFDQyxNQUFEO0FBQUEsV0FBYTtBQUFBO0FBQUEsUUFBSSxlQUFhQSxNQUFqQjtBQUEyQiw0RUFBTSxXQUFVLHlCQUFoQixHQUEzQjtBQUF3RUE7QUFBeEUsS0FBYjtBQUFBLEdBQVosQ0FBdkI7O0FBRUEsTUFBTUMsaUJBQWlCZCxPQUFPQyxJQUFQLENBQVkxRCxPQUFaLEVBQXFCcUUsR0FBckIsQ0FBeUIsVUFBQy9JLFFBQUQsRUFBYztBQUM1RCxRQUFNNkUsU0FBU0gsUUFBUTFFLFFBQVIsQ0FBZjtBQUNBLFFBQU13RixzQkFBb0JYLE9BQU9DLEVBQWpDO0FBQ0EsV0FDRSw0REFBQywyREFBRDtBQUNFLGNBQVFELE1BRFY7QUFFRSxhQUFPeUMsS0FGVDtBQUdFLFdBQUs5QjtBQUhQLE1BREY7QUFPRCxHQVZzQixDQUF2Qjs7QUFZQSxTQUNFO0FBQUE7QUFBQSxNQUFPLFdBQVUsbUJBQWpCO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQURGO0FBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUhGO0FBSUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUpGO0FBS0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUxGO0FBTUdzRDtBQU5IO0FBREYsS0FERjtBQVdFO0FBQUE7QUFBQTtBQUNHRztBQURIO0FBWEYsR0FERjtBQWlCRCxDQW5DRDs7QUFxQ0FKLGlCQUFpQnJCLFNBQWpCLEdBQTZCO0FBQzNCOUMsV0FBUyxrREFBQStDLENBQVVDLFFBQVYsQ0FDUCxrREFBQUQsQ0FBVUksS0FBVixDQUFnQjtBQUNkL0MsUUFBSSxrREFBQTJDLENBQVV5QixNQURBO0FBRWRDLGNBQVUsa0RBQUExQixDQUFVckgsTUFGTjtBQUdkaUksVUFBTSxrREFBQVosQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUIsQ0FIUTtBQUlkeUIsVUFBTSxrREFBQTNCLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVVFLEdBQTVCO0FBSlEsR0FBaEIsQ0FETyxDQURrQjtBQVMzQkwsU0FBTyxrREFBQUcsQ0FBVUksS0FBVixDQUFnQjtBQUNyQkMsYUFBUyxrREFBQUwsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVXJILE1BQTVCO0FBRFksR0FBaEI7QUFUb0IsQ0FBN0I7QUFhQXlJLGlCQUFpQlEsWUFBakIsR0FBZ0M7QUFDOUIzRSxXQUFTLEVBRHFCO0FBRTlCNEMsU0FBTztBQUNMUSxhQUFTO0FBREo7QUFGdUIsQ0FBaEM7O0FBT0EseURBQWVlLGdCQUFmLEU7Ozs7Ozs7Ozs7OztBQzlEQTtBQUNBOztBQUdBLElBQU1TLFdBQVcsR0FBakI7O0FBRUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQUNuQyxLQUFELEVBQVc7QUFBQSxNQUNuQnZDLE1BRG1CLEdBQ0R1QyxLQURDLENBQ25CdkMsTUFEbUI7QUFBQSxNQUNYeUMsS0FEVyxHQUNERixLQURDLENBQ1hFLEtBRFc7QUFBQSxNQUVuQmUsSUFGbUIsR0FFSnhELE1BRkksQ0FFbkJ3RCxJQUZtQjtBQUFBLE1BRWJlLElBRmEsR0FFSnZFLE1BRkksQ0FFYnVFLElBRmE7OztBQUkzQixNQUFNSSxVQUFVSixLQUFLQSxLQUFLL0ksTUFBTCxHQUFjLENBQW5CLEtBQXlCLEVBQXpDO0FBQ0EsTUFBTW9KLGNBQWMsRUFBcEI7QUFDQUQsVUFBUUUsUUFBUixDQUFpQjlFLE9BQWpCLENBQXlCLFVBQUMrRSxPQUFELEVBQWE7QUFBRUYsZ0JBQVlFLFFBQVFuRSxHQUFwQixJQUEyQm1FLFFBQVFDLEtBQW5DO0FBQTJDLEdBQW5GOztBQUVBLE1BQU1DLFVBQVUsRUFBaEI7QUFDQXhCLE9BQUt6RCxPQUFMLENBQWEsVUFBQzBELEdBQUQsRUFBUztBQUNwQnVCLFlBQVF2QixJQUFJOUMsR0FBWixJQUFtQjhDLElBQUlzQixLQUF2QjtBQUNELEdBRkQ7QUFHQSxNQUFNRSxXQUFXeEMsTUFBTVEsT0FBTixDQUFjaUIsR0FBZCxDQUFrQixVQUFDQyxNQUFELEVBQVk7QUFDN0MsUUFBTWUsVUFBV2YsVUFBVWEsT0FBWCxHQUFzQkEsUUFBUWIsTUFBUixDQUF0QixHQUF3Q00sUUFBeEQ7QUFDQSxXQUFRO0FBQUE7QUFBQSxRQUFJLGVBQWFOLE1BQWpCO0FBQTRCZTtBQUE1QixLQUFSO0FBQ0QsR0FIZ0IsQ0FBakI7O0FBS0EsU0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBS2xGLGFBQU9DO0FBQVosS0FERjtBQUVFO0FBQUE7QUFBQTtBQUFLRCxhQUFPc0U7QUFBWixLQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUtNLGtCQUFZTztBQUFqQixLQUhGO0FBSUU7QUFBQTtBQUFBO0FBQUtQLGtCQUFZUTtBQUFqQixLQUpGO0FBS0U7QUFBQTtBQUFBO0FBQUtSLGtCQUFZUztBQUFqQixLQUxGO0FBTUdKO0FBTkgsR0FERjtBQVVELENBM0JEOztBQTZCQVAsVUFBVS9CLFNBQVYsR0FBc0I7QUFDcEIzQyxVQUFRLGtEQUFBNEMsQ0FBVUksS0FBVixDQUFnQjtBQUN0Qi9DLFFBQUksa0RBQUEyQyxDQUFVeUIsTUFEUTtBQUV0QkMsY0FBVSxrREFBQTFCLENBQVVySCxNQUZFO0FBR3RCaUksVUFBTSxrREFBQVosQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUIsQ0FIZ0I7QUFJdEJ5QixVQUFNLGtEQUFBM0IsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUI7QUFKZ0IsR0FBaEIsRUFLTEMsVUFOaUI7QUFPcEJOLFNBQU8sa0RBQUFHLENBQVVJLEtBQVYsQ0FBZ0I7QUFDckJDLGFBQVMsa0RBQUFMLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVVySCxNQUE1QjtBQURZLEdBQWhCO0FBUGEsQ0FBdEI7O0FBWUFtSixVQUFVRixZQUFWLEdBQXlCO0FBQ3ZCL0IsU0FBTztBQUNMUSxhQUFTO0FBREo7QUFEZ0IsQ0FBekI7O0FBTUEseURBQWV5QixTQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLElBQU1ZLGNBQWMsS0FBcEI7QUFDQSxJQUFNQyxlQUFlO0FBQ25CckYsUUFBTTtBQUNKd0QsV0FBTyxFQURIO0FBRUpDLGVBQVcsRUFGUDtBQUdKQyxnQkFBWTtBQUhSO0FBRGEsQ0FBckI7O0FBUUEsSUFBTTRCLGVBQWUsQ0FBQyxDQUFELEVBQUksR0FBSixDQUFyQjtBQUNBLElBQU1DLHFCQUFxQjtBQUN6QnBLLFlBQVUsT0FEZTtBQUV6QnFLLFlBQVUsT0FGZTtBQUd6QkMsU0FBTyxRQUhrQjtBQUl6QkMsU0FBT0o7QUFKa0IsQ0FBM0I7QUFNQSxJQUFNSyxxQkFBcUI7QUFDekJ4SyxZQUFVLEVBRGU7QUFFekJzSyxTQUFPLFFBRmtCO0FBR3pCQyxTQUFPSixZQUhrQjtBQUl6QnBGLFNBQU87QUFKa0IsQ0FBM0I7QUFNQSxJQUFNeUQsZ0JBQWdCO0FBQ3BCM0QsUUFBTTtBQUNKd0QsV0FBTytCLGtCQURIO0FBRUo5Qiw0QkFBZ0JrQyxrQkFBaEIsSUFBb0N4SyxVQUFVLFdBQTlDLEdBRkk7QUFHSnVJLDZCQUFpQmlDLGtCQUFqQixJQUFxQ3hLLFVBQVUsWUFBL0M7QUFISTtBQURjLENBQXRCOztBQVFBLElBQU15SyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUM1SyxJQUFELEVBQU9HLFFBQVAsRUFBb0I7QUFBQSxxQkFDaEJILElBRGdCLENBQ2hDcUYsTUFEZ0M7QUFBQSxNQUNoQ0EsTUFEZ0MsZ0NBQ3ZCLEVBRHVCO0FBQUEsTUFFaENqRixRQUZnQyxHQUVMLHVEQUZLLENBRWhDQSxRQUZnQztBQUFBLE1BRXRCeUssWUFGc0IsR0FFTCx1REFGSyxDQUV0QkEsWUFGc0I7OztBQUl4QyxTQUNFLDREQUFDLDhDQUFEO0FBQ0UsVUFBSyxRQURQO0FBRUUsVUFBTXpLLFNBQVNKLElBQVQsQ0FGUjtBQUdFLGFBQVM2SyxhQUFhN0ssSUFBYixFQUFtQkcsUUFBbkIsQ0FIWDtBQUlFLGFBQVNBLFFBSlg7QUFLRSxZQUFRa0YsT0FBT3lGLEtBTGpCO0FBTUUsc0JBTkY7QUFPRSx1QkFBbUIsS0FQckI7QUFRRSxTQUFLRCxhQUFhN0ssSUFBYixFQUFtQkcsUUFBbkI7QUFSUCxJQURGO0FBWUQsQ0FoQkQ7O0FBa0JBLElBQU00SyxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUM1SyxRQUFELEVBQVdrRixNQUFYLEVBQXNCO0FBQzNDLE1BQU1KLGFBQWFJLE9BQU9MLElBQVAsQ0FBWTdFLFFBQVosS0FBeUIsRUFBNUM7QUFEMkMsMEJBRXBCOEUsVUFGb0IsQ0FFbkNDLEtBRm1DO0FBQUEsTUFFbkNBLEtBRm1DLHFDQUUzQixFQUYyQjs7QUFHM0MsU0FBT0EsTUFBTThELEdBQU4sQ0FBVSxVQUFDaEosSUFBRDtBQUFBLFdBQVU0SyxjQUFjNUssSUFBZCxFQUFvQkcsUUFBcEIsQ0FBVjtBQUFBLEdBQVYsQ0FBUDtBQUNELENBSkQ7O0lBTU02SyxhOzs7QUFDSix5QkFBWTNELEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4SEFDWEEsS0FEVzs7QUFHakIsVUFBSzNDLEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7OzZCQUVRO0FBQUEsVUFDQ21HLFlBREQsR0FDa0IsdURBRGxCLENBQ0NBLFlBREQ7QUFBQSxtQkFRSCxLQUFLeEQsS0FSRjtBQUFBLGtDQUdMMUMsT0FISztBQUFBLFVBR0xBLE9BSEssa0NBR0ssRUFITDtBQUFBLGdDQUlMNEMsS0FKSztBQUFBLFVBSUxBLEtBSkssZ0NBSUc4QyxZQUpIO0FBQUEsaUNBS0xoRixNQUxLO0FBQUEsVUFLTEEsTUFMSyxpQ0FLSXNELGFBTEo7QUFBQSxVQU1Mc0MsbUJBTkssVUFNTEEsbUJBTks7QUFBQSxVQU9MQyxzQkFQSyxVQU9MQSxzQkFQSztBQUFBLHlCQWFIN0YsT0FBT0wsSUFiSjtBQUFBLDRDQVVMd0QsS0FWSztBQUFBLFVBVUxBLEtBVkssc0NBVUcsRUFBRXJJLFVBQVUsT0FBWixFQVZIO0FBQUEsK0NBV0xzSSxTQVhLO0FBQUEsVUFXTEEsU0FYSyx5Q0FXTyxFQUFFdEksVUFBVSxXQUFaLEVBWFA7QUFBQSwrQ0FZTHVJLFVBWks7QUFBQSxVQVlMQSxVQVpLLHlDQVlRLEVBQUV2SSxVQUFVLFlBQVosRUFaUjtBQUFBLDRCQWN3QnFJLEtBZHhCLENBY0NnQyxRQWREO0FBQUEsVUFjQ0EsUUFkRCxtQ0FjWSxPQWRaOztBQWVQLFVBQU1XLFlBQVkxQyxVQUFVdkQsS0FBVixJQUFtQixFQUFyQztBQUNBLFVBQU1rRyxhQUFhMUMsV0FBV3hELEtBQVgsSUFBb0IsRUFBdkM7QUFDQSxVQUFNbUcsWUFBWTtBQUNoQjVDLG1CQUFXMEMsU0FESztBQUVoQnpDLG9CQUFZMEM7QUFGSSxPQUFsQjtBQUlBLFVBQU1FLFNBQVM5QyxNQUFNa0MsS0FBTixJQUFlSixZQUE5QjtBQUNBLFVBQU1pQixhQUFhOUMsVUFBVWlDLEtBQVYsSUFBbUJKLFlBQXRDO0FBQ0EsVUFBTWtCLGNBQWM5QyxXQUFXZ0MsS0FBWCxJQUFvQkosWUFBeEM7QUFDQSxVQUFNbUIsY0FBY2xFLE1BQU12QyxJQUFOLENBQVd3RCxLQUFYLENBQWlCa0QsVUFBakIsSUFBK0JwQixZQUFuRDtBQUNBLFVBQU1xQixrQkFBa0JwRSxNQUFNdkMsSUFBTixDQUFXeUQsU0FBWCxDQUFxQmlELFVBQXJCLElBQW1DcEIsWUFBM0Q7QUFDQSxVQUFNc0IsbUJBQW1CckUsTUFBTXZDLElBQU4sQ0FBVzBELFVBQVgsQ0FBc0JnRCxVQUF0QixJQUFvQ3BCLFlBQTdEOztBQUVBLFVBQU11QixhQUFhLEdBQW5CO0FBQ0EsVUFBTUMsY0FBYyxHQUFwQjs7QUFFQSxVQUFNQyxXQUFXLEVBQWpCLENBL0JPLENBK0JjO0FBQ3JCM0QsYUFBT0MsSUFBUCxDQUFZZ0QsU0FBWixFQUF1QnhHLE9BQXZCLENBQStCLFVBQUMxRSxRQUFELEVBQWM7QUFDM0MsWUFBTStFLFFBQVFtRyxVQUFVbEwsUUFBVixDQUFkO0FBQ0ErRSxjQUFNTCxPQUFOLENBQWMsVUFBQzdFLElBQUQsRUFBVTtBQUFBLGNBQ2RDLFFBRGMsR0FDT0QsSUFEUCxDQUNkQyxRQURjO0FBQUEsY0FDSkMsTUFESSxHQUNPRixJQURQLENBQ0pFLE1BREk7O0FBRXRCLGNBQU00RSxTQUFTSCxRQUFRMUUsUUFBUixDQUFmO0FBQ0EsY0FBSTZFLFVBQVUsSUFBZCxFQUFvQjtBQUNsQjtBQUNEO0FBQ0QsY0FBTXVFLE9BQU92RSxPQUFPdUUsSUFBUCxJQUFlLEVBQTVCO0FBQ0FBLGVBQUt4RSxPQUFMLENBQWEsVUFBQ21ILEdBQUQsRUFBUztBQUNwQixnQkFBTUMsVUFBVSxFQUFoQjtBQUNBRCxnQkFBSXJDLFFBQUosQ0FBYTlFLE9BQWIsQ0FBcUIsVUFBQytFLE9BQUQsRUFBYTtBQUNoQ3FDLHNCQUFRckMsUUFBUW5FLEdBQWhCLElBQXVCbUUsUUFBUUMsS0FBL0I7QUFDRCxhQUZEO0FBR0EsZ0JBQUlvQyxRQUFRekIsUUFBUixLQUFxQixJQUFyQixJQUE2QnlCLFFBQVEvTCxNQUFSLEtBQW1CLElBQXBELEVBQTBEO0FBQ3hEO0FBQ0Q7QUFDRCxnQkFBSTZMLFNBQVNFLFFBQVF6QixRQUFSLENBQVQsS0FBK0IsSUFBbkMsRUFBeUM7QUFDdkN1Qix1QkFBU0UsUUFBUXpCLFFBQVIsQ0FBVCx3QkFBaUNBLFFBQWpDLEVBQTRDeUIsUUFBUXpCLFFBQVIsQ0FBNUM7QUFDRDtBQUNEdUIscUJBQVNFLFFBQVF6QixRQUFSLENBQVQsRUFBNEJLLGFBQWE3SyxJQUFiLEVBQW1CRyxRQUFuQixDQUE1QixJQUE0RDhMLFFBQVEvTCxNQUFSLENBQTVEO0FBQ0QsV0FaRDtBQWFELFNBcEJEO0FBcUJELE9BdkJEO0FBd0JBLFVBQU0rQixPQUFPbUcsT0FBT0MsSUFBUCxDQUFZMEQsUUFBWixFQUFzQi9DLEdBQXRCLENBQTBCLFVBQUN2RCxHQUFEO0FBQUEsZUFBVXNHLFNBQVN0RyxHQUFULENBQVY7QUFBQSxPQUExQixDQUFiOztBQUVBLFVBQU15Ryx5Q0FBZ0JuQixlQUFlLFdBQWYsRUFBNEIxRixNQUE1QixDQUFoQixzQkFBd0QwRixlQUFlLFlBQWYsRUFBNkIxRixNQUE3QixDQUF4RCxFQUFOOztBQUVBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSx5QkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFLDhFQUFDLGdEQUFEO0FBQ0UsMkJBQU8sRUFBRThHLFFBQVdMLFdBQVgsT0FBRixFQURUO0FBRUUsa0NBRkY7QUFHRSx5QkFBS0gsZ0JBQWdCLENBQWhCLENBSFA7QUFJRSx5QkFBS0EsZ0JBQWdCLENBQWhCLENBSlA7QUFLRSwwQkFBTSxDQUFDSixXQUFXLENBQVgsSUFBZ0JBLFdBQVcsQ0FBWCxDQUFqQixJQUFrQ25CLFdBTDFDO0FBTUUsMkJBQU9tQjtBQU5UO0FBREYsaUJBREY7QUFXRTtBQUFBO0FBQUE7QUFDRTtBQUFDLHVFQUFEO0FBQUE7QUFDRSw2QkFBT00sVUFEVDtBQUVFLDhCQUFRQyxXQUZWO0FBR0UsNEJBQU03SixJQUhSO0FBSUUsOEJBQVEsRUFBRW1LLEtBQUssQ0FBUCxFQUFVQyxPQUFPLEVBQWpCLEVBQXFCQyxNQUFNLEVBQTNCLEVBQStCQyxRQUFRLENBQXZDO0FBSlY7QUFNRSxnRkFBQywrQ0FBRDtBQUNFLDRCQUFLLFFBRFA7QUFFRSwrQkFBUy9CLFFBRlg7QUFHRSw2QkFBT2hDLE1BQU1pQyxLQUhmO0FBSUU7QUFKRixzQkFORjtBQVlFLGdGQUFDLCtDQUFEO0FBQ0UsK0JBQVEsV0FEVjtBQUVFLG1DQUFZLE1BRmQ7QUFHRSw2QkFBT2hDLFVBQVVnQyxLQUhuQjtBQUlFLDhCQUFRLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FKVjtBQUtFO0FBTEYsc0JBWkY7QUFtQkUsZ0ZBQUMsK0NBQUQ7QUFDRSwrQkFBUSxZQURWO0FBRUUsbUNBQVksT0FGZDtBQUdFLDZCQUFPL0IsV0FBVytCLEtBSHBCO0FBSUUsOEJBQVEsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUpWO0FBS0U7QUFMRixzQkFuQkY7QUEwQkUsZ0ZBQUMsdURBQUQsSUFBZSxpQkFBZ0IsS0FBL0IsR0ExQkY7QUEyQkUsZ0ZBQUMsaURBQUQsT0EzQkY7QUE0QkUsZ0ZBQUMsZ0RBQUQsT0E1QkY7QUE2Qkd5QjtBQTdCSDtBQURGLGlCQVhGO0FBNENFO0FBQUE7QUFBQTtBQUNFLDhFQUFDLGdEQUFEO0FBQ0UsMkJBQU8sRUFBRUMsUUFBV0wsV0FBWCxPQUFGLEVBRFQ7QUFFRSxrQ0FGRjtBQUdFLHlCQUFLRixpQkFBaUIsQ0FBakIsQ0FIUDtBQUlFLHlCQUFLQSxpQkFBaUIsQ0FBakIsQ0FKUDtBQUtFLDBCQUFNLENBQUNKLFlBQVksQ0FBWixJQUFpQkEsWUFBWSxDQUFaLENBQWxCLElBQW9DcEIsV0FMNUM7QUFNRSwyQkFBT29CO0FBTlQ7QUFERjtBQTVDRixlQURGO0FBd0RFO0FBQUE7QUFBQTtBQUNFLHVGQURGO0FBRUU7QUFBQTtBQUFBO0FBQ0UsOEVBQUMsZ0RBQUQ7QUFDRSwyQkFBTyxFQUFFZ0IsT0FBVVgsVUFBVixPQUFGLEVBQTRCWSxRQUFRLE1BQXBDLEVBRFQ7QUFFRSx5QkFBS2hCLFlBQVlpQixHQUZuQjtBQUdFLHlCQUFLakIsWUFBWWtCLEdBSG5CO0FBSUUsMkJBQU9yQixNQUpUO0FBS0UsOEJBQVUsS0FBS3NCO0FBTGpCO0FBREYsaUJBRkY7QUFXRTtBQVhGO0FBeERGO0FBREY7QUFERixTQURGO0FBMkVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUMsOEVBQUQ7QUFBQTtBQUNFLDBCQUFZbkU7QUFEZDtBQUdFLHdFQUFDLG1FQUFEO0FBQ0UsdUJBQVM5RCxPQURYO0FBRUUsd0JBQVMsV0FGWDtBQUdFLHFCQUFPOEQsVUFBVXZELEtBSG5CO0FBSUUsbUNBQXFCK0YsbUJBSnZCO0FBS0Usc0NBQXdCQztBQUwxQjtBQUhGLFdBREY7QUFZRTtBQUFDLDhFQUFEO0FBQUE7QUFDRSwwQkFBWXhDO0FBRGQ7QUFHRSx3RUFBQyxtRUFBRDtBQUNFLHVCQUFTL0QsT0FEWDtBQUVFLHdCQUFTLFlBRlg7QUFHRSxxQkFBTytELFdBQVd4RCxLQUhwQjtBQUlFLG1DQUFxQitGLG1CQUp2QjtBQUtFLHNDQUF3QkM7QUFMMUI7QUFIRixXQVpGO0FBdUJFLHNFQUFDLGtFQUFELElBQWtCLFlBQVkxQyxLQUE5QjtBQXZCRjtBQTNFRixPQURGO0FBdUdEOzs7O0VBMUt5Qiw2Q0FBQWhCLENBQU1sRSxTOztBQTZLbEMwSCxjQUFjdkQsU0FBZCxHQUEwQjtBQUN4QjlDLFdBQVMsa0RBQUErQyxDQUFVQyxRQUFWLENBQW1CLGtEQUFBRCxDQUFVRSxHQUE3QixFQUFrQ0MsVUFEbkI7QUFFeEJOLFNBQU8sa0RBQUFHLENBQVVJLEtBQVYsQ0FBZ0I7QUFDckI5QyxVQUFNLGtEQUFBMEMsQ0FBVUksS0FBVixDQUFnQjtBQUNwQlUsYUFBTyxrREFBQWQsQ0FBVUksS0FBVixDQUFnQixFQUFFNEQsWUFBWSxrREFBQWhFLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVV5QixNQUE1QixDQUFkLEVBQWhCLENBRGE7QUFFcEJWLGlCQUFXLGtEQUFBZixDQUFVSSxLQUFWLENBQWdCLEVBQUU0RCxZQUFZLGtEQUFBaEUsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVXlCLE1BQTVCLENBQWQsRUFBaEIsQ0FGUztBQUdwQlQsa0JBQVksa0RBQUFoQixDQUFVSSxLQUFWLENBQWdCLEVBQUU0RCxZQUFZLGtEQUFBaEUsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVXlCLE1BQTVCLENBQWQsRUFBaEI7QUFIUSxLQUFoQjtBQURlLEdBQWhCLENBRmlCO0FBU3hCOUQsVUFBUSxrREFBQXFDLENBQVVJLEtBQVYsQ0FBZ0I7QUFDdEI5QyxVQUFNLGtEQUFBMEMsQ0FBVUksS0FBVixDQUFnQjtBQUNwQlUsYUFBTyxrREFBQWQsQ0FBVUUsR0FERztBQUVwQmEsaUJBQVcsa0RBQUFmLENBQVVFLEdBRkQ7QUFHcEJjLGtCQUFZLGtEQUFBaEIsQ0FBVUU7QUFIRixLQUFoQjtBQURnQixHQUFoQixDQVRnQjtBQWdCeEJxRCx1QkFBcUIsa0RBQUF2RCxDQUFVTyxJQUFWLENBQWVKLFVBaEJaO0FBaUJ4QnFELDBCQUF3QixrREFBQXhELENBQVVPLElBQVYsQ0FBZUo7QUFqQmYsQ0FBMUI7QUFtQkFtRCxjQUFjMUIsWUFBZCxHQUE2QjtBQUMzQi9CLFNBQU84QyxZQURvQjtBQUUzQmhGLFVBQVFzRDtBQUZtQixDQUE3Qjs7QUFLQSx5REFBZXFDLGFBQWYsRTs7Ozs7OztBQzdRQSx5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBOztBQUdBLElBQU02QixvQkFBb0I7QUFDeEIxTSxZQUFVLEVBRGM7QUFFeEJzSyxTQUFPLE1BRmlCO0FBR3hCQyxTQUFPLENBQUMsQ0FBRCxFQUFJLEdBQUo7QUFIaUIsQ0FBMUI7O0lBTU1vQyxnQjs7O0FBQ0osNEJBQVl6RixLQUFaLEVBQW1CO0FBQUE7O0FBQUEsb0lBQ1hBLEtBRFc7O0FBR2pCLFVBQUswRixpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QkMsSUFBdkIsT0FBekI7QUFIaUI7QUFJbEI7Ozs7c0NBRWlCdkMsSyxFQUFPO0FBQUEsVUFDZnRLLFFBRGUsR0FDRixLQUFLa0gsS0FBTCxDQUFXcEMsVUFEVCxDQUNmOUUsUUFEZTs7QUFFdkIsV0FBS2tILEtBQUwsQ0FBVzRGLGFBQVgsQ0FBeUI5TSxRQUF6QixFQUFtQ3NLLEtBQW5DO0FBQ0Q7Ozs2QkFFUTtBQUFBLDhCQUNxQixLQUFLcEQsS0FBTCxDQUFXcEMsVUFEaEM7QUFBQSxVQUNDOUUsUUFERCxxQkFDQ0EsUUFERDtBQUFBLFVBQ1dzSyxLQURYLHFCQUNXQSxLQURYOzs7QUFHUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsd0JBQWY7QUFDRTtBQUFBO0FBQUEsWUFBSyxXQUFVLGFBQWY7QUFBOEJ0SztBQUE5QixTQURGO0FBRUU7QUFBQTtBQUFBLFlBQUssV0FBVSxXQUFmO0FBQ0U7QUFBQTtBQUFBLGNBQUssV0FBVSxLQUFmO0FBQ0U7QUFBQTtBQUFBLGdCQUFLLFdBQVUsVUFBZjtBQUNFLDBFQUFDLG1FQUFEO0FBQ0UsdUJBQU9zSyxLQURUO0FBRUUsMEJBQVUsS0FBS3NDO0FBRmpCO0FBREY7QUFERjtBQURGLFNBRkY7QUFZRyxhQUFLMUYsS0FBTCxDQUFXNkY7QUFaZCxPQURGO0FBZ0JEOzs7O0VBL0I0Qiw2Q0FBQTFGLENBQU1sRSxTOztBQWtDckN3SixpQkFBaUJyRixTQUFqQixHQUE2QjtBQUMzQnhDLGNBQVksa0RBQUF5QyxDQUFVSSxLQUFWLENBQWdCO0FBQzFCM0gsY0FBVSxrREFBQXVILENBQVVySCxNQUFWLENBQWlCd0gsVUFERDtBQUUxQjRDLFdBQU8sa0RBQUEvQyxDQUFVckgsTUFGUztBQUcxQnFLLFdBQU8sa0RBQUFoRCxDQUFVTSxPQUFWLENBQWtCLGtEQUFBTixDQUFVeUIsTUFBNUI7QUFIbUIsR0FBaEIsQ0FEZTtBQU0zQitELFlBQVUsa0RBQUF4RixDQUFVeUYsT0FOTztBQU8zQkYsaUJBQWUsa0RBQUF2RixDQUFVTztBQVBFLENBQTdCO0FBU0E2RSxpQkFBaUJ4RCxZQUFqQixHQUFnQztBQUM5QnJFLGNBQVk0SCxpQkFEa0I7QUFFOUJLLFlBQVUsSUFGb0I7QUFHOUJELGlCQUFlLHlCQUFNLENBQUU7QUFITyxDQUFoQzs7QUFNQSx5REFBZUgsZ0JBQWYsRTs7Ozs7Ozs7Ozs7O0FDNURBO0FBQ0E7O0FBR0EsSUFBTU0sZUFBZSxDQUFDLFFBQUQsRUFBVyxLQUFYLENBQXJCOztBQUVBLElBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQUNoRyxLQUFELEVBQVc7QUFBQSxNQUMzQm9ELEtBRDJCLEdBQ1BwRCxLQURPLENBQzNCb0QsS0FEMkI7QUFBQSxNQUNwQjZDLFFBRG9CLEdBQ1BqRyxLQURPLENBQ3BCaUcsUUFEb0I7O0FBRW5DLE1BQU1DLHNCQUFzQixTQUF0QkEsbUJBQXNCLENBQUN4RyxDQUFELEVBQU87QUFDakN1RyxhQUFTdkcsRUFBRXlHLE1BQUYsQ0FBUzNELEtBQWxCO0FBQ0QsR0FGRDs7QUFJQSxNQUFNNEQsVUFBVUwsYUFBYXBFLEdBQWIsQ0FBaUIsVUFBQzBFLFFBQUQ7QUFBQSxXQUMvQjtBQUFBO0FBQUEsUUFBUSxPQUFPQSxRQUFmLEVBQXlCLEtBQUtBLFFBQTlCO0FBQXlDQTtBQUF6QyxLQUQrQjtBQUFBLEdBQWpCLENBQWhCO0FBR0EsU0FDRTtBQUFBO0FBQUEsTUFBUSxJQUFHLDRCQUFYLEVBQXdDLFdBQVUsY0FBbEQsRUFBaUUsT0FBT2pELEtBQXhFLEVBQStFLFVBQVU4QyxtQkFBekY7QUFDR0U7QUFESCxHQURGO0FBS0QsQ0FkRDs7QUFnQkFKLGtCQUFrQjVGLFNBQWxCLEdBQThCO0FBQzVCZ0QsU0FBTyxrREFBQS9DLENBQVVySCxNQURXO0FBRTVCaU4sWUFBVSxrREFBQTVGLENBQVVPO0FBRlEsQ0FBOUI7O0FBS0FvRixrQkFBa0IvRCxZQUFsQixHQUFpQztBQUMvQm1CLFNBQU8sRUFEd0I7QUFFL0I2QyxZQUFVLG9CQUFNLENBQUU7QUFGYSxDQUFqQzs7QUFLQSx5REFBZUQsaUJBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxJQUFNTSxjQUFjO0FBQ2xCdEksVUFBUTtBQUNOeUYsV0FBTztBQUREO0FBRFUsQ0FBcEI7O0lBTU04QyxpQjs7O0FBQ0osK0JBQWM7QUFBQTs7QUFBQTs7QUFHWixVQUFLQyxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QmIsSUFBdkIsT0FBekI7QUFDQSxVQUFLYyxzQkFBTCxHQUE4QixNQUFLQSxzQkFBTCxDQUE0QmQsSUFBNUIsT0FBOUI7QUFDQSxVQUFLZSx1QkFBTCxHQUErQixNQUFLQSx1QkFBTCxDQUE2QmYsSUFBN0IsT0FBL0I7QUFDQSxVQUFLZ0IsMEJBQUwsR0FBa0MsTUFBS0EsMEJBQUwsQ0FBZ0NoQixJQUFoQyxPQUFsQzs7QUFFQSxVQUFLdEksS0FBTCxHQUFhO0FBQ1h1SixpQkFBVyxLQURBO0FBRVhDLGtCQUFZUDtBQUZELEtBQWI7QUFSWTtBQVliOzs7O3dDQUVtQjtBQUNsQixVQUFNUSxnQkFBZ0IsS0FBS3pKLEtBQUwsQ0FBV3VKLFNBQVgsR0FBdUJOLFdBQXZCLEdBQXFDLEtBQUtqSixLQUFMLENBQVd3SixVQUF0RTtBQUNBLFdBQUtFLFFBQUwsQ0FBYztBQUNaSCxtQkFBVyxDQUFDLEtBQUt2SixLQUFMLENBQVd1SixTQURYO0FBRVpDLG9CQUFZQztBQUZBLE9BQWQ7QUFJRDs7OzJDQUVzQkUsTyxFQUFTO0FBQzlCLFdBQUtELFFBQUwsQ0FBYztBQUNaRixvQkFBWUcsT0FEQTtBQUVaQyw2QkFBcUI7QUFGVCxPQUFkO0FBSUQ7Ozs4Q0FFeUI7QUFBQSxtQkFDa0IsS0FBS2pILEtBRHZCO0FBQUEsVUFDaEJsSCxRQURnQixVQUNoQkEsUUFEZ0I7QUFBQSxVQUNOOEssbUJBRE0sVUFDTkEsbUJBRE07QUFBQSxVQUVoQmlELFVBRmdCLEdBRUQsS0FBS3hKLEtBRkosQ0FFaEJ3SixVQUZnQjs7O0FBSXhCLFVBQUlBLFdBQVdqTyxRQUFYLElBQXVCLElBQXZCLElBQStCaU8sV0FBV2hPLE1BQVgsSUFBcUIsSUFBeEQsRUFBOEQ7QUFDNUQ7QUFDQSxhQUFLa08sUUFBTCxDQUFjO0FBQ1pFLCtCQUFxQjtBQURULFNBQWQ7QUFHRCxPQUxELE1BS087QUFDTHJELDRCQUFvQjlLLFFBQXBCLEVBQThCK04sVUFBOUI7QUFDQSxhQUFLTCxpQkFBTDtBQUNEO0FBQ0Y7OzsrQ0FFMEIxSyxPLEVBQVM7QUFBQSxvQkFDVyxLQUFLa0UsS0FEaEI7QUFBQSxVQUMxQmxILFFBRDBCLFdBQzFCQSxRQUQwQjtBQUFBLFVBQ2hCK0ssc0JBRGdCLFdBQ2hCQSxzQkFEZ0I7O0FBRWxDQSw2QkFBdUIvSyxRQUF2QixFQUFpQ2dELE9BQWpDO0FBQ0Q7Ozs2QkFFUTtBQUFBOztBQUFBLFVBQ0MvQyxRQURELEdBQ2MsdURBRGQsQ0FDQ0EsUUFERDtBQUFBLG9CQUV5QixLQUFLaUgsS0FGOUI7QUFBQSxVQUVDMUMsT0FGRCxXQUVDQSxPQUZEO0FBQUEsa0NBRVVPLEtBRlY7QUFBQSxVQUVVQSxLQUZWLGlDQUVrQixFQUZsQjtBQUFBLG1CQUdxQyxLQUFLUixLQUgxQztBQUFBLFVBR0N3SixVQUhELFVBR0NBLFVBSEQ7QUFBQSxVQUdhSSxtQkFIYixVQUdhQSxtQkFIYjs7O0FBS1AsVUFBTUMsd0JBQXdCckosTUFBTThELEdBQU4sQ0FBVSxVQUFDaEosSUFBRCxFQUFVO0FBQ2hELFlBQU04RSxTQUFTSCxRQUFRM0UsS0FBS0MsUUFBYixLQUEwQixFQUF6Qzs7QUFFQSxlQUNFLDREQUFDLHNFQUFEO0FBQ0UsZ0JBQU1ELElBRFI7QUFFRSxrQkFBUThFLE1BRlY7QUFHRSxvQkFBVSxPQUFLa0osMEJBSGpCO0FBSUUsZUFBSzVOLFNBQVNKLElBQVQ7QUFKUCxVQURGO0FBUUQsT0FYNkIsQ0FBOUI7O0FBYUEsYUFDRTtBQUFBO0FBQUEsVUFBSSxXQUFVLDZCQUFkO0FBQ0d1Tyw2QkFESDtBQUVFO0FBQUE7QUFBQSxZQUFJLFdBQVUsNEJBQWQ7QUFDRTtBQUFBO0FBQUE7QUFDRSxvQkFBSyxRQURQO0FBRUUseUJBQVUsd0JBRlo7QUFHRSx1QkFBUyxLQUFLVjtBQUhoQjtBQUtFLGtGQUFNLFdBQVUsMEJBQWhCLEdBTEY7QUFBQTtBQUFBLFdBREY7QUFTRTtBQUFDLDZEQUFEO0FBQUEsY0FBTyxRQUFRLEtBQUtuSixLQUFMLENBQVd1SixTQUExQixFQUFxQyxRQUFRLEtBQUtKLGlCQUFsRCxFQUFxRSxXQUFVLEVBQS9FO0FBQ0U7QUFBQyxxRUFBRDtBQUFBLGdCQUFhLFFBQVEsS0FBS0EsaUJBQTFCO0FBQUE7QUFBQSxhQURGO0FBRUU7QUFBQyxtRUFBRDtBQUFBO0FBQ0UsMEVBQUMsa0VBQUQ7QUFDRSx5QkFBU2xKLE9BRFg7QUFFRSxzQkFBTXVKLFVBRlI7QUFHRSwyQkFBV0ksbUJBSGI7QUFJRSwwQkFBVSxLQUFLUjtBQUpqQjtBQURGLGFBRkY7QUFVRTtBQUFDLHFFQUFEO0FBQUE7QUFDRTtBQUFDLGtFQUFEO0FBQUEsa0JBQVEsT0FBTSxXQUFkLEVBQTBCLFNBQVMsS0FBS0QsaUJBQXhDO0FBQUE7QUFBQSxlQURGO0FBQzZFLGlCQUQ3RTtBQUVFO0FBQUMsa0VBQUQ7QUFBQSxrQkFBUSxPQUFNLFNBQWQsRUFBd0IsU0FBUyxLQUFLRSx1QkFBdEM7QUFBQTtBQUFBO0FBRkY7QUFWRjtBQVRGO0FBRkYsT0FERjtBQStCRDs7OztFQW5HNkIsNkNBQUF2RyxDQUFNbEUsUzs7QUFzR3RDc0ssa0JBQWtCbkcsU0FBbEIsR0FBOEI7QUFDNUI5QyxXQUFTLGtEQUFBK0MsQ0FBVUMsUUFBVixDQUFtQixrREFBQUQsQ0FBVUUsR0FBN0IsRUFBa0NDLFVBRGY7QUFFNUIxSCxZQUFVLGtEQUFBdUgsQ0FBVXJILE1BQVYsQ0FBaUJ3SCxVQUZDO0FBRzVCM0MsU0FBTyxrREFBQXdDLENBQVVNLE9BQVYsQ0FDTCxrREFBQU4sQ0FBVUksS0FBVixDQUFnQjtBQUNkN0gsY0FBVSxrREFBQXlILENBQVV5QixNQUROO0FBRWRqSixZQUFRLGtEQUFBd0gsQ0FBVXJIO0FBRkosR0FBaEIsQ0FESyxDQUhxQjtBQVM1QjRLLHVCQUFxQixrREFBQXZELENBQVVPLElBQVYsQ0FBZUosVUFUUjtBQVU1QnFELDBCQUF3QixrREFBQXhELENBQVVPLElBQVYsQ0FBZUo7QUFWWCxDQUE5Qjs7QUFhQStGLGtCQUFrQnRFLFlBQWxCLEdBQWlDO0FBQy9CcEUsU0FBTztBQUR3QixDQUFqQzs7QUFJQSx5REFBZTBJLGlCQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JJQTtBQUNBO0FBQ0E7O0lBR01ZLG9COzs7QUFDSixnQ0FBWW5ILEtBQVosRUFBbUI7QUFBQTs7QUFBQSw0SUFDWEEsS0FEVzs7QUFHakIsVUFBS29ILGlCQUFMLEdBQXlCLE1BQUtBLGlCQUFMLENBQXVCekIsSUFBdkIsT0FBekI7QUFIaUI7QUFJbEI7Ozs7d0NBRW1CO0FBQUEsVUFDVjVNLFFBRFUsR0FDRyx1REFESCxDQUNWQSxRQURVO0FBQUEsbUJBRVMsS0FBS2lILEtBRmQ7QUFBQSxVQUVWckgsSUFGVSxVQUVWQSxJQUZVO0FBQUEsVUFFSjBPLFFBRkksVUFFSkEsUUFGSTs7O0FBSWxCQSxlQUFTdE8sU0FBU0osSUFBVCxDQUFUO0FBQ0Q7Ozs2QkFFUTtBQUFBLFVBQ0NJLFFBREQsR0FDK0IsdURBRC9CLENBQ0NBLFFBREQ7QUFBQSxVQUNXdU8sZUFEWCxHQUMrQix1REFEL0IsQ0FDV0EsZUFEWDtBQUFBLG9CQUVrQixLQUFLdEgsS0FGdkI7QUFBQSxVQUVDckgsSUFGRCxXQUVDQSxJQUZEO0FBQUEsVUFFTzhFLE1BRlAsV0FFT0EsTUFGUDtBQUFBLHlCQUdpQjlFLElBSGpCLENBR0NxRixNQUhEO0FBQUEsVUFHQ0EsTUFIRCxnQ0FHVSxFQUhWOzs7QUFLUCxVQUFNdUosa0JBQWtCO0FBQ3RCcEMsZUFBTyxNQURlO0FBRXRCTCxnQkFBUSxNQUZjO0FBR3RCMEMseUJBQWlCeEosT0FBT3lGO0FBSEYsT0FBeEI7O0FBTUEsYUFDRTtBQUFBO0FBQUEsVUFBSSxXQUFVLGlCQUFkLEVBQWdDLEtBQUsxSyxTQUFTSixJQUFULENBQXJDO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxLQUFmO0FBQ0UsK0VBQUssV0FBVSxVQUFmLEVBQTBCLE9BQU80TyxlQUFqQyxHQURGO0FBRUU7QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQTJCRCw0QkFBZ0I3SixPQUFPc0UsUUFBdkIsRUFBaUMsRUFBakM7QUFBM0IsV0FGRjtBQUdFO0FBQUE7QUFBQSxjQUFLLFdBQVUsVUFBZjtBQUEyQnBKLGlCQUFLRTtBQUFoQyxXQUhGO0FBSUU7QUFBQTtBQUFBLGNBQUssV0FBVSxVQUFmO0FBQ0U7QUFBQTtBQUFBO0FBQ0Usc0JBQUssUUFEUDtBQUVFLDJCQUFVLE9BRlo7QUFHRSw4QkFBVyxPQUhiO0FBSUUseUJBQVMsS0FBS3VPO0FBSmhCO0FBTUU7QUFBQTtBQUFBLGtCQUFNLGVBQVksTUFBbEI7QUFBQTtBQUFBO0FBTkY7QUFERjtBQUpGO0FBREYsT0FERjtBQW9CRDs7OztFQTdDZ0MsNkNBQUFqSCxDQUFNbEUsUzs7QUFnRHpDa0wscUJBQXFCL0csU0FBckIsR0FBaUM7QUFDL0J6SCxRQUFNLGtEQUFBMEgsQ0FBVUksS0FBVixDQUFnQjtBQUNwQjdILGNBQVUsa0RBQUF5SCxDQUFVeUIsTUFEQTtBQUVwQmpKLFlBQVEsa0RBQUF3SCxDQUFVckg7QUFGRSxHQUFoQixFQUdId0gsVUFKNEI7QUFLL0IvQyxVQUFRLGtEQUFBNEMsQ0FBVUksS0FBVixDQUFnQjtBQUN0Qi9DLFFBQUksa0RBQUEyQyxDQUFVeUIsTUFEUTtBQUV0QkMsY0FBVSxrREFBQTFCLENBQVVySCxNQUZFO0FBR3RCaUksVUFBTSxrREFBQVosQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUIsQ0FIZ0I7QUFJdEJ5QixVQUFNLGtEQUFBM0IsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUI7QUFKZ0IsR0FBaEIsRUFLTEMsVUFWNEI7QUFXL0I2RyxZQUFVLGtEQUFBaEgsQ0FBVU87QUFYVyxDQUFqQzs7QUFjQXVHLHFCQUFxQmxGLFlBQXJCLEdBQW9DO0FBQ2xDb0YsWUFBVSxvQkFBTSxDQUFFO0FBRGdCLENBQXBDOztBQUlBLHlEQUFlRixvQkFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkVBO0FBQ0E7QUFDQTs7QUFHQSxJQUFNTSxjQUFjLENBQUMsQ0FBckI7QUFDQSxJQUFNQyxlQUFlLEVBQXJCOztBQUVBLElBQU1DLGFBQWEsU0FBYkEsVUFBYSxHQUFpQjtBQUFBLE1BQWhCbEssTUFBZ0IsdUVBQVAsRUFBTztBQUFBLHFCQUNaQSxNQURZLENBQzFCdUUsSUFEMEI7QUFBQSxNQUMxQkEsSUFEMEIsZ0NBQ25CLEVBRG1COztBQUVsQyxNQUFNNEYsWUFBWSxFQUFsQjtBQUNBNUYsT0FBS3hFLE9BQUwsQ0FBYSxVQUFDbUgsR0FBRCxFQUFTO0FBQUEsd0JBQ01BLEdBRE4sQ0FDWnJDLFFBRFk7QUFBQSxRQUNaQSxRQURZLGlDQUNELEVBREM7O0FBRXBCQSxhQUFTOUUsT0FBVCxDQUFpQixVQUFDK0UsT0FBRCxFQUFhO0FBQzVCcUYsZ0JBQVVyRixRQUFRbkUsR0FBbEIsSUFBeUIsSUFBekI7QUFDRCxLQUZEO0FBR0QsR0FMRDtBQU1BLFNBQU8yQyxPQUFPQyxJQUFQLENBQVk0RyxTQUFaLENBQVA7QUFDRCxDQVZEOztBQVlBLElBQU1DLDBCQUEwQixTQUExQkEsdUJBQTBCO0FBQUEsTUFBQ3ZLLE9BQUQsdUVBQVcsRUFBWDtBQUFBLFVBQzlCO0FBQUE7QUFBQSxNQUFRLE9BQU9tSyxXQUFmLEVBQTRCLEtBQUtBLFdBQWpDLEVBQThDLGNBQTlDO0FBQUE7QUFBQSxHQUQ4Qiw0QkFFM0IxRyxPQUFPQyxJQUFQLENBQVkxRCxPQUFaLEVBQXFCcUUsR0FBckIsQ0FBeUIsVUFBQy9JLFFBQUQsRUFBYztBQUN4QyxRQUFNNkUsU0FBU0gsUUFBUTFFLFFBQVIsQ0FBZjtBQUNBLFdBQ0U7QUFBQTtBQUFBLFFBQVEsT0FBTzZFLE9BQU9DLEVBQXRCLEVBQTBCLEtBQUtELE9BQU9DLEVBQXRDO0FBQTJDRCxhQUFPQyxFQUFsRDtBQUFBO0FBQXdERCxhQUFPc0U7QUFBL0QsS0FERjtBQUdELEdBTEUsQ0FGMkI7QUFBQSxDQUFoQzs7QUFVQSxJQUFNK0YsMEJBQTBCLFNBQTFCQSx1QkFBMEIsR0FBaUI7QUFBQSxNQUFoQnJLLE1BQWdCLHVFQUFQLEVBQU87O0FBQy9DLE1BQU1zSyxVQUFVSixXQUFXbEssTUFBWCxDQUFoQjtBQUNBLFVBQ0U7QUFBQTtBQUFBLE1BQVEsT0FBT2lLLFlBQWYsRUFBNkIsS0FBS0EsWUFBbEMsRUFBZ0QsY0FBaEQ7QUFBQTtBQUFBLEdBREYsNEJBRUtLLFFBQVFwRyxHQUFSLENBQVksVUFBQzlJLE1BQUQ7QUFBQSxXQUNiO0FBQUE7QUFBQSxRQUFRLE9BQU9BLE1BQWYsRUFBdUIsS0FBS0EsTUFBNUI7QUFBcUNBO0FBQXJDLEtBRGE7QUFBQSxHQUFaLENBRkw7QUFNRCxDQVJEOztJQVVNbVAsZ0I7OztBQUNKLDhCQUFjO0FBQUE7O0FBQUE7O0FBR1osVUFBS0Msa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0J0QyxJQUF4QixPQUExQjtBQUNBLFVBQUt1QyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QnZDLElBQXhCLE9BQTFCOztBQUVBLFVBQUt0SSxLQUFMLEdBQWE7QUFDWDhLLGlCQUFXO0FBREEsS0FBYjtBQU5ZO0FBU2I7Ozs7dUNBRWtCekksQyxFQUFHO0FBQUEsbUJBQ08sS0FBS00sS0FEWjtBQUFBLFVBQ1pySCxJQURZLFVBQ1pBLElBRFk7QUFBQSxVQUNOc04sUUFETSxVQUNOQSxRQURNOztBQUVwQixVQUFNbUMsY0FBY0MsU0FBUzNJLEVBQUV5RyxNQUFGLENBQVMzRCxLQUFsQixFQUF5QixFQUF6QixDQUFwQjtBQUNBeUQsNEJBQWN0TixJQUFkLElBQW9CQyxVQUFVd1AsV0FBOUI7QUFDRDs7O3VDQUVrQjFJLEMsRUFBRztBQUFBLG9CQUNPLEtBQUtNLEtBRFo7QUFBQSxVQUNackgsSUFEWSxXQUNaQSxJQURZO0FBQUEsVUFDTnNOLFFBRE0sV0FDTkEsUUFETTs7QUFFcEIsVUFBTXFDLFlBQVk1SSxFQUFFeUcsTUFBRixDQUFTM0QsS0FBM0I7QUFDQXlELDRCQUFjdE4sSUFBZCxJQUFvQkUsUUFBUXlQLFNBQTVCO0FBQ0Q7Ozs2QkFFUTtBQUFBLG9CQUMyQyxLQUFLdEksS0FEaEQ7QUFBQSxVQUNDMUMsT0FERCxXQUNDQSxPQUREO0FBQUEsaUNBQ1UzRSxJQURWO0FBQUEsVUFDVUEsSUFEVixnQ0FDaUIsRUFEakI7QUFBQSxzQ0FDcUJ3UCxTQURyQjtBQUFBLFVBQ3FCQSxTQURyQixxQ0FDaUMsS0FEakM7QUFBQSwyQkFFZ0V4UCxJQUZoRSxDQUVDQyxRQUZEO0FBQUEsVUFFQ0EsUUFGRCxrQ0FFWTZPLFdBRlo7QUFBQSx5QkFFZ0U5TyxJQUZoRSxDQUV5QkUsTUFGekI7QUFBQSxVQUV5QkEsTUFGekIsZ0NBRWtDNk8sWUFGbEM7QUFBQSx5QkFFZ0UvTyxJQUZoRSxDQUVnRHFGLE1BRmhEO0FBQUEsVUFFZ0RBLE1BRmhELGdDQUV5RCxFQUZ6RDs7QUFHUCxVQUFNUCxTQUFTSCxRQUFRMUUsUUFBUixLQUFxQixFQUFwQztBQUNBLFVBQU02SyxRQUFRekYsT0FBT3lGLEtBQXJCOztBQUVBLFVBQU04RCxrQkFBa0I7QUFDdEJDLHlCQUFpQi9EO0FBREssT0FBeEI7O0FBSUEsVUFBTThFLG9CQUFvQlYsd0JBQXdCdkssT0FBeEIsQ0FBMUI7QUFDQSxVQUFNa0wsb0JBQW9CVix3QkFBd0JySyxNQUF4QixDQUExQjs7QUFFQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsbUJBQWY7QUFDRTtBQUFDLDBEQUFEO0FBQUE7QUFDRTtBQUFDLGlFQUFEO0FBQUE7QUFDRTtBQUFDLCtEQUFEO0FBQUE7QUFBQTtBQUFBLGFBREY7QUFFRTtBQUFBO0FBQUEsZ0JBQUssT0FBTzhKLGVBQVo7QUFBOEI5RDtBQUE5QjtBQUZGLFdBREY7QUFLRTtBQUFDLGlFQUFEO0FBQUE7QUFDRTtBQUFDLCtEQUFEO0FBQUEsZ0JBQU8sT0FBSSxpQ0FBWDtBQUFBO0FBQUEsYUFERjtBQUM2RCxtRkFEN0Q7QUFFRTtBQUFBO0FBQUE7QUFDRSwyQkFBVSxjQURaO0FBRUUsc0JBQUssUUFGUDtBQUdFLHNCQUFLLFFBSFA7QUFJRSxvQkFBRyxpQ0FKTDtBQUtFLHVCQUFPN0ssUUFMVDtBQU1FLDBCQUFVLEtBQUtxUDtBQU5qQjtBQVFHTTtBQVJILGFBRkY7QUFZRTtBQUFDLGtFQUFEO0FBQUEsZ0JBQVUsV0FBVSxhQUFwQixFQUFrQyxRQUFRLENBQUNKLFNBQUQsSUFBY3ZQLGFBQWE2TyxXQUFyRTtBQUFBO0FBQUE7QUFaRixXQUxGO0FBcUJFO0FBQUMsaUVBQUQ7QUFBQTtBQUNFO0FBQUMsK0RBQUQ7QUFBQSxnQkFBTyxPQUFJLGtDQUFYO0FBQUE7QUFBQSxhQURGO0FBQytELG1GQUQvRDtBQUVFO0FBQUE7QUFBQTtBQUNFLDJCQUFVLGNBRFo7QUFFRSxzQkFBSyxRQUZQO0FBR0Usc0JBQUssUUFIUDtBQUlFLG9CQUFHLGtDQUpMO0FBS0UsdUJBQU81TyxNQUxUO0FBTUUsMEJBQVVELGFBQWE2TyxXQU56QjtBQU9FLDBCQUFVLEtBQUtTO0FBUGpCO0FBU0dNO0FBVEgsYUFGRjtBQWFFO0FBQUMsa0VBQUQ7QUFBQSxnQkFBVSxXQUFVLGFBQXBCLEVBQWtDLFFBQVEsQ0FBQ0wsU0FBRCxJQUFjdFAsV0FBVzZPLFlBQW5FO0FBQUE7QUFBQTtBQWJGO0FBckJGO0FBREYsT0FERjtBQTJDRDs7OztFQWhGNEIsNkNBQUF2SCxDQUFNbEUsUzs7QUFtRnJDK0wsaUJBQWlCNUgsU0FBakIsR0FBNkI7QUFDM0I5QyxXQUFTLGtEQUFBK0MsQ0FBVUMsUUFBVixDQUFtQixrREFBQUQsQ0FBVUUsR0FBN0IsRUFBa0NDLFVBRGhCO0FBRTNCN0gsUUFBTSxrREFBQTBILENBQVVJLEtBQVYsQ0FBZ0I7QUFDcEI3SCxjQUFVLGtEQUFBeUgsQ0FBVXlCLE1BREE7QUFFcEJqSixZQUFRLGtEQUFBd0gsQ0FBVXJILE1BRkU7QUFHcEJnRixZQUFRLGtEQUFBcUMsQ0FBVUksS0FBVixDQUFnQjtBQUN0QmdELGFBQU8sa0RBQUFwRCxDQUFVckg7QUFESyxLQUFoQjtBQUhZLEdBQWhCLENBRnFCO0FBUzNCbVAsYUFBVyxrREFBQTlILENBQVVvSSxJQVRNO0FBVTNCeEMsWUFBVSxrREFBQTVGLENBQVVPO0FBVk8sQ0FBN0I7O0FBYUFvSCxpQkFBaUIvRixZQUFqQixHQUFnQztBQUM5QnRKLFFBQU0sRUFEd0I7QUFFOUJ3UCxhQUFXLEtBRm1CO0FBRzlCbEMsWUFBVSxvQkFBTSxDQUFFO0FBSFksQ0FBaEM7O0FBTUEseURBQWUrQixnQkFBZixFIiwiZmlsZSI6ImNoYWluZXJfdWkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBsaW5lMmtleShsaW5lKSB7XG4gICAgcmV0dXJuIGAke2xpbmUucmVzdWx0SWR9XyR7bGluZS5sb2dLZXl9YDtcbiAgfVxuXG4gIHN0YXRpYyBsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpIHtcbiAgICByZXR1cm4gYCR7YXhpc05hbWV9XyR7VXRpbHMubGluZTJrZXkobGluZSl9YDtcbiAgfVxuXG4gIHN0YXRpYyB0cnVuY2F0ZUZvcndhcmQoc3RyaW5nLCBsZW5ndGgsIGJlZ2lubmluZyA9ICcuLi4nKSB7XG4gICAgY29uc3Qgc3RyID0gc3RyaW5nIHx8ICcnO1xuICAgIGlmIChzdHIubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYmVnaW5uaW5nICsgc3RyLnN1YnN0cmluZygoc3RyLmxlbmd0aCAtIGxlbmd0aCkgKyBiZWdpbm5pbmcubGVuZ3RoLCBzdHIubGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlscztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2luZGV4LmpzIiwiY29uc3QgQVBJX1JPT1QgPSAnL2FwaS92MS8nO1xuXG5jb25zdCBjYWxsQXBpID0gKGVuZHBvaW50KSA9PiB7XG4gIGNvbnN0IGZ1bGxVcmwgPSAoZW5kcG9pbnQuaW5kZXhPZihBUElfUk9PVCkgPT09IC0xKSA/IEFQSV9ST09UICsgZW5kcG9pbnQgOiBlbmRwb2ludDtcblxuICByZXR1cm4gZmV0Y2goZnVsbFVybClcbiAgICAudGhlbigocmVzcG9uc2UpID0+XG4gICAgICByZXNwb25zZS5qc29uKCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGpzb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBqc29uO1xuICAgICAgfSlcbiAgICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENBTExfQVBJID0gJ0NhbGwgQVBJJztcblxuZXhwb3J0IGRlZmF1bHQgKHN0b3JlKSA9PiAobmV4dCkgPT4gKGFjdGlvbikgPT4ge1xuICBjb25zdCBjYWxsQVBJID0gYWN0aW9uW0NBTExfQVBJXTtcbiAgaWYgKHR5cGVvZiBjYWxsQVBJID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gIH1cblxuICBsZXQgeyBlbmRwb2ludCB9ID0gY2FsbEFQSTtcbiAgY29uc3QgeyB0eXBlcyB9ID0gY2FsbEFQSTtcblxuICBpZiAodHlwZW9mIGVuZHBvaW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZW5kcG9pbnQgPSBlbmRwb2ludChzdG9yZS5nZXRTdGF0ZSgpKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheSh0eXBlcykgfHwgdHlwZXMubGVuZ3RoICE9PSAzKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhbiBhcnJheSBvZiB0aHJlZSBhY3Rpb24gdHlwZXMuJyk7XG4gIH1cblxuICBjb25zdCBhY3Rpb25XaXRoID0gKGRhdGEpID0+IHtcbiAgICBjb25zdCBmaW5hbEFjdGlvbiA9IHsgLi4uYWN0aW9uLCAuLi5kYXRhIH07XG4gICAgZGVsZXRlIGZpbmFsQWN0aW9uW0NBTExfQVBJXTtcbiAgICByZXR1cm4gZmluYWxBY3Rpb247XG4gIH07XG5cbiAgY29uc3QgW3JlcXVlc3RUeXBlLCBzdWNjZXNzVHlwZSwgZmFpbHVyZVR5cGVdID0gdHlwZXM7XG4gIG5leHQoYWN0aW9uV2l0aCh7IHR5cGU6IHJlcXVlc3RUeXBlIH0pKTtcblxuICByZXR1cm4gY2FsbEFwaShlbmRwb2ludCkudGhlbihcbiAgICAocmVzcG9uc2UpID0+IG5leHQoYWN0aW9uV2l0aCh7XG4gICAgICByZXNwb25zZSxcbiAgICAgIHR5cGU6IHN1Y2Nlc3NUeXBlXG4gICAgfSkpLFxuICAgIChlcnJvcikgPT4gbmV4dChhY3Rpb25XaXRoKHtcbiAgICAgIHR5cGU6IGZhaWx1cmVUeXBlLFxuICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ1NvbWV0aGluZyBiYWQgaGFwcGVuZWQnXG4gICAgfSkpXG4gICk7XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWlkZGxld2FyZS9hcGkuanMiLCJpbXBvcnQgeyBDQUxMX0FQSSB9IGZyb20gJy4uL21pZGRsZXdhcmUvYXBpJztcblxuXG4vLyByZXN1bHRzIEFQSVxuXG5leHBvcnQgY29uc3QgUkVTVUxUU19SRVFVRVNUID0gJ1JFU1VMVFNfUkVRVUVTVCc7XG5leHBvcnQgY29uc3QgUkVTVUxUU19TVUNDRVNTID0gJ1JFU1VMVFNfU1VDQ0VTUyc7XG5leHBvcnQgY29uc3QgUkVTVUxUU19GQUlMVUUgPSAnUkVTVUxUU19GQUlMVUUnO1xuXG5jb25zdCBmZXRjaFJlc3VsdHMgPSAoKSA9PiAoe1xuICBbQ0FMTF9BUEldOiB7XG4gICAgdHlwZXM6IFtSRVNVTFRTX1JFUVVFU1QsIFJFU1VMVFNfU1VDQ0VTUywgUkVTVUxUU19GQUlMVUVdLFxuICAgIGVuZHBvaW50OiAncmVzdWx0cydcbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBsb2FkUmVzdWx0cyA9ICgpID0+IChkaXNwYXRjaCkgPT4gZGlzcGF0Y2goZmV0Y2hSZXN1bHRzKCkpO1xuXG5cbi8vIGF4aXMgY29uZmlnXG5cbmV4cG9ydCBjb25zdCBBWElTX0NPTkZJR19MSU5FX0FERCA9ICdBWElTX0NPTkZJR19MSU5FX0FERCc7XG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfTElORV9SRU1PVkUgPSAnQVhJU19DT05GSUdfTElORV9SRU1PVkUnO1xuXG5leHBvcnQgY29uc3QgYWRkTGluZVRvQXhpcyA9IChheGlzTmFtZSwgbGluZSkgPT4gKHtcbiAgdHlwZTogQVhJU19DT05GSUdfTElORV9BREQsXG4gIGF4aXNOYW1lLFxuICBsaW5lXG59KTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUxpbmVGcm9tQXhpcyA9IChheGlzTmFtZSwgbGluZUtleSkgPT4gKHtcbiAgdHlwZTogQVhJU19DT05GSUdfTElORV9SRU1PVkUsXG4gIGF4aXNOYW1lLFxuICBsaW5lS2V5XG59KTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FjdGlvbnMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEFwcENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXInO1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUvY29uZmlndXJlU3RvcmUnO1xuaW1wb3J0IENoYWluZXJVSUNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvQ2hhaW5lclVJQ29udGFpbmVyJztcblxuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKCk7XG5cbmNvbnN0IHJlbmRlciA9IChDb21wb25lbnQsIGFwcE5vZGUpID0+IHtcbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPEFwcENvbnRhaW5lcj5cbiAgICAgICAgPENvbXBvbmVudCAvPlxuICAgICAgPC9BcHBDb250YWluZXI+XG4gICAgPC9Qcm92aWRlcj4sXG4gICAgYXBwTm9kZVxuICApO1xufTtcblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgY29uc3QgYXBwTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcE5vZGUpO1xuICByZW5kZXIoQ2hhaW5lclVJQ29udGFpbmVyLCBhcHBOb2RlKTtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vY29udGFpbmVycy9DaGFpbmVyVUlDb250YWluZXInLCAoKSA9PiB7IHJlbmRlcihDaGFpbmVyVUlDb250YWluZXIsIGFwcE5vZGUpOyB9KTtcbn0gZWxzZSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFpbmVyX3VpLXJvb3QnKTtcbiAgICBpZiAoYXBwTm9kZSkge1xuICAgICAgcmVuZGVyKENoYWluZXJVSUNvbnRhaW5lciwgYXBwTm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzeCIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgcGVyc2lzdFN0b3JlIH0gZnJvbSAncmVkdXgtcGVyc2lzdCc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9taWRkbGV3YXJlL2FwaSc7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi4vcmVkdWNlcnMnO1xuXG5jb25zdCBjb25maWd1cmVTdG9yZSA9IChwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICBjb25zdCBtaWRkbGV3YXJlID0gW3RodW5rLCBhcGksIGNyZWF0ZUxvZ2dlcigpXTtcblxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VyLFxuICAgIHByZWxvYWRlZFN0YXRlLFxuICAgIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuICApO1xuXG4gIHBlcnNpc3RTdG9yZShzdG9yZSk7XG5cbiAgcmV0dXJuIHN0b3JlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlU3RvcmU7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS9jb25maWd1cmVTdG9yZS5qcyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHBlcnNpc3RSZWR1Y2VyIH0gZnJvbSAncmVkdXgtcGVyc2lzdCc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICdyZWR1eC1wZXJzaXN0L2VzL3N0b3JhZ2UnO1xuaW1wb3J0ICogYXMgQWN0aW9uVHlwZXMgZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5cbmNvbnN0IGVudGl0aWVzID0gKHN0YXRlID0geyByZXN1bHRzOiB7fSB9LCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuUkVTVUxUU19TVUNDRVNTOlxuICAgICAgaWYgKGFjdGlvbi5yZXNwb25zZSAmJiBhY3Rpb24ucmVzcG9uc2UucmVzdWx0cykge1xuICAgICAgICBjb25zdCByZXN1bHRzTGlzdCA9IGFjdGlvbi5yZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICBjb25zdCByZXN1bHRzID0ge307XG4gICAgICAgIHJlc3VsdHNMaXN0LmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIHJlc3VsdHNbcmVzdWx0LmlkXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCByZXN1bHRzIH07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuY29uc3QgYXhlcyA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgY29uc3QgeyBsaW5lMmtleSB9ID0gVXRpbHM7XG4gIGNvbnN0IHsgYXhpc05hbWUsIGxpbmUsIGxpbmVLZXkgfSA9IGFjdGlvbjtcbiAgaWYgKGF4aXNOYW1lID09IG51bGwpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3QgYXhpc0NvbmZpZyA9IHN0YXRlW2F4aXNOYW1lXSB8fCB7IGF4aXNOYW1lIH07XG4gIGNvbnN0IHsgbGluZXMgPSBbXSB9ID0gYXhpc0NvbmZpZztcblxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5BWElTX0NPTkZJR19MSU5FX0FERDpcbiAgICAgIGlmIChsaW5lID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtheGlzTmFtZV06IHtcbiAgICAgICAgICAuLi5heGlzQ29uZmlnLFxuICAgICAgICAgIGxpbmVzOiBbLi4ubGluZXMsIGxpbmVdXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgY2FzZSBBY3Rpb25UeXBlcy5BWElTX0NPTkZJR19MSU5FX1JFTU9WRTpcbiAgICAgIGlmIChsaW5lS2V5ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtheGlzTmFtZV06IHtcbiAgICAgICAgICAuLi5heGlzQ29uZmlnLFxuICAgICAgICAgIGxpbmVzOiBbLi4ubGluZXMuZmlsdGVyKChsKSA9PiBsaW5lMmtleShsKSAhPT0gbGluZUtleSldXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuY29uc3QgY29uZmlnID0gY29tYmluZVJlZHVjZXJzKHtcbiAgYXhlc1xufSk7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgZW50aXRpZXMsXG4gIGNvbmZpZzogcGVyc2lzdFJlZHVjZXIoeyBrZXk6ICdjb25maWcnLCBzdG9yYWdlIH0sIGNvbmZpZylcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlZHVjZXJzL2luZGV4LmpzeCIsImltcG9ydCBjcmVhdGVXZWJTdG9yYWdlIGZyb20gJy4vY3JlYXRlV2ViU3RvcmFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVdlYlN0b3JhZ2UoJ2xvY2FsJyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9pbmRleC5qcyIsImltcG9ydCBnZXRTdG9yYWdlIGZyb20gJy4vZ2V0U3RvcmFnZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZVdlYlN0b3JhZ2UodHlwZSkge1xuICB2YXIgc3RvcmFnZSA9IGdldFN0b3JhZ2UodHlwZSk7XG4gIHJldHVybiB7XG4gICAgZ2V0SXRlbTogZnVuY3Rpb24gZ2V0SXRlbShrZXksIGNiKSB7XG4gICAgICByZXR1cm4gY2IobnVsbCwgc3RvcmFnZS5nZXRJdGVtKGtleSkpO1xuICAgIH0sXG4gICAgc2V0SXRlbTogZnVuY3Rpb24gc2V0SXRlbShrZXksIGl0ZW0sIGNiKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjYihudWxsLCBzdG9yYWdlLnNldEl0ZW0oa2V5LCBpdGVtKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY2IoZXJyKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbW92ZUl0ZW06IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oa2V5LCBjYikge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpKTtcbiAgICB9XG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9jcmVhdGVXZWJTdG9yYWdlLmpzIiwidmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIG5vb3BTdG9yYWdlID0ge1xuICBnZXRJdGVtOiBub29wLFxuICBzZXRJdGVtOiBub29wLFxuICByZW1vdmVJdGVtOiBub29wXG59O1xuXG5mdW5jdGlvbiBoYXNTdG9yYWdlKHN0b3JhZ2VUeXBlKSB7XG4gIGlmICgodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yod2luZG93KSkgIT09ICdvYmplY3QnIHx8ICEoc3RvcmFnZVR5cGUgaW4gd2luZG93KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgdmFyIHN0b3JhZ2UgPSB3aW5kb3dbc3RvcmFnZVR5cGVdO1xuICAgIHZhciB0ZXN0S2V5ID0gJ3JlZHV4LXBlcnNpc3QgJyArIHN0b3JhZ2VUeXBlICsgJyB0ZXN0JztcbiAgICBzdG9yYWdlLnNldEl0ZW0odGVzdEtleSwgJ3Rlc3QnKTtcbiAgICBzdG9yYWdlLmdldEl0ZW0odGVzdEtleSk7XG4gICAgc3RvcmFnZS5yZW1vdmVJdGVtKHRlc3RLZXkpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIGNvbnNvbGUud2FybigncmVkdXgtcGVyc2lzdCAnICsgc3RvcmFnZVR5cGUgKyAnIHRlc3QgZmFpbGVkLCBwZXJzaXN0ZW5jZSB3aWxsIGJlIGRpc2FibGVkLicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U3RvcmFnZSh0eXBlKSB7XG4gIHZhciBzdG9yYWdlVHlwZSA9IHR5cGUgKyAnU3RvcmFnZSc7XG4gIGlmIChoYXNTdG9yYWdlKHN0b3JhZ2VUeXBlKSkgcmV0dXJuIHdpbmRvd1tzdG9yYWdlVHlwZV07ZWxzZSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlZHV4LXBlcnNpc3QgZmFpbGVkIHRvIGNyZWF0ZSBzeW5jIHN0b3JhZ2UuIGZhbGxpbmcgYmFjayB0byBtZW1vcnkgc3RvcmFnZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vb3BTdG9yYWdlO1xuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9nZXRTdG9yYWdlLmpzIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHtcbiAgbG9hZFJlc3VsdHMsXG4gIGFkZExpbmVUb0F4aXMsIHJlbW92ZUxpbmVGcm9tQXhpc1xufSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCBFeHBlcmltZW50c1RhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvRXhwZXJpbWVudHNUYWJsZSc7XG5pbXBvcnQgTG9nVmlzdWFsaXplciBmcm9tICcuLi9jb21wb25lbnRzL0xvZ1Zpc3VhbGl6ZXInO1xuXG5cbmNvbnN0IHJlc3VsdHNMb2FkSW50ZXJ2YWwgPSA1ICogMTAwMDtcblxuY2xhc3MgQ2hhaW5lclVJQ29udGFpbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5yZXN1bHRzTG9hZFRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy5wcm9wcy5sb2FkUmVzdWx0cywgcmVzdWx0c0xvYWRJbnRlcnZhbCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMucmVzdWx0c0xvYWRUaW1lcik7XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZUFkZChheGlzTmFtZSwgbGluZSkge1xuICAgIHRoaXMucHJvcHMuYWRkTGluZVRvQXhpcyhheGlzTmFtZSwgbGluZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHRzLCBjb25maWcsIHN0YXRzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhaW5lci11aS1jb250YWluZXJcIj5cbiAgICAgICAgPExvZ1Zpc3VhbGl6ZXJcbiAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgIHN0YXRzPXtzdGF0c31cbiAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICBvbkF4aXNDb25maWdMaW5lQWRkPXt0aGlzLnByb3BzLmFkZExpbmVUb0F4aXN9XG4gICAgICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZT17dGhpcy5wcm9wcy5yZW1vdmVMaW5lRnJvbUF4aXN9XG4gICAgICAgIC8+XG4gICAgICAgIDxFeHBlcmltZW50c1RhYmxlXG4gICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICBzdGF0cz17c3RhdHN9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkNoYWluZXJVSUNvbnRhaW5lci5wcm9wVHlwZXMgPSB7XG4gIHJlc3VsdHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICBjb25maWc6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXhlczogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHN0YXRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4ZXM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KSxcbiAgICBhcmdLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9KS5pc1JlcXVpcmVkLFxuICBsb2FkUmVzdWx0czogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgYWRkTGluZVRvQXhpczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcmVtb3ZlTGluZUZyb21BeGlzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5jb25zdCBtYXBFbnRpdGllc1RvU3RhdHMgPSAoZW50aXRpZXMpID0+IHtcbiAgY29uc3QgeyByZXN1bHRzID0ge30gfSA9IGVudGl0aWVzO1xuICBjb25zdCBhcmdLZXlTZXQgPSB7fTtcbiAgT2JqZWN0LmtleXMocmVzdWx0cykuZm9yRWFjaCgocmVzdWx0SWQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICByZXN1bHQuYXJncy5mb3JFYWNoKChhcmcpID0+IHsgYXJnS2V5U2V0W2FyZy5rZXldID0gdHJ1ZTsgfSk7XG4gIH0pO1xuICBjb25zdCBhcmdLZXlzID0gT2JqZWN0LmtleXMoYXJnS2V5U2V0KTtcblxuICBjb25zdCBheGVzID0ge1xuICAgIHhBeGlzOiB7fSxcbiAgICB5TGVmdEF4aXM6IHt9LFxuICAgIHlSaWdodEF4aXM6IHt9XG4gIH07XG5cbiAgcmV0dXJuIHsgYXhlcywgYXJnS2V5cyB9O1xufTtcblxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgYXhlczoge31cbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICBjb25zdCB7XG4gICAgZW50aXRpZXMsXG4gICAgY29uZmlnID0gZGVmYXVsdENvbmZpZ1xuICB9ID0gc3RhdGU7XG4gIGNvbnN0IHsgcmVzdWx0cyA9IHt9IH0gPSBlbnRpdGllcztcbiAgY29uc3Qgc3RhdHMgPSBtYXBFbnRpdGllc1RvU3RhdHMoZW50aXRpZXMpO1xuICByZXR1cm4geyByZXN1bHRzLCBjb25maWcsIHN0YXRzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge1xuICBsb2FkUmVzdWx0cyxcbiAgYWRkTGluZVRvQXhpcyxcbiAgcmVtb3ZlTGluZUZyb21BeGlzXG59KShDaGFpbmVyVUlDb250YWluZXIpO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGFpbmVycy9DaGFpbmVyVUlDb250YWluZXIuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVzdWx0Um93IGZyb20gJy4vUmVzdWx0Um93JztcblxuXG5jb25zdCBFeHBlcmltZW50c1RhYmxlID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVzdWx0cyA9IHt9LCBzdGF0cyB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYXJnS2V5cyB9ID0gc3RhdHM7XG5cbiAgY29uc3QgYXJnSGVhZGVyRWxlbXMgPSBhcmdLZXlzLm1hcCgoYXJnS2V5KSA9PiAoPHRoIGtleT17YGFyZ3MtJHthcmdLZXl9YH0+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jb2dcIiAvPnthcmdLZXl9PC90aD4pKTtcblxuICBjb25zdCByZXN1bHRSb3dFbGVtcyA9IE9iamVjdC5rZXlzKHJlc3VsdHMpLm1hcCgocmVzdWx0SWQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICBjb25zdCBrZXkgPSBgcmVzdWx0LXJvdy0ke3Jlc3VsdC5pZH1gO1xuICAgIHJldHVybiAoXG4gICAgICA8UmVzdWx0Um93XG4gICAgICAgIHJlc3VsdD17cmVzdWx0fVxuICAgICAgICBzdGF0cz17c3RhdHN9XG4gICAgICAgIGtleT17a2V5fVxuICAgICAgLz5cbiAgICApO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPmlkPC90aD5cbiAgICAgICAgICA8dGg+cGF0aCBuYW1lPC90aD5cbiAgICAgICAgICA8dGg+ZXBvY2g8L3RoPlxuICAgICAgICAgIDx0aD5pdGVyYXRpb248L3RoPlxuICAgICAgICAgIDx0aD5lbGFwc2VkX3RpbWU8L3RoPlxuICAgICAgICAgIHthcmdIZWFkZXJFbGVtc31cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIHtyZXN1bHRSb3dFbGVtc31cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgKTtcbn07XG5cbkV4cGVyaW1lbnRzVGFibGUucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXG4gICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGlkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgcGF0aE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBhcmdzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICAgIGxvZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpXG4gICAgfSlcbiAgKSxcbiAgc3RhdHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXJnS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfSlcbn07XG5FeHBlcmltZW50c1RhYmxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgcmVzdWx0czoge30sXG4gIHN0YXRzOiB7XG4gICAgYXJnS2V5czogW11cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZXJpbWVudHNUYWJsZTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRXhwZXJpbWVudHNUYWJsZS5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuXG5jb25zdCBlbXB0eVN0ciA9ICctJztcblxuY29uc3QgUmVzdWx0Um93ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0cyB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYXJncywgbG9ncyB9ID0gcmVzdWx0O1xuXG4gIGNvbnN0IGxhc3RMb2cgPSBsb2dzW2xvZ3MubGVuZ3RoIC0gMV0gfHwge307XG4gIGNvbnN0IGxhc3RMb2dEaWN0ID0ge307XG4gIGxhc3RMb2cubG9nSXRlbXMuZm9yRWFjaCgobG9nSXRlbSkgPT4geyBsYXN0TG9nRGljdFtsb2dJdGVtLmtleV0gPSBsb2dJdGVtLnZhbHVlOyB9KTtcblxuICBjb25zdCBhcmdEaWN0ID0ge307XG4gIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgYXJnRGljdFthcmcua2V5XSA9IGFyZy52YWx1ZTtcbiAgfSk7XG4gIGNvbnN0IGFyZ0VsZW1zID0gc3RhdHMuYXJnS2V5cy5tYXAoKGFyZ0tleSkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAoYXJnS2V5IGluIGFyZ0RpY3QpID8gYXJnRGljdFthcmdLZXldIDogZW1wdHlTdHI7XG4gICAgcmV0dXJuICg8dGQga2V5PXtgYXJncy0ke2FyZ0tleX1gfT57Y29udGVudH08L3RkPik7XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPHRyPlxuICAgICAgPHRkPntyZXN1bHQuaWR9PC90ZD5cbiAgICAgIDx0ZD57cmVzdWx0LnBhdGhOYW1lfTwvdGQ+XG4gICAgICA8dGQ+e2xhc3RMb2dEaWN0LmVwb2NofTwvdGQ+XG4gICAgICA8dGQ+e2xhc3RMb2dEaWN0Lml0ZXJhdGlvbn08L3RkPlxuICAgICAgPHRkPntsYXN0TG9nRGljdC5lbGFwc2VkX3RpbWV9PC90ZD5cbiAgICAgIHthcmdFbGVtc31cbiAgICA8L3RyPlxuICApO1xufTtcblxuUmVzdWx0Um93LnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhdGhOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGxvZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHN0YXRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFyZ0tleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH0pXG59O1xuXG5SZXN1bHRSb3cuZGVmYXVsdFByb3BzID0ge1xuICBzdGF0czoge1xuICAgIGFyZ0tleXM6IFtdXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3VsdFJvdztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvUmVzdWx0Um93LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtcbiAgTGluZUNoYXJ0LFxuICBMaW5lLFxuICBYQXhpcyxcbiAgWUF4aXMsXG4gIENhcnRlc2lhbkdyaWQsXG4gIFRvb2x0aXAsXG4gIExlZ2VuZFxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJ3JjLXNsaWRlcic7XG5pbXBvcnQgJ3JjLXNsaWRlci9hc3NldHMvaW5kZXguY3NzJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgQXhpc0NvbmZpZ3VyYXRvciBmcm9tICcuL0F4aXNDb25maWd1cmF0b3InO1xuaW1wb3J0IExpbmVzQ29uZmlndXJhdG9yIGZyb20gJy4vTGluZXNDb25maWd1cmF0b3InO1xuXG5cbmNvbnN0IHNsaWRlclN0ZXBzID0gMTAwLjA7XG5jb25zdCBkZWZhdWx0U3RhdHMgPSB7XG4gIGF4ZXM6IHtcbiAgICB4QXhpczoge30sXG4gICAgeUxlZnRBeGlzOiB7fSxcbiAgICB5UmlnaHRBeGlzOiB7fVxuICB9XG59O1xuXG5jb25zdCBkZWZhdWx0UmFuZ2UgPSBbMCwgMTAwXTtcbmNvbnN0IGRlZmF1bHRYQXhpc0NvbmZpZyA9IHtcbiAgYXhpc05hbWU6ICd4QXhpcycsXG4gIHhBeGlzS2V5OiAnZXBvY2gnLFxuICBzY2FsZTogJ2xpbmVhcicsXG4gIHJhbmdlOiBkZWZhdWx0UmFuZ2Vcbn07XG5jb25zdCBkZWZhdWx0WUF4aXNDb25maWcgPSB7XG4gIGF4aXNOYW1lOiAnJyxcbiAgc2NhbGU6ICdsaW5lYXInLFxuICByYW5nZTogZGVmYXVsdFJhbmdlLFxuICBsaW5lczogW11cbn07XG5jb25zdCBkZWZhdWx0Q29uZmlnID0ge1xuICBheGVzOiB7XG4gICAgeEF4aXM6IGRlZmF1bHRYQXhpc0NvbmZpZyxcbiAgICB5TGVmdEF4aXM6IHsgLi4uZGVmYXVsdFlBeGlzQ29uZmlnLCBheGlzTmFtZTogJ3lMZWZ0QXhpcycgfSxcbiAgICB5UmlnaHRBeGlzOiB7IC4uLmRlZmF1bHRZQXhpc0NvbmZpZywgYXhpc05hbWU6ICd5UmlnaHRBeGlzJyB9XG4gIH1cbn07XG5cbmNvbnN0IGJ1aWxkTGluZUVsZW0gPSAobGluZSwgYXhpc05hbWUpID0+IHtcbiAgY29uc3QgeyBjb25maWcgPSB7fSB9ID0gbGluZTtcbiAgY29uc3QgeyBsaW5lMmtleSwgbGluZTJkYXRhS2V5IH0gPSBVdGlscztcblxuICByZXR1cm4gKFxuICAgIDxMaW5lXG4gICAgICB0eXBlPVwibGluZWFyXCJcbiAgICAgIG5hbWU9e2xpbmUya2V5KGxpbmUpfVxuICAgICAgZGF0YUtleT17bGluZTJkYXRhS2V5KGxpbmUsIGF4aXNOYW1lKX1cbiAgICAgIHlBeGlzSWQ9e2F4aXNOYW1lfVxuICAgICAgc3Ryb2tlPXtjb25maWcuY29sb3J9XG4gICAgICBjb25uZWN0TnVsbHNcbiAgICAgIGlzQW5pbWF0aW9uQWN0aXZlPXtmYWxzZX1cbiAgICAgIGtleT17bGluZTJkYXRhS2V5KGxpbmUsIGF4aXNOYW1lKX1cbiAgICAvPlxuICApO1xufTtcblxuY29uc3QgYnVpbGRMaW5lRWxlbXMgPSAoYXhpc05hbWUsIGNvbmZpZykgPT4ge1xuICBjb25zdCBheGlzQ29uZmlnID0gY29uZmlnLmF4ZXNbYXhpc05hbWVdIHx8IHt9O1xuICBjb25zdCB7IGxpbmVzID0gW10gfSA9IGF4aXNDb25maWc7XG4gIHJldHVybiBsaW5lcy5tYXAoKGxpbmUpID0+IGJ1aWxkTGluZUVsZW0obGluZSwgYXhpc05hbWUpKTtcbn07XG5cbmNsYXNzIExvZ1Zpc3VhbGl6ZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUyZGF0YUtleSB9ID0gVXRpbHM7XG4gICAgY29uc3Qge1xuICAgICAgcmVzdWx0cyA9IHt9LFxuICAgICAgc3RhdHMgPSBkZWZhdWx0U3RhdHMsXG4gICAgICBjb25maWcgPSBkZWZhdWx0Q29uZmlnLFxuICAgICAgb25BeGlzQ29uZmlnTGluZUFkZCxcbiAgICAgIG9uQXhpc0NvbmZpZ0xpbmVSZW1vdmVcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7XG4gICAgICB4QXhpcyA9IHsgYXhpc05hbWU6ICd4QXhpcycgfSxcbiAgICAgIHlMZWZ0QXhpcyA9IHsgYXhpc05hbWU6ICd5TGVmdEF4aXMnIH0sXG4gICAgICB5UmlnaHRBeGlzID0geyBheGlzTmFtZTogJ3lSaWdodEF4aXMnIH1cbiAgICB9ID0gY29uZmlnLmF4ZXM7XG4gICAgY29uc3QgeyB4QXhpc0tleSA9ICdlcG9jaCcgfSA9IHhBeGlzO1xuICAgIGNvbnN0IGxlZnRMaW5lcyA9IHlMZWZ0QXhpcy5saW5lcyB8fCBbXTtcbiAgICBjb25zdCByaWdodExpbmVzID0geVJpZ2h0QXhpcy5saW5lcyB8fCBbXTtcbiAgICBjb25zdCBheGlzTGluZXMgPSB7XG4gICAgICB5TGVmdEF4aXM6IGxlZnRMaW5lcyxcbiAgICAgIHlSaWdodEF4aXM6IHJpZ2h0TGluZXNcbiAgICB9O1xuICAgIGNvbnN0IHhSYW5nZSA9IHhBeGlzLnJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5TGVmdFJhbmdlID0geUxlZnRBeGlzLnJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5UmlnaHRSYW5nZSA9IHlSaWdodEF4aXMucmFuZ2UgfHwgZGVmYXVsdFJhbmdlO1xuICAgIGNvbnN0IHhWYWx1ZVJhbmdlID0gc3RhdHMuYXhlcy54QXhpcy52YWx1ZVJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5TGVmdFZhbHVlUmFuZ2UgPSBzdGF0cy5heGVzLnlMZWZ0QXhpcy52YWx1ZVJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB5UmlnaHRWYWx1ZVJhbmdlID0gc3RhdHMuYXhlcy55UmlnaHRBeGlzLnZhbHVlUmFuZ2UgfHwgZGVmYXVsdFJhbmdlO1xuXG4gICAgY29uc3QgY2hhcnRXaWR0aCA9IDY0MDtcbiAgICBjb25zdCBjaGFydEhlaWdodCA9IDM2MDtcblxuICAgIGNvbnN0IGRhdGFEaWN0ID0ge307IC8vIGV4LiAxOiB7IGVwb2NoOiAxLCAxMl9tYWluX2xvc3M6IDAuMDExLCAuLi4gfVxuICAgIE9iamVjdC5rZXlzKGF4aXNMaW5lcykuZm9yRWFjaCgoYXhpc05hbWUpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVzID0gYXhpc0xpbmVzW2F4aXNOYW1lXTtcbiAgICAgIGxpbmVzLmZvckVhY2goKGxpbmUpID0+IHtcbiAgICAgICAgY29uc3QgeyByZXN1bHRJZCwgbG9nS2V5IH0gPSBsaW5lO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvZ3MgPSByZXN1bHQubG9ncyB8fCBbXTtcbiAgICAgICAgbG9ncy5mb3JFYWNoKChsb2cpID0+IHtcbiAgICAgICAgICBjb25zdCBsb2dEaWN0ID0ge307XG4gICAgICAgICAgbG9nLmxvZ0l0ZW1zLmZvckVhY2goKGxvZ0l0ZW0pID0+IHtcbiAgICAgICAgICAgIGxvZ0RpY3RbbG9nSXRlbS5rZXldID0gbG9nSXRlbS52YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobG9nRGljdFt4QXhpc0tleV0gPT0gbnVsbCB8fCBsb2dEaWN0W2xvZ0tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGF0YURpY3RbbG9nRGljdFt4QXhpc0tleV1dID09IG51bGwpIHtcbiAgICAgICAgICAgIGRhdGFEaWN0W2xvZ0RpY3RbeEF4aXNLZXldXSA9IHsgW3hBeGlzS2V5XTogbG9nRGljdFt4QXhpc0tleV0gfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YURpY3RbbG9nRGljdFt4QXhpc0tleV1dW2xpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSldID0gbG9nRGljdFtsb2dLZXldO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBPYmplY3Qua2V5cyhkYXRhRGljdCkubWFwKChrZXkpID0+IChkYXRhRGljdFtrZXldKSk7XG5cbiAgICBjb25zdCBsaW5lRWxlbXMgPSBbLi4uYnVpbGRMaW5lRWxlbXMoJ3lMZWZ0QXhpcycsIGNvbmZpZyksIC4uLmJ1aWxkTGluZUVsZW1zKCd5UmlnaHRBeGlzJywgY29uZmlnKV07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsb2ctdmlzdWFsaXplci1yb290IHJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS04XCI+XG4gICAgICAgICAgPHRhYmxlPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogYCR7Y2hhcnRIZWlnaHR9cHhgIH19XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgIG1pbj17eUxlZnRWYWx1ZVJhbmdlWzBdfVxuICAgICAgICAgICAgICAgICAgICBtYXg9e3lMZWZ0VmFsdWVSYW5nZVsxXX1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17KHlMZWZ0UmFuZ2VbMV0gLSB5TGVmdFJhbmdlWzBdKSAvIHNsaWRlclN0ZXBzfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17eUxlZnRSYW5nZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICA8TGluZUNoYXJ0XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPXtjaGFydFdpZHRofVxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ9e2NoYXJ0SGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgICAgICAgICBtYXJnaW49e3sgdG9wOiA1LCByaWdodDogMzAsIGxlZnQ6IDIwLCBib3R0b206IDUgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFhBeGlzXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgZGF0YUtleT17eEF4aXNLZXl9XG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU9e3hBeGlzLnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICAgIGFsbG93RGF0YU92ZXJmbG93XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxZQXhpc1xuICAgICAgICAgICAgICAgICAgICAgIHlBeGlzSWQ9XCJ5TGVmdEF4aXNcIlxuICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU9e3lMZWZ0QXhpcy5zY2FsZX1cbiAgICAgICAgICAgICAgICAgICAgICBkb21haW49e1snYXV0bycsICdhdXRvJ119XG4gICAgICAgICAgICAgICAgICAgICAgYWxsb3dEYXRhT3ZlcmZsb3dcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPFlBeGlzXG4gICAgICAgICAgICAgICAgICAgICAgeUF4aXNJZD1cInlSaWdodEF4aXNcIlxuICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uPVwicmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHNjYWxlPXt5UmlnaHRBeGlzLnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICAgIGRvbWFpbj17WydhdXRvJywgJ2F1dG8nXX1cbiAgICAgICAgICAgICAgICAgICAgICBhbGxvd0RhdGFPdmVyZmxvd1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8Q2FydGVzaWFuR3JpZCBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8VG9vbHRpcCAvPlxuICAgICAgICAgICAgICAgICAgICA8TGVnZW5kIC8+XG4gICAgICAgICAgICAgICAgICAgIHtsaW5lRWxlbXN9XG4gICAgICAgICAgICAgICAgICA8L0xpbmVDaGFydD5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAke2NoYXJ0SGVpZ2h0fXB4YCB9fVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICBtaW49e3lSaWdodFZhbHVlUmFuZ2VbMF19XG4gICAgICAgICAgICAgICAgICAgIG1heD17eVJpZ2h0VmFsdWVSYW5nZVsxXX1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17KHlSaWdodFJhbmdlWzFdIC0geVJpZ2h0UmFuZ2VbMF0pIC8gc2xpZGVyU3RlcHN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt5UmlnaHRSYW5nZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZCAvPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7Y2hhcnRXaWR0aH1weGAsIG1hcmdpbjogJ2F1dG8nIH19XG4gICAgICAgICAgICAgICAgICAgIG1pbj17eFZhbHVlUmFuZ2UubWlufVxuICAgICAgICAgICAgICAgICAgICBtYXg9e3hWYWx1ZVJhbmdlLm1heH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3hSYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlWFJhbmdlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCAvPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNFwiPlxuICAgICAgICAgIDxBeGlzQ29uZmlndXJhdG9yXG4gICAgICAgICAgICBheGlzQ29uZmlnPXt5TGVmdEF4aXN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExpbmVzQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgIHJlc3VsdHM9e3Jlc3VsdHN9XG4gICAgICAgICAgICAgIGF4aXNOYW1lPVwieUxlZnRBeGlzXCJcbiAgICAgICAgICAgICAgbGluZXM9e3lMZWZ0QXhpcy5saW5lc31cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZUFkZD17b25BeGlzQ29uZmlnTGluZUFkZH1cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZT17b25BeGlzQ29uZmlnTGluZVJlbW92ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9BeGlzQ29uZmlndXJhdG9yPlxuICAgICAgICAgIDxBeGlzQ29uZmlndXJhdG9yXG4gICAgICAgICAgICBheGlzQ29uZmlnPXt5UmlnaHRBeGlzfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgICAgICBheGlzTmFtZT1cInlSaWdodEF4aXNcIlxuICAgICAgICAgICAgICBsaW5lcz17eVJpZ2h0QXhpcy5saW5lc31cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZUFkZD17b25BeGlzQ29uZmlnTGluZUFkZH1cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZT17b25BeGlzQ29uZmlnTGluZVJlbW92ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9BeGlzQ29uZmlndXJhdG9yPlxuICAgICAgICAgIDxBeGlzQ29uZmlndXJhdG9yIGF4aXNDb25maWc9e3hBeGlzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTG9nVmlzdWFsaXplci5wcm9wVHlwZXMgPSB7XG4gIHJlc3VsdHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5zaGFwZSh7IHZhbHVlUmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpIH0pLFxuICAgICAgeUxlZnRBeGlzOiBQcm9wVHlwZXMuc2hhcGUoeyB2YWx1ZVJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSB9KSxcbiAgICAgIHlSaWdodEF4aXM6IFByb3BUeXBlcy5zaGFwZSh7IHZhbHVlUmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpIH0pXG4gICAgfSlcbiAgfSksXG4gIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5TGVmdEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5UmlnaHRBeGlzOiBQcm9wVHlwZXMuYW55XG4gICAgfSlcbiAgfSksXG4gIG9uQXhpc0NvbmZpZ0xpbmVBZGQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ0xpbmVSZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5Mb2dWaXN1YWxpemVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3RhdHM6IGRlZmF1bHRTdGF0cyxcbiAgY29uZmlnOiBkZWZhdWx0Q29uZmlnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dWaXN1YWxpemVyO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyLmpzeCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmMtc2xpZGVyL2Fzc2V0cy9pbmRleC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDkxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBBeGlzU2NhbGVTZWxlY3RvciBmcm9tICcuL0F4aXNTY2FsZVNlbGVjdG9yJztcblxuXG5jb25zdCBkZWZhdWx0QXhpc0NvbmZpZyA9IHtcbiAgYXhpc05hbWU6ICcnLFxuICBzY2FsZTogJ2F1dG8nLFxuICByYW5nZTogWzAsIDEwMF1cbn07XG5cbmNsYXNzIEF4aXNDb25maWd1cmF0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2NhbGUgPSB0aGlzLmhhbmRsZUNoYW5nZVNjYWxlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTY2FsZShzY2FsZSkge1xuICAgIGNvbnN0IHsgYXhpc05hbWUgfSA9IHRoaXMucHJvcHMuYXhpc0NvbmZpZztcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlU2NhbGUoYXhpc05hbWUsIHNjYWxlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGF4aXNOYW1lLCBzY2FsZSB9ID0gdGhpcy5wcm9wcy5heGlzQ29uZmlnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXhpcy1jb25maWd1cmF0b3IgY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+e2F4aXNOYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+XG4gICAgICAgICAgICAgIDxBeGlzU2NhbGVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHNjYWxlPXtzY2FsZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VTY2FsZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkF4aXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICBheGlzQ29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4aXNOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpXG4gIH0pLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIG9uQ2hhbmdlU2NhbGU6IFByb3BUeXBlcy5mdW5jXG59O1xuQXhpc0NvbmZpZ3VyYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGF4aXNDb25maWc6IGRlZmF1bHRBeGlzQ29uZmlnLFxuICBjaGlsZHJlbjogbnVsbCxcbiAgb25DaGFuZ2VTY2FsZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXNDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0F4aXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cblxuY29uc3Qgc2NhbGVPcHRpb25zID0gWydsaW5lYXInLCAnbG9nJ107XG5cbmNvbnN0IEF4aXNTY2FsZVNlbGVjdG9yID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgc2NhbGUsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgY29uc3QgaGFuZGxlQ2hhbmdlQXhpc0tleSA9IChlKSA9PiB7XG4gICAgb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2FsZU9wdGlvbnMubWFwKChzY2FsZUtleSkgPT4gKFxuICAgIDxvcHRpb24gdmFsdWU9e3NjYWxlS2V5fSBrZXk9e3NjYWxlS2V5fT57c2NhbGVLZXl9PC9vcHRpb24+XG4gICkpO1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgaWQ9XCJheGlzLXNjYWxlLXNlbGVjdG9yLXNlbGVjdFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtzY2FsZX0gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZUF4aXNLZXl9PlxuICAgICAge29wdGlvbnN9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5BeGlzU2NhbGVTZWxlY3Rvci5wcm9wVHlwZXMgPSB7XG4gIHNjYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbkF4aXNTY2FsZVNlbGVjdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2NhbGU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXNTY2FsZVNlbGVjdG9yO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BeGlzU2NhbGVTZWxlY3Rvci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEJ1dHRvbiwgTW9kYWwsIE1vZGFsSGVhZGVyLCBNb2RhbEJvZHksIE1vZGFsRm9vdGVyIH0gZnJvbSAncmVhY3RzdHJhcCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IExpbmVzQ29uZmlndXJhdG9yUm93IGZyb20gJy4vTGluZXNDb25maWd1cmF0b3JSb3cnO1xuaW1wb3J0IExpbmVDb25maWd1cmF0b3IgZnJvbSAnLi9MaW5lQ29uZmlndXJhdG9yJztcblxuXG5jb25zdCBkZWZhdWx0TGluZSA9IHtcbiAgY29uZmlnOiB7XG4gICAgY29sb3I6ICcjQUJDREVGJ1xuICB9XG59O1xuXG5jbGFzcyBMaW5lc0NvbmZpZ3VyYXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlID0gdGhpcy5oYW5kbGVNb2RhbFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQWRkaW5nTGluZUNoYW5nZSA9IHRoaXMuaGFuZGxlQWRkaW5nTGluZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGQgPSB0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lQWRkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVBeGlzQ29uZmlnTGluZVJlbW92ZSA9IHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVSZW1vdmUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgICAgYWRkaW5nTGluZTogZGVmYXVsdExpbmVcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlTW9kYWxUb2dnbGUoKSB7XG4gICAgY29uc3QgbmV3QWRkaW5nTGluZSA9IHRoaXMuc3RhdGUuc2hvd01vZGFsID8gZGVmYXVsdExpbmUgOiB0aGlzLnN0YXRlLmFkZGluZ0xpbmU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6ICF0aGlzLnN0YXRlLnNob3dNb2RhbCxcbiAgICAgIGFkZGluZ0xpbmU6IG5ld0FkZGluZ0xpbmVcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUFkZGluZ0xpbmVDaGFuZ2UobmV3TGluZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYWRkaW5nTGluZTogbmV3TGluZSxcbiAgICAgIHNob3dMaW5lQ29uZmlnRXJyb3I6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZUFkZCgpIHtcbiAgICBjb25zdCB7IGF4aXNOYW1lLCBvbkF4aXNDb25maWdMaW5lQWRkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgYWRkaW5nTGluZSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChhZGRpbmdMaW5lLnJlc3VsdElkID09IG51bGwgfHwgYWRkaW5nTGluZS5sb2dLZXkgPT0gbnVsbCkge1xuICAgICAgLy8gaW52YWxpZFxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNob3dMaW5lQ29uZmlnRXJyb3I6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkF4aXNDb25maWdMaW5lQWRkKGF4aXNOYW1lLCBhZGRpbmdMaW5lKTtcbiAgICAgIHRoaXMuaGFuZGxlTW9kYWxUb2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZVJlbW92ZShsaW5lS2V5KSB7XG4gICAgY29uc3QgeyBheGlzTmFtZSwgb25BeGlzQ29uZmlnTGluZVJlbW92ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlKGF4aXNOYW1lLCBsaW5lS2V5KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUya2V5IH0gPSBVdGlscztcbiAgICBjb25zdCB7IHJlc3VsdHMsIGxpbmVzID0gW10gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBhZGRpbmdMaW5lLCBzaG93TGluZUNvbmZpZ0Vycm9yIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgbGluZUNvbmZpZ3VyYXRvckVsZW1zID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2xpbmUucmVzdWx0SWRdIHx8IHt9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TGluZXNDb25maWd1cmF0b3JSb3dcbiAgICAgICAgICBsaW5lPXtsaW5lfVxuICAgICAgICAgIHJlc3VsdD17cmVzdWx0fVxuICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lUmVtb3ZlfVxuICAgICAgICAgIGtleT17bGluZTJrZXkobGluZSl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICAgICAge2xpbmVDb25maWd1cmF0b3JFbGVtc31cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgLz4gQWRkXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8TW9kYWwgaXNPcGVuPXt0aGlzLnN0YXRlLnNob3dNb2RhbH0gdG9nZ2xlPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfSBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgIDxNb2RhbEhlYWRlciB0b2dnbGU9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9Pk1vZGFsIHRpdGxlPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICAgIDxMaW5lQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICAgICAgICBsaW5lPXthZGRpbmdMaW5lfVxuICAgICAgICAgICAgICAgIHNob3dFcnJvcj17c2hvd0xpbmVDb25maWdFcnJvcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVBZGRpbmdMaW5lQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Nb2RhbEJvZHk+XG4gICAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfT5DYW5jZWw8L0J1dHRvbj57JyAnfVxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGR9PkFkZDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbEZvb3Rlcj5cbiAgICAgICAgICA8L01vZGFsPlxuXG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuTGluZXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgYXhpc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGluZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICByZXN1bHRJZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0pXG4gICksXG4gIG9uQXhpc0NvbmZpZ0xpbmVBZGQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ0xpbmVSZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbkxpbmVzQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGluZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5lc0NvbmZpZ3VyYXRvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvTGluZXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5cbmNsYXNzIExpbmVzQ29uZmlndXJhdG9yUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmhhbmRsZVJlbW92ZUNsaWNrID0gdGhpcy5oYW5kbGVSZW1vdmVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlUmVtb3ZlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBsaW5lMmtleSB9ID0gVXRpbHM7XG4gICAgY29uc3QgeyBsaW5lLCBvblJlbW92ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uUmVtb3ZlKGxpbmUya2V5KGxpbmUpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUya2V5LCB0cnVuY2F0ZUZvcndhcmQgfSA9IFV0aWxzO1xuICAgIGNvbnN0IHsgbGluZSwgcmVzdWx0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29uZmlnID0ge30gfSA9IGxpbmU7XG5cbiAgICBjb25zdCBjb2xvckJsb2NrU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTVweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbmZpZy5jb2xvclxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiIGtleT17bGluZTJrZXkobGluZSl9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTFcIiBzdHlsZT17Y29sb3JCbG9ja1N0eWxlfSAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTVcIj57dHJ1bmNhdGVGb3J3YXJkKHJlc3VsdC5wYXRoTmFtZSwgMjQpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj57bGluZS5sb2dLZXl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVJlbW92ZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cblxuICAgICk7XG4gIH1cbn1cblxuTGluZXNDb25maWd1cmF0b3JSb3cucHJvcFR5cGVzID0ge1xuICBsaW5lOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJlc3VsdElkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZ1xuICB9KS5pc1JlcXVpcmVkLFxuICByZXN1bHQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgcGF0aE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5MaW5lc0NvbmZpZ3VyYXRvclJvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUmVtb3ZlOiAoKSA9PiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGluZXNDb25maWd1cmF0b3JSb3c7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVzQ29uZmlndXJhdG9yUm93LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRm9ybSwgRm9ybUdyb3VwLCBMYWJlbCwgRm9ybVRleHQgfSBmcm9tICdyZWFjdHN0cmFwJztcblxuXG5jb25zdCBSRVNVTFRfTk9ORSA9IC0xO1xuY29uc3QgTE9HX0tFWV9OT05FID0gJyc7XG5cbmNvbnN0IGdldExvZ0tleXMgPSAocmVzdWx0ID0ge30pID0+IHtcbiAgY29uc3QgeyBsb2dzID0gW10gfSA9IHJlc3VsdDtcbiAgY29uc3QgbG9nS2V5U2V0ID0ge307XG4gIGxvZ3MuZm9yRWFjaCgobG9nKSA9PiB7XG4gICAgY29uc3QgeyBsb2dJdGVtcyA9IFtdIH0gPSBsb2c7XG4gICAgbG9nSXRlbXMuZm9yRWFjaCgobG9nSXRlbSkgPT4ge1xuICAgICAgbG9nS2V5U2V0W2xvZ0l0ZW0ua2V5XSA9IHRydWU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmtleXMobG9nS2V5U2V0KTtcbn07XG5cbmNvbnN0IGNyZWF0ZVJlc3VsdE9wdGlvbkVsZW1zID0gKHJlc3VsdHMgPSBbXSkgPT4gW1xuICA8b3B0aW9uIHZhbHVlPXtSRVNVTFRfTk9ORX0ga2V5PXtSRVNVTFRfTk9ORX0gZGlzYWJsZWQ+LS0gc2VsZWN0IHJlc3VsdCAtLTwvb3B0aW9uPixcbiAgLi4uT2JqZWN0LmtleXMocmVzdWx0cykubWFwKChyZXN1bHRJZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbcmVzdWx0SWRdO1xuICAgIHJldHVybiAoXG4gICAgICA8b3B0aW9uIHZhbHVlPXtyZXN1bHQuaWR9IGtleT17cmVzdWx0LmlkfT57cmVzdWx0LmlkfToge3Jlc3VsdC5wYXRoTmFtZX08L29wdGlvbj5cbiAgICApO1xuICB9KVxuXTtcblxuY29uc3QgY3JlYXRlTG9nS2V5T3B0aW9uRWxlbXMgPSAocmVzdWx0ID0ge30pID0+IHtcbiAgY29uc3QgbG9nS2V5cyA9IGdldExvZ0tleXMocmVzdWx0KTtcbiAgcmV0dXJuIFtcbiAgICA8b3B0aW9uIHZhbHVlPXtMT0dfS0VZX05PTkV9IGtleT17TE9HX0tFWV9OT05FfSBkaXNhYmxlZD4tLSBzZWxlY3QgbG9nIGtleSAtLTwvb3B0aW9uPixcbiAgICAuLi5sb2dLZXlzLm1hcCgobG9nS2V5KSA9PiAoXG4gICAgICA8b3B0aW9uIHZhbHVlPXtsb2dLZXl9IGtleT17bG9nS2V5fT57bG9nS2V5fTwvb3B0aW9uPlxuICAgICkpXG4gIF07XG59O1xuXG5jbGFzcyBMaW5lQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGFuZGxlUmVzdWx0Q2hhbmdlID0gdGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUxvZ0tleUNoYW5nZSA9IHRoaXMuaGFuZGxlTG9nS2V5Q2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2hvd0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVSZXN1bHRDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3UmVzdWx0SWQgPSBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApO1xuICAgIG9uQ2hhbmdlKHsgLi4ubGluZSwgcmVzdWx0SWQ6IG5ld1Jlc3VsdElkIH0pO1xuICB9XG5cbiAgaGFuZGxlTG9nS2V5Q2hhbmdlKGUpIHtcbiAgICBjb25zdCB7IGxpbmUsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0xvZ0tleSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIG9uQ2hhbmdlKHsgLi4ubGluZSwgbG9nS2V5OiBuZXdMb2dLZXkgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHRzLCBsaW5lID0ge30sIHNob3dFcnJvciA9IGZhbHNlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcmVzdWx0SWQgPSBSRVNVTFRfTk9ORSwgbG9nS2V5ID0gTE9HX0tFWV9OT05FLCBjb25maWcgPSB7fSB9ID0gbGluZTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXSB8fCB7fTtcbiAgICBjb25zdCBjb2xvciA9IGNvbmZpZy5jb2xvcjtcblxuICAgIGNvbnN0IGNvbG9yQmxvY2tTdHlsZSA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0T3B0aW9uRWxlbXMgPSBjcmVhdGVSZXN1bHRPcHRpb25FbGVtcyhyZXN1bHRzKTtcbiAgICBjb25zdCBsb2dLZXlPcHRpb25FbGVtcyA9IGNyZWF0ZUxvZ0tleU9wdGlvbkVsZW1zKHJlc3VsdCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5lLWNvbmZpZ3VyYXRvclwiPlxuICAgICAgICA8Rm9ybT5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsPmNvbG9yPC9MYWJlbD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbG9yQmxvY2tTdHlsZX0+e2NvbG9yfTwvZGl2PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3ItcmVzdWx0LXNlbGVjdFwiPnJlc3VsdDwvTGFiZWw+PGJyIC8+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VsZWN0XCJcbiAgICAgICAgICAgICAgaWQ9XCJsaW5lLWNvbmZpZ3VyYXRvci1yZXN1bHQtc2VsZWN0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3Jlc3VsdElkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2V9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtyZXN1bHRPcHRpb25FbGVtc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPEZvcm1UZXh0IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCIgaGlkZGVuPXshc2hvd0Vycm9yIHx8IHJlc3VsdElkICE9PSBSRVNVTFRfTk9ORX0+XG4gICAgICAgICAgICAgIFNlbGVjdCBhIHJlc3VsdCEhXG4gICAgICAgICAgICA8L0Zvcm1UZXh0PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3ItbG9nLWtleS1zZWxlY3RcIj5sb2cga2V5PC9MYWJlbD48YnIgLz5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdHlwZT1cInNlbGVjdFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBpZD1cImxpbmUtY29uZmlndXJhdG9yLWxvZy1rZXktc2VsZWN0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2xvZ0tleX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Jlc3VsdElkID09PSBSRVNVTFRfTk9ORX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlTG9nS2V5Q2hhbmdlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bG9nS2V5T3B0aW9uRWxlbXN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDxGb3JtVGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiIGhpZGRlbj17IXNob3dFcnJvciB8fCBsb2dLZXkgIT09IExPR19LRVlfTk9ORX0+XG4gICAgICAgICAgICAgIFNlbGVjdCBhIGxvZyBrZXkhIVxuICAgICAgICAgICAgPC9Gb3JtVGV4dD5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5lQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGxpbmU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcmVzdWx0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbG9nS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nXG4gICAgfSlcbiAgfSksXG4gIHNob3dFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuTGluZUNvbmZpZ3VyYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxpbmU6IHt9LFxuICBzaG93RXJyb3I6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVDb25maWd1cmF0b3IuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==