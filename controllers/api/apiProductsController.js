import Product from '../../models/Product.js'

export async function apiProductsList(req, res, next) {
  try {
    //filtros
    const filterName = new RegExp(req.query.name, 'i')// esto ignora las mayusculas en los datos
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

    /*
    let normalizedSort = undefined

    if (sort) {
      const normalizeSort = sort => {
        if (sort === 'name') return { name: 1 } //1 ascendente
        if (sort === 'name-1') return { name: -1 } //-1 descendente
        if (sort === 'price') return { price: 1 }
        if (sort === 'price-1') return { price: -1 }
      }
      normalizedSort = normalizeSort(sort)
    }
    */

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

//PARA BUSCAR UN PRODUCTO CONCRETO
export async function apiProductGetOne(req, res, next) {
  try {
    const productId = req.params.productId

    const product = await Product.findById(productId)

    res.json({ result: product })
  } catch (error) {
    next(error)
    
  }
}

//CREAMOS UN NUEVO PRODUCTO

export async function apiProductNew(req, res, next) {
  try {
    const productData = req.body
    
    //crear una instancia de producto en memoria
    const product = new Product(productData)
    product.avatar = req.file?.filename
    //guardar producto
    const savedProduct = await product.save()

    res.status(201).json({ result: savedProduct })
  } catch (error) {
    next(error)
    
  }
}