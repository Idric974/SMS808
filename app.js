const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Gestion
const postSmsRoutes = require('./routes/postSmsRoute');
const getSmsRoutes = require('./routes/getSmsRoute');

//! Utilisation de cors pour les connexions

const cors = require('cors');
app.use(cors());

//! --------------------------------------------------

//! Header pour les Cross Origine

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

//! --------------------------------------------------

//! Utilisation de body parser

app.use(bodyParser.json());

//! --------------------------------------------------

//! Génération des pages html.

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/pageRelay.html', (req, res) => {
  res.sendFile(__dirname + '/pageRelay.html');
});

app.get('/pageCourbes.html', (req, res) => {
  res.sendFile(__dirname + '/pageCourbes.html');
});

app.get('/pageCourbes1.html', (req, res) => {
  res.sendFile(__dirname + '/pageCourbes1.html');
});

//! --------------------------------------------------

//! Les images.

app.use('/images', express.static('/home/pi/Desktop/champiBack_V2/images'));
//! --------------------------------------------------

//! Le CSS.

app.use('/styles', express.static('/home/pi/Desktop/champiBack_V2/styles'));
//! --------------------------------------------------

//! Le Javascript.

app.use('/', express.static('/home/pi/Desktop/champiBack_V2/'));
//! --------------------------------------------------

//! Liste des routes.

// Gestion
app.use('/api/postSms', postSmsRoutes);
app.use('/api/getSms', getSmsRoutes);

//! --------------------------------------------------

module.exports = app;
