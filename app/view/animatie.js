function animatie(thisObject,thisAnimatie) {
  this.rotationSpeed = 0.1;
  if (!thisAnimatie){ thisAnimatie = 'turnSide' }
  this.thisAnimatie = thisAnimatie;

  if (this.thisAnimatie == 'turnUp') {
    this.runAnimatie = function() {
      thisObject.rotation.x += 0.1;
    }
  }
  if (this.thisAnimatie == 'turnSide') {
    this.runAnimatie = function() {
      thisObject.rotation.y += 0.1;
    }
  }

}

// pinguinSound = new Audio('sounds/pinguin.mp3');
// pinguinSound.loop = true;