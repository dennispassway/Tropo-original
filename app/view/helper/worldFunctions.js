// Box to limit maximum movement
function movementBox() {
  if (camera.position.y < 0) { camera.position.y = 0; }
  if (camera.position.y > 5000) { camera.position.y = 5000; }
  if (camera.position.x < -4000) {camera.position.x = -4000};
  if (camera.position.x > 4000) {camera.position.x = 4000};
  if (camera.position.z < -4000) {camera.position.z = -4000};
  if (camera.position.z > 4000) {camera.position.z = 4000};
}

// Check Nearness
function checkDistance() {
  for (i = 0; i < object.length; i++) {
    if (camera.position.x  > object[i].position.x - afstandAnimatie && camera.position.x < object[i].position.x  + afstandAnimatie) {
      if (camera.position.y  > object[i].position.y - afstandAnimatie && camera.position.y < object[i].position.y  + afstandAnimatie) {
        if (camera.position.z  > object[i].position.z - afstandAnimatie && camera.position.z < object[i].position.z  + afstandAnimatie) {
          object[i].animatie.runAnimatie();
        }
      }
    }
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