var container, camera, controls, scene, renderer;
var clock = new THREE.Clock();

// Init en animate worden gerunt wanneer database klaar is.

function init() {
  container = document.getElementById( 'container' );

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xA2BED8, 0.00035 );

  // Camera
  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(-2000,-2000,0);

  // Camera offset
  // var w1 = 1432;
  // var h1 = 783;
  // var w2 = 1432;
  // var h2 = 783;
  // camera.setViewOffset( w1 + w2, h1, 0, 0, w1, h1 );

  // Controls
  controls = new THREE.FirstPersonControls( camera );

  // Bounding Box
  var boxLoader = new THREE.ColladaLoader();
  boxLoader.load(String('model/boundingBox/boundingBox.dae'), function (result) {
    boundingBox = result.scene;
    boundingBox.scale.set(500,500,500);
    boundingBox.rotation.set(toDegree(-90),toDegree(0),toDegree(0));
    scene.add(boundingBox);
  });

  // Renderer
  renderer = new THREE.WebGLRenderer( {antialias : true});
  renderer.setClearColor( 0x64A0E1 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Modellen laden
  for (var m = 0; m < jsonSet.length; m++){
    modellenLaden(m);
  }

  buildWorld();

  window.addEventListener( 'resize', onWindowResize, false );
}

// Create World
function buildWorld() {
  container.innerHTML = "";
  container.appendChild( renderer.domElement );
}

  // Tween
  function floatingTween() {
    for (i = 0; i < object.length; i++) {
      var tween = new TWEEN.Tween( object[i].position ).to({z: "+400"}, Math.floor((Math.random()*10000)+5000) )
      .yoyo( true )
      .easing( TWEEN.Easing.Cubic.InOut);
      
      var tweenBack = new TWEEN.Tween( object[i].position ).to({z: "-400"}, Math.floor((Math.random()*10000)+5000) )
      .yoyo( true )
      .easing( TWEEN.Easing.Cubic.InOut);
      
      tween.chain(tweenBack);
      tweenBack.chain(tween);
      tween.start();
    }
  }

var loader = [];
var object = [];
  // Collada Models
  function modellenLaden(m) {
    loader[m] = new THREE.ColladaLoader();
    loader[m].load(String('model/' + jsonSet[m].model + '.dae'), function (result) {
      object[m] = result.scene;
      object[m].position.set(jsonSet[m].x, jsonSet[m].z, jsonSet[m].y);
      object[m].scale.set(jsonSet[m].scale, jsonSet[m].scale, jsonSet[m].scale);
      object[m].rotation.set(toDegree(jsonSet[m].rotationX),toDegree(jsonSet[m].rotationY),toDegree(jsonSet[m].rotationZ));
      scene.add(object[m]);
    });
  }

// Radians to degree
function toDegree(degree) {
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

// Box to limit maximum movement
function movementBox() {
  if (camera.position.y < 0) { camera.position.y = 0; }
  if (camera.position.y > 2000) { camera.position.y = 2000; }
  if (camera.position.x < -1000) {camera.position.x = -1000};
  if (camera.position.x > 1000) {camera.position.x = 1000};
  if (camera.position.z < -1000) {camera.position.z = -1000};
  if (camera.position.z > 1000) {camera.position.z = 1000};
}

// Check Nearness
function checkDistance() {

  for (i = 0; i < object.length; i++) {

    if (camera.position.x  > object[i].position.x - 200 && camera.position.x < object[i].position.x  + 200) {
      if (camera.position.y  > object[i].position.y - 200 && camera.position.y < object[i].position.y  + 200) {
        if (camera.position.z  > object[i].position.z - 200 && camera.position.z < object[i].position.z  + 200) {
          object[i].rotation.y += 0.05;
        }
      }
    }

  }

}

// Startup function
function startApp() {
  if (databaseReady) {
    init();
    animate();
    floatingTween();
  }
  else {
    setTimeout(function() { startApp() }, 1000);
  }
}

// Animate
function animate() {
  requestAnimationFrame( animate );
  movementBox();
  checkDistance();
  TWEEN.update();
  render();
}

// Render
function render() {
  controls.update( clock.getDelta() );
  renderer.render( scene, camera );
}

// Start Applicatie
setTimeout(function() { startApp() }, 6000);