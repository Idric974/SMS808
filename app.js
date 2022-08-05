const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { options, gsmModem } = require('./config/config')

//! GESTION DU MODEM.

//? Procedure initialisation du modem.

gsmModem.on('open', () => {
  //
  console.log(`=====> [ INFO SET MODEM ] Modem ouvert avec succès.`);
  //
  gsmModem.initializeModem((msg, err) => {
    //
    if (err) {
      //
      console.log(`❌❌❌ Erreur d'initialisation du modem : ${err}`);
    } else {
      //
      console.log(
        `=====> [ INFO SET MODEM ] Initialisation du modem : ${JSON.stringify(
          msg.status
        )}`
      );
    }
  });
});

//? -------------------------------------------------


//? Reception des SMS.


gsmModem.on('onNewMessage', data => {
  //
  console.log("=====> [ INFO SMS RECU ] Numéro de téléphone : ", data['sender']);
  console.log("=====> [ INFO SMS RECU ] Corps du message : ", data['message']);
  console.log("=====> [ INFO SMS RECU ] Index du message : ", data['index']);
  console.log("=====> [ INFO SMS RECU ] msgStatus du message : ", data['msgStatus']);
  console.log("=====> [ INFO SMS RECU ] dateTimeSent du message : ", data['dateTimeSent']);


  //* Requete de retour SMS.

  const url = 'http://192.168.1.10:3003/api/postSmsOrderRoute/postSmsOrder';

  let message = "TEST SMS ORDER";

  axios
    .post(url, {
      message,
    })
    .then(function (response) {
      console.log('SMS ORDERS : ', response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

});

//* -------------------------------------------------

//? -------------------------------------------------

//? onSendingMessage.

gsmModem.on('onSendingMessage', data => {
  //whole message data
  console.log(`Message d'envoi d'événement : ` + JSON.stringify(data));
});

//? -------------------------------------------------

//? Si mémoire pleine.

gsmModem.on('onMemoryFull', data => {
  //whole message data
  console.log(`Event Memory Full: ` + JSON.stringify(data));
});

//? -------------------------------------------------

//? Ouverture du port modem.

gsmModem.open('/dev/ttyAMA0', options);

//? -------------------------------------------------

//! --------------------------------------------------

//! GGESTION DES REQUETES HTTP.

//? Import des routes.

const postSmsRoutes = require('./routes/postSmsRoute');
const getSmsRoutes = require('./routes/getSmsRoute');

//? --------------------------------------------------


//? Utilisation de cors pour les connexions

const cors = require('cors');
app.use(cors());

//? --------------------------------------------------

//? Header pour les Cross Origine

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

//? --------------------------------------------------

//? Utilisation de body parser

app.use(bodyParser.json());

//? --------------------------------------------------

//? Génération des pages html.

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/pageRelay.html', (req, res) => {
  res.sendFile(__dirname + '/pageRelay.html');
});

//? --------------------------------------------------

//? Les images.

app.use('/images', express.static('/home/pi/Desktop/champiBack_V2/images'));

//? --------------------------------------------------

//? Le CSS.

app.use('/styles', express.static('/home/pi/Desktop/champiBack_V2/styles'));

//? --------------------------------------------------

//? Le Javascript.

app.use('/', express.static('/home/pi/Desktop/champiBack_V2/'));

//? --------------------------------------------------

//? Liste des routes.

app.use('/api/postSms', postSmsRoutes);
app.use('/api/getSms', getSmsRoutes);

//? --------------------------------------------------

module.exports = app;
