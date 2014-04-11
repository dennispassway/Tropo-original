// Connect Socket
var socket = io.connect('http://192.168.124.147:3000');

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
  alpha = event.alpha;
  beta = event.beta;
  gamma = event.gamma;
}

// Lerp variabelen
var alphaNew, betaNew, gammaNew;
var alphaLast = 0;
var betaLast = 0;
var gammaLast = 0;

  // Lerpfunctie van alpha, beta en gamma voor soepelheid
function lerp(a, b, t) {
    var result = (a + ( t * (b - a) ) );
    result = Math.round(result);
    return result;
}

// Gyroscoop op de kop?
setInterval(function() {
  if (gamma > -90 && gamma < 90){
    gamma = gamma;
  }
  else {
    if (gamma < -90) { gamma = -180 - gamma; }
    if (gamma > 90) { gamma = 180 - gamma; }
  }

}, updateDelay);

  // Lerpen
setInterval(function() {
  alphaNew = alpha;
  alpha = lerp(alphaNew, alphaLast, 0.5);
  alphaLast = alpha;

  betaNew = beta;
  beta = lerp(betaNew, betaLast, 0.5);
  betaLast = beta;

  gammaNew = gamma;
  gamma = lerp(gammaNew, gammaLast, 0.5);
  gammaLast = gamma;
}, updateDelay);

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