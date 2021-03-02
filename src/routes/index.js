'use strict'

const express = require("express");

const routerContactos = require("./contactos");
const routerConversaciones = require("./conversaciones");
const routerConversacionesMySQL = require("./conversaciones_mysql");
const routerExtReniec= require("./routes_ext/reniec");

// INICIANDO APP CON EXPRESS
const app = express();

// INVOCANDO A LAS RUTAS
console.log('RUTAS DESDE APP')
app.use('/api', routerContactos);
app.use('/api', routerConversaciones);
app.use('/api', routerExtReniec);
app.use('/api', routerConversacionesMySQL);

module.exports = app;
