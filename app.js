import { join } from 'node:path'
import express, { json, urlencoded } from 'express';
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import connectMongoose from './lib/connectMongoose.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import * as productController from './controllers/productController.js'
import * as sessionManager from './lib/sessionManager.js'
import upload from './lib/uploadConfigure.js'
import i18n from './lib/i18nConfigure.js'
import * as langController from './controllers/langController.js'
import * as apiProductsController from './controllers/api/apiProductsController.js'

await connectMongoose()
console.log('Conectado a MongoDB')

const app = express()

app.locals.appName = 'Node-pop'



// view engine setup
app.set('views', join(import.meta.dirname, 'views')) //MOTOR DE PLANTILLAS
app.set('view engine', 'ejs')


// middlewares

// morgan logger for http requests logs
app.use(logger('dev'))
// transforms json objects into js objects
app.use(express.json())
// transforms data sent by a form to a js object
app.use(express.urlencoded({ extended: false }))
// cookie parser to get cookies from client
app.use(cookieParser())
// set the folder where statis resources will be served
app.use(express.static(join(import.meta.dirname, 'public')))

//Rutas del API

app.get('/api/products', apiProductsController.apiProductsList)

// Rutas del webside!!

app.use(sessionManager.middleware, sessionManager.useSessionInViews) //aqui usamos el sessionManager
app.use(i18n.init)
app.get('/chance-locale/:locale', langController.chanceLocale)

// public pages
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)

// private pages
app.get('/product/new', sessionManager.isLoggedIn, productController.index)
app.post('/product/new', sessionManager.isLoggedIn, upload.single('avatar'), productController.postNew)
app.get('/product/delete/:productId', sessionManager.isLoggedIn, productController.deleteProduct)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
