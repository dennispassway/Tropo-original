var container, camera, controls, scene, renderer;
var clock = new THREE.Clock();

// Init en animate worden gerunt wanneer database klaar is.

function init() {
  container = document.getElementById( 'container' );

  // Camera
  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set(-500,500,0);

  // Controls
  controls = new THREE.FirstPersonControls( camera );
  controls.movementSpeed = 350;
  controls.lookSpeed = 0.1;

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x64A0E1, 0.001 );

  // Sunlight
  var ambient = new THREE.AmbientLight( 0x333333 );
  scene.add(ambient);
  var zon = new THREE.DirectionalLight(0xffffff, 1);
  zon.position.set(0,200,0);
  scene.add(zon);

  // Vloer
  var vloerGeometry = new THREE.PlaneGeometry( 7000, 7000); // Canvas van 1000x1000, langer gemaakt voor oneindigheid!
  vloerGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
  var vloerBump = THREE.ImageUtils.loadTexture('img/bumpmap.jpg');
  var vloerBumpScale = 5;
  var vloerMaterial = new THREE.MeshPhongMaterial( {color: 0xDEDEDE, bumpMap: vloerBump, bumpScale: vloerBumpScale} );
  vloer = new THREE.Mesh( vloerGeometry, vloerMaterial );
  vloer.position.set(0,-50,0);
  scene.add( vloer );

  // Renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor( 0x64A0E1 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Create World
  container.innerHTML = "";
  container.appendChild( renderer.domElement );

  // Modellen laden
  for (var m = 0; m < jsonSet.length; m++){
    modellenLaden(m);
  }

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

// Animate
function animate() {
  requestAnimationFrame( animate );
  render();
}

// Render
function render() {
  controls.update( clock.getDelta() );
  renderer.render( scene, camera );
}