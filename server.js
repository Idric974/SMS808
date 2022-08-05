const http = require('http');
const app = require('./app');
const cors = require('cors');
// const sms808 = require('./sms808')

app.use(cors());

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + `${port}`;

  console.log(
    '[ SERVER NODE           ] Le serveur SMS808 est démarré sur le ' + bind
  );
});

process.on('warning', (e) =>
  console.warn('\x1b[33m', '[ LES WARNING ]', e.stack)
);

// logger.info('Voici mon test de log');

server.listen(port);
