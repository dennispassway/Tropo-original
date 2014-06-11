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
  if(particleSystem && particleSystem.position.distanceTo(camera.position) > activeArea) {
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
    if (object[i].position.distanceTo(camera.position) < afstandAnimatie) {
      object[i].worldAnimation.nearObjectAnimation();
    }
  }
}

// Sky Box
function loadSkyBox() {
  skyboxLoader = new THREE.JSONLoader();
  
  skyboxModel = 'model/boundingBox/boundingBox.js';
  if (worldNumber == 1) skyboxModel = 'model/boundingBox/boundingBox.js';
  if (worldNumber == 2) skyboxModel = 'model/nijntje/boundingBox/boundingBox.js';

  skyboxLoader.load(skyboxModel, function (geometry,materials) { 
      skybox = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
      skybox.scale.set(7,7,7);
      scene.add(skybox);
  });
}