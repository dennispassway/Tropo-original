// Connect Socket
var socketRhino = 'http://192.168.124.82:3000';
var socketHome = 'http://192.168.0.102:3000';
var socketHoog = 'http://192.168.1.139:3000';
var socket = io.connect(socketRhino);

// Variabelen
var updateDelay = 100;
var gyroController = [0,0,0];

// Socketdata ophalen
socket.on('controllerData', function (data) {
  gyroController = data;
});

// Verwerk Data
setInterval(function() {
// Gyroscoop
var alpha = gyroController[0];
var beta = gyroController[1];
var gamma = gyroController[2];

// Bruikdingen
var vloer = $('.vloer');
var draaidiv = $('.draaidiv');
var twee = $('.twee');
var drie = $('.drie');
var baseline = -70;
var hoogte = beta/3.6;
var kanteling = gamma/9;
var bocht = alpha/3.6;

// Hoogte grond
if (beta > 0) { draaidiv.css('bottom', hoogte + '%')}
if (beta < 0) { draaidiv.css('bottom', hoogte + '%')}

// Kantel grond
draaidiv.css({ WebkitTransform: 'rotate(' + kanteling + 'deg)'});

// Kompas Bocht grond
vloer.css('left', (-100+bocht) + '%');
twee.css('left', bocht + '%');
drie.css('left', (100+bocht) + '%');

}, updateDelay);

//Sound
var audio = new Audio('../plane.mp3');
audio.loop = true;
audio.play();