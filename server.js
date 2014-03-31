// Set app
var express = require('express');
var http = require('http');
var path = require('path');
var app = require('express')()
, server = require('http').createServer(app)
, io = require('socket.io').listen(server);

// Poort
server.listen(3000);

// Public folder
app.use(express.static(path.join(__dirname, 'app')));

// Server Dinges
app.get('/', function (req, res) {
  res.sendfile('app/index.html');
});

// Events
io.sockets.on('connection', function (socket) {

  socket.on('controllerMovement', function (data) {
    socket.broadcast.emit('controllerData', data);
  });

});