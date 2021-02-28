'use strict'
const conversacionesCtrl = require('../controllers/conversaciones');
const { Router } = require("express");
const router = Router();


// RUTAS CON CONTROLLERS
console.log('RUTA PARA CONVERSACIONES 2'),
router.post("/conversaciones_2", conversacionesCtrl.addConversaciones);
router.get("/conversaciones_2",conversacionesCtrl.getConversacionesAll);
router.get("/conversaciones_2/:id",conversacionesCtrl.getConversacionesID);

module.exports = router;