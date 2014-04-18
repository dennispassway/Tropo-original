var container, camera, controls, scene, renderer;
var clock = new THREE.Clock();

THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
  // console.log(loaded + "/" + total + ". Total lengte is: " + jsonSet.length);
  if ( loaded == (jsonSet.length+1) ) { 
    console.log('Finished Loading.')
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
  renderer.setClearColor( 0x64A0E1 );
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

  buildWorld();
  initKinect();

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
    var tween = new TWEEN.Tween( object[i].position ).to({z: "+" + floatingTweenAfstand}, jsonSet[i].beweegSnelheid)
    .easing( TWEEN.Easing.Cubic.InOut);
    var tweenBack = new TWEEN.Tween( object[i].position ).to({z: "-" + floatingTweenAfstand}, jsonSet[i].beweegSnelheid)
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
    object[m].rotation.set(toRadian(jsonSet[m].rotationX),toRadian(jsonSet[m].rotationY),toRadian(jsonSet[m].rotationZ));
    scene.add(object[m]);
  });
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

// Box to limit maximum movement
function movementBox() {
  if (camera.position.y < 0) { camera.position.y = 0; }
  if (camera.position.y > 5000) { camera.position.y = 5000; }
  if (camera.position.x < -4000) {camera.position.x = -4000};
  if (camera.position.x > 4000) {camera.position.x = 4000};
  if (camera.position.z < -4000) {camera.position.z = -4000};
  if (camera.position.z > 4000) {camera.position.z = 4000};
}

// Check Nearness
function checkDistance() {
  for (i = 0; i < object.length; i++) {
    if (camera.position.x  > object[i].position.x - afstandAnimatie && camera.position.x < object[i].position.x  + afstandAnimatie) {
      if (camera.position.y  > object[i].position.y - afstandAnimatie && camera.position.y < object[i].position.y  + afstandAnimatie) {
        if (camera.position.z  > object[i].position.z - afstandAnimatie && camera.position.z < object[i].position.z  + afstandAnimatie) {
          object[i].rotation.y += rotatieSnelheidAnimatie;
        }
      }
    }
  }
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

// Load Application
function loadApp() {
  if (databaseReady) { init(); }
  else { setTimeout(function() { loadApp(); }, 1000); }
}
loadApp();

// Start Application
socket.on('startApp', function() {
  startApp();
});

function startApp() {
  animate();
  floatingTween();
  opstijgenLandenCheck();
  backgroundMusic.play();
}

// Get URL variablen
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
  });
  return vars;
}

// Opstijgen en landen
function opstijgenLandenCheck() {
  var vliegend = false;
  var secondenBeweegs = 0;
  var secondenStil = 0;

  setInterval(function() {
    if (controllerMoves == true && vliegend == false ) {
      secondenBeweegs++;
      if (secondenBeweegs > 1) {
        if (controllerMoves == true && vliegend == false ) {
          opstijgen();
          secondenBeweegs = 0;
          vliegend = true;
        }
      }
    }
    if (controllerMoves == true && vliegend == true ) {
      secondenStil = 0;
    }
    if(controllerMoves == false && vliegend == true) {
      secondenStil++;
      if (secondenStil > 5) {
        if (controllerMoves == false && vliegend == true) {
          landen();
          secondenStil = 0;
          vliegend = false;
          }
      }
    }
    // Debuglines
    // console.log('vlieg: ' + vliegend);
    // console.log('moves: ' + controllerMoves);
    // console.log('seconden beweegs: ' + secondenBeweegs);
    // console.log('seconden stil: ' + secondenStil);
  }, 1000);
}

function opstijgen() {
  var intervaller = setInterval(function() {
    if (scene.fog.density > vliegWaarde){ scene.fog.density -= densityStijging; }
    else { clearInterval(intervaller); }
  }, 100);
}

function landen() {
  var intervaller = setInterval(function() {
    if (scene.fog.density < landWaarde){ scene.fog.density += densityStijging; }
    else { clearInterval(intervaller); }
  }, 100);
}

// Geluid
var backgroundMusic = new Audio('sounds/backgroundMusic.mp3');
backgroundMusic.loop = true;