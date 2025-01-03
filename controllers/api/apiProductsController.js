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

    //destructuring con listas, la petciendo va a tardar un oco menos de esta forma, al hacerlo en paralelo

    const [products, productCount] = await Promise.all([
      Product.list(filter, limit, skip, sort, fields),
      Product.countDocuments(filter)
    ])

    //metodo estico lista
    //const products = await Product.list(filter, limit, skip, sort, fields)
    //const productCount = await Product.countDocuments(filter)

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


//ACTUALIZAR PRODUCTO
export async function apiProductUpdate(req, res, next) {
  try {
    //recoger los datos de entrada
    const productId = req.params.productId
    //lo habitual es que los datos nos vengan en el body
    const productData = req.body
    productData.avatar = req.file?.filename

    //guardar el resultado
    const updateProduct = await Product.findByIdAndUpdate(productId, productData, {
      new: true //esto hace que te devuelva el valor actualizado
    })

    res.json({ result: updateProduct })//no es necesario devolver el resultado, res.json() bastaria, pero es una buena practica
  } catch (error) {
    next(error)
  }
}

//BORRAMOS PRODUCTO
export async function apiProductDelete(req, res, next) {
  try {
    //recoger los parametros de entrada, en este caso es un id del producto que hay que borrar
    const productId = req.params.productId
    //borrarmos el producto segun el id
    await Product.deleteOne({ _id: productId })
    
    //devolvemos directamen un status http 200 de todo ha ido bien
    res.json()


  } catch (error) {
    next(error)
  }
}