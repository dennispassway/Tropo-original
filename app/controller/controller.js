// Connect Socket
var socketRhino = 'http://192.168.124.82:3000';
var socketHome = 'http://192.168.0.102:3000';
var socketHoog = 'http://192.168.1.139:3000';
var socket = io.connect(socketRhino);

// Variabelen
var updateDelay = 100;

// Accelero - Motion
var arAlpha = 0;
var arBeta = 0;
var arGamma = 0;
window.ondevicemotion = function(event) {
  ax = event.acceleration.x
  ay = event.acceleration.y
  az = event.acceleration.z
  rotation = event.rotationRate;
  /*if (rotation != null) {
    arAlpha = Math.round(rotation.alpha);
    arBeta = Math.round(rotation.beta);
    arGamma = Math.round(rotation.gamma);
  }*/
  arAlpha = Math.round(ax);
  arBeta = Math.round(ay);
  arGamma = Math.round(az);
}

// Gyroscope
var alpha = 1;
var beta = 1;
var gamma = 1;
window.ondeviceorientation = function(event) {
  alpha = Math.round(event.alpha);
  beta = Math.round(event.beta);
  gamma = Math.round(event.gamma);
}

// Tekenen in scherm
setInterval(function() {
  // Waarde tekenen
  $('#alpha').html(alpha);
  $('#beta').html(beta);
  $('#gamma').html(gamma);

  $('#arAlpha').html(arAlpha);
  $('#arBeta').html(arBeta);
  $('#arGamma').html(arGamma);
}, updateDelay);

// Naar Socket sturen
setInterval(function() {
  var controllerData = [alpha,beta,gamma,arAlpha,arBeta,arGamma];
  socket.emit('controllerMovement', controllerData);
}, updateDelay);