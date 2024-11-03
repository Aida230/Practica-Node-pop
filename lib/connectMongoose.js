import mongoose from 'mongoose'

mongoose.connection.on('error', err => {
  console.log('Error de conexión', err)
})

export default function connectMongoose() {
  return mongoose.connect('mongodb://127.0.0.1:27017/Node-pop')
    .then(mongoose => mongoose.connection)
}