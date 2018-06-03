import React, { Component } from "react";
import Search from './SearchPlace'
import * as FSApi from './foursquare'


class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: "",
      places: require("./locations.json"),
      markers: [],
      infowindow: ""
    };

    // to retain object instance when used in the function
    this.initMap = this.initMap.bind(this);
    this.openInfoWindow = this.open.bind(this);
    this.close = this.close.bind(this);
  }

//when the app is loaded
  componentDidMount() {
    window.initMap = this.initMap;
    loadMapJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBobCzwOTb91mz78CfXRO9br4wdtmz-Ajw&v=3&callback=initMap"
    );
  }

  initMap() {
    var defaultMarker = makeMarkerIcon('f03112');
    var highlightedMarker = makeMarkerIcon('266baf');
    var map = document.getElementById("map");
    map.style.height = window.innerHeight + "px";
     map = new window.google.maps.Map(document.getElementById('map'),
                               {center : {lat: 28.549507, lng: 77.203613},
                                 zoom: 18,
                                 mapTypeControl: true
                               });

                               var InfoWindow = new window.google.maps.InfoWindow({});
                               window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
                                 this.close(); map.setCenter({lat: 28.549507, lng: 77.203613});
                               });
    this.setState({
      map: map,
      infowindow: InfoWindow

    });
    var places=[];
    var bounds = new window.google.maps.LatLngBounds();
     this.state.places.forEach(place=>{
         var marker = new window.google.maps.Marker({
         title: place.title,
         position: {lat: place.latitude, lng: place.longitude},
         icon: defaultMarker,
         map:map,
         animation:window.google.maps.Animation.DROP
       })
       map.addListener('click',()=> {this.state.infowindow.close(); this.state.map.setCenter({lat: 28.549507, lng: 77.203613});})
        map.fitBounds(bounds);
        places.push(marker);
        bounds.extend(marker.position);
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedMarker);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultMarker);
        });
        window.google.maps.event.addListener(marker,'click',()=> {
         this.open(marker);
         this.info_open(marker);
        })
   })
   this.setState({
  markers:places
})


  }

//to animate the selected marker and center the map ti it's location
  open=(marker)=>{
     marker.setAnimation(window.google.maps.Animation.BOUNCE);
     var latlng = marker.getPosition();
     this.state.map.setCenter(latlng);
     setTimeout(function() {
   marker.setAnimation(null)
 }, 1800);}

//Separate function for adding infoWindow so that it doesn't open up automatically while searching unless it is clicked
info_open=(marker)=>{
  this.close();
  this.state.infowindow.open(this.state.map, marker);
  this.state.infowindow.setContent("Details About the Place ");
  FSApi.requestFoursqureApi(marker.position.lat(), marker.position.lng()).then((response) => {
    if (response.response.venues.length > 0) {
    var venue = response.response.venues[0];
    var category = "";
    var address = "";
    var near = "";
    if (venue.categories[0].name) {
        category = venue.categories[0].name;
    }
    if (venue.location.address) {
        address = venue.location.address;
    }
    near=response.response.venues[2].name;
    this.state.infowindow.setContent('<div><div><strong>Name: ' + marker.title + '</strong></div><div>Category: ' + category + ' </div><div>Address: ' + address+ '</div><div>Near: ' + near + '<div></div>');
}

}).catch(function (err) {
this.state.infowindow.setContent('<div>Info cannott be loaded Sorry !</div>');
});
}

//to close the infoWindow
 close() {

  this.state.infowindow.close();
}
render() {
    return (
      <div>
      <Search markers={this.state.markers} open={this.open} info_open={this.info_open} close={this.close}/>
        <div aria-label="map" role="presentation" id="map" />
        </div>
    );
  }
}

//to make custom markers
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

//to load the map using JS
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
