// Variabelen
var worldWidth = 128, worldDepth = 128, worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

var camera, scene, renderer, controls;
var sunShine;
var aarde;

function init() {
  // Initiate camera
  camera = new THREE.PerspectiveCamera( 25, window.innerWidth/window.innerHeight, 1, 20000 );
  camera.position.set(0,0,40);

  // Camera controls
  /*controls = new THREE.FirstPersonControls(camera);
  controls.movementSpeed = 5;
  controls.lookSpeed = 0.05;*/

  // Initiate scene
  scene= new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x80AEFF, 0.002 );

  // Vloer Geometry
  vloerGeo = new THREE.PlaneGeometry( 20000, 200000, worldWidth - 1, worldDepth -1 );
  vloerGeo.applyMatrix(new THREE.Matrix4().makeRotationX( - Math.PI / 2 ));
  vloerGeo.dynamic = true;

  var i, il;
  for ( i = 0, il = vloerGeo.vertices.length; i < il; i ++ ) {
    vloerGeo.vertices[ i ].y = 35 * Math.sin( i/2 );
  }

  vloerGeo.computeFaceNormals();
  vloerGeo.computeVertexNormals()

  // Vloer Texture
  var texture = THREE.ImageUtils.loadTexture( "grass.jpg" );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 5, 5 );
  var vloerMaterial = new THREE.MeshBasicMaterial( { color: 0xA9CC52, map: texture } );

  // Vloer
  vloer = new THREE.Mesh(vloerGeo, vloerMaterial);

  // Geometry's
  var aardeGeo = new THREE.SphereGeometry(3,20,20);

  // Images
  var aardeImg =  THREE.ImageUtils.loadTexture('../../img/earth.jpg');

  // Materials
  var aardeMaterial = new THREE.MeshPhongMaterial( { map: aardeImg } );

  // Meshes
  aarde = new THREE.Mesh(aardeGeo, aardeMaterial);

  // Light
  sunShine = new THREE.HemisphereLight(0xffffff, 0x000000, 1);

  // AddToScene
  scene.add(sunShine);
  scene.add(vloer);
  scene.add(aarde);

  // Create Renderer
  var renderWidth = window.innerWidth;
  var renderHeight = window.innerHeight;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(renderWidth, renderHeight);
  renderer.setClearColor(0x80AEFF, 1);
  document.body.appendChild(renderer.domElement);
}