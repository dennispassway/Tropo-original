function animatie(thisObject,thisAnimatie) {
  this.rotationSpeed = 0.1;
  if (!thisAnimatie){ thisAnimatie = 'turnUp' }
  this.thisAnimatie = thisAnimatie;

  // Sounds
  pinguinSound = new Audio('sounds/pinguin.mp3');

  if (this.thisAnimatie == 'turnUp') {
    this.runAnimatie = function() {
      thisObject.rotation.x += 0.1;
      // pinguinSound.play();
    }
  }
  if (this.thisAnimatie == 'turnSide') {
    this.runAnimatie = function() {
      thisObject.rotation.y += 0.1;
    }
  }

}