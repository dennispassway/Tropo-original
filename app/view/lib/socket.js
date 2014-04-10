// Connect Socket
var socket = io.connect('http://169.254.217.157:3000');

// Variabelen
var updateDelay = 100;
var controller = [0,0,0,0,0,0];
var aplha, beta, gamma, hoogte, kanteling, bocht;

// Socketdata ophalen
socket.on('controllerData', function (data) {
  controller = data;
});

// Verwerk Data
setInterval(function() {
  // Gyroscoop
  alpha = controller[0];
  beta = controller[1];
  gamma = controller[2];
  // Accelerometer
  var arAlpha = controller[3];
  var arBeta = controller[4];
  var arGamma = controller[5];
  // Omgerekend
  hoogte = beta;
  kanteling = gamma;
  // bocht = alpha/3.6;
}, updateDelay);