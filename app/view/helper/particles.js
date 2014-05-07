var particleCount, particleSystem, pCount;

function addParticles() {
  // create the particle variables
  particleCount = 10000,
  particles = new THREE.Geometry(),
  pMaterial = new THREE.ParticleBasicMaterial({
    color: 0xffffff,
    size: 20
  });

  // now create the individual particles
  for (var p = 0; p < particleCount; p++) {
    var pX = (Math.random()*18000) - 9000;
    var pY = (Math.random()*18000) - 9000;
    var pZ = (Math.random()*18000) - 9000;
    particle = new THREE.Vector3(pX, pY, pZ);
    // create a velocity vector
    particle.velocity = new THREE.Vector3(0,-Math.random(),0);
    // add it to the geometry
    particles.vertices.push(particle);
  }
  
  // create the particle system
  particleSystem = new THREE.ParticleSystem(particles, pMaterial);

  scene.add(particleSystem);
}

function updateParticles() {
  particleSystem.rotation.x += 0.004;
  particleSystem.rotation.y += 0.002;
  particleSystem.rotation.z += 0.001;
}