/* ---------------------------------------- Begint 3JS ---------------------------------------- */

function init() {
  // Scene maken
  var scene = new THREE.Scene(); //Randen Scene instellen

  // Camera maken
  var fov = 100;
  var aspectRatio = window.innerWidth/window.innerHeight;
  var near = 1;
  var far = 10000;
  var camera = new THREE.PerspectiveCamera(fov,aspectRatio,near,far);
  // Startpositie camera instellen
  camera.position.z = 5;

  // Renderer instellen
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Objecten in ruimte
  var geometry = new THREE.SphereGeometry(2,5,5);
  var blauwMaterial = new THREE.MeshBasicMaterial( {color: 0x5CACF2} );
  var roodMaterial = new THREE.MeshBasicMaterial( {color: 0xF20505} );
  var blauwePlaneet = new THREE.Mesh(geometry, blauwMaterial);
  var rodePlaneet = new THREE.Mesh(geometry, roodMaterial);
  scene.add(blauwePlaneet);
  scene.add(rodePlaneet);
  blauwePlaneet.position.set(5,2,-2);

  // Renderfunctie
  var render = function () {
    requestAnimationFrame(render);

    blauwePlaneet.rotation.x += 0.05;
    blauwePlaneet.rotation.y += 0.05;
    rodePlaneet.rotation.x += 0.05;
    rodePlaneet.rotation.y += 0.05;

    renderer.render(scene, camera);
  };

  // Renderen
  render();
}

init();

  // Loggen en debuggen
  console.log(scene);