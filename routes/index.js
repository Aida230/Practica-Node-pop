//En esta pagina hago las peticiones get para productos
import { Router } from 'express'


const router = Router()

/* GET home page. */

router.get('/', async (req, res, next) => {
  try {
    res.render('header', { title: "NODE-POP" });// Renderizamos la página de inicio pasando los productos

  } catch (error) {
    next(error);
  }
});

export default router
