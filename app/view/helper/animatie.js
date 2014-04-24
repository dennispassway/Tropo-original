function animatie(thisObject) {
  this.rotationSpeed = 0.1;
  this.objectType = thisObject.type;

  // Sounds
  pinguinSound = new Audio('sounds/pinguin.mp3');
  ijsbeerSound = new Audio('sounds/ijsbeer.mp3');

  //No Type
  if (this.objectType != 'ijsbeer') {
    this.nearObjectAnimation = function() {
      console.log('no animation for this object');
    }
  }

  //Ijsbeer op wolk
  if (this.objectType == 'ijsbeer') {
    this.nearObjectAnimation = function() {
      ijsbeerSound.play();
    }
  }

}