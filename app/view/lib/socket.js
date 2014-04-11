// Connect Socket
var socket = io.connect('http://localhost:3000');

// Variabelen
var updateDelay = 100;
var controller = [0,0,0,0,0,0];
var aplha, beta, gamma, hoogte, kanteling, bocht;

// iPhone data ophalen
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