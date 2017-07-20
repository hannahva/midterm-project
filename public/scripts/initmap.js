function initMap() {
  // Map options
  var options = {
    zoom: 14,
    center: { lat: 48.423697, lng: -123.357647 }
  }
  // New map
  var map = new google.maps.Map(document.getElementById('map'), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click', function (event) {
    // Add marker
    // addMarker({coords:event.latLng});
    addMarker({ coords: event.latLng });
  });

  // Get markers
  axios.get('/api/markers')
    .then(function (response) {
      // console.log(response);
      var markers = response.data;
      // Loop through markers
      for (var i = 0; i < markers.length; i++) {
        // Add marker
        console.log(markers[i]);
        addMarker(markers[i]);
      }
      // Add Marker Function
      function addMarker(props) {
        props['coords'] = {};
        props.coords['lat'] = props.lat;
        props.coords['lng'] = props.lng;
        // console.log('Props:', props);
        var marker = new google.maps.Marker({
          title: props.title,
          position: props.coords,
          map: map,
          description: props.description
          //icon:props.iconImage
        });
        marker.addListener('click', function () {
          alert(this.description);
        });
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}