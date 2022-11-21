let { phone, gsmModem } = require('../config/config');

// serialportgsm.list((err, result) => {
//    console.log('Les des ports disponibles ===> ', result);
// });

//! SEND SMS.

exports.postSms = (req, res) => {
  let myMessage = req.body.message;
  console.log('myMessage : ', myMessage);

  //! Finally send an SMS.

  const message = `Message de : ${phone.name} | ${myMessage}`;

  gsmModem.sendSMS(phone.number, message, false, (result) => {
    //

    console.log('=====> [ INFO SMS ] Message ID : ', result.data.messageId);

    console.log('=====> [ INFO SMS ] Message status : ', result.data.response);

    console.log(
      '=====> [ INFO SMS ] Destinataire du message : ',
      result.data.recipient
    );

    console.log('=====> [ INFO SMS ] Corps du message : ', result.data.message);

    if (result.data.response === 'Message Successfully Sent') {
      res.status(200).json({ message: 'Message reçu' });
    } else {
      console.log('Problème :', result.data.response);
    }
  });
};

//! -------------------------------------------------
