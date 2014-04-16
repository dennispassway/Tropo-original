var box;

function initKinect() {
  var boxGeo = new THREE.CubeGeometry( 500,500,500 );
  var boxMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
  box = new THREE.Mesh(boxGeo, boxMaterial);
  scene.add(box);
  box.position.set(2000,2000,0);
}

// Processingfunctie
function processingVerwerks() {
  if(processingData) {
    box.position.set(closestX, closestY, closestZ);
  }
}