var container, camera, controls, scene, renderer;
var clock = new THREE.Clock();

THREE.DefaultLoadingManager.onProgress = function ( item, loaded, total ) {
  console.log('Loading...');
  if ( loaded == (jsonSet.length+1) ) { 
    console.log('Finished Loading.')
  }
};

function init() {
  container = document.getElementById( 'container' );

  // Scene
  scene = new THREE.Scene();
  // scene.fog = new THREE.FogExp2( 0xA2BED8, 0.00035 );

  // Camera
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 15000 );
  camera.position.set(-2000,-2000,0);

  // Camera offset
  var numberURL = (getUrlVars('view'));
  var viewNumber = (numberURL.view);

  function cameraOffset(number) {
    var w1 = 1432;
    var h1 = 783;
    var w2 = 1432;
    var h2 = 783;
    if (number == 1) {
      camera.setViewOffset( w1 + w2, h1, 0, 0, w1, h1 );
    }
    else if (number == 2) {
      camera.setViewOffset( w1 + w2, h1, w1, 0, w2, h2 );
    }
  }

  if (viewNumber) {
    cameraOffset(viewNumber);
  }

  // Controls
  controls = new THREE.FirstPersonControls( camera );

  // Bounding Box
  var boxLoader = new THREE.ColladaLoader();
  boxLoader.load(String('model/boundingBox/boundingBox.dae'), function (result) {
    boundingBox = result.scene;
    boundingBox.scale.set(800,800,800);
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
      var tween = new TWEEN.Tween( object[i].position ).to({z: "+400"}, Math.floor((Math.random()*10000)+5000) )
      .easing( TWEEN.Easing.Cubic.InOut);
      var tweenBack = new TWEEN.Tween( object[i].position ).to({z: "-400"}, Math.floor((Math.random()*10000)+5000) )
      .easing( TWEEN.Easing.Cubic.InOut);
      tween.chain(tweenBack);
      tweenBack.chain(tween);
      tween.start();
    }
  }

var loader = [];
var object = [];
var objectGeometry = [];
  // Collada Models
  function modellenLaden(m) {
    loader[m] = new THREE.ColladaLoader();
    loader[m].load(String('model/' + jsonSet[m].model + '.dae'), function (result) {
      object[m] = result.scene;

      var objectGeometry = object[m].children[0].geometry;
      objectGeometry.applyMatrix();
      
      //Pivot point
      objectGeometry.push(object[m].children[0].geometry);

      //.applyMatrix(new THREE.Matrix4().makeTranslation (-269, 0, -5));

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
  if (camera.position.y > 8000) { camera.position.y = 8000; }
  if (camera.position.x < -4000) {camera.position.x = -4000};
  if (camera.position.x > 4000) {camera.position.x = 4000};
  if (camera.position.z < -4000) {camera.position.z = -4000};
  if (camera.position.z > 4000) {camera.position.z = 4000};
}

// Check Nearness
function checkDistance() {
  for (i = 0; i < object.length; i++) {
    if (camera.position.x  > object[i].position.x - 400 && camera.position.x < object[i].position.x  + 400) {
      if (camera.position.y  > object[i].position.y - 400 && camera.position.y < object[i].position.y  + 400) {
        if (camera.position.z  > object[i].position.z - 400 && camera.position.z < object[i].position.z  + 400) {
          object[i].rotation.y += 0.01;
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
  if (databaseReady) {
    init();
  }
  else {
    setTimeout(function() {
      loadApp();
    }, 1000);
  }
}
loadApp();

socket.on('startApp', function() {
  startApp();
})

// Start Application
function startApp() {
  animate();
  floatingTween();
}

// Get URL variablen
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}