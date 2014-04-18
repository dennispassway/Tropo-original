// Connect Socket
var socket = io.connect('http://192.168.124.147:3000');

// Variabelen
var updateDelay = 100;
var controller = [0,0,0,0,0,0];
var aplha, beta, gamma, hoogte, kanteling, bocht;

var processingData, closestX, closestY, closestZ;

// iPhone data ophalen
socket.on('controllerData', function (data) {
  controller = data;
});

// Processing socketdata ophalen
socket.on('processingData', function (data) {
  processingData = data;
});

// Reset knop processing
socket.on('stopApp', function () {
  location.reload();
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

  // Accelerometer kijkt of beweging is
  if (arGamma > 0.035 || arGamma < -0.035) {
    if (arBeta > 0.030 || arBeta < -0.030) {
      controllerMoves = true;
    }
  }
  else {
    controllerMoves = false;
  }

  // Kinect data
  if (processingData) {      
      //Splitten van de data in closest x,y,z
      var res = processingData.split(",");

      closestX = parseFloat(res[0]);
      closestY = parseFloat(res[1]);
      closestZ = parseFloat(res[2]);
    }
    
}, updateDelay);