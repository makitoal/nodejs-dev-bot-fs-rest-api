// INVOCANDO A MODULOS DE APLICACION
const axios = require('axios');
const https = require('https'); 
const { Router } = require("express");
const router = Router();

const urlReniec='https://api.reniec.cloud/dni/';

// GET CONVERSACIONES POR ID
router.get("/ext/reniec/:dni", (req, res) => {
    (async () => {
    
    let dni = req.params.dni;
    console.log('RUTAS EXTERNAS -> RENIEC DNI');
    
    // OMITIMOS VALIDACION HTTPS
    const axioshttp = axios.create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false
        })
    });

    // CONSULTAMOS DNI A RENIEC CON PROMESAS
    await axioshttp.get(urlReniec + dni)

    .then(function(resDNI){
        console.log('Devuele datos DNI RENIEC -> ', dni);
        return res.status(200).json({ "Persona": resDNI.data});
        })

    .catch(error => {
        console.log('Devuele Error');
        console.log(error);
        return res.status(500).send(error);
        });
    })();

  });

module.exports=router;