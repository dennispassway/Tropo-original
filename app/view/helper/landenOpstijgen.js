// Opstijgen en landen
function opstijgenLandenCheck() {
  var vliegend = false;
  var secondenBeweegs = 0;
  var secondenStil = 0;

  setInterval(function() {
    if (controllerMoves == true && vliegend == false ) {
      secondenBeweegs++;

      if (secondenBeweegs > 1 && controllerMoves == true && vliegend == false) {
        socket.emit('opstijgen');
        secondenBeweegs = 0;
        vliegend = true;
      }
    }

    if (controllerMoves == true && vliegend == true ) {
      secondenStil = 0;
    }

    if(controllerMoves == false && vliegend == true) {
      secondenStil++;
      if (secondenStil > 5 && controllerMoves == false && vliegend == true) {
          socket.emit('landen');
          secondenStil = 0;
          vliegend = false;
      }
    }
    // Debuglines
    // console.log('vlieg: ' + vliegend);
    // console.log('moves: ' + controllerMoves);
    // console.log('seconden beweegs: ' + secondenBeweegs);
    // console.log('seconden stil: ' + secondenStil);
  }, 1000);
}

var intervaller;

// Socket gets data
socket.on('opstijgen', function () {
  opstijgen();
});
socket.on('landen', function () {
  landen();
});

function opstijgen() {
  if (instructionUsed == 0 ) $('#instruction').fadeOut(1000);
  if (instructionUsed == 1 ) $('#leapInstruction').fadeOut(1000);
  if (controls) controls.movementSpeed = ControllerMovementSpeed;
}

function landen() {
  if (instructionUsed == 0 ) $('#instruction').fadeIn(1000);
  if (instructionUsed == 1 ) $('#leapInstruction').fadeIn(1000);
  if (controls) controls.movementSpeed = 0;
}