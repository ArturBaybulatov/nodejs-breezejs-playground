'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodashFp = require('lodash-fp');

var _lodashFp2 = _interopRequireDefault(_lodashFp);

var _util = require('./util.js');

var $$ = _interopRequireWildcard(_util);

var _breezeSequelize = require('breeze-sequelize');

var _breezeSequelize2 = _interopRequireDefault(_breezeSequelize);

var _express = require('express');

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
exports.default = router;

var breeze = _breezeSequelize2.default.breeze;
var SequelizeQuery = _breezeSequelize2.default.SequelizeQuery;
var SequelizeSaveHandler = _breezeSequelize2.default.SequelizeSaveHandler;
var EntityQuery = breeze.EntityQuery;

//function inspectReq(req) {
//  $.log('\n\n\n----------- req -----------\n')
// 
//  var stuffToPick = [
//    'body',
//    'cookies',
//    'headers',
//    'method',
//    'originalUrl',
//    'params',
//    'path',
//    'query',
//    'secret',
//    'secure',
//    'signedCookies',
//    'url',
//  ]
// 
//  //$(_.toPlainObject, $.inspect.colors(0), $.log)(req)
//  $(_.pick(stuffToPick), $.inspect.colors(5), $.log)(req)
// 
//  $.log('\n===========================\n\n\n')
//}

router.post('/sync', function (req, res) {
  return _models2.default.sync().then(function () {
    return res.send('synced');
  });
});

router.post('/drop', function (req, res) {
  return _models2.default.drop().then(function () {
    return res.send('dropped; don\'t forget to "POST /api/sync" afterwards');
  });
});

router.get('/Metadata', function (req, res) {
  return res.send(_models2.default.metadata);
});

router.get('/:resource', function (req, res) {
  var query = EntityQuery.fromUrl(req.url, req.params.resource);

  var sequelizeQuery = new SequelizeQuery(_models2.default.sequelizeManager, query);

  return sequelizeQuery.execute().then(function (result) {
    return res.send(result);
  });
});

router.post('/SaveChanges', function (req, res) {
  var saveHandler = new SequelizeSaveHandler(_models2.default.sequelizeManager, req);

  return saveHandler.save().then(function (results) {
    return res.send(results);
  });
});

//router.all('*', function(req, res) {
//  inspectReq(req)
// 
//  res.send('blah')
//})