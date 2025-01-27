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
import swaggerMiddleware from './lib/swaggerMiddleware.js';
import * as apiLoginController from './controllers/api/apiLoginController.js'
import * as jwtAuth from './lib/jwtAuthMiddleware.js'

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
// transforms data sent by a form to a js object //parsear el body para que venga en formato urlencoded (formularios)
app.use(express.urlencoded({ extended: false }))
// cookie parser to get cookies from client
app.use(cookieParser())
// set the folder where statis resources will be served
app.use(express.static(join(import.meta.dirname, 'public')))


/*
 * RUTAS DEL API
*/

app.post('/api/login', apiLoginController.loginJWT)

//CRUD operations for products resorce (recursos)
app.get('/api/products', jwtAuth.guard, apiProductsController.apiProductsList)
app.get('/api/products/:productId', jwtAuth.guard, apiProductsController.apiProductGetOne)
app.post('/api/products', jwtAuth.guard, upload.single('avatar'), apiProductsController.apiProductNew)
app.put('/api/products/:productId', jwtAuth.guard, upload.single('avatar'), apiProductsController.apiProductUpdate)
app.delete('/api/products/:productId', jwtAuth.guard, apiProductsController.apiProductDelete)


// Rutas del webside!!

app.use(sessionManager.middleware, sessionManager.useSessionInViews) //aqui usamos el sessionManager
app.use(i18n.init)
app.get('/chance-locale/:locale', langController.chanceLocale)

// public pages
app.get('/', homeController.index)
app.get('/login', loginController.index)
app.post('/login', loginController.postLogin)
app.all('/logout', loginController.logout)
app.get('/api-doc', swaggerMiddleware)

// private pages
app.get('/product/new', sessionManager.isLoggedIn, productController.index)
app.post('/product/new', sessionManager.isLoggedIn, upload.single('avatar'), productController.postNew)
app.get('/product/delete/:productId', sessionManager.isLoggedIn, productController.deleteProduct)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})


// error handler
app.use((err, req, res, next) => {

  // validation errors
  if (err.array) {
    err.message = 'Invalid request: ' + err.array()
      .map(e => `${e.location} ${e.type} ${e.path} ${e.msg}`)
      .join(', ')
    err.status = 422
  }

  res.status(err.status || 500)

  
  //API error, enviar respuesta con JSON
  if (req.url.startsWith('/api/')) {
    res.json({ error: err.message })
    return
  }

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
