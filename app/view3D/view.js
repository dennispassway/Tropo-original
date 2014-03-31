var updateDelay = 100;

/* ---------------------------------------- Socket Gebeuren---------------------------------------- */

// Connect Socket
var socketRhino = 'http://192.168.124.82:3000';
var socketHome = 'http://192.168.0.102:3000';
var socketHoog = 'http://192.168.1.139:3000';
var socket = io.connect(socketRhino);

// Variabelen
var controller = [0,0,0,0,0,0];

// Socketdata ophalen
socket.on('controllerData', function (data) {
  controller = data;
});

/* ---------------------------------------- Begint 3JS ---------------------------------------- */

// Scene en camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

// Renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bal toevoegen
var geometry = new THREE.SphereGeometry(2);
var material = new THREE.MeshBasicMaterial({color: 0xA9CC52});
var planet = new THREE.Mesh(geometry, material);
scene.add(planet);

camera.position.x = 5; // gamma -5 - 5
camera.position.y = 5; // beta -5 - 5
camera.position.z = 20; // 0 - 20

// Camera vliegen met socket
setInterval(function(){
  // console.log(controller);
  // camera.position.x = controller[2]/9;
  // camera.position.y = controller[0]/18;
  // camera.position.z = controller[1];
}, updateDelay);

// Renderfunctie
var render = function () {
  requestAnimationFrame(render);

  planet.rotation.y += 0.05;
  planet.rotation.x += 0.01;

  renderer.render(scene, camera);
};

// Renderen
render();