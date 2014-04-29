// Get URL variablen
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

// Radians to degree
function toRadian(degree) {
  radian = degree/57.2957795;
  return radian;
}

// Window resize functie
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
}

// Only for development
function area() {
  boundingBoxGeo = new THREE.CubeGeometry( activeArea, activeArea, activeArea );
  boundingBoxMat = new THREE.MeshBasicMaterial( {color: 0xff00ff} );
  boundingBox = new THREE.Mesh(boundingBoxGeo, boundingBoxMat);
  boundingBox.material.side = THREE.DoubleSide;
  boundingBox.material.transparent = true;
  boundingBox.material.opacity = 0.6;
  boundingBox.position.y = activeArea/2;
  scene.add(boundingBox);
}