// INVOCANDO A MODULOS DE APLICACION
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

// CONFIGURANDO ACCESO A FIRESTORE
const serviceAccount = require('./src/db/config-db.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// INICIANDO APP CON EXPRESS
const app = express();

// UTILIZANDO BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURANDO SERVIDOR Y PUERTO
app.set("port", process.env.PORT || 3000);
app.listen(3000);
console.log("APP EN PUERTO 3000");

// INCIAMOS CONTRUYENDO API CONTACTOS

// GET CONTACTOS
app.get("/api/contactos", async (req, res) => {
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
});

// GET CONTACTOS POR ID
app.get("/api/contactos/:id", (req, res) => {
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
app.post("/api/contactos", async (req, res) => {
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

  // GET CONTACTOS POR NOMBRE
  app.get("/api/contactos/firstname/:firstname", (req, res) => {
    (async () => {

      console.log('Busca contactos por nombre -> ' + req.params.firstname);
      try {
        const doc = db.collection('contactos');
        const snapshot = await doc.where('firstname', '==', req.params.firstname).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return res.status(204).send({message: 'No existen datos'});
        };

        snapshot.forEach(doc => {
          response= doc.data();
        });
        return res.status(200).send(response);


      } catch (error) {
          return res.status(500).send(error);
      }
    })();
  });

   // GET CONTACTOS POR DNI
   app.get("/api/contactos/dni/:dni", (req, res) => {
    (async () => {

      console.log('Busca contactos por DNI -> ' + req.params.dni);
      try {
        const doc = db.collection('contactos');
        const snapshot = await doc.where('dni', '==', req.params.dni).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return res.status(204).send({message: 'No existen datos'});
        };

        snapshot.forEach(doc => {
          response= doc.data();
        });
        return res.status(200).send(response);
      } 
      catch (error) {
          return res.status(500).send(error);
      }
    })();
  });

