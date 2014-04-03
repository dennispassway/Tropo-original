var jsonSet = [];

$.getJSON('https://spreadsheets.google.com/feeds/list/0AtGWqQf8eM2OdHVsS2w2QWI5NFhJN2tJUXlLTkhFRUE/od6/public/values?alt=json', function(data){

  for (var i = 0; i < data.feed.entry.length; i++) {
    name = data.feed.entry[i].gsx$name.$t;
    img = data.feed.entry[i].gsx$img.$t;
    x = data.feed.entry[i].gsx$x.$t;
    y = data.feed.entry[i].gsx$y.$t;
    z = data.feed.entry[i].gsx$z.$t;
    // Object in jsonSet gooien
    var object = {'name': name, 'img': img, 'x': x, 'y': y, 'z': z};
    jsonSet.push(object);

    // Als forloop klaar is, is database klaar, dus init.
    if (i == data.feed.entry.length-1) {
      init();
      animate();
    }
    
  }

});