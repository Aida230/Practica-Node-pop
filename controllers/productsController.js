import createError from 'http-errors'
import Product from '../models/Product.js'

export function index(req, res, next) {
  res.render('new-product')
}

export async function postNew(req, res, next) {
  try {
    const userId = req.session.userId
    const { name, price } = req.body

    // TODO validaciones

    // creo una instancia de agente en memoria
    const product = new Product({
      name,
      price,
      owner: userId
    })

    // la guardo en base de datos
    await product.save()

    res.redirect('/')
  } catch (err) {
    next(err)
  }
}

export async function deleteProduct(req, res, next) {
  const userId = req.session.userId
  const agentId = req.params.productId

  // validar que el elemento que queremos borrar es propidad
  // del usuario logado!!!!!
  const product = await Product.findOne({ _id: productId })

  // verificar que existe
  if (!product) {
    console.warn(`WARNING - el usuario ${userId} está intentando eliminar un agente inexistente`)
    return next(createError(404, 'Not found'))
  }

  if (product.owner.toString() !== userId) {
    console.warn(`WARNING - el usuario ${userId} está intentando eliminar un agente de otro usuario`)
    return next(createError(401, 'Not authorized'))
  }

  await product.deleteOne({ _id: productId })

  res.redirect('/')

}