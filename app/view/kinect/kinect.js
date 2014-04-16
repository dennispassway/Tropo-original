var box;

function initKinect() {
  loader = new THREE.ColladaLoader();
    loader.load(String('model/bij.dae'), function (result) {
      bij = result.scene;
      bij.scale.set(400,400,400);
      scene.add(bij);
    });
}

// Processingfunctie
function processingVerwerks() {
  if(processingData) {
    bij.position.set(closestX, closestY, closestZ);
  }
}