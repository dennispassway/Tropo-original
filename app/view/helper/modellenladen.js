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
    case 'pinguin1':
    object[m] = pinguin1.clone();
    break;
    case 'pinguin2':
    object[m] = pinguin2.clone();
    break;
    case 'ijsbeer':
    object[m] = ijsbeer.clone();
    break;
    case 'narwal':
    object[m] = narwal.clone();
    break;
  }

  object[m].name = jsonSet[m].name;
  object[m].type = jsonSet[m].model;
  object[m].position.set(jsonSet[m].x, jsonSet[m].y, jsonSet[m].z);
  object[m].scale.set(jsonSet[m].scale, jsonSet[m].scale, jsonSet[m].scale);
  object[m].rotation.set(toRadian(jsonSet[m].rotationX),toRadian(jsonSet[m].rotationY),toRadian(jsonSet[m].rotationZ));
  object[m].animatie = new animatie(object[m]);
  scene.add(object[m]);
}