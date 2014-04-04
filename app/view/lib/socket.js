// Connect Socket
var socketKabel = 'http://192.168.124.147:3000';
var socketWifi = 'http://192.168.124.82:3000';
var socketHome = 'http://192.168.0.102:3000';
var socketHoog = 'http://192.168.1.139:3000';
var localHost = 'http://localhost:3000';
var socket = io.connect(socketKabel);

// Variabelen
var updateDelay = 100;
var controller = [0,0,0,0,0,0];
var aplha, beta, gamma;
var hoogte,kanteling,bocht;

// Socketdata ophalen
socket.on('controllerData', function (data) {
  controller = data;
});

// Verwerk Data
setInterval(function() {

// Gyroscoop
alpha = controller[0];
beta = controller[1];
gamma = controller[2];
// Accelerometer
var arAlpha = controller[3];
var arBeta = controller[4];
var arGamma = controller[5];

hoogte = -beta*4;
kanteling = gamma*7;
bocht = alpha/3.6;

}, updateDelay);