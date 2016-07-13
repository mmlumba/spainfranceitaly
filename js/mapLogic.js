L.mapbox.accessToken = 'pk.eyJ1IjoibW1sdW1iYSIsImEiOiJjaXFqd29uYzUwMGdsZ3JqOWRnbW00djVzIn0.XypC8cuOyVk6SlMszts1sA';

//creates a map with a set view through Mapbox
var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([41.901981, 12.503990], 13);

//adds a new layer to the map
var myLayer = L.mapbox.featureLayer().addTo(map);

var myLayer2 = L.mapbox.featureLayer().addTo(map);

var geoJson = [{
  "type": "FeatureCollection",
  "features": [
  {
    "type": "Feature",
    "properties": {
      "name": "Numbs Le Bistro",
      "marker-color": "#A0522D",
      "marker-symbol": "restaurant",
      "rating": 2
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
      "marker-symbol": "restaurant",
      "rating": 5
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
      "marker-symbol": "restaurant",
      "rating": 3
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
      "marker-symbol": "restaurant",
      "rating": 4
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.4980753, 41.8989567]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "Maccheroni",
      "marker-color": "#A0522D",
      "marker-symbol": "restaurant",
      "rating": 5
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.47618815, 41.9007708]
    }
  }
  ]
}];

var geoJson2 = [{
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "name": "Roman Colosseum",
      "marker-color": "#104E8B",
      "marker-symbol": "monument",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.4900422, 41.8902142]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "Roman Forum",
      "marker-color": "#104E8B",
      "marker-symbol": "monument",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.4831363, 41.8924663]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "Trevi Fountain",
      "marker-color": "#104E8B",
      "marker-symbol": "monument",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.4811243, 41.9009365]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "Spanish Steps",
      "marker-color": "#104E8B",
      "marker-symbol": "monument",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.4805863, 41.905994]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "Sistine Chapel",
      "marker-color": "#104E8B",
      "marker-symbol": "monument"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.4522948, 41.9029508]
    }
  },
  {
    "type": "Feature",
    "properties": {
      "name": "St. Peter's Basilica",
      "marker-color": "#104E8B",
      "marker-symbol": "monument"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [12.451748, 41.9021707]
    }
  }
  ]
}
];
// Add custom popups to each using our custom feature properties
myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    //geoJson content
    var restaurantName = feature.properties.name;
    var restaurantRating = feature.properties.rating;

    // Create custom popup content
    var popupContent =  '<b>Restaurant:</b> ' +
                        restaurantName +
                        '<br />' +
                        '<b>Rating (out of 5):</b> ' +
                        restaurantRating;

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 200
    });
});

myLayer2.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    //geoJson content
    var attractionName = feature.properties.name;

    // Create custom popup content
    var popupContent =  '<b>Sight to See:</b> ' +
                        attractionName;

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 200
    });
});

// Add features to the map
myLayer.setGeoJSON(geoJson);
myLayer2.setGeoJSON(geoJson2);

//filter
var filterGroup = document.getElementById('filter-group');
