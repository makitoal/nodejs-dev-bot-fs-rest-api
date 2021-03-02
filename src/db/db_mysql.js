'use strict'

// REQUERIMOS MODULOS PARA MYSQL
const mysql = require("mysql");

// PARAMETROS DE BD
const dbmysql = mysql.createConnection({
  host: 'jwwordpress.cn8xxakqg1jh.us-east-1.rds.amazonaws.com',
  user: 'jwlab',
  password: 'JW#1234$',
  database: 'chatbot',
  multipleStatements: true
});

dbmysql.connect(function (err) {
  if (err) {
    console.error('Error al conectar a la BD -> ' ,err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = dbmysql;