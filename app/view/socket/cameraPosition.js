var refreshDelay = 1000/30;
// Main view
if (!viewNumber || viewNumber == 1) {
  // Send Position
  setInterval(function() {
    if(cameraTarget && cameraTarget.position) {
      mainCameraPosition = {
        x: cameraTarget.position.x,
        y: cameraTarget.position.y,
        z: cameraTarget.position.z,
        rotationX: cameraTarget.rotation.x,
        rotationY: cameraTarget.rotation.y,
        rotationZ: cameraTarget.rotation.z
      }
      socket.emit('mainCameraPosition', mainCameraPosition);
    }
  }, refreshDelay);
}

// Second View
// Receive position
  socket.on('CameraPositionData', function (data) {
    if (camera) {
      camera.position.x = data.x;
      camera.position.y = data.y;
      camera.position.z = data.z;
      camera.rotation.x = data.rotationX;
      camera.rotation.y = data.rotationY;
      camera.rotation.z = data.rotationZ;
    }
  });