import _ from 'lodash-fp'
import * as $$ from './util.js'

import breezeSequelize from 'breeze-sequelize'
import {Router} from 'express'
import models from './models'

const router = Router()
export default router

const breeze = breezeSequelize.breeze
const SequelizeQuery = breezeSequelize.SequelizeQuery
const SequelizeSaveHandler = breezeSequelize.SequelizeSaveHandler
const EntityQuery = breeze.EntityQuery

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

router.post('/sync', function(req, res) {
  return models.sync().then(function() {
    return res.send('synced')
  })
})

router.post('/drop', function(req, res) {
  return models.drop().then(() => {
    return res.send('dropped; don\'t forget to "POST /api/sync" afterwards')
  })
})

router.get('/Metadata', function(req, res) {
  return res.send(models.metadata)
})

router.get('/:resource', function(req, res) {
  let query = EntityQuery
    .fromUrl(req.url, req.params.resource)
  
  let sequelizeQuery = new SequelizeQuery(
    models.sequelizeManager,
    query
  )
  
  return sequelizeQuery.execute().then(result => {
    return res.send(result)
  })
})

router.post('/SaveChanges', function(req, res) {
  let saveHandler = new SequelizeSaveHandler(
    models.sequelizeManager,
    req
  )
  
  return saveHandler.save().then(results => {
    return res.send(results)
  })
})


//router.all('*', function(req, res) {
//  inspectReq(req)
//  
//  res.send('blah')
//})
