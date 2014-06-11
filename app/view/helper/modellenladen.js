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
    case 'pinguin-rocket':
    object[m] = pinguin3.clone();
    object[m].animation = new THREE.Animation(object[m], "RocketAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'ijsbeer':
    object[m] = ijsbeer.clone();
    object[m].animation = new THREE.Animation(object[m], "IjsbeerAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'narwal':
    object[m] = narwal.clone();
    object[m].animation = new THREE.Animation(object[m], "NarwalAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'meeuw':
    object[m] = meeuw.clone();
    object[m].animation = new THREE.Animation(object[m], "MeeuwAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeBal':
    object[m] = nijntjeBal.clone();
    object[m].animation = new THREE.Animation(object[m], "BalAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeBeer':
    object[m] = nijntjeBeer.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeBeerAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeMaan':
    object[m] = nijntjeMaan.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeMaanAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeNijntje':
    object[m] = nijntjeNijntje.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeOlifant':
    object[m] = nijntjeOlifant.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeOlifantAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeVogel':
    object[m] = nijntjeVogel.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeVogelAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeZon':
    object[m] = nijntjeZon.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeZonAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeWolk1':
    object[m] = nijntjeWolk1.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeWolkAction", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeWolk2':
    object[m] = nijntjeWolk2.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeWolk2Action", THREE.AnimationHandler.CATMULLROM);
    object[m].animation.loop = false;
    break;
    case 'nijntjeWolk3':
    object[m] = nijntjeWolk3.clone();
    object[m].animation = new THREE.Animation(object[m], "nijntjeWolk3Action", THREE.AnimationHandler.CATMULLROM);
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