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
  
}