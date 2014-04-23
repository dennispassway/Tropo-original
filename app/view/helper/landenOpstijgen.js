// Opstijgen en landen
function opstijgenLandenCheck() {
  var vliegend = false;
  var secondenBeweegs = 0;
  var secondenStil = 0;

  setInterval(function() {
    if (controllerMoves == true && vliegend == false ) {
      secondenBeweegs++;
      if (secondenBeweegs > 1) {
        if (controllerMoves == true && vliegend == false ) {
          opstijgen();
          secondenBeweegs = 0;
          vliegend = true;
        }
      }
    }
    if (controllerMoves == true && vliegend == true ) {
      secondenStil = 0;
    }
    if(controllerMoves == false && vliegend == true) {
      secondenStil++;
      if (secondenStil > 5) {
        if (controllerMoves == false && vliegend == true) {
          landen();
          secondenStil = 0;
          vliegend = false;
          }
      }
    }
    // Debuglines
    // console.log('vlieg: ' + vliegend);
    // console.log('moves: ' + controllerMoves);
    // console.log('seconden beweegs: ' + secondenBeweegs);
    // console.log('seconden stil: ' + secondenStil);
  }, 1000);
}

function opstijgen() {
  var intervaller = setInterval(function() {
    if (scene.fog.density > vliegWaarde){ scene.fog.density -= densityStijging; }
    else { clearInterval(intervaller); }
  }, 100);
}

function landen() {
  var intervaller = setInterval(function() {
    if (scene.fog.density < landWaarde){ scene.fog.density += densityStijging; }
    else { clearInterval(intervaller); }
  }, 100);
}