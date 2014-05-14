var box;
var meeuwOpBox, meeuwOpBox2, meeuwOpBox3;
var gebruikMeeuwen = true;
var kinectInitted = false;

function initKinect() {
  // Box op camera
  boxGeo = new THREE.CubeGeometry( 200,200,200 );
  boxMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
  box = new THREE.Mesh(boxGeo, boxMaterial);
  box.position.set(camera.position.x,camera.position.y,camera.position.z-200);
  scene.add(box);

  // Meeuwen gelinkt aan Box
  meeuwOpBox = meeuw.clone()
  meeuwOpBox.scale.set(3,3,3);
  box.add(meeuwOpBox);

  meeuwOpBox2 = meeuw.clone();
  meeuwOpBox2.scale.set(3,3,3);
  box.add(meeuwOpBox2);

  meeuwOpBox3 = meeuw.clone();
  meeuwOpBox3.scale.set(3,3,3);
  box.add(meeuwOpBox3);

  meeuwOpBox4 = meeuw.clone();
  meeuwOpBox4.scale.set(3,3,3);
  box.add(meeuwOpBox4);

  meeuwOpBox5 = meeuw.clone();
  meeuwOpBox5.scale.set(3,3,3);
  box.add(meeuwOpBox5);

  kinectInitted = true;
}

// Processingfunctie
function processingVerwerks() { 
  if (kinectInitted) {
    if(processingData) {
      // Box gaat mee op camera
      box.position.set(camera.position.x,camera.position.y,camera.position.z);
      box.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);

      // Meeuwen
      meeuwOpBox.position.set(user0[0],user0[1],user0[2]);
      meeuwOpBox2.position.set(user1[0],user1[1],user1[2]);
      meeuwOpBox3.position.set(user2[0],user2[1],user2[2]);
      meeuwOpBox4.position.set(user3[0],user3[1],user3[2]);
      meeuwOpBox5.position.set(user4[0],user4[1],user4[2]);
    }
  }
}