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

    case 'nijntjeBal':
        return nijntjeBalSound;
    break;
    case 'nijntjeBeer':
        return nijntjeBeerSound;
    break;
    case 'nijntjeMaan':
        return nijntjeMaanSound;
    break;
    case 'nijntjeNijntje':
        return nijntjeNijntjeSound;
    break;
    case 'nijntjeOlifant':
        return nijntjeOlifantSound;
    break;
    case 'nijntjeVogel':
        return nijntjeVogelSound;
    break;
    case 'nijntjeZon':
        return nijntjeZonSound;
    break;
  }

}