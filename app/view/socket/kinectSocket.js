if (!viewNumber || viewNumber == 1) {
  // Variabelen
  var updateDelay = 100;
  var hoogte = 0;
  var kanteling = 0;

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

        linksrechts = parseFloat(res[0]);
        hooglaag = parseFloat(res[1]);

        hoogte = -hooglaag;
        kanteling = -linksrechts*3;
      }

  }, updateDelay);
}