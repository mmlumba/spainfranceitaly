L.mapbox.accessToken = 'pk.eyJ1IjoibW1sdW1iYSIsImEiOiJjaXFqd29uYzUwMGdsZ3JqOWRnbW00djVzIn0.XypC8cuOyVk6SlMszts1sA';

//creates a map with a set view through Mapbox
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.32, 9.58], 5.0);

//category layers
var foodLayer = L.mapbox.featureLayer().addTo(map);
var attrLayer = L.mapbox.featureLayer().addTo(map);
var nightLayer = L.mapbox.featureLayer().addTo(map);

var foodGeoJson = foodLayer.loadURL('../food.geojson');
var attrGeoJson = attrLayer.loadURL('../attractions.geojson');
var nightGeoJson = nightLayer.loadURL('../nightlife.geojson');

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

foodLayer.on('layeradd', function(e){
  popupMaker(e, restaurantTemplate);
});

attrLayer.on('layeradd', function(e){
  popupMaker(e, attractionTemplate);
});

nightLayer.on('layeradd', function(e){
  popupMaker(e, nightlifeTemplate);
});

// Add features to the map
foodLayer.setGeoJSON(foodGeoJson);
attrLayer.setGeoJSON(attrGeoJson);
nightLayer.setGeoJSON(nightGeoJson);

//filter
var filterGroup = document.getElementById('filter-group');

//console log for default view
