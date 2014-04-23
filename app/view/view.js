var container, camera, controls, scene, renderer;
var clock = new THREE.Clock();

THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
  // console.log(loaded + "/" + total + ". Total lengte is: " + jsonSet.length);
  if ( loaded == 8 ) { 
    console.log('Finished Loading.');
    // Create world
    container.innerHTML = "";
    container.appendChild( renderer.domElement );
  }
};

function init() {
  container = document.getElementById( 'container' );

  // Scene
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xA2BED8, startFogAfstand );

  // Camera
  camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
  camera.position.set(-1000,0,0);

  // Camera offset
  var numberURL = (getUrlVars('view'));
  var viewNumber = (numberURL.view);
  if (viewNumber) {
    cameraOffset(viewNumber);
  }
  function cameraOffset(number) {
    if (number == 1) {
      camera.setViewOffset( widthScreen1 + widthScreen2, heightScreen1, 0, 0, widthScreen1, heightScreen1 );
    }
    else if (number == 2) {
      camera.setViewOffset( widthScreen1 + widthScreen2, heightScreen1, widthScreen1, 0, widthScreen2, heightScreen2 );
    }
  }

  // Controls
  controls = new THREE.FirstPersonControls( camera );

  // Renderer
  renderer = new THREE.WebGLRenderer( {antialias : true});
  renderer.setClearColor( 0xA2BED8 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Bounding Box
  var boxLoader = new THREE.ColladaLoader();
  boxLoader.load(String('model/boundingBox/boundingBox.dae'), function (result) {
    boundingBox = result.scene;
    boundingBox.scale.set(boundingBoxScale,boundingBoxScale,boundingBoxScale);
    boundingBox.rotation.set(toRadian(-90),toRadian(0),toRadian(0));
    scene.add(boundingBox);
  });

  // Modellen laden
  for (var m = 0; m < jsonSet.length; m++){
    modellenLaden(m);
  }

  initKinect();

  window.addEventListener( 'resize', onWindowResize, false );
}

// Animate
function animate() {
  requestAnimationFrame( animate );
  movementBox();
  checkDistance();
  TWEEN.update();
  processingVerwerks();
  render();
}

// Render
function render() {
  controls.update( clock.getDelta() );
  renderer.render( scene, camera );
} 