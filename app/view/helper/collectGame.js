var game = {

  collectedElements: {
    'ijsbeer': false,
    'narwal': false,
    'pinguin-rocket': false,
    'pinguin-jetpack': false,
    'pinguin-scooter': false,
    'meeuw': false
  },
  collectElement: function(object) {
    if (!this.collectedElements[object.type]) {
      this.collectedElements[object.type] = true;
      this.addScore();
    }
  },

  score: 0,
  addScore: function(points) { 
    this.score = (points && points != 0) ? this.score+points : this.score+1;
    this.updateInterface();
  },

  resetGame: function() {
    for (prop in this.collectedElements) { this.collectedElements[prop] = false }
    this.score = 0;
    this.updateInterface();
  },

  init: function() {
    this.resetGame();
    for (prop in this.collectedElements) {
      $('#collectables').append('<img src="images/icons/' + prop + '.png" alt="' + prop + '">');
    }
    $('#game').fadeIn(1000);
  },

  updateInterface: function() {
    for (prop in this.collectedElements) {
      if (this.collectedElements[prop] == true) {
        $('img[alt="' + prop + '"]').fadeTo(200,1);
      } else {
        $('img[alt="' + prop + '"]').fadeTo(200,0.2);
      }
    }
  }

};