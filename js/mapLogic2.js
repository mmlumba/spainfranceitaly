L.mapbox.accessToken = 'pk.eyJ1IjoibW1sdW1iYSIsImEiOiJjaXFqd29uYzUwMGdsZ3JqOWRnbW00djVzIn0.XypC8cuOyVk6SlMszts1sA';

//creates a map with a set view through Mapbox
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.45, 4.13], 6.0);
/*
//Attraction Layers

var foodLayer = {
  "layer": L.mapbox.featureLayer().addTo(map),
  "geoJsons": ['../food-rome.geojson', '../food-madrid.geojson', '../food-barcelona.geojson']
  "rome": foodLayer.layer.loadURL()
}

var attrLayer = {
  "layer": L.mapbox.featureLayer().addTo(map),
  "geoJsons": ['../attractions-rome.geojson',
  '../attractions-madrid.geojson',
  '../attractions-barcelona.geojson',
  '../attractions-friviera.geojson']
}

var nightLayer = {
  "layer": L.mapbox.featureLayer().addTo(map),
  "geoJsons": ['../nightlife-rome.geojson', '../nightlife-florence.geojson', '../nightlife-barcelona.geojson']
}*/
/*
//City Templates
var rome = {
  "food": foodLayer.layer.loadURL(foodLayer.geoJsons[0]),
  "attractions": attrLayer.layer.loadURL(attrLayer.geoJsons[0]),
  "nightlife": nightLayer.layer.loadURL(nightLayer.geoJsons[0]),
}

var barcelona = {
  "food": foodLayer.layer.loadURL(foodLayer.geoJsons[2]),
  "attractions": attrLayer.layer.loadURL(attrLayer.geoJsons[2]),
  "nightlife": nightLayer.layer.loadURL(nightLayer.geoJsons[2])
}
*/
//Madrid
//var foodMadridLayer = L.mapbox.featureLayer().addTo(map);
//var foodMadrid = foodMadridLayer.loadURL('../food-madrid.geojson');
//var attrMadridLayer = L.mapbox.featureLayer().addTo(map);
//var attrMadrid = attrMadridLayer.loadURL('../attractions-rome.geojson');
//var nightMadridLayer = L.mapbox.featureLayer().addTo(map);
//var nightMadrid = nightRomeLayer.loadURL('../nightlife-rome.geojson');

//Rome
/*
var foodLayer = L.mapbox.featureLayer().addTo(map);
var foodRome = foodLayer.loadURL('../food-rome.geojson');
var foodMadrid = foodLayer.loadURL('../food-madrid.geojson');
var attrLayer = L.mapbox.featureLayer().addTo(map);
var attrRome = attrLayer.loadURL('../attractions-rome.geojson');
var attrMadrid = attrLayer.loadURL('../attractions-madrid.geojson');
var nightLayer = L.mapbox.featureLayer().addTo(map);
var nightRome = nightLayer.loadURL('../nightlife-rome.geojson');
//var nightMadrid = nightLayer.loadURL('../nightlife-madrid.geojson');
*/

var geoData = [];

var layers = [
  {
    "geoJsons": ['../food-rome.geojson', 'food-madrid.geojson', '../food-barcelona.geojson']
  },
  {
    "geoJsons": ['../attractions-rome.geojson',
    '../attractions-madrid.geojson',
    '../attractions-barcelona.geojson',
    '../attractions-friviera.geojson']
  },
  {
    "geoJsons": ['../nightlife-rome.geojson', '../nightlife-florence.geojson', '../nightlife-barcelona.geojson']
  }
];

for (var i = 0; i < layers.length; i++){
  //var layerArray = [];
  var layer = L.mapbox.featureLayer().addTo(map); //add layer
  /*layerArray.push(layer);
  for (var j = 0; j < layerArray.length; j++){
    var loadLayer = layer.loadURL(layers[i].geoJsons[j]); //loads geojson based on loop
    layer.setGeoJSON(loadLayer); //sets geojson based on the layer(?)
  }*/
  geoData = layers[i].geoJsons;
  return geoData;
}

map.eachLayer(function layer(){
  layer.loadURL(layers);
});



function popupMaker(e, templateCreator){
  var marker = e.layer,
      feature = marker.feature;
      var popupContent = templateCreator(feature);
      marker.bindPopup(popupContent,{
          closeButton: true,
          minWidth: 200
      });
}

var restaurantTemplate = function(feature){
  var restaurantName = feature.properties.name;
  var restaurantRating = feature.properties.rating;

  // Create custom popup content
  return '<b>Restaurant:</b> ' +
         restaurantName +
         '<br />' +
         '<b>Rating (out of 5):</b> ' +
         restaurantRating;
};

var attractionTemplate = function(feature){
  var attractionName = feature.properties.name;

  return '<b>Sight to See:</b> ' +
          attractionName;

}

var nightlifeTemplate = function(feature){
  var nightlifeName = feature.properties.name;
  var nightlifeSummary = feature.properties.summary;
  var nightlifeCost = feature.properties.cost;

  return '<b>Name:</b> ' +
          nightlifeName +
          '<br />' +
          '<b>What\'s here?</b> ' +
          nightlifeSummary +
          '<br />' +
          '<b>Cost (€)</b>: ' +
          nightlifeCost;
}

foodLayer.layer.on('layeradd', function(e){
  popupMaker(e, restaurantTemplate);
});

attrLayer.layer.on('layeradd', function(e){
  popupMaker(e, attractionTemplate);
});

nightLayer.layer.on('layeradd', function(e){
  popupMaker(e, nightlifeTemplate);
});

// Add features to the map
foodLayer.layer.setGeoJSON(foodLayer.geoJsons[0]);
foodLayer.layer.setGeoJSON(foodLayer.geoJsons[2]);
attrLayer.layer.setGeoJSON(attrLayer.geoJsons[0]);
attrLayer.layer.setGeoJSON(foodLayer.geoJsons[2]);
nightLayer.layer.setGeoJSON(foodLayer.geoJsons[0]);
nightLayer.layer.setGeoJSON(foodLayer.geoJsons[0]);

//filter
var filterGroup = document.getElementById('filter-group');

//console log for default view
