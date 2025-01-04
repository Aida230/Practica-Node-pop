import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

export async function loginJWT(req, res, next) {
  try {
    //recoger los paramentros de entrada que me pasan
    const { email, password } = req.body

    //tengo que hacer la validacion del email y la contraseña
    
    //buscar el usuario en la base de datos
    const user = await User.findOne({ email: email.toLowerCase() })

    // si no lo encuentro o la contraseña no coincide da error

    if (!user || !(await user.comparePassword(password))) {
      next(createError(401, 'invalid credentils Hola'))
      return
    }

    //si lo encuentro y coincide la contaseña emito un jwt
    //generar el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    }, (err, tokenJWT) => {
      if (err) {
        next(err)
        return
      }
      res.json({ tokenJWT })
    })

  } catch (error) {
    next(error)
  }
}