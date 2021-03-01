'use strict'

const conversacionesCtrl = require('../controllers/conversaciones');

const { Router } = require("express");
const router = Router();


// RUTAS CON CONTROLLERS
console.log('RUTA PARA CONVERSACIONES 2'),
router.get("/conversaciones",conversacionesCtrl.getConversacionesAll);
router.get("/conversaciones/:id",conversacionesCtrl.getConversacionID);
router.post("/conversaciones", conversacionesCtrl.addConversacion);
router.put("/conversaciones",conversacionesCtrl.updConversacion);

module.exports = router;