//En esta pagina hago las peticiones get para productos
import { Router } from 'express'
import { getProductsJSON } from '../controllers/homeController.js'


const router = Router()

/* GET home page. */

router.get('/', async (req, res, next) => {
  try {
    const products = await getProductsJSON(req, res, next);// Obtenemos los productos directamente desde el controlador
    res.render('header', { title: 'NODE-POP', products });// Renderizamos la página de inicio pasando los productos

  } catch (error) {
    next(error);
  }
});

export default router
