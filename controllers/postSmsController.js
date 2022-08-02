let serialportgsm = require('serialport-gsm');
const magenta = '\x1b[35m';
const cyan = '\x1b[36m';
const jaune = '\x1b[33m';
const vert = '\u001b[1;32m';
const red = '\u001b[1;31m';

// serialportgsm.list((err, result) => {
//    console.log('Les des ports disponibles ===> ', result);
// });

var gsmModem = serialportgsm.Modem();

let options = {
  baudRate: 115200,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  rtscts: false,
  xon: false,
  xoff: false,
  xany: false,
  autoDeleteOnReceive: true,
  enableConcatenation: true,
  incomingCallIndication: true,
  incomingSMSIndication: true,
  pin: '1234',
  customInitCommand: '',
  cnmiCommand: 'AT+CNMI=2,1,0,2,1',
  logger: console,
};

let phone = {
  name: 'Idric',
  number: '+2620692357283',
  numberSelf: '+2620692044835',
  mode: 'PDU',
};

//! -------------------------------------------------

//! SEND SMS.

exports.postSms = (req, res) => {
  let myMessage = req.body.myMessage;
  console.log('myMessage : ', myMessage);

  //! I) Ouverture du modem.

  gsmModem.on('open', () => {
    console.log(`=====> [ INFO SET MODEM ] Modem ouvert avec succès.`);

    //? Initialisation du modem.

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

        //* set mode to PDU mode to handle SMS

        gsmModem.setModemMode((msg, err) => {
          if (err) {
            console.log(`❌❌❌ Error configuration modem  - ${err}`);
          } else {
            console.log(
              `✅✅✅ Resultat configuration modem : ${JSON.stringify(
                msg.status
              )}`
            );
          }
        }, phone.mode);

        //* FIN set mode to PDU mode to handle SMS.-----------------------------------------------

        //* Obtenir des informations sur les messages stockés sur la carte SIM.

        gsmModem.checkSimMemory((result, err) => {
          if (err) {
            console.log(
              `❌❌❌ Impossible d'obtenir les SMS stockés sur la SIM ${err}`
            );
          } else {
            console.log(
              `=====> [ INFO SMS ] Nb SMS stockés sur la SIM : ${JSON.stringify(
                result.data['used']
              )}`
            );

            //! read the whole SIM card inbox

            gsmModem.getSimInbox((result, err) => {
              //
              if (err) {
                //
                console.log(`❌❌❌ Impossible d'obtenir SimInbox ${err}`);
                //
              } else {
                //
                //! Finally send an SMS.

                const message = `Message de ${phone.name}, ${myMessage}`;

                gsmModem.sendSMS(phone.number, message, false, (result) => {
                  //

                  console.log(
                    '=====> [ INFO SMS ] Message ID : ',
                    result.data.messageId
                  );

                  console.log(
                    '=====> [ INFO SMS ] Message status : ',
                    result.data.response
                  );

                  console.log(
                    '=====> [ INFO SMS ] Destinataire du message : ',
                    result.data.recipient
                  );

                  console.log(
                    '=====> [ INFO SMS ] Corps du message : ',
                    result.data.message
                  );
                });

                res.status(201).json({ message: 'Message envoyé' });
              }
            });
          }
        });

        //* FIN Obtenir des informations sur les messages stockés sur la carte SIM.
      }
    });

    //? FIN Initialisation du modem.
  });

  //! -------------------------------------------------

  //! II) Ouverture du port modem.

  gsmModem.open('/dev/ttyAMA0', options);

  //! -------------------------------------------------

  //! III) Fermeture du modem.

  setTimeout(() => {
    gsmModem.close(() => {
      process.exit;
      console.log('[ INFO MODEM ] =====> Modem fermé avec succès.');
    });
  }, 90000);

  //! -------------------------------------------------
};

//! -------------------------------------------------
