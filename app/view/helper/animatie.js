function worldAnimation(thisObject) {
  this.objectType = thisObject.type

  this.nearObjectAnimation = function() {
    if (thisObject.animation){
      if (!thisObject.animation.isPlaying) {
        thisObject.animation.play();
        thisObject.sound.play();  
      }
    }
  }

}