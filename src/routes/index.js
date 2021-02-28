'use strict'

const express = require("express");
//const contactosCtrl = require('../controllers/contactos');

const routerContactos = require('./contactos');
const routerConversaciones = require('./conversaciones');
const routerExtReniec= require('./routes_ext/reniec')
const routerConversacionesTest=require('./conversaciones_2');
//const routerExtReniec= require('./ext_reniec')

// INICIANDO APP CON EXPRESS
const app = express();

// INVOCANDO A LAS RUTAS
console.log('RUTAS DESDE APP')
app.use('/api',routerContactos);
app.use('/api',routerConversaciones);
app.use('/api',routerExtReniec);
app.use('/api',routerConversacionesTest);

/* RUTAS CON CONTROLLERS
router.get('/contactos', contactosCtrl.getContactos);
router.get('/contactos/:Id', contactosCtrl.getContactosId);
router.get('/contactos/:dni', contactosCtrl.getContactosDni);
router.get('/contactos/:firstname', contactosCtrl.getContactosName);
router.post('/contactos', contactosCtrl.insContactos);
*/

module.exports = app;
