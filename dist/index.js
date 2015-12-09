'use strict';

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _util = require('./util.js');

var $$ = _interopRequireWildcard(_util);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _cors = require('./cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
//import serveStatic from 'serve-static'
//import serveIndex from 'serve-index'
//import bodyParser from 'body-parser'
//import cookieParser from 'cookie-parser'

app.use(_cors2.default);
app.use((0, _morgan2.default)('dev')); // logger
//app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
//app.use(cookieParser())
app.use('/api', _router2.default);

_models2.default.sync().then(function () {
  return app.listen(8000);
});