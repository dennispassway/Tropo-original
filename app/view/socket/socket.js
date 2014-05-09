// Variabelen
var updateDelay = 100;
var controller = [0,0,0,0,0,0];
var alpha, beta, gamma, hoogte, kanteling, bocht;

var processingData, userId, closestX, closestY, closestZ;
var user0 = [0,0,0];
var user1 = [0,0,0];
var user2 = [0,0,0];
var user3 = [0,0,0];
var user4 = [0,0,0];

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
  // bocht = alpha;

  // Accelerometer kijkt of beweging is
  if ((arGamma > 0.035 || arGamma < -0.035) && (arBeta > 0.030 || arBeta < -0.030)) {
      controllerMoves = true;
  }
  else {
    controllerMoves = false;
  }

  // Kinect data
  if (processingData) {
      //Splitten van de data in closest x,y,z
      var res = processingData.split(",");

      userId = parseFloat(res[0]);
      closestX = parseFloat(res[1]);
      closestY = parseFloat(res[2]);
      closestZ = parseFloat(res[3]);

      //Data verwerken per user
      switch (userId) {
        case 0:
          user0 = [closestX, closestY, closestZ];
        break;
        case 1:
          user1 = [closestX, closestY, closestZ];
        break;
        case 2:
          user2 = [closestX, closestY, closestZ];
        break;
        case 3:
          user3 = [closestX, closestY, closestZ];
        break;
        case 4:
          user4 = [closestX, closestY, closestZ];
        break;
      }
    }

}, updateDelay);