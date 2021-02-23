'use strict'
const reniecCtrl = require('../../apis/reniec');
const { Router } = require("express");
const router = Router();


// RUTAS CON CONTROLLERS
console.log('RUTA EXTERNA PARA API RENIEC'),
router.get("/ext/reniec/:dni",reniecCtrl.getReniecDNI);

module.exports = router;