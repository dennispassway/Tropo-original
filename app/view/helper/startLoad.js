// Load Application
function loadApp() {
  if (databaseReady) { init(); }
  else { setTimeout(function() { loadApp(); }, 1000); }
}
loadApp();

// Start Application
socket.on('startApp', function() {
  startApp();
});

function startApp() {
  animate();
  floatingTween();
  opstijgenLandenCheck();
  backgroundMusic.play();
}