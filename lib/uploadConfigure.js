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


//declaro una configuracion de upload el storage lo hemos creado con const storage
const upload = multer({ storage })

export default upload