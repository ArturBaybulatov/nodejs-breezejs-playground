'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cors;
function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
}