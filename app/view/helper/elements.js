var wolk1,wolk2,wolk3, pinguin1,pinguin2,pinguin3,ijsbeer,narwal,meeuw;

// Wolk1
wolk1Loader = new THREE.JSONLoader();
wolk1Loader.load('model/wolk-1.js', function (geometry,materials) { 
    wolk1 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
});

// Wolk2
wolk2Loader = new THREE.JSONLoader();
wolk2Loader.load('model/wolk-2.js', function (geometry,materials) { 
    wolk2 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
});

// Wolk3
wolk3Loader = new THREE.JSONLoader();
wolk3Loader.load('model/wolk-3.js', function (geometry,materials) { 
    wolk3 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
});

// Pinguin1
pinguin1Loader = new THREE.JSONLoader();
pinguin1Loader.load('model/pinguin-1-jetpack.js', function (geometry,materials) { 
    pinguin1 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = pinguin1.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(pinguin1.geometry.animations[0]);
});

// Pinguin2
pinguin2Loader = new THREE.JSONLoader();
pinguin2Loader.load('model/pinguin-2-scooter.js', function (geometry,materials) { 
    pinguin2 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = pinguin2.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(pinguin2.geometry.animations[0]);
});

// // Pinguin3
pinguin3Loader = new THREE.JSONLoader();
pinguin3Loader.load('model/pinguin-3-rocket.js', function (geometry,materials) { 
    pinguin3 = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = pinguin3.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(pinguin3.geometry.animations[0]);
});

// IJsbeer
ijsbeerLoader = new THREE.JSONLoader();
ijsbeerLoader.load('model/ijsbeer.js', function (geometry,materials) { 
    ijsbeer = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = ijsbeer.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(ijsbeer.geometry.animations[0]);
});

// Narwal
narwalLoader = new THREE.JSONLoader();
narwalLoader.load('model/narwal.js', function (geometry,materials) { 
    narwal = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = narwal.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(narwal.geometry.animations[0]);
});

// Meeuw
meeuwLoader = new THREE.JSONLoader();
meeuwLoader.load('model/meeuw.js', function (geometry,materials) { 
    meeuw = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = meeuw.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(meeuw.geometry.animations[0]);
});