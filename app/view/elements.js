var wolk1,wolk2,wolk3;
var pinguin1,pinguin2;
var ijsbeer,narwhal;

// Wolken
wolk1Loader = new THREE.ColladaLoader();
wolk1Loader.load('model/wolk1.dae', function(result) {
  wolk1 = result.scene;
});

wolk2Loader = new THREE.ColladaLoader();
wolk2Loader.load('model/wolk2.dae', function(result) {
  wolk2 = result.scene;
});

wolk3Loader = new THREE.ColladaLoader();
wolk3Loader.load('model/wolk3.dae', function(result) {
  wolk3 = result.scene;
});

// Pinguins
pinguin1Loader = new THREE.ColladaLoader();
pinguin1Loader.load('model/pinguin1.dae', function(result) {
  pinguin1 = result.scene;
});

pinguin2Loader = new THREE.ColladaLoader();
pinguin2Loader.load('model/pinguin2.dae', function(result) {
  pinguin2 = result.scene;
});

// IJsbeer
ijsbeerLoader = new THREE.ColladaLoader();
ijsbeerLoader.load('model/ijsbeer.dae', function(result) {
  ijsbeer = result.scene;
});

// Narwhal
narwalLoader = new THREE.ColladaLoader();
narwalLoader.load('model/narwal.dae', function(result) {
  narwal = result.scene;
});