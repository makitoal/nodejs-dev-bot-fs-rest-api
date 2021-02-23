'use strict'
/*
    En esta sección se tiene los métodos del API para registro de conversaciones
*/
const { Router } = require("express");
const router = Router();

// INVOCANDO A METODOS DE BD
const db = require('../db/db_fs');

// INCIAMOS CONTRUYENDO API CONTACTOS

// GET CONTACTOS
router.get("/contactos", async (req, res) => {
    console.log('RUTAS DESDE CONTACTOS -> GETCONTACTOS');
    try {
        let query = db.collection("contactos");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const contactos = docs.map((doc) => ({
            id: doc.id,
            dni: doc.data().dni,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            phone: doc.data().phone
        }));

        return res.status(200).json(contactos);

    } catch (error) {
        return res.status(500).json(error);
    }
});

// GET CONTACTOS POR ID
router.get("/contactos/:id", (req, res) => {
    (async () => {
        try {
            const doc = db.collection("contactos").doc(req.params.id);
            const item = await doc.get();
            const response = item.data();
            return res.status(200).send(response);

        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

// POST NUEVOS CONTACTOS
router.post("/contactos", async (req, res) => {
    try {
        const contacto = await db.collection("contactos").add({
            dni: req.body.dni,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
        });

        console.log("Added document with ID: ", contacto.id);
        return res.status(200).json({ message: contacto.id });

    } catch (error) {
        return res.status(500).send(error);
    }
});

// GET CONTACTOS POR DNI
router.get("/contactos/dni/:dni", (req, res) => {
    (async () => {
        console.log('Busca contactos por DNI -> ' + req.params.dni);
        try {
        const contactos = db.collection("contactos");
        const snapshot = await contactos.where('dni', '==', req.params.dni).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return res.status(204).json({message: 'No existen datos'});
        };
        console.log('NUMERO DE DOCUMENTOS POR DNI -> ', snapshot.size);
        let docs = snapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            dni: doc.data().dni,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            phone: doc.data().phone,
        }));

        return res.status(200).json(response);
        } 
        catch (error) {
            console.log('ME DA ERROR POR DNI');
            return res.status(500).json({message: error});
        }
    })();
});

// GET CONTACTOS POR NOMBRE
router.get("/contactos/firstname/:firstname", (req, res) => {
    (async () => {
        console.log('Busca contactos por NOMBRE -> ' + req.params.firstname);
        try {
        const contactos = db.collection("contactos");
        const snapshot = await contactos.where('firstname', '==', req.params.firstname).get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return res.status(204).json({message: 'No existen datos'});
        };
        console.log('NUMERO DE DOCUMENTOS POR NOMBRE -> ', snapshot.size);
        let docs = snapshot.docs;
        const response = docs.map((doc) => ({
            id: doc.id,
            dni: doc.data().dni,
            firstname: doc.data().firstname,
            lastname: doc.data().lastname,
            email: doc.data().email,
            phone: doc.data().phone,
        }));

        return res.status(200).json(response);
        } 
        catch (error) {
            return res.status(500).json({message: error});
        }
    })();
});

// EXPORTO ROUTER DE CONTACTOS
module.exports = router;