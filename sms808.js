let serialportgsm = require('serialport-gsm')

// serialportgsm.list((err, result) => {
//     console.log(result)
// })

let phoneNumber = '+2620693336783'
let message = 'Salut voici mon test avec node js'

let modem = serialportgsm.Modem()
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
    logger: console
}

modem.open('/dev/ttyAMA0', options, {})

modem.on('open', data => {
    //
    modem.initializeModem((data)=>{

        console.log('Le modem est initialisé');

        modem.sendSMS( phoneNumber, message, true, (data)=>{
            console.log('Statut du modem :',data );
        })
    })
})

modem.on('onSendingMessage', result => { console.log('result : ',result); })

