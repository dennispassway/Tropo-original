var object = [];

function modellenLaden(m) {

  switch(jsonSet[m].model){
    case 'wolk1':
    object[m] = wolk1.clone();
    break;
    case 'wolk2':
    object[m] = wolk2.clone();
    break;
    case 'wolk3':
    object[m] = wolk3.clone();
    break;
    case 'pinguin-jetpack':
    object[m] = pinguin1.clone();
    object[m].animation = new THREE.Animation(object[m], "PinguinJetpack", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'pinguin-scooter':
    object[m] = pinguin2.clone();
    object[m].animation = new THREE.Animation(object[m], "PinguinScooter", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'pinguin3':
    object[m] = pinguin3.clone();
    object[m].animation = new THREE.Animation(object[m], "pinguin3action", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'ijsbeer':
    object[m] = ijsbeer.clone();
    object[m].animation = new THREE.Animation(object[m], "IjsbeerAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'narwal':
    object[m] = narwal.clone();
    object[m].animation = new THREE.Animation(object[m], "narwalaction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'meeuw':
    object[m] = meeuw.clone();
    object[m].animation = new THREE.Animation(object[m], "MeeuwAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
  }

  object[m].name = jsonSet[m].name;
  object[m].type = jsonSet[m].model;
  object[m].position.set(jsonSet[m].x, jsonSet[m].y, jsonSet[m].z);
  object[m].scale.set(jsonSet[m].scale, jsonSet[m].scale, jsonSet[m].scale);
  object[m].rotation.set(toRadian(jsonSet[m].rotationX),toRadian(jsonSet[m].rotationY),toRadian(jsonSet[m].rotationZ));
  object[m].worldAnimation = new worldAnimation(object[m]);
  object[m].sound = new sound(object[m]);
  scene.add(object[m]);
}