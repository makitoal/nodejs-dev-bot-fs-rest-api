"use strict";

// INVOCANDO A METODOS DE BD
const db = require("../db/db_fs");

// GET CONVERSACIONES POR ID
function getConversaciones(rep, res) {
    (async () => {
        try {
            // BUSCO CONVERSACION POR ID DE CONVERSACION

            const doc = db.collection("conversaciones").doc(req.params.id);
            const item = await doc.get();
            const response = item.data();

            // BUSCO CHATS POR ID DE CONVERSACION
            const docchat = db.collection('chats');
            const snapshot = await docchat.where('IDConv', '==', req.params.id).get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return res.status(204).send({ message: 'No existen datos' });
            };
            snapshot.forEach(docchat => {
                chat = docchat.data();
            });
            return res.status(200).send(response + chat);

        } catch (error) {
            return res.status(500).send(error);
        }
    })();
};

function insConversaciones(rep, res) {
    try {
        let IdConv = '';
        let HoraIniConv = new Date().toISOString();
        if (req.body.IDConv === "" || req.body.IDConv === null) {
            // Se registra conversación
            const conversacion = await db.collection("conversacion").add({
                IDCliente: req.body.IDCliente,
                HoraInicio: HoraIniConv
            });
            IdConv = conversacion.id;
            // Se registra chat
            const chat = await db.collection("chats").add({
                IDConv: IdConv,
                responseId: req.body.responseId,
                queryText: req.bod.queryText,
                fulfillmentText: req.body.fulfillmentText,
                hora: HoraIniConv
            });
        }
        else {
            IdConv = req.body.IDConv;
            // Se registra chat
            const chat = await db.collection("chats").add({
                IDConv: IdConv,
                responseId: req.body.responseId,
                queryText: req.bod.queryText,
                fulfillmentText: req.body.fulfillmentText,
                hora: HoraIniConv
            });
        }

        console.log("Conversación creada: ", IdConv);
        return res.status(200).json({ IDConv: IdConv, IDChat: chat.id });

    } catch (error) {
        return res.status(500).send(error);
    }
};

module.exports ={
    getConversaciones,
    insConversaciones
};