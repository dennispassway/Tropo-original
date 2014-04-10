// Connect Socket
var socket = io.connect('http://169.254.217.157:3000');

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

// Naar Socket sturen
setInterval(function() {
  var controllerData = [alpha,beta,gamma,arAlpha,arBeta,arGamma];
  socket.emit('controllerMovement', controllerData);
}, updateDelay);

// Tekenen in scherm
setInterval(function() {
  document.getElementById('alpha').innerHTML = '';
  document.getElementById('alpha').appendChild(document.createTextNode(alpha));
  document.getElementById('beta').innerHTML = '';
  document.getElementById('beta').appendChild(document.createTextNode(beta));
  document.getElementById('gamma').innerHTML = '';
  document.getElementById('gamma').appendChild(document.createTextNode(gamma));
  document.getElementById('arAlpha').innerHTML = '';
  document.getElementById('arAlpha').appendChild(document.createTextNode(arAlpha));
  document.getElementById('arBeta').innerHTML = '';
  document.getElementById('arBeta').appendChild(document.createTextNode(arBeta));
  document.getElementById('arGamma').innerHTML = '';
  document.getElementById('arGamma').appendChild(document.createTextNode(arGamma));
}, updateDelay);