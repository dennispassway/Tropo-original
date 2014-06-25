var buttons = [0, 0, 0];
socket.on('buttons', function(data) {
  buttons = data;
});

getButtonsInterval = 100;

setInterval(function() {
  if (scene) buttonPressed(buttons);
}, getButtonsInterval);

var varkenSound = new Audio('sounds/platform/varken.mp3');
var schaapSound = new Audio('sounds/platform/schaap.mp3');
var koeSound = new Audio('sounds/platform/koe.mp3');

var varkensAnimatie = false;
var schaapAnimatie = false;
var koeAnimatie = false;

function buttonPressed(buttons){
  if (buttons[0] && !varkensAnimatie) {
    buttonPressedAnimation( $('.varken img') );
    varkenSound.play();
  }
  if (buttons[1] && !schaapAnimatie) {
    buttonPressedAnimation( $('.schaap img') );
    schaapSound.play();
  }
  if (buttons[2]  && !koeAnimatie) {
    buttonPressedAnimation( $('.koe img') );
    koeSound.play();
  }
}

function buttonPressedAnimation(object) {
  if (object.selector == ".varken img") varkensAnimatie = true;
  if (object.selector == ".schaap img") schaapAnimatie = true;
  if (object.selector == ".koe img") koeAnimatie = true;
  object.animate({
    bottom: '+=200',
    height: '30%'
  }, 1000, function() {
    object.animate({
      bottom: '-=200',
      height: '100px'
    }, 1000, function() {
      if (object.selector == ".varken img") varkensAnimatie = false;
      if (object.selector == ".schaap img") schaapAnimatie = false;
      if (object.selector == ".koe img") koeAnimatie = false;
    });
  });
}