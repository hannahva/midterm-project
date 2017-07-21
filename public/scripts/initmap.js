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
    // console.log(event);
    alert(`Now we add the marker to the list!`);
  });

  function showMarkerInfo(clickedMarker){
    console.log(clickedMarker);
    $(".table-selected-markerinfo").empty();
    $(".table-selected-markerinfo").append(`<tr><td>${clickedMarker.id}</td><td>${clickedMarker.user_id}</td><td>${clickedMarker.title}</td><td>${clickedMarker.description}</td><td>${clickedMarker.position}</td></tr>`);
  }

  // Get markers
  axios.get('/api/markers')
    .then(function (response) {
      // console.log(response);
      var markers = response.data;
      // Loop through markers
      for (var i = 0; i < markers.length; i++) {
        // Add marker
        // console.log(markers[i]);
        addMarker(markers[i]);
      }
      // Add Marker Function
      function addMarker(props) {
        props['coords'] = {};
        props.coords['lat'] = props.lat;
        props.coords['lng'] = props.lng;
        // console.log('Props:', props);
        var marker = new google.maps.Marker({
          id: props.id,
          user_id: props.user_id,
          title: props.title,
          position: props.coords,
          map: map,
          description: props.description
          //icon:props.iconImage
        });
        marker.addListener('click', function () {
          showMarkerInfo(this);
        });
      }

    })
    .catch(function (error) {
      console.log(error);
    });
}