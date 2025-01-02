import multer from "multer";
import path from 'node:path'

//declaro una configuracion para almacenar de donde me van a llegar los ficheros de esos upload

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const ruta = path.join(import.meta.dirname, '..', 'public', 'avatars')
    callback(null, ruta)
  },
  filename: function(req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`
    callback(null, filename)
  }

})
const limits = 1024 * 1024 * 5


//declaro una configuracion de upload el storage lo hemos creado con const storage
const upload = multer({ storage, limits }) //si alguien intenta subir un archivo de mas de 5 megas no te deja, eso el limits

export default upload