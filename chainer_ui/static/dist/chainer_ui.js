webpackJsonp([0],{

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(298);


/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_hot_loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_hot_loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__containers_ChainerUIContainer__ = __webpack_require__(402);





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

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_ExperimentsTable__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_LogVisualizer__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_LogKeySelector__ = __webpack_require__(698);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var apiEndpoint = '/api/v1';

var ChainerUIContainer = function (_React$Component) {
  _inherits(ChainerUIContainer, _React$Component);

  function ChainerUIContainer(props, context) {
    _classCallCheck(this, ChainerUIContainer);

    var _this = _possibleConstructorReturn(this, (ChainerUIContainer.__proto__ || Object.getPrototypeOf(ChainerUIContainer)).call(this, props, context));

    _this.getLogAndArgsKeys = _this.getLogAndArgsKeys.bind(_this);
    _this.requestExperiments = _this.requestExperiments.bind(_this);
    _this.handleCangeLogKey = _this.handleCangeLogKey.bind(_this);
    _this.handleToggleResult = _this.handleToggleResult.bind(_this);

    _this.state = {
      experiments: [],
      resultIds: [],
      logKey: ''
    };

    _this.requestExperiments();
    return _this;
  }

  _createClass(ChainerUIContainer, [{
    key: 'getLogAndArgsKeys',
    value: function getLogAndArgsKeys() {
      var experiments = this.state.experiments;

      var logKeysSet = {};
      var argKeysSet = {};
      experiments.forEach(function (experiment) {
        experiment.results.forEach(function (result) {
          result.logs.forEach(function (log) {
            Object.keys(log).forEach(function (logKey) {
              logKeysSet[logKey] = true;
            });
          });
          Object.keys(result.args).forEach(function (argKey) {
            argKeysSet[argKey] = true;
          });
        });
      });
      return {
        logKeys: Object.keys(logKeysSet),
        argKeys: Object.keys(argKeysSet)
      };
    }
  }, {
    key: 'requestExperiments',
    value: function requestExperiments() {
      var _this2 = this;

      var url = __WEBPACK_IMPORTED_MODULE_2_path___default.a.resolve(apiEndpoint, 'experiments');
      __WEBPACK_IMPORTED_MODULE_1_jquery___default.a.ajax({
        url: url,
        type: 'GET',
        dataType: 'json'
      }).done(function (data) {
        _this2.setState({
          experiments: data.experiments
        });
      });
    }
  }, {
    key: 'handleCangeLogKey',
    value: function handleCangeLogKey(e) {
      this.setState({
        logKey: e.target.value
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
          experiments = _state.experiments,
          resultIds = _state.resultIds,
          logKey = _state.logKey;

      var _getLogAndArgsKeys = this.getLogAndArgsKeys(),
          logKeys = _getLogAndArgsKeys.logKeys,
          argKeys = _getLogAndArgsKeys.argKeys;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'chainer-ui-container' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'row' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-sm-9' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__components_LogVisualizer__["a" /* default */], {
              experiments: experiments,
              resultIds: resultIds,
              logKey: logKey
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'col-sm-3' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__components_LogKeySelector__["a" /* default */], {
              logKey: logKey,
              logKeys: logKeys,
              onChangeLogKey: this.handleCangeLogKey
            })
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__components_ExperimentsTable__["a" /* default */], {
          experiments: experiments,
          selectedResultIds: resultIds,
          argKeys: argKeys,
          onToggleResult: this.handleToggleResult
        })
      );
    }
  }]);

  return ChainerUIContainer;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ChainerUIContainer);

/***/ }),

/***/ 403:
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)))

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ResultRow__ = __webpack_require__(405);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ExperimentsTable = function (_React$Component) {
  _inherits(ExperimentsTable, _React$Component);

  function ExperimentsTable(props, context) {
    _classCallCheck(this, ExperimentsTable);

    var _this = _possibleConstructorReturn(this, (ExperimentsTable.__proto__ || Object.getPrototypeOf(ExperimentsTable)).call(this, props, context));

    _this.handleToggleResult = _this.handleToggleResult.bind(_this);
    return _this;
  }

  _createClass(ExperimentsTable, [{
    key: 'handleToggleResult',
    value: function handleToggleResult(resultId, isToggleed) {
      this.props.onToggleResult(resultId, isToggleed);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          experiments = _props.experiments,
          selectedResultIds = _props.selectedResultIds,
          argKeys = _props.argKeys;

      var selectedResultIdsSet = {};
      selectedResultIds.forEach(function (resultId) {
        selectedResultIdsSet[resultId] = true;
      });

      var argKeyHeaderElems = argKeys.map(function (argKey) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'th',
          { key: 'args-' + argKey },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('span', { className: 'glyphicon glyphicon-cog' }),
          argKey
        );
      });

      var resultRows = experiments.map(function (experiment) {
        if (experiment.results.length === 0) {
          // experiment with no results
          var key = 'result-row-' + experiment.id;
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ResultRow__["a" /* default */], { xpName: experiment.name, argKeys: argKeys, key: key });
        }
        return experiment.results.map(function (result) {
          var key = 'result-row-' + experiment.id + '-' + result.id;
          return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ResultRow__["a" /* default */], {
            xpName: experiment.name,
            argKeys: argKeys,
            result: result,
            selected: selectedResultIdsSet[result.id],
            onToggle: _this2.handleToggleResult,
            key: key
          });
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
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('th', null),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'experiment name'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'th',
              null,
              'result name'
            ),
            argKeyHeaderElems,
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
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'tbody',
          null,
          resultRows
        )
      );
    }
  }]);

  return ExperimentsTable;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ExperimentsTable.propTypes = {
  experiments: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  })).isRequired,
  selectedResultIds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number),
  argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  onToggleResult: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
ExperimentsTable.defaultProps = {
  selectedResultIds: [],
  argKeys: [],
  onToggleResult: function onToggleResult() {}
};

/* harmony default export */ __webpack_exports__["a"] = (ExperimentsTable);

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
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

    _this.handleToggle = _this.handleToggle.bind(_this);
    return _this;
  }

  _createClass(ResultRow, [{
    key: 'handleToggle',
    value: function handleToggle(e) {
      var _props = this.props,
          result = _props.result,
          onToggle = _props.onToggle;

      onToggle(result.id, e.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          xpName = _props2.xpName,
          argKeys = _props2.argKeys,
          result = _props2.result,
          selected = _props2.selected;
      var logs = result.logs;

      var lastLog = logs[logs.length - 1] || {};

      var argKeyElems = argKeys.map(function (argKey) {
        var content = argKey in result.args ? result.args[argKey] : emptyStr;
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
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', 'aria-label': 'select single row', checked: selected, onChange: this.handleToggle })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          xpName
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          result.name
        ),
        argKeyElems,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          lastLog.epoch
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          lastLog.iteration
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'td',
          null,
          lastLog.elapsed_time
        )
      );
    }
  }]);

  return ResultRow;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ResultRow.propTypes = {
  xpName: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  argKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string).isRequired,
  result: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    logs: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any),
    args: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any
  }),
  selected: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  onToggle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
ResultRow.defaultProps = {
  result: { logs: [], args: {} },
  selected: false,
  onToggle: function onToggle() {}
};

/* harmony default export */ __webpack_exports__["a"] = (ResultRow);

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_recharts__ = __webpack_require__(200);




var LogVisualizer = function LogVisualizer(props) {
  var experiments = props.experiments,
      resultIds = props.resultIds,
      logKey = props.logKey;


  var results = {};
  var maxLogLength = 0;
  experiments.forEach(function (experiment) {
    experiment.results.forEach(function (result) {
      results[result.id] = result;
      results[result.id].experimentName = experiment.name;
      results[result.id].logs = result.logs || [];
      maxLogLength = Math.max(maxLogLength, result.logs.length);
    });
  });

  var data = [];
  resultIds.forEach(function (resultId) {
    var result = results[resultId];
    result.logs.forEach(function (log) {
      var iteration = log.iteration;
      var dataItem = { iteration: iteration };
      dataItem[resultId] = log[logKey];
      data.push(dataItem);
    });
  });

  var lineElems = resultIds.map(function (resultId) {
    var result = results[resultId];
    var nameSeparator = '.';
    var name = result.experimentName + nameSeparator + result.name;
    var key = 'line-' + resultId;
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Line"], {
      type: 'monotone',
      name: name,
      dataKey: result.id,
      stroke: '#' + Math.floor(Math.random() * 16777215).toString(16),
      connectNulls: true,
      isAnimationActive: false,
      key: key
    });
  });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'log-visualizer-root' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_2_recharts__["LineChart"],
      {
        width: 730,
        height: 250,
        data: data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 }
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["XAxis"], { type: 'number', dataKey: 'iteration', domain: [0, 'dataMax'] }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["YAxis"], null),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["CartesianGrid"], { strokeDasharray: '3 3' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Tooltip"], null),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_recharts__["Legend"], null),
      lineElems
    )
  );
};

LogVisualizer.propTypes = {
  experiments: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    results: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.any)
  })).isRequired,
  resultIds: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number).isRequired,
  logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};
LogVisualizer.defaultProps = {
  logKey: ''
};

/* harmony default export */ __webpack_exports__["a"] = (LogVisualizer);

/***/ }),

/***/ 698:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);



var LogKeySelector = function LogKeySelector(props) {
  var logKey = props.logKey,
      logKeys = props.logKeys,
      onChangeLogKey = props.onChangeLogKey;

  var options = [__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'option',
    { disabled: true, value: '', key: '' },
    ' -- select a key -- '
  )];
  options = options.concat(logKeys.map(function (key) {
    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'option',
      { value: key, key: key },
      key
    );
  }));
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { className: 'log-key-selector' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'form',
      { className: 'form-inline' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'form-group' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          { htmlFor: 'log-key-selector-select' },
          'log key:'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'select',
          { id: 'log-key-selector-select', className: 'form-control', value: logKey, onChange: onChangeLogKey },
          options
        )
      )
    )
  );
};

LogKeySelector.propTypes = {
  logKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
  logKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string),
  onChangeLogKey: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
LogKeySelector.defaultProps = {
  logKey: '',
  logKeys: [],
  onChangeLogKey: function onChangeLogKey() {}
};

/* harmony default export */ __webpack_exports__["a"] = (LogKeySelector);

/***/ })

},[297]);
//# sourceMappingURL=chainer_ui.js.map