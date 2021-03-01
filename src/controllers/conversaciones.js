"use strict";

// INVOCANDO A METODOS DE BD
const db = require("../db/db_fs");

// GET TODAS LAS CONVERSACIONES
function getConversacionesAll(req, res) {
    (async () => {

        console.log('RUTAS DESDE CONVERSACIONES 2 -> CONVERSACIONES ALL');
        try {
            const queryConv = db.collection("conversaciones");
            const querySnapshot = await queryConv.get();
            let docs = querySnapshot.docs;
      
            const resConv = docs.map((doc) => ({
                id: doc.id,
                idcliente: doc.data().idcliente,
                dni: doc.data().dni,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                channel : doc.data().channel,
                starttime: doc.data().starttime,
                endtime: doc.data().endtime
            }));
            return res.status(200).json(resConv);
      
        } catch (error) {
            return res.status(500).json(error);
        }        
    })();
};

// GET CONVERSACIONES POR ID
function getConversacionID(req, res) {

    (async () => {

        let idconv= req.params.id
        console.log('RUTAS DESDE CONVERSACIONES 2 -> CONVERSACIONES POR ID', idconv);
        try {
            // BUSCO CONVERSACION POR ID DE CONVERSACION
    
            const queryConv = db.collection("conversaciones").doc(idconv);
            const item = await queryConv.get();
            const conversacion = item.data();
    
            // BUSCO CHATS POR ID DE CONVERSACION
            console.log('CHAT POR ID CONVERSACION 2-> ', idconv);
    
            // BUSCO CHATS POR ID DE CONVERSACION
            const queryChat = queryConv.collection("chats");
            const querySnapshot = await queryChat.orderBy('starttimechat').get();
            if (querySnapshot.empty) {
                console.log('No matching documents.');
                return res.status(204).send({message: 'No existen chats'});
            };
        
            let docs = querySnapshot.docs;
            const chat = docs.map((doc) => ({
                id: doc.id,
                idconv: doc.data().idconv,
                responseId: doc.data().responseId,
                queryText: doc.data().queryText,
                fulfillmentText: doc.data().fulfillmentText,
                starttimechat: doc.data().starttimechat          
         }));    
         // UNIR LOS DOS RESULTADOS
         return res.status(200).json({Conversacion: conversacion, Chat: chat});
    
        } catch (error) {
          console.log('CONSULTA CHAT POR ID NUEVA --> ', error);
          return res.status(500).send(error);
        }
    })();
};

// POST AGREGAR CONVERSACIONES
async function addConversacion(req, res) {
    console.log('RUTAS DESDE CONVERSACIONES 2 -> REGISTRA CONVERSACIONES');
    try {
        let idconv=req.body.idconv; 
        let startTimeConv = new Date().toISOString();
        console.log('ID CONVERSACION2 -> ' + idconv);
  
        if (idconv ==="" || idconv === null) {
            // Se registra conversación
            console.log('NUEVA CONVERSACION 2 SIN ID');
            const query = await db.collection("conversaciones").add({
                idcliente: req.body.idcliente,
                dni: req.body.dni,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                channel: req.body.channel,
                starttime: startTimeConv
            });
            idconv=query.id;
            console.log('ID CONVERSACION 2 nueva -> ' + idconv);
        }
        // REGISTRO CHAT
        let chat = addChat(req, idconv);
        console.log({'idconversacion': idconv, 'IDchat': chat})
        return res.status(200).json({idconversacion: idconv, IDchat: chat});
  
    } catch (error) {
      console.log('ERROR POST -> ', error);
      return res.status(500).send(error);
    }  
};

// FUNCION saveNewChat
async function addChat (req, idconv){
  
    let startHourChat = new Date().toISOString();
    console.log('CONVERSACION_2 CON ID PARA CHAT-> ', idconv);
  
    try {
      console.log('REGISTRO CHAT 2');
      // Se registra chat
      const query = db.collection("conversaciones").doc(idconv);
      const chats = await query.collection("chats").add({
          responseId: req.body.responseId,
          queryText: req.body.queryText,
          fulfillmentText: req.body.fulfillmentText,
          starttimechat: startHourChat
      });
      let chatId=chats.id;
      console.log('ID CHAT nuevo -> ', chatId);
      return chatId;
    } 
    catch (error) {
      return error;
    }      
};

// FUNCION UPDATE CONVERSACION
async function updConversacion(req, res){

    console.log('RUTAS DESDE CONVERSACIONES -> UPDATE CONVERSACIONES');
    try {

        let idconv=req.body.idconv; 
        let endTimeConv = new Date().toISOString();
        //let endTimeConv = dbFieldValue.serverTimestamp();
        console.log('ID CONVERSACION PARA UPDATE -> ' + idconv);

        if (idconv !== "" || idconv != null) {
            // Se registra conversación
            console.log('UPDATE CONVERSACION', idconv);
            const query = await db.collection("conversaciones").doc(idconv).update({
                endtime: endTimeConv
            });
            console.log('ID CONVERSACION UPDATE -> ', idconv);
            return res.status(200).json({idconversacion: idconv});  
        }
    } 
    catch (error) {
        return res.status(500).send(error);
    }
};

module.exports ={
    getConversacionesAll,
    getConversacionID,
    addConversacion,
    updConversacion
};