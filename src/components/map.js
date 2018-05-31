import React, { Component } from "react";

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: "",
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
