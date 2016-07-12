var keys = require('./mapboxKeys');

L.mapbox.accessToken = module.exports.mapboxToken;

var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([43.229, -79.453], 5);

var myLayer = L.mapbox.featureLayer().addTo(map);

var geoJson = [
{
  "type": "Feature",
  "properties": {
    "name": "Numbs Le Bistro",
    "marker-color": "#A0522D",
    "marker-symbol": "restaurant"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [12.5119765, 41.9229898]
  }
},
{
  "type": "Feature",
  "properties": {
    "name": "Pizzeria Montecarlo",
    "marker-color": "#A0522D",
    "marker-symbol": "restaurant"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [12.4781031, 41.9048285]
  }
},
{
  "type": "Feature",
  "properties": {
    "name": "Ristorante Leonetti",
    "marker-color": "#A0522D",
    "marker-symbol": "restaurant"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [12.4974552, 41.8983961]
  }
},
{
  "type": "Feature",
  "properties": {
    "name": "Elettra",
    "marker-color": "#A0522D",
    "marker-symbol": "restaurant"
  },
  "geometry": {
    "type": "Point",
    "coordinates": [12.4980753, 41.8989567]
  }
}
]

myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.url + '">' +
                            '<img src="' + feature.properties.image + '" />' +
                            feature.properties.city +
                        '</a>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320
    });
});

// Add features to the map
myLayer.setGeoJSON(geoJson);
