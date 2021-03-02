'use sttrict'

// INVOCO A CONEXION MYSQL
const dbmysql = require("../db/db_mysql");

// GET CONVERSACIONES ALL
function getConversaciones(req, res) {
    console.log('RUTAS DESDE CONVERSACIONES MYSQL -> CONVERSACIONES ALL');
  
    const query = `
        CALL sp_conversacionAll;
        `;

    dbmysql.query(query, (err, rows, fields) => {
        if (!err) {
            console.log('RUTAS DESDE CONVERSACIONES MYSQL -> CONVERSACION TODOS');
            return res.status(200).json(rows);

        } else {
            console.log(err);
        }
    });


};

// GET CONVERSACIONES ID
function getConversacionesID(req, res) {
    console.log('RUTAS DESDE CONVERSACIONES MYSQL -> CONVERSACION ID');
    const idconv = req.params.id;
    console.log('ID CONVERSACION -> ',idconv);

    const query = `
        SET @idconv=?; 
        CALL sp_conversacionID(@idconv);
        `;

    dbmysql.query(query, idconv, (err, rows, fields) => {
        if (!err) {
            console.log('RUTAS DESDE CONVERSACIONES MYSQL -> CONVERSACION POR ID');
            return res.status(200).json(rows);

        } else {
            console.log(err);
        }
    });

};

// ADD CONVERSACIONES
function addConversaciones(req, res) {
    console.log('RUTAS DESDE CONVERSACIONES MYSQL -> POST CONVERSACION');

    const { idconv, idcliente, dni, firstname, lastname, channel, responseId, queryText, fulfillmentText } = req.body;
    console.log(idconv, idcliente, dni, firstname, lastname, channel, responseId, queryText, fulfillmentText);

    const query = `
        SET @idconv=?; 
        SET @idcliente=?; 
        SET @dni=?;
        SET @firstname=?; 
        SET @lastname=?; 
        SET @channel=?; 
        SET @responseId=?; 
        SET @queryText=?; 
        SET @fulfillmentText=?;
        SET @starttime=?;
        CALL sp_conversacionAdd(@idconv, @idcliente, @dni, @firstname, @lastname, @channel, @responseId, @queryText, @fulfillmentText, @starttime);
        `;

    let startTimeConv = new Date().toISOString();
    dbmysql.query(query, [idconv, idcliente, dni, firstname, lastname, channel, responseId, queryText, fulfillmentText, startTimeConv], (err, rows, fields) => {
        if (!err) {
            return res.status(200).send({ message: "mysql -> addConversaciones" });

        } else {
            console.log(err);
        }
    });

};

// UPDATE CONVERSACIONES
function updConversaciones(req, res) {

    console.log('RUTAS DESDE CONVERSACIONES MYSQL -> UPDATE CONVERSACION');
    const { idconv, responseId, queryText, fulfillmentText } = req.body;
    console.log(idconv, responseId, queryText, fulfillmentText);

    const query = `
        SET @idconv=?; 
        SET @responseId=?; 
        SET @queryText=?; 
        SET @fulfillmentText=?;
        SET @endtime=?;
        CALL sp_conversacionUpd(@idconv, @responseId, @queryText, @fulfillmentText, @endtime);
        `;
    let endTimeConv = new Date().toISOString();
    dbmysql.query(query, [idconv, responseId, queryText, fulfillmentText, endTimeConv], (err, rows, fields) => {
        if (!err) {
            return res.status(200).send({ message: "mysql -> updConversaciones" });

        } else {
            console.log(err);
        }
    });
};

module.exports = {
    getConversaciones,
    getConversacionesID,
    addConversaciones,
    updConversaciones
};