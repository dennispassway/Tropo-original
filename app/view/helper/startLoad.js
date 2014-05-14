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

  // Reset knop
  socket.on('stopApp', function () {
    location.reload();
  });

function startApp() {

  setTimeout(function(){
    $('.logoScreen').fadeOut(2000);
    landen();
  },500);

  // Create Game
  if (!viewNumber || viewNumber == 1) game.init();

  animate();
  opstijgenLandenCheck();
  backgroundMusic.play();
}