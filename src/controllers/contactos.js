"use strict";

// INVOCANDO A METODOS DE BD
const db = require("../db/db_fs");

async function getContactos(req, res) {
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
      phone: doc.data().phone,
    }));

    return res.status(200).json(contactos);

  } catch (error) {
    return res.status(500).json(error);
  }
}

async function insContactos(req, res) {
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
}

function getContactosId(req, res) {
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
}

function getContactosName(req, res) {
    (async () => {
        console.log(req.params.firstname);
        try {
          const contactos = db.collection("contactos");
          const snapshot = await contactos.where("firstname", "==", req.params.firstname).get();
          if (snapshot.empty) {
            console.log("No matching documents.");
            return res.status(204).send({ message: "No existen datos" });
          }
    
          snapshot.forEach((doc) => {
            response = doc.data();
          });
          return res.status(200).send(response);

        } 
        catch (error) {
          return res.status(500).send(error);
        }
      })();    
}

function getContactosDni(req, res) {
    (async () => {
        console.log(req.params.dni);
        try {
          const contactos = db.collection("contactos");
          const snapshot = await contactos.where("dni", "==", req.params.dni).get();
          if (snapshot.empty) {
            console.log("No matching documents.");
            return res.status(204).send({ message: "No existen datos" });
          }
    
          snapshot.forEach((doc) => {
            response = doc.data();
          });
          return res.status(200).send(response);
        } 
        catch (error) {
          return res.status(500).send(error);
        }
      })();    
}

/*
function updContactos (req, res){

}

function delContactos (req, res){

}

*/

module.exports = {
    getContactos,
    insContactos,
    getContactosId,
    getContactosName,
    getContactosDni
};