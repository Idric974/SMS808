const { SerialPort } = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort({
  path: '/dev/serial0',
  baudRate: 115000,
})

// Ecriture d'un message.

port.write('Test avec node js, dit-moi si tu reçoit ', function(err) {

  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})


// Lecture d'un message.

// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', port.read())
  })
  
  // Switches the port into "flowing mode"
//   port.on('data', function (data) {
//     console.log('Data:', data)
//   })
  
  // Pipe the data into another stream (like a parser or standard out)
  // const lineStream = port.pipe(new Readline())