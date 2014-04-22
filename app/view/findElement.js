function findElement(nameOfElement) {
  for (i = 0; i < object.length; i++){
    if (object[i].name == nameOfElement) {
      return i;
    }
  }
}