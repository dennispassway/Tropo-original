var scene,camera,renderer;
var ijsbeer;
var ijsberen = [];

// Loader
ijsbeerLoader = new THREE.JSONLoader();
ijsbeerLoader.load('model/ijsbeer.js', function (geometry,materials) { 
    ijsbeer = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials)); 
    var materials = ijsbeer.material.materials;
    for (var i = 0,length = materials.length; i < length; i++) { var mat = materials[i]; mat.skinning = true; }
    THREE.AnimationHandler.add(ijsbeer.geometry.animations[0]);
});

// Builder
function createIJsbeer(i){
    ijsberen[i] = ijsbeer.clone();
    ijsberen[i].name = 'ijsbeer';
    ijsberen[i].type = 'ijsbeer';
    ijsberen[i].position.set(0,0,0);
    ijsberen[i].scale.set(1,1,1);
    ijsberen[i].rotation.set(0,0,0);
    ijsberen[i].animation = new THREE.Animation(ijsberen[i], "ijsbeeranimation", THREE.AnimationHandler.CATMULLROM);
    scene.add(ijsberen[i]);
}

// Init
function init() {
    // Scene
    scene = new THREE.Scene();
    // Camera
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth/window.innerHeight, 1, 20000 );
    camera.position.set(0,300,0);
    camera.rotation.set(-1,0,0);
    // Controls
    controls = new THREE.FirstPersonControls( camera );
    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xff0000);
    // Appenden
    container = document.getElementById('container');
    container.innerHTML="";
    container.appendChild(renderer.domElement);
    animate();
}

// Startbutton
function startApp() {
    init();
    createIJsbeer(0);
}

// Animate
function animate() {
    requestAnimationFrame( animate );
    for (a = 0; a<ijsberen.length; a++) { ijsberen[a].animation.update(0.01); }
    render();
}

// Render
function render() {
    controls.update( 0.01 );
    renderer.render(scene,camera);
}