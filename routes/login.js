//En esta pagina hago las peticiones get para productos
import { Router } from 'express'
const router = Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('login')
})

export default router