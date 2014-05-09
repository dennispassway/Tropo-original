// Opstijgen en landen
function opstijgenLandenCheck() {
  var vliegend = false;
  var secondenBeweegs = 0;
  var secondenStil = 0;

  setInterval(function() {
    if (controllerMoves == true && vliegend == false ) {
      secondenBeweegs++;

      if (secondenBeweegs > 1 && controllerMoves == true && vliegend == false) {
        opstijgen();
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
          landen();
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
function opstijgen() {
  // intervaller = setInterval(function() {
  //   if (scene.fog.density > vliegWaarde){ scene.fog.density -= densityStijging; }
  //   else { clearInterval(intervaller); }
  // }, 100);
  $('#instruction').fadeOut(1000);
  controls.movementSpeed = ControllerMovementSpeed;
}

function landen() {
  // intervaller = setInterval(function() {
  //   if (scene.fog.density < landWaarde){ scene.fog.density += densityStijging; }
  //   else { clearInterval(intervaller); }
  // }, 100);
  $('#instruction').fadeIn(1000);
  controls.movementSpeed = 0;
}