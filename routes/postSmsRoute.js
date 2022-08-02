const express = require('express');
const router = express.Router();
const postSmsCtrl = require('../controllers/postSmsController');

//! POST SMS.

router.post('/postSms', postSmsCtrl.postSms);

module.exports = router;
