var markers = [];
var markerOnMap = [];
var selectedList = 1;
var isFavourite = false;

// Render Marker Info Header
var renderMarkerHeader = function (list) {
  console.log("list.name=", list.name);
  $(".header-all-markers").empty();
  $(".header-all-markers").append(list.name);
  $(".header-all-markers").append(`<span><a href="/api/lists/${list.id}/edit"><i id="star-button" class="fa fa-pencil fa-1x" aria-hidden="true"></i></a></span>`);
  $(".table-markerinfo").empty();
}

var getMarkersFromList = function (list) {

  selectedList = list.id;
  // checkFavourite(Window.userInfo, selectedList);
  // console.log("isFavourite", isFavourite);
  renderMarkerHeader(list);
  clearMarkers();

  axios.get(`/api/lists/${list.id}/markers`)
    .then(function (response) {
      markers = response.data;
    })
    .then(function () {
      for (var i = 0; i < markers.length; i++) {
        // Add markers
        // console.log(markers[i]);
        renderMarker(markers[i]);
        addMarkerToMap(markers[i]);
      }
    });
}

var checkFavourite = function (user_id, list_id) {
  // Get lists
  axios.get(`/api/users/${user_id}/favourites`)
    .then(function (response) {
      isFavourite = false;
      var lists = response.data;
      // Loop through lists
      for (var i = 0; i < lists.length; i++) {
        if (lists[i].id === list_id) {
          console.log("BANG!");
          isFavourite = true;
        }
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

var renderMarker = function (marker) {

  // Render Marker Info Table
  var $data2 = $("<td>").text(marker.title);
  $data3 = $("<td>").text(marker.description);
  $data4 = $("<td>").text(marker.position);
  var $row = $("<tr>");
  $row.append($data2);
  $row.append($data3);
  var $markers = $(".table-markerinfo").append($row);

  //click event to show card icon for marker when clicked from row
  $row.click(function () {
    $('#sidebar-card').show();
    showMarkerInfo(marker);
  });
}

// Deletes all markers from the map
var clearMarkers = function () {
  for (var i = 0; i < markerOnMap.length; i++) {
    markerOnMap[i].setMap(null);
  }
  markerOnMap = [];
}

var getLists = function () {
  // Get lists
  axios.get('/api/lists')
    .then(function (response) {
      // console.log(response);
      var lists = response.data;
      // Loop through lists
      for (var i = 0; i < lists.length; i++) {
        // Display list
        displayList(lists[i]);
      }
      // Display list function
      function displayList(props) {
        // console.log('Props:', props);
        var $row = $(`<a href="#"></a>`).text(props.name);
        var $list = $("<li>");
        $list.append($row);
        var $lists = $(".list-all").append($list);

        $list.on('click', function (event) {
          event.preventDefault();
          getMarkersFromList(props);
          $('.hide-table-until-click').show();
        })
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

var getContribs = function (user_id) {
  // Get lists
  axios.get(`/api/lists/${user_id}/contributions`)
    .then(function (response) {
      // console.log(response);
      var lists = response.data;
      // console.log("response.data", response.data);
      // Loop through lists
      for (var i = 0; i < lists.length; i++) {
        // Display list
        displayList(lists[i]);
      }
      // Display list function
      function displayList(list) {
        // console.log('Props:', props);
        var $data0 = $("<td>").text(list.name);
        var $data1 = $("<td>").text(list.description);
        var $row = $("<tr>");
        $row.append($data0);
        $row.append($data1);
        var $lists = $(".table-contrib-lists").append($row);

        //click on row and show list markers on map
        $row.on('click', function (event) {
          getMarkersFromList(list);
        })

      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

var getFavourites = function (user_id) {
  // Get lists
  axios.get(`/api/users/${user_id}/favourites`)
    .then(function (response) {
      // console.log(response);
      var lists = response.data;
      // Loop through lists
      for (var i = 0; i < lists.length; i++) {
        // Display list
        displayList(lists[i]);
      }
      // Display list function
      function displayList(props) {
        // console.log('Props:', props);
        var $row = $(`<a href="#"></a>`).text(props.name);
        var $starButton = $(`<td><i id="star-button" class="fa fa-pencil fa-2x" aria-hidden="true"></i></td>`);
        var $list = $("<li>");
        $list.append($row);
        var $lists = $(".list-favourites").append($list);

        $list.on('click', function (event) {
          event.preventDefault();
          getMarkersFromList(props);
          $('.hide-table-until-click').show();
        })
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

var setUpMapListener = function () {
  // Listen for click on map
  map.addListener('click', function (event) {
    var props = {
      list_id: selectedList,
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      title: "unnamed",
      description: "no description"
    }
    // console.log(props);
    addMarkertoDB(props);
    addMarkerToMap(props);
  });
}

var addMarkertoDB = function (props) {
  var params = new URLSearchParams();
  params.append('list_id', props.list_id);
  params.append('user_id', Window.userInfo);
  params.append('lat', props.lat);
  params.append('lng', props.lng);
  params.append('title', props.title);
  params.append('description', props.description);
  axios.post('/api/markers', params)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


function imgError(image) {
  image.onerror = "";
  image.src = "/images/markers/globe-picture.png";
  return true;
}

// Add clicked marker info to info card, show card once clicked
var showMarkerInfo = function (clickedMarker) {
  var $daysAgoTime = moment(clickedMarker.created_at).fromNow();
  // Render Selected Marker Header
  $(".header-selected-marker").empty();
  $(".header-selected-marker").append(clickedMarker.title);
  // Render Selected Marker Info into Card
  $(".marker-description").empty();
  $(".marker-description")
    .append(clickedMarker.description);
  $(".marker-timestamp").empty();
  $(".marker-timestamp")
    .append($daysAgoTime);
  // Render picture
  $(".insert-picture").empty();
  $(".insert-picture")
    .append(`<img class="card-img-top marker-default-img" src="${clickedMarker.picture}" onerror="imgError(this);">`);


  $('#sidebar-card').show();


      // click on pencil icon, go to edit page, edit current marker
      $('#pencil-button').click(function () {
        console.log("i was clicked");
        window.location.href=`/api/markers/${clickedMarker.id}/edit`;
      });
}

// Add Marker Function
var addMarkerToMap = function (props) {
  props['coords'] = {};
  props.coords['lat'] = props.lat;
  props.coords['lng'] = props.lng;
  // console.log('Props:', props);
  marker = new google.maps.Marker({
    id: props.id,
    user_id: props.user_id,
    created_at: props.created_at,
    picture: props.picture,
    title: props.title,
    position: props.coords,
    map: map,
    description: props.description
    //icon:props.iconImage
  });
  marker.addListener('click', function () {
    showMarkerInfo(this);
  });
  markerOnMap.push(marker);
}


var setUpMaps = function () {

  // Get markers
  axios.get('/api/markers')
    .then(function (response) {
      // console.log(response);
      var markers = response.data;
      // Loop through markers
      for (var i = 0; i < markers.length; i++) {
        // Add marker
        // console.log(markers[i]);
        // addMarker(markers[i]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}
