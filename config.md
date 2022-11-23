let serialportgsm = require('serialport-gsm');

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
  name: 'Felix',
  number: '+2620692357283', //* Numéro du destinataire du message du message (Pascale).
  numberSelf: '+2620692044835', //* Numéro de la carte SIM dans le module SMS808.
  mode: 'PDU',
};

module.exports = { options, phone, gsmModem, serialportgsm };
