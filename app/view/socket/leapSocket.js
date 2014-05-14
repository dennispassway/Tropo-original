instructionUsed = 1;
var updateDelay = 100;

if (!viewNumber || viewNumber == 1) {

  // Variabelen
  var hoogte = 0;
  var kanteling = 0;
  var bocht = 0;

  // Leap Motion Stuff
  var leapController = Leap.loop(function(frame){
    if (frame.hands.length == 0) {
      socket.emit('landen');
    }
    if (frame.hands.length > 0) {
      socket.emit('opstijgen');

      hand = frame.hands[0];

      roll = hand.roll();
      roll = toDegree(roll);

      pitch = hand.pitch();
      pitch = toDegree(pitch);

      kanteling = roll;
      hoogte = pitch;
    }
  });

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

  // Verwerk Data
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
        switch (userId) {
          case 0: user0 = [closestX, closestY, closestZ];
          break;
          case 1: user1 = [closestX, closestY, closestZ];
          break;
          case 2: user2 = [closestX, closestY, closestZ];
          break;
          case 3: user3 = [closestX, closestY, closestZ];
          break;
          case 4: user4 = [closestX, closestY, closestZ];
          break;
        }
      }

  }, updateDelay);