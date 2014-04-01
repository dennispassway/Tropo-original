/*--- Main ---*/
// Global Variables
var container, scene, camera, renderer;

// Other Variables
var aarde;

// Initialize and animate
init();
animate();

/*--- Functions ---*/
// Initialize
function init() {
  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 0.1, 20000 );
  camera.position.set(0,400,500);
  camera.lookAt(scene.position);

  // Renderer
  renderer = new THREE.WebGLRenderer( {antialisas: true} );
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setClearColor(0xffffff, 1);
  container = document.getElementById('threeJS');
  container.appendChild(renderer.domElement);

  // Helpers
  var axes = new THREE.AxisHelper(50);
  scene.add(axes);
  var gridHelper = new THREE.GridHelper( 25, 10);
  gridHelper.position = new THREE.Vector3( 0, 0, 0 );
  gridHelper.rotation = new THREE.Euler( 0, 0, 0 );
  scene.add( gridHelper );

  // Light
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,250,0);
  scene.add(light);
  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  // Sky
  scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );

  // Vloer
  function createFloor(kleur,posX,posZ) {
    var floor;
    var floorGeometry = new THREE.PlaneGeometry( 50, 50, 1, 1 );
    var floorMaterial = new THREE.MeshBasicMaterial( {color: kleur, side:THREE.DoubleSide} );
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.x = posX;
    floor.position.y = -0.5;
    floor.position.z = posZ;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
  }

  // Grid Maken
  var aantalRijen = 3;
  var aantalKolommen = 3;
  for (var i = 0; i < aantalRijen; i++) {
    for (var a = 0; a < aantalKolommen; a++) {
      createFloor(0xff0000,a*51,i*51);
    }
  }
}



// Animate
function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

// Update
function update() {
  
}

// Render
function render() {
  renderer.render(scene, camera);
}