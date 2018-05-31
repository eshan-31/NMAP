import React, { Component } from "react";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: "",
      places: require("./locations.json"),
      markers: []
    };

    // retain object instance when used in the function
    this.initMap = this.initMap.bind(this);
  }

  componentDidMount() {
    window.initMap = this.initMap;
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAJkamQdDfv44eCeGoT3fVV0g9CN_sYfqk&v=3&callback=initMap"
    );
  }

  initMap() {
    var marker;
    var defaultMarker = makeMarkerIcon('f03112');
    var highlightedMarker = makeMarkerIcon('266baf');
    var map = document.getElementById("map");
    map.style.height = window.innerHeight + "px";
     map = new window.google.maps.Map(document.getElementById('map'),
                               {center : {lat: 28.549507, lng: 77.203613},
                                 zoom: 18,
                                 mapTypeControl: false
                               });

    this.setState({
      map: map,
    });
    var allLocations=[];
    var bounds = new window.google.maps.LatLngBounds();
     this.state.places.forEach(place=>{
        var  marker = new window.google.maps.Marker({
         title: place.title,
         position: {lat: place.latitude, lng: place.longitude},
         icon: defaultMarker,
         map:map,
         animation:window.google.maps.Animation.DROP
       })
        map.fitBounds(bounds);
        allLocations.push(marker);
        bounds.extend(marker.position);
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedMarker);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultMarker);
        });

   })
   this.setState({
  markers:allLocations
})


  }

render() {
    return (
        <div id="map" />
    );
  }
}
function makeMarkerIcon(markerColor) {
  var markerImage = new window.google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new window.google.maps.Size(21, 34),
    new window.google.maps.Point(0, 0),
    new window.google.maps.Point(10, 34),
    new window.google.maps.Size(21,34));
  return markerImage;
}
function loadMapJS(src) {
  var ref = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.onerror = function() {
    document.write("Error in loading the Maps!");
  };
  ref.parentNode.insertBefore(script, ref);
}


  export default Map;
