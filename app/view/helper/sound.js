function sound(thisObject) {

  switch(thisObject.type){
    case 'pinguin-jetpack':
      return jetpackPinguinSound;
    break;
    case 'pinguin-scooter':
        return scooterPinguinSound;
    break;
    case 'pinguin-rocket':
        return rocketPinguinSound;
    break;
    case 'ijsbeer':
        return ijsbeerSound;
    break;
    case 'narwal':
        return narwalSound;
    break;
    case 'meeuw':
        return meeuwSound;
    break;
  }

}