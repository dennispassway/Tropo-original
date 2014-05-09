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
    $('.logoScreen').fadeOut(2000);
    landen();
  },500);

  // Create Game
  game.init();

  animate();
  opstijgenLandenCheck();
  backgroundMusic.play();
}