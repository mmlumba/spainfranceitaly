L.mapbox.accessToken = 'pk.eyJ1IjoibW1sdW1iYSIsImEiOiJjaXFqd29uYzUwMGdsZ3JqOWRnbW00djVzIn0.XypC8cuOyVk6SlMszts1sA';

//creates a map with a set view through Mapbox
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.901981, 12.503990], 13);

//adds a new layer to the map
var myLayer = L.mapbox.featureLayer().addTo(map);

var geoJson = myLayer.loadURL('../spainfranceitaly/food-rome.geojson');

var myLayer2 = L.mapbox.featureLayer().addTo(map);

var geoJson2 = myLayer2.loadURL('../spainfranceitaly/attractions-rome.geojson');

var myLayer3 = L.mapbox.featureLayer().addTo(map);

var geoJson3 = myLayer3.loadURL('../spainfranceitaly/nightlife-rome.geojson');

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

myLayer.on('layeradd', function(e){
  popupMaker(e, restaurantTemplate);
});

myLayer2.on('layeradd', function(e){
  popupMaker(e, attractionTemplate);
});

myLayer3.on('layeradd', function(e){
  popupMaker(e, nightlifeTemplate);
});

// Add features to the map
myLayer.setGeoJSON(geoJson);
myLayer2.setGeoJSON(geoJson2);
myLayer3.setGeoJSON(geoJson2);

//filter
var filterGroup = document.getElementById('filter-group');

//console log for default view
