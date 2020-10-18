# Pasos a seguir:

# A) Creando el servidor.

 1) Hacer carpetas para la api y el cliente.

 2) Hacer npm init(api).

 3) Hacer npm install express pg y cors en api.

 4) Crear un archivo index.js en api.

 5) Crear constante express requeriendo express y luego app invocando a const express.

 > const express = require("express");
 > const app = express();

 6) Iniciar server con app.listen().

 > app.listen(5000, () => {
 >    console.log("El servidor se encuentra corriendo en el puerto 5000");
 > })

 7) Usar nodemon para mantener el server escuchando los cambios.


 > npm i -g nodemon
 > nodemon index.js


 8) Requerir cors (nos ayuda con las peticiones) y crear middleware que lo implemente para el server.

 > const cors = require('cors');
 >
 > // Middleware
 >
 > app.use(cors());

 9) Inmediatamente después crear otro middleware con express.json para poder acceder al cuerpo de las peticiones.

 > // Middleware
 >
 > app.use(cors());
 >
 > app.use(express.json());

# B) Crear la base de datos y tablas.

1) Crear archivo database.sql en api.

2) Dentro de database.sql, creamos la base de datos.

> CREATE DATABASE perntodo;

3) Creamos también la tabla de todos.

> CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

4) Hacerlo además en la consola de postgres, ejecutando estos mismos comandos.

5) Crear archivo db.js en api.

6) Dentro de este, escribir lo siguiente:

> const Pool = require("pg").Pool;
>
>  const pool = new Pool({
>     user: "postgres",
>     password: "255655vf",
>     host: "localhost",
>     port: 5432,
>     database: "perntodo"
> });
> 
> module.exports = pool;

