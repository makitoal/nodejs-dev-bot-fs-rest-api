'use strict'

// INVOCANDO A MODULOS DE APLICACION
const express = require("express");
const bodyParser = require("body-parser");
const routerApi = require('./routes/index');

// INICIANDO APP CON EXPRESS
const app = express();

// UTILIZANDO BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURANDO SERVIDOR Y PUERTO
app.set("port", process.env.PORT || 3000);

// INVOCANDO A LAS RUTAS DESDE ROUTES
console.log('RUTAS DESDE APP')
app.use(routerApi);

module.exports=app;
