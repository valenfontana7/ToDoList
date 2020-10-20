# Pasos a seguir:

# A) Creando el servidor.

1.  Hacer carpetas para la api y el cliente.

2.  Hacer npm init(api).

3.  Hacer npm install express pg y cors en api.

4.  Crear un archivo index.js en api.

5.  Crear constante express requeriendo express y luego app invocando a const express.

> const express = require("express");
> const app = express();

6.  Iniciar server con app.listen().

> app.listen(5000, () => {
> console.log("El servidor se encuentra corriendo en el puerto 5000");
> })

7.  Usar nodemon para mantener el server escuchando los cambios.

> npm i -g nodemon
> nodemon index.js

8.  Requerir cors (nos ayuda con las peticiones) y crear middleware que lo implemente para el server.

> const cors = require('cors');
>
> // Middleware
>
> app.use(cors());

9.  Inmediatamente después crear otro middleware con express.json para poder acceder al cuerpo de las peticiones.

> // Middleware
>
> app.use(cors());
>
> app.use(express.json());

# B) Crear la base de datos y tablas.

1. Crear archivo database.sql en api.

2. Dentro de database.sql, creamos la base de datos.

> CREATE DATABASE perntodo;

3. Creamos también la tabla de todos.

> CREATE TABLE todo(
>
> todo_id SERIAL PRIMARY KEY,
> description VARCHAR(255)
>
> );

4. Hacerlo además en la consola de postgres, ejecutando estos mismos comandos.

5. Crear archivo db.js en api.

6. Dentro de este, escribir lo siguiente:

> const Pool = require("pg").Pool;
>
> const pool = new Pool({
> user: "postgres",
> password: "255655vf",
> host: "localhost",
> port: 5432,
> database: "perntodo"
> });
>
> module.exports = pool;

7. Importar en una constante pool el archivo db.

> const pool = require("./db");

8. Dividir middlewares y rutas.

> // Middleware
>
> app.use(cors());
> app.use(express.json());
>
> // Routes
>
> app.listen(5000, () => {
> console.log("El servidor se encuentra corriendo en el puerto 5000");
> })

# C) Crear las rutas.

9. Definir las rutas.

> - Crear una tarea.
> - Obtener todas las tareas.
> - Obtener una tarea en especìfico.
> - Actualizar una tarea.
> - Eliminar una tarea.

10. Crear las rutas.

> // Crear una tarea
>
> app.post("/todos", async (req, res) => {
> try {
> const { description } = req.body;
> const newTodo = await pool.query(
> "INSERT INTO todo (description) VALUES(\$1) RETURNING \* ",
> [description]
> );
> res.json(newTodo.rows[0]);
> } catch (err) {
> console.error(err.message);
> }
> });
>
> // Obtener todas las tareas
>
> app.get("/todos", async (req, res) => {
> try {
> const allTodos = await pool.query("SELECT \* FROM todo");
> res.json(allTodos.rows);
> } catch (err) {
> console.error(err.message);
> }
> });
>
> // Obtener una tarea específica
>
> app.get("/todo/:id", async (req, res) => {
> try {
> const { id } = req.params;
> const todo = await pool.query("SELECT \* FROM todo WHERE todo_id = \$1", [id, ]);
> res.json(todo.rows[0]);
> } catch (err) {
> console.error(err.message);
> }
> });
>
> // Actualizar una tarea
>
> app.put("/todo/:id", async (req, res) => {
> try {
> const { id } = req.params;
> const { description } = req.body;
> const updateTodo = await pool.query(
> "UPDATE todo SET description = $1 WHERE todo_id = $2",
> [description, id]
> );
> res.json("La tarea fue modificada");
> } catch (err) {
> console.error(err.message);
> }
> });
>
> // Eliminar una tarea
>
> app.delete("/todo/:id", async (req, res) => {
> try {
> const { id } = req.params;
> const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = \$1", [ id, ]);
> res.json("La tarea fue eliminada");
> } catch (err) {
> console.error(err.message);
> }
> });

# D) Crear el cliente
