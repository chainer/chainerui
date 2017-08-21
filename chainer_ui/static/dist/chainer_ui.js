webpackJsonp([0],{

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(367);


/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_ChainerUIContainer__ = __webpack_require__(470);





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
  render(ChainerUIContainer, appNode);
  module.hot.accept('./containers/ChainerUIContainer', function () {
    render(ChainerUIContainer, appNode);
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    var appNode = document.getElementById('chainer_ui-root');
    if (appNode) {
      render(__WEBPACK_IMPORTED_MODULE_3__containers_ChainerUIContainer__["a" /* default */], appNode);
    }
  });
}

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ExperimentsTable__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_LogVisualizer__ = __webpack_require__(474);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var apiEndpoint = '/api/v1';

var getStats = function getStats(entities) {
  var results = entities.results;

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

var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer(props, context) {
    _classCallCheck(this, ChainerUIContainer);

    var _this = _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).call(this, props, context));

    _this.requestResults = _this.requestResults.bind(_this);
    _this.handleToggleResult = _this.handleToggleResult.bind(_this);

    _this.state = {
      entities: {
        results: {}
      },
      config: {
        axes: {
          xAxis: {
            axisName: 'xAxis',
            xAxisKey: 'epoch',
            scale: 'linear'
          },
          yLeftAxis: {
            axisName: 'yLeftAxis',
            scale: 'linear',
            // range: [0.0, 1.0],
            lines: [{
              resultId: 2,
              logKey: 'main/loss',
              config: {
                color: '#ABCDEF'
              }
            }]
          },
          yRightAxis: {
            axisName: 'yRightAxis',
            scale: 'linear',
            // range: [0.0, 1.0],
            lines: [{
              resultId: 3,
              logKey: 'main/loss',
              config: {
                color: '#FEDCBA'
              }
            }]
          }
        }
      }
    };

    _this.requestResults();
    return _this;
  }

  _createClass(ChainerUIContainer, [{
    key: 'requestResults',
    value: function requestResults() {
      var _this2 = this;

      var url = __WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve(apiEndpoint, 'results');
      __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax({
        url: url,
        type: 'GET',
        dataType: 'json'
      }).done(function (data) {
        var results = {};
        data.results.forEach(function (result) {
          results[result.id] = result;
        });
        _this2.setState({
          entities: _extends({}, _this2.state.entities, {
            results: results
          })
        });
      }).fail(function () {
        alert('Web API Error\nPlease check API log.'); // eslint-disable-line no-alert
      });
    }
  }, {
    key: 'handleToggleResult',
    value: function handleToggleResult(resultId, isToggleed) {
      var resultIds = this.state.resultIds;

      var newResultIds = [];
      if (isToggleed) {
        newResultIds = resultIds.concat(resultId);
      } else {
        newResultIds = resultIds.filter(function (resId) {
          return resId !== resultId;
        });
      }
      this.setState({
        resultIds: newResultIds
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          entities = _state.entities,
          config = _state.config;

      var stats = getStats(entities);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'chainer-ui-container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_LogVisualizer__["a" /* default */], {
          entities: entities,
          stats: stats,
          config: config
        }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_ExperimentsTable__["a" /* default */], {
          entities: entities,
          stats: stats
        })
      );
    }
  }]);

  return ChainerUIContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ChainerUIContainer);

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function splitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};

exports.basename = function (path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  return splitPath(path)[3];
};

function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)))

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(473);




var ExperimentsTable = function ExperimentsTable(props) {
  var stats = props.stats;

  var _ref = props.entities || {},
      results = _ref.results;

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
  entities: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
      pathName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
      args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
      logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
    }))
  }),
  stats: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string)
  })
};
ExperimentsTable.defaultProps = {
  entities: {
    results: {}
  },
  stats: {
    argKeys: []
  }
};

/* harmony default export */ __webpack_exports__["a"] = (ExperimentsTable);

/***/ }),

/***/ 473:
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

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rc_slider__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__ = __webpack_require__(853);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rc_slider_assets_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__ = __webpack_require__(854);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__ = __webpack_require__(882);
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
    type: 'monotone',
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
  var axisConfig = config.axes[axisName];
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
      var entities = this.props.entities;
      var _entities$results = entities.results,
          results = _entities$results === undefined ? {} : _entities$results;

      var stats = this.props.stats || defaultStats;
      var config = this.props.config || defaultConfig;
      var _config$axes = config.axes,
          xAxis = _config$axes.xAxis,
          yLeftAxis = _config$axes.yLeftAxis,
          yRightAxis = _config$axes.yRightAxis;
      var xAxisKey = xAxis.xAxisKey;

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
            { axisConfig: yLeftAxis },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              entities: entities,
              lines: yLeftAxis.lines
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_6__AxisConfigurator__["a" /* default */],
            { axisConfig: yRightAxis },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__LinesConfigurator__["a" /* default */], {
              entities: entities,
              lines: yRightAxis.lines
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
  entities: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }),
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
  })
};
LogVisualizer.defaultProps = {
  entities: {
    results: {}
  },
  stats: defaultStats,
  config: defaultConfig
};

/* harmony default export */ __webpack_exports__["a"] = (LogVisualizer);

/***/ }),

/***/ 853:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AxisScaleSelector__ = __webpack_require__(855);
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
        { className: 'axis-configurator panel panel-default' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'panel-heading' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'row' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              { className: 'col-sm-6' },
              axisName
            ),
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

/***/ 855:
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

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LineConfigurator__ = __webpack_require__(884);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var LinesConfigurator = function (_React$Component) {
  _inherits(LinesConfigurator, _React$Component);

  function LinesConfigurator() {
    _classCallCheck(this, LinesConfigurator);

    var _this = _possibleConstructorReturn(this, (LinesConfigurator.__proto__ || Object.getPrototypeOf(LinesConfigurator)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(LinesConfigurator, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          entities = _props.entities,
          _props$lines = _props.lines,
          lines = _props$lines === undefined ? [] : _props$lines;
      var line2key = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].line2key;


      var lineConfiguratorElems = lines.map(function (line) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'li',
          { className: 'list-group-item', key: line2key(line) },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LineConfigurator__["a" /* default */], { entities: entities, line: line })
        );
      });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'ul',
        { className: 'list-group' },
        lineConfiguratorElems
      );
    }
  }]);

  return LinesConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LinesConfigurator.propTypes = {
  entities: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  lines: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  }))
};

LinesConfigurator.defaultProps = {
  lines: []
};

/* harmony default export */ __webpack_exports__["a"] = (LinesConfigurator);

/***/ }),

/***/ 883:
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

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(883);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var LineConfigurator = function (_React$Component) {
  _inherits(LineConfigurator, _React$Component);

  function LineConfigurator() {
    _classCallCheck(this, LineConfigurator);

    var _this = _possibleConstructorReturn(this, (LineConfigurator.__proto__ || Object.getPrototypeOf(LineConfigurator)).call(this));

    _this.state = {};
    return _this;
  }

  _createClass(LineConfigurator, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          entities = _props.entities,
          _props$line = _props.line,
          line = _props$line === undefined ? {} : _props$line;
      var _entities$results = entities.results,
          results = _entities$results === undefined ? {} : _entities$results;

      var result = results[line.resultId] || {};
      var _line$config = line.config,
          config = _line$config === undefined ? {} : _line$config;
      var truncateForward = __WEBPACK_IMPORTED_MODULE_2__utils__["a" /* default */].truncateForward;


      var colorBlockStyle = {
        width: '20px',
        height: '15px',
        backgroundColor: config.color
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
      );
    }
  }]);

  return LineConfigurator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

LineConfigurator.propTypes = {
  entities: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.objectOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  }).isRequired,
  line: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    resultId: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    config: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
      color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
    })
  })
};

LineConfigurator.defaultProps = {
  line: {}
};

/* harmony default export */ __webpack_exports__["a"] = (LineConfigurator);

/***/ })

},[366]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanN4Iiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lci5qc3giLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhdGgtYnJvd3NlcmlmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9FeHBlcmltZW50c1RhYmxlLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9SZXN1bHRSb3cuanN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL0xvZ1Zpc3VhbGl6ZXIuanN4Iiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYy1zbGlkZXIvYXNzZXRzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BeGlzQ29uZmlndXJhdG9yLmpzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9BeGlzU2NhbGVTZWxlY3Rvci5qc3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvTGluZXNDb25maWd1cmF0b3IuanN4Iiwid2VicGFjazovLy8uL3NyYy91dGlscy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9MaW5lQ29uZmlndXJhdG9yLmpzeCJdLCJuYW1lcyI6WyJyZW5kZXIiLCJDb21wb25lbnQiLCJhcHBOb2RlIiwiUmVhY3RET00iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJDaGFpbmVyVUlDb250YWluZXIiLCJtb2R1bGUiLCJob3QiLCJhY2NlcHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJhcGlFbmRwb2ludCIsImdldFN0YXRzIiwiZW50aXRpZXMiLCJyZXN1bHRzIiwiYXJnS2V5U2V0IiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJyZXN1bHRJZCIsInJlc3VsdCIsImFyZ3MiLCJhcmciLCJrZXkiLCJhcmdLZXlzIiwiYXhlcyIsInhBeGlzIiwieUxlZnRBeGlzIiwieVJpZ2h0QXhpcyIsInByb3BzIiwiY29udGV4dCIsInJlcXVlc3RSZXN1bHRzIiwiYmluZCIsImhhbmRsZVRvZ2dsZVJlc3VsdCIsInN0YXRlIiwiY29uZmlnIiwiYXhpc05hbWUiLCJ4QXhpc0tleSIsInNjYWxlIiwibGluZXMiLCJsb2dLZXkiLCJjb2xvciIsInVybCIsInBhdGgiLCJyZXNvbHZlIiwiJCIsImFqYXgiLCJ0eXBlIiwiZGF0YVR5cGUiLCJkb25lIiwiZGF0YSIsImlkIiwic2V0U3RhdGUiLCJmYWlsIiwiYWxlcnQiLCJpc1RvZ2dsZWVkIiwicmVzdWx0SWRzIiwibmV3UmVzdWx0SWRzIiwiY29uY2F0IiwiZmlsdGVyIiwicmVzSWQiLCJzdGF0cyIsIlJlYWN0Iiwibm9ybWFsaXplQXJyYXkiLCJwYXJ0cyIsImFsbG93QWJvdmVSb290IiwidXAiLCJpIiwibGVuZ3RoIiwibGFzdCIsInNwbGljZSIsInVuc2hpZnQiLCJzcGxpdFBhdGhSZSIsInNwbGl0UGF0aCIsImZpbGVuYW1lIiwiZXhlYyIsInNsaWNlIiwiZXhwb3J0cyIsInJlc29sdmVkUGF0aCIsInJlc29sdmVkQWJzb2x1dGUiLCJhcmd1bWVudHMiLCJwcm9jZXNzIiwiY3dkIiwiVHlwZUVycm9yIiwiY2hhckF0Iiwic3BsaXQiLCJwIiwiam9pbiIsIm5vcm1hbGl6ZSIsImlzQWJzb2x1dGUiLCJ0cmFpbGluZ1NsYXNoIiwic3Vic3RyIiwicGF0aHMiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJpbmRleCIsInJlbGF0aXZlIiwiZnJvbSIsInRvIiwidHJpbSIsImFyciIsInN0YXJ0IiwiZW5kIiwiZnJvbVBhcnRzIiwidG9QYXJ0cyIsIk1hdGgiLCJtaW4iLCJzYW1lUGFydHNMZW5ndGgiLCJvdXRwdXRQYXJ0cyIsInB1c2giLCJzZXAiLCJkZWxpbWl0ZXIiLCJkaXJuYW1lIiwicm9vdCIsImRpciIsImJhc2VuYW1lIiwiZXh0IiwiZiIsImV4dG5hbWUiLCJ4cyIsInJlcyIsInN0ciIsImxlbiIsIkV4cGVyaW1lbnRzVGFibGUiLCJhcmdIZWFkZXJFbGVtcyIsIm1hcCIsImFyZ0tleSIsInJlc3VsdFJvd0VsZW1zIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwic2hhcGUiLCJvYmplY3RPZiIsIm51bWJlciIsInBhdGhOYW1lIiwic3RyaW5nIiwiYXJyYXlPZiIsImFueSIsImxvZ3MiLCJkZWZhdWx0UHJvcHMiLCJlbXB0eVN0ciIsIlJlc3VsdFJvdyIsImxhc3RMb2ciLCJsYXN0TG9nRGljdCIsImxvZ0l0ZW1zIiwibG9nSXRlbSIsInZhbHVlIiwiYXJnRGljdCIsImFyZ0VsZW1zIiwiY29udGVudCIsImVwb2NoIiwiaXRlcmF0aW9uIiwiZWxhcHNlZF90aW1lIiwiaXNSZXF1aXJlZCIsInNsaWRlclN0ZXBzIiwiZGVmYXVsdFN0YXRzIiwiZGVmYXVsdFJhbmdlIiwiZGVmYXVsdFhBeGlzQ29uZmlnIiwicmFuZ2UiLCJkZWZhdWx0WUF4aXNDb25maWciLCJkZWZhdWx0Q29uZmlnIiwiYnVpbGRMaW5lRWxlbSIsImxpbmUiLCJsaW5lMmtleSIsImxpbmUyZGF0YUtleSIsImJ1aWxkTGluZUVsZW1zIiwiYXhpc0NvbmZpZyIsIkxvZ1Zpc3VhbGl6ZXIiLCJsZWZ0TGluZXMiLCJyaWdodExpbmVzIiwiYXhpc0xpbmVzIiwieFJhbmdlIiwieUxlZnRSYW5nZSIsInlSaWdodFJhbmdlIiwieFZhbHVlUmFuZ2UiLCJ2YWx1ZVJhbmdlIiwieUxlZnRWYWx1ZVJhbmdlIiwieVJpZ2h0VmFsdWVSYW5nZSIsImNoYXJ0V2lkdGgiLCJjaGFydEhlaWdodCIsImRhdGFEaWN0IiwibG9nIiwibG9nRGljdCIsImxpbmVFbGVtcyIsImhlaWdodCIsInRvcCIsInJpZ2h0IiwibGVmdCIsImJvdHRvbSIsIndpZHRoIiwibWFyZ2luIiwibWF4IiwiaGFuZGxlQ2hhbmdlWFJhbmdlIiwiZGVmYXVsdEF4aXNDb25maWciLCJBeGlzQ29uZmlndXJhdG9yIiwiaGFuZGxlQ2hhbmdlU2NhbGUiLCJvbkNoYW5nZVNjYWxlIiwiY2hpbGRyZW4iLCJlbGVtZW50IiwiZnVuYyIsInNjYWxlT3B0aW9ucyIsIkF4aXNTY2FsZVNlbGVjdG9yIiwib25DaGFuZ2UiLCJoYW5kbGVDaGFuZ2VBeGlzS2V5IiwiZSIsInRhcmdldCIsIm9wdGlvbnMiLCJzY2FsZUtleSIsIkxpbmVzQ29uZmlndXJhdG9yIiwibGluZUNvbmZpZ3VyYXRvckVsZW1zIiwiVXRpbHMiLCJiZWdpbm5pbmciLCJzdWJzdHJpbmciLCJMaW5lQ29uZmlndXJhdG9yIiwidHJ1bmNhdGVGb3J3YXJkIiwiY29sb3JCbG9ja1N0eWxlIiwiYmFja2dyb3VuZENvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0EsSUFBTUEsU0FBUyxTQUFUQSxNQUFTLENBQUNDLFNBQUQsRUFBWUMsT0FBWixFQUF3QjtBQUNyQ0MsRUFBQSxpREFBQUEsQ0FBU0gsTUFBVCxDQUNFO0FBQUMsa0VBQUQ7QUFBQTtBQUNFLGdFQUFDLFNBQUQ7QUFERixHQURGLEVBSUVFLE9BSkY7QUFNRCxDQVBEOztBQVNBLElBQUksS0FBSixFQUFnQjtBQUNkLE1BQU1BLFVBQVVFLFNBQVNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQUQsV0FBU0UsSUFBVCxDQUFjQyxXQUFkLENBQTBCTCxPQUExQjtBQUNBRixTQUFPUSxrQkFBUCxFQUEyQk4sT0FBM0I7QUFDQU8sU0FBT0MsR0FBUCxDQUFXQyxNQUFYLENBQWtCLGlDQUFsQixFQUFxRCxZQUFNO0FBQUVYLFdBQU9RLGtCQUFQLEVBQTJCTixPQUEzQjtBQUFzQyxHQUFuRztBQUNELENBTEQsTUFLTztBQUNMRSxXQUFTUSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxRQUFNVixVQUFVRSxTQUFTUyxjQUFULENBQXdCLGlCQUF4QixDQUFoQjtBQUNBLFFBQUlYLE9BQUosRUFBYTtBQUNYRixhQUFPLCtFQUFQLEVBQTJCRSxP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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgeyBBcHBDb250YWluZXIgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCBDaGFpbmVyVUlDb250YWluZXIgZnJvbSAnLi9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lcic7XG5cblxuY29uc3QgcmVuZGVyID0gKENvbXBvbmVudCwgYXBwTm9kZSkgPT4ge1xuICBSZWFjdERPTS5yZW5kZXIoXG4gICAgPEFwcENvbnRhaW5lcj5cbiAgICAgIDxDb21wb25lbnQgLz5cbiAgICA8L0FwcENvbnRhaW5lcj4sXG4gICAgYXBwTm9kZVxuICApO1xufTtcblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgY29uc3QgYXBwTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFwcE5vZGUpO1xuICByZW5kZXIoQ2hhaW5lclVJQ29udGFpbmVyLCBhcHBOb2RlKTtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoJy4vY29udGFpbmVycy9DaGFpbmVyVUlDb250YWluZXInLCAoKSA9PiB7IHJlbmRlcihDaGFpbmVyVUlDb250YWluZXIsIGFwcE5vZGUpOyB9KTtcbn0gZWxzZSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgYXBwTm9kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGFpbmVyX3VpLXJvb3QnKTtcbiAgICBpZiAoYXBwTm9kZSkge1xuICAgICAgcmVuZGVyKENoYWluZXJVSUNvbnRhaW5lciwgYXBwTm9kZSk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgRXhwZXJpbWVudHNUYWJsZSBmcm9tICcuLi9jb21wb25lbnRzL0V4cGVyaW1lbnRzVGFibGUnO1xuaW1wb3J0IExvZ1Zpc3VhbGl6ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9Mb2dWaXN1YWxpemVyJztcblxuXG5jb25zdCBhcGlFbmRwb2ludCA9ICcvYXBpL3YxJztcblxuY29uc3QgZ2V0U3RhdHMgPSAoZW50aXRpZXMpID0+IHtcbiAgY29uc3QgeyByZXN1bHRzIH0gPSBlbnRpdGllcztcbiAgY29uc3QgYXJnS2V5U2V0ID0ge307XG4gIE9iamVjdC5rZXlzKHJlc3VsdHMpLmZvckVhY2goKHJlc3VsdElkKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgcmVzdWx0LmFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7IGFyZ0tleVNldFthcmcua2V5XSA9IHRydWU7IH0pO1xuICB9KTtcbiAgY29uc3QgYXJnS2V5cyA9IE9iamVjdC5rZXlzKGFyZ0tleVNldCk7XG5cbiAgY29uc3QgYXhlcyA9IHtcbiAgICB4QXhpczoge30sXG4gICAgeUxlZnRBeGlzOiB7fSxcbiAgICB5UmlnaHRBeGlzOiB7fVxuICB9O1xuXG4gIHJldHVybiB7IGF4ZXMsIGFyZ0tleXMgfTtcbn07XG5cbmNsYXNzIENoYWluZXJVSUNvbnRhaW5lciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzLCBjb250ZXh0KSB7XG4gICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgdGhpcy5yZXF1ZXN0UmVzdWx0cyA9IHRoaXMucmVxdWVzdFJlc3VsdHMuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZVRvZ2dsZVJlc3VsdCA9IHRoaXMuaGFuZGxlVG9nZ2xlUmVzdWx0LmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZW50aXRpZXM6IHtcbiAgICAgICAgcmVzdWx0czoge31cbiAgICAgIH0sXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgYXhlczoge1xuICAgICAgICAgIHhBeGlzOiB7XG4gICAgICAgICAgICBheGlzTmFtZTogJ3hBeGlzJyxcbiAgICAgICAgICAgIHhBeGlzS2V5OiAnZXBvY2gnLFxuICAgICAgICAgICAgc2NhbGU6ICdsaW5lYXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5TGVmdEF4aXM6IHtcbiAgICAgICAgICAgIGF4aXNOYW1lOiAneUxlZnRBeGlzJyxcbiAgICAgICAgICAgIHNjYWxlOiAnbGluZWFyJyxcbiAgICAgICAgICAgIC8vIHJhbmdlOiBbMC4wLCAxLjBdLFxuICAgICAgICAgICAgbGluZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc3VsdElkOiAyLFxuICAgICAgICAgICAgICAgIGxvZ0tleTogJ21haW4vbG9zcycsXG4gICAgICAgICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICAgICAgICBjb2xvcjogJyNBQkNERUYnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSxcbiAgICAgICAgICB5UmlnaHRBeGlzOiB7XG4gICAgICAgICAgICBheGlzTmFtZTogJ3lSaWdodEF4aXMnLFxuICAgICAgICAgICAgc2NhbGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgLy8gcmFuZ2U6IFswLjAsIDEuMF0sXG4gICAgICAgICAgICBsaW5lczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzdWx0SWQ6IDMsXG4gICAgICAgICAgICAgICAgbG9nS2V5OiAnbWFpbi9sb3NzJyxcbiAgICAgICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnI0ZFRENCQSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZXF1ZXN0UmVzdWx0cygpO1xuICB9XG5cbiAgcmVxdWVzdFJlc3VsdHMoKSB7XG4gICAgY29uc3QgdXJsID0gcGF0aC5yZXNvbHZlKGFwaUVuZHBvaW50LCAncmVzdWx0cycpO1xuICAgICQuYWpheCh7XG4gICAgICB1cmwsXG4gICAgICB0eXBlOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICB9KVxuICAgICAgLmRvbmUoKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHt9O1xuICAgICAgICBkYXRhLnJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgICAgcmVzdWx0c1tyZXN1bHQuaWRdID0gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZW50aXRpZXM6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUuZW50aXRpZXMsXG4gICAgICAgICAgICByZXN1bHRzXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAuZmFpbCgoKSA9PiB7XG4gICAgICAgIGFsZXJ0KCdXZWIgQVBJIEVycm9yXFxuUGxlYXNlIGNoZWNrIEFQSSBsb2cuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcbiAgICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlVG9nZ2xlUmVzdWx0KHJlc3VsdElkLCBpc1RvZ2dsZWVkKSB7XG4gICAgY29uc3QgeyByZXN1bHRJZHMgfSA9IHRoaXMuc3RhdGU7XG4gICAgbGV0IG5ld1Jlc3VsdElkcyA9IFtdO1xuICAgIGlmIChpc1RvZ2dsZWVkKSB7XG4gICAgICBuZXdSZXN1bHRJZHMgPSByZXN1bHRJZHMuY29uY2F0KHJlc3VsdElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UmVzdWx0SWRzID0gcmVzdWx0SWRzLmZpbHRlcigocmVzSWQpID0+IChyZXNJZCAhPT0gcmVzdWx0SWQpKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICByZXN1bHRJZHM6IG5ld1Jlc3VsdElkc1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgZW50aXRpZXMsIGNvbmZpZyB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBzdGF0cyA9IGdldFN0YXRzKGVudGl0aWVzKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYWluZXItdWktY29udGFpbmVyXCI+XG4gICAgICAgIDxMb2dWaXN1YWxpemVyXG4gICAgICAgICAgZW50aXRpZXM9e2VudGl0aWVzfVxuICAgICAgICAgIHN0YXRzPXtzdGF0c31cbiAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgLz5cbiAgICAgICAgPEV4cGVyaW1lbnRzVGFibGVcbiAgICAgICAgICBlbnRpdGllcz17ZW50aXRpZXN9XG4gICAgICAgICAgc3RhdHM9e3N0YXRzfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFpbmVyVUlDb250YWluZXI7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250YWluZXJzL0NoYWluZXJVSUNvbnRhaW5lci5qc3giLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBTcGxpdCBhIGZpbGVuYW1lIGludG8gW3Jvb3QsIGRpciwgYmFzZW5hbWUsIGV4dF0sIHVuaXggdmVyc2lvblxuLy8gJ3Jvb3QnIGlzIGp1c3QgYSBzbGFzaCwgb3Igbm90aGluZy5cbnZhciBzcGxpdFBhdGhSZSA9XG4gICAgL14oXFwvP3wpKFtcXHNcXFNdKj8pKCg/OlxcLnsxLDJ9fFteXFwvXSs/fCkoXFwuW14uXFwvXSp8KSkoPzpbXFwvXSopJC87XG52YXIgc3BsaXRQYXRoID0gZnVuY3Rpb24oZmlsZW5hbWUpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aFJlLmV4ZWMoZmlsZW5hbWUpLnNsaWNlKDEpO1xufTtcblxuLy8gcGF0aC5yZXNvbHZlKFtmcm9tIC4uLl0sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZXNvbHZlID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXNvbHZlZFBhdGggPSAnJyxcbiAgICAgIHJlc29sdmVkQWJzb2x1dGUgPSBmYWxzZTtcblxuICBmb3IgKHZhciBpID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gLTEgJiYgIXJlc29sdmVkQWJzb2x1dGU7IGktLSkge1xuICAgIHZhciBwYXRoID0gKGkgPj0gMCkgPyBhcmd1bWVudHNbaV0gOiBwcm9jZXNzLmN3ZCgpO1xuXG4gICAgLy8gU2tpcCBlbXB0eSBhbmQgaW52YWxpZCBlbnRyaWVzXG4gICAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGgucmVzb2x2ZSBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9IGVsc2UgaWYgKCFwYXRoKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXNvbHZlZFBhdGggPSBwYXRoICsgJy8nICsgcmVzb2x2ZWRQYXRoO1xuICAgIHJlc29sdmVkQWJzb2x1dGUgPSBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xuICB9XG5cbiAgLy8gQXQgdGhpcyBwb2ludCB0aGUgcGF0aCBzaG91bGQgYmUgcmVzb2x2ZWQgdG8gYSBmdWxsIGFic29sdXRlIHBhdGgsIGJ1dFxuICAvLyBoYW5kbGUgcmVsYXRpdmUgcGF0aHMgdG8gYmUgc2FmZSAobWlnaHQgaGFwcGVuIHdoZW4gcHJvY2Vzcy5jd2QoKSBmYWlscylcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcmVzb2x2ZWRQYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHJlc29sdmVkUGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFyZXNvbHZlZEFic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuICgocmVzb2x2ZWRBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHJlc29sdmVkUGF0aCkgfHwgJy4nO1xufTtcblxuLy8gcGF0aC5ub3JtYWxpemUocGF0aClcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMubm9ybWFsaXplID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgaXNBYnNvbHV0ZSA9IGV4cG9ydHMuaXNBYnNvbHV0ZShwYXRoKSxcbiAgICAgIHRyYWlsaW5nU2xhc2ggPSBzdWJzdHIocGF0aCwgLTEpID09PSAnLyc7XG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocGF0aC5zcGxpdCgnLycpLCBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICEhcDtcbiAgfSksICFpc0Fic29sdXRlKS5qb2luKCcvJyk7XG5cbiAgaWYgKCFwYXRoICYmICFpc0Fic29sdXRlKSB7XG4gICAgcGF0aCA9ICcuJztcbiAgfVxuICBpZiAocGF0aCAmJiB0cmFpbGluZ1NsYXNoKSB7XG4gICAgcGF0aCArPSAnLyc7XG4gIH1cblxuICByZXR1cm4gKGlzQWJzb2x1dGUgPyAnLycgOiAnJykgKyBwYXRoO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5pc0Fic29sdXRlID0gZnVuY3Rpb24ocGF0aCkge1xuICByZXR1cm4gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuam9pbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcGF0aHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xuICByZXR1cm4gZXhwb3J0cy5ub3JtYWxpemUoZmlsdGVyKHBhdGhzLCBmdW5jdGlvbihwLCBpbmRleCkge1xuICAgIGlmICh0eXBlb2YgcCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLmpvaW4gbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfVxuICAgIHJldHVybiBwO1xuICB9KS5qb2luKCcvJykpO1xufTtcblxuXG4vLyBwYXRoLnJlbGF0aXZlKGZyb20sIHRvKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5yZWxhdGl2ZSA9IGZ1bmN0aW9uKGZyb20sIHRvKSB7XG4gIGZyb20gPSBleHBvcnRzLnJlc29sdmUoZnJvbSkuc3Vic3RyKDEpO1xuICB0byA9IGV4cG9ydHMucmVzb2x2ZSh0bykuc3Vic3RyKDEpO1xuXG4gIGZ1bmN0aW9uIHRyaW0oYXJyKSB7XG4gICAgdmFyIHN0YXJ0ID0gMDtcbiAgICBmb3IgKDsgc3RhcnQgPCBhcnIubGVuZ3RoOyBzdGFydCsrKSB7XG4gICAgICBpZiAoYXJyW3N0YXJ0XSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBhcnIubGVuZ3RoIC0gMTtcbiAgICBmb3IgKDsgZW5kID49IDA7IGVuZC0tKSB7XG4gICAgICBpZiAoYXJyW2VuZF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPiBlbmQpIHJldHVybiBbXTtcbiAgICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0LCBlbmQgLSBzdGFydCArIDEpO1xuICB9XG5cbiAgdmFyIGZyb21QYXJ0cyA9IHRyaW0oZnJvbS5zcGxpdCgnLycpKTtcbiAgdmFyIHRvUGFydHMgPSB0cmltKHRvLnNwbGl0KCcvJykpO1xuXG4gIHZhciBsZW5ndGggPSBNYXRoLm1pbihmcm9tUGFydHMubGVuZ3RoLCB0b1BhcnRzLmxlbmd0aCk7XG4gIHZhciBzYW1lUGFydHNMZW5ndGggPSBsZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZnJvbVBhcnRzW2ldICE9PSB0b1BhcnRzW2ldKSB7XG4gICAgICBzYW1lUGFydHNMZW5ndGggPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdmFyIG91dHB1dFBhcnRzID0gW107XG4gIGZvciAodmFyIGkgPSBzYW1lUGFydHNMZW5ndGg7IGkgPCBmcm9tUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRQYXJ0cy5wdXNoKCcuLicpO1xuICB9XG5cbiAgb3V0cHV0UGFydHMgPSBvdXRwdXRQYXJ0cy5jb25jYXQodG9QYXJ0cy5zbGljZShzYW1lUGFydHNMZW5ndGgpKTtcblxuICByZXR1cm4gb3V0cHV0UGFydHMuam9pbignLycpO1xufTtcblxuZXhwb3J0cy5zZXAgPSAnLyc7XG5leHBvcnRzLmRlbGltaXRlciA9ICc6JztcblxuZXhwb3J0cy5kaXJuYW1lID0gZnVuY3Rpb24ocGF0aCkge1xuICB2YXIgcmVzdWx0ID0gc3BsaXRQYXRoKHBhdGgpLFxuICAgICAgcm9vdCA9IHJlc3VsdFswXSxcbiAgICAgIGRpciA9IHJlc3VsdFsxXTtcblxuICBpZiAoIXJvb3QgJiYgIWRpcikge1xuICAgIC8vIE5vIGRpcm5hbWUgd2hhdHNvZXZlclxuICAgIHJldHVybiAnLic7XG4gIH1cblxuICBpZiAoZGlyKSB7XG4gICAgLy8gSXQgaGFzIGEgZGlybmFtZSwgc3RyaXAgdHJhaWxpbmcgc2xhc2hcbiAgICBkaXIgPSBkaXIuc3Vic3RyKDAsIGRpci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHJldHVybiByb290ICsgZGlyO1xufTtcblxuXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24ocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gc3BsaXRQYXRoKHBhdGgpWzJdO1xuICAvLyBUT0RPOiBtYWtlIHRoaXMgY29tcGFyaXNvbiBjYXNlLWluc2Vuc2l0aXZlIG9uIHdpbmRvd3M/XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5cbmV4cG9ydHMuZXh0bmFtZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHNwbGl0UGF0aChwYXRoKVszXTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZXN1bHRSb3cgZnJvbSAnLi9SZXN1bHRSb3cnO1xuXG5cbmNvbnN0IEV4cGVyaW1lbnRzVGFibGUgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBzdGF0cyB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgcmVzdWx0cyB9ID0gcHJvcHMuZW50aXRpZXMgfHwge307XG4gIGNvbnN0IHsgYXJnS2V5cyB9ID0gc3RhdHM7XG5cbiAgY29uc3QgYXJnSGVhZGVyRWxlbXMgPSBhcmdLZXlzLm1hcCgoYXJnS2V5KSA9PiAoPHRoIGtleT17YGFyZ3MtJHthcmdLZXl9YH0+PHNwYW4gY2xhc3NOYW1lPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jb2dcIiAvPnthcmdLZXl9PC90aD4pKTtcblxuICBjb25zdCByZXN1bHRSb3dFbGVtcyA9IE9iamVjdC5rZXlzKHJlc3VsdHMpLm1hcCgocmVzdWx0SWQpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSByZXN1bHRzW3Jlc3VsdElkXTtcbiAgICBjb25zdCBrZXkgPSBgcmVzdWx0LXJvdy0ke3Jlc3VsdC5pZH1gO1xuICAgIHJldHVybiAoXG4gICAgICA8UmVzdWx0Um93XG4gICAgICAgIHJlc3VsdD17cmVzdWx0fVxuICAgICAgICBzdGF0cz17c3RhdHN9XG4gICAgICAgIGtleT17a2V5fVxuICAgICAgLz5cbiAgICApO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZSB0YWJsZS1ob3ZlclwiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPmlkPC90aD5cbiAgICAgICAgICA8dGg+cGF0aCBuYW1lPC90aD5cbiAgICAgICAgICA8dGg+ZXBvY2g8L3RoPlxuICAgICAgICAgIDx0aD5pdGVyYXRpb248L3RoPlxuICAgICAgICAgIDx0aD5lbGFwc2VkX3RpbWU8L3RoPlxuICAgICAgICAgIHthcmdIZWFkZXJFbGVtc31cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIHtyZXN1bHRSb3dFbGVtc31cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgKTtcbn07XG5cbkV4cGVyaW1lbnRzVGFibGUucHJvcFR5cGVzID0ge1xuICBlbnRpdGllczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBpZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcGF0aE5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgICAgICBsb2dzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICAgICAgfSlcbiAgICApXG4gIH0pLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBhcmdLZXlzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9KVxufTtcbkV4cGVyaW1lbnRzVGFibGUuZGVmYXVsdFByb3BzID0ge1xuICBlbnRpdGllczoge1xuICAgIHJlc3VsdHM6IHt9XG4gIH0sXG4gIHN0YXRzOiB7XG4gICAgYXJnS2V5czogW11cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZXJpbWVudHNUYWJsZTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvRXhwZXJpbWVudHNUYWJsZS5qc3giLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuXG5jb25zdCBlbXB0eVN0ciA9ICctJztcblxuY29uc3QgUmVzdWx0Um93ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IHsgcmVzdWx0LCBzdGF0cyB9ID0gcHJvcHM7XG4gIGNvbnN0IHsgYXJncywgbG9ncyB9ID0gcmVzdWx0O1xuXG4gIGNvbnN0IGxhc3RMb2cgPSBsb2dzW2xvZ3MubGVuZ3RoIC0gMV0gfHwge307XG4gIGNvbnN0IGxhc3RMb2dEaWN0ID0ge307XG4gIGxhc3RMb2cubG9nSXRlbXMuZm9yRWFjaCgobG9nSXRlbSkgPT4geyBsYXN0TG9nRGljdFtsb2dJdGVtLmtleV0gPSBsb2dJdGVtLnZhbHVlOyB9KTtcblxuICBjb25zdCBhcmdEaWN0ID0ge307XG4gIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgYXJnRGljdFthcmcua2V5XSA9IGFyZy52YWx1ZTtcbiAgfSk7XG4gIGNvbnN0IGFyZ0VsZW1zID0gc3RhdHMuYXJnS2V5cy5tYXAoKGFyZ0tleSkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSAoYXJnS2V5IGluIGFyZ0RpY3QpID8gYXJnRGljdFthcmdLZXldIDogZW1wdHlTdHI7XG4gICAgcmV0dXJuICg8dGQga2V5PXtgYXJncy0ke2FyZ0tleX1gfT57Y29udGVudH08L3RkPik7XG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPHRyPlxuICAgICAgPHRkPntyZXN1bHQuaWR9PC90ZD5cbiAgICAgIDx0ZD57cmVzdWx0LnBhdGhOYW1lfTwvdGQ+XG4gICAgICA8dGQ+e2xhc3RMb2dEaWN0LmVwb2NofTwvdGQ+XG4gICAgICA8dGQ+e2xhc3RMb2dEaWN0Lml0ZXJhdGlvbn08L3RkPlxuICAgICAgPHRkPntsYXN0TG9nRGljdC5lbGFwc2VkX3RpbWV9PC90ZD5cbiAgICAgIHthcmdFbGVtc31cbiAgICA8L3RyPlxuICApO1xufTtcblxuUmVzdWx0Um93LnByb3BUeXBlcyA9IHtcbiAgcmVzdWx0OiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGlkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHBhdGhOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFyZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGxvZ3M6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpXG4gIH0pLmlzUmVxdWlyZWQsXG4gIHN0YXRzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIGFyZ0tleXM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcpXG4gIH0pXG59O1xuXG5SZXN1bHRSb3cuZGVmYXVsdFByb3BzID0ge1xuICBzdGF0czoge1xuICAgIGFyZ0tleXM6IFtdXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlc3VsdFJvdztcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvUmVzdWx0Um93LmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtcbiAgTGluZUNoYXJ0LFxuICBMaW5lLFxuICBYQXhpcyxcbiAgWUF4aXMsXG4gIENhcnRlc2lhbkdyaWQsXG4gIFRvb2x0aXAsXG4gIExlZ2VuZFxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBSYW5nZSB9IGZyb20gJ3JjLXNsaWRlcic7XG5pbXBvcnQgJ3JjLXNsaWRlci9hc3NldHMvaW5kZXguY3NzJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgQXhpc0NvbmZpZ3VyYXRvciBmcm9tICcuL0F4aXNDb25maWd1cmF0b3InO1xuaW1wb3J0IExpbmVzQ29uZmlndXJhdG9yIGZyb20gJy4vTGluZXNDb25maWd1cmF0b3InO1xuXG5cbmNvbnN0IHNsaWRlclN0ZXBzID0gMTAwLjA7XG5jb25zdCBkZWZhdWx0U3RhdHMgPSB7XG4gIGF4ZXM6IHtcbiAgICB4QXhpczoge30sXG4gICAgeUxlZnRBeGlzOiB7fSxcbiAgICB5UmlnaHRBeGlzOiB7fVxuICB9XG59O1xuXG5jb25zdCBkZWZhdWx0UmFuZ2UgPSBbMCwgMTAwXTtcbmNvbnN0IGRlZmF1bHRYQXhpc0NvbmZpZyA9IHtcbiAgYXhpc05hbWU6ICd4QXhpcycsXG4gIHhBeGlzS2V5OiAnZXBvY2gnLFxuICBzY2FsZTogJ2xpbmVhcicsXG4gIHJhbmdlOiBkZWZhdWx0UmFuZ2Vcbn07XG5jb25zdCBkZWZhdWx0WUF4aXNDb25maWcgPSB7XG4gIGF4aXNOYW1lOiAnJyxcbiAgc2NhbGU6ICdsaW5lYXInLFxuICByYW5nZTogZGVmYXVsdFJhbmdlLFxuICBsaW5lczogW11cbn07XG5jb25zdCBkZWZhdWx0Q29uZmlnID0ge1xuICBheGVzOiB7XG4gICAgeEF4aXM6IGRlZmF1bHRYQXhpc0NvbmZpZyxcbiAgICB5TGVmdEF4aXM6IHsgLi4uZGVmYXVsdFlBeGlzQ29uZmlnLCBheGlzTmFtZTogJ3lMZWZ0QXhpcycgfSxcbiAgICB5UmlnaHRBeGlzOiB7IC4uLmRlZmF1bHRZQXhpc0NvbmZpZywgYXhpc05hbWU6ICd5UmlnaHRBeGlzJyB9XG4gIH1cbn07XG5cbmNvbnN0IGJ1aWxkTGluZUVsZW0gPSAobGluZSwgYXhpc05hbWUpID0+IHtcbiAgY29uc3QgeyBjb25maWcgPSB7fSB9ID0gbGluZTtcbiAgY29uc3QgeyBsaW5lMmtleSwgbGluZTJkYXRhS2V5IH0gPSBVdGlscztcblxuICByZXR1cm4gKFxuICAgIDxMaW5lXG4gICAgICB0eXBlPVwibW9ub3RvbmVcIlxuICAgICAgbmFtZT17bGluZTJrZXkobGluZSl9XG4gICAgICBkYXRhS2V5PXtsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpfVxuICAgICAgeUF4aXNJZD17YXhpc05hbWV9XG4gICAgICBzdHJva2U9e2NvbmZpZy5jb2xvcn1cbiAgICAgIGNvbm5lY3ROdWxsc1xuICAgICAgaXNBbmltYXRpb25BY3RpdmU9e2ZhbHNlfVxuICAgICAga2V5PXtsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpfVxuICAgIC8+XG4gICk7XG59O1xuXG5jb25zdCBidWlsZExpbmVFbGVtcyA9IChheGlzTmFtZSwgY29uZmlnKSA9PiB7XG4gIGNvbnN0IGF4aXNDb25maWcgPSBjb25maWcuYXhlc1theGlzTmFtZV07XG4gIGNvbnN0IHsgbGluZXMgPSBbXSB9ID0gYXhpc0NvbmZpZztcbiAgcmV0dXJuIGxpbmVzLm1hcCgobGluZSkgPT4gYnVpbGRMaW5lRWxlbShsaW5lLCBheGlzTmFtZSkpO1xufTtcblxuY2xhc3MgTG9nVmlzdWFsaXplciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgbGluZTJkYXRhS2V5IH0gPSBVdGlscztcbiAgICBjb25zdCB7IGVudGl0aWVzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcmVzdWx0cyA9IHt9IH0gPSBlbnRpdGllcztcbiAgICBjb25zdCBzdGF0cyA9IHRoaXMucHJvcHMuc3RhdHMgfHwgZGVmYXVsdFN0YXRzO1xuICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMucHJvcHMuY29uZmlnIHx8IGRlZmF1bHRDb25maWc7XG4gICAgY29uc3QgeyB4QXhpcywgeUxlZnRBeGlzLCB5UmlnaHRBeGlzIH0gPSBjb25maWcuYXhlcztcbiAgICBjb25zdCB7IHhBeGlzS2V5IH0gPSB4QXhpcztcbiAgICBjb25zdCBsZWZ0TGluZXMgPSB5TGVmdEF4aXMubGluZXMgfHwgW107XG4gICAgY29uc3QgcmlnaHRMaW5lcyA9IHlSaWdodEF4aXMubGluZXMgfHwgW107XG4gICAgY29uc3QgYXhpc0xpbmVzID0ge1xuICAgICAgeUxlZnRBeGlzOiBsZWZ0TGluZXMsXG4gICAgICB5UmlnaHRBeGlzOiByaWdodExpbmVzXG4gICAgfTtcbiAgICBjb25zdCB4UmFuZ2UgPSB4QXhpcy5yYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeUxlZnRSYW5nZSA9IHlMZWZ0QXhpcy5yYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeVJpZ2h0UmFuZ2UgPSB5UmlnaHRBeGlzLnJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcbiAgICBjb25zdCB4VmFsdWVSYW5nZSA9IHN0YXRzLmF4ZXMueEF4aXMudmFsdWVSYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeUxlZnRWYWx1ZVJhbmdlID0gc3RhdHMuYXhlcy55TGVmdEF4aXMudmFsdWVSYW5nZSB8fCBkZWZhdWx0UmFuZ2U7XG4gICAgY29uc3QgeVJpZ2h0VmFsdWVSYW5nZSA9IHN0YXRzLmF4ZXMueVJpZ2h0QXhpcy52YWx1ZVJhbmdlIHx8IGRlZmF1bHRSYW5nZTtcblxuICAgIGNvbnN0IGNoYXJ0V2lkdGggPSA2NDA7XG4gICAgY29uc3QgY2hhcnRIZWlnaHQgPSAzNjA7XG5cbiAgICBjb25zdCBkYXRhRGljdCA9IHt9OyAvLyBleC4gMTogeyBlcG9jaDogMSwgMTJfbWFpbl9sb3NzOiAwLjAxMSwgLi4uIH1cbiAgICBPYmplY3Qua2V5cyhheGlzTGluZXMpLmZvckVhY2goKGF4aXNOYW1lKSA9PiB7XG4gICAgICBjb25zdCBsaW5lcyA9IGF4aXNMaW5lc1theGlzTmFtZV07XG4gICAgICBsaW5lcy5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0SWQsIGxvZ0tleSB9ID0gbGluZTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVzdWx0c1tyZXN1bHRJZF07XG4gICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsb2dzID0gcmVzdWx0LmxvZ3MgfHwgW107XG4gICAgICAgIGxvZ3MuZm9yRWFjaCgobG9nKSA9PiB7XG4gICAgICAgICAgY29uc3QgbG9nRGljdCA9IHt9O1xuICAgICAgICAgIGxvZy5sb2dJdGVtcy5mb3JFYWNoKChsb2dJdGVtKSA9PiB7XG4gICAgICAgICAgICBsb2dEaWN0W2xvZ0l0ZW0ua2V5XSA9IGxvZ0l0ZW0udmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGxvZ0RpY3RbeEF4aXNLZXldID09IG51bGwgfHwgbG9nRGljdFtsb2dLZXldID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRhdGFEaWN0W2xvZ0RpY3RbeEF4aXNLZXldXSA9PSBudWxsKSB7XG4gICAgICAgICAgICBkYXRhRGljdFtsb2dEaWN0W3hBeGlzS2V5XV0gPSB7IFt4QXhpc0tleV06IGxvZ0RpY3RbeEF4aXNLZXldIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFEaWN0W2xvZ0RpY3RbeEF4aXNLZXldXVtsaW5lMmRhdGFLZXkobGluZSwgYXhpc05hbWUpXSA9IGxvZ0RpY3RbbG9nS2V5XTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmtleXMoZGF0YURpY3QpLm1hcCgoa2V5KSA9PiAoZGF0YURpY3Rba2V5XSkpO1xuXG4gICAgY29uc3QgbGluZUVsZW1zID0gWy4uLmJ1aWxkTGluZUVsZW1zKCd5TGVmdEF4aXMnLCBjb25maWcpLCAuLi5idWlsZExpbmVFbGVtcygneVJpZ2h0QXhpcycsIGNvbmZpZyldO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibG9nLXZpc3VhbGl6ZXItcm9vdCByb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tOFwiPlxuICAgICAgICAgIDx0YWJsZT5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxSYW5nZVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAke2NoYXJ0SGVpZ2h0fXB4YCB9fVxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICBtaW49e3lMZWZ0VmFsdWVSYW5nZVswXX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXt5TGVmdFZhbHVlUmFuZ2VbMV19XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9eyh5TGVmdFJhbmdlWzFdIC0geUxlZnRSYW5nZVswXSkgLyBzbGlkZXJTdGVwc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3lMZWZ0UmFuZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPExpbmVDaGFydFxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17Y2hhcnRXaWR0aH1cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtjaGFydEhlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luPXt7IHRvcDogNSwgcmlnaHQ6IDMwLCBsZWZ0OiAyMCwgYm90dG9tOiA1IH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxYQXhpc1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGRhdGFLZXk9e3hBeGlzS2V5fVxuICAgICAgICAgICAgICAgICAgICAgIHNjYWxlPXt4QXhpcy5zY2FsZX1cbiAgICAgICAgICAgICAgICAgICAgICBhbGxvd0RhdGFPdmVyZmxvd1xuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8WUF4aXNcbiAgICAgICAgICAgICAgICAgICAgICB5QXhpc0lkPVwieUxlZnRBeGlzXCJcbiAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbj1cImxlZnRcIlxuICAgICAgICAgICAgICAgICAgICAgIHNjYWxlPXt5TGVmdEF4aXMuc2NhbGV9XG4gICAgICAgICAgICAgICAgICAgICAgYWxsb3dEYXRhT3ZlcmZsb3dcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPFlBeGlzXG4gICAgICAgICAgICAgICAgICAgICAgeUF4aXNJZD1cInlSaWdodEF4aXNcIlxuICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uPVwicmlnaHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHNjYWxlPXt5UmlnaHRBeGlzLnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICAgIGFsbG93RGF0YU92ZXJmbG93XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxUb29sdGlwIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMZWdlbmQgLz5cbiAgICAgICAgICAgICAgICAgICAge2xpbmVFbGVtc31cbiAgICAgICAgICAgICAgICAgIDwvTGluZUNoYXJ0PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGhlaWdodDogYCR7Y2hhcnRIZWlnaHR9cHhgIH19XG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsXG4gICAgICAgICAgICAgICAgICAgIG1pbj17eVJpZ2h0VmFsdWVSYW5nZVswXX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXt5UmlnaHRWYWx1ZVJhbmdlWzFdfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXsoeVJpZ2h0UmFuZ2VbMV0gLSB5UmlnaHRSYW5nZVswXSkgLyBzbGlkZXJTdGVwc31cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3lSaWdodFJhbmdlfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIC8+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFJhbmdlXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtjaGFydFdpZHRofXB4YCwgbWFyZ2luOiAnYXV0bycgfX1cbiAgICAgICAgICAgICAgICAgICAgbWluPXt4VmFsdWVSYW5nZS5taW59XG4gICAgICAgICAgICAgICAgICAgIG1heD17eFZhbHVlUmFuZ2UubWF4fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17eFJhbmdlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VYUmFuZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIC8+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00XCI+XG4gICAgICAgICAgPEF4aXNDb25maWd1cmF0b3IgYXhpc0NvbmZpZz17eUxlZnRBeGlzfT5cbiAgICAgICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgICBlbnRpdGllcz17ZW50aXRpZXN9XG4gICAgICAgICAgICAgIGxpbmVzPXt5TGVmdEF4aXMubGluZXN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQXhpc0NvbmZpZ3VyYXRvcj5cbiAgICAgICAgICA8QXhpc0NvbmZpZ3VyYXRvciBheGlzQ29uZmlnPXt5UmlnaHRBeGlzfT5cbiAgICAgICAgICAgIDxMaW5lc0NvbmZpZ3VyYXRvclxuICAgICAgICAgICAgICBlbnRpdGllcz17ZW50aXRpZXN9XG4gICAgICAgICAgICAgIGxpbmVzPXt5UmlnaHRBeGlzLmxpbmVzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0F4aXNDb25maWd1cmF0b3I+XG4gICAgICAgICAgPEF4aXNDb25maWd1cmF0b3IgYXhpc0NvbmZpZz17eEF4aXN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Mb2dWaXN1YWxpemVyLnByb3BUeXBlcyA9IHtcbiAgZW50aXRpZXM6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcmVzdWx0czogUHJvcFR5cGVzLm9iamVjdE9mKFByb3BUeXBlcy5hbnkpXG4gIH0pLFxuICBzdGF0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5zaGFwZSh7IHZhbHVlUmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpIH0pLFxuICAgICAgeUxlZnRBeGlzOiBQcm9wVHlwZXMuc2hhcGUoeyB2YWx1ZVJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSB9KSxcbiAgICAgIHlSaWdodEF4aXM6IFByb3BUeXBlcy5zaGFwZSh7IHZhbHVlUmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpIH0pXG4gICAgfSlcbiAgfSksXG4gIGNvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgeEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5TGVmdEF4aXM6IFByb3BUeXBlcy5hbnksXG4gICAgICB5UmlnaHRBeGlzOiBQcm9wVHlwZXMuYW55XG4gICAgfSlcbiAgfSlcbn07XG5Mb2dWaXN1YWxpemVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZW50aXRpZXM6IHtcbiAgICByZXN1bHRzOiB7fVxuICB9LFxuICBzdGF0czogZGVmYXVsdFN0YXRzLFxuICBjb25maWc6IGRlZmF1bHRDb25maWdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IExvZ1Zpc3VhbGl6ZXI7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xvZ1Zpc3VhbGl6ZXIuanN4IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYy1zbGlkZXIvYXNzZXRzL2luZGV4LmNzc1xuLy8gbW9kdWxlIGlkID0gODUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEF4aXNTY2FsZVNlbGVjdG9yIGZyb20gJy4vQXhpc1NjYWxlU2VsZWN0b3InO1xuXG5cbmNvbnN0IGRlZmF1bHRBeGlzQ29uZmlnID0ge1xuICBheGlzTmFtZTogJycsXG4gIHNjYWxlOiAnYXV0bycsXG4gIHJhbmdlOiBbMCwgMTAwXVxufTtcblxuY2xhc3MgQXhpc0NvbmZpZ3VyYXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2VTY2FsZSA9IHRoaXMuaGFuZGxlQ2hhbmdlU2NhbGUuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNjYWxlKHNjYWxlKSB7XG4gICAgY29uc3QgeyBheGlzTmFtZSB9ID0gdGhpcy5wcm9wcy5heGlzQ29uZmlnO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2VTY2FsZShheGlzTmFtZSwgc2NhbGUpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgYXhpc05hbWUsIHNjYWxlIH0gPSB0aGlzLnByb3BzLmF4aXNDb25maWc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJheGlzLWNvbmZpZ3VyYXRvciBwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS02XCI+e2F4aXNOYW1lfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tNlwiPlxuICAgICAgICAgICAgICA8QXhpc1NjYWxlU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBzY2FsZT17c2NhbGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlU2NhbGV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5BeGlzQ29uZmlndXJhdG9yLnByb3BUeXBlcyA9IHtcbiAgYXhpc0NvbmZpZzogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBheGlzTmFtZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHNjYWxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHJhbmdlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKVxuICB9KSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LFxuICBvbkNoYW5nZVNjYWxlOiBQcm9wVHlwZXMuZnVuY1xufTtcbkF4aXNDb25maWd1cmF0b3IuZGVmYXVsdFByb3BzID0ge1xuICBheGlzQ29uZmlnOiBkZWZhdWx0QXhpc0NvbmZpZyxcbiAgY2hpbGRyZW46IG51bGwsXG4gIG9uQ2hhbmdlU2NhbGU6ICgpID0+IHt9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlzQ29uZmlndXJhdG9yO1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29tcG9uZW50cy9BeGlzQ29uZmlndXJhdG9yLmpzeCIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5cbmNvbnN0IHNjYWxlT3B0aW9ucyA9IFsnbGluZWFyJywgJ2xvZyddO1xuXG5jb25zdCBBeGlzU2NhbGVTZWxlY3RvciA9IChwcm9wcykgPT4ge1xuICBjb25zdCB7IHNjYWxlLCBvbkNoYW5nZSB9ID0gcHJvcHM7XG4gIGNvbnN0IGhhbmRsZUNoYW5nZUF4aXNLZXkgPSAoZSkgPT4ge1xuICAgIG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBvcHRpb25zID0gc2NhbGVPcHRpb25zLm1hcCgoc2NhbGVLZXkpID0+IChcbiAgICA8b3B0aW9uIHZhbHVlPXtzY2FsZUtleX0ga2V5PXtzY2FsZUtleX0+e3NjYWxlS2V5fTwvb3B0aW9uPlxuICApKTtcbiAgcmV0dXJuIChcbiAgICA8c2VsZWN0IGlkPVwiYXhpcy1zY2FsZS1zZWxlY3Rvci1zZWxlY3RcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiB2YWx1ZT17c2NhbGV9IG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2VBeGlzS2V5fT5cbiAgICAgIHtvcHRpb25zfVxuICAgIDwvc2VsZWN0PlxuICApO1xufTtcblxuQXhpc1NjYWxlU2VsZWN0b3IucHJvcFR5cGVzID0ge1xuICBzY2FsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXG59O1xuXG5BeGlzU2NhbGVTZWxlY3Rvci5kZWZhdWx0UHJvcHMgPSB7XG4gIHNjYWxlOiAnJyxcbiAgb25DaGFuZ2U6ICgpID0+IHt9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlzU2NhbGVTZWxlY3RvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvQXhpc1NjYWxlU2VsZWN0b3IuanN4IiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IExpbmVDb25maWd1cmF0b3IgZnJvbSAnLi9MaW5lQ29uZmlndXJhdG9yJztcblxuXG5jbGFzcyBMaW5lc0NvbmZpZ3VyYXRvciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXRlID0ge307XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlbnRpdGllcywgbGluZXMgPSBbXSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGxpbmUya2V5IH0gPSBVdGlscztcblxuICAgIGNvbnN0IGxpbmVDb25maWd1cmF0b3JFbGVtcyA9IGxpbmVzLm1hcCgobGluZSkgPT4gKFxuICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtZ3JvdXAtaXRlbVwiIGtleT17bGluZTJrZXkobGluZSl9PlxuICAgICAgICA8TGluZUNvbmZpZ3VyYXRvciBlbnRpdGllcz17ZW50aXRpZXN9IGxpbmU9e2xpbmV9IC8+XG4gICAgICA8L2xpPlxuICAgICkpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWdyb3VwXCI+XG4gICAgICAgIHtsaW5lQ29uZmlndXJhdG9yRWxlbXN9XG4gICAgICA8L3VsPlxuICAgICk7XG4gIH1cbn1cblxuTGluZXNDb25maWd1cmF0b3IucHJvcFR5cGVzID0ge1xuICBlbnRpdGllczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICByZXN1bHRzOiBQcm9wVHlwZXMub2JqZWN0T2YoUHJvcFR5cGVzLmFueSlcbiAgfSkuaXNSZXF1aXJlZCxcbiAgbGluZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICByZXN1bHRJZDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0pXG4gIClcbn07XG5cbkxpbmVzQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGluZXM6IFtdXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5lc0NvbmZpZ3VyYXRvcjtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbXBvbmVudHMvTGluZXNDb25maWd1cmF0b3IuanN4IiwiY2xhc3MgVXRpbHMge1xuICBzdGF0aWMgbGluZTJrZXkobGluZSkge1xuICAgIHJldHVybiBgJHtsaW5lLnJlc3VsdElkfV8ke2xpbmUubG9nS2V5fWA7XG4gIH1cblxuICBzdGF0aWMgbGluZTJkYXRhS2V5KGxpbmUsIGF4aXNOYW1lKSB7XG4gICAgcmV0dXJuIGAke2F4aXNOYW1lfV8ke1V0aWxzLmxpbmUya2V5KGxpbmUpfWA7XG4gIH1cblxuICBzdGF0aWMgdHJ1bmNhdGVGb3J3YXJkKHN0cmluZywgbGVuZ3RoLCBiZWdpbm5pbmcgPSAnLi4uJykge1xuICAgIGNvbnN0IHN0ciA9IHN0cmluZyB8fCAnJztcbiAgICBpZiAoc3RyLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGJlZ2lubmluZyArIHN0ci5zdWJzdHJpbmcoKHN0ci5sZW5ndGggLSBsZW5ndGgpICsgYmVnaW5uaW5nLmxlbmd0aCwgc3RyLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVXRpbHM7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9pbmRleC5qcyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3V0aWxzJztcblxuXG5jbGFzcyBMaW5lQ29uZmlndXJhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGVudGl0aWVzLCBsaW5lID0ge30gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyByZXN1bHRzID0ge30gfSA9IGVudGl0aWVzO1xuICAgIGNvbnN0IHJlc3VsdCA9IHJlc3VsdHNbbGluZS5yZXN1bHRJZF0gfHwge307XG4gICAgY29uc3QgeyBjb25maWcgPSB7fSB9ID0gbGluZTtcbiAgICBjb25zdCB7IHRydW5jYXRlRm9yd2FyZCB9ID0gVXRpbHM7XG5cbiAgICBjb25zdCBjb2xvckJsb2NrU3R5bGUgPSB7XG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMTVweCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbmZpZy5jb2xvclxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc20tMVwiIHN0eWxlPXtjb2xvckJsb2NrU3R5bGV9IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNtLTVcIj57dHJ1bmNhdGVGb3J3YXJkKHJlc3VsdC5wYXRoTmFtZSwgMjQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS00XCI+e2xpbmUubG9nS2V5fTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zbS0xXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj48c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuTGluZUNvbmZpZ3VyYXRvci5wcm9wVHlwZXMgPSB7XG4gIGVudGl0aWVzOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJlc3VsdHM6IFByb3BUeXBlcy5vYmplY3RPZihQcm9wVHlwZXMuYW55KVxuICB9KS5pc1JlcXVpcmVkLFxuICBsaW5lOiBQcm9wVHlwZXMuc2hhcGUoe1xuICAgIHJlc3VsdElkOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGxvZ0tleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb25maWc6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBjb2xvcjogUHJvcFR5cGVzLnN0cmluZ1xuICAgIH0pXG4gIH0pXG59O1xuXG5MaW5lQ29uZmlndXJhdG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgbGluZToge31cbn07XG5cbmV4cG9ydCBkZWZhdWx0IExpbmVDb25maWd1cmF0b3I7XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb21wb25lbnRzL0xpbmVDb25maWd1cmF0b3IuanN4Il0sInNvdXJjZVJvb3QiOiIifQ==