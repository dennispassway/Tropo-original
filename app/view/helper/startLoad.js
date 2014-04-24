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

  setTimeout(function(){
    $('.startScreen').fadeTo(2000,0)
  },3000);
  
  animate();
  opstijgenLandenCheck();
  backgroundMusic.play();
}