var box;
var box2;

function initKinect() {
  var boxGeo = new THREE.CubeGeometry( 200,200,200 );
  var boxMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
  var boxMaterial2 = new THREE.MeshBasicMaterial( {color: 0xFFCC33} );
  box = new THREE.Mesh(boxGeo, boxMaterial);
  box2 = new THREE.Mesh(boxGeo, boxMaterial);
  scene.add(box);
  box.add(box2);
  box.position.set(camera.position.x,camera.position.y,camera.position.z);
  box2.position.set(0, 0, -2000);
}

// Processingfunctie
function processingVerwerks() {
	box.position.set(camera.position.x,camera.position.y,camera.position.z);
	box.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
  	
  if(processingData) {
    box2.position.set(closestX-500, closestY-400, -closestZ-1000);
  }
}