let { gsmModem, serialportgsm } = require('../config/config');

exports.getSms = (req, res) => {
  //   serialportgsm.list((err, result) => {
  //    console.log('Les des ports disponibles ===> ', result);
  // });

  //! read the whole SIM card inbox

  gsmModem.getSimInbox((result, err) => {
    if (err) {
      console.log(`❌❌❌ Impossible d'obtenir SimInbox ${err}`);
    } else {
      var arr = [];
      obj = {};

      var messagesInBox = result.data;

      for (var i = 0; i < messagesInBox.length; i++) {
        var obj = {};

        obj['Message SMS'] = messagesInBox[i];

        arr.push(obj);
      }

      console.log('=====> [ INFO SMS ]  Liste de message', arr);

      res.status(200).json(arr);
      res.end();
    }
  });

  //! -------------------------------------------------
};
