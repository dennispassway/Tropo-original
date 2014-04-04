var container, camera, controls, scene, renderer;
var clock = new THREE.Clock();

// Init en animate worden gerunt wanneer database klaar is.

function init() {
  container = document.getElementById( 'container' );

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x64A0E1, 0.0004 );

  // Camera
  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(-1000,1000,0);

  // Controls
  controls = new THREE.FirstPersonControls( camera );

  // Sunlight
  var ambient = new THREE.AmbientLight( 0x333333 );
  scene.add(ambient);
  var zon = new THREE.DirectionalLight(0xffffff, 1);
  zon.position.set(0,200,0);
  scene.add(zon);

  // Bounding Box
  var cubeGroote = 8000;
  var worldBoxGeometry = new THREE.CubeGeometry(cubeGroote,cubeGroote,cubeGroote);
  var worldBoxTexture = new THREE.ImageUtils.loadTexture('img/sky-gay.jpg');
  var worldBoxMaterial = new THREE.MeshBasicMaterial( { side:THREE.BackSide, map: worldBoxTexture} );
  var worldBox = new THREE.Mesh(worldBoxGeometry, worldBoxMaterial);
  scene.add(worldBox);

  // Vloer
  var vloerGeometry = new THREE.PlaneGeometry(cubeGroote, cubeGroote);
  vloerGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
  var vloerBump = THREE.ImageUtils.loadTexture('img/bumpmap.jpg');
  var vloerBumpScale = 5;
  var vloerMaterial = new THREE.MeshPhongMaterial( {color: 0xDEDEDE, bumpMap: vloerBump, bumpScale: vloerBumpScale} );
  vloer = new THREE.Mesh( vloerGeometry, vloerMaterial );
  vloer.position.set(0,-50,0);
  scene.add( vloer );

  // Renderer
  renderer = new THREE.WebGLRenderer( {antialias : true});
  renderer.setClearColor( 0x64A0E1 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Modellen laden
  for (var m = 0; m < jsonSet.length; m++){
    modellenLaden(m);
  }

  // Create World
  container.innerHTML = "";
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
}

var loader = [];
  // Collada Models
  function modellenLaden(m) {
    loader[m] = new THREE.ColladaLoader();
    loader[m].load(String('model/' + jsonSet[m].model + '.dae'), function (result) {
      object = result.scene;
      object.position.set(jsonSet[m].x, jsonSet[m].z, jsonSet[m].y);
      object.scale.set(jsonSet[m].scale, jsonSet[m].scale, jsonSet[m].scale);

      // Fuck het licht
      object.children[0].material.emissive.r = 1;
      object.children[0].material.emissive.g = 1;
      object.children[0].material.emissive.b = 1;
      // Einde fuck het licht

      scene.add(object);
    });
  }

// Window resize functie
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  controls.handleResize();
}

// Movement Box
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

  // Movement Box
  movementBox();

  render();
}

// Render
function render() {
  controls.update( clock.getDelta() );
  renderer.render( scene, camera );
}

// Sounds
// playSound();
function playSound() {
  var backgroundMusic = new Audio('sounds/soundWithBeat.mp3');
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.5;
  backgroundMusic.play();
}