import mongoose, { Schema } from 'mongoose'

// definir el esquema de los productos
const productSchema = new Schema({
  name: { type: String, unique: true },
  price: { type: Number, min: 0.001 },
  image: { type: String },
  tags: {
    type: [String],
    enum: ['work', 'lifestyle', 'motor', 'mobile',]
  },
  owner: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  // collection: 'productos' // para forzar el nombre de la colección y evitar pluralización
})

// creamos el modelo de Productos
const Product = mongoose.model('Product', productSchema)

export default Product