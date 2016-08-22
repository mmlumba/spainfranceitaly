L.mapbox.accessToken = 'pk.eyJ1IjoibW1sdW1iYSIsImEiOiJjaXFqd29uYzUwMGdsZ3JqOWRnbW00djVzIn0.XypC8cuOyVk6SlMszts1sA';

//creates a map with a set view through Mapbox
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.32, 9.58], 5.0);

    var southwest = [-40, 51];
    var northeast = [52,58];
    var bounds = L.latLngBounds(southwest, northeast);
/*
var cityPoints = [[-3.697129, 40.414495],
[2.175512, 41.396665],
[7.1026604, 43.5710905],
[7.4258741, 43.7391011],
[10.396597, 43.722952],
[11.254054, 43.768577]//map position of florence
,
[12.503990, 41.901981] //map position of rome
]

function flyToMe (coordinates){
  var placeClass = 'place-'+index+1;
  for (var i = 0; i < cityPoints.length; i++){
    document.getElementById('placeClass').addEventListener('click', function(){
      map.flyTo({center: cityPoints[i]});
    });
  }
}*/
//zoom for madrid, antibes, monaco, florence, pisa = 13
//barcelona, rome = 12

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
map.setMaxBounds(bounds);
