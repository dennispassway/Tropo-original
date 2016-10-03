const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const http = require('http')
const path = require('path')

const app = require('express')()
app.use(compression())
app.use(helmet())
app.use(express.static(path.join(__dirname, 'app')))

const server = require('http').createServer(app).listen(8000)
const io = require('socket.io').listen(server)

io.sockets.on('connection', socket => {
  socket.on('controllerMovement', data => socket.broadcast.emit('controllerData', data))
  socket.on('gameCompleted', () => io.sockets.emit('gameCompleted'))
  socket.on('landen', () => io.sockets.emit('landen'))
  socket.on('mainCameraPosition', data => io.sockets.emit('CameraPositionData', data))
  socket.on('opstijgen', () => io.sockets.emit('opstijgen'))
  socket.on('startApplicationPressed', () => socket.broadcast.emit('startApp'))
  socket.on('stopApplicationPressed', () => socket.broadcast.emit('stopApp'))
})
