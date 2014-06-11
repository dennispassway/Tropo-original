// =================================== TROPO NOORDPOOL =================================== //
var wolk1,wolk2,wolk3, pinguin1,pinguin2,pinguin3,ijsbeer,narwal,meeuw;

wolk1Loader = new THREE.JSONLoader();
wolk2Loader = new THREE.JSONLoader();
wolk3Loader = new THREE.JSONLoader();
pinguin1Loader = new THREE.JSONLoader();
pinguin2Loader = new THREE.JSONLoader();
pinguin3Loader = new THREE.JSONLoader();
ijsbeerLoader = new THREE.JSONLoader();
narwalLoader = new THREE.JSONLoader();
meeuwLoader = new THREE.JSONLoader();

wolk1Loader.load('model/wolk-1.js', function (geometry,materials) { 
    wolk1 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
});

wolk2Loader.load('model/wolk-2.js', function (geometry,materials) { 
    wolk2 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
});

wolk3Loader.load('model/wolk-3.js', function (geometry,materials) { 
    wolk3 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
});

pinguin1Loader.load('model/pinguin-1-jetpack.js', function (geometry,materials) { 
    pinguin1 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = pinguin1.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(pinguin1.geometry.animations[0]);
});

pinguin2Loader.load('model/pinguin-2-scooter.js', function (geometry,materials) { 
    pinguin2 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = pinguin2.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(pinguin2.geometry.animations[0]);
});

pinguin3Loader.load('model/pinguin-3-rocket.js', function (geometry,materials) { 
    pinguin3 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = pinguin3.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(pinguin3.geometry.animations[0]);
});

ijsbeerLoader.load('model/ijsbeer.js', function (geometry,materials) { 
    ijsbeer = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = ijsbeer.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(ijsbeer.geometry.animations[0]);
});

narwalLoader.load('model/narwal.js', function (geometry,materials) { 
    narwal = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = narwal.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(narwal.geometry.animations[0]);
});

meeuwLoader.load('model/meeuw.js', function (geometry,materials) { 
    meeuw = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = meeuw.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(meeuw.geometry.animations[0]);
});

// =================================== TROPO NIJNTJE =================================== //
var nijntjeBal, nijntjeBeer, nijntjeMaan, nijntjeNijntje, nijntjeOlifant, nijntjeVogel, nijntjeZon, nijntjeWolk1, nijntjeWolk2, nijntjeWolk3;

nijntjeBalLoader = new THREE.JSONLoader();
nijntjeBeerLoader = new THREE.JSONLoader();
nijntjeMaanLoader = new THREE.JSONLoader();
nijntjeNijntjeLoader = new THREE.JSONLoader();
nijntjeOlifantLoader = new THREE.JSONLoader();
nijntjeVogelLoader = new THREE.JSONLoader();
nijntjeZonLoader = new THREE.JSONLoader();
nijntjeWolk1Loader = new THREE.JSONLoader();
nijntjeWolk2Loader = new THREE.JSONLoader();
nijntjeWolk3Loader = new THREE.JSONLoader();

nijntjeBalLoader.load('model/nijntje/nijntjeBal.js', function (geometry, materials) {
    nijntjeBal = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeBal.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeBal.geometry.animations[0]);
});

nijntjeBeerLoader.load('model/nijntje/nijntjeBeer.js', function (geometry, materials) {
    nijntjeBeer = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeBeer.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeBeer.geometry.animations[0]);
});

nijntjeMaanLoader.load('model/nijntje/nijntjeMaan.js', function (geometry, materials) {
    nijntjeMaan = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeMaan.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeMaan.geometry.animations[0]);
});

nijntjeNijntjeLoader.load('model/nijntje/nijntjeNijntje.js', function (geometry, materials) {
    nijntjeNijntje = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeNijntje.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeNijntje.geometry.animations[0]);
});

nijntjeOlifantLoader.load('model/nijntje/nijntjeOlifant.js', function (geometry, materials) {
    nijntjeOlifant = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeOlifant.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeOlifant.geometry.animations[0]);
});

nijntjeVogelLoader.load('model/nijntje/nijntjeVogel.js', function (geometry, materials) {
    nijntjeVogel = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeVogel.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeVogel.geometry.animations[0]);
});

nijntjeZonLoader.load('model/nijntje/nijntjeZon.js', function (geometry, materials) {
    nijntjeZon = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeZon.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeZon.geometry.animations[0]);
});

nijntjeWolk1Loader.load('model/nijntje/nijntjeWolk.js', function (geometry, materials) {
    nijntjeWolk1 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeWolk1.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeWolk1.geometry.animations[0]);
});

nijntjeWolk2Loader.load('model/nijntje/nijntjeWolk2.js', function (geometry, materials) {
    nijntjeWolk2 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeWolk2.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeWolk2.geometry.animations[0]);
});

nijntjeWolk3Loader.load('model/nijntje/nijntjeWolk3.js', function (geometry, materials) {
    nijntjeWolk3 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = nijntjeWolk3.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(nijntjeWolk3.geometry.animations[0]);
});