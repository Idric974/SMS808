const express = require('express');
const router = express.Router();
const postSmsCtrl = require('../controllers/getSmsController');

//! POST SMS.

router.get('/getSms', postSmsCtrl.getSms);

module.exports = router;
