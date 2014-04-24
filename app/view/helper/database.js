var jsonSet = [];
var databaseReady = false;

$.getJSON('https://spreadsheets.google.com/feeds/list/0AtGWqQf8eM2OdHVsS2w2QWI5NFhJN2tJUXlLTkhFRUE/od6/public/values?alt=json', function(data){

  for (var i = 0; i < data.feed.entry.length; i++) {
    name = data.feed.entry[i].gsx$name.$t;
    model = data.feed.entry[i].gsx$model.$t;
    x = data.feed.entry[i].gsx$x.$t;
    y = data.feed.entry[i].gsx$y.$t;
    z = data.feed.entry[i].gsx$z.$t;
    scale = data.feed.entry[i].gsx$scale.$t;
    rotationX = data.feed.entry[i].gsx$rotationx.$t;
    rotationY = data.feed.entry[i].gsx$rotationy.$t;
    rotationZ = data.feed.entry[i].gsx$rotationz.$t;
    beweegSnelheid = data.feed.entry[i].gsx$beweegsnelheid.$t;
    // Object in jsonSet array gooien
    var object = {'name': name, 'model': model, 'x': parseFloat(x), 'y': parseFloat(y), 'z': parseFloat(z), 'scale': parseFloat(scale), 'rotationX': parseFloat(rotationX), 'rotationY': parseFloat(rotationY), 'rotationZ': parseFloat(rotationZ), 'beweegSnelheid': parseFloat(beweegSnelheid)};
    jsonSet.push(object);

    // Als forloop klaar is, is database klaar, dus init.
    if (i == data.feed.entry.length-1) {
        databaseReady = true;
    }
    
  }

});