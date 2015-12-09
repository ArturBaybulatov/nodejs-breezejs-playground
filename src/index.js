import _ from 'lodash-fp'
import * as $$ from './util.js'

import express from 'express'
import morgan from 'morgan'
//import serveStatic from 'serve-static'
//import serveIndex from 'serve-index'
//import bodyParser from 'body-parser'
//import cookieParser from 'cookie-parser'

import models from './models'
import router from './router'
import cors from './cors'

const app = express()

app.use(cors)
app.use(morgan('dev')) // logger
//app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
//app.use(cookieParser())
app.use('/api', router)

models.sync().then(() => app.listen(8000))
