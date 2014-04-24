verschilX = [];
verschilY = [];
verschilZ = [];
function checkPositionDistance(i) {
  for (i=0; i < object.length; i++){
    if(object[i].position.distanceTo(camera.position) > activeArea) {
      verschilX[i] = object[i].position.x - camera.position.x;
      verschilY[i] = object[i].position.y - camera.position.y;
      verschilZ[i] = object[i].position.z - camera.position.z;

      if (verschilX[i] < -activeArea) { object[i].position.x = object[i].position.x + (2*activeArea-200)}
      if (verschilX[i] > activeArea) { object[i].position.x = object[i].position.x - (2*activeArea-200)}
      if (verschilY[i] < -activeArea) { object[i].position.y = object[i].position.y + (2*activeArea-200)}
      if (verschilY[i] > activeArea) { object[i].position.y = object[i].position.y - (2*activeArea-200)}
      if (verschilZ[i] < -activeArea) { object[i].position.z = object[i].position.z + (2*activeArea-200)}
      if (verschilZ[i] > activeArea) { object[i].position.z = object[i].position.z - (2*activeArea-200)}
    }
  }
}

// Check Nearness
function checkAnimationDistance() {
  for (i = 0; i < object.length; i++) {
    if (object[i].position.distanceTo(camera.position) < afstandAnimatie) { object[i].animatie.runAnimatie(); }
  }
}

// Tween
function floatingTween() {
  for (i = 0; i < object.length; i++) {
    var tween = new TWEEN.Tween( object[i].position ).to({z: "+" + floatingTweenAfstand}, jsonSet[i].beweegSnelheid)
    .easing( TWEEN.Easing.Cubic.InOut);
    var tweenBack = new TWEEN.Tween( object[i].position ).to({z: "-" + floatingTweenAfstand}, jsonSet[i].beweegSnelheid)
    .easing( TWEEN.Easing.Cubic.InOut);
    tween.chain(tweenBack);
    tweenBack.chain(tween);
    tween.start();
  }
}