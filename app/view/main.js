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
  function tweenin() {
    for (i = 0; i < object.length; i++) {

      var originelePositie = object[i].position;
      var tween = new TWEEN.Tween( object[i].position ).to( {
      x: Math.floor(Math.random() * 1000) + -1000,
      y: Math.floor(Math.random() * 2000) + 0,
      z: Math.floor(Math.random() * 1000) + -1000
      }, 20000 )
      .easing( TWEEN.Easing.Linear.None);
      var tween2 = new TWEEN.Tween( object[i].position ).to( {
      x: Math.floor(Math.random() * 1000) + -1000,
      y: Math.floor(Math.random() * 2000) + 0,
      z: Math.floor(Math.random() * 1000) + -1000
      }, 20000 )
      .easing( TWEEN.Easing.Linear.None);
      var tween3 = new TWEEN.Tween( object[i].position ).to( {
      x: Math.floor(Math.random() * 1000) + -1000,
      y: Math.floor(Math.random() * 2000) + 0,
      z: Math.floor(Math.random() * 1000) + -1000
      }, 20000 )
      .easing( TWEEN.Easing.Linear.None);

      tween.chain(tween2);
      tween2.chain(tween3);
      tween3.chain(tween)

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

// Animate
function animate() {
  requestAnimationFrame( animate );
  movementBox();
  TWEEN.update();
  render();
}

// Render
function render() {
  controls.update( clock.getDelta() );
  renderer.render( scene, camera );
}