const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const { options, gsmModem } = require('./config/config');

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

let instruction;
let instructionConsigne;

gsmModem.on('onNewMessage', (data) => {
  //

  instruction = data['message'];
  console.log('INSTRUCTION ====================> ', instruction);

  //console.log('instruction ===> ', instruction.split(':')[1]);

  // console.log(
  //   '=====> [ INFO SMS RECU ] Numéro de téléphone : ',
  //   data['sender']
  // );

  // console.log('=====> [ INFO SMS RECU ] Corps du message : ', data['message']);

  // console.log('=====> [ INFO SMS RECU ] Index du message : ', data['index']);

  // console.log(
  //  '=====> [ INFO SMS RECU ] msgStatus du message : ',
  //  data['msgStatus']
  // );

  // console.log(
  //   '=====> [ INFO SMS RECU ] dateTimeSent du message : ',
  //data['dateTimeSent']
  //);

  //! ⭐⭐⭐ RÉCUPÉRATION DES DATAS ⭐⭐⭐

  //? Récupération du numéro de la salle.

  let numSalle;

  let getNumSalle = () => {
    return new Promise((resolve, reject) => {
      //
      if (instruction.split(':')[1] == 1) {
        numSalle = 1;
        console.log('numSalle :', numSalle);
        resolve();
        //
      } else if (instruction.split(':')[1] == 2) {
        numSalle = 2;
        console.log('numSalle :', numSalle);
        resolve();
      } else if (instruction.split(':')[1] == 3) {
        numSalle = 3;
        console.log('numSalle :', numSalle);
        resolve();
      } else if (instruction.split(':')[1] == 4) {
        numSalle = 4;
        console.log('numSalle :', numSalle);
        resolve();
      } else if (instruction.split(':')[1] == 5) {
        numSalle = 6;
        console.log('numSalle :', numSalle);
        resolve();
      } else if (instruction.split(':')[1] == 6) {
        numSalle = 6;
        console.log('numSalle :', numSalle);
        resolve();
      } else {
        console.log('ERREUR : getNumSalle');
        reject();
      }
    });
  };

  //? -------------------------------------------------

  //? Envoyer l’instruction vers la salle concernée.

  let sendInstruction = () => {
    return new Promise((resolve, reject) => {
      const url = `http://192.168.1.${numSalle}:3003/api/postSmsOrderRoute/postSmsOrder`; //* Idric
      //const url = `http://192.168.1.${numSalle}:3003/api/postSmsOrderRoute/postSmsOrder`; //*Antoine

      let message = `INSTRUCTION POUR LA SALLE : ${numSalle}`;

      axios
        .post(url, {
          message,
        })
        .then(function (response) {
          console.log(`INSTRUCTION POUR LA SALLE : ${numSalle}`, response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  //? -------------------------------------------------

  //! Exécution des promesses.

  let recuperationDesDatas = async () => {
    try {
      await getNumSalle();
      await sendInstruction();
    } catch (err) {
      console.log('ERREUR : Exécution des promesses', err);
    }
  };

  //! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //! ⭐⭐⭐ MODIFICATION DE LA CONSIGNE ⭐⭐⭐.

  //? Récupération du numéro de la salle.

  let numSalleConsigne;

  let getNumSalleConsigne = () => {
    return new Promise((resolve, reject) => {
      if (instructionConsigne == 1) {
        numSalleConsigne = 1;
        console.log('numSalle ====================> :', numSalleConsigne);
        resolve();
      } else if (instructionConsigne == 2) {
        numSalleConsigne = 2;
        console.log('numSalle ====================> :', numSalleConsigne);
        resolve();
      } else if (instructionConsigne == 3) {
        numSalleConsigne = 3;
        console.log('numSalle ====================> :', numSalleConsigne);
        resolve();
      } else if (instructionConsigne == 4) {
        numSalleConsigne = 4;
        console.log('numSalle ====================> :', numSalleConsigne);
        resolve();
      } else if (instructionConsigne == 5) {
        numSalleConsigne = 6;
        console.log('numSalle ====================> :', numSalleConsigne);
        resolve();
      } else if (instructionConsigne == 6) {
        numSalleConsigne = 6;
        console.log('numSalle ====================> :', numSalleConsigne);
        resolve();
      } else {
        console.log('ERREUR : Get Num Salle');
        reject();
      }
    });
  };

  //? -------------------------------------------------

  //? Récupération de la consigne.

  let consigne;

  let getConsigne = () => {
    return new Promise((resolve, reject) => {
      try {
        consigne = instruction.split('|')[1];
        console.log('New consigne ====================> ', consigne);

        resolve();
      } catch (error) {
        console.log('ERREUR : Get consigne', err);
        reject;
      }
    });
  };

  //? -------------------------------------------------

  //? Envoyer la modification de consigne vers la salle concernée.

  let sendNewConsigne = () => {
    return new Promise((resolve, reject) => {
      const url = `http://192.168.1.${numSalleConsigne}:3003/api/postSmsOrderRoute/newConsigne`; //* Idric
      //const url = `http://192.168.1.${numSalle}:3003/api/postSmsOrderRoute/postSmsOrder`; //*Antoine

      axios
        .post(url, {
          numSalleConsigne,
          consigne,
        })
        .then(function (response) {
          console.log(`INSTRUCTION POUR LA SALLE : ${numSalle}`, response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  //? -------------------------------------------------

  //! -------------------------------------------------

  //! Exécution des promesses.

  let modificationConsigne = async () => {
    try {
      await getNumSalleConsigne();
      await getConsigne();
      await sendNewConsigne();
    } catch (err) {
      console.log('ERREUR : Exécution des promesses', err);
    }
  };

  //! -------------------------------------------------

  //! ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

  //! Routage de la demande.

  if (instruction.split(':')[0] === 'Statut') {
    console.log('instruction Statut ====================> ', instruction);
    recuperationDesDatas();
  } else if (instruction.split(':')[0] === 'Consigne') {
    instructionConsigne = instruction.split(':')[1].split('|')[0];
    console.log('Num Salle Consigne ============> ', instructionConsigne);
    modificationConsigne();
  }

  //! -------------------------------------------------
});

//? onSendingMessage.

gsmModem.on('onSendingMessage', (data) => {
  //whole message data
  console.log(`Message d'envoi d'événement : ` + JSON.stringify(data));
});

//? -------------------------------------------------

//? Si mémoire pleine.

gsmModem.on('onMemoryFull', (data) => {
  //whole message data
  console.log(`Event Memory Full: ` + JSON.stringify(data));
});

//? -------------------------------------------------

//? Ouverture du port modem.

gsmModem.open('/dev/serial0', options);

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
