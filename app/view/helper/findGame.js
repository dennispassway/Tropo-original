if (!viewNumber || viewNumber == 1) {

  noordpoolElements = [ 'ijsbeer', 'narwal', 'pinguin-rocket', 'pinguin-jetpack', 'pinguin-scooter', 'meeuw'];
  nijntjeElements = ['nijntjeBal', 'nijntjeBeer', 'nijntjeMaan', 'nijntjeNijntje', 'nijntjeOlifant', 'nijntjeVogel', 'nijntjeZon'];
  usedElements = noordpoolElements;
  if (!worldNumber || worldNumber == 1) usedElements = noordpoolElements;
  if (!worldNumber || worldNumber == 2) usedElements = nijntjeElements;

  var game = {
    collectableElements: usedElements,
    elementToCollect: 'ijsbeer',
    createElementToCollect: function() {
      number = Math.floor(Math.random() * this.collectableElements.length);
      if (this.collectableElements[number] != this.elementToCollect) {
        this.elementToCollect = this.collectableElements[number];
      } else {
        this.createElementToCollect();
      }
      if(this.score != 0) this.updateInterface();
    },
    collectElement: function(object) {
      if (object.type == this.elementToCollect && this.gameLoaded) {
        this.addScore();
        collectSound.play();
        this.createElementToCollect();
      }
    },

    score: 0,
    totalScore: 10,
    addScore: function(points) { 
      this.score = (points && points != 0) ? this.score+points : this.score+1;

      if (this.score == this.totalScore) {
        this.animations.gameCompleted();
      }
    },

    resetGame: function() {
      this.score = 0;
      this.createElementToCollect();
    },

    timeBeforeStart: 40,
    gameLoaded: false,
    init: function() {
      setTimeout(function(){
        game.resetGame();
        game.animations.loadGameAnimation();
        game.gameLoaded = true;
      }, (game.timeBeforeStart * 1000));
    },

    updateInterface: function() {
      this.animations.elementHitAnimation();
    },

    animations: {
      loadGameAnimation: function() {
        $('#game').fadeIn(500, function() {
          $('#element').html('<img src="images/icons/' + game.elementToCollect + '.png" alt="' + game.elementToCollect + '">');
          $('#element').fadeIn(1000, function() {
            $('#aim').fadeIn(2000, function() {
              $('#game').animate({
                top: 20,
                right: 20,
                margin: 0
                }, 2000, function() {
                  $("#totalScore").html(game.totalScore);
                  $('#scoreBlock').fadeIn(500);
              });
            });
          });
        });
      },
      elementHitAnimation: function() {
        $('#aim').animate({
          width: 100,
          top: 24,
          left: 24
        },500, function() {
          $('#aim').animate({
            width: 128,
            top: 10,
            left: 10
          }, 500, game.animations.newElementAnimation());
        });
      },
      newElementAnimation: function() {
        $('#element').fadeOut(500, function() {
          $('#element').html('<img src="images/icons/' + game.elementToCollect + '.png" alt="' + game.elementToCollect + '">');
          $('#score').html(game.score);
          $('#element').fadeIn(500);
        });
      },
      gameCompleted: function() {
        $('#game').fadeOut(1000, function() {
          setTimeout(function() {
            socket.emit('gameCompleted');
          }, 1000);
        });
      }
    }

  };
}

// Game completed socket
socket.on('gameCompleted', function() {
  showGameCompleted();
});

function showGameCompleted() {
  $('.completedScreen').fadeIn(1000, function() {
    backgroundMusic.pause();
    completedMusic.play();
    // TODO: Volumes netjes uitzetten
    ijsbeerSound.volume = 0;
    jetpackPinguinSound.volume = 0;
    scooterPinguinSound.volume = 0;
    rocketPinguinSound.volume = 0;
    narwalSound.volume = 0;
    meeuwSound.volume = 0;
  });
}