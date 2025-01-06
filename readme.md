# Proyecto Node.js: node-pop

Este proyecto es una aplicación de Node.js que utiliza una estructura organizada en **controladores**, **modelos** y **vistas** para gestionar datos y funcionalidades, proporcionando una arquitectura escalable y mantenible.


## Requisitos

Para ejecutar este proyecto, necesitas tener instalados:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/Aida230/Practica-Node-pop
   cd node-pop

2. Instala las dependencias del proyecto usando npm:
    ```bash
    npm install

3. En el primer despliegue copia .env.example desde .env y customiza las variables de entorno
    ```sh
    cp.env.example .env
    ```
4. Puedes inicializar la base de datos para crear una inicial
    ```js
    npm run initDB
    ```

## Comandos

Los scripts definidos en `package.json` permiten realizar tareas comunes de desarrollo y despliegue:

- **`npm start`**: Inicia el servidor en modo producción con recarga automática en el archivo `./bin/server.js`. Se recomienda usar este comando en entornos de despliegue.

- **`npm run debug`**: Inicia el servidor en modo de depuración, con el puerto configurado en `4444`. Muestra logs detallados con el prefijo `node-pop:*` para facilitar la depuración de errores.

- **`npm run dev`**: Inicia el servidor en modo desarrollo en el puerto `4444` sin habilitar logs de depuración.

- **`npm run lint`**: Ejecuta el linter `standard` para comprobar que el código sigue los estándares de JavaScript configurados en `eslintConfig`.

- **`npm run initDB`**: Ejecuta el script `initDB.js` para inicializar la base de datos (creación de tablas o carga de datos iniciales, según la configuración en el proyecto).

## Caracteristicas del website
1- Página inicial para logarse

![Pagina inicial](./public/images/login%20readme.png)
   ```bash
   email: 
   password:
   ```
![Login](./public/images/login%202%20readme.png)
   ```
   Documentacio API
   ```
2- Una vez logado

    ```
    Visualización de tus productos
    Creación de nuevo producto con imagen y tags
    ```
![Lista de productos](./public/images/productos%20readme.png)
![Nuevo producto](./public/images/New%20product%20readme.png)
3- Logout o cierre de sesión


# API

Nuestra API permite crear, actualizar y eliminar un producto paa aquellos usuarios logados.


## Base URL
La URL base para todas las solicitudes es:
Base URL: http://localhost:4444/api

### Api product login

POST/api/login

```
key: email
value: password
return: token
```

### Product list
GET /api/products

```
Por header:
key: Authorizate
Value: your token
```
```json
{
    "results": [
        {
            "_id": "676da86d4b938c6ceb942019",
            "name": "Juguete2",
            "price": 123,
            "avatar": "avatar-1735239789641-riotgames-secret-cinema.jpg",
            "tags": [
                "lifestyle"
            ],
            "owner": "676c3cbb9d8f7ca8be5fda13",
            "__v": 0
        },
        // ...
    ],
    "count": 5
}
```
## CRUD
GET/api/products/productId
```json
{
    "result": {
        "_id": "676c55b82dea03b44f7844c4",
        "name": "Juguete",
        "price": 350,
        "avatar": "avatar-1735153080275-screenshot057.png",
        "tags": [
            "work",
            "lifestyle"
        ],
        "owner": "676c3cbb9d8f7ca8be5fda12",
        "__v": 0
    }
}
```
PUT/api/products/productId
```json
{
    "result": {
        "_id": "676c55b82dea03b44f7844c4",
        "name": "Juguete",
        "price": 300,
        "avatar": "avatar-1735153080275-screenshot057.png",
        "tags": [
            "work",
            "lifestyle"
        ],
        "owner": "676c3cbb9d8f7ca8be5fda12",
        "__v": 0
    }
}
```

DELETE/api/products/productId


## Tecnologías utilizadas

Este proyecto utiliza una serie de tecnologías y herramientas que facilitan su desarrollo y funcionamiento. A continuación se detallan las principales:

### Backend

- **Node.js**: Un entorno de ejecución para JavaScript en el lado del servidor.
- **Express**: Framework web de Node.js para crear aplicaciones backend.
- **Mongoose**: Librería para interactuar con bases de datos MongoDB usando un modelo de objetos.
- **jsonwebtoken**: Utilizado para la creación y verificación de tokens JWT, necesarios para la autenticación.
- **bcrypt**: Librería para encriptar contraseñas de usuarios de manera segura.
- **cookie-parser**: Middleware para manejar cookies en las solicitudes HTTP.
- **express-session**: Middleware que facilita la gestión de sesiones en una aplicación Express.
- **connect-mongo**: Implementación de almacenamiento de sesiones utilizando MongoDB.
- **i18n**: Librería de internacionalización para soportar múltiples idiomas.
- **multer**: Middleware para la gestión de archivos en formularios HTML.
- **morgan**: Middleware para registrar las solicitudes HTTP.
- **swagger-jsdoc y swagger-ui-express**: Herramientas para generar y mostrar documentación de la API de forma interactiva.

### Desarrollo

- **ESLint (Standard)**: Herramienta para el análisis estático del código y mantener un estilo consistente.
- **cross-env**: Permite establecer variables de entorno de manera segura en cualquier plataforma.
- **dotenv**: Carga variables de entorno desde un archivo `.env` para configurar la aplicación.
- **debug**: Herramienta para añadir mensajes de depuración a la aplicación.



