'use strict'

// REQUERIMOS MODULOS DE FIREBASE
const admin = require("firebase-admin");

// CONFIGURANDO ACCESO A FIRESTORE
const serviceAccount = require("./config-db-fs.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports =db;
