'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inspect = inspect;

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inspect(obj) {
  var depth = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

  if (!Array.isArray(obj)) {
    obj = _lodashFp2.default.zipObject(_lodashFp2.default.pairs(obj).sort(function (a, b) {
      a = a[0].toLowerCase();
      b = b[0].toLowerCase();

      return a > b ? 1 : a < b ? -1 : 0;
    }), undefined);
  }

  return (0, _util.inspect)(obj, { depth: depth });
}