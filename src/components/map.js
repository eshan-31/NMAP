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
    var map = document.getElementById("map");
    map.style.height = window.innerHeight + "px";
     map = new window.google.maps.Map(document.getElementById('map'),
                               {center : {lat: 28.549507, lng: 77.203613},
                                 zoom: 13,
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
         map:map,
         animation:window.google.maps.Animation.DROP
       })
        map.fitBounds(bounds);
        /*push the marker to the array of markers*/
        allLocations.push(marker);
        /*extend the boundaries of the map for each marker*/
        bounds.extend(marker.position);
        /*Add event listener to the marker to open info window on that marker*/

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
