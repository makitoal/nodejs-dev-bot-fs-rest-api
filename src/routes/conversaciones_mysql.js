'use strict'

const conversacionesCtrl = require("../controllers/conversaciones_Ctrl_mysql");

const {Router} = require("express");
const router = Router();

// RUTAS CON CONTROLLERS
console.log('RUTA PARA CONVERSACIONES MYSQL');
router.get("/mysql/conversaciones",conversacionesCtrl.getConversaciones);
router.get("/mysql/conversaciones/:id",conversacionesCtrl.getConversacionesID);
router.post("/mysql/conversaciones", conversacionesCtrl.addConversaciones);
router.put("/mysql/conversaciones",conversacionesCtrl.updConversaciones);

module.exports = router;