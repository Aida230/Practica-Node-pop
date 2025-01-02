import mongoose, { Schema } from 'mongoose'

// definir el esquema de los productos
const productSchema = new Schema({
  name: { type: String, unique: true },
  price: { type: Number, min: 0.001 },
  avatar: { type: String },
  tags: {
    type: [String],
    enum: ['work', 'lifestyle', 'motor', 'mobile',]
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  // collection: 'productos' // para forzar el nombre de la colección y evitar pluralización
})

//devolvemos lista de productos
productSchema.statics.list = function(filter, limit, skip, sort, fields) {
  const query = Product.find(filter)
  query.limit(limit)
  query.skip(skip)
  query.collation({ locale: 'en', strength: 2 })//esto ignora las mayusculas, locale es el alfabeto, y strength es para sea case insensitive, ignora las mayusculas
  query.sort(sort)
  query.select(fields)
  return query.exec()
}
// creamos el modelo de Productos
const Product = mongoose.model('Product', productSchema)

export default Product