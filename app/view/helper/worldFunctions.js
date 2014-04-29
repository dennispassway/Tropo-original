verschilX = [];
verschilY = [];
verschilZ = [];
function checkPositionDistance(i) {
  // Objects
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

  // Particles
  if(particleSystem.position.distanceTo(camera.position) > activeArea) {
    particleVerschilX = particleSystem.position.x - camera.position.x;
    particleVerschilY = particleSystem.position.y - camera.position.y;
    particleVerschilZ = particleSystem.position.z - camera.position.z;

    if (particleVerschilX < -activeArea) { particleSystem.position.x = particleSystem.position.x + (2*activeArea-200)}
    if (particleVerschilX > activeArea) { particleSystem.position.x = particleSystem.position.x - (2*activeArea-200)}
    if (particleVerschilY < -activeArea) { particleSystem.position.y = particleSystem.position.y + (2*activeArea-200)}
    if (particleVerschilY > activeArea) { particleSystem.position.y = particleSystem.position.y - (2*activeArea-200)}
    if (particleVerschilZ < -activeArea) { particleSystem.position.z = particleSystem.position.z + (2*activeArea-200)}
    if (particleVerschilZ > activeArea) { particleSystem.position.z = particleSystem.position.z - (2*activeArea-200)}
  }
}

// Check Nearness
function checkAnimationDistance() {
  for (i = 0; i < object.length; i++) {
    if (object[i].position.distanceTo(camera.position) < afstandAnimatie) { object[i].animatie.nearObjectAnimation(); }
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

// Bounding Box
var boxLoader = new THREE.ColladaLoader();
function loadBoundingBox() {
  boxLoader.load(String('model/boundingBox/boundingBox.dae'), function (result) {
  boundingBox = result.scene;
  boundingBox.scale.set(boundingBoxScale,boundingBoxScale,boundingBoxScale);
  boundingBox.rotation.set(toRadian(-90),toRadian(0),toRadian(0));
  scene.add(boundingBox);
});
}