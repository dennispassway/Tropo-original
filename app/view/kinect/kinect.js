var box;

function initKinect() {
  // Kinect sphere test
  var boxGeometry = new THREE.CubeGeometry(500,500,500);
  var boxMaterial = new THREE.MeshBasicMaterial( { color: 0xFFFF00} );
  box = new THREE.Mesh( boxGeometry, boxMaterial );
  // scene.add(box);
}

// Processingfunctie
function processingVerwerks() {
  if(processingData) {
    box.position.set(closestX, closestY, closestZ);
  }
}