function worldAnimation(thisObject) {

  this.nearObjectAnimation = function() {
    if (thisObject.animation && !thisObject.animation.isPlaying){
        thisObject.animation.play();
        if (game) game.collectElement(thisObject);
    }

    if (typeof thisObject.sound.play == 'function') {
      thisObject.sound.play();
    }
  }

  /*this.movementAnimation = function() {
    switch(thisObject.type) {
    case 'wolk1':
      thisObject.position.x += 6;
    break;
    case 'wolk2':
      thisObject.position.x -= 4;
    break;
    case 'wolk3':
      thisObject.position.x += 3;
    break;
    case 'pinguin-jetpack':
      thisObject.position.x -= 3;
      thisObject.position.y += 3;
    break;
    case 'pinguin-scooter':
      thisObject.position.x -= 8;
    break;
    case 'pinguin-rocket':
      thisObject.position.x += 12;
      thisObject.position.y += 12;
    break;
    case 'ijsbeer':
      thisObject.position.x += 4;
    break;
    case 'narwal':
      thisObject.position.x -= 4;
    break;
    case 'meeuw':
      thisObject.position.y += 6;
    break;
    }
  }*/

}