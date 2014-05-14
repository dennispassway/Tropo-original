// Camera offset
function setCameras() {
  if (viewNumber) {
    cameraOffset(viewNumber);
  }
  
  function cameraOffset(number) {
    if (number == 1) {
      camera.setViewOffset( widthScreen *2, heightScreen, widthScreen, 0, widthScreen, heightScreen );
    }
    else if (number == 2) {
      camera.setViewOffset( widthScreen *2, heightScreen, 0, 0, widthScreen, heightScreen );
    }
  }
}