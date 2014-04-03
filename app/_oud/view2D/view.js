// Connect Socket
var socketRhino = 'http://192.168.124.82:3000';
var socketHome = 'http://192.168.0.102:3000';
var socketHoog = 'http://192.168.1.139:3000';
var socket = io.connect(socketHome);

// Variabelen
var updateDelay = 100;
var controller = [0,0,0,0,0,0];

// Socketdata ophalen
socket.on('controllerData', function (data) {
  controller = data;
});

// Verwerk Data
setInterval(function() {

// Gyroscoop
var alpha = controller[0];
var beta = controller[1];
var gamma = controller[2];
// Accelerometer
var arAlpha = controller[3];
var arBeta = controller[4];
var arGamma = controller[5];

// Variabelen
var vloer = $('.vloer');
var draaidiv = $('.draaidiv');
var twee = $('.twee');
var drie = $('.drie');
var baseline = -70;

// Data
var hoogte = beta/3.6;
var kanteling = gamma/18;
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