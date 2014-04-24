// Camera offset
function setCameras() {
  numberURL = (getUrlVars('view'));
  viewNumber = (numberURL.view);
  if (viewNumber) {
    cameraOffset(viewNumber);
  }
  function cameraOffset(number) {
    if (number == 1) {
      camera.setViewOffset( widthScreen1 + widthScreen2, heightScreen1, 0, 0, widthScreen1, heightScreen1 );
    }
    else if (number == 2) {
      camera.setViewOffset( widthScreen1 + widthScreen2, heightScreen1, widthScreen1, 0, widthScreen2, heightScreen2 );
    }
  }
}