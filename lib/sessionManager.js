import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

// middleware para gestionar sesiones
export const middleware = session({
  name: 'nodeapp-session',
  secret: 'kjaljndvljandvkjadnflivj',//esto luego lo miro cada uno tiene que tener una diferente
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
  // las sesiones se guardan en MongoDB
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/Node-pop'
  })
})

//este es para que las vistas puedan acceder a la sesion para ver si esta logado o no
export function useSessionInViews(req, res, next) {  
  res.locals.session = req.session
  next()
}

export function isLoggedIn(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/login')
    return
  }
  next()
}