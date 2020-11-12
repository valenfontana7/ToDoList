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
> [ description]
> );
> res.json(newTodo.rows[ 0]);
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
> res.json(todo.rows[ 0]);
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

1. Crear carpeta client.

2. Inicializarlo.

> npm init -y // este "-y" para config por defecto.

3. Instalar react.

> npm install react react-dom

4. Hacer carpetas src y public.

5. Crear archivo index.html dentro de public.

> <.!DOCTYPE html>
>
> <.html lang="en">
>
> <.head>
>
> <.meta charset="UTF-8" />
>
> <.meta name="viewport" content="width=device-width, initial-scale=1.0" />
>
> <.title>App de tareas<./title>
>
> <./head>
>
> <.body>
>
> <.div id="root"><./div>
>
> <./body>
>
> <./html>

6. Crear index.js en src.

> import React from 'react';
>
> import ReactDOM from 'react-dom';
>
> import App from './App';
>
> ReactDOM.render(<.App/>, document.getElementById('root'));

7. Crear App.jsx y App.css (vacío) en la misma ruta.

- App.jsx

> import React from "react";
>
> import "./App.css";
>
> export default function App() {
> return <.div><./div>;
> }

8. Instalar webpack.

> npm i webpack webpack-cli -D

9. Crear archivo webpack.config.js en client.

> const path = require("path");
>
> module.exports = {
>
> entry: "./src/index.js",
>
> output: {
>
>     filename: "bundle.[h ash].js",
>
>     path: path.resolve(__dirname, "dist"),
>
> },
>
> mode: "production",
>
> };

10. Setear script build en package.json.

> "scripts": {
>
> "build": "webpack"
>
> },

11. Instalar babel.

> npm i @babel/core @babel/preset-env @babel/preset-react babel-loader style-loader css-loader -D

12. Configurar loaders en webpack.config.js.

> mode: "production",
>
> module: {
>
> rules: [
>
> {
>
> test: /\ .(js|jsx)\$/,
>
>        use: "babel-loader",
>
>        exclude: /node_modules/,
>
>       resolve: {
>
>           extensions: [".js",".jsx"],
>
>        },
>
>      },
>
>      {
>
>        test: /\ .css$/,
>
> use: ["style-loader", "css-loader"],
>
> },
>
> ],
>
> },

13. Crear archivo de configuracion de babel en client(babel.config.json).

> {
> "presets": ["@babel/env", "@babel/react"]
> }

14. Instalar plugins de babel.

> npm i clean-webpack-plugin html-webpack-plugin -D

15. Incluirlos en webpack.config.js.

> module: {
>
> rules: [
>
>      {
>
>        test: /\.(js|jsx)$/,
>
>        use: "babel-loader",
>
>        exclude: /node_modules/,
>
>        resolve: {
>
>          extensions: [".js", ".jsx"],
>
>        },
>
>      },
>
>      {
>
>        test: /\.css$/,
>
>        use: ["style-loader", "css-loader"],
>
>      },
>
> ],
>
> },
>
> plugins: [
>
> new CleanWebpackPlugin(),
>
> new HtmlWebpackPlugin({
>
>      template: "./public/index.html",
>
> }),
>
> ],

16. Dar soporte a navegadores antiguos (polyfill).

> npm i core-js

- babel.config.js

> {
>
> "presets": [
>
>     ["@babel/env", { "corejs": 3.6, "useBuiltIns": "usage" }],
>
> "@babel/react"
>
> ]
>
> }

- package.json

> "devDependencies": {
>
> "@babel/core": "^7.12.3",
>
> "@babel/preset-env": "^7.12.1",
>
> "@babel/preset-react": "^7.12.1",
>
> "babel-loader": "^8.1.0",
>
> "clean-webpack-plugin": "^3.0.0",
>
> "css-loader": "^5.0.0",
>
> "html-webpack-plugin": "^4.5.0",
>
> "style-loader": "^2.0.0",
>
> "webpack": "^4.0.0",
>
> "webpack-cli": "^4.1.0"
>
> },
>
> "browsersList": "> 0.25%, not dead, not ie 11"

17. Instalar webpack-dev-server para entorno dev.

> npm i webpack-dev-server -D

18. Crear script para npm start en package.json.

> "scripts": {
>
> "build": "webpack",
>
> "start": "webpack-dev-server -d --open"
>
> },

19. Si da error module not found de webpack cambiar las versiones de las dependencias.

- package.json

> "webpack": "^4.0.0",
> "webpack-cli": "^3.3.12",
> "webpack-dev-server": "^3.11.0"
