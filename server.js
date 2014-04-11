// Set app
var express = require('express');
var http = require('http');
var path = require('path');
var app = require('express')();

var server = require('http').createServer(app).listen(3000);
var io = require('socket.io').listen(server);

// Public folder
app.use(express.static(path.join(__dirname, 'app')));

// Server Dinges
app.get('/', function (req, res) {
  res.sendfile('app/index.html');
});

// Events
io.sockets.on('connection', function (socket) {

  // Track controller movement
  socket.on('controllerMovement', function (data) {
    socket.broadcast.emit('controllerData', data);
  });

  // Start Application
  socket.on('startApplicationPressed', function () {
    console.log('Start Tropo!');
    socket.broadcast.emit('startApp');
  });

});