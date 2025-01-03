import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from 'swagger-ui-express'

//vamos crear un objeto de opciones para que nos genere la documentacion

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'NodePop API',
      version: '0.1',
      description: 'API de NodePop'
    }
  },
  //apis: ['swagger.yaml']
  apis: ['controllers/api/**/*.js']
}

const specification = swaggerJSDoc(options)

export default [swaggerUI.serve, swaggerUI.setup(specification)]