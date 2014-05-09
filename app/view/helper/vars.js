var activeArea = 9200;

var landWaarde = 0.00100;
var vliegWaarde = 0.00018;
var densityStijging = (landWaarde-vliegWaarde)/10;
var startFogAfstand = vliegWaarde;

var fov = 40;
var near = 1;
var far = activeArea+4000;

var widthScreen1 = 1920;
var heightScreen1 = 1080;
var widthScreen2 = 1920;
var heightScreen2 = 1080;

var floatingTweenAfstand = 500;

var afstandAnimatie = 1500;
var rotatieSnelheidAnimatie = 0.02;

var ControllerMovementSpeed = 800;
var ControllerLookSpeed = 1;
var ControllerForward = true;

var MouseMovementSpeed = 1000;
var MouseLookSpeed = 0.1;
var MouseForward = false;

var controllerMoves = false;

var boundingBoxScale = 900;