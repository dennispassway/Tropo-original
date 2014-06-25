var express = require('express');
var http = require('http');
var path = require('path');
var app = require('express')();

var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);
// Log only warnings
io.set('log level', 1);

// Public folder
app.use(express.static(path.join(__dirname, 'app')));

// Serveren index.html bij http request
app.get('/', function (req, res) {
  res.sendfile('app/index.html');
});

// Processing
var processingMessage = "";
var net = require('net');
var processingServer = net.createServer(function (socket) {
  console.log("Processing is connected to the socket.");
  socket.on("data", function(chunk) {
    processingMessage = chunk;
  });
}).listen(8080);

// Socket events
io.sockets.on('connection', function (socket) {

  // Track controller movement
  socket.on('controllerMovement', function (data) {
    socket.broadcast.emit('controllerData', data);
  });

  // Mainview camera data
  socket.on('mainCameraPosition', function(data) {
    io.sockets.emit('CameraPositionData', data);
  });

  // Track kinect processingData
  setInterval(function() {
    data = processingMessage.toString();
    if (data) {
        socket.broadcast.emit('processingData', data);
    }
  },100);
  
  // Start Application
  socket.on('startApplicationPressed', function () {
    console.log('Start Tropo!');
    socket.broadcast.emit('startApp');
  });

  // Stop Application
  socket.on('stopApplicationPressed', function () {
    console.log('Stop Tropo!');
    socket.broadcast.emit('stopApp');
  });

  // Landen Opstijgen
  socket.on('opstijgen', function() {
    io.sockets.emit('opstijgen');
  });
  socket.on('landen', function() {
    io.sockets.emit('landen');
  });

  // Game completed
  socket.on('gameCompleted', function() {
    io.sockets.emit('gameCompleted');
  });

});

/* ARDUINO SETUP */
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/cu.usbmodemfa131", {
  baudrate: 9600
});

var buttons = [0,0,0];
function resetButtonPressed(number) {
  setTimeout(function() {
    buttons[number] = 0;
    io.sockets.emit('buttons', buttons);
  }, 1000);
}

/* ARDUINO FUNCTION */
if (typeof(serialPort) != "undefined"){
  serialPort.on("open", function () {
  serialPort.on('data', function(data) {
    data = Math.floor(data / (Math.pow(10, 0)) % 10);
    buttons[data] = 1;

    io.sockets.emit('buttons', buttons);

    resetButtonPressed(data);

  });
});
}