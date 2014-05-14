var updateDelay = 100;
if (!viewNumber || viewNumber == 1) {
  // Variabelen
  var controller = [0,0,0,0,0,0];
  var alpha, beta, gamma, hoogte, kanteling, bocht;

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
    arAlpha = controller[3];
    arBeta = controller[4];
    arGamma = controller[5];
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

  }, updateDelay);
}

// Processing
var processingData, userId, closestX, closestY, closestZ;
var user0 = [0,0,0];
var user1 = [0,0,0];
var user2 = [0,0,0];
var user3 = [0,0,0];
var user4 = [0,0,0];

// Processing socketdata ophalen
  socket.on('processingData', function (data) {
    processingData = data;
  });

setInterval(function() {
  // Kinect data
  if (processingData) {
    //Splitten van de data in closest x,y,z
    var res = processingData.split(",");

    userId = parseFloat(res[0]);
    closestX = parseFloat(res[1]);
    closestY = parseFloat(res[2]);
    closestZ = parseFloat(res[3]);

    //Data verwerken per user
    if (userId == 0) user0 = [closestX, closestY, closestZ];
    if (userId == 1) user1 = [closestX, closestY, closestZ];
    if (userId == 2) user2 = [closestX, closestY, closestZ];
    if (userId == 3) user3 = [closestX, closestY, closestZ];
    if (userId == 4) user4 = [closestX, closestY, closestZ];
  }
}, updateDelay);