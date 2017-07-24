var map;

function initMap() {
  // Map options
  var options = {
    zoom: 11,
    center: { lat: 48.423697, lng: -123.357647 }
  }
  // create map
  map = new google.maps.Map(document.getElementById('map'), options);

  setUpMapListener();
  getLists();
  getFavourites(Window.userInfo);
  getContribs(Window.userInfo);

}
