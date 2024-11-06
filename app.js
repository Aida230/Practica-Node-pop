import { join } from 'node:path'
import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import connectMongoose from './lib/connectMongoose.js'
import * as homeController from './controllers/homeController.js'
import * as loginController from './controllers/loginController.js'
import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import loginRouter from './routes/login.js'


await connectMongoose()
console.log('Conectado a MongoDB')

const app = express()

app.locals.appName = 'Node-pop'



// view engine setup
app.set('views', join(import.meta.dirname, 'views')) //MOTOR DE PLANTILLS
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



// Routing rutas de la aplicacion

// homepage
app.use('/', indexRouter)

// user page
app.use('/users', usersRouter)


// user login
app.use('/login', loginRouter)



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
