import Product from '../../models/Product.js'

export async function apiProductsList(req, res, next) {
  try {
    //filtros
    const filterName = req.query.name
    const filterPrice = req.query.price
    //paginacion
    const limit = req.query.limit
    const skip = req.query.skip
    //ordenar
    const sort = req.query.sort
    //campos que queremos
    const fields = req.query.fields

    const filter = {}

    if (filterName) {
      filter.name = filterName
    }

    if (filterPrice) {
      filter.price = filterPrice
    }

    //metodo estico lista
    const products = await Product.list(filter, limit, skip, sort, fields)

    const productCount = await Product.countDocuments(filter)

    res.json({ 
      results: products,
      count: productCount

     })
    
  } catch (error) {
    next(error)
    
  }

}