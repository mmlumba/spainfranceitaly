L.mapbox.accessToken = 'pk.eyJ1IjoibW1sdW1iYSIsImEiOiJjaXFqd29uYzUwMGdsZ3JqOWRnbW00djVzIn0.XypC8cuOyVk6SlMszts1sA';

//creates a map with a set view through Mapbox
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.901981, 12.503990], 13);

//adds a new layer to the map
var myLayer = L.mapbox.featureLayer().addTo(map);

//var geoJson = myLayer.loadURL('food-rome.geojson');

var myLayer2 = L.mapbox.featureLayer().addTo(map);

var geoJson = food();

var geoJson2 = attractions();

// Add custom popups to each using our custom feature properties

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

myLayer.on('layeradd', function(e){
  popupMaker(e, restaurantTemplate);
});

myLayer2.on('layeradd', function(e){
  popupMaker(e, attractionTemplate);
});

// Add features to the map
myLayer.setGeoJSON(geoJson);
myLayer2.setGeoJSON(geoJson2);

//filter
var filterGroup = document.getElementById('filter-group');
