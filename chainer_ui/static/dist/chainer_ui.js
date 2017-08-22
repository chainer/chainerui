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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RESULTS_SUCCESS; });
/* unused harmony export RESULTS_FAILUE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return loadResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AXIS_CONFIG_LINE_ADD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AXIS_CONFIG_LINE_REMOVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AXIS_CONFIG_SCALE_UPDATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return addLineToAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return removeLineFromAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return updateAxisScale; });
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
var AXIS_CONFIG_SCALE_UPDATE = 'AXIS_CONFIG_SCALE_UPDATE';

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

var updateAxisScale = function updateAxisScale(axisName, scale) {
  return {
    type: AXIS_CONFIG_SCALE_UPDATE,
    axisName: axisName,
    scale: scale
  };
};

/***/ }),

/***/ 394:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(395);


/***/ }),

/***/ 395:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_configureStore__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__containers_ChainerUIContainer__ = __webpack_require__(533);







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

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_thunk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_thunk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_redux_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_redux_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__middleware_api__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__reducers__ = __webpack_require__(529);







var configureStore = function configureStore(preloadedState) {
  var middleware = [__WEBPACK_IMPORTED_MODULE_1_redux_thunk___default.a, __WEBPACK_IMPORTED_MODULE_4__middleware_api__["b" /* default */], Object(__WEBPACK_IMPORTED_MODULE_3_redux_logger__["createLogger"])()];

  var store = Object(__WEBPACK_IMPORTED_MODULE_0_redux__["createStore"])(__WEBPACK_IMPORTED_MODULE_5__reducers__["a" /* default */], preloadedState, __WEBPACK_IMPORTED_MODULE_0_redux__["applyMiddleware"].apply(undefined, middleware));

  Object(__WEBPACK_IMPORTED_MODULE_2_redux_persist__["persistStore"])(store);

  return store;
};

/* harmony default export */ __webpack_exports__["a"] = (configureStore);

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_redux_persist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_redux_persist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(114);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







var entities = function entities() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { results: {} };
  var action = arguments[1];

  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_3__actions__["d" /* RESULTS_SUCCESS */]:
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
      lineKey = action.lineKey,
      scale = action.scale;

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
    case __WEBPACK_IMPORTED_MODULE_3__actions__["c" /* AXIS_CONFIG_SCALE_UPDATE */]:
      return _extends({}, state, _defineProperty({}, axisName, _extends({}, axisConfig, {
        scale: scale
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
  config: Object(__WEBPACK_IMPORTED_MODULE_1_redux_persist__["persistReducer"])({ key: 'config', storage: __WEBPACK_IMPORTED_MODULE_2_redux_persist_es_storage___default.a }, config)
});

/* harmony default export */ __webpack_exports__["a"] = (rootReducer);

/***/ }),

/***/ 530:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createWebStorage = __webpack_require__(531);

var _createWebStorage2 = _interopRequireDefault(_createWebStorage);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = (0, _createWebStorage2.default)('local');

/***/ }),

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createWebStorage;

var _getStorage = __webpack_require__(532);

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

/***/ 532:
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

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_redux__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__actions__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ExperimentsTable__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_LogVisualizer__ = __webpack_require__(536);
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
          onAxisConfigLineRemove: this.props.removeLineFromAxis,
          onAxisConfigScaleUpdate: this.props.updateAxisScale
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
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
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
  loadResults: __WEBPACK_IMPORTED_MODULE_3__actions__["f" /* loadResults */],
  addLineToAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["e" /* addLineToAxis */],
  removeLineFromAxis: __WEBPACK_IMPORTED_MODULE_3__actions__["g" /* removeLineFromAxis */],
  updateAxisScale: __WEBPACK_IMPORTED_MODULE_3__actions__["h" /* updateAxisScale */]
})(ChainerUIContainer));

/***/ }),

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(535);




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

/***/ 535:
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

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider__ = __webpack_require__(369);
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
          onAxisConfigLineRemove = _props.onAxisConfigLineRemove,
          onAxisConfigScaleUpdate = _props.onAxisConfigScaleUpdate;
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
                      domain: ['auto', 'auto'],
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
              axisConfig: yLeftAxis,
              onChangeScale: onAxisConfigScaleUpdate
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
              axisConfig: yRightAxis,
              onChangeScale: onAxisConfigScaleUpdate
            },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              results: results,
              axisName: 'yRightAxis',
              lines: yRightAxis.lines,
              onAxisConfigLineAdd: onAxisConfigLineAdd,
              onAxisConfigLineRemove: onAxisConfigLineRemove
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */], {
            axisConfig: xAxis,
            onChangeScale: onAxisConfigScaleUpdate
          })
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
  onAxisConfigLineRemove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onAxisConfigScaleUpdate: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
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

},[394]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21pZGRsZXdhcmUvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2NvbmZpZ3VyZVN0b3JlLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9pbmRleC5qc3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVkdXgtcGVyc2lzdC9lcy9zdG9yYWdlL2NyZWF0ZVdlYlN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9nZXRTdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRXhwZXJpbWVudHNUYWJsZS5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUmVzdWx0Um93LmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyLmpzeCIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmMtc2xpZGVyL2Fzc2V0cy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhpc0NvbmZpZ3VyYXRvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQXhpc1NjYWxlU2VsZWN0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xpbmVzQ29uZmlndXJhdG9yLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9MaW5lc0NvbmZpZ3VyYXRvclJvdy5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGluZUNvbmZpZ3VyYXRvci5qc3giXSwibmFtZXMiOlsiVXRpbHMiLCJsaW5lIiwicmVzdWx0SWQiLCJsb2dLZXkiLCJheGlzTmFtZSIsImxpbmUya2V5Iiwic3RyaW5nIiwibGVuZ3RoIiwiYmVnaW5uaW5nIiwic3RyIiwic3Vic3RyaW5nIiwiQVBJX1JPT1QiLCJjYWxsQXBpIiwiZW5kcG9pbnQiLCJmdWxsVXJsIiwiaW5kZXhPZiIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm9rIiwiUHJvbWlzZSIsInJlamVjdCIsIkNBTExfQVBJIiwic3RvcmUiLCJuZXh0IiwiYWN0aW9uIiwiY2FsbEFQSSIsInR5cGVzIiwiZ2V0U3RhdGUiLCJBcnJheSIsImlzQXJyYXkiLCJFcnJvciIsImFjdGlvbldpdGgiLCJkYXRhIiwiZmluYWxBY3Rpb24iLCJyZXF1ZXN0VHlwZSIsInN1Y2Nlc3NUeXBlIiwiZmFpbHVyZVR5cGUiLCJ0eXBlIiwiZXJyb3IiLCJtZXNzYWdlIiwiUkVTVUxUU19SRVFVRVNUIiwiUkVTVUxUU19TVUNDRVNTIiwiUkVTVUxUU19GQUlMVUUiLCJmZXRjaFJlc3VsdHMiLCJsb2FkUmVzdWx0cyIsImRpc3BhdGNoIiwiQVhJU19DT05GSUdfTElORV9BREQiLCJBWElTX0NPTkZJR19MSU5FX1JFTU9WRSIsIkFYSVNfQ09ORklHX1NDQUxFX1VQREFURSIsImFkZExpbmVUb0F4aXMiLCJyZW1vdmVMaW5lRnJvbUF4aXMiLCJsaW5lS2V5IiwidXBkYXRlQXhpc1NjYWxlIiwic2NhbGUiLCJjb25maWd1cmVTdG9yZSIsInJlbmRlciIsIkNvbXBvbmVudCIsImFwcE5vZGUiLCJSZWFjdERPTSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsIkNoYWluZXJVSUNvbnRhaW5lciIsIm1vZHVsZSIsImhvdCIsImFjY2VwdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRFbGVtZW50QnlJZCIsInByZWxvYWRlZFN0YXRlIiwibWlkZGxld2FyZSIsImNyZWF0ZUxvZ2dlciIsImNyZWF0ZVN0b3JlIiwiYXBwbHlNaWRkbGV3YXJlIiwicGVyc2lzdFN0b3JlIiwiZW50aXRpZXMiLCJzdGF0ZSIsInJlc3VsdHMiLCJyZXN1bHRzTGlzdCIsImZvckVhY2giLCJyZXN1bHQiLCJpZCIsImF4ZXMiLCJheGlzQ29uZmlnIiwibGluZXMiLCJmaWx0ZXIiLCJsIiwiY29uZmlnIiwiY29tYmluZVJlZHVjZXJzIiwicm9vdFJlZHVjZXIiLCJwZXJzaXN0UmVkdWNlciIsImtleSIsInN0b3JhZ2UiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsIl9jcmVhdGVXZWJTdG9yYWdlIiwicmVxdWlyZSIsIl9jcmVhdGVXZWJTdG9yYWdlMiIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImNyZWF0ZVdlYlN0b3JhZ2UiLCJfZ2V0U3RvcmFnZSIsIl9nZXRTdG9yYWdlMiIsImdldEl0ZW0iLCJjYiIsInNldEl0ZW0iLCJpdGVtIiwiZXJyIiwicmVtb3ZlSXRlbSIsImdldEFsbEtleXMiLCJrZXlzIiwiX3R5cGVvZiIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiY29uc3RydWN0b3IiLCJwcm90b3R5cGUiLCJnZXRTdG9yYWdlIiwibm9vcCIsIm5vb3BTdG9yYWdlIiwiaGFzU3RvcmFnZSIsInN0b3JhZ2VUeXBlIiwid2luZG93IiwidGVzdEtleSIsImUiLCJjb25zb2xlIiwid2FybiIsInJlc3VsdHNMb2FkSW50ZXJ2YWwiLCJyZXN1bHRzTG9hZFRpbWVyIiwic2V0SW50ZXJ2YWwiLCJwcm9wcyIsImNsZWFySW50ZXJ2YWwiLCJzdGF0cyIsIlJlYWN0IiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwic2hhcGUiLCJhcmdLZXlzIiwiYXJyYXlPZiIsImZ1bmMiLCJtYXBFbnRpdGllc1RvU3RhdHMiLCJhcmdLZXlTZXQiLCJhcmdzIiwiYXJnIiwieEF4aXMiLCJ5TGVmdEF4aXMiLCJ5UmlnaHRBeGlzIiwiZGVmYXVsdENvbmZpZyIsIm1hcFN0YXRlVG9Qcm9wcyIsImNvbm5lY3QiLCJFeHBlcmltZW50c1RhYmxlIiwiYXJnSGVhZGVyRWxlbXMiLCJtYXAiLCJhcmdLZXkiLCJyZXN1bHRSb3dFbGVtcyIsIm51bWJlciIsInBhdGhOYW1lIiwibG9ncyIsImRlZmF1bHRQcm9wcyIsImVtcHR5U3RyIiwiUmVzdWx0Um93IiwibGFzdExvZyIsImxhc3RMb2dEaWN0IiwibG9nSXRlbXMiLCJsb2dJdGVtIiwiYXJnRGljdCIsImFyZ0VsZW1zIiwiY29udGVudCIsImVwb2NoIiwiaXRlcmF0aW9uIiwiZWxhcHNlZF90aW1lIiwic2xpZGVyU3RlcHMiLCJkZWZhdWx0U3RhdHMiLCJkZWZhdWx0UmFuZ2UiLCJkZWZhdWx0WEF4aXNDb25maWciLCJ4QXhpc0tleSIsInJhbmdlIiwiZGVmYXVsdFlBeGlzQ29uZmlnIiwiYnVpbGRMaW5lRWxlbSIsImxpbmUyZGF0YUtleSIsImNvbG9yIiwiYnVpbGRMaW5lRWxlbXMiLCJMb2dWaXN1YWxpemVyIiwib25BeGlzQ29uZmlnTGluZUFkZCIsIm9uQXhpc0NvbmZpZ0xpbmVSZW1vdmUiLCJvbkF4aXNDb25maWdTY2FsZVVwZGF0ZSIsImxlZnRMaW5lcyIsInJpZ2h0TGluZXMiLCJheGlzTGluZXMiLCJ4UmFuZ2UiLCJ5TGVmdFJhbmdlIiwieVJpZ2h0UmFuZ2UiLCJ4VmFsdWVSYW5nZSIsInZhbHVlUmFuZ2UiLCJ5TGVmdFZhbHVlUmFuZ2UiLCJ5UmlnaHRWYWx1ZVJhbmdlIiwiY2hhcnRXaWR0aCIsImNoYXJ0SGVpZ2h0IiwiZGF0YURpY3QiLCJsb2ciLCJsb2dEaWN0IiwibGluZUVsZW1zIiwiaGVpZ2h0IiwidG9wIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwid2lkdGgiLCJtYXJnaW4iLCJtaW4iLCJtYXgiLCJoYW5kbGVDaGFuZ2VYUmFuZ2UiLCJkZWZhdWx0QXhpc0NvbmZpZyIsIkF4aXNDb25maWd1cmF0b3IiLCJoYW5kbGVDaGFuZ2VTY2FsZSIsImJpbmQiLCJvbkNoYW5nZVNjYWxlIiwiY2hpbGRyZW4iLCJlbGVtZW50Iiwic2NhbGVPcHRpb25zIiwiQXhpc1NjYWxlU2VsZWN0b3IiLCJvbkNoYW5nZSIsImhhbmRsZUNoYW5nZUF4aXNLZXkiLCJ0YXJnZXQiLCJvcHRpb25zIiwic2NhbGVLZXkiLCJkZWZhdWx0TGluZSIsIkxpbmVzQ29uZmlndXJhdG9yIiwiaGFuZGxlTW9kYWxUb2dnbGUiLCJoYW5kbGVBZGRpbmdMaW5lQ2hhbmdlIiwiaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGQiLCJoYW5kbGVBeGlzQ29uZmlnTGluZVJlbW92ZSIsInNob3dNb2RhbCIsImFkZGluZ0xpbmUiLCJuZXdBZGRpbmdMaW5lIiwic2V0U3RhdGUiLCJuZXdMaW5lIiwic2hvd0xpbmVDb25maWdFcnJvciIsImxpbmVDb25maWd1cmF0b3JFbGVtcyIsIkxpbmVzQ29uZmlndXJhdG9yUm93IiwiaGFuZGxlUmVtb3ZlQ2xpY2siLCJvblJlbW92ZSIsInRydW5jYXRlRm9yd2FyZCIsImNvbG9yQmxvY2tTdHlsZSIsImJhY2tncm91bmRDb2xvciIsIlJFU1VMVF9OT05FIiwiTE9HX0tFWV9OT05FIiwiZ2V0TG9nS2V5cyIsImxvZ0tleVNldCIsImNyZWF0ZVJlc3VsdE9wdGlvbkVsZW1zIiwiY3JlYXRlTG9nS2V5T3B0aW9uRWxlbXMiLCJsb2dLZXlzIiwiTGluZUNvbmZpZ3VyYXRvciIsImhhbmRsZVJlc3VsdENoYW5nZSIsImhhbmRsZUxvZ0tleUNoYW5nZSIsInNob3dFcnJvciIsIm5ld1Jlc3VsdElkIiwicGFyc2VJbnQiLCJuZXdMb2dLZXkiLCJyZXN1bHRPcHRpb25FbGVtcyIsImxvZ0tleU9wdGlvbkVsZW1zIiwiYm9vbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxLOzs7Ozs7OzZCQUNZQyxJLEVBQU07QUFDcEIsYUFBVUEsS0FBS0MsUUFBZixTQUEyQkQsS0FBS0UsTUFBaEM7QUFDRDs7O2lDQUVtQkYsSSxFQUFNRyxRLEVBQVU7QUFDbEMsYUFBVUEsUUFBVixTQUFzQkosTUFBTUssUUFBTixDQUFlSixJQUFmLENBQXRCO0FBQ0Q7OztvQ0FFc0JLLE0sRUFBUUMsTSxFQUEyQjtBQUFBLFVBQW5CQyxTQUFtQix1RUFBUCxLQUFPOztBQUN4RCxVQUFNQyxNQUFNSCxVQUFVLEVBQXRCO0FBQ0EsVUFBSUcsSUFBSUYsTUFBSixHQUFhQSxNQUFqQixFQUF5QjtBQUN2QixlQUFPQyxZQUFZQyxJQUFJQyxTQUFKLENBQWVELElBQUlGLE1BQUosR0FBYUEsTUFBZCxHQUF3QkMsVUFBVUQsTUFBaEQsRUFBd0RFLElBQUlGLE1BQTVELENBQW5CO0FBQ0Q7QUFDRCxhQUFPRSxHQUFQO0FBQ0Q7Ozs7OztBQUdILHlEQUFlVCxLQUFmLEU7Ozs7Ozs7Ozs7Ozs7QUNsQkEsSUFBTVcsV0FBVyxVQUFqQjs7QUFFQSxJQUFNQyxVQUFVLFNBQVZBLE9BQVUsQ0FBQ0MsUUFBRCxFQUFjO0FBQzVCLE1BQU1DLFVBQVdELFNBQVNFLE9BQVQsQ0FBaUJKLFFBQWpCLE1BQStCLENBQUMsQ0FBakMsR0FBc0NBLFdBQVdFLFFBQWpELEdBQTREQSxRQUE1RTs7QUFFQSxTQUFPRyxNQUFNRixPQUFOLEVBQ0pHLElBREksQ0FDQyxVQUFDQyxRQUFEO0FBQUEsV0FDSkEsU0FBU0MsSUFBVCxHQUFnQkYsSUFBaEIsQ0FBcUIsVUFBQ0UsSUFBRCxFQUFVO0FBQzdCLFVBQUksQ0FBQ0QsU0FBU0UsRUFBZCxFQUFrQjtBQUNoQixlQUFPQyxRQUFRQyxNQUFSLENBQWVILElBQWYsQ0FBUDtBQUNEO0FBQ0QsYUFBT0EsSUFBUDtBQUNELEtBTEQsQ0FESTtBQUFBLEdBREQsQ0FBUDtBQVNELENBWkQ7O0FBY08sSUFBTUksV0FBVyxVQUFqQjs7QUFFUCx5REFBZSxVQUFDQyxLQUFEO0FBQUEsU0FBVyxVQUFDQyxJQUFEO0FBQUEsV0FBVSxVQUFDQyxNQUFELEVBQVk7QUFDOUMsVUFBTUMsVUFBVUQsT0FBT0gsUUFBUCxDQUFoQjtBQUNBLFVBQUksT0FBT0ksT0FBUCxLQUFtQixXQUF2QixFQUFvQztBQUNsQyxlQUFPRixLQUFLQyxNQUFMLENBQVA7QUFDRDs7QUFKNkMsVUFNeENiLFFBTndDLEdBTTNCYyxPQU4yQixDQU14Q2QsUUFOd0M7QUFBQSxVQU90Q2UsS0FQc0MsR0FPNUJELE9BUDRCLENBT3RDQyxLQVBzQzs7O0FBUzlDLFVBQUksT0FBT2YsUUFBUCxLQUFvQixVQUF4QixFQUFvQztBQUNsQ0EsbUJBQVdBLFNBQVNXLE1BQU1LLFFBQU4sRUFBVCxDQUFYO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDQyxNQUFNQyxPQUFOLENBQWNILEtBQWQsQ0FBRCxJQUF5QkEsTUFBTXJCLE1BQU4sS0FBaUIsQ0FBOUMsRUFBaUQ7QUFDL0MsY0FBTSxJQUFJeUIsS0FBSixDQUFVLDBDQUFWLENBQU47QUFDRDs7QUFFRCxVQUFNQyxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsSUFBRCxFQUFVO0FBQzNCLFlBQU1DLDJCQUFtQlQsTUFBbkIsRUFBOEJRLElBQTlCLENBQU47QUFDQSxlQUFPQyxZQUFZWixRQUFaLENBQVA7QUFDQSxlQUFPWSxXQUFQO0FBQ0QsT0FKRDs7QUFqQjhDLGtDQXVCRVAsS0F2QkY7QUFBQSxVQXVCdkNRLFdBdkJ1QztBQUFBLFVBdUIxQkMsV0F2QjBCO0FBQUEsVUF1QmJDLFdBdkJhOztBQXdCOUNiLFdBQUtRLFdBQVcsRUFBRU0sTUFBTUgsV0FBUixFQUFYLENBQUw7O0FBRUEsYUFBT3hCLFFBQVFDLFFBQVIsRUFBa0JJLElBQWxCLENBQ0wsVUFBQ0MsUUFBRDtBQUFBLGVBQWNPLEtBQUtRLFdBQVc7QUFDNUJmLDRCQUQ0QjtBQUU1QnFCLGdCQUFNRjtBQUZzQixTQUFYLENBQUwsQ0FBZDtBQUFBLE9BREssRUFLTCxVQUFDRyxLQUFEO0FBQUEsZUFBV2YsS0FBS1EsV0FBVztBQUN6Qk0sZ0JBQU1ELFdBRG1CO0FBRXpCRSxpQkFBT0EsTUFBTUMsT0FBTixJQUFpQjtBQUZDLFNBQVgsQ0FBTCxDQUFYO0FBQUEsT0FMSyxDQUFQO0FBVUQsS0FwQ3lCO0FBQUEsR0FBWDtBQUFBLENBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJBOztBQUdBOztBQUVPLElBQU1DLGtCQUFrQixpQkFBeEI7QUFDQSxJQUFNQyxrQkFBa0IsaUJBQXhCO0FBQ0EsSUFBTUMsaUJBQWlCLGdCQUF2Qjs7QUFFUCxJQUFNQyxlQUFlLFNBQWZBLFlBQWU7QUFBQSw2QkFDbEIsaUVBRGtCLEVBQ1A7QUFDVmpCLFdBQU8sQ0FBQ2MsZUFBRCxFQUFrQkMsZUFBbEIsRUFBbUNDLGNBQW5DLENBREc7QUFFVi9CLGNBQVU7QUFGQSxHQURPO0FBQUEsQ0FBckI7O0FBT08sSUFBTWlDLGNBQWMsU0FBZEEsV0FBYztBQUFBLFNBQU0sVUFBQ0MsUUFBRDtBQUFBLFdBQWNBLFNBQVNGLGNBQVQsQ0FBZDtBQUFBLEdBQU47QUFBQSxDQUFwQjs7QUFHUDs7QUFFTyxJQUFNRyx1QkFBdUIsc0JBQTdCO0FBQ0EsSUFBTUMsMEJBQTBCLHlCQUFoQztBQUNBLElBQU1DLDJCQUEyQiwwQkFBakM7O0FBRUEsSUFBTUMsZ0JBQWdCLFNBQWhCQSxhQUFnQixDQUFDL0MsUUFBRCxFQUFXSCxJQUFYO0FBQUEsU0FBcUI7QUFDaERzQyxVQUFNUyxvQkFEMEM7QUFFaEQ1QyxzQkFGZ0Q7QUFHaERIO0FBSGdELEdBQXJCO0FBQUEsQ0FBdEI7O0FBTUEsSUFBTW1ELHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQUNoRCxRQUFELEVBQVdpRCxPQUFYO0FBQUEsU0FBd0I7QUFDeERkLFVBQU1VLHVCQURrRDtBQUV4RDdDLHNCQUZ3RDtBQUd4RGlEO0FBSHdELEdBQXhCO0FBQUEsQ0FBM0I7O0FBTUEsSUFBTUMsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFDbEQsUUFBRCxFQUFXbUQsS0FBWDtBQUFBLFNBQXNCO0FBQ25EaEIsVUFBTVcsd0JBRDZDO0FBRW5EOUMsc0JBRm1EO0FBR25EbUQ7QUFIbUQsR0FBdEI7QUFBQSxDQUF4QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsSUFBTS9CLFFBQVEsOEVBQUFnQyxFQUFkOztBQUVBLElBQU1DLFNBQVMsU0FBVEEsTUFBUyxDQUFDQyxTQUFELEVBQVlDLE9BQVosRUFBd0I7QUFDckNDLEVBQUEsaURBQUFBLENBQVNILE1BQVQsQ0FDRTtBQUFDLHlEQUFEO0FBQUEsTUFBVSxPQUFPakMsS0FBakI7QUFDRTtBQUFDLG9FQUFEO0FBQUE7QUFDRSxrRUFBQyxTQUFEO0FBREY7QUFERixHQURGLEVBTUVtQyxPQU5GO0FBUUQsQ0FURDs7QUFXQSxJQUFJLEtBQUosRUFBZ0I7QUFDZCxNQUFNQSxVQUFVRSxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FELFdBQVNFLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkwsT0FBMUI7QUFDQUYsU0FBT1Esa0JBQVAsRUFBMkJOLE9BQTNCO0FBQ0FPLFNBQU9DLEdBQVAsQ0FBV0MsTUFBWCxDQUFrQixpQ0FBbEIsRUFBcUQsWUFBTTtBQUFFWCxXQUFPUSxrQkFBUCxFQUEyQk4sT0FBM0I7QUFBc0MsR0FBbkc7QUFDRCxDQUxELE1BS087QUFDTEUsV0FBU1EsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsUUFBTVYsVUFBVUUsU0FBU1MsY0FBVCxDQUF3QixpQkFBeEIsQ0FBaEI7QUFDQSxRQUFJWCxPQUFKLEVBQWE7QUFDWEYsYUFBTywrRUFBUCxFQUEyQkUsT0FBM0I7QUFDRDtBQUNGLEdBTEQ7QUFNRCxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUgsaUJBQWlCLFNBQWpCQSxjQUFpQixDQUFDZSxjQUFELEVBQW9CO0FBQ3pDLE1BQU1DLGFBQWEsQ0FBQyxtREFBRCxFQUFRLGdFQUFSLEVBQWEsa0VBQUFDLEVBQWIsQ0FBbkI7O0FBRUEsTUFBTWpELFFBQVEsMERBQUFrRCxDQUNaLDBEQURZLEVBRVpILGNBRlksRUFHWixzREFBQUksa0JBQW1CSCxVQUFuQixDQUhZLENBQWQ7O0FBTUFJLEVBQUEsbUVBQUFBLENBQWFwRCxLQUFiOztBQUVBLFNBQU9BLEtBQVA7QUFDRCxDQVpEOztBQWNBLHlEQUFlZ0MsY0FBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQSxJQUFNcUIsV0FBVyxTQUFYQSxRQUFXLEdBQXFDO0FBQUEsTUFBcENDLEtBQW9DLHVFQUE1QixFQUFFQyxTQUFTLEVBQVgsRUFBNEI7QUFBQSxNQUFYckQsTUFBVzs7QUFDcEQsVUFBUUEsT0FBT2EsSUFBZjtBQUNFLFNBQUssaUVBQUw7QUFDRSxVQUFJYixPQUFPUixRQUFQLElBQW1CUSxPQUFPUixRQUFQLENBQWdCNkQsT0FBdkMsRUFBZ0Q7QUFDOUMsWUFBTUMsY0FBY3RELE9BQU9SLFFBQVAsQ0FBZ0I2RCxPQUFwQztBQUNBLFlBQU1BLFVBQVUsRUFBaEI7QUFDQUMsb0JBQVlDLE9BQVosQ0FBb0IsVUFBQ0MsTUFBRCxFQUFZO0FBQzlCSCxrQkFBUUcsT0FBT0MsRUFBZixJQUFxQkQsTUFBckI7QUFDRCxTQUZEO0FBR0EsNEJBQVlKLEtBQVosSUFBbUJDLGdCQUFuQjtBQUNEO0FBQ0Q7QUFDRjtBQUNFO0FBWko7QUFjQSxTQUFPRCxLQUFQO0FBQ0QsQ0FoQkQ7O0FBa0JBLElBQU1NLE9BQU8sU0FBUEEsSUFBTyxHQUF3QjtBQUFBLE1BQXZCTixLQUF1Qix1RUFBZixFQUFlO0FBQUEsTUFBWHBELE1BQVc7QUFBQSxNQUMzQnJCLFFBRDJCLEdBQ2QsdURBRGMsQ0FDM0JBLFFBRDJCO0FBQUEsTUFFM0JELFFBRjJCLEdBRVFzQixNQUZSLENBRTNCdEIsUUFGMkI7QUFBQSxNQUVqQkgsSUFGaUIsR0FFUXlCLE1BRlIsQ0FFakJ6QixJQUZpQjtBQUFBLE1BRVhvRCxPQUZXLEdBRVEzQixNQUZSLENBRVgyQixPQUZXO0FBQUEsTUFFRkUsS0FGRSxHQUVRN0IsTUFGUixDQUVGNkIsS0FGRTs7QUFHbkMsTUFBSW5ELFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsV0FBTzBFLEtBQVA7QUFDRDtBQUNELE1BQU1PLGFBQWFQLE1BQU0xRSxRQUFOLEtBQW1CLEVBQUVBLGtCQUFGLEVBQXRDO0FBTm1DLDBCQU9aaUYsVUFQWSxDQU8zQkMsS0FQMkI7QUFBQSxNQU8zQkEsS0FQMkIscUNBT25CLEVBUG1COzs7QUFTbkMsVUFBUTVELE9BQU9hLElBQWY7QUFDRSxTQUFLLHNFQUFMO0FBQ0UsVUFBSXRDLFFBQVEsSUFBWixFQUFrQjtBQUNoQixlQUFPNkUsS0FBUDtBQUNEO0FBQ0QsMEJBQ0tBLEtBREwsc0JBRUcxRSxRQUZILGVBR09pRixVQUhQO0FBSUlDLDRDQUFXQSxLQUFYLElBQWtCckYsSUFBbEI7QUFKSjtBQU9GLFNBQUsseUVBQUw7QUFDRSxVQUFJb0QsV0FBVyxJQUFmLEVBQXFCO0FBQ25CLGVBQU95QixLQUFQO0FBQ0Q7QUFDRCwwQkFDS0EsS0FETCxzQkFFRzFFLFFBRkgsZUFHT2lGLFVBSFA7QUFJSUMsNENBQVdBLE1BQU1DLE1BQU4sQ0FBYSxVQUFDQyxDQUFEO0FBQUEsaUJBQU9uRixTQUFTbUYsQ0FBVCxNQUFnQm5DLE9BQXZCO0FBQUEsU0FBYixDQUFYO0FBSko7QUFPRixTQUFLLDBFQUFMO0FBQ0UsMEJBQ0t5QixLQURMLHNCQUVHMUUsUUFGSCxlQUdPaUYsVUFIUDtBQUlJOUI7QUFKSjtBQU9GO0FBQ0UsYUFBT3VCLEtBQVA7QUFoQ0o7QUFrQ0QsQ0EzQ0Q7O0FBNkNBLElBQU1XLFNBQVMsOERBQUFDLENBQWdCO0FBQzdCTjtBQUQ2QixDQUFoQixDQUFmOztBQUlBLElBQU1PLGNBQWMsOERBQUFELENBQWdCO0FBQ2xDYixvQkFEa0M7QUFFbENZLFVBQVEscUVBQUFHLENBQWUsRUFBRUMsS0FBSyxRQUFQLEVBQWlCQyxTQUFBLGdFQUFqQixFQUFmLEVBQTJDTCxNQUEzQztBQUYwQixDQUFoQixDQUFwQjs7QUFLQSx5REFBZUUsV0FBZixFOzs7Ozs7OztBQy9FQTs7QUFFQUksT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSUMsb0JBQW9CLG1CQUFBQyxDQUFRLEdBQVIsQ0FBeEI7O0FBRUEsSUFBSUMscUJBQXFCQyx1QkFBdUJILGlCQUF2QixDQUF6Qjs7QUFFQSxTQUFTRyxzQkFBVCxDQUFnQ0MsR0FBaEMsRUFBcUM7QUFBRSxTQUFPQSxPQUFPQSxJQUFJQyxVQUFYLEdBQXdCRCxHQUF4QixHQUE4QixFQUFFRSxTQUFTRixHQUFYLEVBQXJDO0FBQXdEOztBQUUvRk4sUUFBUVEsT0FBUixHQUFrQixDQUFDLEdBQUdKLG1CQUFtQkksT0FBdkIsRUFBZ0MsT0FBaEMsQ0FBbEIsQzs7Ozs7Ozs7QUNaQTs7QUFFQVYsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7QUFHQUQsUUFBUVEsT0FBUixHQUFrQkMsZ0JBQWxCOztBQUVBLElBQUlDLGNBQWMsbUJBQUFQLENBQVEsR0FBUixDQUFsQjs7QUFFQSxJQUFJUSxlQUFlTix1QkFBdUJLLFdBQXZCLENBQW5COztBQUVBLFNBQVNMLHNCQUFULENBQWdDQyxHQUFoQyxFQUFxQztBQUFFLFNBQU9BLE9BQU9BLElBQUlDLFVBQVgsR0FBd0JELEdBQXhCLEdBQThCLEVBQUVFLFNBQVNGLEdBQVgsRUFBckM7QUFBd0Q7O0FBRS9GLFNBQVNHLGdCQUFULENBQTBCbkUsSUFBMUIsRUFBZ0M7QUFDOUIsTUFBSXVELFVBQVUsQ0FBQyxHQUFHYyxhQUFhSCxPQUFqQixFQUEwQmxFLElBQTFCLENBQWQ7QUFDQSxTQUFPO0FBQ0xzRSxhQUFTLFNBQVNBLE9BQVQsQ0FBaUJoQixHQUFqQixFQUFzQmlCLEVBQXRCLEVBQTBCO0FBQ2pDLGFBQU9BLEdBQUcsSUFBSCxFQUFTaEIsUUFBUWUsT0FBUixDQUFnQmhCLEdBQWhCLENBQVQsQ0FBUDtBQUNELEtBSEk7QUFJTGtCLGFBQVMsU0FBU0EsT0FBVCxDQUFpQmxCLEdBQWpCLEVBQXNCbUIsSUFBdEIsRUFBNEJGLEVBQTVCLEVBQWdDO0FBQ3ZDLFVBQUk7QUFDRkEsV0FBRyxJQUFILEVBQVNoQixRQUFRaUIsT0FBUixDQUFnQmxCLEdBQWhCLEVBQXFCbUIsSUFBckIsQ0FBVDtBQUNELE9BRkQsQ0FFRSxPQUFPQyxHQUFQLEVBQVk7QUFDWkgsV0FBR0csR0FBSDtBQUNEO0FBQ0YsS0FWSTtBQVdMQyxnQkFBWSxTQUFTQSxVQUFULENBQW9CckIsR0FBcEIsRUFBeUJpQixFQUF6QixFQUE2QjtBQUN2QyxhQUFPQSxHQUFHLElBQUgsRUFBU2hCLFFBQVFvQixVQUFSLENBQW1CckIsR0FBbkIsQ0FBVCxDQUFQO0FBQ0QsS0FiSTtBQWNMc0IsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkwsRUFBcEIsRUFBd0I7QUFDbEMsYUFBT0EsR0FBRyxJQUFILEVBQVNmLE9BQU9xQixJQUFQLENBQVl0QixPQUFaLENBQVQsQ0FBUDtBQUNEO0FBaEJJLEdBQVA7QUFrQkQsQzs7Ozs7Ozs7QUNqQ0Q7Ozs7QUFFQUMsT0FBT0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFDM0NDLFNBQU87QUFEb0MsQ0FBN0M7O0FBSUEsSUFBSW1CLFVBQVUsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixJQUFnQyxTQUFPQSxPQUFPQyxRQUFkLE1BQTJCLFFBQTNELEdBQXNFLFVBQVVoQixHQUFWLEVBQWU7QUFBRSxnQkFBY0EsR0FBZCwwQ0FBY0EsR0FBZDtBQUFvQixDQUEzRyxHQUE4RyxVQUFVQSxHQUFWLEVBQWU7QUFBRSxTQUFPQSxPQUFPLE9BQU9lLE1BQVAsS0FBa0IsVUFBekIsSUFBdUNmLElBQUlpQixXQUFKLEtBQW9CRixNQUEzRCxJQUFxRWYsUUFBUWUsT0FBT0csU0FBcEYsR0FBZ0csUUFBaEcsVUFBa0hsQixHQUFsSCwwQ0FBa0hBLEdBQWxILENBQVA7QUFBK0gsQ0FBNVE7O0FBRUFOLFFBQVFRLE9BQVIsR0FBa0JpQixVQUFsQjs7QUFHQSxTQUFTQyxJQUFULEdBQWdCLENBQUU7O0FBRWxCLElBQUlDLGNBQWM7QUFDaEJmLFdBQVNjLElBRE87QUFFaEJaLFdBQVNZLElBRk87QUFHaEJULGNBQVlTLElBSEk7QUFJaEJSLGNBQVlRO0FBSkksQ0FBbEI7O0FBT0EsU0FBU0UsVUFBVCxDQUFvQkMsV0FBcEIsRUFBaUM7QUFDL0IsTUFBSSxDQUFDLE9BQU9DLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0MsV0FBaEMsR0FBOENWLFFBQVFVLE1BQVIsQ0FBL0MsTUFBb0UsUUFBcEUsSUFBZ0YsRUFBRUQsZUFBZUMsTUFBakIsQ0FBcEYsRUFBOEc7QUFDNUcsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsTUFBSTtBQUNGLFFBQUlqQyxVQUFVaUMsT0FBT0QsV0FBUCxDQUFkO0FBQ0EsUUFBSUUsVUFBVSxtQkFBbUJGLFdBQW5CLEdBQWlDLE9BQS9DO0FBQ0FoQyxZQUFRaUIsT0FBUixDQUFnQmlCLE9BQWhCLEVBQXlCLE1BQXpCO0FBQ0FsQyxZQUFRZSxPQUFSLENBQWdCbUIsT0FBaEI7QUFDQWxDLFlBQVFvQixVQUFSLENBQW1CYyxPQUFuQjtBQUNELEdBTkQsQ0FNRSxPQUFPQyxDQUFQLEVBQVU7QUFDVixRQUFJLElBQUosRUFBMkNDLFFBQVFDLElBQVIsQ0FBYSxtQkFBbUJMLFdBQW5CLEdBQWlDLDZDQUE5QztBQUMzQyxXQUFPLEtBQVA7QUFDRDtBQUNELFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVNKLFVBQVQsQ0FBb0JuRixJQUFwQixFQUEwQjtBQUN4QixNQUFJdUYsY0FBY3ZGLE9BQU8sU0FBekI7QUFDQSxNQUFJc0YsV0FBV0MsV0FBWCxDQUFKLEVBQTZCLE9BQU9DLE9BQU9ELFdBQVAsQ0FBUCxDQUE3QixLQUE2RDtBQUMzRCxRQUFJLElBQUosRUFBMkM7QUFDekNJLGNBQVExRixLQUFSLENBQWMsOEVBQWQ7QUFDRDtBQUNELFdBQU9vRixXQUFQO0FBQ0Q7QUFDRixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0Q7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBOztBQUdBLElBQU1RLHNCQUFzQixJQUFJLElBQWhDOztJQUVNbkUsa0I7Ozs7Ozs7Ozs7O3dDQUNnQjtBQUNsQixXQUFLb0UsZ0JBQUwsR0FBd0JDLFlBQVksS0FBS0MsS0FBTCxDQUFXekYsV0FBdkIsRUFBb0NzRixtQkFBcEMsQ0FBeEI7QUFDRDs7OzJDQUVzQjtBQUNyQkksb0JBQWMsS0FBS0gsZ0JBQW5CO0FBQ0Q7Ozs0Q0FFdUJqSSxRLEVBQVVILEksRUFBTTtBQUN0QyxXQUFLc0ksS0FBTCxDQUFXcEYsYUFBWCxDQUF5Qi9DLFFBQXpCLEVBQW1DSCxJQUFuQztBQUNEOzs7NkJBRVE7QUFBQSxtQkFDNEIsS0FBS3NJLEtBRGpDO0FBQUEsVUFDQ3hELE9BREQsVUFDQ0EsT0FERDtBQUFBLFVBQ1VVLE1BRFYsVUFDVUEsTUFEVjtBQUFBLFVBQ2tCZ0QsS0FEbEIsVUFDa0JBLEtBRGxCOzs7QUFHUCxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsc0JBQWY7QUFDRSxvRUFBQywwRUFBRDtBQUNFLG1CQUFTMUQsT0FEWDtBQUVFLGlCQUFPMEQsS0FGVDtBQUdFLGtCQUFRaEQsTUFIVjtBQUlFLCtCQUFxQixLQUFLOEMsS0FBTCxDQUFXcEYsYUFKbEM7QUFLRSxrQ0FBd0IsS0FBS29GLEtBQUwsQ0FBV25GLGtCQUxyQztBQU1FLG1DQUF5QixLQUFLbUYsS0FBTCxDQUFXakY7QUFOdEMsVUFERjtBQVNFLG9FQUFDLDZFQUFEO0FBQ0UsbUJBQVN5QixPQURYO0FBRUUsaUJBQU8wRDtBQUZUO0FBVEYsT0FERjtBQWdCRDs7OztFQWhDOEIsNkNBQUFDLENBQU1oRixTOztBQW1DdkNPLG1CQUFtQjBFLFNBQW5CLEdBQStCO0FBQzdCNUQsV0FBUyxrREFBQTZELENBQVVDLFFBQVYsQ0FBbUIsa0RBQUFELENBQVVFLEdBQTdCLEVBQWtDQyxVQURkO0FBRTdCdEQsVUFBUSxrREFBQW1ELENBQVVJLEtBQVYsQ0FBZ0I7QUFDdEI1RCxVQUFNLGtEQUFBd0QsQ0FBVUMsUUFBVixDQUFtQixrREFBQUQsQ0FBVUUsR0FBN0I7QUFEZ0IsR0FBaEIsRUFFTEMsVUFKMEI7QUFLN0JOLFNBQU8sa0RBQUFHLENBQVVJLEtBQVYsQ0FBZ0I7QUFDckI1RCxVQUFNLGtEQUFBd0QsQ0FBVUMsUUFBVixDQUFtQixrREFBQUQsQ0FBVUUsR0FBN0IsQ0FEZTtBQUVyQkcsYUFBUyxrREFBQUwsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVXRJLE1BQTVCO0FBRlksR0FBaEIsRUFHSnlJLFVBUjBCO0FBUzdCakcsZUFBYSxrREFBQThGLENBQVVPLElBQVYsQ0FBZUosVUFUQztBQVU3QjVGLGlCQUFlLGtEQUFBeUYsQ0FBVU8sSUFBVixDQUFlSixVQVZEO0FBVzdCM0Ysc0JBQW9CLGtEQUFBd0YsQ0FBVU8sSUFBVixDQUFlSixVQVhOO0FBWTdCekYsbUJBQWlCLGtEQUFBc0YsQ0FBVU8sSUFBVixDQUFlSjtBQVpILENBQS9COztBQWVBLElBQU1LLHFCQUFxQixTQUFyQkEsa0JBQXFCLENBQUN2RSxRQUFELEVBQWM7QUFBQSwwQkFDZEEsUUFEYyxDQUMvQkUsT0FEK0I7QUFBQSxNQUMvQkEsT0FEK0IscUNBQ3JCLEVBRHFCOztBQUV2QyxNQUFNc0UsWUFBWSxFQUFsQjtBQUNBdEQsU0FBT3FCLElBQVAsQ0FBWXJDLE9BQVosRUFBcUJFLE9BQXJCLENBQTZCLFVBQUMvRSxRQUFELEVBQWM7QUFDekMsUUFBTWdGLFNBQVNILFFBQVE3RSxRQUFSLENBQWY7QUFDQWdGLFdBQU9vRSxJQUFQLENBQVlyRSxPQUFaLENBQW9CLFVBQUNzRSxHQUFELEVBQVM7QUFBRUYsZ0JBQVVFLElBQUkxRCxHQUFkLElBQXFCLElBQXJCO0FBQTRCLEtBQTNEO0FBQ0QsR0FIRDtBQUlBLE1BQU1vRCxVQUFVbEQsT0FBT3FCLElBQVAsQ0FBWWlDLFNBQVosQ0FBaEI7O0FBRUEsTUFBTWpFLE9BQU87QUFDWG9FLFdBQU8sRUFESTtBQUVYQyxlQUFXLEVBRkE7QUFHWEMsZ0JBQVk7QUFIRCxHQUFiOztBQU1BLFNBQU8sRUFBRXRFLFVBQUYsRUFBUTZELGdCQUFSLEVBQVA7QUFDRCxDQWhCRDs7QUFrQkEsSUFBTVUsZ0JBQWdCO0FBQ3BCdkUsUUFBTTtBQURjLENBQXRCOztBQUlBLElBQU13RSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUM5RSxLQUFELEVBQVc7QUFBQSxNQUUvQkQsUUFGK0IsR0FJN0JDLEtBSjZCLENBRS9CRCxRQUYrQjtBQUFBLHNCQUk3QkMsS0FKNkIsQ0FHL0JXLE1BSCtCO0FBQUEsTUFHL0JBLE1BSCtCLGlDQUd0QmtFLGFBSHNCO0FBQUEsMkJBS1I5RSxRQUxRLENBS3pCRSxPQUx5QjtBQUFBLE1BS3pCQSxPQUx5QixzQ0FLZixFQUxlOztBQU1qQyxNQUFNMEQsUUFBUVcsbUJBQW1CdkUsUUFBbkIsQ0FBZDtBQUNBLFNBQU8sRUFBRUUsZ0JBQUYsRUFBV1UsY0FBWCxFQUFtQmdELFlBQW5CLEVBQVA7QUFDRCxDQVJEOztBQVVBLHlEQUFlLDREQUFBb0IsQ0FBUUQsZUFBUixFQUF5QjtBQUN0QzlHLGVBQUEsNkRBRHNDO0FBRXRDSyxpQkFBQSwrREFGc0M7QUFHdENDLHNCQUFBLG9FQUhzQztBQUl0Q0UsbUJBQUEsaUVBQUFBO0FBSnNDLENBQXpCLEVBS1pXLGtCQUxZLENBQWYsRTs7Ozs7Ozs7Ozs7OztBQ2hHQTtBQUNBO0FBQ0E7O0FBR0EsSUFBTTZGLG1CQUFtQixTQUFuQkEsZ0JBQW1CLENBQUN2QixLQUFELEVBQVc7QUFBQSx1QkFDRkEsS0FERSxDQUMxQnhELE9BRDBCO0FBQUEsTUFDMUJBLE9BRDBCLGtDQUNoQixFQURnQjtBQUFBLE1BQ1owRCxLQURZLEdBQ0ZGLEtBREUsQ0FDWkUsS0FEWTtBQUFBLE1BRTFCUSxPQUYwQixHQUVkUixLQUZjLENBRTFCUSxPQUYwQjs7O0FBSWxDLE1BQU1jLGlCQUFpQmQsUUFBUWUsR0FBUixDQUFZLFVBQUNDLE1BQUQ7QUFBQSxXQUFhO0FBQUE7QUFBQSxRQUFJLGVBQWFBLE1BQWpCO0FBQTJCLDRFQUFNLFdBQVUseUJBQWhCLEdBQTNCO0FBQXdFQTtBQUF4RSxLQUFiO0FBQUEsR0FBWixDQUF2Qjs7QUFFQSxNQUFNQyxpQkFBaUJuRSxPQUFPcUIsSUFBUCxDQUFZckMsT0FBWixFQUFxQmlGLEdBQXJCLENBQXlCLFVBQUM5SixRQUFELEVBQWM7QUFDNUQsUUFBTWdGLFNBQVNILFFBQVE3RSxRQUFSLENBQWY7QUFDQSxRQUFNMkYsc0JBQW9CWCxPQUFPQyxFQUFqQztBQUNBLFdBQ0UsNERBQUMsMkRBQUQ7QUFDRSxjQUFRRCxNQURWO0FBRUUsYUFBT3VELEtBRlQ7QUFHRSxXQUFLNUM7QUFIUCxNQURGO0FBT0QsR0FWc0IsQ0FBdkI7O0FBWUEsU0FDRTtBQUFBO0FBQUEsTUFBTyxXQUFVLG1CQUFqQjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FGRjtBQUdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FIRjtBQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FKRjtBQUtFO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FMRjtBQU1Ha0U7QUFOSDtBQURGLEtBREY7QUFXRTtBQUFBO0FBQUE7QUFDR0c7QUFESDtBQVhGLEdBREY7QUFpQkQsQ0FuQ0Q7O0FBcUNBSixpQkFBaUJuQixTQUFqQixHQUE2QjtBQUMzQjVELFdBQVMsa0RBQUE2RCxDQUFVQyxRQUFWLENBQ1Asa0RBQUFELENBQVVJLEtBQVYsQ0FBZ0I7QUFDZDdELFFBQUksa0RBQUF5RCxDQUFVdUIsTUFEQTtBQUVkQyxjQUFVLGtEQUFBeEIsQ0FBVXRJLE1BRk47QUFHZGdKLFVBQU0sa0RBQUFWLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVVFLEdBQTVCLENBSFE7QUFJZHVCLFVBQU0sa0RBQUF6QixDQUFVTSxPQUFWLENBQWtCLGtEQUFBTixDQUFVRSxHQUE1QjtBQUpRLEdBQWhCLENBRE8sQ0FEa0I7QUFTM0JMLFNBQU8sa0RBQUFHLENBQVVJLEtBQVYsQ0FBZ0I7QUFDckJDLGFBQVMsa0RBQUFMLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVV0SSxNQUE1QjtBQURZLEdBQWhCO0FBVG9CLENBQTdCO0FBYUF3SixpQkFBaUJRLFlBQWpCLEdBQWdDO0FBQzlCdkYsV0FBUyxFQURxQjtBQUU5QjBELFNBQU87QUFDTFEsYUFBUztBQURKO0FBRnVCLENBQWhDOztBQU9BLHlEQUFlYSxnQkFBZixFOzs7Ozs7Ozs7Ozs7QUM5REE7QUFDQTs7QUFHQSxJQUFNUyxXQUFXLEdBQWpCOztBQUVBLElBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDakMsS0FBRCxFQUFXO0FBQUEsTUFDbkJyRCxNQURtQixHQUNEcUQsS0FEQyxDQUNuQnJELE1BRG1CO0FBQUEsTUFDWHVELEtBRFcsR0FDREYsS0FEQyxDQUNYRSxLQURXO0FBQUEsTUFFbkJhLElBRm1CLEdBRUpwRSxNQUZJLENBRW5Cb0UsSUFGbUI7QUFBQSxNQUViZSxJQUZhLEdBRUpuRixNQUZJLENBRWJtRixJQUZhOzs7QUFJM0IsTUFBTUksVUFBVUosS0FBS0EsS0FBSzlKLE1BQUwsR0FBYyxDQUFuQixLQUF5QixFQUF6QztBQUNBLE1BQU1tSyxjQUFjLEVBQXBCO0FBQ0FELFVBQVFFLFFBQVIsQ0FBaUIxRixPQUFqQixDQUF5QixVQUFDMkYsT0FBRCxFQUFhO0FBQUVGLGdCQUFZRSxRQUFRL0UsR0FBcEIsSUFBMkIrRSxRQUFRMUUsS0FBbkM7QUFBMkMsR0FBbkY7O0FBRUEsTUFBTTJFLFVBQVUsRUFBaEI7QUFDQXZCLE9BQUtyRSxPQUFMLENBQWEsVUFBQ3NFLEdBQUQsRUFBUztBQUNwQnNCLFlBQVF0QixJQUFJMUQsR0FBWixJQUFtQjBELElBQUlyRCxLQUF2QjtBQUNELEdBRkQ7QUFHQSxNQUFNNEUsV0FBV3JDLE1BQU1RLE9BQU4sQ0FBY2UsR0FBZCxDQUFrQixVQUFDQyxNQUFELEVBQVk7QUFDN0MsUUFBTWMsVUFBV2QsVUFBVVksT0FBWCxHQUFzQkEsUUFBUVosTUFBUixDQUF0QixHQUF3Q00sUUFBeEQ7QUFDQSxXQUFRO0FBQUE7QUFBQSxRQUFJLGVBQWFOLE1BQWpCO0FBQTRCYztBQUE1QixLQUFSO0FBQ0QsR0FIZ0IsQ0FBakI7O0FBS0EsU0FDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBSzdGLGFBQU9DO0FBQVosS0FERjtBQUVFO0FBQUE7QUFBQTtBQUFLRCxhQUFPa0Y7QUFBWixLQUZGO0FBR0U7QUFBQTtBQUFBO0FBQUtNLGtCQUFZTTtBQUFqQixLQUhGO0FBSUU7QUFBQTtBQUFBO0FBQUtOLGtCQUFZTztBQUFqQixLQUpGO0FBS0U7QUFBQTtBQUFBO0FBQUtQLGtCQUFZUTtBQUFqQixLQUxGO0FBTUdKO0FBTkgsR0FERjtBQVVELENBM0JEOztBQTZCQU4sVUFBVTdCLFNBQVYsR0FBc0I7QUFDcEJ6RCxVQUFRLGtEQUFBMEQsQ0FBVUksS0FBVixDQUFnQjtBQUN0QjdELFFBQUksa0RBQUF5RCxDQUFVdUIsTUFEUTtBQUV0QkMsY0FBVSxrREFBQXhCLENBQVV0SSxNQUZFO0FBR3RCZ0osVUFBTSxrREFBQVYsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUIsQ0FIZ0I7QUFJdEJ1QixVQUFNLGtEQUFBekIsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVUUsR0FBNUI7QUFKZ0IsR0FBaEIsRUFLTEMsVUFOaUI7QUFPcEJOLFNBQU8sa0RBQUFHLENBQVVJLEtBQVYsQ0FBZ0I7QUFDckJDLGFBQVMsa0RBQUFMLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVV0SSxNQUE1QjtBQURZLEdBQWhCO0FBUGEsQ0FBdEI7O0FBWUFrSyxVQUFVRixZQUFWLEdBQXlCO0FBQ3ZCN0IsU0FBTztBQUNMUSxhQUFTO0FBREo7QUFEZ0IsQ0FBekI7O0FBTUEseURBQWV1QixTQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEQTtBQUNBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBLElBQU1XLGNBQWMsS0FBcEI7QUFDQSxJQUFNQyxlQUFlO0FBQ25CaEcsUUFBTTtBQUNKb0UsV0FBTyxFQURIO0FBRUpDLGVBQVcsRUFGUDtBQUdKQyxnQkFBWTtBQUhSO0FBRGEsQ0FBckI7O0FBUUEsSUFBTTJCLGVBQWUsQ0FBQyxDQUFELEVBQUksR0FBSixDQUFyQjtBQUNBLElBQU1DLHFCQUFxQjtBQUN6QmxMLFlBQVUsT0FEZTtBQUV6Qm1MLFlBQVUsT0FGZTtBQUd6QmhJLFNBQU8sUUFIa0I7QUFJekJpSSxTQUFPSDtBQUprQixDQUEzQjtBQU1BLElBQU1JLHFCQUFxQjtBQUN6QnJMLFlBQVUsRUFEZTtBQUV6Qm1ELFNBQU8sUUFGa0I7QUFHekJpSSxTQUFPSCxZQUhrQjtBQUl6Qi9GLFNBQU87QUFKa0IsQ0FBM0I7QUFNQSxJQUFNcUUsZ0JBQWdCO0FBQ3BCdkUsUUFBTTtBQUNKb0UsV0FBTzhCLGtCQURIO0FBRUo3Qiw0QkFBZ0JnQyxrQkFBaEIsSUFBb0NyTCxVQUFVLFdBQTlDLEdBRkk7QUFHSnNKLDZCQUFpQitCLGtCQUFqQixJQUFxQ3JMLFVBQVUsWUFBL0M7QUFISTtBQURjLENBQXRCOztBQVFBLElBQU1zTCxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUN6TCxJQUFELEVBQU9HLFFBQVAsRUFBb0I7QUFBQSxxQkFDaEJILElBRGdCLENBQ2hDd0YsTUFEZ0M7QUFBQSxNQUNoQ0EsTUFEZ0MsZ0NBQ3ZCLEVBRHVCO0FBQUEsTUFFaENwRixRQUZnQyxHQUVMLHVEQUZLLENBRWhDQSxRQUZnQztBQUFBLE1BRXRCc0wsWUFGc0IsR0FFTCx1REFGSyxDQUV0QkEsWUFGc0I7OztBQUl4QyxTQUNFLDREQUFDLDhDQUFEO0FBQ0UsVUFBSyxRQURQO0FBRUUsVUFBTXRMLFNBQVNKLElBQVQsQ0FGUjtBQUdFLGFBQVMwTCxhQUFhMUwsSUFBYixFQUFtQkcsUUFBbkIsQ0FIWDtBQUlFLGFBQVNBLFFBSlg7QUFLRSxZQUFRcUYsT0FBT21HLEtBTGpCO0FBTUUsc0JBTkY7QUFPRSx1QkFBbUIsS0FQckI7QUFRRSxTQUFLRCxhQUFhMUwsSUFBYixFQUFtQkcsUUFBbkI7QUFSUCxJQURGO0FBWUQsQ0FoQkQ7O0FBa0JBLElBQU15TCxpQkFBaUIsU0FBakJBLGNBQWlCLENBQUN6TCxRQUFELEVBQVdxRixNQUFYLEVBQXNCO0FBQzNDLE1BQU1KLGFBQWFJLE9BQU9MLElBQVAsQ0FBWWhGLFFBQVosS0FBeUIsRUFBNUM7QUFEMkMsMEJBRXBCaUYsVUFGb0IsQ0FFbkNDLEtBRm1DO0FBQUEsTUFFbkNBLEtBRm1DLHFDQUUzQixFQUYyQjs7QUFHM0MsU0FBT0EsTUFBTTBFLEdBQU4sQ0FBVSxVQUFDL0osSUFBRDtBQUFBLFdBQVV5TCxjQUFjekwsSUFBZCxFQUFvQkcsUUFBcEIsQ0FBVjtBQUFBLEdBQVYsQ0FBUDtBQUNELENBSkQ7O0lBTU0wTCxhOzs7QUFDSix5QkFBWXZELEtBQVosRUFBbUI7QUFBQTs7QUFBQSw4SEFDWEEsS0FEVzs7QUFHakIsVUFBS3pELEtBQUwsR0FBYSxFQUFiO0FBSGlCO0FBSWxCOzs7OzZCQUVRO0FBQUEsVUFDQzZHLFlBREQsR0FDa0IsdURBRGxCLENBQ0NBLFlBREQ7QUFBQSxtQkFTSCxLQUFLcEQsS0FURjtBQUFBLGtDQUdMeEQsT0FISztBQUFBLFVBR0xBLE9BSEssa0NBR0ssRUFITDtBQUFBLGdDQUlMMEQsS0FKSztBQUFBLFVBSUxBLEtBSkssZ0NBSUcyQyxZQUpIO0FBQUEsaUNBS0wzRixNQUxLO0FBQUEsVUFLTEEsTUFMSyxpQ0FLSWtFLGFBTEo7QUFBQSxVQU1Mb0MsbUJBTkssVUFNTEEsbUJBTks7QUFBQSxVQU9MQyxzQkFQSyxVQU9MQSxzQkFQSztBQUFBLFVBUUxDLHVCQVJLLFVBUUxBLHVCQVJLO0FBQUEseUJBY0h4RyxPQUFPTCxJQWRKO0FBQUEsNENBV0xvRSxLQVhLO0FBQUEsVUFXTEEsS0FYSyxzQ0FXRyxFQUFFcEosVUFBVSxPQUFaLEVBWEg7QUFBQSwrQ0FZTHFKLFNBWks7QUFBQSxVQVlMQSxTQVpLLHlDQVlPLEVBQUVySixVQUFVLFdBQVosRUFaUDtBQUFBLCtDQWFMc0osVUFiSztBQUFBLFVBYUxBLFVBYksseUNBYVEsRUFBRXRKLFVBQVUsWUFBWixFQWJSO0FBQUEsNEJBZXdCb0osS0FmeEIsQ0FlQytCLFFBZkQ7QUFBQSxVQWVDQSxRQWZELG1DQWVZLE9BZlo7O0FBZ0JQLFVBQU1XLFlBQVl6QyxVQUFVbkUsS0FBVixJQUFtQixFQUFyQztBQUNBLFVBQU02RyxhQUFhekMsV0FBV3BFLEtBQVgsSUFBb0IsRUFBdkM7QUFDQSxVQUFNOEcsWUFBWTtBQUNoQjNDLG1CQUFXeUMsU0FESztBQUVoQnhDLG9CQUFZeUM7QUFGSSxPQUFsQjtBQUlBLFVBQU1FLFNBQVM3QyxNQUFNZ0MsS0FBTixJQUFlSCxZQUE5QjtBQUNBLFVBQU1pQixhQUFhN0MsVUFBVStCLEtBQVYsSUFBbUJILFlBQXRDO0FBQ0EsVUFBTWtCLGNBQWM3QyxXQUFXOEIsS0FBWCxJQUFvQkgsWUFBeEM7QUFDQSxVQUFNbUIsY0FBYy9ELE1BQU1yRCxJQUFOLENBQVdvRSxLQUFYLENBQWlCaUQsVUFBakIsSUFBK0JwQixZQUFuRDtBQUNBLFVBQU1xQixrQkFBa0JqRSxNQUFNckQsSUFBTixDQUFXcUUsU0FBWCxDQUFxQmdELFVBQXJCLElBQW1DcEIsWUFBM0Q7QUFDQSxVQUFNc0IsbUJBQW1CbEUsTUFBTXJELElBQU4sQ0FBV3NFLFVBQVgsQ0FBc0IrQyxVQUF0QixJQUFvQ3BCLFlBQTdEOztBQUVBLFVBQU11QixhQUFhLEdBQW5CO0FBQ0EsVUFBTUMsY0FBYyxHQUFwQjs7QUFFQSxVQUFNQyxXQUFXLEVBQWpCLENBaENPLENBZ0NjO0FBQ3JCL0csYUFBT3FCLElBQVAsQ0FBWWdGLFNBQVosRUFBdUJuSCxPQUF2QixDQUErQixVQUFDN0UsUUFBRCxFQUFjO0FBQzNDLFlBQU1rRixRQUFROEcsVUFBVWhNLFFBQVYsQ0FBZDtBQUNBa0YsY0FBTUwsT0FBTixDQUFjLFVBQUNoRixJQUFELEVBQVU7QUFBQSxjQUNkQyxRQURjLEdBQ09ELElBRFAsQ0FDZEMsUUFEYztBQUFBLGNBQ0pDLE1BREksR0FDT0YsSUFEUCxDQUNKRSxNQURJOztBQUV0QixjQUFNK0UsU0FBU0gsUUFBUTdFLFFBQVIsQ0FBZjtBQUNBLGNBQUlnRixVQUFVLElBQWQsRUFBb0I7QUFDbEI7QUFDRDtBQUNELGNBQU1tRixPQUFPbkYsT0FBT21GLElBQVAsSUFBZSxFQUE1QjtBQUNBQSxlQUFLcEYsT0FBTCxDQUFhLFVBQUM4SCxHQUFELEVBQVM7QUFDcEIsZ0JBQU1DLFVBQVUsRUFBaEI7QUFDQUQsZ0JBQUlwQyxRQUFKLENBQWExRixPQUFiLENBQXFCLFVBQUMyRixPQUFELEVBQWE7QUFDaENvQyxzQkFBUXBDLFFBQVEvRSxHQUFoQixJQUF1QitFLFFBQVExRSxLQUEvQjtBQUNELGFBRkQ7QUFHQSxnQkFBSThHLFFBQVF6QixRQUFSLEtBQXFCLElBQXJCLElBQTZCeUIsUUFBUTdNLE1BQVIsS0FBbUIsSUFBcEQsRUFBMEQ7QUFDeEQ7QUFDRDtBQUNELGdCQUFJMk0sU0FBU0UsUUFBUXpCLFFBQVIsQ0FBVCxLQUErQixJQUFuQyxFQUF5QztBQUN2Q3VCLHVCQUFTRSxRQUFRekIsUUFBUixDQUFULHdCQUFpQ0EsUUFBakMsRUFBNEN5QixRQUFRekIsUUFBUixDQUE1QztBQUNEO0FBQ0R1QixxQkFBU0UsUUFBUXpCLFFBQVIsQ0FBVCxFQUE0QkksYUFBYTFMLElBQWIsRUFBbUJHLFFBQW5CLENBQTVCLElBQTRENE0sUUFBUTdNLE1BQVIsQ0FBNUQ7QUFDRCxXQVpEO0FBYUQsU0FwQkQ7QUFxQkQsT0F2QkQ7QUF3QkEsVUFBTStCLE9BQU82RCxPQUFPcUIsSUFBUCxDQUFZMEYsUUFBWixFQUFzQjlDLEdBQXRCLENBQTBCLFVBQUNuRSxHQUFEO0FBQUEsZUFBVWlILFNBQVNqSCxHQUFULENBQVY7QUFBQSxPQUExQixDQUFiOztBQUVBLFVBQU1vSCx5Q0FBZ0JwQixlQUFlLFdBQWYsRUFBNEJwRyxNQUE1QixDQUFoQixzQkFBd0RvRyxlQUFlLFlBQWYsRUFBNkJwRyxNQUE3QixDQUF4RCxFQUFOOztBQUVBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSx5QkFBZjtBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUNFLDhFQUFDLGdEQUFEO0FBQ0UsMkJBQU8sRUFBRXlILFFBQVdMLFdBQVgsT0FBRixFQURUO0FBRUUsa0NBRkY7QUFHRSx5QkFBS0gsZ0JBQWdCLENBQWhCLENBSFA7QUFJRSx5QkFBS0EsZ0JBQWdCLENBQWhCLENBSlA7QUFLRSwwQkFBTSxDQUFDSixXQUFXLENBQVgsSUFBZ0JBLFdBQVcsQ0FBWCxDQUFqQixJQUFrQ25CLFdBTDFDO0FBTUUsMkJBQU9tQjtBQU5UO0FBREYsaUJBREY7QUFXRTtBQUFBO0FBQUE7QUFDRTtBQUFDLHVFQUFEO0FBQUE7QUFDRSw2QkFBT00sVUFEVDtBQUVFLDhCQUFRQyxXQUZWO0FBR0UsNEJBQU0zSyxJQUhSO0FBSUUsOEJBQVEsRUFBRWlMLEtBQUssQ0FBUCxFQUFVQyxPQUFPLEVBQWpCLEVBQXFCQyxNQUFNLEVBQTNCLEVBQStCQyxRQUFRLENBQXZDO0FBSlY7QUFNRSxnRkFBQywrQ0FBRDtBQUNFLDRCQUFLLFFBRFA7QUFFRSwrQkFBUy9CLFFBRlg7QUFHRSw2QkFBTy9CLE1BQU1qRyxLQUhmO0FBSUUsOEJBQVEsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUpWO0FBS0U7QUFMRixzQkFORjtBQWFFLGdGQUFDLCtDQUFEO0FBQ0UsK0JBQVEsV0FEVjtBQUVFLG1DQUFZLE1BRmQ7QUFHRSw2QkFBT2tHLFVBQVVsRyxLQUhuQjtBQUlFLDhCQUFRLENBQUMsTUFBRCxFQUFTLE1BQVQsQ0FKVjtBQUtFO0FBTEYsc0JBYkY7QUFvQkUsZ0ZBQUMsK0NBQUQ7QUFDRSwrQkFBUSxZQURWO0FBRUUsbUNBQVksT0FGZDtBQUdFLDZCQUFPbUcsV0FBV25HLEtBSHBCO0FBSUUsOEJBQVEsQ0FBQyxNQUFELEVBQVMsTUFBVCxDQUpWO0FBS0U7QUFMRixzQkFwQkY7QUEyQkUsZ0ZBQUMsdURBQUQsSUFBZSxpQkFBZ0IsS0FBL0IsR0EzQkY7QUE0QkUsZ0ZBQUMsaURBQUQsT0E1QkY7QUE2QkUsZ0ZBQUMsZ0RBQUQsT0E3QkY7QUE4QkcwSjtBQTlCSDtBQURGLGlCQVhGO0FBNkNFO0FBQUE7QUFBQTtBQUNFLDhFQUFDLGdEQUFEO0FBQ0UsMkJBQU8sRUFBRUMsUUFBV0wsV0FBWCxPQUFGLEVBRFQ7QUFFRSxrQ0FGRjtBQUdFLHlCQUFLRixpQkFBaUIsQ0FBakIsQ0FIUDtBQUlFLHlCQUFLQSxpQkFBaUIsQ0FBakIsQ0FKUDtBQUtFLDBCQUFNLENBQUNKLFlBQVksQ0FBWixJQUFpQkEsWUFBWSxDQUFaLENBQWxCLElBQW9DcEIsV0FMNUM7QUFNRSwyQkFBT29CO0FBTlQ7QUFERjtBQTdDRixlQURGO0FBeURFO0FBQUE7QUFBQTtBQUNFLHVGQURGO0FBRUU7QUFBQTtBQUFBO0FBQ0UsOEVBQUMsZ0RBQUQ7QUFDRSwyQkFBTyxFQUFFZ0IsT0FBVVgsVUFBVixPQUFGLEVBQTRCWSxRQUFRLE1BQXBDLEVBRFQ7QUFFRSx5QkFBS2hCLFlBQVlpQixHQUZuQjtBQUdFLHlCQUFLakIsWUFBWWtCLEdBSG5CO0FBSUUsMkJBQU9yQixNQUpUO0FBS0UsOEJBQVUsS0FBS3NCO0FBTGpCO0FBREYsaUJBRkY7QUFXRTtBQVhGO0FBekRGO0FBREY7QUFERixTQURGO0FBNEVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUMsOEVBQUQ7QUFBQTtBQUNFLDBCQUFZbEUsU0FEZDtBQUVFLDZCQUFld0M7QUFGakI7QUFJRSx3RUFBQyxtRUFBRDtBQUNFLHVCQUFTbEgsT0FEWDtBQUVFLHdCQUFTLFdBRlg7QUFHRSxxQkFBTzBFLFVBQVVuRSxLQUhuQjtBQUlFLG1DQUFxQnlHLG1CQUp2QjtBQUtFLHNDQUF3QkM7QUFMMUI7QUFKRixXQURGO0FBYUU7QUFBQyw4RUFBRDtBQUFBO0FBQ0UsMEJBQVl0QyxVQURkO0FBRUUsNkJBQWV1QztBQUZqQjtBQUlFLHdFQUFDLG1FQUFEO0FBQ0UsdUJBQVNsSCxPQURYO0FBRUUsd0JBQVMsWUFGWDtBQUdFLHFCQUFPMkUsV0FBV3BFLEtBSHBCO0FBSUUsbUNBQXFCeUcsbUJBSnZCO0FBS0Usc0NBQXdCQztBQUwxQjtBQUpGLFdBYkY7QUF5QkUsc0VBQUMsa0VBQUQ7QUFDRSx3QkFBWXhDLEtBRGQ7QUFFRSwyQkFBZXlDO0FBRmpCO0FBekJGO0FBNUVGLE9BREY7QUE2R0Q7Ozs7RUFqTHlCLDZDQUFBdkQsQ0FBTWhGLFM7O0FBb0xsQ29JLGNBQWNuRCxTQUFkLEdBQTBCO0FBQ3hCNUQsV0FBUyxrREFBQTZELENBQVVDLFFBQVYsQ0FBbUIsa0RBQUFELENBQVVFLEdBQTdCLEVBQWtDQyxVQURuQjtBQUV4Qk4sU0FBTyxrREFBQUcsQ0FBVUksS0FBVixDQUFnQjtBQUNyQjVELFVBQU0sa0RBQUF3RCxDQUFVSSxLQUFWLENBQWdCO0FBQ3BCUSxhQUFPLGtEQUFBWixDQUFVSSxLQUFWLENBQWdCLEVBQUV5RCxZQUFZLGtEQUFBN0QsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVXVCLE1BQTVCLENBQWQsRUFBaEIsQ0FEYTtBQUVwQlYsaUJBQVcsa0RBQUFiLENBQVVJLEtBQVYsQ0FBZ0IsRUFBRXlELFlBQVksa0RBQUE3RCxDQUFVTSxPQUFWLENBQWtCLGtEQUFBTixDQUFVdUIsTUFBNUIsQ0FBZCxFQUFoQixDQUZTO0FBR3BCVCxrQkFBWSxrREFBQWQsQ0FBVUksS0FBVixDQUFnQixFQUFFeUQsWUFBWSxrREFBQTdELENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVV1QixNQUE1QixDQUFkLEVBQWhCO0FBSFEsS0FBaEI7QUFEZSxHQUFoQixDQUZpQjtBQVN4QjFFLFVBQVEsa0RBQUFtRCxDQUFVSSxLQUFWLENBQWdCO0FBQ3RCNUQsVUFBTSxrREFBQXdELENBQVVJLEtBQVYsQ0FBZ0I7QUFDcEJRLGFBQU8sa0RBQUFaLENBQVVFLEdBREc7QUFFcEJXLGlCQUFXLGtEQUFBYixDQUFVRSxHQUZEO0FBR3BCWSxrQkFBWSxrREFBQWQsQ0FBVUU7QUFIRixLQUFoQjtBQURnQixHQUFoQixDQVRnQjtBQWdCeEJpRCx1QkFBcUIsa0RBQUFuRCxDQUFVTyxJQUFWLENBQWVKLFVBaEJaO0FBaUJ4QmlELDBCQUF3QixrREFBQXBELENBQVVPLElBQVYsQ0FBZUosVUFqQmY7QUFrQnhCa0QsMkJBQXlCLGtEQUFBckQsQ0FBVU8sSUFBVixDQUFlSjtBQWxCaEIsQ0FBMUI7QUFvQkErQyxjQUFjeEIsWUFBZCxHQUE2QjtBQUMzQjdCLFNBQU8yQyxZQURvQjtBQUUzQjNGLFVBQVFrRTtBQUZtQixDQUE3Qjs7QUFLQSx5REFBZW1DLGFBQWYsRTs7Ozs7OztBQ3JSQSx5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBOztBQUdBLElBQU04QixvQkFBb0I7QUFDeEJ4TixZQUFVLEVBRGM7QUFFeEJtRCxTQUFPLE1BRmlCO0FBR3hCaUksU0FBTyxDQUFDLENBQUQsRUFBSSxHQUFKO0FBSGlCLENBQTFCOztJQU1NcUMsZ0I7OztBQUNKLDRCQUFZdEYsS0FBWixFQUFtQjtBQUFBOztBQUFBLG9JQUNYQSxLQURXOztBQUdqQixVQUFLdUYsaUJBQUwsR0FBeUIsTUFBS0EsaUJBQUwsQ0FBdUJDLElBQXZCLE9BQXpCO0FBSGlCO0FBSWxCOzs7O3NDQUVpQnhLLEssRUFBTztBQUFBLFVBQ2ZuRCxRQURlLEdBQ0YsS0FBS21JLEtBQUwsQ0FBV2xELFVBRFQsQ0FDZmpGLFFBRGU7O0FBRXZCLFdBQUttSSxLQUFMLENBQVd5RixhQUFYLENBQXlCNU4sUUFBekIsRUFBbUNtRCxLQUFuQztBQUNEOzs7NkJBRVE7QUFBQSw4QkFDcUIsS0FBS2dGLEtBQUwsQ0FBV2xELFVBRGhDO0FBQUEsVUFDQ2pGLFFBREQscUJBQ0NBLFFBREQ7QUFBQSxVQUNXbUQsS0FEWCxxQkFDV0EsS0FEWDs7O0FBR1AsYUFDRTtBQUFBO0FBQUEsVUFBSyxXQUFVLHdCQUFmO0FBQ0U7QUFBQTtBQUFBLFlBQUssV0FBVSxhQUFmO0FBQThCbkQ7QUFBOUIsU0FERjtBQUVFO0FBQUE7QUFBQSxZQUFLLFdBQVUsV0FBZjtBQUNFO0FBQUE7QUFBQSxjQUFLLFdBQVUsS0FBZjtBQUNFO0FBQUE7QUFBQSxnQkFBSyxXQUFVLFVBQWY7QUFDRSwwRUFBQyxtRUFBRDtBQUNFLHVCQUFPbUQsS0FEVDtBQUVFLDBCQUFVLEtBQUt1SztBQUZqQjtBQURGO0FBREY7QUFERixTQUZGO0FBWUcsYUFBS3ZGLEtBQUwsQ0FBVzBGO0FBWmQsT0FERjtBQWdCRDs7OztFQS9CNEIsNkNBQUF2RixDQUFNaEYsUzs7QUFrQ3JDbUssaUJBQWlCbEYsU0FBakIsR0FBNkI7QUFDM0J0RCxjQUFZLGtEQUFBdUQsQ0FBVUksS0FBVixDQUFnQjtBQUMxQjVJLGNBQVUsa0RBQUF3SSxDQUFVdEksTUFBVixDQUFpQnlJLFVBREQ7QUFFMUJ4RixXQUFPLGtEQUFBcUYsQ0FBVXRJLE1BRlM7QUFHMUJrTCxXQUFPLGtEQUFBNUMsQ0FBVU0sT0FBVixDQUFrQixrREFBQU4sQ0FBVXVCLE1BQTVCO0FBSG1CLEdBQWhCLENBRGU7QUFNM0I4RCxZQUFVLGtEQUFBckYsQ0FBVXNGLE9BTk87QUFPM0JGLGlCQUFlLGtEQUFBcEYsQ0FBVU87QUFQRSxDQUE3QjtBQVNBMEUsaUJBQWlCdkQsWUFBakIsR0FBZ0M7QUFDOUJqRixjQUFZdUksaUJBRGtCO0FBRTlCSyxZQUFVLElBRm9CO0FBRzlCRCxpQkFBZSx5QkFBTSxDQUFFO0FBSE8sQ0FBaEM7O0FBTUEseURBQWVILGdCQUFmLEU7Ozs7Ozs7Ozs7OztBQzVEQTtBQUNBOztBQUdBLElBQU1NLGVBQWUsQ0FBQyxRQUFELEVBQVcsS0FBWCxDQUFyQjs7QUFFQSxJQUFNQyxvQkFBb0IsU0FBcEJBLGlCQUFvQixDQUFDN0YsS0FBRCxFQUFXO0FBQUEsTUFDM0JoRixLQUQyQixHQUNQZ0YsS0FETyxDQUMzQmhGLEtBRDJCO0FBQUEsTUFDcEI4SyxRQURvQixHQUNQOUYsS0FETyxDQUNwQjhGLFFBRG9COztBQUVuQyxNQUFNQyxzQkFBc0IsU0FBdEJBLG1CQUFzQixDQUFDckcsQ0FBRCxFQUFPO0FBQ2pDb0csYUFBU3BHLEVBQUVzRyxNQUFGLENBQVNySSxLQUFsQjtBQUNELEdBRkQ7O0FBSUEsTUFBTXNJLFVBQVVMLGFBQWFuRSxHQUFiLENBQWlCLFVBQUN5RSxRQUFEO0FBQUEsV0FDL0I7QUFBQTtBQUFBLFFBQVEsT0FBT0EsUUFBZixFQUF5QixLQUFLQSxRQUE5QjtBQUF5Q0E7QUFBekMsS0FEK0I7QUFBQSxHQUFqQixDQUFoQjtBQUdBLFNBQ0U7QUFBQTtBQUFBLE1BQVEsSUFBRyw0QkFBWCxFQUF3QyxXQUFVLGNBQWxELEVBQWlFLE9BQU9sTCxLQUF4RSxFQUErRSxVQUFVK0ssbUJBQXpGO0FBQ0dFO0FBREgsR0FERjtBQUtELENBZEQ7O0FBZ0JBSixrQkFBa0J6RixTQUFsQixHQUE4QjtBQUM1QnBGLFNBQU8sa0RBQUFxRixDQUFVdEksTUFEVztBQUU1QitOLFlBQVUsa0RBQUF6RixDQUFVTztBQUZRLENBQTlCOztBQUtBaUYsa0JBQWtCOUQsWUFBbEIsR0FBaUM7QUFDL0IvRyxTQUFPLEVBRHdCO0FBRS9COEssWUFBVSxvQkFBTSxDQUFFO0FBRmEsQ0FBakM7O0FBS0EseURBQWVELGlCQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsSUFBTU0sY0FBYztBQUNsQmpKLFVBQVE7QUFDTm1HLFdBQU87QUFERDtBQURVLENBQXBCOztJQU1NK0MsaUI7OztBQUNKLCtCQUFjO0FBQUE7O0FBQUE7O0FBR1osVUFBS0MsaUJBQUwsR0FBeUIsTUFBS0EsaUJBQUwsQ0FBdUJiLElBQXZCLE9BQXpCO0FBQ0EsVUFBS2Msc0JBQUwsR0FBOEIsTUFBS0Esc0JBQUwsQ0FBNEJkLElBQTVCLE9BQTlCO0FBQ0EsVUFBS2UsdUJBQUwsR0FBK0IsTUFBS0EsdUJBQUwsQ0FBNkJmLElBQTdCLE9BQS9CO0FBQ0EsVUFBS2dCLDBCQUFMLEdBQWtDLE1BQUtBLDBCQUFMLENBQWdDaEIsSUFBaEMsT0FBbEM7O0FBRUEsVUFBS2pKLEtBQUwsR0FBYTtBQUNYa0ssaUJBQVcsS0FEQTtBQUVYQyxrQkFBWVA7QUFGRCxLQUFiO0FBUlk7QUFZYjs7Ozt3Q0FFbUI7QUFDbEIsVUFBTVEsZ0JBQWdCLEtBQUtwSyxLQUFMLENBQVdrSyxTQUFYLEdBQXVCTixXQUF2QixHQUFxQyxLQUFLNUosS0FBTCxDQUFXbUssVUFBdEU7QUFDQSxXQUFLRSxRQUFMLENBQWM7QUFDWkgsbUJBQVcsQ0FBQyxLQUFLbEssS0FBTCxDQUFXa0ssU0FEWDtBQUVaQyxvQkFBWUM7QUFGQSxPQUFkO0FBSUQ7OzsyQ0FFc0JFLE8sRUFBUztBQUM5QixXQUFLRCxRQUFMLENBQWM7QUFDWkYsb0JBQVlHLE9BREE7QUFFWkMsNkJBQXFCO0FBRlQsT0FBZDtBQUlEOzs7OENBRXlCO0FBQUEsbUJBQ2tCLEtBQUs5RyxLQUR2QjtBQUFBLFVBQ2hCbkksUUFEZ0IsVUFDaEJBLFFBRGdCO0FBQUEsVUFDTjJMLG1CQURNLFVBQ05BLG1CQURNO0FBQUEsVUFFaEJrRCxVQUZnQixHQUVELEtBQUtuSyxLQUZKLENBRWhCbUssVUFGZ0I7OztBQUl4QixVQUFJQSxXQUFXL08sUUFBWCxJQUF1QixJQUF2QixJQUErQitPLFdBQVc5TyxNQUFYLElBQXFCLElBQXhELEVBQThEO0FBQzVEO0FBQ0EsYUFBS2dQLFFBQUwsQ0FBYztBQUNaRSwrQkFBcUI7QUFEVCxTQUFkO0FBR0QsT0FMRCxNQUtPO0FBQ0x0RCw0QkFBb0IzTCxRQUFwQixFQUE4QjZPLFVBQTlCO0FBQ0EsYUFBS0wsaUJBQUw7QUFDRDtBQUNGOzs7K0NBRTBCdkwsTyxFQUFTO0FBQUEsb0JBQ1csS0FBS2tGLEtBRGhCO0FBQUEsVUFDMUJuSSxRQUQwQixXQUMxQkEsUUFEMEI7QUFBQSxVQUNoQjRMLHNCQURnQixXQUNoQkEsc0JBRGdCOztBQUVsQ0EsNkJBQXVCNUwsUUFBdkIsRUFBaUNpRCxPQUFqQztBQUNEOzs7NkJBRVE7QUFBQTs7QUFBQSxVQUNDaEQsUUFERCxHQUNjLHVEQURkLENBQ0NBLFFBREQ7QUFBQSxvQkFFeUIsS0FBS2tJLEtBRjlCO0FBQUEsVUFFQ3hELE9BRkQsV0FFQ0EsT0FGRDtBQUFBLGtDQUVVTyxLQUZWO0FBQUEsVUFFVUEsS0FGVixpQ0FFa0IsRUFGbEI7QUFBQSxtQkFHcUMsS0FBS1IsS0FIMUM7QUFBQSxVQUdDbUssVUFIRCxVQUdDQSxVQUhEO0FBQUEsVUFHYUksbUJBSGIsVUFHYUEsbUJBSGI7OztBQUtQLFVBQU1DLHdCQUF3QmhLLE1BQU0wRSxHQUFOLENBQVUsVUFBQy9KLElBQUQsRUFBVTtBQUNoRCxZQUFNaUYsU0FBU0gsUUFBUTlFLEtBQUtDLFFBQWIsS0FBMEIsRUFBekM7O0FBRUEsZUFDRSw0REFBQyxzRUFBRDtBQUNFLGdCQUFNRCxJQURSO0FBRUUsa0JBQVFpRixNQUZWO0FBR0Usb0JBQVUsT0FBSzZKLDBCQUhqQjtBQUlFLGVBQUsxTyxTQUFTSixJQUFUO0FBSlAsVUFERjtBQVFELE9BWDZCLENBQTlCOztBQWFBLGFBQ0U7QUFBQTtBQUFBLFVBQUksV0FBVSw2QkFBZDtBQUNHcVAsNkJBREg7QUFFRTtBQUFBO0FBQUEsWUFBSSxXQUFVLDRCQUFkO0FBQ0U7QUFBQTtBQUFBO0FBQ0Usb0JBQUssUUFEUDtBQUVFLHlCQUFVLHdCQUZaO0FBR0UsdUJBQVMsS0FBS1Y7QUFIaEI7QUFLRSxrRkFBTSxXQUFVLDBCQUFoQixHQUxGO0FBQUE7QUFBQSxXQURGO0FBU0U7QUFBQyw2REFBRDtBQUFBLGNBQU8sUUFBUSxLQUFLOUosS0FBTCxDQUFXa0ssU0FBMUIsRUFBcUMsUUFBUSxLQUFLSixpQkFBbEQsRUFBcUUsV0FBVSxFQUEvRTtBQUNFO0FBQUMscUVBQUQ7QUFBQSxnQkFBYSxRQUFRLEtBQUtBLGlCQUExQjtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUMsbUVBQUQ7QUFBQTtBQUNFLDBFQUFDLGtFQUFEO0FBQ0UseUJBQVM3SixPQURYO0FBRUUsc0JBQU1rSyxVQUZSO0FBR0UsMkJBQVdJLG1CQUhiO0FBSUUsMEJBQVUsS0FBS1I7QUFKakI7QUFERixhQUZGO0FBVUU7QUFBQyxxRUFBRDtBQUFBO0FBQ0U7QUFBQyxrRUFBRDtBQUFBLGtCQUFRLE9BQU0sV0FBZCxFQUEwQixTQUFTLEtBQUtELGlCQUF4QztBQUFBO0FBQUEsZUFERjtBQUM2RSxpQkFEN0U7QUFFRTtBQUFDLGtFQUFEO0FBQUEsa0JBQVEsT0FBTSxTQUFkLEVBQXdCLFNBQVMsS0FBS0UsdUJBQXRDO0FBQUE7QUFBQTtBQUZGO0FBVkY7QUFURjtBQUZGLE9BREY7QUErQkQ7Ozs7RUFuRzZCLDZDQUFBcEcsQ0FBTWhGLFM7O0FBc0d0Q2lMLGtCQUFrQmhHLFNBQWxCLEdBQThCO0FBQzVCNUQsV0FBUyxrREFBQTZELENBQVVDLFFBQVYsQ0FBbUIsa0RBQUFELENBQVVFLEdBQTdCLEVBQWtDQyxVQURmO0FBRTVCM0ksWUFBVSxrREFBQXdJLENBQVV0SSxNQUFWLENBQWlCeUksVUFGQztBQUc1QnpELFNBQU8sa0RBQUFzRCxDQUFVTSxPQUFWLENBQ0wsa0RBQUFOLENBQVVJLEtBQVYsQ0FBZ0I7QUFDZDlJLGNBQVUsa0RBQUEwSSxDQUFVdUIsTUFETjtBQUVkaEssWUFBUSxrREFBQXlJLENBQVV0STtBQUZKLEdBQWhCLENBREssQ0FIcUI7QUFTNUJ5TCx1QkFBcUIsa0RBQUFuRCxDQUFVTyxJQUFWLENBQWVKLFVBVFI7QUFVNUJpRCwwQkFBd0Isa0RBQUFwRCxDQUFVTyxJQUFWLENBQWVKO0FBVlgsQ0FBOUI7O0FBYUE0RixrQkFBa0JyRSxZQUFsQixHQUFpQztBQUMvQmhGLFNBQU87QUFEd0IsQ0FBakM7O0FBSUEseURBQWVxSixpQkFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNySUE7QUFDQTtBQUNBOztJQUdNWSxvQjs7O0FBQ0osZ0NBQVloSCxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsNElBQ1hBLEtBRFc7O0FBR2pCLFVBQUtpSCxpQkFBTCxHQUF5QixNQUFLQSxpQkFBTCxDQUF1QnpCLElBQXZCLE9BQXpCO0FBSGlCO0FBSWxCOzs7O3dDQUVtQjtBQUFBLFVBQ1YxTixRQURVLEdBQ0csdURBREgsQ0FDVkEsUUFEVTtBQUFBLG1CQUVTLEtBQUtrSSxLQUZkO0FBQUEsVUFFVnRJLElBRlUsVUFFVkEsSUFGVTtBQUFBLFVBRUp3UCxRQUZJLFVBRUpBLFFBRkk7OztBQUlsQkEsZUFBU3BQLFNBQVNKLElBQVQsQ0FBVDtBQUNEOzs7NkJBRVE7QUFBQSxVQUNDSSxRQURELEdBQytCLHVEQUQvQixDQUNDQSxRQUREO0FBQUEsVUFDV3FQLGVBRFgsR0FDK0IsdURBRC9CLENBQ1dBLGVBRFg7QUFBQSxvQkFFa0IsS0FBS25ILEtBRnZCO0FBQUEsVUFFQ3RJLElBRkQsV0FFQ0EsSUFGRDtBQUFBLFVBRU9pRixNQUZQLFdBRU9BLE1BRlA7QUFBQSx5QkFHaUJqRixJQUhqQixDQUdDd0YsTUFIRDtBQUFBLFVBR0NBLE1BSEQsZ0NBR1UsRUFIVjs7O0FBS1AsVUFBTWtLLGtCQUFrQjtBQUN0QnBDLGVBQU8sTUFEZTtBQUV0QkwsZ0JBQVEsTUFGYztBQUd0QjBDLHlCQUFpQm5LLE9BQU9tRztBQUhGLE9BQXhCOztBQU1BLGFBQ0U7QUFBQTtBQUFBLFVBQUksV0FBVSxpQkFBZCxFQUFnQyxLQUFLdkwsU0FBU0osSUFBVCxDQUFyQztBQUNFO0FBQUE7QUFBQSxZQUFLLFdBQVUsS0FBZjtBQUNFLCtFQUFLLFdBQVUsVUFBZixFQUEwQixPQUFPMFAsZUFBakMsR0FERjtBQUVFO0FBQUE7QUFBQSxjQUFLLFdBQVUsVUFBZjtBQUEyQkQsNEJBQWdCeEssT0FBT2tGLFFBQXZCLEVBQWlDLEVBQWpDO0FBQTNCLFdBRkY7QUFHRTtBQUFBO0FBQUEsY0FBSyxXQUFVLFVBQWY7QUFBMkJuSyxpQkFBS0U7QUFBaEMsV0FIRjtBQUlFO0FBQUE7QUFBQSxjQUFLLFdBQVUsVUFBZjtBQUNFO0FBQUE7QUFBQTtBQUNFLHNCQUFLLFFBRFA7QUFFRSwyQkFBVSxPQUZaO0FBR0UsOEJBQVcsT0FIYjtBQUlFLHlCQUFTLEtBQUtxUDtBQUpoQjtBQU1FO0FBQUE7QUFBQSxrQkFBTSxlQUFZLE1BQWxCO0FBQUE7QUFBQTtBQU5GO0FBREY7QUFKRjtBQURGLE9BREY7QUFvQkQ7Ozs7RUE3Q2dDLDZDQUFBOUcsQ0FBTWhGLFM7O0FBZ0R6QzZMLHFCQUFxQjVHLFNBQXJCLEdBQWlDO0FBQy9CMUksUUFBTSxrREFBQTJJLENBQVVJLEtBQVYsQ0FBZ0I7QUFDcEI5SSxjQUFVLGtEQUFBMEksQ0FBVXVCLE1BREE7QUFFcEJoSyxZQUFRLGtEQUFBeUksQ0FBVXRJO0FBRkUsR0FBaEIsRUFHSHlJLFVBSjRCO0FBSy9CN0QsVUFBUSxrREFBQTBELENBQVVJLEtBQVYsQ0FBZ0I7QUFDdEI3RCxRQUFJLGtEQUFBeUQsQ0FBVXVCLE1BRFE7QUFFdEJDLGNBQVUsa0RBQUF4QixDQUFVdEksTUFGRTtBQUd0QmdKLFVBQU0sa0RBQUFWLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVVFLEdBQTVCLENBSGdCO0FBSXRCdUIsVUFBTSxrREFBQXpCLENBQVVNLE9BQVYsQ0FBa0Isa0RBQUFOLENBQVVFLEdBQTVCO0FBSmdCLEdBQWhCLEVBS0xDLFVBVjRCO0FBVy9CMEcsWUFBVSxrREFBQTdHLENBQVVPO0FBWFcsQ0FBakM7O0FBY0FvRyxxQkFBcUJqRixZQUFyQixHQUFvQztBQUNsQ21GLFlBQVUsb0JBQU0sQ0FBRTtBQURnQixDQUFwQzs7QUFJQSx5REFBZUYsb0JBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUNBO0FBQ0E7O0FBR0EsSUFBTU0sY0FBYyxDQUFDLENBQXJCO0FBQ0EsSUFBTUMsZUFBZSxFQUFyQjs7QUFFQSxJQUFNQyxhQUFhLFNBQWJBLFVBQWEsR0FBaUI7QUFBQSxNQUFoQjdLLE1BQWdCLHVFQUFQLEVBQU87QUFBQSxxQkFDWkEsTUFEWSxDQUMxQm1GLElBRDBCO0FBQUEsTUFDMUJBLElBRDBCLGdDQUNuQixFQURtQjs7QUFFbEMsTUFBTTJGLFlBQVksRUFBbEI7QUFDQTNGLE9BQUtwRixPQUFMLENBQWEsVUFBQzhILEdBQUQsRUFBUztBQUFBLHdCQUNNQSxHQUROLENBQ1pwQyxRQURZO0FBQUEsUUFDWkEsUUFEWSxpQ0FDRCxFQURDOztBQUVwQkEsYUFBUzFGLE9BQVQsQ0FBaUIsVUFBQzJGLE9BQUQsRUFBYTtBQUM1Qm9GLGdCQUFVcEYsUUFBUS9FLEdBQWxCLElBQXlCLElBQXpCO0FBQ0QsS0FGRDtBQUdELEdBTEQ7QUFNQSxTQUFPRSxPQUFPcUIsSUFBUCxDQUFZNEksU0FBWixDQUFQO0FBQ0QsQ0FWRDs7QUFZQSxJQUFNQywwQkFBMEIsU0FBMUJBLHVCQUEwQjtBQUFBLE1BQUNsTCxPQUFELHVFQUFXLEVBQVg7QUFBQSxVQUM5QjtBQUFBO0FBQUEsTUFBUSxPQUFPOEssV0FBZixFQUE0QixLQUFLQSxXQUFqQyxFQUE4QyxjQUE5QztBQUFBO0FBQUEsR0FEOEIsNEJBRTNCOUosT0FBT3FCLElBQVAsQ0FBWXJDLE9BQVosRUFBcUJpRixHQUFyQixDQUF5QixVQUFDOUosUUFBRCxFQUFjO0FBQ3hDLFFBQU1nRixTQUFTSCxRQUFRN0UsUUFBUixDQUFmO0FBQ0EsV0FDRTtBQUFBO0FBQUEsUUFBUSxPQUFPZ0YsT0FBT0MsRUFBdEIsRUFBMEIsS0FBS0QsT0FBT0MsRUFBdEM7QUFBMkNELGFBQU9DLEVBQWxEO0FBQUE7QUFBd0RELGFBQU9rRjtBQUEvRCxLQURGO0FBR0QsR0FMRSxDQUYyQjtBQUFBLENBQWhDOztBQVVBLElBQU04RiwwQkFBMEIsU0FBMUJBLHVCQUEwQixHQUFpQjtBQUFBLE1BQWhCaEwsTUFBZ0IsdUVBQVAsRUFBTzs7QUFDL0MsTUFBTWlMLFVBQVVKLFdBQVc3SyxNQUFYLENBQWhCO0FBQ0EsVUFDRTtBQUFBO0FBQUEsTUFBUSxPQUFPNEssWUFBZixFQUE2QixLQUFLQSxZQUFsQyxFQUFnRCxjQUFoRDtBQUFBO0FBQUEsR0FERiw0QkFFS0ssUUFBUW5HLEdBQVIsQ0FBWSxVQUFDN0osTUFBRDtBQUFBLFdBQ2I7QUFBQTtBQUFBLFFBQVEsT0FBT0EsTUFBZixFQUF1QixLQUFLQSxNQUE1QjtBQUFxQ0E7QUFBckMsS0FEYTtBQUFBLEdBQVosQ0FGTDtBQU1ELENBUkQ7O0lBVU1pUSxnQjs7O0FBQ0osOEJBQWM7QUFBQTs7QUFBQTs7QUFHWixVQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QnRDLElBQXhCLE9BQTFCO0FBQ0EsVUFBS3VDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCdkMsSUFBeEIsT0FBMUI7O0FBRUEsVUFBS2pKLEtBQUwsR0FBYTtBQUNYeUwsaUJBQVc7QUFEQSxLQUFiO0FBTlk7QUFTYjs7Ozt1Q0FFa0J0SSxDLEVBQUc7QUFBQSxtQkFDTyxLQUFLTSxLQURaO0FBQUEsVUFDWnRJLElBRFksVUFDWkEsSUFEWTtBQUFBLFVBQ05vTyxRQURNLFVBQ05BLFFBRE07O0FBRXBCLFVBQU1tQyxjQUFjQyxTQUFTeEksRUFBRXNHLE1BQUYsQ0FBU3JJLEtBQWxCLEVBQXlCLEVBQXpCLENBQXBCO0FBQ0FtSSw0QkFBY3BPLElBQWQsSUFBb0JDLFVBQVVzUSxXQUE5QjtBQUNEOzs7dUNBRWtCdkksQyxFQUFHO0FBQUEsb0JBQ08sS0FBS00sS0FEWjtBQUFBLFVBQ1p0SSxJQURZLFdBQ1pBLElBRFk7QUFBQSxVQUNOb08sUUFETSxXQUNOQSxRQURNOztBQUVwQixVQUFNcUMsWUFBWXpJLEVBQUVzRyxNQUFGLENBQVNySSxLQUEzQjtBQUNBbUksNEJBQWNwTyxJQUFkLElBQW9CRSxRQUFRdVEsU0FBNUI7QUFDRDs7OzZCQUVRO0FBQUEsb0JBQzJDLEtBQUtuSSxLQURoRDtBQUFBLFVBQ0N4RCxPQURELFdBQ0NBLE9BREQ7QUFBQSxpQ0FDVTlFLElBRFY7QUFBQSxVQUNVQSxJQURWLGdDQUNpQixFQURqQjtBQUFBLHNDQUNxQnNRLFNBRHJCO0FBQUEsVUFDcUJBLFNBRHJCLHFDQUNpQyxLQURqQztBQUFBLDJCQUVnRXRRLElBRmhFLENBRUNDLFFBRkQ7QUFBQSxVQUVDQSxRQUZELGtDQUVZMlAsV0FGWjtBQUFBLHlCQUVnRTVQLElBRmhFLENBRXlCRSxNQUZ6QjtBQUFBLFVBRXlCQSxNQUZ6QixnQ0FFa0MyUCxZQUZsQztBQUFBLHlCQUVnRTdQLElBRmhFLENBRWdEd0YsTUFGaEQ7QUFBQSxVQUVnREEsTUFGaEQsZ0NBRXlELEVBRnpEOztBQUdQLFVBQU1QLFNBQVNILFFBQVE3RSxRQUFSLEtBQXFCLEVBQXBDO0FBQ0EsVUFBTTBMLFFBQVFuRyxPQUFPbUcsS0FBckI7O0FBRUEsVUFBTStELGtCQUFrQjtBQUN0QkMseUJBQWlCaEU7QUFESyxPQUF4Qjs7QUFJQSxVQUFNK0Usb0JBQW9CVix3QkFBd0JsTCxPQUF4QixDQUExQjtBQUNBLFVBQU02TCxvQkFBb0JWLHdCQUF3QmhMLE1BQXhCLENBQTFCOztBQUVBLGFBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxtQkFBZjtBQUNFO0FBQUMsMERBQUQ7QUFBQTtBQUNFO0FBQUMsaUVBQUQ7QUFBQTtBQUNFO0FBQUMsK0RBQUQ7QUFBQTtBQUFBO0FBQUEsYUFERjtBQUVFO0FBQUE7QUFBQSxnQkFBSyxPQUFPeUssZUFBWjtBQUE4Qi9EO0FBQTlCO0FBRkYsV0FERjtBQUtFO0FBQUMsaUVBQUQ7QUFBQTtBQUNFO0FBQUMsK0RBQUQ7QUFBQSxnQkFBTyxPQUFJLGlDQUFYO0FBQUE7QUFBQSxhQURGO0FBQzZELG1GQUQ3RDtBQUVFO0FBQUE7QUFBQTtBQUNFLDJCQUFVLGNBRFo7QUFFRSxzQkFBSyxRQUZQO0FBR0Usc0JBQUssUUFIUDtBQUlFLG9CQUFHLGlDQUpMO0FBS0UsdUJBQU8xTCxRQUxUO0FBTUUsMEJBQVUsS0FBS21RO0FBTmpCO0FBUUdNO0FBUkgsYUFGRjtBQVlFO0FBQUMsa0VBQUQ7QUFBQSxnQkFBVSxXQUFVLGFBQXBCLEVBQWtDLFFBQVEsQ0FBQ0osU0FBRCxJQUFjclEsYUFBYTJQLFdBQXJFO0FBQUE7QUFBQTtBQVpGLFdBTEY7QUFxQkU7QUFBQyxpRUFBRDtBQUFBO0FBQ0U7QUFBQywrREFBRDtBQUFBLGdCQUFPLE9BQUksa0NBQVg7QUFBQTtBQUFBLGFBREY7QUFDK0QsbUZBRC9EO0FBRUU7QUFBQTtBQUFBO0FBQ0UsMkJBQVUsY0FEWjtBQUVFLHNCQUFLLFFBRlA7QUFHRSxzQkFBSyxRQUhQO0FBSUUsb0JBQUcsa0NBSkw7QUFLRSx1QkFBTzFQLE1BTFQ7QUFNRSwwQkFBVUQsYUFBYTJQLFdBTnpCO0FBT0UsMEJBQVUsS0FBS1M7QUFQakI7QUFTR007QUFUSCxhQUZGO0FBYUU7QUFBQyxrRUFBRDtBQUFBLGdCQUFVLFdBQVUsYUFBcEIsRUFBa0MsUUFBUSxDQUFDTCxTQUFELElBQWNwUSxXQUFXMlAsWUFBbkU7QUFBQTtBQUFBO0FBYkY7QUFyQkY7QUFERixPQURGO0FBMkNEOzs7O0VBaEY0Qiw2Q0FBQXBILENBQU1oRixTOztBQW1GckMwTSxpQkFBaUJ6SCxTQUFqQixHQUE2QjtBQUMzQjVELFdBQVMsa0RBQUE2RCxDQUFVQyxRQUFWLENBQW1CLGtEQUFBRCxDQUFVRSxHQUE3QixFQUFrQ0MsVUFEaEI7QUFFM0I5SSxRQUFNLGtEQUFBMkksQ0FBVUksS0FBVixDQUFnQjtBQUNwQjlJLGNBQVUsa0RBQUEwSSxDQUFVdUIsTUFEQTtBQUVwQmhLLFlBQVEsa0RBQUF5SSxDQUFVdEksTUFGRTtBQUdwQm1GLFlBQVEsa0RBQUFtRCxDQUFVSSxLQUFWLENBQWdCO0FBQ3RCNEMsYUFBTyxrREFBQWhELENBQVV0STtBQURLLEtBQWhCO0FBSFksR0FBaEIsQ0FGcUI7QUFTM0JpUSxhQUFXLGtEQUFBM0gsQ0FBVWlJLElBVE07QUFVM0J4QyxZQUFVLGtEQUFBekYsQ0FBVU87QUFWTyxDQUE3Qjs7QUFhQWlILGlCQUFpQjlGLFlBQWpCLEdBQWdDO0FBQzlCckssUUFBTSxFQUR3QjtBQUU5QnNRLGFBQVcsS0FGbUI7QUFHOUJsQyxZQUFVLG9CQUFNLENBQUU7QUFIWSxDQUFoQzs7QUFNQSx5REFBZStCLGdCQUFmLEUiLCJmaWxlIjoiY2hhaW5lcl91aS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFV0aWxzIHtcbiAgc3RhdGljIGxpbmUya2V5KGxpbmUpIHtcbiAgICByZXR1cm4gYCR7bGluZS5yZXN1bHRJZH1fJHtsaW5lLmxvZ0tleX1gO1xuICB9XG5cbiAgc3RhdGljIGxpbmUyZGF0YUtleShsaW5lLCBheGlzTmFtZSkge1xuICAgIHJldHVybiBgJHtheGlzTmFtZX1fJHtVdGlscy5saW5lMmtleShsaW5lKX1gO1xuICB9XG5cbiAgc3RhdGljIHRydW5jYXRlRm9yd2FyZChzdHJpbmcsIGxlbmd0aCwgYmVnaW5uaW5nID0gJy4uLicpIHtcbiAgICBjb25zdCBzdHIgPSBzdHJpbmcgfHwgJyc7XG4gICAgaWYgKHN0ci5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBiZWdpbm5pbmcgKyBzdHIuc3Vic3RyaW5nKChzdHIubGVuZ3RoIC0gbGVuZ3RoKSArIGJlZ2lubmluZy5sZW5ndGgsIHN0ci5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFV0aWxzO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvaW5kZXguanMiLCJjb25zdCBBUElfUk9PVCA9ICcvYXBpL3YxLyc7XG5cbmNvbnN0IGNhbGxBcGkgPSAoZW5kcG9pbnQpID0+IHtcbiAgY29uc3QgZnVsbFVybCA9IChlbmRwb2ludC5pbmRleE9mKEFQSV9ST09UKSA9PT0gLTEpID8gQVBJX1JPT1QgKyBlbmRwb2ludCA6IGVuZHBvaW50O1xuXG4gIHJldHVybiBmZXRjaChmdWxsVXJsKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT5cbiAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKChqc29uKSA9PiB7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoanNvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICB9KVxuICAgICk7XG59O1xuXG5leHBvcnQgY29uc3QgQ0FMTF9BUEkgPSAnQ2FsbCBBUEknO1xuXG5leHBvcnQgZGVmYXVsdCAoc3RvcmUpID0+IChuZXh0KSA9PiAoYWN0aW9uKSA9PiB7XG4gIGNvbnN0IGNhbGxBUEkgPSBhY3Rpb25bQ0FMTF9BUEldO1xuICBpZiAodHlwZW9mIGNhbGxBUEkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgfVxuXG4gIGxldCB7IGVuZHBvaW50IH0gPSBjYWxsQVBJO1xuICBjb25zdCB7IHR5cGVzIH0gPSBjYWxsQVBJO1xuXG4gIGlmICh0eXBlb2YgZW5kcG9pbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBlbmRwb2ludCA9IGVuZHBvaW50KHN0b3JlLmdldFN0YXRlKCkpO1xuICB9XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KHR5cGVzKSB8fCB0eXBlcy5sZW5ndGggIT09IDMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGFuIGFycmF5IG9mIHRocmVlIGFjdGlvbiB0eXBlcy4nKTtcbiAgfVxuXG4gIGNvbnN0IGFjdGlvbldpdGggPSAoZGF0YSkgPT4ge1xuICAgIGNvbnN0IGZpbmFsQWN0aW9uID0geyAuLi5hY3Rpb24sIC4uLmRhdGEgfTtcbiAgICBkZWxldGUgZmluYWxBY3Rpb25bQ0FMTF9BUEldO1xuICAgIHJldHVybiBmaW5hbEFjdGlvbjtcbiAgfTtcblxuICBjb25zdCBbcmVxdWVzdFR5cGUsIHN1Y2Nlc3NUeXBlLCBmYWlsdXJlVHlwZV0gPSB0eXBlcztcbiAgbmV4dChhY3Rpb25XaXRoKHsgdHlwZTogcmVxdWVzdFR5cGUgfSkpO1xuXG4gIHJldHVybiBjYWxsQXBpKGVuZHBvaW50KS50aGVuKFxuICAgIChyZXNwb25zZSkgPT4gbmV4dChhY3Rpb25XaXRoKHtcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgdHlwZTogc3VjY2Vzc1R5cGVcbiAgICB9KSksXG4gICAgKGVycm9yKSA9PiBuZXh0KGFjdGlvbldpdGgoe1xuICAgICAgdHlwZTogZmFpbHVyZVR5cGUsXG4gICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCAnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCdcbiAgICB9KSlcbiAgKTtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9taWRkbGV3YXJlL2FwaS5qcyIsImltcG9ydCB7IENBTExfQVBJIH0gZnJvbSAnLi4vbWlkZGxld2FyZS9hcGknO1xuXG5cbi8vIHJlc3VsdHMgQVBJXG5cbmV4cG9ydCBjb25zdCBSRVNVTFRTX1JFUVVFU1QgPSAnUkVTVUxUU19SRVFVRVNUJztcbmV4cG9ydCBjb25zdCBSRVNVTFRTX1NVQ0NFU1MgPSAnUkVTVUxUU19TVUNDRVNTJztcbmV4cG9ydCBjb25zdCBSRVNVTFRTX0ZBSUxVRSA9ICdSRVNVTFRTX0ZBSUxVRSc7XG5cbmNvbnN0IGZldGNoUmVzdWx0cyA9ICgpID0+ICh7XG4gIFtDQUxMX0FQSV06IHtcbiAgICB0eXBlczogW1JFU1VMVFNfUkVRVUVTVCwgUkVTVUxUU19TVUNDRVNTLCBSRVNVTFRTX0ZBSUxVRV0sXG4gICAgZW5kcG9pbnQ6ICdyZXN1bHRzJ1xuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGxvYWRSZXN1bHRzID0gKCkgPT4gKGRpc3BhdGNoKSA9PiBkaXNwYXRjaChmZXRjaFJlc3VsdHMoKSk7XG5cblxuLy8gYXhpcyBjb25maWdcblxuZXhwb3J0IGNvbnN0IEFYSVNfQ09ORklHX0xJTkVfQUREID0gJ0FYSVNfQ09ORklHX0xJTkVfQUREJztcbmV4cG9ydCBjb25zdCBBWElTX0NPTkZJR19MSU5FX1JFTU9WRSA9ICdBWElTX0NPTkZJR19MSU5FX1JFTU9WRSc7XG5leHBvcnQgY29uc3QgQVhJU19DT05GSUdfU0NBTEVfVVBEQVRFID0gJ0FYSVNfQ09ORklHX1NDQUxFX1VQREFURSc7XG5cbmV4cG9ydCBjb25zdCBhZGRMaW5lVG9BeGlzID0gKGF4aXNOYW1lLCBsaW5lKSA9PiAoe1xuICB0eXBlOiBBWElTX0NPTkZJR19MSU5FX0FERCxcbiAgYXhpc05hbWUsXG4gIGxpbmVcbn0pO1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlTGluZUZyb21BeGlzID0gKGF4aXNOYW1lLCBsaW5lS2V5KSA9PiAoe1xuICB0eXBlOiBBWElTX0NPTkZJR19MSU5FX1JFTU9WRSxcbiAgYXhpc05hbWUsXG4gIGxpbmVLZXlcbn0pO1xuXG5leHBvcnQgY29uc3QgdXBkYXRlQXhpc1NjYWxlID0gKGF4aXNOYW1lLCBzY2FsZSkgPT4gKHtcbiAgdHlwZTogQVhJU19DT05GSUdfU0NBTEVfVVBEQVRFLFxuICBheGlzTmFtZSxcbiAgc2NhbGVcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FjdGlvbnMvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IEFwcENvbnRhaW5lciB9IGZyb20gJ3JlYWN0LWhvdC1sb2FkZXInO1xuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUvY29uZmlndXJlU3RvcmUnO1xuaW1wb3J0IENoYWluZXJVSUNvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcnMvQ2hhaW5lclVJQ29udGFpbmVyJztcblxuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKCk7XG5cbmNvbnN0IHJlbmRlciA9IChDb21wb25lbnQsIGFwcE5vZGUpID0+IHtcbiAgUmVhY3RET00ucmVuZGVyKFxuICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgPEFwcENvbnRhaW5lcj5cbiAgICAgICAgPENvbXBvbmVudCAvPlxuICAgICAgPC9BcHBDb250YWluZXI+XG4gICAgPC9Qcm92aWRlcj4sXG4gICAgYXBwTm9kZVxuICApO1xufTtcblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgY29uc3QgYXBwTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcE5vZGUpO1xuICByZW5kZXIoQ2hhaW5lclVJQ29udGFpbmVyLCBhcHBOb2RlKTtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vY29udGFpbmVycy9DaGFpbmVyVUlDb250YWluZXInLCAoKSA9PiB7IHJlbmRlcihDaGFpbmVyVUlDb250YWluZXIsIGFwcE5vZGUpOyB9KTtcbn0gZWxzZSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFpbmVyX3VpLXJvb3QnKTtcbiAgICBpZiAoYXBwTm9kZSkge1xuICAgICAgcmVuZGVyKENoYWluZXJVSUNvbnRhaW5lciwgYXBwTm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzeCIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnO1xuaW1wb3J0IHsgcGVyc2lzdFN0b3JlIH0gZnJvbSAncmVkdXgtcGVyc2lzdCc7XG5pbXBvcnQgeyBjcmVhdGVMb2dnZXIgfSBmcm9tICdyZWR1eC1sb2dnZXInO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9taWRkbGV3YXJlL2FwaSc7XG5pbXBvcnQgcm9vdFJlZHVjZXIgZnJvbSAnLi4vcmVkdWNlcnMnO1xuXG5jb25zdCBjb25maWd1cmVTdG9yZSA9IChwcmVsb2FkZWRTdGF0ZSkgPT4ge1xuICBjb25zdCBtaWRkbGV3YXJlID0gW3RodW5rLCBhcGksIGNyZWF0ZUxvZ2dlcigpXTtcblxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxuICAgIHJvb3RSZWR1Y2VyLFxuICAgIHByZWxvYWRlZFN0YXRlLFxuICAgIGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKVxuICApO1xuXG4gIHBlcnNpc3RTdG9yZShzdG9yZSk7XG5cbiAgcmV0dXJuIHN0b3JlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlU3RvcmU7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS9jb25maWd1cmVTdG9yZS5qcyIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCB7IHBlcnNpc3RSZWR1Y2VyIH0gZnJvbSAncmVkdXgtcGVyc2lzdCc7XG5pbXBvcnQgc3RvcmFnZSBmcm9tICdyZWR1eC1wZXJzaXN0L2VzL3N0b3JhZ2UnO1xuaW1wb3J0ICogYXMgQWN0aW9uVHlwZXMgZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5cbmNvbnN0IGVudGl0aWVzID0gKHN0YXRlID0geyByZXN1bHRzOiB7fSB9LCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuUkVTVUxUU19TVUNDRVNTOlxuICAgICAgaWYgKGFjdGlvbi5yZXNwb25zZSAmJiBhY3Rpb24ucmVzcG9uc2UucmVzdWx0cykge1xuICAgICAgICBjb25zdCByZXN1bHRzTGlzdCA9IGFjdGlvbi5yZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICBjb25zdCByZXN1bHRzID0ge307XG4gICAgICAgIHJlc3VsdHNMaXN0LmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgICAgICAgIHJlc3VsdHNbcmVzdWx0LmlkXSA9IHJlc3VsdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCByZXN1bHRzIH07XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIHN0YXRlO1xufTtcblxuY29uc3QgYXhlcyA9IChzdGF0ZSA9IHt9LCBhY3Rpb24pID0+IHtcbiAgY29uc3QgeyBsaW5lMmtleSB9ID0gVXRpbHM7XG4gIGNvbnN0IHsgYXhpc05hbWUsIGxpbmUsIGxpbmVLZXksIHNjYWxlIH0gPSBhY3Rpb247XG4gIGlmIChheGlzTmFtZSA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IGF4aXNDb25maWcgPSBzdGF0ZVtheGlzTmFtZV0gfHwgeyBheGlzTmFtZSB9O1xuICBjb25zdCB7IGxpbmVzID0gW10gfSA9IGF4aXNDb25maWc7XG5cbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuQVhJU19DT05GSUdfTElORV9BREQ6XG4gICAgICBpZiAobGluZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbYXhpc05hbWVdOiB7XG4gICAgICAgICAgLi4uYXhpc0NvbmZpZyxcbiAgICAgICAgICBsaW5lczogWy4uLmxpbmVzLCBsaW5lXVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuQVhJU19DT05GSUdfTElORV9SRU1PVkU6XG4gICAgICBpZiAobGluZUtleSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbYXhpc05hbWVdOiB7XG4gICAgICAgICAgLi4uYXhpc0NvbmZpZyxcbiAgICAgICAgICBsaW5lczogWy4uLmxpbmVzLmZpbHRlcigobCkgPT4gbGluZTJrZXkobCkgIT09IGxpbmVLZXkpXVxuICAgICAgICB9XG4gICAgICB9O1xuICAgIGNhc2UgQWN0aW9uVHlwZXMuQVhJU19DT05GSUdfU0NBTEVfVVBEQVRFOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFtheGlzTmFtZV06IHtcbiAgICAgICAgICAuLi5heGlzQ29uZmlnLFxuICAgICAgICAgIHNjYWxlXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufTtcblxuY29uc3QgY29uZmlnID0gY29tYmluZVJlZHVjZXJzKHtcbiAgYXhlc1xufSk7XG5cbmNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcbiAgZW50aXRpZXMsXG4gIGNvbmZpZzogcGVyc2lzdFJlZHVjZXIoeyBrZXk6ICdjb25maWcnLCBzdG9yYWdlIH0sIGNvbmZpZylcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3JlZHVjZXJzL2luZGV4LmpzeCIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVXZWJTdG9yYWdlID0gcmVxdWlyZSgnLi9jcmVhdGVXZWJTdG9yYWdlJyk7XG5cbnZhciBfY3JlYXRlV2ViU3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVXZWJTdG9yYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gKDAsIF9jcmVhdGVXZWJTdG9yYWdlMi5kZWZhdWx0KSgnbG9jYWwnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvcmVkdXgtcGVyc2lzdC9lcy9zdG9yYWdlL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY3JlYXRlV2ViU3RvcmFnZTtcblxudmFyIF9nZXRTdG9yYWdlID0gcmVxdWlyZSgnLi9nZXRTdG9yYWdlJyk7XG5cbnZhciBfZ2V0U3RvcmFnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRTdG9yYWdlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gY3JlYXRlV2ViU3RvcmFnZSh0eXBlKSB7XG4gIHZhciBzdG9yYWdlID0gKDAsIF9nZXRTdG9yYWdlMi5kZWZhdWx0KSh0eXBlKTtcbiAgcmV0dXJuIHtcbiAgICBnZXRJdGVtOiBmdW5jdGlvbiBnZXRJdGVtKGtleSwgY2IpIHtcbiAgICAgIHJldHVybiBjYihudWxsLCBzdG9yYWdlLmdldEl0ZW0oa2V5KSk7XG4gICAgfSxcbiAgICBzZXRJdGVtOiBmdW5jdGlvbiBzZXRJdGVtKGtleSwgaXRlbSwgY2IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNiKG51bGwsIHN0b3JhZ2Uuc2V0SXRlbShrZXksIGl0ZW0pKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjYihlcnIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtb3ZlSXRlbTogZnVuY3Rpb24gcmVtb3ZlSXRlbShrZXksIGNiKSB7XG4gICAgICByZXR1cm4gY2IobnVsbCwgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSkpO1xuICAgIH0sXG4gICAgZ2V0QWxsS2V5czogZnVuY3Rpb24gZ2V0QWxsS2V5cyhjYikge1xuICAgICAgcmV0dXJuIGNiKG51bGwsIE9iamVjdC5rZXlzKHN0b3JhZ2UpKTtcbiAgICB9XG4gIH07XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3JlZHV4LXBlcnNpc3QvZXMvc3RvcmFnZS9jcmVhdGVXZWJTdG9yYWdlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGdldFN0b3JhZ2U7XG5cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBub29wU3RvcmFnZSA9IHtcbiAgZ2V0SXRlbTogbm9vcCxcbiAgc2V0SXRlbTogbm9vcCxcbiAgcmVtb3ZlSXRlbTogbm9vcCxcbiAgZ2V0QWxsS2V5czogbm9vcFxufTtcblxuZnVuY3Rpb24gaGFzU3RvcmFnZShzdG9yYWdlVHlwZSkge1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHdpbmRvdykpICE9PSAnb2JqZWN0JyB8fCAhKHN0b3JhZ2VUeXBlIGluIHdpbmRvdykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0cnkge1xuICAgIHZhciBzdG9yYWdlID0gd2luZG93W3N0b3JhZ2VUeXBlXTtcbiAgICB2YXIgdGVzdEtleSA9ICdyZWR1eC1wZXJzaXN0ICcgKyBzdG9yYWdlVHlwZSArICcgdGVzdCc7XG4gICAgc3RvcmFnZS5zZXRJdGVtKHRlc3RLZXksICd0ZXN0Jyk7XG4gICAgc3RvcmFnZS5nZXRJdGVtKHRlc3RLZXkpO1xuICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0S2V5KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBjb25zb2xlLndhcm4oJ3JlZHV4LXBlcnNpc3QgJyArIHN0b3JhZ2VUeXBlICsgJyB0ZXN0IGZhaWxlZCwgcGVyc2lzdGVuY2Ugd2lsbCBiZSBkaXNhYmxlZC4nKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2UodHlwZSkge1xuICB2YXIgc3RvcmFnZVR5cGUgPSB0eXBlICsgJ1N0b3JhZ2UnO1xuICBpZiAoaGFzU3RvcmFnZShzdG9yYWdlVHlwZSkpIHJldHVybiB3aW5kb3dbc3RvcmFnZVR5cGVdO2Vsc2Uge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdyZWR1eC1wZXJzaXN0IGZhaWxlZCB0byBjcmVhdGUgc3luYyBzdG9yYWdlLiBmYWxsaW5nIGJhY2sgdG8gbWVtb3J5IHN0b3JhZ2UuJyk7XG4gICAgfVxuICAgIHJldHVybiBub29wU3RvcmFnZTtcbiAgfVxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9yZWR1eC1wZXJzaXN0L2VzL3N0b3JhZ2UvZ2V0U3RvcmFnZS5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7XG4gIGxvYWRSZXN1bHRzLFxuICBhZGRMaW5lVG9BeGlzLCByZW1vdmVMaW5lRnJvbUF4aXMsXG4gIHVwZGF0ZUF4aXNTY2FsZVxufSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCBFeHBlcmltZW50c1RhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvRXhwZXJpbWVudHNUYWJsZSc7XG5pbXBvcnQgTG9nVmlzdWFsaXplciBmcm9tICcuLi9jb21wb25lbnRzL0xvZ1Zpc3VhbGl6ZXInO1xuXG5cbmNvbnN0IHJlc3VsdHNMb2FkSW50ZXJ2YWwgPSA1ICogMTAwMDtcblxuY2xhc3MgQ2hhaW5lclVJQ29udGFpbmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5yZXN1bHRzTG9hZFRpbWVyID0gc2V0SW50ZXJ2YWwodGhpcy5wcm9wcy5sb2FkUmVzdWx0cywgcmVzdWx0c0xvYWRJbnRlcnZhbCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMucmVzdWx0c0xvYWRUaW1lcik7XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZUFkZChheGlzTmFtZSwgbGluZSkge1xuICAgIHRoaXMucHJvcHMuYWRkTGluZVRvQXhpcyhheGlzTmFtZSwgbGluZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHRzLCBjb25maWcsIHN0YXRzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhaW5lci11aS1jb250YWluZXJcIj5cbiAgICAgICAgPExvZ1Zpc3VhbGl6ZXJcbiAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgIHN0YXRzPXtzdGF0c31cbiAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICBvbkF4aXNDb25maWdMaW5lQWRkPXt0aGlzLnByb3BzLmFkZExpbmVUb0F4aXN9XG4gICAgICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZT17dGhpcy5wcm9wcy5yZW1vdmVMaW5lRnJvbUF4aXN9XG4gICAgICAgICAgb25BeGlzQ29uZmlnU2NhbGVVcGRhdGU9e3RoaXMucHJvcHMudXBkYXRlQXhpc1NjYWxlfVxuICAgICAgICAvPlxuICAgICAgICA8RXhwZXJpbWVudHNUYWJsZVxuICAgICAgICAgIHJlc3VsdHM9e3Jlc3VsdHN9XG4gICAgICAgICAgc3RhdHM9e3N0YXRzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5DaGFpbmVyVUlDb250YWluZXIucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgY29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4ZXM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KVxuICB9KS5pc1JlcXVpcmVkLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSksXG4gICAgYXJnS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfSkuaXNSZXF1aXJlZCxcbiAgbG9hZFJlc3VsdHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGFkZExpbmVUb0F4aXM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHJlbW92ZUxpbmVGcm9tQXhpczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgdXBkYXRlQXhpc1NjYWxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5jb25zdCBtYXBFbnRpdGllc1RvU3RhdHMgPSAoZW50aXRpZXMpID0+IHtcbiAgY29uc3QgeyByZXN1bHRzID0ge30gfSA9IGVudGl0aWVzO1xuICBjb25zdCBhcmdLZXlTZXQgPSB7fTtcbiAgT2JqZWN0LmtleXMocmVzdWx0cykuZm9yRWFjaCgocmVzdWx0SWQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICByZXN1bHQuYXJncy5mb3JFYWNoKChhcmcpID0+IHsgYXJnS2V5U2V0W2FyZy5rZXldID0gdHJ1ZTsgfSk7XG4gIH0pO1xuICBjb25zdCBhcmdLZXlzID0gT2JqZWN0LmtleXMoYXJnS2V5U2V0KTtcblxuICBjb25zdCBheGVzID0ge1xuICAgIHhBeGlzOiB7fSxcbiAgICB5TGVmdEF4aXM6IHt9LFxuICAgIHlSaWdodEF4aXM6IHt9XG4gIH07XG5cbiAgcmV0dXJuIHsgYXhlcywgYXJnS2V5cyB9O1xufTtcblxuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgYXhlczoge31cbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSkgPT4ge1xuICBjb25zdCB7XG4gICAgZW50aXRpZXMsXG4gICAgY29uZmlnID0gZGVmYXVsdENvbmZpZ1xuICB9ID0gc3RhdGU7XG4gIGNvbnN0IHsgcmVzdWx0cyA9IHt9IH0gPSBlbnRpdGllcztcbiAgY29uc3Qgc3RhdHMgPSBtYXBFbnRpdGllc1RvU3RhdHMoZW50aXRpZXMpO1xuICByZXR1cm4geyByZXN1bHRzLCBjb25maWcsIHN0YXRzIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywge1xuICBsb2FkUmVzdWx0cyxcbiAgYWRkTGluZVRvQXhpcyxcbiAgcmVtb3ZlTGluZUZyb21BeGlzLFxuICB1cGRhdGVBeGlzU2NhbGVcbn0pKENoYWluZXJVSUNvbnRhaW5lcik7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZXN1bHRSb3cgZnJvbSAnLi9SZXN1bHRSb3cnO1xuXG5cbmNvbnN0IEV4cGVyaW1lbnRzVGFibGUgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZXN1bHRzID0ge30sIHN0YXRzIH0gPSBwcm9wcztcbiAgY29uc3QgeyBhcmdLZXlzIH0gPSBzdGF0cztcblxuICBjb25zdCBhcmdIZWFkZXJFbGVtcyA9IGFyZ0tleXMubWFwKChhcmdLZXkpID0+ICg8dGgga2V5PXtgYXJncy0ke2FyZ0tleX1gfT48c3BhbiBjbGFzc05hbWU9XCJnbHlwaGljb24gZ2x5cGhpY29uLWNvZ1wiIC8+e2FyZ0tleX08L3RoPikpO1xuXG4gIGNvbnN0IHJlc3VsdFJvd0VsZW1zID0gT2JqZWN0LmtleXMocmVzdWx0cykubWFwKChyZXN1bHRJZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbcmVzdWx0SWRdO1xuICAgIGNvbnN0IGtleSA9IGByZXN1bHQtcm93LSR7cmVzdWx0LmlkfWA7XG4gICAgcmV0dXJuIChcbiAgICAgIDxSZXN1bHRSb3dcbiAgICAgICAgcmVzdWx0PXtyZXN1bHR9XG4gICAgICAgIHN0YXRzPXtzdGF0c31cbiAgICAgICAga2V5PXtrZXl9XG4gICAgICAvPlxuICAgICk7XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlIHRhYmxlLWhvdmVyXCI+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+aWQ8L3RoPlxuICAgICAgICAgIDx0aD5wYXRoIG5hbWU8L3RoPlxuICAgICAgICAgIDx0aD5lcG9jaDwvdGg+XG4gICAgICAgICAgPHRoPml0ZXJhdGlvbjwvdGg+XG4gICAgICAgICAgPHRoPmVsYXBzZWRfdGltZTwvdGg+XG4gICAgICAgICAge2FyZ0hlYWRlckVsZW1zfVxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAge3Jlc3VsdFJvd0VsZW1zfVxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICApO1xufTtcblxuRXhwZXJpbWVudHNUYWJsZS5wcm9wVHlwZXMgPSB7XG4gIHJlc3VsdHM6IFByb3BUeXBlcy5vYmplY3RPZihcbiAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBwYXRoTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgICB9KVxuICApLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBhcmdLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9KVxufTtcbkV4cGVyaW1lbnRzVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICByZXN1bHRzOiB7fSxcbiAgc3RhdHM6IHtcbiAgICBhcmdLZXlzOiBbXVxuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlcmltZW50c1RhYmxlO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9FeHBlcmltZW50c1RhYmxlLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5cbmNvbnN0IGVtcHR5U3RyID0gJy0nO1xuXG5jb25zdCBSZXN1bHRSb3cgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyByZXN1bHQsIHN0YXRzIH0gPSBwcm9wcztcbiAgY29uc3QgeyBhcmdzLCBsb2dzIH0gPSByZXN1bHQ7XG5cbiAgY29uc3QgbGFzdExvZyA9IGxvZ3NbbG9ncy5sZW5ndGggLSAxXSB8fCB7fTtcbiAgY29uc3QgbGFzdExvZ0RpY3QgPSB7fTtcbiAgbGFzdExvZy5sb2dJdGVtcy5mb3JFYWNoKChsb2dJdGVtKSA9PiB7IGxhc3RMb2dEaWN0W2xvZ0l0ZW0ua2V5XSA9IGxvZ0l0ZW0udmFsdWU7IH0pO1xuXG4gIGNvbnN0IGFyZ0RpY3QgPSB7fTtcbiAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICBhcmdEaWN0W2FyZy5rZXldID0gYXJnLnZhbHVlO1xuICB9KTtcbiAgY29uc3QgYXJnRWxlbXMgPSBzdGF0cy5hcmdLZXlzLm1hcCgoYXJnS2V5KSA9PiB7XG4gICAgY29uc3QgY29udGVudCA9IChhcmdLZXkgaW4gYXJnRGljdCkgPyBhcmdEaWN0W2FyZ0tleV0gOiBlbXB0eVN0cjtcbiAgICByZXR1cm4gKDx0ZCBrZXk9e2BhcmdzLSR7YXJnS2V5fWB9Pntjb250ZW50fTwvdGQ+KTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8dHI+XG4gICAgICA8dGQ+e3Jlc3VsdC5pZH08L3RkPlxuICAgICAgPHRkPntyZXN1bHQucGF0aE5hbWV9PC90ZD5cbiAgICAgIDx0ZD57bGFzdExvZ0RpY3QuZXBvY2h9PC90ZD5cbiAgICAgIDx0ZD57bGFzdExvZ0RpY3QuaXRlcmF0aW9ufTwvdGQ+XG4gICAgICA8dGQ+e2xhc3RMb2dEaWN0LmVsYXBzZWRfdGltZX08L3RkPlxuICAgICAge2FyZ0VsZW1zfVxuICAgIDwvdHI+XG4gICk7XG59O1xuXG5SZXN1bHRSb3cucHJvcFR5cGVzID0ge1xuICByZXN1bHQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgcGF0aE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgc3RhdHM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgYXJnS2V5czogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfSlcbn07XG5cblJlc3VsdFJvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIHN0YXRzOiB7XG4gICAgYXJnS2V5czogW11cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0Um93O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9SZXN1bHRSb3cuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge1xuICBMaW5lQ2hhcnQsXG4gIExpbmUsXG4gIFhBeGlzLFxuICBZQXhpcyxcbiAgQ2FydGVzaWFuR3JpZCxcbiAgVG9vbHRpcCxcbiAgTGVnZW5kXG59IGZyb20gJ3JlY2hhcnRzJztcbmltcG9ydCB7IFJhbmdlIH0gZnJvbSAncmMtc2xpZGVyJztcbmltcG9ydCAncmMtc2xpZGVyL2Fzc2V0cy9pbmRleC5jc3MnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCBBeGlzQ29uZmlndXJhdG9yIGZyb20gJy4vQXhpc0NvbmZpZ3VyYXRvcic7XG5pbXBvcnQgTGluZXNDb25maWd1cmF0b3IgZnJvbSAnLi9MaW5lc0NvbmZpZ3VyYXRvcic7XG5cblxuY29uc3Qgc2xpZGVyU3RlcHMgPSAxMDAuMDtcbmNvbnN0IGRlZmF1bHRTdGF0cyA9IHtcbiAgYXhlczoge1xuICAgIHhBeGlzOiB7fSxcbiAgICB5TGVmdEF4aXM6IHt9LFxuICAgIHlSaWdodEF4aXM6IHt9XG4gIH1cbn07XG5cbmNvbnN0IGRlZmF1bHRSYW5nZSA9IFswLCAxMDBdO1xuY29uc3QgZGVmYXVsdFhBeGlzQ29uZmlnID0ge1xuICBheGlzTmFtZTogJ3hBeGlzJyxcbiAgeEF4aXNLZXk6ICdlcG9jaCcsXG4gIHNjYWxlOiAnbGluZWFyJyxcbiAgcmFuZ2U6IGRlZmF1bHRSYW5nZVxufTtcbmNvbnN0IGRlZmF1bHRZQXhpc0NvbmZpZyA9IHtcbiAgYXhpc05hbWU6ICcnLFxuICBzY2FsZTogJ2xpbmVhcicsXG4gIHJhbmdlOiBkZWZhdWx0UmFuZ2UsXG4gIGxpbmVzOiBbXVxufTtcbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIGF4ZXM6IHtcbiAgICB4QXhpczogZGVmYXVsdFhBeGlzQ29uZmlnLFxuICAgIHlMZWZ0QXhpczogeyAuLi5kZWZhdWx0WUF4aXNDb25maWcsIGF4aXNOYW1lOiAneUxlZnRBeGlzJyB9LFxuICAgIHlSaWdodEF4aXM6IHsgLi4uZGVmYXVsdFlBeGlzQ29uZmlnLCBheGlzTmFtZTogJ3lSaWdodEF4aXMnIH1cbiAgfVxufTtcblxuY29uc3QgYnVpbGRMaW5lRWxlbSA9IChsaW5lLCBheGlzTmFtZSkgPT4ge1xuICBjb25zdCB7IGNvbmZpZyA9IHt9IH0gPSBsaW5lO1xuICBjb25zdCB7IGxpbmUya2V5LCBsaW5lMmRhdGFLZXkgfSA9IFV0aWxzO1xuXG4gIHJldHVybiAoXG4gICAgPExpbmVcbiAgICAgIHR5cGU9XCJsaW5lYXJcIlxuICAgICAgbmFtZT17bGluZTJrZXkobGluZSl9XG4gICAgICBkYXRhS2V5PXtsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpfVxuICAgICAgeUF4aXNJZD17YXhpc05hbWV9XG4gICAgICBzdHJva2U9e2NvbmZpZy5jb2xvcn1cbiAgICAgIGNvbm5lY3ROdWxsc1xuICAgICAgaXNBbmltYXRpb25BY3RpdmU9e2ZhbHNlfVxuICAgICAga2V5PXtsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpfVxuICAgIC8+XG4gICk7XG59O1xuXG5jb25zdCBidWlsZExpbmVFbGVtcyA9IChheGlzTmFtZSwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IGF4aXNDb25maWcgPSBjb25maWcuYXhlc1theGlzTmFtZV0gfHwge307XG4gIGNvbnN0IHsgbGluZXMgPSBbXSB9ID0gYXhpc0NvbmZpZztcbiAgcmV0dXJuIGxpbmVzLm1hcCgobGluZSkgPT4gYnVpbGRMaW5lRWxlbShsaW5lLCBheGlzTmFtZSkpO1xufTtcblxuY2xhc3MgTG9nVmlzdWFsaXplciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGluZTJkYXRhS2V5IH0gPSBVdGlscztcbiAgICBjb25zdCB7XG4gICAgICByZXN1bHRzID0ge30sXG4gICAgICBzdGF0cyA9IGRlZmF1bHRTdGF0cyxcbiAgICAgIGNvbmZpZyA9IGRlZmF1bHRDb25maWcsXG4gICAgICBvbkF4aXNDb25maWdMaW5lQWRkLFxuICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZSxcbiAgICAgIG9uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgeEF4aXMgPSB7IGF4aXNOYW1lOiAneEF4aXMnIH0sXG4gICAgICB5TGVmdEF4aXMgPSB7IGF4aXNOYW1lOiAneUxlZnRBeGlzJyB9LFxuICAgICAgeVJpZ2h0QXhpcyA9IHsgYXhpc05hbWU6ICd5UmlnaHRBeGlzJyB9XG4gICAgfSA9IGNvbmZpZy5heGVzO1xuICAgIGNvbnN0IHsgeEF4aXNLZXkgPSAnZXBvY2gnIH0gPSB4QXhpcztcbiAgICBjb25zdCBsZWZ0TGluZXMgPSB5TGVmdEF4aXMubGluZXMgfHwgW107XG4gICAgY29uc3QgcmlnaHRMaW5lcyA9IHlSaWdodEF4aXMubGluZXMgfHwgW107XG4gICAgY29uc3QgYXhpc0xpbmVzID0ge1xuICAgICAgeUxlZnRBeGlzOiBsZWZ0TGluZXMsXG4gICAgICB5UmlnaHRBeGlzOiByaWdodExpbmVzXG4gICAgfTtcbiAgICBjb25zdCB4UmFuZ2UgPSB4QXhpcy5yYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeUxlZnRSYW5nZSA9IHlMZWZ0QXhpcy5yYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeVJpZ2h0UmFuZ2UgPSB5UmlnaHRBeGlzLnJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB4VmFsdWVSYW5nZSA9IHN0YXRzLmF4ZXMueEF4aXMudmFsdWVSYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeUxlZnRWYWx1ZVJhbmdlID0gc3RhdHMuYXhlcy55TGVmdEF4aXMudmFsdWVSYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeVJpZ2h0VmFsdWVSYW5nZSA9IHN0YXRzLmF4ZXMueVJpZ2h0QXhpcy52YWx1ZVJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcblxuICAgIGNvbnN0IGNoYXJ0V2lkdGggPSA2NDA7XG4gICAgY29uc3QgY2hhcnRIZWlnaHQgPSAzNjA7XG5cbiAgICBjb25zdCBkYXRhRGljdCA9IHt9OyAvLyBleC4gMTogeyBlcG9jaDogMSwgMTJfbWFpbl9sb3NzOiAwLjAxMSwgLi4uIH1cbiAgICBPYmplY3Qua2V5cyhheGlzTGluZXMpLmZvckVhY2goKGF4aXNOYW1lKSA9PiB7XG4gICAgICBjb25zdCBsaW5lcyA9IGF4aXNMaW5lc1theGlzTmFtZV07XG4gICAgICBsaW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0SWQsIGxvZ0tleSB9ID0gbGluZTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2dzID0gcmVzdWx0LmxvZ3MgfHwgW107XG4gICAgICAgIGxvZ3MuZm9yRWFjaCgobG9nKSA9PiB7XG4gICAgICAgICAgY29uc3QgbG9nRGljdCA9IHt9O1xuICAgICAgICAgIGxvZy5sb2dJdGVtcy5mb3JFYWNoKChsb2dJdGVtKSA9PiB7XG4gICAgICAgICAgICBsb2dEaWN0W2xvZ0l0ZW0ua2V5XSA9IGxvZ0l0ZW0udmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGxvZ0RpY3RbeEF4aXNLZXldID09IG51bGwgfHwgbG9nRGljdFtsb2dLZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGFEaWN0W2xvZ0RpY3RbeEF4aXNLZXldXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhRGljdFtsb2dEaWN0W3hBeGlzS2V5XV0gPSB7IFt4QXhpc0tleV06IGxvZ0RpY3RbeEF4aXNLZXldIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFEaWN0W2xvZ0RpY3RbeEF4aXNLZXldXVtsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpXSA9IGxvZ0RpY3RbbG9nS2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmtleXMoZGF0YURpY3QpLm1hcCgoa2V5KSA9PiAoZGF0YURpY3Rba2V5XSkpO1xuXG4gICAgY29uc3QgbGluZUVsZW1zID0gWy4uLmJ1aWxkTGluZUVsZW1zKCd5TGVmdEF4aXMnLCBjb25maWcpLCAuLi5idWlsZExpbmVFbGVtcygneVJpZ2h0QXhpcycsIGNvbmZpZyldO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nLXZpc3VhbGl6ZXItcm9vdCByb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tOFwiPlxuICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAke2NoYXJ0SGVpZ2h0fXB4YCB9fVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICBtaW49e3lMZWZ0VmFsdWVSYW5nZVswXX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXt5TGVmdFZhbHVlUmFuZ2VbMV19XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9eyh5TGVmdFJhbmdlWzFdIC0geUxlZnRSYW5nZVswXSkgLyBzbGlkZXJTdGVwc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3lMZWZ0UmFuZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPExpbmVDaGFydFxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17Y2hhcnRXaWR0aH1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtjaGFydEhlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luPXt7IHRvcDogNSwgcmlnaHQ6IDMwLCBsZWZ0OiAyMCwgYm90dG9tOiA1IH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxYQXhpc1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e3hBeGlzS2V5fVxuICAgICAgICAgICAgICAgICAgICAgIHNjYWxlPXt4QXhpcy5zY2FsZX1cbiAgICAgICAgICAgICAgICAgICAgICBkb21haW49e1snYXV0bycsICdhdXRvJ119XG4gICAgICAgICAgICAgICAgICAgICAgYWxsb3dEYXRhT3ZlcmZsb3dcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPFlBeGlzXG4gICAgICAgICAgICAgICAgICAgICAgeUF4aXNJZD1cInlMZWZ0QXhpc1wiXG4gICAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb249XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICBzY2FsZT17eUxlZnRBeGlzLnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICAgIGRvbWFpbj17WydhdXRvJywgJ2F1dG8nXX1cbiAgICAgICAgICAgICAgICAgICAgICBhbGxvd0RhdGFPdmVyZmxvd1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8WUF4aXNcbiAgICAgICAgICAgICAgICAgICAgICB5QXhpc0lkPVwieVJpZ2h0QXhpc1wiXG4gICAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb249XCJyaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU9e3lSaWdodEF4aXMuc2NhbGV9XG4gICAgICAgICAgICAgICAgICAgICAgZG9tYWluPXtbJ2F1dG8nLCAnYXV0byddfVxuICAgICAgICAgICAgICAgICAgICAgIGFsbG93RGF0YU92ZXJmbG93XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxUb29sdGlwIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMZWdlbmQgLz5cbiAgICAgICAgICAgICAgICAgICAge2xpbmVFbGVtc31cbiAgICAgICAgICAgICAgICAgIDwvTGluZUNoYXJ0PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogYCR7Y2hhcnRIZWlnaHR9cHhgIH19XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgIG1pbj17eVJpZ2h0VmFsdWVSYW5nZVswXX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXt5UmlnaHRWYWx1ZVJhbmdlWzFdfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXsoeVJpZ2h0UmFuZ2VbMV0gLSB5UmlnaHRSYW5nZVswXSkgLyBzbGlkZXJTdGVwc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3lSaWdodFJhbmdlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIC8+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtjaGFydFdpZHRofXB4YCwgbWFyZ2luOiAnYXV0bycgfX1cbiAgICAgICAgICAgICAgICAgICAgbWluPXt4VmFsdWVSYW5nZS5taW59XG4gICAgICAgICAgICAgICAgICAgIG1heD17eFZhbHVlUmFuZ2UubWF4fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17eFJhbmdlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VYUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIC8+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00XCI+XG4gICAgICAgICAgPEF4aXNDb25maWd1cmF0b3JcbiAgICAgICAgICAgIGF4aXNDb25maWc9e3lMZWZ0QXhpc31cbiAgICAgICAgICAgIG9uQ2hhbmdlU2NhbGU9e29uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgICAgICBheGlzTmFtZT1cInlMZWZ0QXhpc1wiXG4gICAgICAgICAgICAgIGxpbmVzPXt5TGVmdEF4aXMubGluZXN9XG4gICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVBZGQ9e29uQXhpc0NvbmZpZ0xpbmVBZGR9XG4gICAgICAgICAgICAgIG9uQXhpc0NvbmZpZ0xpbmVSZW1vdmU9e29uQXhpc0NvbmZpZ0xpbmVSZW1vdmV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQXhpc0NvbmZpZ3VyYXRvcj5cbiAgICAgICAgICA8QXhpc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgYXhpc0NvbmZpZz17eVJpZ2h0QXhpc31cbiAgICAgICAgICAgIG9uQ2hhbmdlU2NhbGU9e29uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgICByZXN1bHRzPXtyZXN1bHRzfVxuICAgICAgICAgICAgICBheGlzTmFtZT1cInlSaWdodEF4aXNcIlxuICAgICAgICAgICAgICBsaW5lcz17eVJpZ2h0QXhpcy5saW5lc31cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZUFkZD17b25BeGlzQ29uZmlnTGluZUFkZH1cbiAgICAgICAgICAgICAgb25BeGlzQ29uZmlnTGluZVJlbW92ZT17b25BeGlzQ29uZmlnTGluZVJlbW92ZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9BeGlzQ29uZmlndXJhdG9yPlxuICAgICAgICAgIDxBeGlzQ29uZmlndXJhdG9yXG4gICAgICAgICAgICBheGlzQ29uZmlnPXt4QXhpc31cbiAgICAgICAgICAgIG9uQ2hhbmdlU2NhbGU9e29uQXhpc0NvbmZpZ1NjYWxlVXBkYXRlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaXN1YWxpemVyLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIHN0YXRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4ZXM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4QXhpczogUHJvcFR5cGVzLnNoYXBlKHsgdmFsdWVSYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikgfSksXG4gICAgICB5TGVmdEF4aXM6IFByb3BUeXBlcy5zaGFwZSh7IHZhbHVlUmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpIH0pLFxuICAgICAgeVJpZ2h0QXhpczogUHJvcFR5cGVzLnNoYXBlKHsgdmFsdWVSYW5nZTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlcikgfSlcbiAgICB9KVxuICB9KSxcbiAgY29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4ZXM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4QXhpczogUHJvcFR5cGVzLmFueSxcbiAgICAgIHlMZWZ0QXhpczogUHJvcFR5cGVzLmFueSxcbiAgICAgIHlSaWdodEF4aXM6IFByb3BUeXBlcy5hbnlcbiAgICB9KVxuICB9KSxcbiAgb25BeGlzQ29uZmlnTGluZUFkZDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnTGluZVJlbW92ZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgb25BeGlzQ29uZmlnU2NhbGVVcGRhdGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5Mb2dWaXN1YWxpemVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3RhdHM6IGRlZmF1bHRTdGF0cyxcbiAgY29uZmlnOiBkZWZhdWx0Q29uZmlnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMb2dWaXN1YWxpemVyO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyLmpzeCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmMtc2xpZGVyL2Fzc2V0cy9pbmRleC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDkxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBBeGlzU2NhbGVTZWxlY3RvciBmcm9tICcuL0F4aXNTY2FsZVNlbGVjdG9yJztcblxuXG5jb25zdCBkZWZhdWx0QXhpc0NvbmZpZyA9IHtcbiAgYXhpc05hbWU6ICcnLFxuICBzY2FsZTogJ2F1dG8nLFxuICByYW5nZTogWzAsIDEwMF1cbn07XG5cbmNsYXNzIEF4aXNDb25maWd1cmF0b3IgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2NhbGUgPSB0aGlzLmhhbmRsZUNoYW5nZVNjYWxlLmJpbmQodGhpcyk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTY2FsZShzY2FsZSkge1xuICAgIGNvbnN0IHsgYXhpc05hbWUgfSA9IHRoaXMucHJvcHMuYXhpc0NvbmZpZztcbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlU2NhbGUoYXhpc05hbWUsIHNjYWxlKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGF4aXNOYW1lLCBzY2FsZSB9ID0gdGhpcy5wcm9wcy5heGlzQ29uZmlnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXhpcy1jb25maWd1cmF0b3IgY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtaGVhZGVyXCI+e2F4aXNOYW1lfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQtYm9keVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+XG4gICAgICAgICAgICAgIDxBeGlzU2NhbGVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHNjYWxlPXtzY2FsZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VTY2FsZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbkF4aXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICBheGlzQ29uZmlnOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGF4aXNOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgc2NhbGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpXG4gIH0pLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLmVsZW1lbnQsXG4gIG9uQ2hhbmdlU2NhbGU6IFByb3BUeXBlcy5mdW5jXG59O1xuQXhpc0NvbmZpZ3VyYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGF4aXNDb25maWc6IGRlZmF1bHRBeGlzQ29uZmlnLFxuICBjaGlsZHJlbjogbnVsbCxcbiAgb25DaGFuZ2VTY2FsZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXNDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0F4aXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cblxuY29uc3Qgc2NhbGVPcHRpb25zID0gWydsaW5lYXInLCAnbG9nJ107XG5cbmNvbnN0IEF4aXNTY2FsZVNlbGVjdG9yID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgc2NhbGUsIG9uQ2hhbmdlIH0gPSBwcm9wcztcbiAgY29uc3QgaGFuZGxlQ2hhbmdlQXhpc0tleSA9IChlKSA9PiB7XG4gICAgb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpO1xuICB9O1xuXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2FsZU9wdGlvbnMubWFwKChzY2FsZUtleSkgPT4gKFxuICAgIDxvcHRpb24gdmFsdWU9e3NjYWxlS2V5fSBrZXk9e3NjYWxlS2V5fT57c2NhbGVLZXl9PC9vcHRpb24+XG4gICkpO1xuICByZXR1cm4gKFxuICAgIDxzZWxlY3QgaWQ9XCJheGlzLXNjYWxlLXNlbGVjdG9yLXNlbGVjdFwiIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIHZhbHVlPXtzY2FsZX0gb25DaGFuZ2U9e2hhbmRsZUNoYW5nZUF4aXNLZXl9PlxuICAgICAge29wdGlvbnN9XG4gICAgPC9zZWxlY3Q+XG4gICk7XG59O1xuXG5BeGlzU2NhbGVTZWxlY3Rvci5wcm9wVHlwZXMgPSB7XG4gIHNjYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbkF4aXNTY2FsZVNlbGVjdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgc2NhbGU6ICcnLFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IEF4aXNTY2FsZVNlbGVjdG9yO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BeGlzU2NhbGVTZWxlY3Rvci5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEJ1dHRvbiwgTW9kYWwsIE1vZGFsSGVhZGVyLCBNb2RhbEJvZHksIE1vZGFsRm9vdGVyIH0gZnJvbSAncmVhY3RzdHJhcCc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IExpbmVzQ29uZmlndXJhdG9yUm93IGZyb20gJy4vTGluZXNDb25maWd1cmF0b3JSb3cnO1xuaW1wb3J0IExpbmVDb25maWd1cmF0b3IgZnJvbSAnLi9MaW5lQ29uZmlndXJhdG9yJztcblxuXG5jb25zdCBkZWZhdWx0TGluZSA9IHtcbiAgY29uZmlnOiB7XG4gICAgY29sb3I6ICcjQUJDREVGJ1xuICB9XG59O1xuXG5jbGFzcyBMaW5lc0NvbmZpZ3VyYXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlID0gdGhpcy5oYW5kbGVNb2RhbFRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQWRkaW5nTGluZUNoYW5nZSA9IHRoaXMuaGFuZGxlQWRkaW5nTGluZUNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGQgPSB0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lQWRkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVBeGlzQ29uZmlnTGluZVJlbW92ZSA9IHRoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVSZW1vdmUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgICAgYWRkaW5nTGluZTogZGVmYXVsdExpbmVcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlTW9kYWxUb2dnbGUoKSB7XG4gICAgY29uc3QgbmV3QWRkaW5nTGluZSA9IHRoaXMuc3RhdGUuc2hvd01vZGFsID8gZGVmYXVsdExpbmUgOiB0aGlzLnN0YXRlLmFkZGluZ0xpbmU7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzaG93TW9kYWw6ICF0aGlzLnN0YXRlLnNob3dNb2RhbCxcbiAgICAgIGFkZGluZ0xpbmU6IG5ld0FkZGluZ0xpbmVcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUFkZGluZ0xpbmVDaGFuZ2UobmV3TGluZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgYWRkaW5nTGluZTogbmV3TGluZSxcbiAgICAgIHNob3dMaW5lQ29uZmlnRXJyb3I6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZUFkZCgpIHtcbiAgICBjb25zdCB7IGF4aXNOYW1lLCBvbkF4aXNDb25maWdMaW5lQWRkIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgYWRkaW5nTGluZSB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChhZGRpbmdMaW5lLnJlc3VsdElkID09IG51bGwgfHwgYWRkaW5nTGluZS5sb2dLZXkgPT0gbnVsbCkge1xuICAgICAgLy8gaW52YWxpZFxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNob3dMaW5lQ29uZmlnRXJyb3I6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvbkF4aXNDb25maWdMaW5lQWRkKGF4aXNOYW1lLCBhZGRpbmdMaW5lKTtcbiAgICAgIHRoaXMuaGFuZGxlTW9kYWxUb2dnbGUoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVBeGlzQ29uZmlnTGluZVJlbW92ZShsaW5lS2V5KSB7XG4gICAgY29uc3QgeyBheGlzTmFtZSwgb25BeGlzQ29uZmlnTGluZVJlbW92ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBvbkF4aXNDb25maWdMaW5lUmVtb3ZlKGF4aXNOYW1lLCBsaW5lS2V5KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUya2V5IH0gPSBVdGlscztcbiAgICBjb25zdCB7IHJlc3VsdHMsIGxpbmVzID0gW10gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBhZGRpbmdMaW5lLCBzaG93TGluZUNvbmZpZ0Vycm9yIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgbGluZUNvbmZpZ3VyYXRvckVsZW1zID0gbGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW2xpbmUucmVzdWx0SWRdIHx8IHt9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TGluZXNDb25maWd1cmF0b3JSb3dcbiAgICAgICAgICBsaW5lPXtsaW5lfVxuICAgICAgICAgIHJlc3VsdD17cmVzdWx0fVxuICAgICAgICAgIG9uUmVtb3ZlPXt0aGlzLmhhbmRsZUF4aXNDb25maWdMaW5lUmVtb3ZlfVxuICAgICAgICAgIGtleT17bGluZTJrZXkobGluZSl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwIGxpc3QtZ3JvdXAtZmx1c2hcIj5cbiAgICAgICAge2xpbmVDb25maWd1cmF0b3JFbGVtc31cbiAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbSB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHQgYnRuLXhzXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzXCIgLz4gQWRkXG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8TW9kYWwgaXNPcGVuPXt0aGlzLnN0YXRlLnNob3dNb2RhbH0gdG9nZ2xlPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfSBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgIDxNb2RhbEhlYWRlciB0b2dnbGU9e3RoaXMuaGFuZGxlTW9kYWxUb2dnbGV9Pk1vZGFsIHRpdGxlPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICAgIDxMaW5lQ29uZmlndXJhdG9yXG4gICAgICAgICAgICAgICAgcmVzdWx0cz17cmVzdWx0c31cbiAgICAgICAgICAgICAgICBsaW5lPXthZGRpbmdMaW5lfVxuICAgICAgICAgICAgICAgIHNob3dFcnJvcj17c2hvd0xpbmVDb25maWdFcnJvcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVBZGRpbmdMaW5lQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Nb2RhbEJvZHk+XG4gICAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3I9XCJzZWNvbmRhcnlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU1vZGFsVG9nZ2xlfT5DYW5jZWw8L0J1dHRvbj57JyAnfVxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQXhpc0NvbmZpZ0xpbmVBZGR9PkFkZDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Nb2RhbEZvb3Rlcj5cbiAgICAgICAgICA8L01vZGFsPlxuXG4gICAgICAgIDwvbGk+XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuTGluZXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgYXhpc05hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGluZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICByZXN1bHRJZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0pXG4gICksXG4gIG9uQXhpc0NvbmZpZ0xpbmVBZGQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uQXhpc0NvbmZpZ0xpbmVSZW1vdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbn07XG5cbkxpbmVzQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGluZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5lc0NvbmZpZ3VyYXRvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvTGluZXNDb25maWd1cmF0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuXG5cbmNsYXNzIExpbmVzQ29uZmlndXJhdG9yUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmhhbmRsZVJlbW92ZUNsaWNrID0gdGhpcy5oYW5kbGVSZW1vdmVDbGljay5iaW5kKHRoaXMpO1xuICB9XG5cbiAgaGFuZGxlUmVtb3ZlQ2xpY2soKSB7XG4gICAgY29uc3QgeyBsaW5lMmtleSB9ID0gVXRpbHM7XG4gICAgY29uc3QgeyBsaW5lLCBvblJlbW92ZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIG9uUmVtb3ZlKGxpbmUya2V5KGxpbmUpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGxpbmUya2V5LCB0cnVuY2F0ZUZvcndhcmQgfSA9IFV0aWxzO1xuICAgIGNvbnN0IHsgbGluZSwgcmVzdWx0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgY29uZmlnID0ge30gfSA9IGxpbmU7XG5cbiAgICBjb25zdCBjb2xvckJsb2NrU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTVweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbmZpZy5jb2xvclxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiIGtleT17bGluZTJrZXkobGluZSl9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTFcIiBzdHlsZT17Y29sb3JCbG9ja1N0eWxlfSAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTVcIj57dHJ1bmNhdGVGb3J3YXJkKHJlc3VsdC5wYXRoTmFtZSwgMjQpfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTRcIj57bGluZS5sb2dLZXl9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY2xvc2VcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiQ2xvc2VcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZVJlbW92ZUNsaWNrfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cblxuICAgICk7XG4gIH1cbn1cblxuTGluZXNDb25maWd1cmF0b3JSb3cucHJvcFR5cGVzID0ge1xuICBsaW5lOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJlc3VsdElkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZ1xuICB9KS5pc1JlcXVpcmVkLFxuICByZXN1bHQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgaWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgcGF0aE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYXJnczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbG9nczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgb25SZW1vdmU6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5MaW5lc0NvbmZpZ3VyYXRvclJvdy5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uUmVtb3ZlOiAoKSA9PiB7fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgTGluZXNDb25maWd1cmF0b3JSb3c7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVzQ29uZmlndXJhdG9yUm93LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRm9ybSwgRm9ybUdyb3VwLCBMYWJlbCwgRm9ybVRleHQgfSBmcm9tICdyZWFjdHN0cmFwJztcblxuXG5jb25zdCBSRVNVTFRfTk9ORSA9IC0xO1xuY29uc3QgTE9HX0tFWV9OT05FID0gJyc7XG5cbmNvbnN0IGdldExvZ0tleXMgPSAocmVzdWx0ID0ge30pID0+IHtcbiAgY29uc3QgeyBsb2dzID0gW10gfSA9IHJlc3VsdDtcbiAgY29uc3QgbG9nS2V5U2V0ID0ge307XG4gIGxvZ3MuZm9yRWFjaCgobG9nKSA9PiB7XG4gICAgY29uc3QgeyBsb2dJdGVtcyA9IFtdIH0gPSBsb2c7XG4gICAgbG9nSXRlbXMuZm9yRWFjaCgobG9nSXRlbSkgPT4ge1xuICAgICAgbG9nS2V5U2V0W2xvZ0l0ZW0ua2V5XSA9IHRydWU7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmtleXMobG9nS2V5U2V0KTtcbn07XG5cbmNvbnN0IGNyZWF0ZVJlc3VsdE9wdGlvbkVsZW1zID0gKHJlc3VsdHMgPSBbXSkgPT4gW1xuICA8b3B0aW9uIHZhbHVlPXtSRVNVTFRfTk9ORX0ga2V5PXtSRVNVTFRfTk9ORX0gZGlzYWJsZWQ+LS0gc2VsZWN0IHJlc3VsdCAtLTwvb3B0aW9uPixcbiAgLi4uT2JqZWN0LmtleXMocmVzdWx0cykubWFwKChyZXN1bHRJZCkgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbcmVzdWx0SWRdO1xuICAgIHJldHVybiAoXG4gICAgICA8b3B0aW9uIHZhbHVlPXtyZXN1bHQuaWR9IGtleT17cmVzdWx0LmlkfT57cmVzdWx0LmlkfToge3Jlc3VsdC5wYXRoTmFtZX08L29wdGlvbj5cbiAgICApO1xuICB9KVxuXTtcblxuY29uc3QgY3JlYXRlTG9nS2V5T3B0aW9uRWxlbXMgPSAocmVzdWx0ID0ge30pID0+IHtcbiAgY29uc3QgbG9nS2V5cyA9IGdldExvZ0tleXMocmVzdWx0KTtcbiAgcmV0dXJuIFtcbiAgICA8b3B0aW9uIHZhbHVlPXtMT0dfS0VZX05PTkV9IGtleT17TE9HX0tFWV9OT05FfSBkaXNhYmxlZD4tLSBzZWxlY3QgbG9nIGtleSAtLTwvb3B0aW9uPixcbiAgICAuLi5sb2dLZXlzLm1hcCgobG9nS2V5KSA9PiAoXG4gICAgICA8b3B0aW9uIHZhbHVlPXtsb2dLZXl9IGtleT17bG9nS2V5fT57bG9nS2V5fTwvb3B0aW9uPlxuICAgICkpXG4gIF07XG59O1xuXG5jbGFzcyBMaW5lQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaGFuZGxlUmVzdWx0Q2hhbmdlID0gdGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUxvZ0tleUNoYW5nZSA9IHRoaXMuaGFuZGxlTG9nS2V5Q2hhbmdlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgc2hvd0Vycm9yOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVSZXN1bHRDaGFuZ2UoZSkge1xuICAgIGNvbnN0IHsgbGluZSwgb25DaGFuZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbmV3UmVzdWx0SWQgPSBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApO1xuICAgIG9uQ2hhbmdlKHsgLi4ubGluZSwgcmVzdWx0SWQ6IG5ld1Jlc3VsdElkIH0pO1xuICB9XG5cbiAgaGFuZGxlTG9nS2V5Q2hhbmdlKGUpIHtcbiAgICBjb25zdCB7IGxpbmUsIG9uQ2hhbmdlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG5ld0xvZ0tleSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIG9uQ2hhbmdlKHsgLi4ubGluZSwgbG9nS2V5OiBuZXdMb2dLZXkgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyByZXN1bHRzLCBsaW5lID0ge30sIHNob3dFcnJvciA9IGZhbHNlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcmVzdWx0SWQgPSBSRVNVTFRfTk9ORSwgbG9nS2V5ID0gTE9HX0tFWV9OT05FLCBjb25maWcgPSB7fSB9ID0gbGluZTtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXSB8fCB7fTtcbiAgICBjb25zdCBjb2xvciA9IGNvbmZpZy5jb2xvcjtcblxuICAgIGNvbnN0IGNvbG9yQmxvY2tTdHlsZSA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0T3B0aW9uRWxlbXMgPSBjcmVhdGVSZXN1bHRPcHRpb25FbGVtcyhyZXN1bHRzKTtcbiAgICBjb25zdCBsb2dLZXlPcHRpb25FbGVtcyA9IGNyZWF0ZUxvZ0tleU9wdGlvbkVsZW1zKHJlc3VsdCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJsaW5lLWNvbmZpZ3VyYXRvclwiPlxuICAgICAgICA8Rm9ybT5cbiAgICAgICAgICA8Rm9ybUdyb3VwPlxuICAgICAgICAgICAgPExhYmVsPmNvbG9yPC9MYWJlbD5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e2NvbG9yQmxvY2tTdHlsZX0+e2NvbG9yfTwvZGl2PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3ItcmVzdWx0LXNlbGVjdFwiPnJlc3VsdDwvTGFiZWw+PGJyIC8+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHR5cGU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBuYW1lPVwic2VsZWN0XCJcbiAgICAgICAgICAgICAgaWQ9XCJsaW5lLWNvbmZpZ3VyYXRvci1yZXN1bHQtc2VsZWN0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3Jlc3VsdElkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVSZXN1bHRDaGFuZ2V9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtyZXN1bHRPcHRpb25FbGVtc31cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPEZvcm1UZXh0IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCIgaGlkZGVuPXshc2hvd0Vycm9yIHx8IHJlc3VsdElkICE9PSBSRVNVTFRfTk9ORX0+XG4gICAgICAgICAgICAgIFNlbGVjdCBhIHJlc3VsdCEhXG4gICAgICAgICAgICA8L0Zvcm1UZXh0PlxuICAgICAgICAgIDwvRm9ybUdyb3VwPlxuICAgICAgICAgIDxGb3JtR3JvdXA+XG4gICAgICAgICAgICA8TGFiZWwgZm9yPVwibGluZS1jb25maWd1cmF0b3ItbG9nLWtleS1zZWxlY3RcIj5sb2cga2V5PC9MYWJlbD48YnIgLz5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdHlwZT1cInNlbGVjdFwiXG4gICAgICAgICAgICAgIG5hbWU9XCJzZWxlY3RcIlxuICAgICAgICAgICAgICBpZD1cImxpbmUtY29uZmlndXJhdG9yLWxvZy1rZXktc2VsZWN0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2xvZ0tleX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3Jlc3VsdElkID09PSBSRVNVTFRfTk9ORX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlTG9nS2V5Q2hhbmdlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bG9nS2V5T3B0aW9uRWxlbXN9XG4gICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDxGb3JtVGV4dCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiIGhpZGRlbj17IXNob3dFcnJvciB8fCBsb2dLZXkgIT09IExPR19LRVlfTk9ORX0+XG4gICAgICAgICAgICAgIFNlbGVjdCBhIGxvZyBrZXkhIVxuICAgICAgICAgICAgPC9Gb3JtVGV4dD5cbiAgICAgICAgICA8L0Zvcm1Hcm91cD5cbiAgICAgICAgPC9Gb3JtPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5MaW5lQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gIGxpbmU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcmVzdWx0SWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbG9nS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIGNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nXG4gICAgfSlcbiAgfSksXG4gIHNob3dFcnJvcjogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuTGluZUNvbmZpZ3VyYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGxpbmU6IHt9LFxuICBzaG93RXJyb3I6IGZhbHNlLFxuICBvbkNoYW5nZTogKCkgPT4ge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVDb25maWd1cmF0b3IuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==