function animatie(thisObject) {
  this.rotationSpeed = 0.1;
  this.objectType = thisObject.type;

  // Sounds
  pinguinSound = new Audio('sounds/pinguin.mp3');
  ijsbeerSound = new Audio('sounds/ijsbeer.mp3');

  //No Type
  if (this.objectType != 'ijsbeer') {
    this.nearObjectAnimation = function() {
      wiebelen(thisObject);
    }
  }

  //Ijsbeer op wolk
  if (this.objectType == 'ijsbeer') {
    this.nearObjectAnimation = function() {
      ijsbeerSound.play();
    }
  }

}

function wiebelen(thisObject) {
  if (thisObject.rotation.y < toRadian(135) ) {
    thisObject.rotation.y += 0.1;
  }
  if (thisObject.rotation.y > toRadian(45) ) {
    thisObject.rotation.y -= 0.1;
  }
}