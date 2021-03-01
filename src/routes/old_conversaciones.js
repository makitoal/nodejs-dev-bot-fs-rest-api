'use strict'
/*
    En esta sección se tiene los métodos del API para registro de conversaciones
*/
const { Router } = require("express");
const router = Router();

// INVOCANDO A METODOS DE BD
const db = require('../db/db_fs');
//const dbFieldValue = admin.firestore.FieldValue;

// POST NUEVAS CONVERSACIONES
router.post("/conversaciones", async (req, res) => {
  console.log('RUTAS DESDE CONVERSACIONES -> REGISTRA CONVERSACIONES');
  try {
      let IdConv=req.body.idconv; 
      let startTimeConv = new Date().toISOString();
      //let startTimeConv = dbFieldValue.serverTimestamp();
      console.log('ID CONVERSACION -> ' + IdConv);

      if (IdConv ==="" || IdConv === null) {
          // Se registra conversación
          console.log('NUEVA CONVERSACION SIN ID');
          const query = await db.collection("conversaciones").add({
              idcliente: req.body.idcliente,
              dni: req.body.dni,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              channel: req.body.channel,
              starttime: startTimeConv
          });
          IdConv=query.id;
          console.log('ID CONVERSACION nueva -> ' + IdConv);
      }
      // REGISTRO CHAT
      let chat = saveNewChat(req, IdConv);
      console.log({'IDConversacion': IdConv, 'IDchat': chat})
      return res.status(200).json({IDConversacion: IdConv, IDchat: chat});

  } catch (error) {
    console.log('ERROR POST -> ', error);
    return res.status(500).send(error);
  }
});

// UPDATE NUEVAS CONVERSACIONES
router.put("/conversaciones", async (req, res)=>{
  console.log('RUTAS DESDE CONVERSACIONES -> UPDATE CONVERSACIONES');
  try {

    let IdConv=req.body.idconv; 
    let endTimeConv = new Date().toISOString();
    //let endTimeConv = dbFieldValue.serverTimestamp();
    console.log('ID CONVERSACION PARA UPDATE -> ' + IdConv);

    if (IdConv !== "" || IdConv != null) {
        // Se registra conversación
        console.log('UPDATE CONVERSACION', IdConv);
        const query = await db.collection("conversaciones").doc(IdConv).update({
            endtime: endTimeConv
        });
        //IdConv=query.IdConv;
        console.log('ID CONVERSACION UPDATE -> ', IdConv);
        return res.status(200).json({IDConversacion: IdConv});

    }
  } 
  catch (error) {
    return res.status(500).send(error);
  }

})

// GET CONVERSACIONES POR ID
router.get("/conversaciones/:id", (req, res) => {
  (async () => {
    console.log('RUTAS DESDE CONVERSACIONES -> CONVERSACIONES POR ID');
    try {
      // BUSCO CONVERSACION POR ID DE CONVERSACION

      const queryConv = db.collection("conversaciones").doc(req.params.id);
      const item = await queryConv.get();
      const response = item.data();

      // BUSCO CHATS POR ID DE CONVERSACION
     console.log('CHAT POR ID CONVERSACION -> ', req.params.id);

     // BUSCO CHATS POR ID DE CONVERSACION
    const queryChat = db.collection("chats");
    const querySnapshot = await queryChat.where('idconv', '==', req.params.id).orderBy('starttimechat').get();
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
     return res.status(200).json({conversacion: response, chat: chat});

    } catch (error) {
      console.log('CONSULTA CHAT POR ID NUEVA --> ', error);
      return res.status(500).send(error);
    }
  })();
});


// GET TODAS LAS CONVERSACIONES
router.get("/conversaciones", async (req, res) => {
  console.log('RUTAS DESDE CONVERSACIONES -> CONVERSACIONES ALL');
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
});

// GET CHAT DE UNA CONVERSACION POR ID
router.get("/conversaciones/chat/:idconv", (req, res) => {
  (async () => {
    console.log('RUTAS DESDE CONVERSACIONES -> CHAT DE UNA CONVERSACION POR ID');
    try {

      console.log('CHAT POR ID CONVERSACION -> ', req.params.idconv);

      // BUSCO CHATS POR ID DE CONVERSACION
      const queryChat = db.collection("chats");
      const querySnapshot = await queryChat.where('idconv', '==', req.params.idconv).orderBy('starttimechat').get();
      if (querySnapshot.empty) {
        console.log('No matching documents.');
        return res.status(204).send({message: 'No existen chats'});
      };

      let docs = querySnapshot.docs;
      const resChat = docs.map((doc) => ({
          id: doc.id,
          idconv: doc.data().idconv,
          responseId: doc.data().responseId,
          queryText: doc.data().queryText,
          fulfillmentText: doc.data().fulfillmentText,
          starttimechat: doc.data().starttimechat          
      }));
      return res.status(200).json(resChat);

    } catch (error) {
      console.log('CHAT ERROR -> ', error);
      return res.status(500).send(error);
    }
  })();
});


// FUNCION saveNewChat
async function saveNewChat (req, IdConv){
  
  let startHourChat = new Date().toISOString();
  console.log('CONVERSACION CON ID PARA CHAT-> ', IdConv);

  try {
    console.log('REGISTRO CHAT');
    // Se registra chat
    const chats = await db.collection("chats").add({
        idconv : IdConv,
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
}

// EXPORTO ROUTER DE CONVERSACIONES
module.exports = router;
