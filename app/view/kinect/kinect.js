var box;
var meeuwOpBox;

function initKinect() {
  boxGeo = new THREE.CubeGeometry( 200,200,200 );
  boxMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
  boxMaterial2 = new THREE.MeshBasicMaterial( {color: 0xFFCC33} );
  box = new THREE.Mesh(boxGeo, boxMaterial);
  meeuwOpBox = meeuw.clone()
  meeuwOpBox.scale.set(5000,5000,5000);
  scene.add(box);
  box.add(meeuwOpBox);
  box.position.set(camera.position.x,camera.position.y,camera.position.z);
  meeuwOpBox.position.set(0, 0, -2000);
}

// Processingfunctie
function processingVerwerks() { 
  if(processingData) {
    box.position.set(camera.position.x,camera.position.y,camera.position.z);
    box.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    meeuwOpBox.position.set(closestX-500, closestY-400, -closestZ);
  }
}