/*--- Main ---*/
// Global Variables
var container, scene, camera, renderer;

// Other Variables
var tiles = [];

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

  // Maak standaard vloer
  makeTiles(3,3);
}

/*---- Vloer ----*/
// Maak tiles
function makeTiles(rows,cols) {
  // Leegmaken
  if (tiles) {
    for (var b = 0; b < tiles.length; b++) {
      scene.remove(tiles[b]);
    }
  }
  tiles = [];

  var aantalRijen = rows;
  var aantalKolommen = cols;
  for (var i = 0; i < aantalRijen; i++) {
    for (var a = 0; a < aantalKolommen; a++) {
      createTile(0xff0000,a*51,i*51);
    }
  }

  for (var b = 0; b < tiles.length; b++) {
    scene.add(tiles[b]);
  }
}

// Maak tile
function createTile(kleur,posX,posZ) {
  var tile;
  var tileGeometry = new THREE.PlaneGeometry( 50, 50, 1, 1 );
  var tileMaterial = new THREE.MeshBasicMaterial( {color: kleur, side:THREE.DoubleSide} );
  tile = new THREE.Mesh(tileGeometry, tileMaterial);
  tile.position.x = posX;
  tile.position.y = -0.5;
  tile.position.z = posZ;
  tile.rotation.x = Math.PI / 2;
  tiles.push(tile);
}

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Animaties
  document.addEventListener("keydown", drukOpKnop, false);
  function drukOpKnop(e) {
  var keyCode = e.keyCode;
    if(keyCode == 32) {
      makeTiles(2,2);
    }
  }

  render();
  update();
}

// Render
function render() {
  renderer.render(scene, camera);
}

// Update
function update() {
  
}