// Get URL variablen
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}
numberURL = (getUrlVars('view'));
viewNumber = (numberURL.view);
worldURL = (getUrlVars('world'));
worldNumber = worldURL.world;

// Radians to degree and visa versa
function toRadian(degree) {
  radian = degree/57.2957795;
  return radian;
}
function toDegree(radian) {
  degree = radian*57.2957795;
  return degree;
}

// Window resize functie
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
}