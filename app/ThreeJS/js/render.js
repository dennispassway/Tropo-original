// Render
function render() {

  // controls.update(0.1);
  aarde.rotation.y += 0.01;

  renderer.render(scene,camera);
}

// Animate
function animate() {
  requestAnimationFrame(animate);
  render();
}