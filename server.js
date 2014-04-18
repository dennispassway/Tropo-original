var express = require('express');
var http = require('http');
var path = require('path');
var app = require('express')();

var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

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
  
});