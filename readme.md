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

## Comandos

Los scripts definidos en `package.json` permiten realizar tareas comunes de desarrollo y despliegue:

- **`npm start`**: Inicia el servidor en modo producción con recarga automática en el archivo `./bin/server.js`. Se recomienda usar este comando en entornos de despliegue.

- **`npm run debug`**: Inicia el servidor en modo de depuración, con el puerto configurado en `4444`. Muestra logs detallados con el prefijo `node-pop:*` para facilitar la depuración de errores.

- **`npm run dev`**: Inicia el servidor en modo desarrollo en el puerto `4444` sin habilitar logs de depuración.

- **`npm run lint`**: Ejecuta el linter `standard` para comprobar que el código sigue los estándares de JavaScript configurados en `eslintConfig`.

- **`npm run initDB`**: Ejecuta el script `initDB.js` para inicializar la base de datos (creación de tablas o carga de datos iniciales, según la configuración en el proyecto).


