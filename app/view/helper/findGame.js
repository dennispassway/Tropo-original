var game = {

  collectableElements: [
    'ijsbeer',
    'narwal',
    'pinguin-rocket',
    'pinguin-jetpack',
    'pinguin-scooter',
    'meeuw'
  ],
  elementToCollect: 'ijsbeer',
  createElementToCollect: function() {
    number = Math.floor(Math.random() * this.collectableElements.length);
    this.elementToCollect = this.collectableElements[number];
    this.updateInterface();
  },
  collectElement: function(object) {
    if (object.type == this.elementToCollect) {
      this.addScore();
      this.createElementToCollect();
    }
  },

  score: 0,
  addScore: function(points) { 
    this.score = (points && points != 0) ? this.score+points : this.score+1;
    this.updateInterface();
  },

  resetGame: function() {
    this.score = 0;
    this.createElementToCollect();
  },

  init: function() {
    this.resetGame();
    $('#collectables').html('<img src="images/icons/' + this.elementToCollect + '.png" alt="' + this.elementToCollect + '">');
    $('#game').fadeIn(1000);
  },

  updateInterface: function() {
    $('#score').html(this.score);
    $('#collectables').html('<img src="images/icons/' + this.elementToCollect + '.png" alt="' + this.elementToCollect + '">');
  }

};