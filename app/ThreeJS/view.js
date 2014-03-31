// Create Renderer
var renderWidth = window.innerWidth;
var renderHeight = window.innerHeight;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(renderWidth, renderHeight);
document.body.appendChild(renderer.domElement);

// Initiate scene
var scene= new THREE.Scene();

// Initiate camera
var fov = 100;
var ratio = window.innerWidth/window.innerHeight;
var near = 0.1;
var far = 1000;
var camera = new THREE.PerspectiveCamera( fov, ratio, near, far );
camera.position.z = 10;

// Light
var sunShine = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(sunShine);

// Geometry's
var aardeGeo = new THREE.SphereGeometry(3,20,20);
var maanGeo = new THREE.SphereGeometry(1,20,20);

// Images
var aardeImg =  THREE.ImageUtils.loadTexture('../img/earth.jpg');

// Materials
var aardeMaterial = new THREE.MeshPhongMaterial( { map: aardeImg } );
var maanMaterial = new THREE.MeshPhongMaterial( {color: 0x999999} );

// Meshes
var aarde = new THREE.Mesh(aardeGeo, aardeMaterial);
var maan = new THREE.Mesh(maanGeo, maanMaterial);

// AddToScene
scene.add(aarde);
scene.add(maan);

maan.position.set(5,0,4);

// Render
var render = function() {
  requestAnimationFrame(render);

  aarde.rotation.x += (1/60);
  aarde.rotation.y -= (1/90);
  maan.rotation.y += (1/90);

  renderer.render(scene,camera);
}

render();